import { api } from "~/trpc/server";
import { notFound } from "next/navigation";
import {
    Package,
    Truck,
    CheckCircle2,
    Clock,
    MapPin,
    CreditCard
} from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

export default async function OrderDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const order = await api.order.getById({ id });

    if (!order) {
        notFound();
    }

    const steps = [
        { label: "Ordered", status: "PENDING", icon: Clock },
        { label: "Processing", status: "PROCESSING", icon: Package },
        { label: "Shipped", status: "SHIPPED", icon: Truck },
        { label: "Delivered", status: "DELIVERED", icon: CheckCircle2 },
    ];

    const currentStep = steps.findIndex(s => s.status === order.status);

    return (
        <div className="max-w-4xl mx-auto px-6 pt-12 space-y-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <p className="text-xs font-bold text-primary uppercase tracking-widest mb-2">Order Status</p>
                    <h1 className="text-4xl font-black tracking-tight">Order #{order.id.slice(-8).toUpperCase()}</h1>
                </div>
                <Badge variant="outline" className="h-8 px-4 rounded-full text-sm font-bold bg-primary/5 border-primary/20">
                    {order.status}
                </Badge>
            </div>

            {/* Progress Bars */}
            <div className="grid grid-cols-4 gap-2">
                {steps.map((step, idx) => (
                    <div key={step.label} className="space-y-4">
                        <div className={cn(
                            "h-2 rounded-full transition-all duration-500",
                            idx <= currentStep ? "bg-primary" : "bg-muted"
                        )} />
                        <div className="flex flex-col items-center text-center space-y-1">
                            <step.icon className={cn("w-5 h-5", idx <= currentStep ? "text-primary" : "text-muted-foreground")} />
                            <span className={cn("text-[10px] font-bold uppercase tracking-tight", idx <= currentStep ? "text-primary" : "text-muted-foreground")}>
                                {step.label}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="rounded-[32px] border-none shadow-sm glass">
                    <CardHeader>
                        <CardTitle className="text-lg font-bold flex items-center space-x-2">
                            <MapPin className="w-5 h-5 text-primary" />
                            <span>Shipping Information</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm space-y-1">
                        <p className="font-bold">Method: {order.shipping?.method}</p>
                        <p className="text-muted-foreground">Status: {order.status}</p>
                        {order.shipping?.trackingNumber && (
                            <p className="text-muted-foreground">Tracking: {order.shipping.trackingNumber}</p>
                        )}
                    </CardContent>
                </Card>

                <Card className="rounded-[32px] border-none shadow-sm glass">
                    <CardHeader>
                        <CardTitle className="text-lg font-bold flex items-center space-x-2">
                            <CreditCard className="w-5 h-5 text-primary" />
                            <span>Payment Information</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Method</span>
                            <span className="font-bold uppercase">{order.payment?.method ?? "COD"}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Status</span>
                            <Badge className="text-[10px] font-black uppercase">{order.payment?.status ?? "PENDING"}</Badge>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Items List */}
            <Card className="rounded-[40px] border-none shadow-sm">
                <CardHeader>
                    <CardTitle className="text-xl font-bold">Order Items</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="divide-y">
                        {order.items.map((item) => (
                            <div key={item.id} className="py-6 flex items-center space-x-6">
                                <div className="w-20 h-24 rounded-2xl overflow-hidden glass shrink-0">
                                    <img src={item.product.imageUrl} alt={item.product.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-lg">{item.product.name}</h4>
                                    <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-black italic text-lg">₹{Number(item.price) * item.quantity}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <Separator className="my-8" />

                    <div className="space-y-4 max-w-xs ml-auto">
                        <div className="flex justify-between text-2xl font-black italic pt-4 border-t">
                            <span>Total</span>
                            <span className="text-primary">₹{Number(order.total)}</span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="text-center pt-12">
                <Button variant="outline" className="rounded-full px-8">Need help with this order?</Button>
            </div>
        </div>
    );
}

