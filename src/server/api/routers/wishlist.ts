import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const wishlistRouter = createTRPCRouter({
    list: protectedProcedure.query(async ({ ctx }) => {
        return ctx.db.wishlist.findMany({
            where: { userId: ctx.session.user.id },
            include: {
                product: {
                    include: {
                        category: true,
                    },
                },
            },
        });
    }),

    toggle: protectedProcedure
        .input(z.object({ productId: z.number() }))
        .mutation(async ({ ctx, input }) => {
            const existing = await ctx.db.wishlist.findFirst({
                where: {
                    userId: ctx.session.user.id,
                    productId: input.productId,
                },
            });

            if (existing) {
                await ctx.db.wishlist.delete({
                    where: { id: existing.id },
                });
                return { action: "removed" };
            }

            await ctx.db.wishlist.create({
                data: {
                    userId: ctx.session.user.id,
                    productId: input.productId,
                },
            });
            return { action: "added" };
        }),
});
