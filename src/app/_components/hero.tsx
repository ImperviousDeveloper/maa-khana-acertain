"use client";

import { motion } from "framer-motion";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import { Spotlight } from "~/components/aceternity/spotlight";
import { SparklesCore } from "~/components/aceternity/sparkles";
import { BackgroundGradient } from "~/components/aceternity/background-gradient";

export function Hero() {
    return (
        <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden bg-white dark:bg-black antialiased">
            {/* Background Gradients */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/20 blur-[120px] animate-pulse" />
                <div className="absolute top-[20%] right-[10%] w-[20%] h-[20%] rounded-full bg-purple-500/10 blur-[80px]" />
            </div>

            <Spotlight
                className="-top-40 left-0 md:left-60 md:-top-20"
                fill="rgba(var(--primary), 0.2)"
            />

            <div className="w-full absolute inset-0 z-0 opacity-30">
                <SparklesCore
                    id="tsparticlesfullpage"
                    background="transparent"
                    minSize={0.6}
                    maxSize={1.4}
                    particleDensity={70}
                    className="w-full h-full"
                    particleColor="#6366f1"
                />
            </div>

            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10 py-20">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-10"
                >
                    <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-primary/10 backdrop-blur-md border border-primary/20 text-xs font-black tracking-[0.15em] uppercase text-primary">
                        <span className="flex h-2 w-2 rounded-full bg-primary animate-ping mr-2" />
                        <span>✨ New Roasted Flavors Out Now</span>
                    </div>

                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none text-foreground">
                        Crunchy. <br />
                        Healthy. <br />
                        <span className="bg-linear-to-r from-primary via-purple-500 to-blue-500 bg-clip-text text-transparent italic">
                            Delicious.
                        </span>
                    </h1>

                    <p className="text-xl text-muted-foreground max-w-lg leading-relaxed font-medium">
                        Experience the crunch of premium quality foxnuts (makhana) roasted to perfection with exotic global flavors. Zero guilt, 100% taste.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <Link href="/products" className="w-full sm:w-auto">
                            <Button size="lg" className="w-full sm:w-auto rounded-2xl px-10 h-16 text-lg font-black group bg-primary text-white hover:scale-105 transition-transform shadow-2xl shadow-primary/30">
                                Shop Now
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                        <Link href="/categories" className="w-full sm:w-auto">
                            <Button variant="outline" size="lg" className="w-full sm:w-auto rounded-2xl px-10 h-16 text-lg font-black border-2 hover:bg-muted transition-all">
                                Explore Flavors
                            </Button>
                        </Link>
                    </div>

                    <div className="flex items-center space-x-12 pt-10 border-t border-muted/50">
                        <div>
                            <p className="text-4xl font-black tracking-tighter bg-linear-to-b from-foreground to-foreground/60 bg-clip-text text-transparent">50k+</p>
                            <p className="text-xs font-black uppercase tracking-widest text-muted-foreground mt-1">Happy Souls</p>
                        </div>
                        <div className="w-px h-12 bg-muted/50" />
                        <div>
                            <p className="text-4xl font-black tracking-tighter bg-linear-to-b from-foreground to-foreground/60 bg-clip-text text-transparent">15+</p>
                            <p className="text-xs font-black uppercase tracking-widest text-muted-foreground mt-1">Epic Flavors</p>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative flex justify-center items-center h-full group"
                >
                    <div className="relative w-full max-w-[550px] aspect-square flex items-center justify-center">
                        {/* Orbiting Orbs */}
                        <div className="absolute inset-0 z-0">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                                className="w-full h-full relative"
                            >
                                <div className="absolute top-10 left-10 w-4 h-4 rounded-full bg-primary blur-sm opacity-40" />
                                <div className="absolute bottom-20 right-20 w-6 h-6 rounded-full bg-blue-500 blur-sm opacity-20" />
                            </motion.div>
                        </div>

                        <motion.div
                            whileHover={{ scale: 1.02, rotateY: 5, rotateX: -5 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            className="relative z-10 w-[85%] h-[85%]"
                        >
                            <BackgroundGradient className="rounded-[4rem] p-1 bg-white dark:bg-zinc-900 overflow-hidden relative shadow-2xl h-full w-full">
                                <div className="h-full w-full bg-white dark:bg-zinc-950 rounded-[3.9rem] overflow-hidden group/img relative">
                                    <img
                                        src="/images/hero-makhana.png"
                                        alt="Premium Flavored Makhana"
                                        className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-1000"
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity" />
                                </div>
                            </BackgroundGradient>

                            {/* Floating Badges - Now Parented or Offset Sync */}
                            <motion.div
                                initial={{ x: 20, y: 20, opacity: 0 }}
                                animate={{
                                    x: [20, 30, 20],
                                    y: [20, 0, 20],
                                    opacity: 1
                                }}
                                whileHover={{ scale: 1.1, x: 40 }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    opacity: { duration: 0.5, delay: 0.5 }
                                }}
                                className="absolute -top-6 -right-5 z-20 glass dark:glass-dark px-6 py-4 rounded-3xl shadow-2xl border border-primary/20 backdrop-blur-2xl"
                            >
                                <div className="flex items-center space-x-3">
                                    <span className="text-2xl drop-shadow-lg">🍯</span>
                                    <div>
                                        <p className="text-[10px] font-black text-primary uppercase tracking-widest">Premium</p>
                                        <p className="text-sm font-black tracking-tight dark:text-white">Honey Glazed</p>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ x: -20, y: -20, opacity: 0 }}
                                animate={{
                                    x: [-20, -40, -20],
                                    y: [-20, 10, -20],
                                    opacity: 1
                                }}
                                whileHover={{ scale: 1.1, x: -50 }}
                                transition={{
                                    duration: 5,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: 0.2,
                                    opacity: { duration: 0.5, delay: 0.7 }
                                }}
                                className="absolute -bottom-6 -left-5 z-20 glass dark:glass-dark px-6 py-4 rounded-3xl shadow-2xl border border-blue-500/20 backdrop-blur-2xl"
                            >
                                <div className="flex items-center space-x-3">
                                    <span className="text-2xl drop-shadow-lg">🌶️</span>
                                    <div>
                                        <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Spicy</p>
                                        <p className="text-sm font-black tracking-tight dark:text-white">Peri Peri Soul</p>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Decorative Sparkles */}
                        <div className="absolute top-0 left-0 text-primary/40 animate-pulse pointer-events-none">
                            <Sparkles className="w-8 h-8" />
                        </div>
                        <div className="absolute bottom-10 right-0 text-blue-500/30 animate-pulse delay-700 pointer-events-none">
                            <Sparkles className="w-6 h-6" />
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
