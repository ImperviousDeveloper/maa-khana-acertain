import { createTRPCRouter, adminProcedure } from "~/server/api/trpc";

export const adminRouter = createTRPCRouter({
    getStats: adminProcedure.query(async ({ ctx }) => {
        const [userCount, productCount, orderCount, totalRevenue] = await Promise.all([
            ctx.db.user.count(),
            ctx.db.product.count(),
            ctx.db.order.count(),
            ctx.db.order.aggregate({
                _sum: { total: true },
                where: { status: "DELIVERED" },
            }),
        ]);

        const recentOrders = await ctx.db.order.findMany({
            take: 5,
            orderBy: { createdAt: "desc" },
            include: { user: true },
        });

        return {
            userCount,
            productCount,
            orderCount,
            totalRevenue: totalRevenue._sum.total ?? 0,
            recentOrders,
        };
    }),

    getRevenueAnalytics: adminProcedure.query(async ({ ctx }) => {
        // Basic day-wise revenue for last 7 days
        const last7Days = Array.from({ length: 7 }, (_, i) => {
            const d = new Date();
            d.setDate(d.getDate() - i);
            d.setHours(0, 0, 0, 0);
            return d;
        }).reverse();

        const data = await Promise.all(
            last7Days.map(async (date) => {
                const nextDate = new Date(date);
                nextDate.setDate(date.getDate() + 1);

                const sum = await ctx.db.order.aggregate({
                    _sum: { total: true },
                    where: {
                        createdAt: { gte: date, lt: nextDate },
                        status: "DELIVERED",
                    },
                });

                return {
                    date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
                    revenue: Number(sum._sum.total ?? 0),
                };
            })
        );

        return data;
    }),
});
