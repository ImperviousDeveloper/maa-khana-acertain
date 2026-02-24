"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "~/components/ui/button";
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

export default function LoginPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isLoading, setIsLoading] = useState(false);
    const callbackUrl = searchParams.get("callbackUrl") ?? "/";

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        try {
            const res = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (res?.error) {
                toast.error("Invalid email or password");
            } else {
                toast.success("Welcome back!");
                router.push(callbackUrl);
            }
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuroraBackground>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full max-w-md px-4 relative z-20"
            >
                <BackgroundGradient className="rounded-[22px] p-4 sm:p-10 bg-white dark:bg-zinc-900 overflow-hidden relative">
                    <Meteors number={20} />

                    <div className="text-center space-y-2 mb-8 relative z-10">
                        <h1 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100">
                            Welcome Back
                        </h1>
                        <p className="text-neutral-600 dark:text-neutral-400 text-sm italic">
                            Experience the future of Maa Khana
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                        <div className="flex flex-col space-y-4">
                            <LabelInputContainer className="flex flex-col space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    placeholder="name@example.com"
                                    type="email"
                                    required
                                />
                            </LabelInputContainer>

                            <LabelInputContainer className="flex flex-col space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password">Password</Label>
                                    <Link
                                        href="/auth/forgot-password"
                                        className="text-xs text-blue-500 hover:underline"
                                    >
                                        Forgot Password?
                                    </Link>
                                </div>
                                <Input
                                    id="password"
                                    name="password"
                                    placeholder="••••••••"
                                    type="password"
                                    required
                                />
                            </LabelInputContainer>
                        </div>

                        <button
                            disabled={isLoading}
                            className="bg-linear-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] transition-all hover:scale-[1.02] active:scale-[0.98]"
                            type="submit"
                        >
                            {isLoading ? (
                                <Loader2 className="animate-spin w-5 h-5 mx-auto" />
                            ) : (
                                <span className="flex items-center justify-center">
                                    Sign In <ArrowRight className="ml-2 w-4 h-4" />
                                </span>
                            )}
                            <BottomGradient />
                        </button>

                        <div className="bg-neutral-300 dark:bg-neutral-800 h-px w-full mt-8" />

                        <p className="text-center text-neutral-600 dark:text-neutral-400 text-sm">
                            Don't have an account?{" "}
                            <Link href="/auth/signup" className="text-blue-500 font-bold hover:underline">
                                Register
                            </Link>
                        </p>
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
