import { AuroraBackground } from "~/components/aceternity/aurora-background";

export default function ShippingPage() {
    return (
        <div className="min-h-screen">
            <AuroraBackground>
                <div className="max-w-4xl mx-auto px-6 py-24 relative z-10 space-y-12">
                    <div className="space-y-4">
                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter italic">Shipping Policy.</h1>
                        <p className="text-muted-foreground text-lg">Last updated: February 2026</p>
                    </div>

                    <div className="glass dark:glass-dark rounded-[2.5rem] p-8 md:p-12 shadow-2xl border-none prose dark:prose-invert max-w-none space-y-8">
                        <section className="space-y-4">
                            <h2 className="text-2xl font-black tracking-tight">Standard Delivery</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                We offer standard delivery across India. Most orders are processed and shipped within 24-48 hours. Once shipped, you will receive a tracking ID via email and SMS.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-black tracking-tight">Shipping Charges</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                Shipping is free on all orders above ₹499. For orders below this amount, a flat shipping fee of ₹49 is applied at checkout.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-black tracking-tight">Delivery Timelines</h2>
                            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                                <li>Metro Cities: 3 - 5 business days</li>
                                <li>Tier 2 Cities: 4 - 6 business days</li>
                                <li>Rest of India: 7 - 10 business days</li>
                            </ul>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-black tracking-tight">International Shipping</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                Currently, we only ship within India. We are working hard to bring Maa Khana flavors to the rest of the world soon!
                            </p>
                        </section>
                    </div>
                </div>
            </AuroraBackground>
        </div>
    );
}
