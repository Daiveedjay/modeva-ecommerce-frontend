// components/filters/ColorFilter.tsx
"use client";

import { FilterSection } from "@/app/products/_filters/components/filter-section";
import { useColorFilterStore } from "@/app/products/_filters/store/use-color-filter-store";

export function ColorFilter() {
  const {
    colors,
    selectedColors,
    isExpanded,
    toggleColor,
    clearColors,
    toggleExpanded,
  } = useColorFilterStore();

  const hasActiveFilters = selectedColors.length > 0;

  return (
    <FilterSection
      title="Colors"
      isExpanded={isExpanded}
      onToggle={toggleExpanded}
      onClear={clearColors}
      hasActiveFilters={hasActiveFilters}>
      <div className="flex flex-wrap gap-3">
        {colors.map((color) => {
          const isSelected = selectedColors.includes(color.name);

          return (
            <button
              key={color.name}
              onClick={() => toggleColor(color.name)}
              className={`w-10 h-10 border-2 transition-all
                active:scale-95 active:translate-y-px cursor-pointer
                ${
                  isSelected
                    ? "border-primary ring-2 ring-primary ring-offset-2"
                    : "border-border hover:border-primary"
                }`}
              style={{ backgroundColor: color.hex }}
              title={color.name}
              aria-label={`${isSelected ? "Deselect" : "Select"} ${color.name}`}
            />
          );
        })}
      </div>
    </FilterSection>
  );
}
