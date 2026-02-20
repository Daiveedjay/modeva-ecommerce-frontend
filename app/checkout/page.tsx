"use client";

import { useGetUserAddresses } from "@/app/_queries/profile/address/get-user-addresses";
import { useGetUserPaymentMethods } from "@/app/_queries/profile/payment/get-user-payment-methods";
import NavBar from "@/app/_resuseables/nav-bar";
import { useCartStore } from "@/app/cart/_hooks/use-cart-store";
import { DeliveryAddressSection } from "@/app/checkout/_components/delivery-address-section";
import { OrderSummary } from "@/app/checkout/_components/order-summary";
import { PaymentMethodSection } from "@/app/checkout/_components/payment-method-section";
import { RequireCartItems } from "@/app/checkout/_components/require-cart-items";
import { CheckoutConfirmationModal } from "@/app/checkout/_modal/checkout-confirmation-modal";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { useState } from "react";

export default function CheckoutPage() {
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    null,
  );
  const [selectedPaymentId, setSelectedPaymentId] = useState<string | null>(
    null,
  );
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const cart_items = useCartStore((s) => s.items);
  const items_cost = cart_items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping = items_cost * 0.05;
  const tax = items_cost * 0.1;

  const total = items_cost + shipping + tax;

  const handleConfirmPayment = () => {
    setShowConfirmModal(true);
  };

  const { data: address_response } = useGetUserAddresses();
  const { data: payment_response } = useGetUserPaymentMethods();

  const selected_address = address_response?.data?.find(
    (address) => address.id === selectedAddressId,
  );

  const selected_payment = payment_response?.data?.find(
    (payment) => payment.id === selectedPaymentId,
  );

  return (
    <>
      <NavBar />
      <RequireCartItems>
        {" "}
        <div className="min-h-screen bg-white text-[#1a1a1a]">
          <div className="max-w-350 mx-auto grid grid-cols-1 lg:grid-cols-12 gap-0 min-h-screen">
            {/* Left Column: Selection Area */}
            <div className="lg:col-span-8 p-6 md:p-12 lg:p-20 bg-white border-r border-[#eeeeee]">
              <div className="max-w-175 mx-auto lg:mx-0">
                <header className="mb-16">
                  <h1 className="text-5xl font-beatrice-deck font-medium tracking-tight mb-4">
                    Checkout
                  </h1>
                  <p className="tab_leading">
                    Review your order details and select your preferences
                  </p>
                </header>

                <div className="space-y-20">
                  <DeliveryAddressSection
                    selectedId={selectedAddressId}
                    onSelect={setSelectedAddressId}
                  />

                  <PaymentMethodSection
                    selectedPaymentId={selectedPaymentId}
                    onSelect={setSelectedPaymentId}
                  />

                  {/* Action */}
                  <div className="pl-0 md:pl-16 pt-8">
                    <Button
                      onClick={handleConfirmPayment}
                      disabled={!selectedAddressId || !selectedPaymentId}
                      className="w-full h-16 bg-[#1a1a1a] text-white rounded-none hover:bg-black text-[11px] uppercase tracking-[0.3em] font-bold group shadow-2xl transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed">
                      Confirm & Pay {formatCurrency(total)}
                      <ChevronRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <OrderSummary />
          </div>
        </div>
        <CheckoutConfirmationModal
          open={showConfirmModal}
          onOpenChange={setShowConfirmModal}
          total={total}
          selected_address={selected_address}
          selected_payment={selected_payment}
        />
      </RequireCartItems>
    </>
  );
}
