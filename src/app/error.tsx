"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "~/components/ui/button";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-screen bg-[#0F172A] flex items-center justify-center p-6 font-sans">
            {/* Browser Frame Mockup */}
            <div className="w-full max-w-5xl aspect-video bg-[#1E293B] rounded-[40px] shadow-2xl overflow-hidden border border-white/5 flex flex-col relative">
                {/* Browser Title Bar */}
                <div className="h-12 bg-black/20 flex items-center px-6 space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>

                <div className="flex-1 relative flex flex-col items-center justify-center overflow-hidden">
                    {/* Background Image Container */}
                    <div className="absolute inset-0 z-0">
                        <img
                            src="/images/ocean-404.png"
                            alt="Slipped into the ocean"
                            className="w-full h-full object-cover opacity-80"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-[#0F172A] via-transparent to-transparent " />
                    </div>

                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="relative z-10 text-center px-8 space-y-6 pt-24 md:pt-32"
                    >
                        <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight drop-shadow-lg">
                            Oops. This page slipped into the ocean.
                        </h1>
                        <p className="text-white/60 max-w-md mx-auto text-base md:text-lg font-medium">
                            An unexpected error occurred and the current view was lost at sea.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                            <Button
                                onClick={() => reset()}
                                variant="outline"
                                className="rounded-full h-14 px-10 border-white/20 text-white hover:bg-white/10 font-bold text-lg backdrop-blur-md transition-all"
                            >
                                Try Again
                            </Button>
                            <Button
                                onClick={() => window.location.href = "/"}
                                className="bg-[#22D3EE] hover:bg-[#06B6D4] text-[#083344] font-black rounded-full h-14 px-10 text-lg shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all hover:scale-105 active:scale-95"
                            >
                                Back to Home
                            </Button>
                        </div>
                    </motion.div>

                    {/* Bubble Decorations */}
                    {[...Array(6)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute bg-white/10 rounded-full blur-[2px]"
                            style={{
                                width: Math.random() * 20 + 10,
                                height: Math.random() * 20 + 10,
                                left: `${Math.random() * 100}%`,
                                bottom: '-10%',
                            }}
                            animate={{
                                y: ['0%', '-120vh'],
                                x: ['0%', `${(Math.random() - 0.5) * 50}px`],
                            }}
                            transition={{
                                duration: Math.random() * 5 + 5,
                                repeat: Infinity,
                                ease: 'linear',
                                delay: Math.random() * 5,
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
