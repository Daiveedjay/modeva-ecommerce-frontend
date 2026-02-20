import { CartItem, createVariantKey } from "@/app/cart/_hooks/use-cart-store";
import { VariantSelection } from "@/lib/types/product";
import { create } from "zustand";

interface InventoryItem {
  combo: string[];
  quantity: number;
  variant_name: string;
}

interface VariantCombination extends InventoryItem {
  price: number;
}

interface MultiSelectState {
  // filters
  search_query: string;
  show_only_available: boolean;

  // selections
  selected_variants: Record<string, number>;

  // derived data cache
  combinations: VariantCombination[];

  // setters
  setSearchQuery: (value: string) => void;
  setShowOnlyAvailable: (value: boolean) => void;

  // inventory lifecycle
  setInventory: (inventory: InventoryItem[], price: number) => void;

  // actions
  updateQuantity: (variant_name: string, quantity: number) => void;
  clearSelections: () => void;

  // selectors
  getFilteredCombinations: () => VariantCombination[];
  getTotals: () => { total_items: number; total_price: number };

  hydrateFromCart: (cartItems: CartItem[], product_id: string) => void;

  getCartPayload: (params: {
    product_id: string;
    product_name: string;
    image_url: string;
  }) => CartItem[];

  reset: () => void;
}

export const useMultiSelectStore = create<MultiSelectState>((set, get) => ({
  search_query: "",
  show_only_available: false,
  selected_variants: {},
  combinations: [],

  setSearchQuery: (value) => set({ search_query: value }),
  setShowOnlyAvailable: (value) => set({ show_only_available: value }),

  setInventory: (inventory, price) =>
    set({
      combinations: inventory.map((item) => ({
        ...item,
        price,
      })),
    }),

  updateQuantity: (variant_name, quantity) =>
    set((state) => {
      const next = { ...state.selected_variants };

      if (quantity === 0) {
        delete next[variant_name];
      } else {
        next[variant_name] = quantity;
      }

      return { selected_variants: next };
    }),

  clearSelections: () => set({ selected_variants: {} }),

  getFilteredCombinations: () => {
    const { combinations, search_query, show_only_available } = get();

    return combinations.filter((combo) => {
      const matches_search = combo.variant_name
        .toLowerCase()
        .includes(search_query.toLowerCase());

      const matches_availability = !show_only_available || combo.quantity > 0;

      return matches_search && matches_availability;
    });
  },

  getTotals: () => {
    const { selected_variants, combinations } = get();

    const total_items = Object.values(selected_variants).reduce(
      (sum, qty) => sum + qty,
      0,
    );

    const total_price = Object.entries(selected_variants).reduce(
      (sum, [variant_name, qty]) => {
        const combo = combinations.find((c) => c.variant_name === variant_name);
        return sum + (combo?.price ?? 0) * qty;
      },
      0,
    );

    return { total_items, total_price };
  },
  hydrateFromCart: (cartItems, product_id) =>
    set((state) => {
      // if (Object.keys(state.selected_variants).length > 0) {
      //   return {};
      // }

      const next: Record<string, number> = {};

      cartItems.forEach((item) => {
        if (item.product_id !== product_id) return;

        const variantName = item.variant_selections?.variant;
        if (!variantName) return;

        next[variantName] = item.quantity;
      });

      return { selected_variants: next };
    }),

  getCartPayload: ({ product_id, product_name, image_url }) => {
    const { selected_variants, combinations } = get();

    return Object.entries(selected_variants)
      .map(([variant_name, quantity]) => {
        const combo = combinations.find((c) => c.variant_name === variant_name);
        if (!combo) return null;

        const selections = normaliseSelections({ variant: variant_name });
        const variant_key = createVariantKey(selections);

        return {
          product_id,
          product_name,
          image_url,
          price: combo.price,
          quantity,
          max_quantity: combo.quantity,
          variant_selections: selections as unknown as VariantSelection,
          variant_key,
        };
      })
      .filter(Boolean) as CartItem[];
  },

  // Add to useMultiSelectStore
  reset: () =>
    set({
      search_query: "",
      show_only_available: false,
      selected_variants: {},
      combinations: [],
    }),
}));

export function normaliseSelections(
  selections: Record<string, unknown>,
): Record<string, string> {
  return Object.fromEntries(
    Object.entries(selections)
      .filter(([, v]) => v !== null && v !== undefined)
      .map(([k, v]) => [k.trim().toLowerCase(), String(v).trim()]),
  );
}

export function createVariantKeyFromSelections(selections: VariantSelection) {
  return createVariantKey(normaliseSelections(selections));
}
