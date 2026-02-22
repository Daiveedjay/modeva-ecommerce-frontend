"use client";

import { useMultiSelectStore } from "@/app/products/[product-slug]/[id]/_hooks/use-multi-select-store";
import { useCartStore } from "@/app/cart/_hooks/use-cart-store";
import { Button } from "@/components/ui/button";
import { formatCurrency, toastSuccess } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

export default function MultiSelectFooter({
  product_id,
  product_name,
  image_url,
  total_items,
  total_price,
  onClose,
}: {
  product_id: string;
  product_name: string;
  image_url: string;
  total_items: number;
  total_price: number;
  onClose: () => void;
}) {
  const clearSelections = useMultiSelectStore((s) => s.clearSelections);
  const getCartPayload = useMultiSelectStore((s) => s.getCartPayload);
  const setItem = useCartStore((s) => s.setItem);

  const cartItems = useCartStore((s) => s.items);
  const removeFromCart = useCartStore((s) => s.removeFromCart);

  const handleConfirm = () => {
    const nextItems = getCartPayload({
      product_id,
      product_name,
      image_url,
    });

    const nextKeys = new Set(nextItems.map((i) => i.variant_key));

    cartItems.forEach((item) => {
      if (item.product_id === product_id && !nextKeys.has(item.variant_key)) {
        removeFromCart(item.variant_key, item.product_id);
      }
    });

    nextItems.forEach(setItem);
    toastSuccess(`${nextItems.length} items added to your shopping bag`);

    clearSelections();
    onClose();
  };

  return (
    <div
      className="
        bg-white border-t border-border/20 shrink-0
        px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-5 lg:px-10 lg:py-6

        sticky bottom-0 z-10
      ">
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Left: subtotal */}
        <div className="min-w-40">
          <div className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-muted-foreground/60 font-black">
            Subtotal
          </div>
          <div className="text-xl sm:text-2xl md:text-3xl lg:text-3xl font-light tracking-tighter tabular-nums">
            {formatCurrency(total_price)}
          </div>
        </div>

        {/* Right: actions */}
        <div className="ml-auto flex items-center gap-3">
          <Button
            disabled={total_items === 0}
            onClick={handleConfirm}
            className="
              h-10 sm:h-11 md:h-12
              bg-foreground text-background hover:bg-foreground/90
              rounded-none
              px-4 sm:px-5
              text-[10px] sm:text-[11px] uppercase tracking-[0.3em] font-black
              group transition-all
            ">
            Confirm Selection
            <ArrowRight className="ml-2 h-3 w-3 sm:h-3.5 sm:w-3.5 transition-transform group-hover:translate-x-1" />
          </Button>

          <button
            onClick={clearSelections}
            disabled={total_items === 0}
            className="
              text-[8px] sm:text-[9px]
              uppercase tracking-[0.35em] font-bold
              text-muted-foreground/50 hover:text-destructive
              hover:cursor-pointer transition-all
              disabled:opacity-40
              px-2 py-2
            ">
            Clear All
          </button>
        </div>
      </div>
    </div>
  );
}
