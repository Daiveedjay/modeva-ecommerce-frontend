import { create } from "zustand";

interface SizeFilterState {
  // Data
  sizes: string[];
  selectedSizes: string[];
  isExpanded: boolean;

  // Actions
  setSelectedSize: (size: string | null) => void;
  toggleSize: (size: string) => void;
  clearSize: () => void;
  setExpanded: (expanded: boolean) => void;
  toggleExpanded: () => void;
  initializeFromUrl: (urlSizes: string[]) => void; // Add this line
}

export const useSizeFilterStore = create<SizeFilterState>((set) => ({
  // Initial state
  sizes: ["XS", "S", "M", "L", "XL", "2XL"],
  selectedSizes: [],
  isExpanded: true,

  // Actions
  // Add a size to the selection
  setSelectedSize: (size) => {
    if (size === null) {
      set({ selectedSizes: [] });
      return;
    }

    set((state) => ({
      selectedSizes: state.selectedSizes.includes(size)
        ? state.selectedSizes.filter((s) => s !== size)
        : [...state.selectedSizes, size],
    }));
  },

  // Toggle size on/off
  toggleSize: (size) =>
    set((state) => ({
      selectedSizes: state.selectedSizes.includes(size)
        ? state.selectedSizes.filter((s) => s !== size)
        : [...state.selectedSizes, size],
    })),

  clearSize: () => set({ selectedSizes: [] }),

  setExpanded: (expanded) => set({ isExpanded: expanded }),

  toggleExpanded: () => set((state) => ({ isExpanded: !state.isExpanded })),

  // Add this method
  initializeFromUrl: (urlSizes) => set({ selectedSizes: urlSizes }),
}));
