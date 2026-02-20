import MultiSelectFooter from "@/app/products/[product-slug]/[id]/_components/multi-select-footer";
import VariantSelectionArea from "@/app/products/[product-slug]/[id]/_components/variant-selection-area";
import type { VariantCombination } from "@/app/products/[product-slug]/[id]/_modals/multi-select-modal";
import { Product } from "@/lib/types/product";

export default function VariantSummaryPanel({
  total_items,
  allCombinations,
  product,
  handleClose,
  totals,
}: {
  total_items: number;
  allCombinations: VariantCombination[];
  product: Product;
  handleClose: () => void;
  totals: {
    total_items: number;
    total_price: number;
  };
}) {
  return (
    <div
      className="lg:w-95  flex flex-col bg-neutral-50/50 border-t lg:border-t-0 lg:border-l border-border/20
    lg:shrink-0 lg:h-auto flex-1 min-h-0 overflow-hidden">
      <div className="p-4   sm:p-6 md:p-8 lg:p-10 pb-4 sm:pb-5 md:pb-6 lg:pb-6 border-b border-border/20 backdrop-blur-md shrink-0">
        <h3 className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] font-black text-muted-foreground/60 mb-2">
          Order Summary
        </h3>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl sm:text-4xl md:text-5xl font-light">
            {total_items}
          </span>
          <span className="text-[9px] sm:text-[10px] text-muted-foreground font-bold uppercase tracking-[0.2em]">
            Items Selected
          </span>
        </div>
      </div>

      <VariantSelectionArea allCombinations={allCombinations} />
      <MultiSelectFooter
        product_id={product?.id}
        product_name={product?.name}
        image_url={product?.media.primary.url}
        total_items={totals.total_items}
        total_price={totals.total_price}
        onClose={handleClose}
      />
    </div>
  );
}
