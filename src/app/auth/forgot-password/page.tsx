"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, ArrowRight, Loader2, ArrowLeft, CheckCircle2 } from "lucide-react";
import { api } from "~/trpc/react";
import { toast } from "sonner";
import { AuroraBackground } from "~/components/aceternity/aurora-background";
import { BackgroundGradient } from "~/components/aceternity/background-gradient";
import { Input } from "~/components/aceternity/input";
import { Label } from "~/components/aceternity/label";
import { Meteors } from "~/components/aceternity/meteors";

const LabelInputContainer = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div className={className}>
            {children}
        </div>
    );
};

export default function ForgotPasswordPage() {
    const [isSent, setIsSent] = useState(false);
    const [email, setEmail] = useState("");

    const forgot = api.auth.forgotPassword.useMutation({
        onSuccess: () => {
            setIsSent(true);
            toast.success("Reset link sent!");
        },
        onError: (err: any) => {
            toast.error(err.message);
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        forgot.mutate({ email });
    };

    if (isSent) {
        return (
            <AuroraBackground>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full max-w-md px-4"
                >
                    <BackgroundGradient className="rounded-[22px] p-12 bg-white dark:bg-zinc-900 text-center relative overflow-hidden">
                        <Meteors number={20} />
                        <div className="w-20 h-20 bg-green-500/10 rounded-3xl flex items-center justify-center mx-auto mb-6 relative z-10 border border-green-500/20">
                            <CheckCircle2 className="w-10 h-10 text-green-500" />
                        </div>
                        <h1 className="text-3xl font-black tracking-tighter italic dark:text-white relative z-10">Check your Inbox.</h1>
                        <p className="text-muted-foreground font-medium mt-4 relative z-10">
                            We've sent a password reset link to <br />
                            <span className="text-foreground font-black dark:text-neutral-200">{email}</span>
                        </p>
                        <div className="pt-8 relative z-10">
                            <Link href="/auth/login">
                                <button className="bg-primary text-white rounded-xl px-8 h-12 font-black tracking-widest uppercase hover:scale-105 transition-transform active:scale-95 shadow-lg">
                                    Return to Login
                                </button>
                            </Link>
                        </div>
                    </BackgroundGradient>
                </motion.div>
            </AuroraBackground>
        );
    }

    return (
        <AuroraBackground>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full max-w-md px-4 relative z-20"
            >
                <BackgroundGradient className="rounded-[22px] p-8 md:p-12 bg-white dark:bg-zinc-900 overflow-hidden relative">
                    <Meteors number={20} />

                    <div className="text-center space-y-2 mb-8 relative z-10">
                        <Link href="/auth/login" className="inline-flex items-center text-xs font-black text-muted-foreground uppercase tracking-widest hover:text-primary transition-colors mb-4">
                            <ArrowLeft className="mr-2 w-3 h-3" /> Back to Login
                        </Link>
                        <h1 className="text-4xl font-black tracking-tighter italic dark:text-white">Forgot Password.</h1>
                        <p className="text-muted-foreground font-medium">Enter your email and we'll send a reset link</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                        <LabelInputContainer className="flex flex-col space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                                id="email"
                                required
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@example.com"
                            />
                        </LabelInputContainer>

                        <button
                            disabled={forgot.isPending}
                            className="bg-linear-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-12 font-medium shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
                            type="submit"
                        >
                            {forgot.isPending ? (
                                <Loader2 className="animate-spin w-5 h-5 mx-auto" />
                            ) : (
                                <span className="flex items-center justify-center font-bold">
                                    SEND RESET LINK <ArrowRight className="ml-2 w-5 h-5" />
                                </span>
                            )}
                            <BottomGradient />
                        </button>
                    </form>
                </BackgroundGradient>
            </motion.div>
        </AuroraBackground>
    );
}

const BottomGradient = () => {
    return (
        <>
            <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-linear-to-r from-transparent via-cyan-500 to-transparent" />
            <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-0 bg-linear-to-r from-transparent via-indigo-500 to-transparent" />
        </>
    );
};
