import { AuroraBackground } from "~/components/aceternity/aurora-background";
import { BackgroundGradient } from "~/components/aceternity/background-gradient";
import { SparklesCore } from "~/components/aceternity/sparkles";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import { ArrowRight, Leaf, Heart, Users, Globe } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="min-h-screen">
            {/* Header Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-black antialiased">
                <div className="w-full absolute inset-0 h-full">
                    <SparklesCore
                        id="about-sparkles"
                        background="transparent"
                        minSize={0.6}
                        maxSize={1.4}
                        particleDensity={100}
                        className="w-full h-full"
                        particleColor="#FFFFFF"
                    />
                </div>
                <div className="relative z-10 text-center space-y-4">
                    <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter italic">
                        OUR <span className="text-primary underline decoration-sky-500 underline-offset-8">STORY.</span>
                    </h1>
                    <p className="text-white/60 text-lg md:text-xl font-medium max-w-lg mx-auto">
                        Preserving tradition, one crunch at a time.
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <div className="max-w-6xl mx-auto px-6 py-24 space-y-32">
                {/* Section 1 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div className="space-y-6">
                        <h2 className="text-4xl md:text-5xl font-black tracking-tighter">Born in the <span className="text-primary italic">Waters.</span></h2>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                            Makhana, or Foxnuts, are unique seeds harvested from the Euryale ferox plant, which grows in the shallow waters of wetlands. Our journey began in the heart of Bihar, where these seeds have been harvested for generations.
                        </p>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                            At Maa Khana, we wanted to bridge the gap between this ancient nutritional powerhouse and the modern lifestyle of the global snack lover.
                        </p>
                    </div>
                    <div className="relative aspect-video rounded-[2.5rem] overflow-hidden rotate-2 shadow-2xl">
                        <img
                            src="https://images.unsplash.com/photo-1599420186946-7b6fb4e297f0?q=80&w=1000"
                            alt="Makhana Source"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                {/* Values Section */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {[
                        { icon: Leaf, title: "100% Organic", desc: "No chemicals, just pure nature." },
                        { icon: Heart, title: "Heart Healthy", desc: "Roasted in olive oil, zero trans fat." },
                        { icon: Users, title: "Fair Trade", desc: "Empowering 500+ local farmers." },
                        { icon: Globe, title: "Global Taste", desc: "Authentic Indian seeds, global flavors." },
                    ].map((item, i) => (
                        <BackgroundGradient key={i} className="rounded-[22px] p-8 bg-white dark:bg-zinc-900 h-full">
                            <item.icon className="w-10 h-10 text-primary mb-6" />
                            <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400 font-medium">
                                {item.desc}
                            </p>
                        </BackgroundGradient>
                    ))}
                </div>

                {/* Closing Section */}
                <div className="bg-primary/5 rounded-[3rem] p-12 md:p-24 text-center space-y-8">
                    <h2 className="text-4xl md:text-6xl font-black tracking-tighter">Ready to join the <br /> <span className="italic">Crunch Revolution?</span></h2>
                    <Link href="/products" className="inline-block">
                        <Button size="lg" className="rounded-full h-14 px-12 text-lg font-bold shadow-2xl shadow-primary/20 transition-all hover:scale-105">
                            Shop All Flavors
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
