import { api } from "~/trpc/server";
import { Hero } from "./_components/hero";
import { ProductCard } from "./_components/product-card";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { serialize } from "~/lib/utils";

import { DirectionAwareHover } from "~/components/aceternity/direction-aware-hover";
import { SparklesCore } from "~/components/aceternity/sparkles";
import { BackgroundGradient } from "~/components/aceternity/background-gradient";

export default async function HomePage() {
  const categories = await api.category.list();
  const featuredProducts = await api.product.list({ isFeatured: true, limit: 4 });

  return (
    <div className="space-y-32 pb-32 overflow-hidden">
      {/* Hero Section */}
      <Hero />

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-6 relative">
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-primary/10 blur-[150px] -z-10 rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-blue-500/10 blur-[150px] -z-10 rounded-full" />

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 space-y-4 md:space-y-0 text-center md:text-left">
          <div className="space-y-3">
            <div className="flex items-center justify-center md:justify-start space-x-2 text-primary font-black tracking-[0.2em] text-xs uppercase">
              <Sparkles className="w-4 h-4" />
              <span>Handpicked for you</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter italic">
              Featured <span className="bg-linear-to-r from-primary to-orange-400 bg-clip-text text-transparent">Treats.</span>
            </h2>
          </div>
          <Link href="/products">
            <Button variant="ghost" className="rounded-2xl group font-black px-8 h-12 border-2 hover:bg-muted transition-all">
              View all products
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {featuredProducts.items.map((product) => (
            <ProductCard key={product.id} product={serialize(product) as any} />
          ))}
        </div>
      </section>

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-6 relative">
        <div className="absolute top-[20%] left-[-20%] w-[600px] h-[600px] bg-purple-500/5 blur-[180px] -z-10 rounded-full" />

        <div className="text-center mb-20 space-y-6">
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter italic">Explore by <span className="bg-linear-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">Category.</span></h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg font-medium">
            Whether you want it spicy, sweet, or just pure and raw, we have the perfect makhana for every mood.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.slice(0, 3).map((category, index) => (
            <div key={category.id} className="relative group">
              <div className="absolute -inset-1 bg-linear-to-r from-primary to-purple-600 rounded-[2.5rem] blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <DirectionAwareHover
                imageUrl={index === 0 ? "https://images.unsplash.com/photo-1599420186946-7b6fb4e297f0?q=80&w=1000" : index === 1 ? "https://images.unsplash.com/photo-1512149177596-f817c7ef5d4c?q=80&w=1000" : "https://images.unsplash.com/photo-1621210185383-7474bbc14605?q=80&w=1000"}
                className="w-full aspect-video rounded-[2.5rem] relative"
              >
                <Link href={`/categories/${category.slug}`} className="space-y-2">
                  <h3 className="text-3xl font-black text-white tracking-tighter italic">{category.name}</h3>
                  <p className="text-white/80 text-sm font-black tracking-widest uppercase">
                    Shop collection →
                  </p>
                </Link>
              </DirectionAwareHover>
            </div>
          ))}
        </div>
      </section>

      {/* Brand Story / Why Us */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 -z-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-linear-to-b from-transparent via-primary/5 to-transparent -z-10" />

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center relative z-10">
          <div className="relative group">
            <div className="absolute -inset-4 bg-linear-to-r from-primary/20 to-blue-500/20 blur-3xl opacity-50 group-hover:opacity-100 transition duration-1000" />
            <div className="relative aspect-square rounded-[3rem] overflow-hidden rotate-2 group-hover:rotate-0 transition-transform duration-700 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1512149177596-f817c7ef5d4c?q=80&w=1000&auto=format&fit=crop"
                alt="Makhana Quality"
                className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
            </div>
          </div>

          <div className="space-y-10">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight italic">
              Roots in Tradition, <br />
              Made for the <span className="bg-linear-to-r from-primary to-orange-500 bg-clip-text text-transparent">Future.</span>
            </h2>
            <div className="space-y-6 text-muted-foreground leading-relaxed text-lg font-medium">
              <p>
                Maa Khana was born from a simple desire: to bring the ancient superfood of India, Foxnuts (Makhana), to the modern world in its most delicious form.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                {[
                  "Sourced directly from Bihar",
                  "Slow-roasted in olive oil",
                  "No artificial preservatives",
                  "High protein & fiber"
                ].map((text, i) => (
                  <li key={i} className="flex items-center space-x-3">
                    <div className="flex-none w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-[10px] font-black">✓</div>
                    <span className="text-foreground font-bold">{text}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Button size="lg" className="rounded-2xl px-12 h-16 text-lg font-black shadow-2xl shadow-primary/20 bg-primary text-white hover:scale-105 transition-transform">Read Our Story</Button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="max-w-5xl mx-auto px-6 text-center">
        <BackgroundGradient className="rounded-[4rem] p-1 bg-white dark:bg-zinc-900 overflow-hidden relative">
          <div className="bg-white dark:bg-zinc-950 p-16 md:p-24 rounded-[3.9rem] space-y-10 relative overflow-hidden">
            <div className="absolute inset-0 z-0">
              <SparklesCore
                id="newsletter-sparkles"
                background="transparent"
                minSize={0.4}
                maxSize={1}
                particleDensity={40}
                className="w-full h-full"
                particleColor="var(--primary)"
              />
            </div>
            <div className="relative z-10 space-y-10">
              <div className="w-20 h-20 bg-primary/20 rounded-[2rem] flex items-center justify-center mx-auto mb-8 animate-bounce">
                <Sparkles className="w-10 h-10 text-primary" />
              </div>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter italic leading-none">
                Join the <br /> <span className="bg-linear-to-r from-primary to-orange-500 bg-clip-text text-transparent underline decoration-primary decoration-double">Flavor Revolution.</span>
              </h2>
              <p className="text-muted-foreground max-w-md mx-auto text-lg font-medium">
                Get notified about limited edition flavors and flash sales. No spam, just crunch.
              </p>
              <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto pt-6">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 bg-muted/50 border-none rounded-2xl px-8 py-5 focus:outline-none focus:ring-2 focus:ring-primary font-bold text-lg"
                />
                <Button size="lg" className="rounded-2xl px-12 h-full font-black text-lg bg-primary text-white hover:scale-105 transition-transform shadow-xl shadow-primary/20">Subscribe</Button>
              </form>
            </div>
          </div>
        </BackgroundGradient>
      </section>
    </div>
  );
}
