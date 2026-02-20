export interface CreateUserOrderParams {
  payment_method_id: string;
  address_id: string;
  items: {
    product_id: string;
    quantity: number;
    variant_size: string;
    variant_color: string;
  }[];
  customer_notes?: string;
}

export interface CreateOrderResponse {
  order_number: string;
  order_id: string;
  total_amount: number;
}

export interface OrderDetailsResponse {
  id: string;
  user_id: string;
  order_number: string;
  payment_method_id: string;
  address_id: string;
  payment_method_type: string;
  address_snapshot: string; // JSON string, could be parsed further
  subtotal: number;
  tax: number;
  shipping_cost: number;
  discount: number;
  total_amount: number;
  status: string;
  customer_notes: string;
  created_at: string;
  updated_at: string;
  items: OrderItem[];
}

interface OrderItem {
  id: string;
  order_id: string;
  user_id: string;
  product_id: string;
  product_name: string;
  variant_size: string;
  variant_color: string;
  price: number;
  quantity: number;
  subtotal: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface AddressSnapshot {
  zip: string;
  city: string;
  label: string;
  phone: string;
  state: string;
  street: string;
  country: string;
  last_name: string;
  first_name: string;
}

export interface OrderResponse {
  id: string;
  order_number: string;
  status: OrderStatus;
  total_amount: number;
  item_count: number;
  created_at: Date;
}

export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "completed"
  | "cancelled";
