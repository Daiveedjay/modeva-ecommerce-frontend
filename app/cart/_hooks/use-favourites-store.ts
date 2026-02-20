import { create } from "zustand";

export interface FavouriteItem {
  product_id: string;
  product_name: string;
  price: number;
  image_url: string;
}

interface FavouritesState {
  items: FavouriteItem[];

  addFavourite: (item: FavouriteItem) => void;
  removeFavourite: (product_id: string) => void;
  clearFavourites: () => void;
}

export const useFavouritesStore = create<FavouritesState>((set) => ({
  items: [],
  addFavourite: (item) =>
    set((state) => {
      if (state.items.find((i) => i.product_id === item.product_id)) {
        return state; // already in favourites
      }
      return { items: [...state.items, item] };
    }),
  removeFavourite: (product_id) =>
    set((state) => ({
      items: state.items.filter((i) => i.product_id !== product_id),
    })),
  clearFavourites: () => set({ items: [] }),
}));
