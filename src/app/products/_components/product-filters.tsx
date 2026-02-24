"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, ChevronDown } from "lucide-react";
import { useTransition } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "~/components/ui/dropdown-menu";
import { Button } from "~/components/ui/button";

export function ProductFilters() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();

    const handleSearch = (term: string) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set("query", term);
        } else {
            params.delete("query");
        }
        startTransition(() => {
            router.push(`${pathname}?${params.toString()}`);
        });
    };

    const handleSort = (sort: string) => {
        const params = new URLSearchParams(searchParams);
        params.set("sort", sort);
        startTransition(() => {
            router.push(`${pathname}?${params.toString()}`);
        });
    };

    return (
        <div className="flex flex-wrap items-center gap-3">
            <div className="relative group flex-1 md:w-64">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <input
                    type="text"
                    defaultValue={searchParams.get("query")?.toString()}
                    onChange={(e) => handleSearch(e.target.value)}
                    placeholder="Search flavors..."
                    className="w-full pl-11 pr-4 py-3 rounded-2xl bg-muted/50 border-none focus:ring-2 ring-primary transition-all outline-none text-sm font-medium"
                />
            </div>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="rounded-2xl h-12 px-6 font-bold border-2">
                        <SlidersHorizontal className="mr-2 w-4 h-4" />
                        Sort By
                        <ChevronDown className="ml-2 w-4 h-4 opacity-50" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="rounded-2xl p-2 min-w-48">
                    {[
                        { label: "Newest First", value: "newest" },
                        { label: "Price: Low to High", value: "price-asc" },
                        { label: "Price: High to Low", value: "price-desc" },
                        { label: "Top Rated", value: "top-rated" },
                    ].map((item) => (
                        <DropdownMenuItem
                            key={item.value}
                            onClick={() => handleSort(item.value)}
                            className="rounded-xl font-medium cursor-pointer"
                        >
                            {item.label}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
