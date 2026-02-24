import { api } from "~/trpc/server";
import { auth } from "~/server/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
    Package,
    ChevronRight,
    Search,
    Clock,
    CheckCircle2,
    Truck,
    AlertCircle,
    ArrowLeft
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";

export default async function OrderHistoryPage() {
    const session = await auth();
    if (!session) {
        redirect("/api/auth/signin");
    }

    const orders = await api.order.list();

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "DELIVERED": return <CheckCircle2 className="w-4 h-4 text-green-500" />;
            case "SHIPPED": return <Truck className="w-4 h-4 text-blue-500" />;
            case "CANCELLED": return <AlertCircle className="w-4 h-4 text-red-500" />;
            default: return <Clock className="w-4 h-4 text-primary" />;
        }
    };

    return (
        <div className="max-w-6xl mx-auto px-6 pt-12 space-y-12 pb-24">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-4">
                    <Link href="/account" className="inline-flex items-center text-sm font-bold text-muted-foreground hover:text-primary transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Account
                    </Link>
                    <h1 className="text-4xl font-black tracking-tighter italic">Order <span className="text-primary">History.</span></h1>
                    <p className="text-muted-foreground text-sm font-medium">Track your shipments and view past purchases.</p>
                </div>

                <div className="flex items-center space-x-4">
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <input
                            placeholder="Search orders..."
                            className="bg-muted/50 border-none rounded-2xl pl-12 pr-6 py-3 text-sm font-bold focus:ring-2 focus:ring-primary outline-none min-w-[300px]"
                        />
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                {orders.map((order) => (
                    <Card key={order.id} className="group rounded-[32px] border-none shadow-sm glass hover:bg-white/40 transition-all overflow-hidden">
                        <Link href={`/account/orders/${order.id}`}>
                            <CardContent className="p-0">
                                <div className="p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                                    <div className="flex items-center space-x-6">
                                        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                                            <Package className="w-8 h-8 text-primary" />
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Order ID</p>
                                            <p className="text-lg font-black tracking-tight">#{order.id.slice(-8).toUpperCase()}</p>
                                            <p className="text-xs font-bold text-muted-foreground">{new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-8 flex-1 lg:max-w-xl">
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Status</p>
                                            <div className="flex items-center space-x-2">
                                                {getStatusIcon(order.status)}
                                                <span className="text-sm font-black capitalize">{order.status.toLowerCase().replace(/_/g, ' ')}</span>
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Total Amount</p>
                                            <p className="text-sm font-black">₹{Number(order.total)}</p>
                                        </div>
                                        <div className="space-y-1 hidden md:block">
                                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Delivery</p>
                                            <p className="text-sm font-black text-muted-foreground">Standard Delivery</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between lg:justify-end gap-6 pt-4 lg:pt-0 border-t lg:border-none border-muted/20">
                                        <Badge variant="secondary" className="rounded-full px-4 py-1 font-black text-[10px] uppercase bg-muted/50 group-hover:bg-primary group-hover:text-white transition-colors">
                                            VIEW DETAILS
                                        </Badge>
                                        <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:translate-x-2 transition-transform" />
                                    </div>
                                </div>
                            </CardContent>
                        </Link>
                    </Card>
                ))}

                {orders.length === 0 && (
                    <div className="text-center py-20 space-y-6">
                        <div className="w-24 h-24 bg-muted/30 rounded-[32px] flex items-center justify-center mx-auto opacity-50">
                            <Package className="w-12 h-12 text-muted-foreground" />
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-2xl font-black italic">No orders yet.</h2>
                            <p className="text-muted-foreground text-sm font-medium">Your delicious treats are just a few clicks away!</p>
                        </div>
                        <Link href="/products">
                            <Button className="rounded-2xl h-14 px-10 font-black text-lg bg-primary text-white shadow-xl shadow-primary/20 hover:scale-105 transition-transform">
                                START SHOPPING
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
