"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUpdateUserDetails } from "@/app/_queries/profile/user/update-user-details";
import { toastSuccess } from "@/lib/utils";
import { Spinner } from "@/components/reuseables/spinner";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: {
    name: string;
    email: string;
    phone: string | null;
  };
}

export function EditProfileModal({
  isOpen,
  onClose,
  profile,
}: EditProfileModalProps) {
  const [name, setName] = useState(profile.name ?? "");
  const [phone, setPhone] = useState(profile.phone ?? "");

  const { mutate: updateUserDetails, isPending } = useUpdateUserDetails();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    updateUserDetails(
      { name, phone },
      {
        onSuccess: () => {
          toastSuccess("Updated successfully");
          onClose();
        },
      },
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl bg-background rounded-none border-none shadow-2xl px-6 sm:px-10 py-8 overflow-y-auto">
        <DialogHeader className="text-left space-y-2">
          <DialogTitle className="text-3xl sm:text-4xl font-beatrice-deck font-normal tracking-tight">
            Edit profile
          </DialogTitle>
          <p className="text-muted-foreground text-sm sm:text-lg font-light leading-relaxed">
            Update your details below. Changes will apply to your account.
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-6">
          {/* Full Name */}
          <div className="space-y-3">
            <Label className="text-xs uppercase tracking-widest text-stone-500">
              Full name
            </Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-12 px-4 border border-stone-200 bg-white focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-stone-400 rounded-none"
            />
          </div>

          {/* Email */}
          <div className="space-y-3">
            <Label className="text-xs uppercase tracking-widest text-stone-500">
              Email
            </Label>
            <Input
              type="email"
              value={profile.email ?? ""}
              disabled
              readOnly
              className="h-12 px-4 border border-stone-200 bg-white text-muted-foreground cursor-not-allowed rounded-none"
            />
          </div>

          {/* Phone */}
          <div className="space-y-3">
            <Label className="text-xs uppercase tracking-widest text-stone-500">
              Phone
            </Label>
            <Input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Optional"
              className="h-12 px-4 border border-stone-200 bg-white focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-stone-400 rounded-none"
            />
          </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-4 pt-6">
            <Button
              type="button"
              onClick={onClose}
              variant="ghost"
              className="w-full sm:flex-1 h-12 sm:h-13 md:h-14 text-xs sm:text-sm font-semibold tracking-wide hover:bg-muted/50 transition-all order-2 sm:order-1 rounded-none">
              Go back
            </Button>

            <Button
              type="submit"
              disabled={isPending}
              className="w-full sm:flex-1 md:flex-2 h-12 sm:h-13 md:h-14 bg-foreground text-primary-foreground hover:bg-foreground/90 shadow-xl disabled:bg-primary shadow-primary/20 transition-all text-xs sm:text-sm font-semibold tracking-wide order-1 sm:order-2 rounded-none">
              {isPending && <Spinner />}
              {isPending ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
