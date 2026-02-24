"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export function HeaderSearch() {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState("");
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            router.push(`/products?query=${encodeURIComponent(query)}`);
            setIsOpen(false);
            setQuery("");
        }
    };

    return (
        <div className="relative">
            <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                onClick={() => setIsOpen(!isOpen)}
            >
                <Search className="w-5 h-5" />
            </Button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        className="absolute top-14 right-0 w-80 p-4 glass rounded-[32px] shadow-2xl z-50 overflow-hidden"
                    >
                        <form onSubmit={handleSearch} className="relative">
                            <input
                                autoFocus
                                type="text"
                                placeholder="Search flavors..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="w-full pl-5 pr-12 py-4 rounded-2xl bg-white/50 border-none focus:ring-2 ring-primary transition-all outline-none font-bold text-sm"
                            />
                            <button
                                type="submit"
                                className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20"
                            >
                                <Search className="w-4 h-4" />
                            </button>
                        </form>

                        <div className="mt-6 space-y-3">
                            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Trending Searches</p>
                            <div className="flex flex-wrap gap-2">
                                {["Pudina", "Peri Peri", "Cheese", "Caramel"].map((tag) => (
                                    <button
                                        key={tag}
                                        onClick={() => {
                                            router.push(`/products?query=${tag}`);
                                            setIsOpen(false);
                                        }}
                                        className="px-4 py-2 rounded-xl bg-primary/5 text-primary text-xs font-bold hover:bg-primary/10 transition-colors"
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
