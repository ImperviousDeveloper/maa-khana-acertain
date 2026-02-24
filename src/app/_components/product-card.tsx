"use client";

import { motion } from "framer-motion";
import { ShoppingCart, Star, Heart } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { type Product, type Category } from "@prisma/client";
import { api } from "~/trpc/react";
import { toast } from "sonner";
import { WishlistButton } from "~/components/wishlist/WishlistButton";
import { signIn, useSession } from "next-auth/react";

import { BackgroundGradient } from "~/components/aceternity/background-gradient";

interface ProductCardProps {
    product: Product & { category: Category };
}

export function ProductCard({ product }: ProductCardProps) {
    const utils = api.useUtils();
    const addToCart = api.cart.addItem.useMutation({
        onSuccess: () => {
            void utils.cart.get.invalidate();
            toast.success("Added to cart!");
        },
        onError: (err) => {
            toast.error(err.message);
        },
    });

    const { data: session } = useSession();

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (!session) {
            toast.error("Please login to add items to cart");
            return;
        }
        addToCart.mutate({
            productId: product.id,
            quantity: 1,
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group"
        >
            <BackgroundGradient className="rounded-[22px] p-1 bg-white dark:bg-zinc-900 overflow-hidden relative h-full">
                {/* Wishlist Button */}
                <WishlistButton
                    productId={product.id}
                    className="absolute top-4 right-4 z-20"
                />

                {/* Product Image */}
                <Link href={`/products/${product.slug}`} className="block aspect-4/5 overflow-hidden rounded-[20px] relative z-10">
                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    {product.specialPrice && (
                        <Badge className="absolute top-4 left-4 bg-primary text-white rounded-full px-3 py-1 text-[10px] font-bold">
                            SALE
                        </Badge>
                    )}
                </Link>

                {/* Details */}
                <div className="p-5 space-y-3 relative z-10">
                    <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                            {product.category.name}
                        </span>
                        <div className="flex items-center text-xs font-bold text-orange-500">
                            <Star className="w-3 h-3 fill-current mr-1" />
                            {product.rating}
                        </div>
                    </div>

                    <Link href={`/products/${product.slug}`} className="block">
                        <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors line-clamp-1 dark:text-white">
                            {product.name}
                        </h3>
                    </Link>

                    <div className="flex items-center justify-between pt-2">
                        <div className="space-x-2 flex items-baseline">
                            <span className="text-xl font-black dark:text-neutral-200">₹{Number(product.specialPrice ?? product.price)}</span>
                            {product.specialPrice && (
                                <span className="text-sm text-muted-foreground line-through decoration-primary/50">
                                    ₹{Number(product.price)}
                                </span>
                            )}
                        </div>
                        <Button
                            size="icon"
                            onClick={handleAddToCart}
                            disabled={addToCart.isPending}
                            className="rounded-2xl w-10 h-10 shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-transform bg-black dark:bg-white dark:text-black text-white"
                        >
                            <ShoppingCart className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </BackgroundGradient>
        </motion.div>
    );
}
