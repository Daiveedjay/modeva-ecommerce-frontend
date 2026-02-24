"use client";

import { useGetUserOrderDetails } from "@/app/_queries/profile/orders/get-user-order-details";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { formatCurrency, formatDateTime, statusColors } from "@/lib/utils";
import { AlertCircle } from "lucide-react";
import { Spinner } from "@/components/reuseables/spinner";
import { AddressSnapshot } from "@/lib/types/order";

interface OrderDetailsDrawerProps {
  orderId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function OrderDetailsDrawer({
  orderId,
  open,
  onOpenChange,
}: OrderDetailsDrawerProps) {
  const enabled = !!orderId && open;
  const { data, isLoading, error } = useGetUserOrderDetails(orderId!, {
    enabled,
  });

  const order = data?.data;

  // Parse address snapshot safely
  let address: AddressSnapshot | null = null;
  if (order?.address_snapshot) {
    try {
      address = JSON.parse(order.address_snapshot) as AddressSnapshot;
    } catch {
      address = null;
    }
  }

  // Only early return for !open
  if (!open) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-135 p-0 border-l border-stone-200 rounded-none bg-white font-beatrice">
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-4 sm:px-6 md:px-8 py-6 md:py-8 lg:py-10 border-b border-stone-100">
            <SheetHeader className="text-left space-y-0.5 md:space-y-1">
              <SheetTitle className="tab_header text-stone-900 text-lg md:text-xl lg:text-2xl">
                Order Information
              </SheetTitle>
              <SheetDescription className="tab_leading text-stone-500 font-beatrice text-xs md:text-sm">
                {order
                  ? `Reference: #${order.order_number}`
                  : "Retrieving records"}
              </SheetDescription>
            </SheetHeader>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-4 sm:px-6 md:px-8 py-6 md:py-8 lg:py-10 space-y-8 md:space-y-10 lg:space-y-12">
            {/* Loading State */}
            {isLoading && (
              <div className="flex flex-col items-center justify-center py-8 md:py-12 space-y-3 md:space-y-4">
                <Spinner />
                <p className="text-xs md:text-sm text-stone-500">
                  Loading order details...
                </p>
              </div>
            )}

            {/* Error State */}
            {error && !isLoading && (
              <div className="flex flex-col items-center justify-center py-8 md:py-12 space-y-3 md:space-y-4">
                <div className="p-3 md:p-4 rounded-full bg-red-50">
                  <AlertCircle className="h-6 w-6 md:h-8 md:w-8 text-red-500" />
                </div>
                <div className="text-center space-y-1.5 md:space-y-2">
                  <h3 className="text-base md:text-lg font-medium text-stone-900">
                    Failed to load order
                  </h3>
                  <p className="text-xs md:text-sm text-stone-500 max-w-sm px-4">
                    {error.message ||
                      "Could not load order details. Please try again."}
                  </p>
                </div>
              </div>
            )}

            {/* Success State - Order Data */}
            {order && !isLoading && (
              <>
                {/* Status & Date */}
                <div className="grid grid-cols-2 gap-4 md:gap-6 lg:gap-8 border-b border-stone-100 pb-6 md:pb-8 lg:pb-10">
                  <div className="space-y-1">
                    <p className="tab_leading text-xs md:text-sm">Status</p>
                    <p
                      className={`px-2 w-max mb-2 md:mb-3 py-1.5 md:py-2 bg-neutral-900 text-[8px] md:text-[9px] uppercase tracking-[0.8px] md:tracking-[1px] font-semibold font-beatrice ${
                        statusColors[order.status]
                      }`}>
                      {order.status}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="tab_leading text-xs md:text-sm">Placed On</p>
                    <p className="text-xs md:text-sm text-stone-900">
                      {order.created_at && formatDateTime(order.created_at)}
                    </p>
                  </div>
                </div>

                {/* Items */}
                <div className="space-y-4 md:space-y-6">
                  <h3 className="tab_leading border-b border-stone-100 pb-3 md:pb-4 text-xs md:text-sm">
                    Product Summary
                  </h3>
                  <div className="space-y-6 md:space-y-8">
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between items-start gap-4 group">
                        <div className="space-y-1 md:space-y-1.5 flex-1 min-w-0">
                          <p className="text-xs md:text-sm text-stone-900 font-medium leading-snug">
                            {item.product_name}
                          </p>
                          <div className="flex flex-wrap gap-x-2 md:gap-x-3 gap-y-1 text-[9px] md:text-[10px] text-stone-500 uppercase tracking-wider">
                            <span>Qty: {item.quantity}</span>
                            {item.variant_size && (
                              <span>Size: {item.variant_size}</span>
                            )}
                            {item.variant_color && (
                              <span>Color: {item.variant_color}</span>
                            )}
                          </div>
                        </div>
                        <div className="text-right space-y-0.5 md:space-y-1 flex-shrink-0">
                          <p className="text-xs md:text-sm font-medium text-stone-900">
                            {formatCurrency(item.subtotal)}
                          </p>
                          <p className="text-[9px] md:text-[10px] text-stone-400 uppercase tracking-tight">
                            {formatCurrency(item.price)} / unit
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Shipping & Payment Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12 pt-2 md:pt-4">
                  {address && (
                    <div className="space-y-3 md:space-y-4">
                      <h3 className="tab_leading text-xs md:text-sm">
                        Ship To
                      </h3>
                      <div className="text-xs md:text-sm text-stone-600 leading-relaxed space-y-0.5">
                        <p className="text-stone-900 font-medium">
                          {address.first_name} {address.last_name}
                        </p>
                        <p className="tab_text">{address.street}</p>
                        <p className="tab_text">
                          {address.city}, {address.state} {address.zip}
                        </p>
                        <p className="tab_text">{address.country}</p>
                      </div>
                    </div>
                  )}

                  <div className="space-y-3 md:space-y-4">
                    <h3 className="tab_leading text-xs md:text-sm">
                      Financials
                    </h3>
                    <div className="space-y-1.5 md:space-y-2">
                      <div className="flex justify-between text-xs md:text-sm">
                        <span className="text-stone-600">Item price</span>
                        <span className="text-stone-900">
                          {formatCurrency(order.subtotal)}
                        </span>
                      </div>
                      <div className="flex justify-between text-xs md:text-sm">
                        <span className="text-stone-600">Tax</span>
                        <span className="text-stone-900">
                          {formatCurrency(order.tax)}
                        </span>
                      </div>
                      <div className="flex justify-between text-xs md:text-sm">
                        <span className="text-stone-600">Shipping</span>
                        <span className="text-stone-900">
                          {formatCurrency(order.shipping_cost)}
                        </span>
                      </div>

                      <div className="flex justify-between text-base md:text-lg font-beatrice-deck pt-1.5 md:pt-2 border-t border-stone-100">
                        <span className="text-stone-900">Total</span>
                        <span className="text-stone-900 font-medium">
                          {formatCurrency(order.total_amount)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 sm:p-6 md:p-8 bg-stone-50 border-t border-stone-100">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="w-full h-10 border-stone-900 text-stone-900 py-4 md:py-5 lg:py-6 hover:bg-stone-900 hover:text-white button text-xs md:text-sm">
              Back to History
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
