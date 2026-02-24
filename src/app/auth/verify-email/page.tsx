"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { ShieldCheck, ArrowRight, Loader2, RefreshCw } from "lucide-react";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";
import { toast } from "sonner";
import { AuroraBackground } from "~/components/aceternity/aurora-background";
import { BackgroundGradient } from "~/components/aceternity/background-gradient";
import { Meteors } from "~/components/aceternity/meteors";

function VerifyEmailForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get("email") ?? "";
    const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
    const [activeInput, setActiveInput] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!email) {
            router.push("/auth/signup");
        }
    }, [email, router]);

    const verify = api.auth.verifyOtp.useMutation({
        onSuccess: () => {
            toast.success("Email verified successfully! You can now log in.");
            router.push("/auth/login");
        },
        onError: (err: any) => {
            toast.error(err.message);
            setIsLoading(false);
        },
    });

    const resend = api.auth.resendOtp.useMutation({
        onSuccess: (data) => {
            const message = data.debugOtp
                ? `New code sent! (Debug: ${data.debugOtp})`
                : "New code sent to your email";
            toast.success(message);
        },
        onError: (err) => {
            toast.error(err.message);
        },
    });

    const handleChange = (val: string, index: number) => {
        const newOtp = [...otp];
        newOtp[index] = val.slice(-1);
        setOtp(newOtp);

        if (val && index < 5) {
            setActiveInput(index + 1);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            setActiveInput(index - 1);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const otpValue = otp.join("");
        if (otpValue.length !== 6) {
            toast.error("Please enter the full 6-digit code");
            return;
        }
        setIsLoading(true);
        verify.mutate({ email, otp: otpValue });
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md relative pb-10 pt-10 px-4"
        >
            <BackgroundGradient className="rounded-[22px] p-8 sm:p-12 bg-white dark:bg-zinc-900 overflow-hidden relative">
                <Meteors number={20} />

                <div className="text-center space-y-4 mb-8 relative z-10">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-primary/20">
                        <ShieldCheck className="w-8 h-8 text-primary" />
                    </div>
                    <h1 className="text-3xl font-black tracking-tighter italic dark:text-white">Verify Email.</h1>
                    <p className="text-muted-foreground font-medium text-sm">
                        We've sent a 6-digit code to <br />
                        <span className="text-foreground font-black dark:text-neutral-200">{email}</span>
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                    <div className="flex justify-between gap-1 sm:gap-2">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                type="text"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleChange(e.target.value, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                onFocus={() => setActiveInput(index)}
                                id={`otp-${index}`}
                                ref={(el) => {
                                    if (index === activeInput && el) el.focus();
                                }}
                                className="w-10 h-14 sm:w-12 sm:h-16 text-center text-xl sm:text-2xl font-black rounded-xl bg-neutral-100 dark:bg-neutral-800 border-none focus:ring-2 ring-primary transition-all outline-none dark:text-white"
                            />
                        ))}
                    </div>

                    <div className="space-y-4">
                        <button
                            disabled={isLoading}
                            className="bg-primary hover:bg-primary/90 text-white w-full rounded-xl h-14 text-lg font-black tracking-tight group overflow-hidden relative transition-all"
                        >
                            <span className="relative z-10 flex items-center justify-center">
                                {isLoading ? (
                                    <Loader2 className="animate-spin w-5 h-5" />
                                ) : (
                                    <>
                                        VERIFY & ACTIVATE
                                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                                    </>
                                )}
                            </span>
                            <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 skew-x-12" />
                        </button>

                        <button
                            type="button"
                            onClick={() => resend.mutate({ email })}
                            className="w-full flex items-center justify-center space-x-2 text-xs font-black text-muted-foreground uppercase tracking-widest hover:text-primary transition-colors mt-4"
                        >
                            <RefreshCw className={`w-3 h-3 ${resend.isPending ? 'animate-spin' : ''}`} />
                            <span>Resend Code</span>
                        </button>
                    </div>
                </form>
            </BackgroundGradient>
        </motion.div>
    );
}

export default function VerifyEmailPage() {
    return (
        <AuroraBackground>
            <Suspense fallback={<Loader2 className="animate-spin text-primary" />}>
                <VerifyEmailForm />
            </Suspense>
        </AuroraBackground>
    );
}
