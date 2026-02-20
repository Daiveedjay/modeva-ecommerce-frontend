import { create } from "zustand";

interface AddressFormData {
  id: string;
  label: string;
  first_name: string;
  last_name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
  is_default: boolean;
}

interface AddressFormStore {
  formData: AddressFormData;
  setLabel: (label: string) => void;
  setFirstName: (name: string) => void;
  setLastName: (name: string) => void;
  setStreet: (street: string) => void;
  setCity: (city: string) => void;
  setState: (state: string) => void;
  setZip: (zip: string) => void;
  setCountry: (country: string) => void;
  setPhone: (phone: string) => void;
  setIsDefault: (isDefault: boolean) => void;
  loadAddress: (address: Partial<AddressFormData>) => void;
  resetForm: () => void;
  isFormValid: () => boolean;
  getPayload: () => Record<string, any>;
}

const initialFormData: AddressFormData = {
  id: "",
  label: "Home",
  first_name: "",
  last_name: "",
  street: "",
  city: "",
  state: "",
  zip: "",
  country: "",
  phone: "",
  is_default: false,
};

export const useUserAddressStore = create<AddressFormStore>((set, get) => ({
  formData: initialFormData,

  setLabel: (label) =>
    set((state) => ({
      formData: { ...state.formData, label },
    })),

  setFirstName: (first_name) =>
    set((state) => ({
      formData: { ...state.formData, first_name },
    })),

  setLastName: (last_name) =>
    set((state) => ({
      formData: { ...state.formData, last_name },
    })),

  setStreet: (street) =>
    set((state) => ({
      formData: { ...state.formData, street },
    })),

  setCity: (city) =>
    set((state) => ({
      formData: { ...state.formData, city },
    })),

  setState: (newState) =>
    set((state) => ({
      formData: { ...state.formData, state: newState },
    })),

  setZip: (zip) =>
    set((state) => ({
      formData: { ...state.formData, zip },
    })),

  setCountry: (country) =>
    set((state) => ({
      formData: { ...state.formData, country, state: "", city: "" },
    })),

  setPhone: (phone) =>
    set((state) => ({
      formData: { ...state.formData, phone },
    })),

  setIsDefault: (is_default) =>
    set((state) => ({
      formData: { ...state.formData, is_default },
    })),

  loadAddress: (address) =>
    set((state) => ({
      formData: { ...state.formData, ...address },
    })),

  resetForm: () => set({ formData: initialFormData }),

  isFormValid: () => {
    const { formData } = get();
    return (
      formData.first_name.trim().length > 0 &&
      formData.last_name.trim().length > 0 &&
      formData.street.trim().length > 0 &&
      formData.city.trim().length > 0 &&
      formData.state.trim().length > 0 &&
      formData.zip.trim().length > 0 &&
      formData.country.trim().length > 0
    );
  },

  getPayload: () => {
    const { formData } = get();
    return {
      label: formData.label,
      first_name: formData.first_name,
      last_name: formData.last_name,
      street: formData.street,
      city: formData.city,
      state: formData.state,
      zip: formData.zip,
      country: formData.country,
      is_default: formData.is_default,
      ...(formData.phone.trim() && { phone: formData.phone.trim() }),
    };
  },
}));
