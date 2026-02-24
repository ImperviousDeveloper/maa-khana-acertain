"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
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

function ResetPasswordForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get("token") ?? "";
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);

    const reset = api.auth.resetPassword.useMutation({
        onSuccess: () => {
            setIsSuccess(true);
            toast.success("Password reset successful!");
        },
        onError: (err: any) => {
            toast.error(err.message);
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        if (!token) {
            toast.error("Invalid reset link");
            return;
        }
        reset.mutate({ token, password });
    };

    if (isSuccess) {
        return (
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
                    <h1 className="text-3xl font-black tracking-tighter italic dark:text-white relative z-10">Password Reset!</h1>
                    <p className="text-muted-foreground font-medium mt-4 relative z-10">
                        Your password has been successfully updated. <br />
                        You can now log in with your new password.
                    </p>
                    <div className="pt-8 relative z-10">
                        <button
                            onClick={() => router.push("/auth/login")}
                            className="bg-primary text-white rounded-xl px-8 h-12 font-black tracking-widest uppercase w-full transition-transform hover:scale-105 active:scale-95 shadow-lg"
                        >
                            Login Now
                        </button>
                    </div>
                </BackgroundGradient>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md px-4 relative z-20"
        >
            <BackgroundGradient className="rounded-[22px] p-8 md:p-12 bg-white dark:bg-zinc-900 overflow-hidden relative">
                <Meteors number={20} />

                <div className="text-center space-y-2 mb-8 relative z-10">
                    <h1 className="text-4xl font-black tracking-tighter italic dark:text-white">New Password.</h1>
                    <p className="text-muted-foreground font-medium">Create a strong password for your account</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                    <div className="flex flex-col space-y-4">
                        <LabelInputContainer className="flex flex-col space-y-2">
                            <Label htmlFor="password">New Password</Label>
                            <Input
                                id="password"
                                required
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                            />
                        </LabelInputContainer>
                        <LabelInputContainer className="flex flex-col space-y-2">
                            <Label htmlFor="confirmPassword">Confirm New Password</Label>
                            <Input
                                id="confirmPassword"
                                required
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="••••••••"
                            />
                        </LabelInputContainer>
                    </div>

                    <button
                        disabled={reset.isPending}
                        className="bg-linear-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-12 font-medium shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
                        type="submit"
                    >
                        {reset.isPending ? (
                            <Loader2 className="animate-spin w-5 h-5 mx-auto" />
                        ) : (
                            <span className="flex items-center justify-center font-bold">
                                RESET PASSWORD <ArrowRight className="ml-2 w-5 h-5" />
                            </span>
                        )}
                        <BottomGradient />
                    </button>
                </form>
            </BackgroundGradient>
        </motion.div>
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

export default function ResetPasswordPage() {
    return (
        <AuroraBackground>
            <Suspense fallback={<Loader2 className="animate-spin text-primary" />}>
                <ResetPasswordForm />
            </Suspense>
        </AuroraBackground>
    );
}
