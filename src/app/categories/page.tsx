import { api } from "~/trpc/server";
import Link from "next/link";
import { HoverEffect } from "~/components/aceternity/hover-effect";
import { AuroraBackground } from "~/components/aceternity/aurora-background";
import { motion } from "framer-motion";

const CATEGORY_IMAGES: Record<string, string> = {
    "classic": "https://images.unsplash.com/photo-1599420186946-7b6fb4e297f0?q=80&w=1000",
    "spicy": "https://images.unsplash.com/photo-1512149177596-f817c7ef5d4c?q=80&w=1000",
    "sweet": "https://images.unsplash.com/photo-1621210185383-7474bbc14605?q=80&w=1000",
    "roasted": "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=1000",
};

export default async function CategoriesPage() {
    const categories = await api.category.list();

    const formattedCategories = categories.map((cat) => ({
        title: cat.name,
        description: `Explore our premium range of ${cat.name.toLowerCase()} makhana treats.`,
        link: `/categories/${cat.slug}`,
        // Using slug as key for images, fallback to a default if not found
        image: CATEGORY_IMAGES[cat.slug] || "https://images.unsplash.com/photo-1610970881699-44a1bb8280f3?q=80&w=1000"
    }));

    return (
        <div className="min-h-screen pt-24">
            <div className="max-w-7xl mx-auto px-6 space-y-12">
                <div className="space-y-4 text-center">
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter">Collections.</h1>
                    <p className="text-muted-foreground max-w-lg mx-auto text-lg">
                        Dive into our curated categories and find your favorite flavor of crunch.
                    </p>
                </div>

                <div className="py-12">
                    <HoverEffect items={formattedCategories} />
                </div>
            </div>
        </div>
    );
}
