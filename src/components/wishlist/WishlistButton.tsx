"use client";

import { Heart } from "lucide-react";
import { api } from "~/trpc/react";
import { cn } from "~/lib/utils";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export function WishlistButton({
    productId,
    className,
    variant = "default"
}: {
    productId: number;
    className?: string;
    variant?: "default" | "icon";
}) {
    const router = useRouter();
    const { data: session } = useSession();
    const utils = api.useUtils();

    const { data: wishlist } = api.wishlist.list.useQuery(undefined, {
        enabled: !!session,
    });

    const isWishlisted = wishlist?.some(item => item.productId === productId);

    const toggle = api.wishlist.toggle.useMutation({
        onSuccess: (data) => {
            void utils.wishlist.list.invalidate();
            toast.success(data.action === "added" ? "Added to wishlist" : "Removed from wishlist");
        },
        onError: (err) => {
            if (err.message.includes("UNAUTHORIZED")) {
                toast.error("Please login to save favorites");
            } else {
                toast.error(err.message);
            }
        },
    });

    const handleToggle = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (!session) {
            toast.error("Please login to save favorites");
            return;
        }
        toggle.mutate({ productId });
    };

    return (
        <button
            onClick={handleToggle}
            disabled={toggle.isPending}
            className={cn(
                "transition-all duration-300 flex items-center justify-center",
                variant === "default" && "w-10 h-10 rounded-full bg-white/50 dark:bg-black/50 backdrop-blur-sm shadow-sm hover:scale-110 active:scale-95",
                variant === "icon" && "w-14 h-14 rounded-2xl border-2 hover:bg-muted font-bold",
                isWishlisted ? "text-red-500 scale-110" : "text-muted-foreground",
                className
            )}
        >
            <Heart className={cn("transition-all duration-300", isWishlisted && "fill-current")} />
            {variant === "icon" && <span className="sr-only">Toggle Wishlist</span>}
        </button>
    );
}
