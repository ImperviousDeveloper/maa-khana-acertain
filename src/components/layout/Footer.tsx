import Link from "next/link";

export function Footer() {
    return (
        <footer className="w-full py-12 px-6 border-t bg-muted/30 backdrop-blur-sm">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
                <div className="space-y-4">
                    <Link href="/" className="text-xl font-bold tracking-tighter">
                        MAA KHANA
                    </Link>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        Delivering the finest roasted and flavored makhana treats straight to your doorstep. Healthy, crunchy, and delicious.
                    </p>
                </div>

                <div>
                    <h4 className="font-semibold mb-4 text-sm uppercase tracking-widest text-primary/70">Shop</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                        <li><Link href="/products" className="hover:text-primary transition-colors">All Products</Link></li>
                        <li><Link href="/categories/flavored" className="hover:text-primary transition-colors">Flavored Makhana</Link></li>
                        <li><Link href="/categories/roasted" className="hover:text-primary transition-colors">Roasted Makhana</Link></li>
                        <li><Link href="/categories/raw" className="hover:text-primary transition-colors">Bulk Raw Makhana</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-semibold mb-4 text-sm uppercase tracking-widest text-primary/70">Support</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                        <li><Link href="/shipping" className="hover:text-primary transition-colors">Shipping Policy</Link></li>
                        <li><Link href="/returns" className="hover:text-primary transition-colors">Returns & Refunds</Link></li>
                        <li><Link href="/faq" className="hover:text-primary transition-colors">FAQs</Link></li>
                        <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-semibold mb-4 text-sm uppercase tracking-widest text-primary/70">Newsletter</h4>
                    <p className="text-xs text-muted-foreground mb-4">Stay updated with latest flavors and offers.</p>
                    <div className="flex gap-2">
                        <input
                            type="email"
                            placeholder="Email address"
                            className="bg-background border rounded-lg px-3 py-2 text-xs w-full focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                        <button className="bg-primary text-primary-foreground rounded-lg px-4 py-2 text-xs font-bold hover:opacity-90 transition-opacity">
                            JOIN
                        </button>
                    </div>
                </div>
            </div>
            <div className="max-w-6xl mx-auto mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center text-xs text-muted-foreground space-y-4 md:space-y-0">
                <p>&copy; {new Date().getFullYear()} Maa Khana Store. All rights reserved.</p>
                <div className="flex space-x-6">
                    <Link href="/terms" className="hover:text-primary transition-colors">Terms</Link>
                    <Link href="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
                </div>
            </div>
        </footer>
    );
}
