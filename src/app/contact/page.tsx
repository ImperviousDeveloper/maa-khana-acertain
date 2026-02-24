import { AuroraBackground } from "~/components/aceternity/aurora-background";
import { BackgroundGradient } from "~/components/aceternity/background-gradient";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/aceternity/input";
import { Label } from "~/components/aceternity/label";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function ContactPage() {
    return (
        <div className="min-h-screen">
            <AuroraBackground>
                <div className="max-w-6xl mx-auto px-6 py-24 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        {/* Info Column */}
                        <div className="space-y-12">
                            <div className="space-y-4">
                                <h1 className="text-5xl md:text-7xl font-black tracking-tighter">Get in <br /> <span className="text-primary italic">Touch.</span></h1>
                                <p className="text-muted-foreground text-lg max-w-sm">
                                    Have a question about our flavors or bulk orders? We'd love to hear from you.
                                </p>
                            </div>

                            <div className="space-y-8">
                                <div className="flex items-start space-x-6">
                                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                                        <Mail className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg">Email Us</h3>
                                        <p className="text-muted-foreground">hello@maakhana.com</p>
                                        <p className="text-muted-foreground">support@maakhana.com</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-6">
                                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                                        <Phone className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg">Call Us</h3>
                                        <p className="text-muted-foreground">+91 98765 43210</p>
                                        <p className="text-muted-foreground">Mon-Sat, 9am - 7pm</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-6">
                                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                                        <MapPin className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg">Visit Us</h3>
                                        <p className="text-muted-foreground">Plot 42, Industrial Area</p>
                                        <p className="text-muted-foreground">Patna, Bihar, India - 800001</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Form Column */}
                        <BackgroundGradient className="rounded-[2.5rem] p-8 sm:p-12 bg-white dark:bg-zinc-900">
                            <form className="space-y-8">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="firstname">First Name</Label>
                                        <Input id="firstname" placeholder="John" type="text" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="lastname">Last Name</Label>
                                        <Input id="lastname" placeholder="Doe" type="text" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email Address</Label>
                                    <Input id="email" placeholder="john@example.com" type="email" />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="message">How can we help?</Label>
                                    <textarea
                                        id="message"
                                        placeholder="Tell us more about your inquiry..."
                                        className="w-full bg-linear-to-b from-neutral-100 to-neutral-50 dark:from-zinc-800 dark:to-zinc-900 border-none rounded-xl p-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary min-h-[150px]"
                                    />
                                </div>

                                <Button className="w-full h-14 rounded-2xl font-black text-lg tracking-tight shadow-xl shadow-primary/20">
                                    SEND MESSAGE
                                    <Send className="ml-2 w-5 h-5" />
                                </Button>
                            </form>
                        </BackgroundGradient>
                    </div>
                </div>
            </AuroraBackground>
        </div>
    );
}
