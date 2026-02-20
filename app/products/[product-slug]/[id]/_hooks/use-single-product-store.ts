import { VariantSelection } from "@/lib/types/product";
import { create } from "zustand";

interface SingleProductState {
  variant_selections: VariantSelection;
  quantity: number;
  is_multi_select_open: boolean;

  setVariant: (type: string, value: string) => void;
  resetVariants: () => void;

  incrementQuantity: (max?: number) => void;
  decrementQuantity: () => void;
  setQuantity: (qty: number) => void;

  openMultiSelect: () => void;
  closeMultiSelect: () => void;

  reset: () => void;
}

export const useSingleProductStore = create<SingleProductState>((set) => ({
  variant_selections: {},
  quantity: 1,
  is_multi_select_open: false,

  setVariant: (type, value) =>
    set((state) => ({
      variant_selections: {
        ...state.variant_selections,
        [type]: value,
      },
    })),

  resetVariants: () =>
    set({
      variant_selections: {},
    }),

  incrementQuantity: (max) =>
    set((state) => {
      if (max && state.quantity >= max) return state;
      return { quantity: state.quantity + 1 };
    }),

  decrementQuantity: () =>
    set((state) => ({
      quantity: Math.max(1, state.quantity - 1),
    })),

  setQuantity: (qty) =>
    set({
      quantity: Math.max(1, qty),
    }),

  openMultiSelect: () =>
    set({
      is_multi_select_open: true,
    }),

  closeMultiSelect: () =>
    set({
      is_multi_select_open: false,
    }),

  reset: () =>
    set({
      variant_selections: {},
      quantity: 1,
      is_multi_select_open: false,
    }),
}));
