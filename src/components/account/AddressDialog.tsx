"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { api } from "~/trpc/react";
import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Plus, MapPin } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "~/components/ui/select";

const addressSchema = z.object({
    line1: z.string().min(5, "Address must be at least 5 characters"),
    line2: z.string().optional(),
    city: z.string().min(2, "City is required"),
    state: z.string().min(2, "State is required"),
    country: z.string().min(2, "Country is required").default("India"),
    zipCode: z.string().min(6, "Zip code must be at least 6 characters"),
    phone: z.string().min(10, "Phone number is required"),
    type: z.enum(["HOME", "WORK", "BILLING", "SHIPPING"]),
});

type AddressFormValues = z.infer<typeof addressSchema>;

interface AddressDialogProps {
    onSuccess?: () => void;
    trigger?: React.ReactNode;
}

export function AddressDialog({ onSuccess, trigger }: AddressDialogProps) {
    const [open, setOpen] = useState(false);
    const utils = api.useUtils();

    const form = useForm<AddressFormValues>({
        resolver: zodResolver(addressSchema),
        defaultValues: {
            country: "India",
            type: "HOME",
        },
    });

    const addAddress = api.user.addAddress.useMutation({
        onSuccess: () => {
            toast.success("Address added successfully!");
            setOpen(false);
            form.reset();
            void utils.user.me.invalidate();
            onSuccess?.();
        },
        onError: (err) => {
            toast.error(err.message);
        },
    });

    const onSubmit = (values: AddressFormValues) => {
        addAddress.mutate(values);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger || (
                    <Button variant="outline" className="rounded-2xl space-x-2">
                        <Plus className="w-4 h-4" />
                        <span>Add New Address</span>
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] rounded-[32px] overflow-hidden border-none glass dark:glass-dark shadow-2xl">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-black italic tracking-tight flex items-center space-x-3">
                        <MapPin className="w-6 h-6 text-primary" />
                        <span>Add Shipping Address</span>
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-6">
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Label</label>
                                <Select onValueChange={(v: any) => form.setValue("type", v)} defaultValue="HOME">
                                    <SelectTrigger className="rounded-xl border-none bg-muted/50 h-12 font-bold">
                                        <SelectValue placeholder="Address Type" />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-xl border-none shadow-xl">
                                        <SelectItem value="HOME">Home</SelectItem>
                                        <SelectItem value="WORK">Work</SelectItem>
                                        <SelectItem value="SHIPPING">Shipping</SelectItem>
                                        <SelectItem value="BILLING">Billing</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Phone</label>
                                <Input {...form.register("phone")} placeholder="Phone Number" className="rounded-xl border-none bg-muted/50 h-12 font-bold" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Address Line 1</label>
                            <Input {...form.register("line1")} placeholder="House No, Building, Street" className="rounded-xl border-none bg-muted/50 h-12 font-bold" />
                            {form.formState.errors.line1 && <p className="text-[10px] text-red-500 font-bold ml-1">{form.formState.errors.line1.message}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">City</label>
                                <Input {...form.register("city")} placeholder="City" className="rounded-xl border-none bg-muted/50 h-12 font-bold" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">State</label>
                                <Input {...form.register("state")} placeholder="State" className="rounded-xl border-none bg-muted/50 h-12 font-bold" />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Pincode</label>
                                <Input {...form.register("zipCode")} placeholder="Pincode" className="rounded-xl border-none bg-muted/50 h-12 font-bold" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Country</label>
                                <Input {...form.register("country")} readOnly className="rounded-xl border-none bg-muted/20 h-12 font-bold text-muted-foreground" />
                            </div>
                        </div>
                    </div>

                    <Button
                        type="submit"
                        disabled={addAddress.isPending}
                        className="w-full h-14 rounded-2xl font-black text-lg bg-primary text-white shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform"
                    >
                        {addAddress.isPending ? "SAVING..." : "SAVE ADDRESS"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
