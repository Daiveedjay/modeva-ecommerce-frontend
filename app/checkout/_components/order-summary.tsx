"use client";

import { useCartStore } from "@/app/cart/_hooks/use-cart-store";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { formatCurrency } from "@/lib/utils";
import { Truck } from "lucide-react";
import Image from "next/image";

export function OrderSummary() {
  const cart_items = useCartStore((s) => s.items);
  const items_cost = cart_items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping = items_cost * 0.05;
  const tax = items_cost * 0.1;

  const total = items_cost + shipping + tax;

  // console.log(cart_items)

  return (
    <div className="lg:col-span-4 bg-[#fafafa] p-6 md:p-12 lg:p-20 relative">
      <div className="sticky top-20">
        <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] mb-12 border-b border-[#eeeeee] pb-4">
          Your Selection
        </h2>
        <div className="space-y-8">
          {/* Item Preview */}
          {/* <div className="flex gap-6 group"> */}
          <Carousel
            opts={{
              align: "start",
              loop: false,
            }}
            className="w-full">
            <CarouselContent>
              {cart_items.map((item, index) => (
                <CarouselItem key={item.variant_key}>
                  <div className="flex gap-6 group">
                    <div className="w-24 h-28 bg-[#eeeeee] relative overflow-hidden shrink-0">
                      <Image
                        src={item.image_url}
                        className="aspect-square object-center"
                        fill
                        alt={item.product_name}
                      />
                    </div>
                    <div className="flex flex-col justify-between py-1 flex-1">
                      <div>
                        <h3 className="text-base font-medium tracking-tight mb-1">
                          {item.product_name}
                        </h3>
                        <p className="text-[9px] uppercase tracking-widest text-[#999999] font-bold">
                          {item.variant_key}
                        </p>
                        <p className="text-[9px] uppercase tracking-widest text-[#999999] font-bold">
                          Qty: {String(item.quantity).padStart(2, "0")}
                        </p>
                      </div>
                      <p className="text-sm font-bold">
                        $
                        {item.price.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                        })}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs p-2 text-[#999999] font-bold">
                    {index + 1} / {cart_items.length}
                  </span>
                </CarouselItem>
              ))}
            </CarouselContent>

            {cart_items.length > 1 && (
              <>
                <CarouselPrevious className="-left-10 rounded-none" />
                <CarouselNext className="-right-10 rounded-none" />
              </>
            )}
          </Carousel>
          {/* </div> */}

          <div className="space-y-6 pt-8 border-t border-[#eeeeee]">
            <div className="flex justify-between">
              <span className="text-[#999999] uppercase tracking-[0.2em] text-[10px] font-bold">
                Subtotal
              </span>
              <span className="text-sm font-medium">
                {formatCurrency(items_cost)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#999999] uppercase tracking-[0.2em] text-[10px] font-bold">
                Shipping
              </span>
              <span className="text-sm font-medium">
                {formatCurrency(shipping)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#999999] uppercase tracking-[0.2em] text-[10px] font-bold">
                Tax
              </span>
              <span className="text-sm font-medium">{formatCurrency(tax)}</span>
            </div>
            <div className="pt-6 border-t border-[#eeeeee]">
              <div className="flex justify-between items-end">
                <span className="font-bold uppercase tracking-[0.2em] text-[11px]">
                  Total Amount
                </span>
                <div className="text-right">
                  <span className="text-[9px] text-[#999999] block uppercase tracking-widest mb-1 font-bold">
                    USD
                  </span>
                  <span className="text-3xl font-medium tracking-tighter">
                    {formatCurrency(total)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-16 space-y-4">
            <div className="p-6 bg-white border border-[#eeeeee] flex items-center gap-4">
              <Truck className="w-5 h-5 text-[#1a1a1a]" />
              <p className="text-[9px] uppercase tracking-[0.2em] leading-loose font-bold">
                Complimentary White Glove Delivery Applied
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
