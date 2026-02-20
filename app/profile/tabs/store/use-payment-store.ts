import { create } from "zustand";

interface PaymentModalStore {
  addPaymentModal: boolean;
  openAddPaymentModal: (modal: boolean) => void;
  closeAddPaymentModal: () => void;
}

export const usePaymentModalStore = create<PaymentModalStore>((set) => ({
  addPaymentModal: false,
  openAddPaymentModal: (addPaymentModal) => {
    set({ addPaymentModal });
  },
  closeAddPaymentModal: () => {
    set({ addPaymentModal: false });
  },
}));
