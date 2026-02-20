"use client";

import { useDeleteUserAddress } from "@/app/_queries/profile/address/delete-user-address";
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
import { AlertTriangle } from "lucide-react";

interface DeleteAddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  addressId: string;
  addressLabel?: string;
}

export function DeleteAddressModal({
  isOpen,
  onClose,
  addressId,
  addressLabel = "this address",
}: DeleteAddressModalProps) {
  const { mutate: deleteAddress, isPending } = useDeleteUserAddress();

  const handleConfirm = async () => {
    deleteAddress(addressId, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-background border-none shadow-2xl w-[calc(100vw-2rem)] sm:w-full max-w-md p-4 sm:p-6">
        <DialogHeader className="space-y-3 sm:space-y-4">
          <div className="mx-auto w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-destructive/10 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-destructive" />
          </div>
          <DialogTitle className="text-xl sm:text-2xl font-beatrice-deck font-normal tracking-tight text-center">
            Delete Address?
          </DialogTitle>
          <DialogDescription className="text-center text-muted-foreground text-sm sm:text-base space-y-2 sm:space-y-3 px-2 sm:px-0">
            <p>
              Are you sure you want to delete{" "}
              <span className="font-medium text-foreground break-words">
                {addressLabel}
              </span>{" "}
              as an address?
            </p>

            <p className="text-destructive/80 font-medium text-xs sm:text-sm">
              This action cannot be undone.
            </p>
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
            variant="destructive"
            className="w-full sm:flex-1 hover:bg-destructive/70 h-11 sm:h-12 text-xs sm:text-sm font-semibold tracking-wide order-1 sm:order-2">
            {isPending && <Spinner className="w-4 h-4" />}
            {isPending ? "Deleting..." : "Delete Address"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
