import { AuroraBackground } from "~/components/aceternity/aurora-background";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "~/components/ui/accordion";

const FAQS = [
    {
        q: "What is Makhana?",
        a: "Makhana, also known as fox nuts or lotus seeds, are the seeds of the Euryale ferox plant. They are a highly nutritional superfood, rich in protein, fiber, and minerals."
    },
    {
        q: "How do you roast your makhana?",
        a: "We slow-roast our makhana in premium olive oil. We never deep-fry our products, ensuring they remain healthy and light."
    },
    {
        q: "Do you have gluten-free options?",
        a: "Yes! All our makhana products are naturally gluten-free. We use only gluten-free seasonings and ingredients."
    },
    {
        q: "How long does shipping take?",
        a: "Standard shipping typically takes 3-5 business days within major cities in India. For remote locations, it may take up to 7-10 business days."
    },
    {
        q: "Can I place bulk orders?",
        a: "Absolutely. Please head over to our Contact Us page or email us at bulk@maakhana.com for wholesale inquiries."
    },
];

export default function FAQPage() {
    return (
        <div className="min-h-screen">
            <AuroraBackground>
                <div className="max-w-3xl mx-auto px-6 py-24 relative z-10 space-y-16">
                    <div className="text-center space-y-4">
                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter italic">FAQ.</h1>
                        <p className="text-muted-foreground text-lg">
                            Everything you need to know about Maa Khana products and services.
                        </p>
                    </div>

                    <div className="glass dark:glass-dark rounded-[2.5rem] p-8 md:p-12 shadow-2xl border-none">
                        <Accordion type="single" collapsible className="w-full space-y-4">
                            {FAQS.map((faq, i) => (
                                <AccordionItem key={i} value={`item-${i}`} className="border-b border-muted/20 pb-2">
                                    <AccordionTrigger className="text-left font-black tracking-tight text-xl hover:no-underline hover:text-primary transition-colors py-6">
                                        {faq.q}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground text-lg leading-relaxed pb-6">
                                        {faq.a}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </div>
            </AuroraBackground>
        </div>
    );
}
