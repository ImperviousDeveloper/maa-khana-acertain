import { z } from "zod";
import { createTRPCRouter, adminProcedure } from "~/server/api/trpc";

export const inventoryRouter = createTRPCRouter({
    listLowStock: adminProcedure
        .input(z.object({ threshold: z.number().default(10) }))
        .query(async ({ ctx, input }) => {
            return ctx.db.product.findMany({
                where: { stock: { lte: input.threshold } },
                orderBy: { stock: "asc" },
            });
        }),

    updateStock: adminProcedure
        .input(z.object({ productId: z.number(), quantity: z.number() }))
        .mutation(async ({ ctx, input }) => {
            return ctx.db.product.update({
                where: { id: input.productId },
                data: {
                    stock: input.quantity,
                    inStock: input.quantity > 0,
                },
            });
        }),
});
