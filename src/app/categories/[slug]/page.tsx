import { api } from "~/trpc/server";
import { notFound } from "next/navigation";
import { ProductCard } from "../../_components/product-card";
import { ProductFilters } from "../../products/_components/product-filters";
import { serialize } from "~/lib/utils";

export default async function CategoryPage({
    params,
    searchParams,
}: {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ query?: string; sort?: string }>;
}) {
    const { slug } = await params;
    const sParams = await searchParams;

    const category = await api.category.getBySlug({ slug });
    if (!category) {
        notFound();
    }

    const products = await api.product.list({
        categoryId: category.id,
        query: sParams.query,
        sort: sParams.sort as any,
        limit: 50,
    });

    return (
        <div className="max-w-7xl mx-auto px-6 pt-12 space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div className="space-y-4">
                    <div className="flex items-center space-x-2 text-xs font-black uppercase tracking-widest text-primary">
                        <span className="w-8 h-px bg-primary" />
                        <span>Category Collection</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter capitalize">{category.name}.</h1>
                    <p className="text-muted-foreground max-w-lg">
                        Explore our exclusive collection of premium {category.name} flavors.
                    </p>
                </div>

                <ProductFilters />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 pb-24">
                {products.items.map((product) => (
                    <ProductCard key={product.id} product={serialize(product) as any} />
                ))}
            </div>

            {products.items.length === 0 && (
                <div className="py-32 text-center space-y-6">
                    <div className="w-20 h-20 bg-muted/50 rounded-full flex items-center justify-center mx-auto grayscale opacity-50">
                        🔭
                    </div>
                    <h3 className="text-2xl font-bold">No products in this category yet.</h3>
                    <p className="text-muted-foreground">Keep an eye out for our upcoming launches!</p>
                </div>
            )}
        </div>
    );
}
