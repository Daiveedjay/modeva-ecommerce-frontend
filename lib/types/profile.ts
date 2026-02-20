import { OrderStatus } from "@/lib/types/order";

export interface UserOverviewResponse {
  profile: UserProfile;
  total_purchases: number;
  total_orders: number;
  completed_orders: number;
  loyalty_points: number;
  recent_orders: RecentOrder[];
}

export interface UserProfile {
  id: string; // UUID
  name: string;
  email: string;
  avatar: string;
  phone: string | null;
  joined_at: string; // ISO 8601
}

export interface RecentOrder {
  id: string;
  order_number: string;
  total_amount: number;
  status: OrderStatus;
  created_at: string;
}

export type UpdateUserDetailsParams = {
  name: string;
  phone: string | null;
};
