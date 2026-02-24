import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure, adminProcedure } from "~/server/api/trpc";

export const reviewRouter = createTRPCRouter({
    listByProduct: publicProcedure
        .input(z.object({ productId: z.number() }))
        .query(async ({ ctx, input }) => {
            return ctx.db.review.findMany({
                where: { productId: input.productId },
                include: { user: true },
                orderBy: { createdAt: "desc" },
            });
        }),

    create: protectedProcedure
        .input(
            z.object({
                productId: z.number(),
                rating: z.number().min(1).max(5),
                comment: z.string().optional(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const review = await ctx.db.review.create({
                data: {
                    ...input,
                    userId: ctx.session.user.id,
                },
            });

            // Update product rating
            const reviews = await ctx.db.review.findMany({
                where: { productId: input.productId },
            });
            const avgRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;

            await ctx.db.product.update({
                where: { id: input.productId },
                data: {
                    rating: avgRating,
                    reviewsCount: reviews.length,
                },
            });

            return review;
        }),

    delete: adminProcedure
        .input(z.object({ id: z.number() }))
        .mutation(async ({ ctx, input }) => {
            return ctx.db.review.delete({
                where: { id: input.id },
            });
        }),
});
