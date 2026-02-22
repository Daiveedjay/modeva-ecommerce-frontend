"use client";

import { useCreateUserOrder } from "@/app/_queries/orders/create-user-order";

import { useCartStore } from "@/app/cart/_hooks/use-cart-store";
import { Spinner } from "@/components/reuseables/spinner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { AddressResponse } from "@/lib/types/address";
import { PaymentMethodResponse } from "@/lib/types/payment";
import { formatCurrency } from "@/lib/utils";

import { Lock, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";

interface CheckoutConfirmationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  // onConfirm: () => void;
  total: number;
  selected_address?: AddressResponse;
  selected_payment?: PaymentMethodResponse;
}

export function CheckoutConfirmationModal({
  open,
  onOpenChange,
  // onConfirm,
  total,
  selected_address,
  selected_payment,
}: CheckoutConfirmationModalProps) {
  const cart_items = useCartStore((s) => s.items);

  const { mutate: createUserOrder, isPending } = useCreateUserOrder();

  const router = useRouter();

  function parseVariant(variant: string) {
    const [size, color] = variant.split("-");

    if (!size || !color) {
      throw new Error(`Invalid variant format: ${variant}`);
    }

    return {
      variant_size: size,
      variant_color: color,
    };
  }

  const handleCreateOrder = async () => {
    console.log(selected_address, selected_payment);
    if (!selected_payment || !selected_address) return;

    createUserOrder(
      {
        payment_method_id: selected_payment.id,
        address_id: selected_address.id,
        items: cart_items.flatMap((item) => {
          const variant = item.variant_selections.variant;
          if (!variant) return [];

          const { variant_size, variant_color } = parseVariant(variant);

          return [
            {
              product_id: item.product_id,
              quantity: item.quantity,
              variant_size,
              variant_color,
            },
          ];
        }),
      },
      {
        onSuccess: (data) => {
          const orderId = data.data?.order_id;

          if (!orderId) {
            console.error("Order created but no order id returned", data);
            return;
          }

          router.replace(`/checkout/success/${orderId}`);
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-125 rounded-none border-[#1a1a1a] p-0 overflow-hidden">
        {/* Header with Trust Signal */}
        <div className="bg-[#1a1a1a] text-white px-4 md:p-8 py-8 pb-10">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 rounded-none bg-white/10 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
          </div>
          <DialogHeader className="space-y-3 text-center">
            <DialogTitle className="text-xl font-bold uppercase tracking-[0.15em] text-white">
              Confirm Your Order
            </DialogTitle>
            <DialogDescription className="text-[10px] uppercase tracking-[0.25em] text-white/70 font-bold">
              Review your selection before completing purchase
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Content */}
        <div className="px-4 py-8 md:p-8 space-y-8">
          {/* Order Summary Preview */}
          <div className="space-y-4">
            <h3 className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#999999]">
              Order Summary
            </h3>
            <div className="flex justify-between items-baseline">
              <span className="text-sm">Total Amount</span>
              <span className="text-2xl font-bold tracking-tight">
                {formatCurrency(total)}
              </span>
            </div>
          </div>

          <Separator className="bg-[#eeeeee]" />

          {/* Shipping Address Preview */}
          {selected_address && (
            <div className="space-y-3">
              <h3 className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#999999]">
                Shipping To
              </h3>
              <p className="text-sm leading-relaxed text-[#666666]">
                {selected_address.first_name} {selected_address.last_name}
                <br />
                {selected_address.street}
                <br />
                {selected_address.city}, {selected_address.state}
              </p>
            </div>
          )}

          <Separator className="bg-[#eeeeee]" />

          {/* Payment Method Preview */}
          {selected_payment && (
            <div className="space-y-3">
              <h3 className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#999999]">
                Payment Method
              </h3>
              <div className="flex items-center gap-3">
                <Lock className="w-4 h-4 text-[#999999]" />
                <p className="text-sm text-[#666666]">
                  {selected_payment.card_brand} {selected_payment.card_number}
                </p>
              </div>
            </div>
          )}

          <Separator className="bg-[#eeeeee]" />

          {/* Actions */}
          <div className="space-y-3 pt-4">
            <Button
              onClick={handleCreateOrder}
              disabled={isPending}
              className="w-full h-14 bg-foreground text-white rounded-none hover:bg-foreground/70 text-[11px] uppercase tracking-[0.25em] font-bold transition-all active:scale-[0.98]">
              <span className=" flex gap-4">
                {" "}
                {isPending && <Spinner />}
                Complete Order
              </span>
            </Button>
            <Button
              onClick={() => onOpenChange(false)}
              variant="ghost"
              className="w-full h-12 rounded-none text-[10px] uppercase tracking-[0.25em] font-bold text-[#666666] hover:text-[#1a1a1a]">
              Review Again
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
