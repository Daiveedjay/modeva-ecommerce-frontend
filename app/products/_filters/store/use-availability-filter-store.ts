// stores/filters/useAvailabilityFilterStore.ts
import { create } from "zustand";

interface AvailabilityFilterState {
  inStock: boolean;
  outOfStock: boolean;

  isExpanded: boolean;

  setInStock: (checked: boolean) => void;
  setOutOfStock: (checked: boolean) => void;
  clearAvailability: () => void;
  setExpanded: (expanded: boolean) => void;
  toggleExpanded: () => void;

  // 👇 updated signature
  initializeFromUrl: (availability: "inStock" | "outOfStock" | null) => void;
}

export const useAvailabilityFilterStore = create<AvailabilityFilterState>(
  (set) => ({
    inStock: false,
    outOfStock: false,
    isExpanded: true,

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

    // 👇 this now clears automatically when null
    initializeFromUrl: (availability: "inStock" | "outOfStock" | null) =>
      set({
        inStock: availability === "inStock",
        outOfStock: availability === "outOfStock",
      }),
  }),
);
