import { create } from "zustand";

interface AddressModalStore {
  addAddressModal: boolean;
  openAddAddressModal: (modal: boolean) => void;
  closeAddAddressModal: () => void;

  updateAddressModal: boolean;
  openUpdateAddressModal: (modal: boolean) => void;
  closeUpdateAddressModal: () => void;
}

export const useAddressModalStore = create<AddressModalStore>((set) => ({
  addAddressModal: false,
  openAddAddressModal: (addAddressModal) => {
    set({ addAddressModal });
  },
  closeAddAddressModal: () => {
    set({ addAddressModal: false });
  },

  updateAddressModal: false,
  openUpdateAddressModal: (updateAddressModal) => {
    set({ updateAddressModal });
  },
  closeUpdateAddressModal: () => {
    set({ updateAddressModal: false });
  },
}));
