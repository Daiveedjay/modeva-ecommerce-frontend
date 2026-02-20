// stores/filters/useAvailabilityFilterStore.ts
import { create } from "zustand";

interface AvailabilityFilterState {
  // Data
  inStock: boolean;
  outOfStock: boolean;

  isExpanded: boolean;

  // Actions
  setInStock: (checked: boolean) => void;
  setOutOfStock: (checked: boolean) => void;
  clearAvailability: () => void;
  setExpanded: (expanded: boolean) => void;
  toggleExpanded: () => void;
  initializeFromUrl: (availability: "inStock" | "outOfStock") => void;
}

export const useAvailabilityFilterStore = create<AvailabilityFilterState>(
  (set) => ({
    // Initial state
    inStock: false,
    outOfStock: false,
    isExpanded: true,

    // Actions
    setInStock: (checked) =>
      set((state) => ({
        inStock: checked,
        outOfStock: checked ? false : state.outOfStock,
      })),

    setOutOfStock: (checked) =>
      set((state) => ({
        outOfStock: checked,
        inStock: checked ? false : state.inStock,
      })),

    clearAvailability: () =>
      set({
        inStock: false,
        outOfStock: false,
      }),

    setExpanded: (expanded) => set({ isExpanded: expanded }),

    toggleExpanded: () => set((state) => ({ isExpanded: !state.isExpanded })),

    initializeFromUrl: (availability: "inStock" | "outOfStock") =>
      set({
        inStock: availability === "inStock",
        outOfStock: availability === "outOfStock",
      }),
  })
);
