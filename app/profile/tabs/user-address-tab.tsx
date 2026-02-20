"use client";

import { useGetUserAddresses } from "@/app/_queries/profile/address/get-user-addresses";
import { useUserAddressStore } from "@/app/profile/_hooks/use-user-address-store";
import { AddAddressModal } from "@/app/profile/modals/address/add-address-modal";
import { DeleteAddressModal } from "@/app/profile/modals/address/delete-address-modal";
import { SetDefaultAddressModal } from "@/app/profile/modals/address/set-default-address-modal";
import { UpdateAddressModal } from "@/app/profile/modals/address/update-address-modal";
import { EmptyState } from "@/app/profile/resueables/empty-state";
import { ErrorState } from "@/app/profile/resueables/error-state";
import { LoadingState } from "@/app/profile/resueables/loading-state";
import { useAddressModalStore } from "@/app/profile/tabs/store/use-address-store";
import { Button } from "@/components/ui/button";
import { AddressResponse } from "@/lib/types/address";
import { MapPin } from "lucide-react";
import { useState } from "react";

export default function UserAddressTab() {
  const { data, isLoading, isError, refetch } = useGetUserAddresses();

  const { openAddAddressModal, openUpdateAddressModal } = useAddressModalStore(
    (state) => state,
  );
  const addresses = data?.data;

  if (isLoading) {
    return <LoadingState />;
  }
  if (isError || !addresses) {
    return (
      <ErrorState
        title="Error loading overview"
        description="We couldn't load your overview addresses. Please try refreshing the page"
        onRetry={refetch}
      />
    );
  }

  return (
    <>
      {!isLoading && !isError && addresses.length === 0 && (
        <EmptyState
          icon={<MapPin className="text-muted-foreground" />}
          title="No addresses saved yet"
          description="Add your first delivery address to make checkout faster and easier next time you shop."
          actionLabel="Add Address"
          onAction={() => openAddAddressModal(true)}
        />
      )}

      {!isLoading && !isError && addresses.length > 0 && (
        <SavedAddresses
          addresses={addresses}
          onOpenCreate={() => openAddAddressModal(true)}
          onOpenUpdate={() => openUpdateAddressModal(true)}
        />
      )}

      <AddAddressModal />
      <UpdateAddressModal />
    </>
  );
}

function SavedAddresses({
  addresses,
  onOpenCreate,
  onOpenUpdate,
}: {
  addresses: AddressResponse[];
  onOpenCreate: () => void;
  onOpenUpdate: () => void;
}) {
  return (
    <div className="space-y-4 md:space-y-6 mb-8 md:mb-12 lg:mb-16">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
        <h3 className="tab_header">Saved Addresses</h3>

        <Button
          className="bg-foreground button w-full sm:w-auto"
          onClick={onOpenCreate}>
          Add Address
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {addresses.map((address) => (
          <AddressCard
            key={address.id}
            address={address}
            onOpenUpdate={onOpenUpdate}
          />
        ))}
      </div>
    </div>
  );
}

interface AddressCardProps {
  address: AddressResponse;
  onOpenUpdate: () => void;
}

export function AddressCard({ address, onOpenUpdate }: AddressCardProps) {
  const loadAddress = useUserAddressStore((store) => store.loadAddress);

  const [isSetDefaultAddressModalOpen, setIsSetDefaultAddressModalOpen] =
    useState(false);
  const [isDeleteAddressModalOpen, setIsDeleteAddressModalOpen] =
    useState(false);

  const handleEdit = () => {
    // Load the address data into the store
    loadAddress({
      id: address.id,
      label: address.label,
      first_name: address.first_name,
      last_name: address.last_name,
      street: address.street,
      city: address.city,
      state: address.state,
      zip: address.zip,
      country: address.country,
      phone: address.phone || "",
      is_default: address.is_default,
    });

    // Open the update modal
    onOpenUpdate();
  };

  return (
    <div className="bg-card p-4 md:p-6 border border-border relative transition-shadow">
      {address.is_default && (
        <div className="absolute top-0 right-0 px-3 md:px-5 py-1.5 md:py-2 bg-neutral-900 text-white text-[8px] md:text-[9px] uppercase tracking-[0.2em] md:tracking-[0.3em] font-semibold font-beatrice">
          Primary
        </div>
      )}

      <div className="flex-1">
        <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6 lg:mb-8">
          <span className="tab_leading text-xs md:text-sm">
            Address Reference
          </span>
          <div className="h-[0.5px] flex-1 bg-neutral-100 group-hover:bg-neutral-200 transition-colors" />
        </div>

        <h4 className="text-xl md:text-2xl lg:text-3xl font-normal tracking-tight mb-4 md:mb-6 font-beatrice-deck text-neutral-900 lowercase first-letter:uppercase">
          {address.label}
        </h4>

        <div className="space-y-1.5 md:space-y-2 tab_text text-[13px] md:text-[14px] leading-relaxed text-neutral-500 font-beatrice tracking-tight">
          <p className="font-semibold text-neutral-900 tracking-normal text-[15px] md:text-[16px] mb-2 md:mb-3">
            {address.first_name} {address.last_name}
          </p>
          <div className="space-y-0.5 md:space-y-1">
            <p>{address.street}</p>
            <p>
              {address.city}, {address.state} {address.zip}
            </p>
            <p className="tab_leading mt-1 md:mt-2">{address.country}</p>
          </div>

          {address.phone && (
            <p className="pt-3 md:pt-4 text-neutral-400 tabular-nums text-xs md:text-[13px] border-t border-neutral-50 mt-3 md:mt-4">
              {address.phone}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-6 md:pt-8 lg:pt-10 mt-6 md:mt-8 lg:mt-10 border-t border-neutral-100 gap-4 sm:gap-0">
        <div className="flex gap-4 md:gap-6 w-full sm:w-auto">
          <button
            onClick={handleEdit}
            className="tab_actions text-neutral-900 hover:text-neutral-400 transition-all duration-300 font-beatrice text-sm md:text-base">
            Edit
          </button>

          {!address.is_default && (
            <button
              onClick={() => setIsSetDefaultAddressModalOpen(true)}
              className="tab_actions text-neutral-900 hover:text-neutral-400 transition-all duration-300 font-beatrice text-sm md:text-base">
              Set Default
            </button>
          )}
        </div>

        <button
          onClick={() => setIsDeleteAddressModalOpen(true)}
          className="tab_actions text-red-900/40 hover:text-red-900 transition-all duration-300 font-beatrice text-sm md:text-base sm:ml-auto">
          Remove
        </button>
      </div>

      <SetDefaultAddressModal
        isOpen={isSetDefaultAddressModalOpen}
        onClose={() => setIsSetDefaultAddressModalOpen(false)}
        addressId={address.id}
        addressLabel={
          address.street + ", " + address.city + ", " + address.country
        }
      />
      <DeleteAddressModal
        isOpen={isDeleteAddressModalOpen}
        onClose={() => setIsDeleteAddressModalOpen(false)}
        addressId={address.id}
        addressLabel={
          address.street + ", " + address.city + ", " + address.country
        }
      />
    </div>
  );
}
