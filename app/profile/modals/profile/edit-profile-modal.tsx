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
      <DialogContent className="max-w-2xl p-8 md:p-10 bg-background rounded-none border-none shadow-2xl">
        <DialogHeader className="text-left space-y-2">
          <DialogTitle className="text-4xl font-beatrice-deck font-normal tracking-tight">
            Edit profile
          </DialogTitle>
          <p className="text-muted-foreground text-lg font-light leading-relaxed">
            Update your details below. Changes will apply to your account.
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-6">
          <div className="space-y-3">
            <label className="block text-xs uppercase tracking-widest text-stone-500">
              Full name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border border-stone-200 bg-white focus:outline-none focus:border-stone-400"
            />
          </div>

          <div className="space-y-3">
            <label className="block text-xs uppercase tracking-widest text-stone-500">
              Email
            </label>
            <input
              type="email"
              value={profile.email ?? ""}
              disabled
              readOnly
              className="w-full text-muted-foreground hover:cursor-not-allowed px-4 py-3 border border-stone-200 bg-white"
            />
          </div>

          <div className="space-y-3">
            <label className="block text-xs uppercase tracking-widest text-stone-500">
              Phone
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Optional"
              className="w-full px-4 py-3 border border-stone-200 bg-white focus:outline-none focus:border-stone-400"
            />
          </div>

          <DialogFooter className="flex gap-4 pt-6">
            <Button
              type="button"
              onClick={onClose}
              variant="ghost"
              className="w-full sm:flex-1 h-12 sm:h-13 md:h-14 text-xs sm:text-sm font-semibold tracking-wide hover:bg-muted/50 transition-all order-2 sm:order-1">
              Go back
            </Button>
            <Button
              type="submit"
              className="w-full sm:flex-1 md:flex-2 h-12 sm:h-13 md:h-14 bg-foreground text-primary-foreground hover:bg-foreground/90 shadow-xl disabled:bg-primary shadow-primary/20 transition-all text-xs sm:text-sm font-semibold tracking-wide order-1 sm:order-2">
              {isPending && <Spinner />}
              {isPending ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
