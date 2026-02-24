"use client";

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Switch } from "~/components/ui/switch";
import {
    Bell,
    Shield,
    Eye,
    Smartphone,
    Moon,
    Globe,
    Trash2
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function SettingsPage() {
    const [notifications, setNotifications] = useState(true);
    const [marketing, setMarketing] = useState(false);
    const [darkMode, setDarkMode] = useState(true);

    const handleSave = () => {
        toast.success("Settings updated successfully!");
    };

    return (
        <div className="max-w-4xl mx-auto px-6 pt-12 space-y-12 pb-24">
            <div className="space-y-1">
                <h1 className="text-4xl font-black tracking-tighter italic">Account <span className="text-primary">Settings.</span></h1>
                <p className="text-muted-foreground text-sm font-medium">Control your privacy, notifications, and experience.</p>
            </div>

            <div className="space-y-8">
                {/* Notifications Section */}
                <Card className="rounded-[40px] border-none shadow-sm glass">
                    <CardHeader>
                        <CardTitle className="text-lg font-bold flex items-center space-x-3">
                            <Bell className="w-5 h-5 text-primary" />
                            <span>Notifications</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center justify-between p-4 rounded-2xl bg-muted/30">
                            <div className="space-y-1">
                                <p className="font-bold">Order Updates</p>
                                <p className="text-xs text-muted-foreground">Receive SMS and email when your order is shipped.</p>
                            </div>
                            <Switch checked={notifications} onCheckedChange={setNotifications} />
                        </div>
                        <div className="flex items-center justify-between p-4 rounded-2xl bg-muted/30">
                            <div className="space-y-1">
                                <p className="font-bold">Marketing & Offers</p>
                                <p className="text-xs text-muted-foreground">Get notified about flash sales and new flavors.</p>
                            </div>
                            <Switch checked={marketing} onCheckedChange={setMarketing} />
                        </div>
                    </CardContent>
                </Card>

                {/* Privacy & Appearance Section */}
                <Card className="rounded-[40px] border-none shadow-sm glass">
                    <CardHeader>
                        <CardTitle className="text-lg font-bold flex items-center space-x-3">
                            <Eye className="w-5 h-5 text-primary" />
                            <span>Preferences</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center justify-between p-4 rounded-2xl bg-muted/30">
                            <div className="flex items-center space-x-4">
                                <Moon className="w-4 h-4 text-muted-foreground" />
                                <div className="space-y-0.5">
                                    <p className="font-bold">Dark Mode</p>
                                    <p className="text-xs text-muted-foreground">Toggle between high-contrast dark and light themes.</p>
                                </div>
                            </div>
                            <Switch checked={darkMode} onCheckedChange={setDarkMode} />
                        </div>
                        <div className="flex items-center justify-between p-4 rounded-2xl bg-muted/30">
                            <div className="flex items-center space-x-4">
                                <Globe className="w-4 h-4 text-muted-foreground" />
                                <div className="space-y-0.5">
                                    <p className="font-bold">Language</p>
                                    <p className="text-xs text-muted-foreground">Set your preferred store language.</p>
                                </div>
                            </div>
                            <Button variant="ghost" size="sm" className="font-bold">English (IN)</Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Security Section */}
                <Card className="rounded-[40px] border-none shadow-sm glass">
                    <CardHeader>
                        <CardTitle className="text-lg font-bold flex items-center space-x-3">
                            <Shield className="w-5 h-5 text-primary" />
                            <span>Security</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Button variant="outline" className="rounded-2xl h-14 font-bold border-muted hover:border-primary transition-all">Change Password</Button>
                            <Button variant="outline" className="rounded-2xl h-14 font-bold border-muted hover:border-primary transition-all">Two-Factor Auth</Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Danger Zone */}
                <div className="pt-12">
                    <h3 className="text-xs font-black uppercase tracking-widest text-red-500 ml-1 mb-4">Danger Zone</h3>
                    <Card className="rounded-[40px] border-2 border-red-500/10 shadow-sm bg-red-500/5">
                        <CardContent className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-6">
                            <div className="space-y-1 text-center sm:text-left">
                                <p className="font-black text-red-900 dark:text-red-100">Delete Account</p>
                                <p className="text-xs text-red-800/60 dark:text-red-400/60 font-medium">Permanently remove your account and all associated data.</p>
                            </div>
                            <Button variant="destructive" className="rounded-2xl h-12 px-8 font-black shrink-0">
                                DELETE DATA
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                <div className="flex justify-end pt-6">
                    <Button
                        onClick={handleSave}
                        className="rounded-2xl h-14 px-12 font-black text-lg bg-primary text-white shadow-xl shadow-primary/20 hover:scale-[1.05] transition-transform"
                    >
                        SAVE ALL SETTINGS
                    </Button>
                </div>
            </div>
        </div>
    );
}
