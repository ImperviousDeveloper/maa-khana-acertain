import { AuroraBackground } from "~/components/aceternity/aurora-background";

export default function TermsPage() {
    return (
        <div className="min-h-screen">
            <AuroraBackground>
                <div className="max-w-4xl mx-auto px-6 py-24 relative z-10 space-y-12">
                    <div className="space-y-4">
                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter italic">Terms of Service.</h1>
                        <p className="text-muted-foreground text-lg">Last updated: February 2026</p>
                    </div>

                    <div className="glass dark:glass-dark rounded-[2.5rem] p-8 md:p-12 shadow-2xl border-none prose dark:prose-invert max-w-none space-y-8">
                        <section className="space-y-4">
                            <h2 className="text-2xl font-black tracking-tight text-foreground">1. Acceptance of Terms</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                By accessing and using the Maa Khana website, you agree to comply with and be bound by these Terms of Service. If you do not agree, please do not use our site.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-black tracking-tight text-foreground">2. User Accounts</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                When you create an account, you are responsible for maintaining its confidentiality. You must provide accurate and complete information during signup.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-black tracking-tight text-foreground">3. Product Pricing</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                Prices are subject to change without notice. While we strive for accuracy, errors in pricing may occur. We reserve the right to cancel orders placed at an incorrect price.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-black tracking-tight text-foreground">4. Intellectual Property</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                All content on this site, including images, text, and logos, is the property of Maa Khana and is protected by copyright laws. Unauthorized use is strictly prohibited.
                            </p>
                        </section>
                    </div>
                </div>
            </AuroraBackground>
        </div>
    );
}
