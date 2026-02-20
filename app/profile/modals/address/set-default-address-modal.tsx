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
        <DialogHeader className="space-y-3 sm:space-y-4">
          <div className="mx-auto w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
          </div>
          <DialogTitle className="text-xl sm:text-2xl font-beatrice-deck font-normal tracking-tight text-center">
            Set as Default Address?
          </DialogTitle>
          <DialogDescription className="text-center text-muted-foreground text-sm sm:text-base px-2 sm:px-0">
            Are you sure you want to set{" "}
            <span className="font-medium text-foreground wrap-break-word">
              {addressLabel}
            </span>{" "}
            as your default delivery address? All future orders will be shipped
            here by default.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex-col sm:flex-row gap-2 sm:gap-3 mt-4 sm:mt-6">
          <Button
            type="button"
            variant="ghost"
            onClick={onClose}
            disabled={isPending}
            className="w-full sm:flex-1 h-11 sm:h-12 text-xs sm:text-sm font-semibold tracking-wide order-2 sm:order-1">
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleConfirm}
            disabled={isPending}
            className="w-full sm:flex-1 h-11 sm:h-12 bg-foreground text-primary hover:bg-foreground/90 text-xs sm:text-sm font-semibold tracking-wide order-1 sm:order-2">
            {isPending && <Spinner className="w-4 h-4" />}
            {isPending ? "Setting..." : "Set as Default"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
