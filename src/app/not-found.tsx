"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "~/components/ui/button";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-[#E0F2FE] flex flex-col items-center justify-center relative overflow-hidden font-sans">
            {/* Nav Mockup */}
            <div className="absolute top-8 left-1/2 -translate-x-1/2 w-full max-w-4xl px-6 z-20">
                <div className="glass dark:glass-dark rounded-2xl px-8 py-4 flex items-center justify-between border-white/40 shadow-xl shadow-blue-500/5">
                    <div className="text-2xl font-black tracking-tighter text-[#1E293B]">MAA KHANA</div>
                    <div className="hidden md:flex items-center space-x-8">
                        {[
                            { name: "Products", href: "/products" },
                            { name: "Categories", href: "/categories" },
                            { name: "Flash Sale", href: "/sale" }
                        ].map((item) => (
                            <Link key={item.name} href={item.href} className="text-sm font-bold text-[#1E293B]/60 hover:text-primary transition-colors">
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 flex flex-col items-center text-center px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="relative w-full max-w-2xl"
                >
                    <img
                        src="/images/cloud-404.png"
                        alt="404 Clouds"
                        className="w-full h-auto object-contain scale-110 md:scale-125"
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="space-y-6 mt-8 md:mt-12"
                >
                    <h1 className="text-4xl md:text-5xl font-black text-[#1E293B] tracking-tight">
                        Ooops! Page not found
                    </h1>
                    <p className="text-[#1E293B]/70 max-w-lg mx-auto text-lg leading-relaxed">
                        The page you are looking for doesn't exist or an error occurred.
                        Let's get you back on track.
                    </p>
                    <Link href="/" className="inline-block pt-4">
                        <Button
                            className="bg-linear-to-r from-[#A855F7] to-[#EC4899] hover:from-[#9333EA] hover:to-[#DB2777] text-white rounded-2xl h-14 px-12 font-black tracking-tight text-lg shadow-xl shadow-purple-500/20 transition-all hover:scale-105 active:scale-95"
                        >
                            Back to Home
                        </Button>
                    </Link>
                </motion.div>
            </div>

            {/* Background Details */}
            <div className="absolute top-1/4 left-10 w-32 h-32 bg-white/20 blur-3xl rounded-full" />
            <div className="absolute bottom-1/4 right-10 w-64 h-64 bg-white/30 blur-3xl rounded-full" />
        </div>
    );
}
