"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { CheckCircle2, Package, Mail, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/reuseables/spinner";
import { useGetUserOrderDetails } from "@/app/_queries/profile/orders/get-user-order-details";
import { useCartStore } from "@/app/cart/_hooks/use-cart-store";
import { useSingleProductStore } from "@/app/products/[product-slug]/[id]/_hooks/use-single-product-store";
import { useMultiSelectStore } from "@/app/products/[product-slug]/[id]/_hooks/use-multi-select-store";

/* -------------------------------- utilities -------------------------------- */

function getDeliveryRange(createdAt: string) {
  const base = new Date(createdAt);

  const min = new Date(base);
  min.setDate(min.getDate() + 10);

  const max = new Date(base);
  max.setDate(max.getDate() + 14);

  return { min, max };
}

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
});

/* -------------------------------- component -------------------------------- */

export default function OrderSuccessPage() {
  const router = useRouter();
  const params = useParams<{ orderId: string }>();
  const orderId = params.orderId || "";

  // ✅ FIX: ALWAYS call the hook unconditionally - no enabled option
  const { data, isLoading, isError } = useGetUserOrderDetails(orderId);

  // ✅ Always calculate these (hooks must be called in same order every render)
  const order = data?.data;
  const deliveryRange = order ? getDeliveryRange(order.created_at) : null;

  useEffect(() => {
    useCartStore.getState().clearCart();
    useSingleProductStore.getState().reset();
    useMultiSelectStore.getState().reset();
  }, []);

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  // Show loading while redirecting (after error detected)
  if (isError || !order || !deliveryRange) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  const { min, max } = deliveryRange;

  return (
    <div className="min-h-screen bg-white text-[#1a1a1a] flex flex-col items-center justify-center p-4 sm:p-6 text-center">
      <div className="max-w-150 w-full space-y-8 sm:space-y-12">
        {/* Success Icon & Header */}
        <div className="space-y-4 sm:space-y-6">
          <div className="flex justify-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#1a1a1a] text-white flex items-center justify-center rounded-none shadow-2xl">
              <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10" />
            </div>
          </div>

          <div className="space-y-1.5 sm:space-y-3">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-beatrice-deck font-medium tracking-tight uppercase">
              Order Confirmed
            </h1>
            <p className="text-[8px] sm:text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[#999999] font-bold">
              Thank you for your purchase. Your boutique experience begins now.
            </p>
          </div>
        </div>

        {/* Order Meta */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#eeeeee] border border-[#eeeeee]">
          <div className="bg-white p-4 sm:p-6 md:p-8 space-y-2 sm:space-y-4 text-left">
            <p className="text-[8px] sm:text-[10px] uppercase tracking-[0.12em] sm:tracking-[0.2em] font-bold text-[#999999]">
              Order Number
            </p>
            <p className="text-base sm:text-lg font-medium tracking-tighter">
              {order.order_number}
            </p>
          </div>

          <div className="bg-white p-4 sm:p-6 md:p-8 space-y-2 sm:space-y-4 text-left">
            <p className="text-[8px] sm:text-[10px] uppercase tracking-[0.12em] sm:tracking-[0.2em] font-bold text-[#999999]">
              Estimated Delivery
            </p>
            <p className="text-base sm:text-lg font-medium tracking-tighter">
              {dateFormatter.format(min)} – {dateFormatter.format(max)}
            </p>
          </div>
        </div>

        {/* Reassurance */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 py-2 sm:py-4">
          <div className="flex items-start gap-3 sm:gap-4 text-left">
            <div className="mt-0.5 sm:mt-1 w-7 h-7 sm:w-8 sm:h-8 bg-[#fafafa] flex items-center justify-center shrink-0">
              <Package className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#1a1a1a]" />
            </div>
            <div>
              <p className="text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-0.5 sm:mb-1">
                Processing
              </p>
              <p className="text-[9px] sm:text-[10px] text-[#666666] leading-relaxed uppercase tracking-wide">
                Your items are being prepared for white-glove inspection.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 sm:gap-4 text-left">
            <div className="mt-0.5 sm:mt-1 w-7 h-7 sm:w-8 sm:h-8 bg-[#fafafa] flex items-center justify-center shrink-0">
              <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#1a1a1a]" />
            </div>
            <div>
              <p className="text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-0.5 sm:mb-1">
                Communication
              </p>
              <p className="text-[9px] sm:text-[10px] text-[#666666] leading-relaxed uppercase tracking-wide">
                You'll receive an email once your order is in transit.
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-4 sm:pt-8 space-y-2 sm:space-y-4">
          <Button
            asChild
            className="w-full h-10 sm:h-12 md:h-16 bg-[#1a1a1a] text-white rounded-none hover:bg-black text-[10px] sm:text-[11px] uppercase tracking-[0.2em] sm:tracking-[0.3em] font-bold transition-all active:scale-[0.98]">
            <Link
              href="/products"
              className="flex items-center justify-center gap-2 sm:gap-3">
              Continue Shopping{" "}
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </Link>
          </Button>

          <Button
            asChild
            variant="ghost"
            className="w-full h-9 sm:h-11 rounded-none text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] font-bold text-[#999999] hover:text-[#1a1a1a]">
            <Link href="/profile?tab=orders">View Order Status</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
