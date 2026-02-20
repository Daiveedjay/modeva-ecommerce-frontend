"use client";

import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetUserPaymentMethods } from "@/app/_queries/profile/payment/get-user-payment-methods";
import { CardBrandIcons } from "@/lib/card-brands";
import { PaymentMethodResponse } from "@/lib/types/payment";

interface PaymentMethodSectionProps {
  selectedPaymentId: string | null;
  onSelect: (id: string) => void;
}

export function PaymentMethodSection({
  selectedPaymentId,
  onSelect,
}: PaymentMethodSectionProps) {
  const { data, isLoading: is_loading_payment_methods } =
    useGetUserPaymentMethods();

  const payment_methods = data?.data ?? [];

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

        <Button
          variant="link"
          className="p-0 text-[10px] text-foreground font-bold uppercase tracking-widest underline">
          Manage Cards
        </Button>
      </div>

      {/* ---------------- Content ---------------- */}
      <div className="grid grid-cols-1 gap-4 pl-0 md:grid-cols-2 md:pl-16">
        {is_loading_payment_methods ? (
          <LoadingPayments />
        ) : (
          <LoadedPaymentMethods
            payment_methods={payment_methods}
            selected_payment_id={selectedPaymentId}
            onSelect={onSelect}
          />
        )}
      </div>
    </section>
  );
}

function LoadingPayments() {
  return (
    <>
      {Array.from({ length: 2 }).map((_, index) => (
        <Skeleton key={index} className="h-32 w-full rounded-none" />
      ))}
    </>
  );
}

interface LoadedPaymentMethodsProps {
  payment_methods: PaymentMethodResponse[];
  selected_payment_id: string | null;
  onSelect: (id: string) => void;
}

function LoadedPaymentMethods({
  payment_methods,
  selected_payment_id,
  onSelect,
}: LoadedPaymentMethodsProps) {
  return (
    <>
      {payment_methods.map((payment) => {
        const brand_icon =
          CardBrandIcons[payment.card_brand as keyof typeof CardBrandIcons] ??
          CardBrandIcons.Unknown;

        const is_selected = selected_payment_id === payment.id;

        return (
          <div
            key={payment.id}
            onClick={() => onSelect(payment.id)}
            className={[
              "relative cursor-pointer border p-6 transition-all group",
              is_selected
                ? "border-[#1a1a1a] bg-[#fafafa]"
                : "border-[#eeeeee] hover:border-[#cccccc]",
            ].join(" ")}>
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
    </>
  );
}
