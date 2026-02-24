import { api } from "~/trpc/server";
import { ProductCard } from "../_components/product-card";
import { serialize } from "~/lib/utils";
import { Heart, ShoppingBag } from "lucide-react";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import { auth } from "~/server/auth";
import { redirect } from "next/navigation";
import { Highlight } from "~/components/aceternity/typewriter-effect";

export default async function WishlistPage() {
    const session = await auth();

    if (!session) {
        redirect("/auth/login?callbackUrl=/wishlist");
    }

    const wishlist = await api.wishlist.list();

    return (
        <div className="max-w-7xl mx-auto px-6 pt-12 space-y-12">
            <div className="space-y-4">
                <div className="flex items-center space-x-3 text-primary">
                    <Heart className="w-8 h-8 fill-current" />
                    <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-foreground">My Wishlist.</h1>
                </div>
                <p className="text-muted-foreground max-w-lg">
                    Your personal collection of favorites. Ready to add them to your cart?
                </p>
            </div>

            {wishlist.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {wishlist.map((item) => (
                        <ProductCard key={item.id} product={serialize(item.product) as any} />
                    ))}
                </div>
            ) : (
                <div className="py-32 flex flex-col items-center text-center space-y-6 bg-muted/30 rounded-[40px] border-2 border-dashed border-muted">
                    <div className="w-24 h-24 bg-background rounded-full flex items-center justify-center shadow-xl">
                        <Heart className="w-10 h-10 text-muted-foreground" />
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-2xl font-black tracking-tight">Your wishlist is empty</h3>
                        <p className="text-muted-foreground">Start adding products you love to see them here!</p>
                    </div>
                    <Link href="/products">
                        <Button className="rounded-full h-12 px-8 font-bold">
                            Explore Products
                            <ShoppingBag className="ml-2 w-4 h-4" />
                        </Button>
                    </Link>
                </div>
            )}
        </div>
    );
}
