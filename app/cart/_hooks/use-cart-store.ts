import { VariantSelection } from "@/lib/types/product";
import { create } from "zustand";

export interface CartItem {
  product_id: string;
  product_name: string;
  price: number;
  quantity: number;
  max_quantity: number; // stock ceiling
  variant_selections: VariantSelection;
  variant_key: string;
  image_url: string;
}

interface CartState {
  items: CartItem[];

  // incremental (single add)
  addItem: (item: CartItem) => void;

  // authoritative (multi-select confirm)
  setItem: (item: CartItem) => void;

  removeFromCart: (variant_key: string, product_id: string) => void;
  incrementItem: (variant_key: string, product_id: string) => void;
  decrementItem: (variant_key: string, product_id: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],

  addItem: (item) =>
    set((state) => {
      const existing = state.items.find(
        (i) =>
          i.variant_key === item.variant_key &&
          i.product_id === item.product_id,
      );

      if (existing) {
        return {
          items: state.items.map((i) =>
            i.variant_key === item.variant_key &&
            i.product_id === item.product_id
              ? {
                  ...i,
                  quantity: Math.min(
                    i.quantity + item.quantity,
                    i.max_quantity,
                  ),
                }
              : i,
          ),
        };
      }

      return { items: [...state.items, item] };
    }),

  setItem: (item) =>
    set((state) => {
      const existing = state.items.find(
        (i) =>
          i.variant_key === item.variant_key &&
          i.product_id === item.product_id,
      );

      if (existing) {
        return {
          items: state.items.map((i) =>
            i.variant_key === item.variant_key &&
            i.product_id === item.product_id
              ? { ...i, quantity: Math.min(item.quantity, i.max_quantity) }
              : i,
          ),
        };
      }

      return { items: [...state.items, item] };
    }),

  removeFromCart: (variant_key, product_id) =>
    set((state) => ({
      items: state.items.filter(
        (i) => !(i.variant_key === variant_key && i.product_id === product_id),
      ),
    })),

  incrementItem: (variant_key, product_id) =>
    set((state) => ({
      items: state.items.map((i) =>
        i.variant_key === variant_key && i.product_id === product_id
          ? { ...i, quantity: Math.min(i.quantity + 1, i.max_quantity) }
          : i,
      ),
    })),

  decrementItem: (variant_key, product_id) =>
    set((state) => ({
      items: state.items
        .map((i) =>
          i.variant_key === variant_key && i.product_id === product_id
            ? { ...i, quantity: i.quantity - 1 }
            : i,
        )
        .filter((i) => i.quantity > 0),
    })),

  clearCart: () => set({ items: [] }),
}));

/* ------------------ helpers ------------------ */

export function createVariantKey(selections: Record<string, string>) {
  return Object.entries(selections)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}:${value}`)
    .join("|");
}
