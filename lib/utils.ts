import { OrderDetailsResponse } from "@/lib/types/order";
import { clsx, type ClassValue } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// utils/slugify.ts
export function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-") // replace non-alphanumeric with -
    .replace(/^-+|-+$/g, ""); // remove leading/trailing dashes
}

export function formatDateTime(date: string | Date): string {
  const d = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  };
  return d.toLocaleDateString(undefined, options);
}

export function formatCurrency(
  amount: number,
  currency: string = "USD",
): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
}

export const statusColors: Record<OrderDetailsResponse["status"], string> = {
  pending: "bg-ring text-secondary border-yellow-300",
  processing: "bg-yellow-500 text-background border-blue-300",
  shipped: "bg-white border border-border text-foreground ",
  completed: "bg-chart-2! text-background ",
  cancelled: "bg-chart-1 text-background",
};

export function toastWarn(title: string, description?: string) {
  return toast.warning(title, {
    position: "top-right",
    closeButton: true,
    description,
    style: {
      "--normal-bg":
        "light-dark(var(--color-amber-600), var(--color-amber-400))",
      "--normal-text": "var(--color-white)",
      "--normal-border":
        "light-dark(var(--color-amber-600), var(--color-amber-400))",
    } as React.CSSProperties,
  });
}

export function toastError(title: string, description?: string) {
  return toast.error(title, {
    position: "top-right",
    closeButton: true,
    description,
    style: {
      "--normal-bg": "var(--color-red-600)",
      "--normal-text": "var(--color-white)",
      "--normal-border": "var(--color-red-600)",
    } as React.CSSProperties,
  });
}

export function toastSuccess(title: string, description?: string) {
  return toast.success(title, {
    position: "top-right",
    closeButton: true,
    description,
    style: {
      "--normal-bg": "var(--color-green-600)",
      "--normal-text": "var(--color-white)",
      "--normal-border": "var(--color-green-600)",
    } as React.CSSProperties,
  });
}

export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "completed"
  | "cancelled";

export const getOrderStatusVariant = (status: OrderStatus) => {
  switch (status) {
    case "completed":
      return "success";
    case "processing":
      return "secondary";
    case "shipped":
      return "outline";
    case "pending":
      return "ghost";
    case "cancelled":
      return "destructive";
    default:
      return "secondary";
  }
};

export interface SharedQueryParams {
  page: number;
  limit: number;
}
