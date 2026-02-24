import { z } from "zod";
import { createTRPCRouter, protectedProcedure, adminProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { OrderStatus } from "@prisma/client";

export const orderRouter = createTRPCRouter({
    list: protectedProcedure.query(async ({ ctx }) => {
        return ctx.db.order.findMany({
            where: { userId: ctx.session.user.id },
            orderBy: { createdAt: "desc" },
            include: { items: { include: { product: true } } },
        });
    }),

    getById: protectedProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ ctx, input }) => {
            const order = await ctx.db.order.findUnique({
                where: { id: input.id },
                include: {
                    items: { include: { product: true } },
                    payment: true,
                    shipping: true,
                },
            });

            if (!order || (order.userId !== ctx.session.user.id && ctx.session.user.role !== "ADMIN")) {
                throw new TRPCError({ code: "NOT_FOUND" });
            }

            return order;
        }),

    create: protectedProcedure
        .input(
            z.object({
                addressId: z.string(),
                paymentMethod: z.string(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            return ctx.db.$transaction(async (tx) => {
                const cart = await tx.cart.findUnique({
                    where: { userId: ctx.session.user.id },
                    include: { items: { include: { product: true } } },
                });

                if (!cart || cart.items.length === 0) {
                    throw new TRPCError({ code: "BAD_REQUEST", message: "Cart is empty" });
                }

                // Stock check
                for (const item of cart.items) {
                    if (item.product.stock < item.quantity) {
                        throw new TRPCError({
                            code: "BAD_REQUEST",
                            message: `Insufficient stock for ${item.product.name}`,
                        });
                    }
                    await tx.product.update({
                        where: { id: item.productId },
                        data: {
                            stock: { decrement: item.quantity },
                            inStock: item.product.stock - item.quantity > 0,
                        },
                    });
                }

                const order = await tx.order.create({
                    data: {
                        userId: ctx.session.user.id,
                        total: cart.totalPrice.add(cart.shippingCost).add(cart.taxAmount).sub(cart.totalDiscount).sub(cart.couponDiscount),
                        status: "PENDING",
                        items: {
                            create: cart.items.map((item) => ({
                                productId: item.productId,
                                quantity: item.quantity,
                                price: item.price,
                            })),
                        },
                        shipping: {
                            create: {
                                method: "Standard Shipping",
                                cost: cart.shippingCost,
                            },
                        },
                        payment: {
                            create: {
                                method: input.paymentMethod,
                                amount: cart.totalPrice, // Simplified
                                status: "PENDING",
                            },
                        },
                    },
                });

                await tx.cartItem.deleteMany({ where: { cartId: cart.id } });

                return order;
            });
        }),

    updateStatus: adminProcedure
        .input(z.object({ id: z.string(), status: z.nativeEnum(OrderStatus) }))
        .mutation(async ({ ctx, input }) => {
            return ctx.db.order.update({
                where: { id: input.id },
                data: { status: input.status },
            });
        }),
});
