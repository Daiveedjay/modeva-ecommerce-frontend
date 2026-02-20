// components/filters/SizeFilter.tsx
"use client";

import { FilterSection } from "@/app/products/_filters/components/filter-section";
import { useSizeFilterStore } from "@/app/products/_filters/store/use-size-filter-store";

export function SizeFilter() {
  const {
    sizes,
    selectedSizes,
    isExpanded,
    toggleSize,
    clearSize,
    toggleExpanded,
  } = useSizeFilterStore();
  const selectedSize = selectedSizes.length > 0 ? selectedSizes[0] : null;

  return (
    <FilterSection
      title="Size"
      isExpanded={isExpanded}
      onToggle={toggleExpanded}
      onClear={clearSize}
      hasActiveFilters={!!selectedSize}>
      <div className="flex flex-wrap gap-2">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => toggleSize(size)}
            className={`w-10 h-10 border text-sm font-medium transition-all
              active:scale-95 active:translate-y-px cursor-pointer
              ${
                selectedSizes.includes(size)
                  ? "border-primary bg-foreground text-primary-foreground"
                  : "border-border hover:border-primary hover:bg-muted"
              }`}>
            {size}
          </button>
        ))}
      </div>
    </FilterSection>
  );
}
