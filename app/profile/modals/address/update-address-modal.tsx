"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

import { useUpdateUserAddress } from "@/app/_queries/profile/address/update-user-address";
import { useUserAddressStore } from "@/app/profile/_hooks/use-user-address-store";
import { AddressInfoSection } from "@/app/profile/_components/address-info-section";
import { AddressTypeSelector } from "@/app/profile/_components/address-type-selector";
import { RecipientDetailsSection } from "@/app/profile/_components/recepient-details-section";
import { Spinner } from "@/components/reuseables/spinner";
import { useAddressModalStore } from "@/app/profile/tabs/store/use-address-store";

export function UpdateAddressModal() {
  const addressId = useUserAddressStore((store) => store.formData.id);
  const { updateAddressModal, closeUpdateAddressModal } = useAddressModalStore(
    (state) => state,
  );

  const { mutate: updateAddress, isPending } = useUpdateUserAddress(addressId);

  const resetForm = useUserAddressStore((store) => store.resetForm);
  const isFormValid = useUserAddressStore((store) => store.isFormValid);
  const getPayload = useUserAddressStore((store) => store.getPayload);

  const handleClose = () => {
    resetForm();
    closeUpdateAddressModal();
  };

  const handleSubmit = async () => {
    if (!isFormValid()) return;

    updateAddress(getPayload() as Parameters<typeof updateAddress>[0], {
      onSuccess: () => {
        handleClose();
      },
    });
  };

  return (
    <Dialog
      open={updateAddressModal}
      onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="bg-background rounded-none border-none shadow-2xl w-full max-w-[95vw] sm:max-w-2xl md:max-w-3xl max-h-[90vh] overflow-y-auto p-0 gap-0">
        <div className="p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-5 md:space-y-6">
          <DialogHeader className="text-left space-y-1">
            <DialogTitle className="text-lg sm:text-2xl md:text-3xl font-beatrice-deck font-normal tracking-tight">
              Update Address
            </DialogTitle>
            <p className="text-muted-foreground text-xs sm:text-sm md:text-base font-light leading-relaxed">
              Update your delivery details below.
            </p>
          </DialogHeader>

          <div className="space-y-4 sm:space-y-5 md:space-y-6">
            <AddressTypeSelector />

            <RecipientDetailsSection />

            <Separator className="bg-border/50" />

            <AddressInfoSection />
          </div>
        </div>

        <DialogFooter className="sticky bottom-0 bg-background/80 backdrop-blur-xl p-4 sm:p-6 border-t border-border/40 flex-col sm:flex-row gap-2 sm:gap-3 mt-0">
          <Button
            type="button"
            variant="ghost"
            onClick={handleClose}
            className="w-full sm:flex-1 h-10 sm:h-11 text-xs sm:text-sm font-semibold tracking-wide hover:bg-muted/50 transition-all order-2 sm:order-1">
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={!isFormValid() || isPending}
            className="w-full sm:flex-1 h-10 sm:h-11 bg-foreground text-primary-foreground hover:bg-foreground/90 shadow-xl disabled:bg-primary shadow-primary/20 transition-all text-xs sm:text-sm font-semibold tracking-wide order-1 sm:order-2">
            {isPending && <Spinner className="w-4 h-4" />}
            {isPending ? "Updating..." : "Update Address"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
