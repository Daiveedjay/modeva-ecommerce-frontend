// stores/filters/useColorFilterStore.ts
import { create } from "zustand";

export interface ColorOption {
  name: string;
  hex: string;
}

interface ColorFilterState {
  // Data
  colors: ColorOption[];
  selectedColors: string[];
  isExpanded: boolean;

  // Actions
  toggleColor: (colorName: string) => void;
  clearColors: () => void;
  setExpanded: (expanded: boolean) => void;
  toggleExpanded: () => void;
  setColors: (colors: ColorOption[]) => void;
  initializeFromUrl: (urlColors: string[]) => void;
}

export const useColorFilterStore = create<ColorFilterState>((set) => ({
  // Initial state
  colors: [
    { name: "Black", hex: "#000000" },
    { name: "White", hex: "#FFFFFF" },
    { name: "Gray", hex: "#808080" },
    { name: "Navy", hex: "#001F3F" },
    { name: "Red", hex: "#FF0000" },
    { name: "Blue", hex: "#0000FF" },
    { name: "Green", hex: "#00A36C" },
    { name: "Beige", hex: "#F5F5DC" },
  ],
  selectedColors: [],
  isExpanded: false,

  // Actions
  toggleColor: (colorName) =>
    set((state) => ({
      selectedColors: state.selectedColors.includes(colorName)
        ? state.selectedColors.filter((c) => c !== colorName)
        : [...state.selectedColors, colorName],
    })),

  clearColors: () => set({ selectedColors: [] }),

  setExpanded: (expanded) => set({ isExpanded: expanded }),

  toggleExpanded: () => set((state) => ({ isExpanded: !state.isExpanded })),

  setColors: (colors) => set({ colors }),

  initializeFromUrl: (urlColors: string[]) =>
    set({ selectedColors: urlColors }),
}));
