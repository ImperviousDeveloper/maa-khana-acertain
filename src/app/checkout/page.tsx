"use client";

import { useState, useEffect } from "react";
import { api } from "~/trpc/react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import { ShoppingBag, Truck, CreditCard, ChevronRight, CheckCircle2, Plus } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { cn } from "~/lib/utils";
import { Badge } from "~/components/ui/badge";
import { AddressDialog } from "~/components/account/AddressDialog";

import { useSession } from "next-auth/react";

export default function CheckoutPage() {
    const router = useRouter();
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/auth/login?callbackUrl=/checkout");
        }
    }, [status, router]);

    const { data: cart } = api.cart.get.useQuery(undefined, {
        enabled: status === "authenticated",
    });
    const { data: user } = api.user.me.useQuery(undefined, {
        enabled: status === "authenticated",
    });
    const createOrder = api.order.create.useMutation({
        onSuccess: (order) => {
            toast.success("Order placed successfully!");
            router.push(`/account/orders/${order.id}`);
        },
        onError: (err) => {
            toast.error(err.message);
        },
    });

    const [step, setStep] = useState(1);
    const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
    const [paymentMethod, setPaymentMethod] = useState("COD");

    if (!cart || cart.items.length === 0) {
        return (
            <div className="max-w-4xl mx-auto px-6 py-20 text-center space-y-6">
                <h1 className="text-4xl font-black">Your cart is empty.</h1>
                <p className="text-muted-foreground">Add some delicious makhana to your cart before checking out.</p>
                <Button onClick={() => router.push("/products")} className="rounded-full px-8">Browse Products</Button>
            </div>
        );
    }

    const handlePlaceOrder = () => {
        if (!selectedAddress) {
            toast.error("Please select a shipping address");
            return;
        }
        createOrder.mutate({
            addressId: selectedAddress,
            paymentMethod,
        });
    };

    return (
        <div className="max-w-6xl mx-auto px-6 pt-12">
            <h1 className="text-4xl font-black tracking-tight mb-12">Secure Checkout</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Left Column: Steps */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Step 1: Address */}
                    <Card className={cn("rounded-[32px] border-none shadow-sm transition-all", step === 1 ? "ring-2 ring-primary bg-background" : "bg-muted/30 opacity-70")}>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <div className={cn("w-10 h-10 rounded-full flex items-center justify-center font-bold", step === 1 ? "bg-primary text-white" : "bg-muted text-muted-foreground")}>1</div>
                                <CardTitle className="text-xl font-bold">Shipping Address</CardTitle>
                            </div>
                            {step > 1 && <Button variant="ghost" onClick={() => setStep(1)} className="text-xs font-bold text-primary">Edit</Button>}
                        </CardHeader>
                        {step === 1 && (
                            <CardContent className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {user?.addresses.map((addr) => (
                                        <div
                                            key={addr.id}
                                            onClick={() => setSelectedAddress(addr.id)}
                                            className={cn(
                                                "p-4 rounded-2xl border-2 cursor-pointer transition-all",
                                                selectedAddress === addr.id ? "border-primary bg-primary/5 shadow-md" : "border-muted hover:border-primary/50"
                                            )}
                                        >
                                            <div className="flex justify-between items-start mb-2">
                                                <Badge variant="outline" className="text-[10px]">{addr.type}</Badge>
                                                {selectedAddress === addr.id && <CheckCircle2 className="w-4 h-4 text-primary" />}
                                            </div>
                                            <p className="text-sm font-bold">{addr.line1}</p>
                                            <p className="text-xs text-muted-foreground">{addr.city}, {addr.state} - {addr.zipCode}</p>
                                            <p className="text-xs font-medium mt-2">Ph: {addr.phone}</p>
                                        </div>
                                    ))}
                                    <AddressDialog
                                        trigger={
                                            <button className="p-4 rounded-2xl border-2 border-dashed border-muted hover:border-primary transition-all flex flex-col items-center justify-center text-muted-foreground hover:text-primary space-y-2 py-8 group">
                                                <Plus className="w-6 h-6 group-hover:scale-110 transition-transform" />
                                                <span className="text-xs font-bold uppercase tracking-wider">Add New Address</span>
                                            </button>
                                        }
                                    />
                                </div>
                                <Button
                                    disabled={!selectedAddress}
                                    onClick={() => setStep(2)}
                                    className="w-full h-12 rounded-xl font-bold"
                                >
                                    Continue to Payment <ChevronRight className="ml-2 w-4 h-4" />
                                </Button>
                            </CardContent>
                        )}
                    </Card>

                    {/* Step 2: Payment */}
                    <Card className={cn("rounded-[32px] border-none shadow-sm transition-all", step === 2 ? "ring-2 ring-primary bg-background" : "bg-muted/30 opacity-70")}>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <div className={cn("w-10 h-10 rounded-full flex items-center justify-center font-bold", step === 2 ? "bg-primary text-white" : "bg-muted text-muted-foreground")}>2</div>
                                <CardTitle className="text-xl font-bold">Payment Method</CardTitle>
                            </div>
                        </CardHeader>
                        {step === 2 && (
                            <CardContent className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {["Stripe", "Razorpay", "COD"].map((method) => (
                                        <div
                                            key={method}
                                            onClick={() => setPaymentMethod(method)}
                                            className={cn(
                                                "p-6 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between",
                                                paymentMethod === method ? "border-primary bg-primary/5 shadow-md" : "border-muted hover:border-primary/50"
                                            )}
                                        >
                                            <div className="flex items-center space-x-4">
                                                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-primary">
                                                    {method === 'COD' ? <Truck className="w-5 h-5" /> : <CreditCard className="w-5 h-5" />}
                                                </div>
                                                <span className="font-bold">{method === 'COD' ? 'Cash on Delivery' : method}</span>
                                            </div>
                                            {paymentMethod === method && <CheckCircle2 className="w-4 h-4 text-primary" />}
                                        </div>
                                    ))}
                                </div>
                                <Button
                                    onClick={handlePlaceOrder}
                                    className="w-full h-14 rounded-2xl font-black text-lg shadow-xl shadow-primary/20 mt-8"
                                >
                                    PLACE ORDER NOW
                                </Button>
                            </CardContent>
                        )}
                    </Card>
                </div>

                {/* Right Column: Order Summary */}
                <div className="space-y-6">
                    <Card className="rounded-[32px] border-none shadow-sm glass sticky top-24">
                        <CardHeader>
                            <CardTitle className="text-xl font-bold flex items-center space-x-2">
                                <ShoppingBag className="w-5 h-5" />
                                <span>Order Summary</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                                {cart.items.map((item) => (
                                    <div key={item.id} className="flex justify-between items-center text-sm">
                                        <span className="text-muted-foreground font-medium">{item.quantity}x {item.product.name}</span>
                                        <span className="font-bold">₹{Number(item.price) * item.quantity}</span>
                                    </div>
                                ))}
                            </div>
                            <Separator className="my-6" />
                            <div className="space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Subtotal</span>
                                    <span className="font-bold">₹{Number(cart.totalPrice)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Shipping</span>
                                    <span className="text-green-600 font-bold">FREE</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">GST (12%)</span>
                                    <span className="font-bold">₹{Number(cart.taxAmount).toFixed(2)}</span>
                                </div>
                                <Separator className="my-4" />
                                <div className="flex justify-between text-2xl font-black italic">
                                    <span>Total</span>
                                    <span>₹{(Number(cart.totalPrice) + Number(cart.taxAmount)).toFixed(2)}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="p-6 bg-primary/5 rounded-3xl border border-primary/10">
                        <p className="text-[10px] uppercase font-black tracking-widest text-primary/70 mb-2">Guaranteed Satisfaction</p>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            Every order is packed with love and care. If you're not happy with the crunch, we'll make it right.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
