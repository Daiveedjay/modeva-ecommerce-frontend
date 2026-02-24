"use client";

import { useGetProductById } from "@/app/_queries/products/get-product-by-id";
import MultiSelectHeader from "@/app/products/[product-slug]/[id]/_components/multi-select-header";
import VariantSelectionGrid from "@/app/products/[product-slug]/[id]/_components/variant-selection-grid";
import VariantSelectionList from "@/app/products/[product-slug]/[id]/_components/variant-selection-list";
import VariantSummaryPanel from "@/app/products/[product-slug]/[id]/_components/variant-summary-panel";
import { useMultiSelectStore } from "@/app/products/[product-slug]/[id]/_hooks/use-multi-select-store";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useParams } from "next/navigation";
import { useMemo } from "react";

export interface VariantCombination {
  combo: string[];
  variant_name: string;
  quantity: number;
  price: number;
  selected_qty: number;
}

interface MultiSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MultiSelectModal({ isOpen, onClose }: MultiSelectModalProps) {
  const { id } = useParams<{ id: string }>();
  const { data, error, isLoading, isPending, refetch } = useGetProductById(
    id,
    !!id,
  );

  const { getTotals, clearSelections } = useMultiSelectStore();

  const product = data?.data;

  const totals = getTotals();

  const { inventory, price, variants, name } = product || {};

  const allCombinations = useMemo<VariantCombination[]>(() => {
    return (
      inventory?.map((item) => ({
        combo: item.combo,
        variant_name: item.variant_name,
        quantity: item.quantity,
        price: price || 0,
        selected_qty: 0,
      })) || []
    );
  }, [inventory, price]);

  if (!product) return null;
  if (!inventory || price === undefined) return null;

  const handleClose = () => {
    clearSelections();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="w-[95vw] sm:w-[90vw] lg:w-[95vw] max-w-7xl max-h-[95dvh]! sm:max-h-[80dvh] h-[90vh] sm:h-[85vh] p-0 gap-0 bg-background border border-border/50 overflow-scroll flex rounded-none flex-col">
        <MultiSelectHeader
          name={name || "Product"}
          total_price={totals.total_price}
        />

        <div className="flex flex-col lg:flex-row flex-1 overflow-hidden min-h-0">
          <VariantSelectionGrid>
            <VariantSelectionList variants={variants} />
          </VariantSelectionGrid>

          <VariantSummaryPanel
            total_items={totals.total_items}
            allCombinations={allCombinations}
            product={product}
            handleClose={handleClose}
            totals={totals}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
