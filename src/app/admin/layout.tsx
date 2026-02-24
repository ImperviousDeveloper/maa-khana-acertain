import { auth } from "~/server/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Users,
    Tag,
    Settings,
    BarChart3,
    MessageSquare,
    Layers
} from "lucide-react";

const adminNav = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Products", href: "/admin/products", icon: Package },
    { name: "Orders", href: "/admin/orders", icon: ShoppingCart },
    { name: "Users", href: "/admin/users", icon: Users },
    { name: "Categories", href: "/admin/categories", icon: Layers },
    { name: "Coupons", href: "/admin/coupons", icon: Tag },
    { name: "Reviews", href: "/admin/reviews", icon: MessageSquare },
    { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
];

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    if (session?.user?.role !== "ADMIN") {
        redirect("/");
    }

    return (
        <div className="flex min-h-screen bg-muted/20">
            {/* Admin Sidebar */}
            <aside className="fixed left-0 top-0 bottom-0 w-64 border-r bg-background/50 backdrop-blur-md hidden lg:flex flex-col z-50 pt-20">
                <div className="px-6 py-8 space-y-6">
                    <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest px-2">
                        Management
                    </div>
                    <nav className="flex flex-col space-y-1">
                        {adminNav.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors hover:bg-primary/10 hover:text-primary group"
                            >
                                <item.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                                <span>{item.name}</span>
                            </Link>
                        ))}
                    </nav>
                </div>

                <div className="mt-auto p-6 border-t">
                    <Link href="/admin/settings" className="flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors hover:bg-muted">
                        <Settings className="w-5 h-5 text-muted-foreground" />
                        <span>Settings</span>
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 lg:ml-64 p-8">
                <div className="max-w-7xl mx-auto space-y-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
