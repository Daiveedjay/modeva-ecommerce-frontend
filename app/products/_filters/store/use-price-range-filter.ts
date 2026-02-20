// stores/filters/usePriceRangeFilterStore.ts
import { create } from "zustand";

interface PriceRangeFilterState {
  // Selected values only (what user has chosen)
  minPrice: number | null; // null = no lower bound set
  maxPrice: number | null; // null = no upper bound set
  isExpanded: boolean;

  // Actions
  setMinPrice: (value: number | null) => void;
  setMaxPrice: (value: number | null) => void;
  setRange: (range: [number, number]) => void; // convenient for slider
  clearPriceRange: () => void;
  setExpanded: (expanded: boolean) => void;
  toggleExpanded: () => void;
  initializeFromUrl: (min: number | null, max: number | null) => void;
}

export const usePriceRangeFilterStore = create<PriceRangeFilterState>(
  (set) => ({
    // Initial state - no filter applied
    minPrice: null,
    maxPrice: null,
    isExpanded: false,

    setMinPrice: (value) => set({ minPrice: value }),
    setMaxPrice: (value) => set({ maxPrice: value }),

    // Slider convenience
    setRange: ([min, max]) => set({ minPrice: min, maxPrice: max }),

    clearPriceRange: () => set({ minPrice: null, maxPrice: null }),

    setExpanded: (expanded) => set({ isExpanded: expanded }),

    toggleExpanded: () => set((state) => ({ isExpanded: !state.isExpanded })),

    // Example for price range store
    initializeFromUrl: (min: number | null, max: number | null) =>
      set({ minPrice: min, maxPrice: max }),
  })
);
