"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ShoppingCart, User, Search, Menu, X, Heart } from "lucide-react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { signIn, signOut, useSession } from "next-auth/react";
import { CartDrawer } from "~/components/cart/CartDrawer";
import { HeaderSearch } from "./HeaderSearch";

const navItems = [
    { name: "Products", href: "/products" },
    { name: "Categories", href: "/categories" },
    { name: "Flash Sale", href: "/sale" },
];

export function Header() {
    const pathname = usePathname();
    const { data: session } = useSession();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4 transition-all duration-300">
            <nav className="glass dark:glass-dark flex items-center justify-between w-full max-w-6xl px-6 py-3 rounded-2xl">
                {/* Logo */}
                <Link href="/" className="text-2xl font-bold tracking-tighter bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
                    MAA KHANA
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center space-x-8">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "text-sm font-medium transition-colors hover:text-primary",
                                pathname === item.href ? "text-primary" : "text-muted-foreground"
                            )}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-4">
                    <HeaderSearch />
                    <Link href="/wishlist">
                        <Button variant="ghost" size="icon" className="rounded-full">
                            <Heart className="w-5 h-5" />
                        </Button>
                    </Link>
                    <CartDrawer />

                    {session ? (
                        <Link href="/account">
                            <Button variant="ghost" size="icon" className="rounded-full overflow-hidden border transition-transform hover:scale-105">
                                {session.user?.image ? (
                                    <img src={session.user.image} alt="User" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                                        <User className="w-5 h-5 text-primary" />
                                    </div>
                                )}
                            </Button>
                        </Link>
                    ) : (
                        <div className="flex items-center space-x-2">
                            <Link href="/auth/login" className="hidden sm:block">
                                <Button variant="ghost" size="sm" className="rounded-full px-5 font-bold">
                                    Login
                                </Button>
                            </Link>
                            <Link href="/auth/signup">
                                <Button variant="default" size="sm" className="rounded-full px-6 font-bold shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95">
                                    Sign Up
                                </Button>
                            </Link>
                        </div>
                    )}

                    {/* Mobile Menu Toggle */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden rounded-full"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </Button>
                </div>
            </nav>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-20 left-4 right-4 z-40 p-8 md:hidden glass rounded-[32px] flex flex-col space-y-6 shadow-2xl border-none"
                >
                    <div className="flex flex-col space-y-4">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-xl font-black tracking-tight py-2 border-b border-muted/20"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    {!session && (
                        <div className="grid grid-cols-2 gap-4 pt-4">
                            <Link href="/auth/login" onClick={() => setIsMobileMenuOpen(false)}>
                                <Button variant="outline" className="w-full rounded-2xl h-12 font-bold">Login</Button>
                            </Link>
                            <Link href="/auth/signup" onClick={() => setIsMobileMenuOpen(false)}>
                                <Button variant="default" className="w-full rounded-2xl h-12 font-bold">Sign Up</Button>
                            </Link>
                        </div>
                    )}

                    <Link href="/products" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button variant="default" className="w-full rounded-2xl h-14 font-black italic tracking-tighter text-lg">
                            SHOP THE COLLECTION →
                        </Button>
                    </Link>
                </motion.div>
            )}
        </header>
    );
}
