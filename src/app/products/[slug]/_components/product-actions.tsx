"use client";

import { useState } from "react";
import { ShoppingCart, Heart } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Button as MovingBorderButton } from "~/components/aceternity/moving-border";
import { api } from "~/trpc/react";
import { toast } from "sonner";
import { cn } from "~/lib/utils";
import { WishlistButton } from "~/components/wishlist/WishlistButton";
import { signIn, useSession } from "next-auth/react";
import { type ProductVariant } from "@prisma/client";

interface ProductActionsProps {
    productId: number;
    variants: ProductVariant[];
}

export function ProductActions({ productId, variants }: ProductActionsProps) {
    const [selectedVariant, setSelectedVariant] = useState<number | null>(
        variants[0]?.id ?? null
    );
    const [quantity, setQuantity] = useState(1);

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

    const handleAddToCart = () => {
        if (!session) {
            toast.error("Please login to add items to cart");
            return;
        }
        addToCart.mutate({
            productId,
            variantId: selectedVariant ?? undefined,
            quantity,
        });
    };

    return (
        <div className="space-y-8">
            {/* Variants */}
            {variants.length > 0 && (
                <div className="space-y-4">
                    <h4 className="text-sm font-bold uppercase tracking-wider">Select Weight</h4>
                    <div className="flex flex-wrap gap-3">
                        {variants.map((v) => (
                            <button
                                key={v.id}
                                onClick={() => setSelectedVariant(v.id)}
                                className={cn(
                                    "px-6 py-2 rounded-xl border-2 transition-all text-sm font-bold",
                                    selectedVariant === v.id
                                        ? "border-primary bg-primary/5 text-primary shadow-md"
                                        : "border-muted hover:border-primary/50"
                                )}
                            >
                                {v.weight ?? v.name}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <MovingBorderButton
                    borderRadius="1rem"
                    onClick={handleAddToCart}
                    disabled={addToCart.isPending}
                    containerClassName="flex-1 h-14"
                    className="bg-black dark:bg-white text-white dark:text-black font-black tracking-tight text-lg"
                >
                    <span className="flex items-center justify-center">
                        <ShoppingCart className="mr-3 w-5 h-5" />
                        {addToCart.isPending ? "ADDING..." : "ADD TO CART"}
                    </span>
                </MovingBorderButton>
                <WishlistButton productId={productId} variant="icon" />
            </div>
        </div>
    );
}
