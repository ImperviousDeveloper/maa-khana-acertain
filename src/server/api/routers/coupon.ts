import { z } from "zod";
import { createTRPCRouter, publicProcedure, adminProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const couponRouter = createTRPCRouter({
    validate: publicProcedure
        .input(z.object({ code: z.string() }))
        .query(async ({ ctx, input }) => {
            const coupon = await ctx.db.coupon.findUnique({
                where: { code: input.code },
            });

            if (!coupon || !coupon.active) {
                throw new TRPCError({ code: "NOT_FOUND", message: "Invalid coupon" });
            }

            if (coupon.usageLimit <= coupon.currentUsage) {
                throw new TRPCError({ code: "BAD_REQUEST", message: "Coupon limit reached" });
            }

            if (coupon.expiryDate && coupon.expiryDate < new Date()) {
                throw new TRPCError({ code: "BAD_REQUEST", message: "Coupon expired" });
            }

            return coupon;
        }),

    list: adminProcedure.query(async ({ ctx }) => {
        return ctx.db.coupon.findMany();
    }),

    create: adminProcedure
        .input(
            z.object({
                code: z.string(),
                discountType: z.string(),
                discountAmount: z.number(),
                minOrderAmount: z.number().optional(),
                usageLimit: z.number().optional(),
                expiryDate: z.date().optional(),
                active: z.boolean().default(true),
            })
        )
        .mutation(async ({ ctx, input }) => {
            return ctx.db.coupon.create({
                data: input,
            });
        }),

    delete: adminProcedure
        .input(z.object({ id: z.number() }))
        .mutation(async ({ ctx, input }) => {
            return ctx.db.coupon.delete({
                where: { id: input.id },
            });
        }),
});
