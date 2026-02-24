import { api } from "~/trpc/server";
import { ProductCard } from "../_components/product-card";
import { serialize } from "~/lib/utils";
import { Timer, Zap, Sparkles } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Meteors } from "~/components/aceternity/meteors";
import { Spotlight } from "~/components/aceternity/spotlight";

export default async function SalePage() {
    // For demo purposes, we'll fetch products and treat them as sale items
    const saleProducts = await api.product.list({ limit: 8 });

    return (
        <div className="min-h-screen bg-[#0F172A] text-white relative overflow-hidden">
            <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />

            <div className="max-w-7xl mx-auto px-6 pt-24 pb-32 relative z-10">
                <div className="flex flex-col items-center text-center space-y-8 mb-24">
                    <div className="inline-flex items-center space-x-2 px-6 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md">
                        <Zap className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-xs font-black uppercase tracking-[0.2em]">Flash Sale is Live</span>
                    </div>

                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter italic">
                        CRUNCHY <br />
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-yellow-200 via-yellow-400 to-yellow-600">DEALS.</span>
                    </h1>

                    <div className="flex items-center space-x-6 text-2xl font-black font-mono">
                        <div className="flex flex-col items-center">
                            <span className="text-5xl font-black">04</span>
                            <span className="text-[10px] uppercase tracking-widest text-white/40">Hours</span>
                        </div>
                        <span className="opacity-50">:</span>
                        <div className="flex flex-col items-center">
                            <span className="text-5xl font-black">32</span>
                            <span className="text-[10px] uppercase tracking-widest text-white/40">Mins</span>
                        </div>
                        <span className="opacity-50">:</span>
                        <div className="flex flex-col items-center">
                            <span className="text-5xl font-black">15</span>
                            <span className="text-[10px] uppercase tracking-widest text-white/40">Secs</span>
                        </div>
                    </div>

                    <p className="text-white/60 max-w-lg text-lg">
                        Get up to 50% off on our limited edition flavors. Hurry, the crunch won't last forever!
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {saleProducts.items.map((product) => (
                        <div key={product.id} className="relative group">
                            {/* Adding a custom 'Sale' badge overlay since it's a sale page */}
                            <div className="absolute -top-3 -right-3 z-20 bg-yellow-400 text-black px-4 py-1 rounded-full font-black text-xs rotate-12 shadow-xl border-2 border-black group-hover:scale-110 transition-transform">
                                40% OFF
                            </div>
                            <ProductCard product={serialize(product) as any} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Meteors background effect */}
            <Meteors number={40} />
        </div>
    );
}
