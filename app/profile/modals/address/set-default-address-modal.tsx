"use client";

import { useSetDefaultUserAddress } from "@/app/_queries/profile/address/set-default-user-address";
import { Spinner } from "@/components/reuseables/spinner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { MapPin } from "lucide-react";

interface SetDefaultAddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  addressId: string;
  addressLabel?: string;
}

export function SetDefaultAddressModal({
  isOpen,
  onClose,
  addressLabel = "this address",
  addressId,
}: SetDefaultAddressModalProps) {
  const { mutate: setDefaultAddress, isPending } = useSetDefaultUserAddress();

  const handleConfirm = async () => {
    setDefaultAddress(
      { address_id: addressId },
      {
        onSuccess: () => {
          onClose();
        },
      },
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-background border-none shadow-2xl w-[calc(100vw-2rem)] sm:w-full max-w-md p-4 sm:p-6">
        <DialogHeader className="space-y-2 sm:space-y-3">
          <div className="mx-auto w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
          </div>
          <DialogTitle className="text-lg sm:text-xl font-beatrice-deck font-normal tracking-tight text-center">
            Set as Default Address?
          </DialogTitle>
          <DialogDescription className="text-center text-muted-foreground text-xs sm:text-sm px-1 sm:px-0">
            Are you sure you want to set{" "}
            <span className="font-medium text-foreground wrap-break-word">
              {addressLabel}
            </span>{" "}
            as your default delivery address? All future orders will be shipped
            here by default.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex-col sm:flex-row gap-2 mt-4 sm:mt-5">
          <Button
            type="button"
            variant="ghost"
            onClick={onClose}
            disabled={isPending}
            className="w-full sm:flex-1 h-10 sm:h-11 text-xs sm:text-sm font-semibold tracking-wide order-2 sm:order-1">
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleConfirm}
            disabled={isPending}
            className="w-full sm:flex-1 h-10 sm:h-11 bg-foreground text-primary hover:bg-foreground/90 text-xs sm:text-sm font-semibold tracking-wide order-1 sm:order-2">
            {isPending && <Spinner className="w-4 h-4" />}
            {isPending ? "Setting..." : "Set as Default"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
