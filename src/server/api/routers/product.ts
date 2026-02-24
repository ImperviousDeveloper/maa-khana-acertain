import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure, adminProcedure } from "~/server/api/trpc";

export const productRouter = createTRPCRouter({
    list: publicProcedure
        .input(
            z.object({
                limit: z.number().min(1).max(100).nullish(),
                cursor: z.number().nullish(),
                categoryId: z.number().nullish(),
                isFeatured: z.boolean().nullish(),
                query: z.string().nullish(),
                sort: z.enum(["newest", "price-asc", "price-desc", "top-rated"]).nullish(),
            })
        )
        .query(async ({ ctx, input }) => {
            const limit = input.limit ?? 50;
            const { cursor, categoryId, isFeatured, query, sort } = input;

            const where: any = {
                categoryId: categoryId ?? undefined,
                isFeatured: isFeatured ?? undefined,
                isActive: true,
            };

            if (query) {
                where.OR = [
                    { name: { contains: query, mode: "insensitive" } },
                    { description: { contains: query, mode: "insensitive" } },
                ];
            }

            let orderBy: any = { id: "desc" };
            if (sort === "price-asc") orderBy = { price: "asc" };
            else if (sort === "price-desc") orderBy = { price: "desc" };
            else if (sort === "top-rated") orderBy = { rating: "desc" };
            else if (sort === "newest") orderBy = { createdAt: "desc" };

            const items = await ctx.db.product.findMany({
                take: limit + 1,
                where,
                cursor: cursor ? { id: cursor } : undefined,
                orderBy,
                include: { category: true, images: true, variants: true },
            });

            let nextCursor: typeof cursor | undefined = undefined;
            if (items.length > limit) {
                const nextItem = items.pop();
                nextCursor = nextItem!.id;
            }

            return { items, nextCursor };
        }),

    getById: publicProcedure
        .input(z.object({ id: z.number() }))
        .query(async ({ ctx, input }) => {
            return ctx.db.product.findUnique({
                where: { id: input.id },
                include: {
                    category: true,
                    images: true,
                    variants: true,
                    reviews: { include: { user: true } },
                },
            });
        }),

    getBySlug: publicProcedure
        .input(z.object({ slug: z.string() }))
        .query(async ({ ctx, input }) => {
            return ctx.db.product.findUnique({
                where: { slug: input.slug },
                include: {
                    category: true,
                    images: true,
                    variants: true,
                    reviews: { include: { user: true } },
                },
            });
        }),

    create: adminProcedure
        .input(
            z.object({
                name: z.string(),
                slug: z.string(),
                description: z.string(),
                price: z.number(),
                categoryId: z.number(),
                imageUrl: z.string(),
                stock: z.number(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            return ctx.db.product.create({
                data: {
                    ...input,
                    price: input.price,
                },
            });
        }),

    update: adminProcedure
        .input(
            z.object({
                id: z.number(),
                name: z.string().optional(),
                description: z.string().optional(),
                price: z.number().optional(),
                stock: z.number().optional(),
                isActive: z.boolean().optional(),
                isFeatured: z.boolean().optional(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const { id, ...data } = input;
            return ctx.db.product.update({
                where: { id },
                data,
            });
        }),

    delete: adminProcedure
        .input(z.object({ id: z.number() }))
        .mutation(async ({ ctx, input }) => {
            return ctx.db.product.delete({
                where: { id: input.id },
            });
        }),

    recordView: protectedProcedure
        .input(z.object({ productId: z.number() }))
        .mutation(async ({ ctx, input }) => {
            const existing = await ctx.db.recentlyViewedItem.findFirst({
                where: { userId: ctx.session.user.id, productId: input.productId },
            });

            if (existing) {
                return ctx.db.recentlyViewedItem.update({
                    where: { id: existing.id },
                    data: { viewedAt: new Date() },
                });
            }

            return ctx.db.recentlyViewedItem.create({
                data: {
                    userId: ctx.session.user.id,
                    productId: input.productId,
                },
            });
        }),

    getRecentlyViewed: protectedProcedure.query(async ({ ctx }) => {
        return ctx.db.recentlyViewedItem.findMany({
            where: { userId: ctx.session.user.id },
            take: 4,
            orderBy: { viewedAt: "desc" },
            include: { product: { include: { category: true } } },
        });
    }),
});
