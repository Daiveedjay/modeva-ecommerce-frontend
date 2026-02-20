// stores/filters/useFilterStore.ts
import { useAvailabilityFilterStore } from "@/app/products/_filters/store/use-availability-filter-store";
import {
  Category,
  useCategoryFilterStore,
} from "@/app/products/_filters/store/use-category-filter-store";
import { useColorFilterStore } from "@/app/products/_filters/store/use-color-filter-store";
import { usePriceRangeFilterStore } from "@/app/products/_filters/store/use-price-range-filter";
import { useSizeFilterStore } from "@/app/products/_filters/store/use-size-filter-store";
import { create } from "zustand";

interface ActiveFilter {
  type: string;
  value: string;
  label: string;
  onRemove: () => void;
}

interface FilterStore {
  activeFilters: ActiveFilter[];
  hasActiveFilters: boolean;
  activeFilterCount: number;

  clearAllFilters: () => void;
  updateActiveFilters: (categories?: Category[]) => void;
}

export const useFilterStore = create<FilterStore>((set, get) => {
  const recompute = () => get().updateActiveFilters();

  // subscribe to underlying stores
  useSizeFilterStore.subscribe(recompute);
  useAvailabilityFilterStore.subscribe(recompute);
  useCategoryFilterStore.subscribe(recompute);
  useColorFilterStore.subscribe(recompute);
  usePriceRangeFilterStore.subscribe(recompute);

  return {
    activeFilters: [],
    hasActiveFilters: false,
    activeFilterCount: 0,

    clearAllFilters: () => {
      useSizeFilterStore.getState().clearSize();
      useAvailabilityFilterStore.getState().clearAvailability();
      useCategoryFilterStore.getState().clearCategories();
      useColorFilterStore.getState().clearColors();
      usePriceRangeFilterStore.getState().clearPriceRange();
    },

    updateActiveFilters: (categories = []) => {
      const filters: ActiveFilter[] = [];

      // Sizes
      const sizes = useSizeFilterStore.getState().selectedSizes;
      sizes.forEach((size) => {
        filters.push({
          type: "size",
          label: size,
          value: size,
          onRemove: () => useSizeFilterStore.getState().toggleSize(size),
        });
      });

      // Availability
      const { inStock, outOfStock } = useAvailabilityFilterStore.getState();
      if (inStock) {
        filters.push({
          type: "availability",
          label: "In Stock",
          value: "inStock",
          onRemove: () =>
            useAvailabilityFilterStore.getState().setInStock(false),
        });
      }
      if (outOfStock) {
        filters.push({
          type: "availability",
          label: "Out of Stock",
          value: "outOfStock",
          onRemove: () =>
            useAvailabilityFilterStore.getState().setOutOfStock(false),
        });
      }

      // Categories - use NAME for URL
      const { selectedCategories, selectedSubcategories } =
        useCategoryFilterStore.getState();

      selectedCategories.forEach((catId) => {
        const category = categories.find((c) => c.id === catId);
        if (category) {
          filters.push({
            type: "category",
            label: category.name,
            value: category.name, // ✅ Changed from category.id to category.name
            onRemove: () =>
              useCategoryFilterStore
                .getState()
                .toggleCategory(catId, category.subcategories),
          });
        }
      });

      // Subcategories - use ID for URL
      selectedSubcategories.forEach((sub) => {
        filters.push({
          type: "subcategory",
          label: `${sub.parentName} → ${sub.name}`,
          value: sub.id, // ✅ Already correct - using ID
          onRemove: () =>
            useCategoryFilterStore
              .getState()
              .toggleSubcategory(
                sub.id,
                sub.name,
                sub.parentId,
                sub.parentName
              ),
        });
      });

      // Colors
      const { selectedColors } = useColorFilterStore.getState();
      selectedColors.forEach((color) => {
        filters.push({
          type: "color",
          label: color,
          value: color,
          onRemove: () => useColorFilterStore.getState().toggleColor(color),
        });
      });

      // Price range – single chip, separate min/max in value
      const { minPrice, maxPrice } = usePriceRangeFilterStore.getState();
      if (minPrice !== null || maxPrice !== null) {
        const minLabel = minPrice !== null ? `$${minPrice}` : "Any";
        const maxLabel = maxPrice !== null ? `$${maxPrice}` : "Any";

        filters.push({
          type: "price",
          label: `${minLabel} - ${maxLabel}`,
          // encode both so we can parse in ActiveFilters
          value: `${minPrice ?? ""}-${maxPrice ?? ""}`,
          onRemove: () => usePriceRangeFilterStore.getState().clearPriceRange(),
        });
      }

      set({
        activeFilters: filters,
        hasActiveFilters: filters.length > 0,
        activeFilterCount: filters.length,
      });
    },
  };
});