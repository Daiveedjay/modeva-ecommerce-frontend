"use client";

import { useGetUserAddresses } from "@/app/_queries/profile/address/get-user-addresses";
import { useAddressModalStore } from "@/app/profile/tabs/store/use-address-store";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Check, MapPin } from "lucide-react";
import { AddAddressModal } from "@/app/profile/modals/address/add-address-modal";
import { EmptyState } from "@/app/profile/resueables/empty-state";

interface DeliveryAddressSectionProps {
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function DeliveryAddressSection({
  selectedId,
  onSelect,
}: DeliveryAddressSectionProps) {
  const { data, isLoading: isLoadingAddresses } = useGetUserAddresses();
  const address_data = data?.data;

  const { openAddAddressModal } = useAddressModalStore((state) => state);

  return (
    <section className="space-y-8">
      {/* Section header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <span className="flex items-center justify-center w-10 h-10 rounded-none border border-[#1a1a1a] text-sm font-bold bg-[#1a1a1a] text-white">
            01
          </span>
          <h2 className="text-xs font-bold uppercase tracking-[1px]">
            Delivery Address
          </h2>
        </div>

        {address_data && address_data.length > 0 && (
          <Button
            variant="link"
            onClick={() => openAddAddressModal(true)}
            className="text-[10px] text-foreground uppercase tracking-widest font-bold underline p-0">
            Add New
          </Button>
        )}
      </div>

      {/* Addresses or empty/loading state */}
      <div className="pl-0 md:pl-16">
        {isLoadingAddresses ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array(2)
              .fill(0)
              .map((_, i) => (
                <Skeleton key={i} className="h-40 w-full rounded-none" />
              ))}
          </div>
        ) : !address_data || address_data.length === 0 ? (
          <EmptyState
            icon={<MapPin className="text-muted-foreground" />}
            title="No addresses saved yet"
            description="Add your first delivery address to make checkout faster and easier next time you shop."
            actionLabel="Add Address"
            onAction={() => openAddAddressModal(true)}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {address_data.map((address) => (
              <div
                key={address.id}
                onClick={() => onSelect(address.id)}
                className={`relative p-6 border transition-all cursor-pointer group rounded-none ${
                  selectedId === address.id
                    ? "border-[#1a1a1a] bg-[#fafafa]"
                    : "border-[#eeeeee] hover:border-[#cccccc]"
                }`}>
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-[#999999]">
                    {address.label}
                  </span>
                  {selectedId === address.id && <Check className="w-4 h-4" />}
                </div>
                <p className="text-sm font-bold mb-1">
                  {address.first_name} {address.last_name}
                </p>
                <p className="text-xs text-[#666666] leading-relaxed">
                  {address.street}
                  <br />
                  {address.city}, {address.state} {address.zip}
                  <br />
                  {address.country}
                </p>
                {address.is_default && (
                  <span className="inline-block mt-4 text-[9px] uppercase tracking-widest bg-[#1a1a1a] text-white px-2 py-1 font-bold">
                    Default
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Mounted Add Address Modal */}
      <AddAddressModal />
    </section>
  );
}
