"use client";

import { api } from "~/trpc/react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { MapPin, Plus, Home, Briefcase, MapIcon } from "lucide-react";
import { AddressDialog } from "~/components/account/AddressDialog";
import { Skeleton } from "~/components/ui/skeleton";
import { Button } from "~/components/ui/button";

export default function AddressesPage() {
    const { data: user, isLoading } = api.user.me.useQuery();

    const getIcon = (type: string) => {
        switch (type) {
            case "HOME": return <Home className="w-4 h-4" />;
            case "WORK": return <Briefcase className="w-4 h-4" />;
            default: return <MapIcon className="w-4 h-4" />;
        }
    };

    if (isLoading) {
        return (
            <div className="max-w-6xl mx-auto px-6 pt-12 space-y-8">
                <div className="h-10 w-48 bg-muted animate-pulse rounded-lg" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => <Skeleton key={i} className="h-48 rounded-[32px]" />)}
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-6 pt-12 space-y-12 pb-24">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h1 className="text-4xl font-black tracking-tighter italic">Shipping <span className="text-primary">Addresses.</span></h1>
                    <p className="text-muted-foreground text-sm font-medium">Manage your delivery locations for faster checkout.</p>
                </div>
                <AddressDialog />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {user?.addresses.map((addr) => (
                    <Card key={addr.id} className="rounded-[40px] border-none shadow-sm glass overflow-hidden group hover:ring-2 ring-primary transition-all">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <Badge variant="outline" className="rounded-full px-3 py-1 flex items-center space-x-2 bg-primary/5 border-primary/20">
                                {getIcon(addr.type)}
                                <span className="text-[10px] font-black uppercase tracking-widest">{addr.type}</span>
                            </Badge>
                            {addr.isDefault && (
                                <Badge className="text-[10px] font-black uppercase rounded-full bg-green-500 text-white border-none">Default</Badge>
                            )}
                        </CardHeader>
                        <CardContent className="space-y-4 pt-4">
                            <div className="space-y-1">
                                <p className="text-lg font-black tracking-tight">{addr.line1}</p>
                                {addr.line2 && <p className="text-sm text-muted-foreground">{addr.line2}</p>}
                                <p className="text-sm font-bold">{addr.city}, {addr.state} - {addr.zipCode}</p>
                            </div>

                            <div className="pt-4 border-t border-muted/20 flex items-center justify-between">
                                <div className="space-y-1">
                                    <p className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">Contact</p>
                                    <p className="text-xs font-bold">{addr.phone || "No phone added"}</p>
                                </div>
                                <Button variant="ghost" size="sm" className="rounded-xl font-bold bg-muted/50 hover:bg-primary hover:text-white transition-colors">Edit</Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}

                <AddressDialog
                    trigger={
                        <button className="h-full min-h-[220px] rounded-[40px] border-4 border-dashed border-muted hover:border-primary/50 transition-all flex flex-col items-center justify-center space-y-4 group">
                            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-110 transition-all">
                                <Plus className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
                            </div>
                            <span className="text-sm font-black uppercase tracking-widest text-muted-foreground group-hover:text-primary">Add Address</span>
                        </button>
                    }
                />
            </div>

            {user?.addresses.length === 0 && (
                <div className="max-w-md mx-auto text-center space-y-6 pt-12">
                    <div className="w-24 h-24 bg-muted/30 rounded-[32px] flex items-center justify-center mx-auto">
                        <MapPin className="w-12 h-12 text-muted-foreground" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black">No addresses found</h2>
                        <p className="text-muted-foreground mt-2">Add your first shipping address to get crunching faster!</p>
                    </div>
                    <AddressDialog />
                </div>
            )}
        </div>
    );
}
