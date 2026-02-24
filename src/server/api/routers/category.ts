import { z } from "zod";
import { createTRPCRouter, publicProcedure, adminProcedure } from "~/server/api/trpc";

export const categoryRouter = createTRPCRouter({
    list: publicProcedure.query(async ({ ctx }) => {
        return ctx.db.category.findMany({
            include: { children: true },
            where: { parentId: null },
        });
    }),

    getAll: publicProcedure.query(async ({ ctx }) => {
        return ctx.db.category.findMany();
    }),

    getById: publicProcedure
        .input(z.object({ id: z.number() }))
        .query(async ({ ctx, input }) => {
            return ctx.db.category.findUnique({
                where: { id: input.id },
                include: { products: true, children: true },
            });
        }),

    getBySlug: publicProcedure
        .input(z.object({ slug: z.string() }))
        .query(async ({ ctx, input }) => {
            return ctx.db.category.findUnique({
                where: { slug: input.slug },
                include: { products: true, children: true },
            });
        }),

    create: adminProcedure
        .input(
            z.object({
                name: z.string(),
                slug: z.string(),
                parentId: z.number().optional(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            return ctx.db.category.create({
                data: input,
            });
        }),

    update: adminProcedure
        .input(
            z.object({
                id: z.number(),
                name: z.string().optional(),
                slug: z.string().optional(),
                parentId: z.number().optional(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const { id, ...data } = input;
            return ctx.db.category.update({
                where: { id },
                data,
            });
        }),

    delete: adminProcedure
        .input(z.object({ id: z.number() }))
        .mutation(async ({ ctx, input }) => {
            return ctx.db.category.delete({
                where: { id: input.id },
            });
        }),
});
