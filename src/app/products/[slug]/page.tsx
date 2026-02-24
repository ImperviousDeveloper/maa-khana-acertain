import { api } from "~/trpc/server";
import { notFound } from "next/navigation";
import {
    Star,
    ShieldCheck,
    Truck,
    RefreshCcw,
    ShoppingCart,
    Heart
} from "lucide-react";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { Separator } from "~/components/ui/separator";
import { RecentlyViewed } from "../../_components/recently-viewed";
import { ProductActions } from "./_components/product-actions";

import { CardBody, CardContainer, CardItem } from "~/components/aceternity/3d-card";
import { BackgroundGradient } from "~/components/aceternity/background-gradient";

export default async function ProductPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const product = await api.product.getBySlug({ slug });

    if (!product) {
        notFound();
    }

    return (
        <div className="max-w-6xl mx-auto px-6 pt-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                {/* Gallery */}
                <div className="space-y-6">
                    <CardContainer className="inter-var">
                        <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/10 dark:bg-black dark:border-white/20 border-black/10 w-auto h-auto rounded-[40px] p-6 border transition-all duration-200 ease-linear">
                            <CardItem
                                translateZ="50"
                                className="text-xl font-bold text-neutral-600 dark:text-white"
                            >
                                {product.name}
                            </CardItem>
                            <CardItem
                                translateZ="100"
                                className="w-full mt-4"
                            >
                                <img
                                    src={product.imageUrl}
                                    alt={product.name}
                                    className="h-[500px] w-full object-cover rounded-[30px] group-hover/card:shadow-xl"
                                />
                            </CardItem>
                        </CardBody>
                    </CardContainer>

                    <div className="grid grid-cols-4 gap-4">
                        {product.images.map((img) => (
                            <div key={img.id} className="aspect-square rounded-2xl overflow-hidden glass cursor-pointer hover:ring-2 ring-primary transition-all">
                                <img src={img.url} alt="Gallery" className="w-full h-full object-cover" />
                            </div>
                        ))}
                        {/* Placeholder gallery if empty */}
                        {product.images.length === 0 && Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="aspect-square rounded-2xl overflow-hidden glass bg-muted/50" />
                        ))}
                    </div>
                </div>

                {/* Info */}
                <div className="space-y-8 py-4">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold tracking-widest uppercase text-primary/70">{product.category.name}</span>
                            <div className="flex items-center space-x-1 text-orange-500 bg-orange-500/10 px-3 py-1 rounded-full text-xs font-bold">
                                <Star className="w-4 h-4 fill-current" />
                                <span>{product.rating} ({product.reviewsCount} reviews)</span>
                            </div>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black tracking-tighter leading-none dark:text-white">{product.name}</h1>
                        <p className="text-muted-foreground leading-relaxed text-lg">
                            {product.description}
                        </p>
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-baseline space-x-4">
                            <span className="text-4xl font-black italic dark:text-neutral-200">₹{Number(product.specialPrice ?? product.price)}</span>
                            {product.specialPrice && (
                                <span className="text-xl text-muted-foreground line-through">₹{Number(product.price)}</span>
                            )}
                        </div>
                        <p className="text-xs font-medium text-green-600">Inclusive of all taxes</p>
                    </div>

                    <Separator />

                    <ProductActions productId={product.id} variants={product.variants} />

                    {/* Trust Badges */}
                    <div className="grid grid-cols-3 gap-4 pt-8 border-t">
                        <div className="text-center space-y-2">
                            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mx-auto text-primary">
                                <Truck className="w-5 h-5" />
                            </div>
                            <p className="text-[10px] font-bold uppercase tracking-wide">Fast Delivery</p>
                        </div>
                        <div className="text-center space-y-2">
                            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mx-auto text-primary">
                                <RefreshCcw className="w-5 h-5" />
                            </div>
                            <p className="text-[10px] font-bold uppercase tracking-wide">7 Day Return</p>
                        </div>
                        <div className="text-center space-y-2">
                            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mx-auto text-primary">
                                <ShieldCheck className="w-5 h-5" />
                            </div>
                            <p className="text-[10px] font-bold uppercase tracking-wide">Secure Payment</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Reviews Section */}
            <section className="mt-24 py-12 border-t">
                <h2 className="text-3xl font-black tracking-tight mb-12">Customer Reviews</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {product.reviews.map((review) => (
                        <BackgroundGradient key={review.id} className="rounded-[22px] p-2 bg-white dark:bg-zinc-900 overflow-hidden relative">
                            <div className="space-y-4 p-8">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold">
                                            {review.user.name?.charAt(0) ?? "U"}
                                        </div>
                                        <div>
                                            <p className="font-bold dark:text-neutral-200">{review.user.name}</p>
                                            <p className="text-xs text-muted-foreground">{new Date(review.createdAt).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                    <div className="flex text-orange-500">
                                        {Array.from({ length: review.rating }).map((_, i) => (
                                            <Star key={i} className="w-3 h-3 fill-current" />
                                        ))}
                                    </div>
                                </div>
                                <p className="text-muted-foreground leading-relaxed italic">"{review.comment}"</p>
                            </div>
                        </BackgroundGradient>
                    ))}
                    {product.reviews.length === 0 && (
                        <p className="text-muted-foreground italic">No reviews yet. Be the first to share your experience!</p>
                    )}
                </div>
            </section>
            <RecentlyViewed productId={product.id} />
        </div>
    );
}
