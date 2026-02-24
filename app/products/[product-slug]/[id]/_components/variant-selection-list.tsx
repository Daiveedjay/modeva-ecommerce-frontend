"use client";

import { useMultiSelectStore } from "@/app/products/[product-slug]/[id]/_hooks/use-multi-select-store";
import { Button } from "@/components/ui/button";
import { Variant } from "@/lib/types/product";
import { Minus, Plus } from "lucide-react";

export default function VariantSelectionList({
  variants,
}: {
  variants: Variant[] | undefined;
}) {
  const { updateQuantity, selected_variants, getFilteredCombinations } =
    useMultiSelectStore();

  const filteredCombinations = getFilteredCombinations();

  const getColorValue = (combo: string[]) => {
    const colorVariant = variants?.find(
      (v) => v.type.toLowerCase() === "color",
    );
    if (!colorVariant) return null;
    return combo.find((c) => colorVariant.options.includes(c));
  };

  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar">
      <div className="divide-y divide-border/10 pb-0">
        {filteredCombinations.length === 0 ? (
          <div className="py-16 sm:py-20 text-center text-muted-foreground text-[10px] uppercase tracking-widest">
            No matching variants found
          </div>
        ) : (
          filteredCombinations.map((combo) => {
            const selected_qty = selected_variants[combo.variant_name] || 0;
            const isOutOfStock = combo.quantity === 0;
            const color = getColorValue(combo.combo);

            return (
              <div
                key={combo.variant_name}
                className={`group px-4 sm:px-6 md:px-8 lg:px-10 py-4 sm:py-5 flex  sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0 transition-all ${
                  isOutOfStock ? "opacity-30 grayscale pointer-events-none" : ""
                } ${selected_qty > 0 ? "bg-accent/5" : ""}`}>
                <div className="flex items-start sm:items-center gap-3 sm:gap-4 md:gap-6 min-w-0 flex-1">
                  {color && (
                    <div
                      className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 border border-border/30 shrink-0"
                      style={{ backgroundColor: color.toLowerCase() }}
                    />
                  )}
                  <div className="space-y-1 min-w-0">
                    <h4 className="font-bold text-xs sm:text-base uppercase tracking-wider truncate leading-tight">
                      {combo.variant_name}
                    </h4>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-[9px] sm:text-[10px] text-muted-foreground/70 uppercase tracking-widest font-medium">
                      <span className="tabular-nums text-[10px] sm:text-xs font-normal text-foreground/80">
                        ${combo.price.toFixed(2)}
                      </span>
                      <span className="hidden sm:block w-1 h-1 rounded-full bg-border/40" />
                      <span
                        className={`text-[10px] sm:text-xs ${
                          combo.quantity < 10
                            ? "text-orange-600/70"
                            : " text-green-600"
                        }`}>
                        Stock: {combo.quantity}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center bg-white h-8 sm:h-9 md:h-10 transition-all focus-within:border-foreground shrink-0">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      updateQuantity(
                        combo.variant_name,
                        Math.max(0, selected_qty - 1),
                      )
                    }
                    disabled={selected_qty === 0}
                    className="h-full sm:w-8  rounded-none hover:bg-neutral-100 disabled:opacity-20">
                    <Minus className="h-2.5 sm:h-3 w-2.5 sm:w-3" />
                  </Button>
                  <div className="w-8 sm:w-10 md:w-12 text-center text-[10px] sm:text-xs md:text-sm font-bold tabular-nums">
                    {selected_qty}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      updateQuantity(
                        combo.variant_name,
                        Math.min(combo.quantity, selected_qty + 1),
                      )
                    }
                    disabled={selected_qty >= combo.quantity}
                    className="h-full sm:w-8  rounded-none hover:bg-neutral-100 disabled:opacity-20">
                    <Plus className="h-2.5 sm:h-3 w-2.5 sm:w-3" />
                  </Button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
