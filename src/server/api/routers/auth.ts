import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import bcrypt from "bcryptjs";
import crypto from "crypto";

export const authRouter = createTRPCRouter({
    signup: publicProcedure
        .input(
            z.object({
                name: z.string().min(2),
                email: z.string().email(),
                password: z.string().min(6),
            })
        )
        .mutation(async ({ ctx, input }) => {
            console.log("Signup attempt for:", input.email);
            try {
                const exists = await ctx.db.user.findUnique({
                    where: { email: input.email },
                });

                if (exists) {
                    console.log("Signup failed: User already exists", input.email);
                    throw new TRPCError({
                        code: "CONFLICT",
                        message: "User already exists",
                    });
                }

                const hashedPassword = await bcrypt.hash(input.password, 10);
                const otp = Math.floor(100000 + Math.random() * 900000).toString();
                const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

                const user = await ctx.db.user.create({
                    data: {
                        name: input.name,
                        email: input.email,
                        password: hashedPassword,
                        otp,
                        otpExpires,
                    },
                });

                console.log(`Signup success for ${input.email}. OTP: ${otp}`);

                return {
                    success: true,
                    email: user.email,
                    debugOtp: process.env.NODE_ENV === "development" ? otp : undefined
                };
            } catch (error) {
                console.error("Signup error:", error);
                if (error instanceof TRPCError) throw error;
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "An unexpected error occurred during signup",
                });
            }
        }),

    verifyOtp: publicProcedure
        .input(z.object({ email: z.string().email(), otp: z.string() }))
        .mutation(async ({ ctx, input }) => {
            const user = await ctx.db.user.findUnique({
                where: { email: input.email },
            });

            if (!user || user.otp !== input.otp || !user.otpExpires || user.otpExpires < new Date()) {
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: "Invalid or expired OTP",
                });
            }

            await ctx.db.user.update({
                where: { email: input.email },
                data: {
                    emailVerified: new Date(),
                    otp: null,
                    otpExpires: null,
                },
            });

            return { success: true };
        }),

    resendOtp: publicProcedure
        .input(z.object({ email: z.string().email() }))
        .mutation(async ({ ctx, input }) => {
            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

            await ctx.db.user.update({
                where: { email: input.email },
                data: { otp, otpExpires },
            });

            console.log(`New OTP for ${input.email}: ${otp}`);
            return {
                success: true,
                debugOtp: process.env.NODE_ENV === "development" ? otp : undefined
            };
        }),

    forgotPassword: publicProcedure
        .input(z.object({ email: z.string().email() }))
        .mutation(async ({ ctx, input }) => {
            const user = await ctx.db.user.findUnique({
                where: { email: input.email },
            });

            if (!user) {
                // Don't leak user existence
                return { success: true };
            }

            const resetToken = crypto.randomBytes(32).toString("hex");
            const resetTokenExpires = new Date(Date.now() + 3600000); // 1 hour

            await ctx.db.user.update({
                where: { email: input.email },
                data: { resetToken, resetTokenExpires },
            });

            console.log(`Reset Token for ${input.email}: ${resetToken}`);
            return { success: true };
        }),

    resetPassword: publicProcedure
        .input(
            z.object({
                token: z.string(),
                password: z.string().min(6),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const user = await ctx.db.user.findFirst({
                where: {
                    resetToken: input.token,
                    resetTokenExpires: { gt: new Date() },
                },
            });

            if (!user) {
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: "Invalid or expired reset token",
                });
            }

            const hashedPassword = await bcrypt.hash(input.password, 10);

            await ctx.db.user.update({
                where: { id: user.id },
                data: {
                    password: hashedPassword,
                    resetToken: null,
                    resetTokenExpires: null,
                },
            });

            return { success: true };
        }),
});
