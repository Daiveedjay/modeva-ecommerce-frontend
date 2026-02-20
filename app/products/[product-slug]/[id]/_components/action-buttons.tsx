"use client";

import {
  createVariantKey,
  useCartStore,
} from "@/app/cart/_hooks/use-cart-store";
import { useMultiSelectStore } from "@/app/products/[product-slug]/[id]/_hooks/use-multi-select-store";
import { useSingleProductStore } from "@/app/products/[product-slug]/[id]/_hooks/use-single-product-store";

import { Button } from "@/components/ui/button";
import { InventoryItem, VariantSelection } from "@/lib/types/product";
import { toastSuccess } from "@/lib/utils";
import { CopyPlus, ShoppingCart } from "lucide-react";

export default function ActionButtons({
  inventory,
  price,
  product_id,
  product_name,
  product_image,
  allVariantsSelected,
  stockStatus,
}: {
  inventory: InventoryItem[];
  price: number;
  product_id: string;
  product_name: string;
  product_image: string;
  allVariantsSelected: boolean;
  stockStatus: { inStock: boolean; quantity: number };
}) {
  const setInventory = useMultiSelectStore((s) => s.setInventory);
  const hydrateFromCart = useMultiSelectStore((s) => s.hydrateFromCart);

  const { variant_selections, quantity, openMultiSelect, reset } =
    useSingleProductStore();

  const addItem = useCartStore((s) => s.addItem);
  const cart_items = useCartStore((s) => s.items);

  function normaliseValue(v: unknown) {
    return String(v ?? "")
      .trim()
      .toLowerCase()
      .replace(/\s*\/\s*/g, "-")
      .replace(/\s*-\s*/g, "-");
  }

  function resolveInventoryVariant(
    selections: Record<string, unknown>,
    inventory: InventoryItem[],
  ) {
    const selected = Object.values(selections)
      .map(normaliseValue)
      .sort()
      .join("|");

    return inventory.find((inv) => {
      const invKey = inv.combo.map(normaliseValue).sort().join("|");
      return invKey === selected;
    });
  }

  const handleAddToCart = () => {
    if (quantity <= 0) return;

    const rawSelections = variant_selections as Record<string, unknown>;

    const matched = resolveInventoryVariant(rawSelections, inventory);

    const variantName =
      matched?.variant_name ?? Object.values(rawSelections).join("-");

    const canonicalSelections = { variant: variantName };
    const variant_key = createVariantKey(canonicalSelections);

    addItem({
      product_id,
      product_name,
      price,
      quantity,
      max_quantity: matched?.quantity ?? stockStatus.quantity,
      variant_selections: canonicalSelections as unknown as VariantSelection,
      variant_key,
      image_url: product_image,
    });

    toastSuccess(`${product_name} added to your shopping bag`);
  };

  const handleMultiSelectOpen = () => {
    reset();
    setInventory(inventory, price);
    hydrateFromCart(cart_items, product_id);
    openMultiSelect();
  };

  return (
    <div className="flex flex-col gap-2 pt-4">
      <Button
        size="lg"
        disabled={!allVariantsSelected || !stockStatus.inStock}
        onClick={handleAddToCart}
        className="w-full text-xs sm:text-[11px] bg-foreground text-background rounded-none py-2 sm:py-3 gap-2 disabled:opacity-50 disabled:cursor-not-allowed h-12 sm:h-14 hover:bg-foreground/90 uppercase tracking-[0.2em] sm:tracking-[0.3em] font-black group transition-all">
        {!allVariantsSelected
          ? "SELECT OPTIONS"
          : !stockStatus.inStock
            ? "OUT OF STOCK"
            : "ADD TO CART"}
        <ShoppingCart className="ml-2 sm:ml-3 h-3 w-3 sm:h-3.5 sm:w-3.5 transition-transform group-hover:translate-x-1" />
      </Button>

      <Button
        variant="outline"
        onClick={handleMultiSelectOpen}
        className="w-full text-xs sm:text-[11px] rounded-none py-2 sm:py-3 gap-2 h-12 sm:h-14 hover:bg-foreground/90 uppercase tracking-[0.2em] sm:tracking-[0.3em] font-black group transition-all bg-transparent">
        MULTI SELECT
        <CopyPlus className="ml-2 sm:ml-3 h-3 w-3 sm:h-3.5 sm:w-3.5 transition-transform group-hover:translate-x-1" />
      </Button>
    </div>
  );
}
