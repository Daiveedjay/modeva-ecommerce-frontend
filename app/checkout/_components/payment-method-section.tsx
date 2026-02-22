"use client";

import { Check, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetUserPaymentMethods } from "@/app/_queries/profile/payment/get-user-payment-methods";
import { CardBrandIcons } from "@/lib/card-brands";
import { PaymentMethodResponse } from "@/lib/types/payment";
import { usePaymentModalStore } from "@/app/profile/tabs/store/use-payment-store";
import { AddCardModal } from "@/app/profile/modals/payment/add-card-modal";
import { EmptyState } from "@/app/profile/resueables/empty-state";

interface PaymentMethodSectionProps {
  selectedPaymentId: string | null;
  onSelect: (id: string) => void;
}

export function PaymentMethodSection({
  selectedPaymentId,
  onSelect,
}: PaymentMethodSectionProps) {
  const { data, isLoading } = useGetUserPaymentMethods();
  const payment_methods = data?.data ?? [];

  const { openAddPaymentModal } = usePaymentModalStore((state) => state);

  return (
    <section className="space-y-8">
      {/* ---------------- Header ---------------- */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <span className="flex h-10 w-10 items-center justify-center border border-[#1a1a1a] bg-[#1a1a1a] text-sm font-bold text-white">
            02
          </span>
          <h2 className="text-xs font-bold uppercase tracking-[1px]">
            Payment Method
          </h2>
        </div>

        {payment_methods.length > 0 && (
          <Button
            variant="link"
            className="p-0 text-[10px] text-foreground font-bold uppercase tracking-widest underline"
            onClick={() => openAddPaymentModal(true)}>
            Add New
          </Button>
        )}
      </div>

      {/* ---------------- Content ---------------- */}
      <div className="pl-0 md:pl-16">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array.from({ length: 2 }).map((_, index) => (
              <Skeleton key={index} className="h-40 w-full rounded-none" />
            ))}
          </div>
        ) : payment_methods.length === 0 ? (
          <EmptyState
            icon={<CreditCard className="text-muted-foreground" />}
            title="No payment methods saved yet"
            description="Add your first payment method to make checkout faster and easier next time."
            actionLabel="Add Card"
            onAction={() => openAddPaymentModal(true)}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {payment_methods.map((payment) => {
              const brand_icon =
                CardBrandIcons[
                  payment.card_brand as keyof typeof CardBrandIcons
                ] ?? CardBrandIcons.Unknown;

              const is_selected = selectedPaymentId === payment.id;

              return (
                <div
                  key={payment.id}
                  onClick={() => onSelect(payment.id)}
                  className={`relative cursor-pointer border p-6 transition-all group rounded-none ${
                    is_selected
                      ? "border-[#1a1a1a] bg-[#fafafa]"
                      : "border-[#eeeeee] hover:border-[#cccccc]"
                  }`}>
                  <div className="mb-4 flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      {brand_icon}
                      <span className="text-[10px] font-bold uppercase tracking-widest">
                        {payment.card_brand}
                      </span>
                    </div>

                    {is_selected && <Check className="h-4 w-4" />}
                  </div>

                  <p className="mb-1 font-mono text-sm tracking-wider">
                    {payment.card_number}
                  </p>

                  <div className="mt-2 flex items-end justify-between">
                    <p className="text-[10px] uppercase tracking-widest text-[#666666]">
                      {payment.card_holder}
                    </p>
                    <p className="text-[10px] uppercase tracking-widest text-[#666666]">
                      {payment.expiry}
                    </p>
                  </div>

                  {payment.is_default && (
                    <span className="inline-block mt-4 text-[9px] uppercase tracking-widest bg-[#1a1a1a] text-white px-2 py-1 font-bold">
                      Default
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Mounted Add Card Modal */}
      <AddCardModal />
    </section>
  );
}
