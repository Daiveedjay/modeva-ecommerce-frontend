"use client";

import RemoveCardModal from "@/app/profile/modals/payment/remove-card-modal";
import SetDefaultCardModal from "@/app/profile/modals/payment/set-default-card-modal";
import { CreditCard, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

import { useDeleteUserPaymentMethod } from "@/app/_queries/profile/payment/delete-user-payment-method";
import { useGetUserPaymentMethods } from "@/app/_queries/profile/payment/get-user-payment-methods";
import { useSetDefaultPaymentMethod } from "@/app/_queries/profile/payment/set-default-payment-method";
import { AddCardModal } from "@/app/profile/modals/payment/add-card-modal";
import { EmptyState } from "@/app/profile/resueables/empty-state";
import { ErrorState } from "@/app/profile/resueables/error-state";
import { LoadingState } from "@/app/profile/resueables/loading-state";
import { CardBrandIcons } from "@/lib/card-brands";
import { PaymentMethodResponse } from "@/lib/types/payment";
import { usePaymentModalStore } from "@/app/profile/tabs/store/use-payment-store";

export function UserPaymentMethodsTab() {
  const { openAddPaymentModal } = usePaymentModalStore((state) => state);

  const { data, isLoading, isError, refetch } = useGetUserPaymentMethods();

  const paymentMethods = data?.data ?? [];

  return (
    <>
      {isLoading && <LoadingState />}

      {isError && (
        <ErrorState
          title="Error loading payment methods"
          description="We couldn't load your saved payment methods."
          onRetry={refetch}
        />
      )}

      {!isLoading && !isError && paymentMethods.length === 0 && (
        <EmptyState
          icon={<CreditCard className="text-muted-foreground" />}
          title="No payment methods saved yet"
          description="Add your first payment method to make checkout faster."
          actionLabel="Add Payment Method"
          onAction={() => openAddPaymentModal(true)}
        />
      )}

      {!isLoading && !isError && paymentMethods.length > 0 && (
        <SavedPaymentMethods
          paymentMethods={paymentMethods}
          onAdd={() => openAddPaymentModal(true)}
        />
      )}

      {/* ✅ Always mounted */}
      <AddCardModal />
    </>
  );
}

function SavedPaymentMethods({
  paymentMethods,
  onAdd,
}: {
  paymentMethods: PaymentMethodResponse[];
  onAdd: () => void;
}) {
  return (
    <div className="space-y-4 md:space-y-6 mb-8 md:mb-12 lg:mb-16">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
        <h3 className="tab_header">Saved Payment Methods</h3>

        <Button
          onClick={onAdd}
          className="uppercase bg-foreground hover:bg-foreground/80 text-xs tracking-widest font-light inline-flex items-center gap-2 w-full sm:w-auto">
          <Plus className="w-3.5 h-3.5 md:w-4 md:h-4" />
          Add Card
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {paymentMethods.map((payment) => (
          <PaymentMethodCard key={payment.id} payment={payment} />
        ))}
      </div>
    </div>
  );
}

export function PaymentMethodCard({
  payment,
}: {
  payment: PaymentMethodResponse;
}) {
  const [isSettingDefaultOpen, setIsSettingDefaultOpen] = useState(false);
  const [isDeleteCardOpen, setIsDeleteCardOpen] = useState(false);

  const brandIcon =
    CardBrandIcons[payment.card_brand as keyof typeof CardBrandIcons] ||
    CardBrandIcons.Unknown;

  const { mutateAsync: setDefaultPaymentMethod, isPending: isSettingDefault } =
    useSetDefaultPaymentMethod();

  const { mutateAsync: deletePaymentMethod, isPending: isDeleting } =
    useDeleteUserPaymentMethod();

  const handleSetDefault = async () => {
    await setDefaultPaymentMethod(payment.id);
  };

  const handleDeletePaymentMethod = async () => {
    await deletePaymentMethod(payment.id);
  };

  return (
    <div className="relative bg-card p-4 md:p-6 border border-border transition-shadow hover:shadow-sm">
      {/* Default badge */}
      {payment.is_default && (
        <div className="absolute top-0 right-0 px-3 md:px-5 py-1.5 md:py-2 bg-neutral-900 text-white text-[8px] md:text-[9px] uppercase tracking-[0.2em] md:tracking-[0.3em] font-semibold font-beatrice">
          Primary
        </div>
      )}

      {/* Card Brand & Type */}
      <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
        <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center">
          {brandIcon}
        </div>
        <p className="tab_leading text-xs md:text-sm">{payment.card_type}</p>
        <div className="h-[0.5px] flex-1 bg-neutral-100 transition-colors" />
      </div>

      {/* Card Number */}
      <h4 className="text-xl md:text-2xl lg:text-3xl font-normal tracking-tight mb-3 md:mb-4 font-beatrice-deck text-neutral-900 lowercase first-letter:uppercase">
        {payment.card_number}
      </h4>

      {/* Card Meta */}
      <div className="grid grid-cols-2 gap-3 md:gap-4 text-[13px] md:text-[14px] leading-relaxed font-beatrice text-neutral-500 tracking-tight">
        <div>
          <p className="tab_leading text-xs md:text-sm mb-1">Card Holder</p>
          <p className="tab_text text-neutral-900 text-sm md:text-base">
            {payment.card_holder}
          </p>
        </div>
        <div>
          <p className="tab_leading text-xs md:text-sm mb-1">Expires</p>
          <p className="tab_text text-neutral-900 text-sm md:text-base">
            {payment.expiry}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-6 md:pt-8 lg:pt-10 mt-6 md:mt-8 lg:mt-10 border-t border-neutral-100 gap-3 sm:gap-4">
        {!payment.is_default && (
          <button
            onClick={() => setIsSettingDefaultOpen(true)}
            className="tab_actions text-neutral-900 hover:text-neutral-400 transition-all duration-300 font-beatrice text-sm md:text-base">
            Set Default
          </button>
        )}

        <button
          onClick={() => setIsDeleteCardOpen(true)}
          className="tab_actions text-red-900/40 hover:text-red-900 transition-all duration-300 font-beatrice text-sm md:text-base sm:ml-auto">
          Remove
        </button>
      </div>

      {/* Modals */}
      <SetDefaultCardModal
        isOpen={isSettingDefaultOpen}
        isSettingDefault={isSettingDefault}
        onClose={() => setIsSettingDefaultOpen(false)}
        onAction={handleSetDefault}
      />

      <RemoveCardModal
        isOpen={isDeleteCardOpen}
        isDeleting={isDeleting}
        onClose={() => setIsDeleteCardOpen(false)}
        onAction={handleDeletePaymentMethod}
      />
    </div>
  );
}
