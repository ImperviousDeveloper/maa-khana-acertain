import { api } from "~/trpc/server";
import { ProductCard } from "../_components/product-card";
import {
    Filter,
    Search,
    SlidersHorizontal,
    ChevronDown
} from "lucide-react";
import { Button } from "~/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "~/components/ui/dropdown-menu";
import { ProductFilters } from "./_components/product-filters";
import { serialize } from "~/lib/utils";

export default async function ProductsPage({
    searchParams,
}: {
    searchParams: Promise<{
        category?: string;
        query?: string;
        sort?: string;
        minPrice?: string;
        maxPrice?: string;
    }>;
}) {
    const params = await searchParams;
    const categories = await api.category.list();
    const products = await api.product.list({
        categoryId: params.category ? Number(params.category) : undefined,
        query: params.query,
        sort: params.sort as any,
        limit: 20,
    });

    return (
        <div className="max-w-7xl mx-auto px-6 pt-12 space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div className="space-y-4">
                    <h1 className="text-5xl md:text-6xl font-black tracking-tighter">Our Collection.</h1>
                    <p className="text-muted-foreground max-w-lg">
                        Explore our full range of roasted makhana flavors, from spicy peri-peri to sweet caramel.
                    </p>
                </div>

                <ProductFilters />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                {/* Filters Sidebar */}
                <aside className="hidden lg:block space-y-10">
                    <div className="space-y-6">
                        <h3 className="text-sm font-black uppercase tracking-widest text-primary">Categories</h3>
                        <div className="flex flex-col space-y-3">
                            <Link href="/products" className={cn("text-sm font-bold transition-all hover:translate-x-1", !params.category ? "text-primary translate-x-1" : "text-muted-foreground")}>
                                All Products
                            </Link>
                            {categories.map((cat) => (
                                <Link
                                    key={cat.id}
                                    href={`/products?category=${cat.id}`}
                                    className={cn(
                                        "text-sm font-bold transition-all hover:translate-x-1",
                                        params.category === String(cat.id) ? "text-primary translate-x-1" : "text-muted-foreground"
                                    )}
                                >
                                    {cat.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-sm font-black uppercase tracking-widest text-primary">Price Range</h3>
                        <div className="space-y-4">
                            <div className="flex items-center space-x-4">
                                <div className="flex-1 space-y-1">
                                    <span className="text-[10px] font-bold text-muted-foreground uppercase">Min</span>
                                    <input type="number" placeholder="₹0" className="w-full px-3 py-2 rounded-xl bg-muted/50 text-sm font-bold outline-none border-none ring-primary/20 focus:ring-2" />
                                </div>
                                <div className="flex-1 space-y-1">
                                    <span className="text-[10px] font-bold text-muted-foreground uppercase">Max</span>
                                    <input type="number" placeholder="₹1000" className="w-full px-3 py-2 rounded-xl bg-muted/50 text-sm font-bold outline-none border-none ring-primary/20 focus:ring-2" />
                                </div>
                            </div>
                            <Button className="w-full rounded-xl font-bold h-10">Apply Price</Button>
                        </div>
                    </div>
                </aside>

                {/* Products Grid */}
                <div className="lg:col-span-3 space-y-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                        {products.items.map((product) => (
                            <ProductCard key={product.id} product={serialize(product) as any} />
                        ))}
                    </div>

                    {products.items.length === 0 && (
                        <div className="py-24 text-center space-y-4">
                            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto opacity-50">
                                <Search className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold">No products found</h3>
                            <p className="text-muted-foreground">Try adjusting your filters or search terms.</p>
                            <Button variant="outline" className="rounded-full">Clear All Filters</Button>
                        </div>
                    )}

                    {/* Pagination placeholder */}
                    <div className="flex justify-center pt-12">
                        <div className="flex items-center space-x-2">
                            <Button variant="outline" className="w-10 h-10 rounded-xl p-0 font-bold border-2 ring-primary transition-all hover:bg-primary hover:text-white">1</Button>
                            <Button variant="ghost" className="w-10 h-10 rounded-xl p-0 font-bold opacity-50">2</Button>
                            <Button variant="ghost" className="w-10 h-10 rounded-xl p-0 font-bold opacity-50">3</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

import { cn } from "~/lib/utils";
import Link from "next/link";
