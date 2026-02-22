"use client";

import { useCreateUserAddress } from "@/app/_queries/profile/address/create-user-address";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

import { AddressInfoSection } from "@/app/profile/_components/address-info-section";
import { AddressTypeSelector } from "@/app/profile/_components/address-type-selector";
import { RecipientDetailsSection } from "@/app/profile/_components/recepient-details-section";
import { Spinner } from "@/components/reuseables/spinner";
import { useUserAddressStore } from "@/app/profile/_hooks/use-user-address-store";
import { useAddressModalStore } from "@/app/profile/tabs/store/use-address-store";
import { useGetUserAddresses } from "@/app/_queries/profile/address/get-user-addresses";

export function AddAddressModal() {
  const { addAddressModal, closeAddAddressModal } = useAddressModalStore(
    (state) => state,
  );

  const { data, isLoading: isLoadingAddresses } = useGetUserAddresses();
  const address_data = data?.data;

  const { mutate: createAddress, isPending } = useCreateUserAddress();

  const { formData, setIsDefault, resetForm, isFormValid, getPayload } =
    useUserAddressStore((store) => store);

  // Determine if user has no addresses
  const isFirstAddress =
    !isLoadingAddresses && (!address_data || address_data.length === 0);

  // Ensure default is always checked for first address
  if (isFirstAddress && !formData.is_default) {
    setIsDefault(true);
  }

  const handleClose = () => {
    resetForm();
    closeAddAddressModal();
  };

  const handleSubmit = async () => {
    if (!isFormValid()) return;

    createAddress(getPayload() as Parameters<typeof createAddress>[0]);
    handleClose();
  };

  return (
    <Dialog
      open={addAddressModal}
      onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="bg-background rounded-none border-none shadow-2xl w-full max-w-[95vw] sm:max-w-2xl md:max-w-3xl max-h-[95vh] overflow-y-auto p-0 gap-0">
        <div className="p-4 sm:p-6 md:p-8 lg:p-10 space-y-6 md:space-y-8">
          <DialogHeader className="text-left space-y-1 md:space-y-2">
            <DialogTitle className="text-2xl sm:text-3xl md:text-4xl font-beatrice-deck font-normal tracking-tight">
              Add New Address
            </DialogTitle>
            <p className="text-muted-foreground text-sm sm:text-base md:text-lg font-light leading-relaxed">
              Please enter your delivery details below to ensure a smooth
              shipping experience.
            </p>
          </DialogHeader>

          <div className="space-y-6 md:space-y-8 lg:space-y-10">
            <AddressTypeSelector />

            <RecipientDetailsSection />

            <Separator className="bg-border/50" />

            <AddressInfoSection />

            {/* Default Option */}
            <div
              className={`flex items-start sm:items-center gap-3 md:gap-4 p-4 md:p-6 border-2 group cursor-pointer transition-colors ${
                isFirstAddress
                  ? "bg-input/10 cursor-not-allowed"
                  : "bg-input/10"
              }`}
              onClick={() =>
                !isFirstAddress && setIsDefault(!formData.is_default)
              }>
              <Checkbox
                id="is_default"
                checked={formData.is_default}
                onCheckedChange={setIsDefault}
                disabled={isFirstAddress} // disable if first address
                className="w-4 h-4 md:w-5 md:h-5 data-[state=checked]:bg-foreground data-[state=checked]:border-primary mt-0.5 sm:mt-0 shrink-0"
              />
              <div className="flex-1 min-w-0">
                <Label
                  htmlFor="is_default"
                  className={`text-xs sm:text-sm font-semibold block ${
                    isFirstAddress ? "cursor-not-allowed" : "cursor-pointer"
                  }`}>
                  Set as default delivery address
                </Label>
                <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 font-light">
                  Your orders will be sent here by default.
                </p>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="sticky bottom-0 bg-background/80 backdrop-blur-xl p-4 sm:p-6 md:p-8 border-t border-border/40 flex-col sm:flex-row gap-3 md:gap-4 mt-0">
          <Button
            type="button"
            variant="ghost"
            onClick={handleClose}
            className="w-full sm:flex-1 h-12 sm:h-13 md:h-14 text-xs sm:text-sm font-semibold tracking-wide hover:bg-muted/50 transition-all order-2 sm:order-1">
            Go Back
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={!isFormValid() || isPending}
            className="w-full sm:flex-1 md:flex-2 h-12 sm:h-13 md:h-14 bg-foreground text-primary-foreground hover:bg-foreground/90 shadow-xl disabled:bg-primary shadow-primary/20 transition-all text-xs sm:text-sm font-semibold tracking-wide order-1 sm:order-2">
            {isPending && <Spinner />}
            {isPending ? "Processing..." : "Save Address"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
