import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";

const TAX_RATE = 0.12; // 12% GST

async function syncCartTotals(db: any, userId: string) {
    const cart = await db.cart.findUnique({
        where: { userId },
        include: { items: true },
    });

    if (!cart) return null;

    const subtotal = cart.items.reduce((acc: number, item: any) => {
        return acc + (Number(item.price) * item.quantity);
    }, 0);

    const taxAmount = subtotal * TAX_RATE;

    return db.cart.update({
        where: { id: cart.id },
        data: {
            totalPrice: subtotal,
            taxAmount: taxAmount,
        },
        include: {
            items: {
                include: {
                    product: true,
                    variant: true,
                },
            },
        },
    });
}

export const cartRouter = createTRPCRouter({
    get: protectedProcedure.query(async ({ ctx }) => {
        const cart = await ctx.db.cart.findUnique({
            where: { userId: ctx.session.user.id },
            include: {
                items: {
                    include: {
                        product: true,
                        variant: true,
                    },
                },
            },
        });

        if (!cart) {
            return ctx.db.cart.create({
                data: { userId: ctx.session.user.id },
                include: {
                    items: {
                        include: {
                            product: true,
                            variant: true,
                        },
                    },
                },
            });
        }

        return syncCartTotals(ctx.db, ctx.session.user.id);
    }),

    addItem: protectedProcedure
        .input(
            z.object({
                productId: z.number(),
                variantId: z.number().optional(),
                quantity: z.number().min(1),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const product = await ctx.db.product.findUnique({
                where: { id: input.productId },
            });

            if (!product) {
                throw new TRPCError({ code: "NOT_FOUND", message: "Product not found" });
            }

            let cart = await ctx.db.cart.findUnique({
                where: { userId: ctx.session.user.id },
            });

            if (!cart) {
                cart = await ctx.db.cart.create({
                    data: { userId: ctx.session.user.id },
                });
            }

            const existingItem = await ctx.db.cartItem.findFirst({
                where: {
                    cartId: cart.id,
                    productId: input.productId,
                    variantId: input.variantId ?? null,
                },
            });

            if (existingItem) {
                await ctx.db.cartItem.update({
                    where: { id: existingItem.id },
                    data: { quantity: existingItem.quantity + input.quantity },
                });
            } else {
                await ctx.db.cartItem.create({
                    data: {
                        cartId: cart.id,
                        productId: input.productId,
                        variantId: input.variantId ?? null,
                        quantity: input.quantity,
                        price: product.specialPrice ?? product.price,
                    },
                });
            }

            return syncCartTotals(ctx.db, ctx.session.user.id);
        }),

    updateQuantity: protectedProcedure
        .input(z.object({ itemId: z.string(), quantity: z.number().min(0) }))
        .mutation(async ({ ctx, input }) => {
            if (input.quantity === 0) {
                await ctx.db.cartItem.delete({
                    where: { id: input.itemId },
                });
            } else {
                await ctx.db.cartItem.update({
                    where: { id: input.itemId },
                    data: { quantity: input.quantity },
                });
            }

            return syncCartTotals(ctx.db, ctx.session.user.id);
        }),

    removeItem: protectedProcedure
        .input(z.object({ itemId: z.string() }))
        .mutation(async ({ ctx, input }) => {
            await ctx.db.cartItem.delete({
                where: { id: input.itemId },
            });
            return syncCartTotals(ctx.db, ctx.session.user.id);
        }),

    clear: protectedProcedure.mutation(async ({ ctx }) => {
        const cart = await ctx.db.cart.findUnique({
            where: { userId: ctx.session.user.id },
        });
        if (cart) {
            await ctx.db.cartItem.deleteMany({
                where: { cartId: cart.id },
            });
            return syncCartTotals(ctx.db, ctx.session.user.id);
        }
        return { success: true };
    }),
});
