"use client";

import { useSession } from "next-auth/react";
import { api } from "~/trpc/react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { User, Camera, Mail, ShieldCheck } from "lucide-react";

const profileSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email").optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function ProfilePage() {
    const { data: session } = useSession();
    const { data: user, isLoading } = api.user.me.useQuery();
    const utils = api.useUtils();

    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileSchema),
        values: {
            name: user?.name || "",
            email: user?.email || "",
        },
    });

    const updateProfile = api.user.updateProfile.useMutation({
        onSuccess: () => {
            toast.success("Profile updated successfully!");
            void utils.user.me.invalidate();
        },
        onError: (err) => {
            toast.error(err.message);
        },
    });

    const onSubmit = (values: ProfileFormValues) => {
        updateProfile.mutate({ name: values.name });
    };

    if (isLoading) {
        return <div className="p-20 text-center">Loading profile...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto px-6 pt-12 space-y-12 pb-24">
            <div className="space-y-1">
                <h1 className="text-4xl font-black tracking-tighter italic">Personal <span className="text-primary">Profile.</span></h1>
                <p className="text-muted-foreground text-sm font-medium">Update your personal information and how we contact you.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {/* Left: Avatar Column */}
                <div className="flex flex-col items-center space-y-6">
                    <div className="relative group">
                        <div className="w-48 h-48 rounded-[48px] overflow-hidden bg-muted flex items-center justify-center border-4 border-white shadow-2xl relative z-10">
                            {user?.image ? (
                                <img src={user.image} className="w-full h-full object-cover" />
                            ) : (
                                <User className="w-20 h-20 text-muted-foreground" />
                            )}
                        </div>
                        <button className="absolute bottom-2 right-2 z-20 w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center shadow-xl hover:scale-110 transition-transform">
                            <Camera className="w-5 h-5" />
                        </button>
                        <div className="absolute -inset-4 bg-primary/5 rounded-[60px] z-0 animate-pulse" />
                    </div>
                    <div className="text-center">
                        <h3 className="text-xl font-black">{user?.name}</h3>
                        <p className="text-xs font-black uppercase tracking-widest text-primary mt-1">{user?.role} ACCOUNT</p>
                    </div>
                </div>

                {/* Right: Form Column */}
                <div className="md:col-span-2 space-y-8">
                    <Card className="rounded-[40px] border-none shadow-sm glass">
                        <CardHeader>
                            <CardTitle className="text-lg font-bold">General Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Full Name</label>
                                        <div className="relative">
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                            <Input
                                                {...form.register("name")}
                                                className="rounded-xl border-none bg-muted/50 h-12 pl-12 font-bold focus:ring-2 focus:ring-primary"
                                            />
                                        </div>
                                        {form.formState.errors.name && <p className="text-[10px] text-red-500 font-bold ml-1">{form.formState.errors.name.message}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Email Address</label>
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                            <Input
                                                value={user?.email}
                                                disabled
                                                className="rounded-xl border-none bg-muted/20 h-12 pl-12 font-bold text-muted-foreground"
                                            />
                                        </div>
                                        <p className="text-[10px] text-muted-foreground italic ml-1">* Email cannot be changed for security reasons.</p>
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    disabled={updateProfile.isPending}
                                    className="w-full h-14 rounded-2xl font-black text-lg bg-primary text-white shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform"
                                >
                                    {updateProfile.isPending ? "SAVING..." : "UPDATE PROFILE"}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    <Card className="rounded-[40px] border-none shadow-sm glass bg-green-500/5 border border-green-500/10">
                        <CardContent className="pt-6 flex items-center space-x-6">
                            <div className="w-12 h-12 rounded-2xl bg-green-500/20 flex items-center justify-center text-green-600 shrink-0">
                                <ShieldCheck className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="font-bold text-green-900 dark:text-green-100">Verified Account</h4>
                                <p className="text-xs text-green-700/70 dark:text-green-400/70 font-medium">Your identity is verified. You have full access to all features.</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
