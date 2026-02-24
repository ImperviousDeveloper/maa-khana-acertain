"use client";

import { Drawer } from "vaul";
import { ShoppingCart, X, Plus, Minus, Trash2 } from "lucide-react";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";
import Link from "next/link";
import { toast } from "sonner";
import { Separator } from "~/components/ui/separator";

import { useSession } from "next-auth/react";

export function CartDrawer() {
    const { data: session, status } = useSession();
    const { data: cart, refetch } = api.cart.get.useQuery(undefined, {
        enabled: status === "authenticated",
    });
    const updateQty = api.cart.updateQuantity.useMutation({
        onSuccess: () => refetch(),
    });
    const remove = api.cart.removeItem.useMutation({
        onSuccess: () => {
            refetch();
            toast.success("Item removed from cart");
        },
    });

    return (
        <Drawer.Root direction="right">
            <Drawer.Trigger asChild>
                <Button variant="ghost" size="icon" className="relative rounded-full">
                    <ShoppingCart className="w-5 h-5" />
                    {cart && cart.items.length > 0 && (
                        <span className="absolute top-0 right-0 flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-primary rounded-full translate-x-1 -translate-y-1">
                            {cart.items.length}
                        </span>
                    )}
                </Button>
            </Drawer.Trigger>
            <Drawer.Portal>
                <Drawer.Overlay className="fixed inset-0 bg-black/40 z-100" />
                <Drawer.Content className="bg-background flex flex-col rounded-l-[40px] h-full w-full max-w-md fixed bottom-0 right-0 z-100 outline-none border-l shadow-2xl">
                    <div className="p-8 flex-1 overflow-y-auto">
                        <div className="flex items-center justify-between mb-8">
                            <Drawer.Title className="text-2xl font-black tracking-tight">Your Cart</Drawer.Title>
                            <Drawer.Description className="sr-only">Items currently in your shopping cart</Drawer.Description>
                            <Drawer.Close asChild>
                                <Button variant="ghost" size="icon" className="rounded-full">
                                    <X className="w-5 h-5" />
                                </Button>
                            </Drawer.Close>
                        </div>

                        <div className="space-y-6">
                            {cart?.items.map((item) => (
                                <div key={item.id} className="flex space-x-4">
                                    <div className="w-20 h-24 rounded-2xl overflow-hidden glass shrink-0">
                                        <img src={item.product.imageUrl} alt={item.product.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 space-y-2">
                                        <div className="flex justify-between">
                                            <h4 className="text-sm font-bold leading-tight line-clamp-2">{item.product.name}</h4>
                                            <button onClick={() => remove.mutate({ itemId: item.id })} className="text-muted-foreground hover:text-red-500">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <div className="flex items-center justify-between pt-2">
                                            <div className="flex items-center space-x-3 bg-muted/50 rounded-lg px-2 py-1">
                                                <button
                                                    onClick={() => updateQty.mutate({ itemId: item.id, quantity: Math.max(0, item.quantity - 1) })}
                                                    className="hover:text-primary transition-colors"
                                                >
                                                    <Minus className="w-3 h-3" />
                                                </button>
                                                <span className="text-xs font-bold">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQty.mutate({ itemId: item.id, quantity: item.quantity + 1 })}
                                                    className="hover:text-primary transition-colors"
                                                >
                                                    <Plus className="w-3 h-3" />
                                                </button>
                                            </div>
                                            <span className="text-sm font-black italic">₹{Number(item.price) * item.quantity}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {(!cart || cart.items.length === 0) && (
                                <div className="py-20 text-center space-y-4">
                                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto opacity-50">
                                        <ShoppingCart className="w-6 h-6" />
                                    </div>
                                    <p className="text-sm text-muted-foreground font-medium">Your cart feels lonely...</p>
                                    <Drawer.Close asChild>
                                        <Button variant="outline" className="rounded-full px-8">Start Shopping</Button>
                                    </Drawer.Close>
                                </div>
                            )}
                        </div>
                    </div>

                    {cart && cart.items.length > 0 && (
                        <div className="p-8 border-t bg-muted/20 space-y-6">
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm font-medium">
                                    <span className="text-muted-foreground">Subtotal</span>
                                    <span>₹{Number(cart.totalPrice)}</span>
                                </div>
                                <div className="flex justify-between text-sm font-medium">
                                    <span className="text-muted-foreground">GST (12%)</span>
                                    <span>₹{Number(cart.taxAmount).toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm font-medium">
                                    <span className="text-muted-foreground">Shipping</span>
                                    <span className="text-green-600">Calculated at checkout</span>
                                </div>
                                <Separator className="my-4" />
                                <div className="flex justify-between text-lg font-black">
                                    <span>Total</span>
                                    <span className="italic">₹{(Number(cart.totalPrice) + Number(cart.taxAmount)).toFixed(2)}</span>
                                </div>
                            </div>
                            <Link href="/checkout" className="block">
                                <Button className="w-full h-14 rounded-2xl font-black tracking-tight text-lg shadow-xl shadow-primary/20">
                                    CHECKOUT NOW
                                </Button>
                            </Link>
                        </div>
                    )}
                </Drawer.Content>
            </Drawer.Portal>
        </Drawer.Root>
    );
}
