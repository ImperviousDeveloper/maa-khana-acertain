import { AuroraBackground } from "~/components/aceternity/aurora-background";

export default function PrivacyPage() {
    return (
        <div className="min-h-screen">
            <AuroraBackground>
                <div className="max-w-4xl mx-auto px-6 py-24 relative z-10 space-y-12">
                    <div className="space-y-4">
                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter italic">Privacy Policy.</h1>
                        <p className="text-muted-foreground text-lg">Last updated: February 2026</p>
                    </div>

                    <div className="glass dark:glass-dark rounded-[2.5rem] p-8 md:p-12 shadow-2xl border-none prose dark:prose-invert max-w-none space-y-8">
                        <section className="space-y-4">
                            <h2 className="text-2xl font-black tracking-tight text-foreground">Data Collection</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                We collected information you provide directly to us when you create an account, place an order, or contact us. This includes your name, email, billing/shipping address, and phone number.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-black tracking-tight text-foreground">How We Use Your Data</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                Your data is primarily used to process orders, personalize your experience, and send updates about your purchases. We also use it to improve our store and prevent fraudulent activities.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-black tracking-tight text-foreground">Security</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                We implement industry-standard security measures to protect your data. Your payment information is encrypted and processed through secure third-party gateways.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-black tracking-tight text-foreground">Third-Party Sharing</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                We do not sell your personal data. We only share necessary information with trusted partners (like shipping companies and payment processors) to fulfill your orders.
                            </p>
                        </section>
                    </div>
                </div>
            </AuroraBackground>
        </div>
    );
}
