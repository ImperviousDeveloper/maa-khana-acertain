import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const paymentRouter = createTRPCRouter({
    createIntent: protectedProcedure
        .input(z.object({ orderId: z.string() }))
        .mutation(async ({ ctx, input }) => {
            const order = await ctx.db.order.findUnique({
                where: { id: input.orderId },
            });

            if (!order) {
                throw new TRPCError({ code: "NOT_FOUND", message: "Order not found" });
            }

            // Mock payment intent creation
            const payment = await ctx.db.payment.create({
                data: {
                    orderId: order.id,
                    amount: order.total,
                    method: "STRIPE", // Hardcoded for now
                    status: "PENDING",
                },
            });

            return {
                clientSecret: `mock_secret_${payment.id}`,
                paymentId: payment.id,
            };
        }),

    verify: protectedProcedure
        .input(z.object({
            paymentId: z.string(),
            status: z.enum(["SUCCESS", "FAILED"])
        }))
        .mutation(async ({ ctx, input }) => {
            const payment = await ctx.db.payment.update({
                where: { id: input.paymentId },
                data: {
                    status: input.status === "SUCCESS" ? "COMPLETED" : "FAILED",
                },
                include: { order: true },
            });

            if (input.status === "SUCCESS") {
                await ctx.db.order.update({
                    where: { id: payment.orderId },
                    data: {
                        status: "PROCESSING",
                        paymentStatus: "PAID"
                    },
                });
            }

            return { success: true };
        }),
});
