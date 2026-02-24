import { api } from "~/trpc/server";
import {
    Users,
    ShoppingCart,
    Package,
    TrendingUp,
    ArrowUpRight,
    ArrowDownRight
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export default async function AdminDashboard() {
    const stats = await api.admin.getStats();

    const cards = [
        {
            title: "Total Revenue",
            value: `₹${Number(stats.totalRevenue).toLocaleString()}`,
            icon: TrendingUp,
            trend: "+12.5%",
            trendUp: true
        },
        {
            title: "Total Orders",
            value: stats.orderCount,
            icon: ShoppingCart,
            trend: "+5.2%",
            trendUp: true
        },
        {
            title: "Total Products",
            value: stats.productCount,
            icon: Package,
            trend: "Stable",
            trendUp: true
        },
        {
            title: "Active Users",
            value: stats.userCount,
            icon: Users,
            trend: "+8.1%",
            trendUp: true
        },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-black tracking-tight">Dashboard Overview</h1>
                <p className="text-muted-foreground">Welcome back, Admin. Here's what's happening today.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {cards.map((card) => (
                    <Card key={card.title} className="rounded-3xl border-none shadow-sm glass">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                                {card.title}
                            </CardTitle>
                            <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center">
                                <card.icon className="w-5 h-5 text-primary" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-black">{card.value}</div>
                            <div className={`mt-2 text-xs font-bold flex items-center ${card.trendUp ? 'text-green-500' : 'text-red-500'}`}>
                                {card.trendUp ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                                {card.trend}
                                <span className="text-muted-foreground font-medium ml-1">vs last month</span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="rounded-[32px] border-none shadow-sm min-h-[400px]">
                    <CardHeader>
                        <CardTitle className="text-lg font-bold">Recent Orders</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            {stats.recentOrders.map((order: any) => (
                                <div key={order.id} className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center font-bold text-xs">
                                            {order.user?.name?.charAt(0) ?? "U"}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold">{order.user?.name ?? "Guest"}</p>
                                            <p className="text-[10px] text-muted-foreground uppercase">{order.status}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-black">₹{Number(order.total)}</p>
                                        <p className="text-[10px] text-muted-foreground">
                                            {new Date(order.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            ))}
                            {stats.recentOrders.length === 0 && (
                                <p className="text-sm text-muted-foreground text-center py-12">No recent orders yet.</p>
                            )}
                        </div>
                    </CardContent>
                </Card>

                <Card className="rounded-[32px] border-none shadow-sm min-h-[400px] flex items-center justify-center text-center p-12">
                    <div className="space-y-4">
                        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-6 opacity-50">
                            <TrendingUp className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold">Revenue Analytics Chart</h3>
                        <p className="text-sm text-muted-foreground">
                            Interactive chart would go here. Data is ready in `api.admin.getRevenueAnalytics`.
                        </p>
                    </div>
                </Card>
            </div>
        </div>
    );
}
