import { z } from "zod";
import { createTRPCRouter, protectedProcedure, adminProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
    me: protectedProcedure.query(async ({ ctx }) => {
        return ctx.db.user.findUnique({
            where: { id: ctx.session.user.id },
            include: { addresses: true },
        });
    }),

    updateProfile: protectedProcedure
        .input(z.object({ name: z.string().optional(), image: z.string().optional() }))
        .mutation(async ({ ctx, input }) => {
            return ctx.db.user.update({
                where: { id: ctx.session.user.id },
                data: input,
            });
        }),

    list: adminProcedure.query(async ({ ctx }) => {
        return ctx.db.user.findMany();
    }),

    addAddress: protectedProcedure
        .input(z.object({
            line1: z.string(),
            line2: z.string().optional(),
            city: z.string(),
            state: z.string(),
            country: z.string(),
            zipCode: z.string(),
            phone: z.string().optional(),
            type: z.enum(["HOME", "WORK", "BILLING", "SHIPPING"]),
        }))
        .mutation(async ({ ctx, input }) => {
            return ctx.db.address.create({
                data: {
                    ...input,
                    userId: ctx.session.user.id,
                },
            });
        }),
});
