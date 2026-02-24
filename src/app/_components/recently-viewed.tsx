"use client";

import { useEffect } from "react";
import { api } from "~/trpc/react";
import { ProductCard } from "./product-card";
import { Sparkles } from "lucide-react";

import { useSession } from "next-auth/react";

export function RecentlyViewed({ productId }: { productId?: number }) {
    const { data: session } = useSession();
    const { data: recentlyViewed, refetch } = api.product.getRecentlyViewed.useQuery(undefined, {
        enabled: !!session,
    });
    const recordView = api.product.recordView.useMutation({
        onSuccess: () => refetch(),
    });

    useEffect(() => {
        if (productId && session) {
            recordView.mutate({ productId });
        }
    }, [productId, session]);

    if (!recentlyViewed || recentlyViewed.length === 0) return null;

    return (
        <section className="max-w-6xl mx-auto px-6 py-24">
            <div className="flex items-center space-x-2 text-primary font-bold tracking-widest text-xs uppercase mb-12">
                <Sparkles className="w-4 h-4" />
                <span>You recently looked at</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {recentlyViewed.map((item) => (
                    <ProductCard key={item.id} product={item.product as any} />
                ))}
            </div>
        </section>
    );
}
