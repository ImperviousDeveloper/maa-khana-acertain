import { AuroraBackground } from "~/components/aceternity/aurora-background";

export default function ReturnsPage() {
    return (
        <div className="min-h-screen">
            <AuroraBackground>
                <div className="max-w-4xl mx-auto px-6 py-24 relative z-10 space-y-12">
                    <div className="space-y-4">
                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter italic text-red-500">Returns & Refunds.</h1>
                        <p className="text-muted-foreground text-lg">Last updated: February 2026</p>
                    </div>

                    <div className="glass dark:glass-dark rounded-[2.5rem] p-8 md:p-12 shadow-2xl border-none prose dark:prose-invert max-w-none space-y-8">
                        <section className="space-y-4">
                            <h2 className="text-2xl font-black tracking-tight text-foreground">Return Policy</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                Due to the perishable nature of our products (food items), we do not accept returns once the product has been delivered. However, your satisfaction is our priority.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-black tracking-tight text-foreground">Damaged or Incorrect Items</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                If you receive a damaged product or the wrong flavor, please contact us within 48 hours of delivery at support@maakhana.com with a photo of the package. We will ship a replacement immediately at no extra cost.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-black tracking-tight text-foreground">Refund Process</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                In case a replacement is not possible (e.g., out of stock), we will issue a full refund to your original payment method. Refunds typically reflect in your account within 5-7 business days.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-black tracking-tight text-foreground">Cancellations</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                You can cancel your order anytime before it has been shipped. Once the status is 'Shipped', cancellations are no longer possible.
                            </p>
                        </section>
                    </div>
                </div>
            </AuroraBackground>
        </div>
    );
}
