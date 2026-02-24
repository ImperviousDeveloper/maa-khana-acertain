import { api } from "~/trpc/server";
import { auth } from "~/server/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
    Package,
    MapPin,
    Settings,
    ChevronRight,
    Clock,
    Heart,
    User as UserIcon
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { cn } from "~/lib/utils";

export default async function AccountPage() {
    const session = await auth();
    if (!session) {
        redirect("/api/auth/signin");
    }

    const user = await api.user.me();
    if (!user) {
        redirect("/api/auth/signin");
    }

    const orders = await api.order.list();
    const wishlist = await api.wishlist.list();

    const isAdmin = user.role === "ADMIN";

    return (
        <div className="max-w-6xl mx-auto px-6 pt-12 space-y-12 pb-24">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div className="flex items-center space-x-6">
                    <div className="w-24 h-24 rounded-[32px] bg-primary/10 flex items-center justify-center text-primary relative">
                        {user.image ? (
                            <img src={user.image} className="w-full h-full rounded-[32px] object-cover" />
                        ) : (
                            <UserIcon className="w-10 h-10" />
                        )}
                        {isAdmin && (
                            <div className="absolute -top-1 -right-1 w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                                <Settings className="w-3 h-3 text-white animate-spin-slow" />
                            </div>
                        )}
                    </div>
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-4xl font-black tracking-tighter">Hi, {user.name?.split(" ")[0]}!</h1>
                            {isAdmin && (
                                <Badge className="bg-amber-500/10 text-amber-600 border-amber-200 h-6 px-2 rounded-lg font-black text-[9px] uppercase tracking-tighter">
                                    STAFF
                                </Badge>
                            )}
                        </div>
                        <p className="text-muted-foreground">{user.email}</p>
                    </div>
                </div>
                <Badge className={cn(
                    "h-8 px-4 rounded-full font-bold uppercase tracking-widest text-[10px]",
                    isAdmin
                        ? "bg-amber-500 text-white border-none shadow-lg shadow-amber-500/20"
                        : "bg-primary/5 text-primary border-primary/20"
                )}>
                    {user.role} {isAdmin ? "ACCESS" : "MEMBER"}
                </Badge>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Stats */}
                <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <Card className="rounded-[40px] border-none shadow-sm glass overflow-hidden group">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center justify-between">
                                Recent Orders
                                <Package className="w-4 h-4 text-primary" />
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-black italic">{orders.length}</div>
                            <p className="text-xs text-muted-foreground mt-1">Total orders placed</p>
                        </CardContent>
                    </Card>

                    <Card className="rounded-[40px] border-none shadow-sm glass overflow-hidden">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center justify-between">
                                Wishlist
                                <Heart className="w-4 h-4 text-red-500" />
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-black italic">{wishlist.length}</div>
                            <p className="text-xs text-muted-foreground mt-1">Items saved for later</p>
                        </CardContent>
                    </Card>

                    {/* Order History List */}
                    <Card className="rounded-[40px] border-none shadow-sm sm:col-span-2">
                        <CardHeader>
                            <CardTitle className="text-xl font-bold flex items-center justify-between">
                                Recent Order Activity
                                <Link href="/account/orders" className="text-xs font-black text-primary uppercase tracking-widest hover:underline">View All</Link>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="divide-y">
                                {orders.slice(0, 3).map((order) => (
                                    <Link
                                        key={order.id}
                                        href={`/account/orders/${order.id}`}
                                        className="py-4 flex items-center justify-between group"
                                    >
                                        <div className="flex items-center space-x-4">
                                            <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center shrink-0">
                                                <Clock className="w-5 h-5 text-muted-foreground" />
                                            </div>
                                            <div>
                                                <p className="font-bold">Order #{order.id.slice(-8).toUpperCase()}</p>
                                                <p className="text-xs text-muted-foreground">{new Date(order.createdAt).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <Badge className="text-[10px] font-black uppercase" variant="secondary">{order.status}</Badge>
                                            <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </Link>
                                ))}
                                {orders.length === 0 && (
                                    <div className="py-8 text-center text-muted-foreground text-sm italic">
                                        No orders found yet.
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar Actions */}
                <div className="space-y-6">
                    <h3 className="text-xs font-black uppercase tracking-widest text-primary ml-1">Account Management</h3>
                    <div className="grid grid-cols-1 gap-3">
                        {[
                            { label: "My Profile", icon: UserIcon, href: "/account/profile" },
                            { label: "Shipping Addresses", icon: MapPin, href: "/account/addresses" },
                            { label: "Wishlist", icon: Heart, href: "/wishlist" },
                            { label: "Settings", icon: Settings, href: "/account/settings" },
                        ].map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className="flex items-center justify-between p-5 rounded-[24px] glass hover:bg-white/40 transition-all group"
                            >
                                <div className="flex items-center space-x-4">
                                    <item.icon className="w-5 h-5 text-primary" />
                                    <span className="font-bold text-sm">{item.label}</span>
                                </div>
                                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                            </Link>
                        ))}
                    </div>

                    <div className="pt-8">
                        <Link
                            href="/api/auth/signout"
                            className="block w-full text-center py-4 rounded-2xl bg-red-500/10 text-red-500 font-black text-sm uppercase tracking-widest hover:bg-red-500/20 transition-all"
                        >
                            Sign Out
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
