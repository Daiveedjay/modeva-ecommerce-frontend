// Address
export interface CreateUserAddressParams {
  label: string;
  first_name: string;
  last_name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone?: string;
  is_default: boolean;
}

export interface AddressResponse {
  id: string;
  label: string;
  first_name: string;
  last_name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone?: string;
  is_default: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface UpdateUserAddressParams {
  address_id: string;
}

export interface UpdateUserAddressParams extends Omit<
  CreateUserAddressParams,
  "is_default"
> {}
