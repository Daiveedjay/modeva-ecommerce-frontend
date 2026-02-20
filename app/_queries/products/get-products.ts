"use client";

import { apiClient, ApiError } from "@/app/_queries/api-client";
import { API_STORE_PREFIX } from "@/lib/constants";
import { ApiResponse } from "@/lib/types";
import { ProductFilters, ProductResponse } from "@/lib/types/product";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

// ────────────────────────────────────────────────────────────
// Core fetch function
// ────────────────────────────────────────────────────────────
export async function getProducts(
  filters: ProductFilters = {},
  signal?: AbortSignal,
): Promise<ApiResponse<ProductResponse[]>> {
  const {
    page = 1,
    limit = 10,
    q,
    sizes,
    categories,
    subcategories,
    availability,
    minPrice,
    maxPrice,
    sortBy,
    colors,
    sortOrder,
    style,
  } = filters;

  const params = new URLSearchParams();

  // Pagination (always included)
  params.set("page", String(page));
  params.set("limit", String(limit));

  // Search
  if (q) {
    params.set("q", q);
  }

  // Sizes (multi)
  sizes?.forEach((size) => {
    if (size) params.append("size", size);
  });

  // Categories (multi)
  categories?.forEach((id) => {
    if (id) params.append("category", id);
  });

  // Subcategories (multi)
  subcategories?.forEach((id) => {
    if (id) params.append("subcategory", id);
  });

  // Availability
  if (availability) {
    params.set("availability", availability);
  }
  // Colors (multi)
  colors?.forEach((color) => {
    if (color) params.append("color", color);
  });

  // Price range
  if (typeof minPrice === "number") {
    params.set("minPrice", String(minPrice));
  }
  if (typeof maxPrice === "number") {
    params.set("maxPrice", String(maxPrice));
  }

  if (style) {
    params.set("style", style);
  }

  // Sorting
  if (sortBy) {
    params.set("sortBy", sortBy);
  }
  if (sortOrder) {
    params.set("sortOrder", sortOrder);
  }

  const url = `${API_STORE_PREFIX}/products?${params.toString()}`;

  const resp = await apiClient<ProductResponse[], never, undefined>(url, {
    method: "get",
    signal,
  });

  return resp;
}

// ────────────────────────────────────────────────────────────
// Base hook (use this directly if you want full control)
// ────────────────────────────────────────────────────────────
export function useGetProducts(
  filters: ProductFilters = {},
  options?: { enabled?: boolean },
) {
  return useQuery<ApiResponse<ProductResponse[]>, ApiError>({
    queryKey: ["storefront-products", filters],
    queryFn: ({ signal }) => getProducts(filters, signal),
    enabled: options?.enabled ?? true,
    placeholderData: keepPreviousData,
    meta: { showGlobalError: false },
    retry: (failureCount, error) => {
      if (error.isCanceled) return false;
      if (
        error.statusCode &&
        error.statusCode >= 400 &&
        error.statusCode < 500
      ) {
        return false;
      }
      return failureCount < 3;
    },
  });
}

// ────────────────────────────────────────────────────────────
// URL-based hook (automatically reads from searchParams)
// ────────────────────────────────────────────────────────────
export function useProductsFromUrl() {
  const searchParams = useSearchParams();

  const filters: ProductFilters = {
    // Read from URL params (not from props!)
    page: Number(searchParams.get("page") ?? "1"),
    limit: Number(searchParams.get("limit") ?? "10"),
    q: searchParams.get("q") ?? undefined,
    sizes: searchParams.getAll("size"),
    categories: searchParams.getAll("category"),
    subcategories: searchParams.getAll("subcategory"),
    style: searchParams.get("style") ?? undefined, // Add this line
    availability: searchParams.get(
      "availability",
    ) as ProductFilters["availability"],
    colors: searchParams.getAll("color"),
    minPrice: searchParams.get("minPrice")
      ? Number(searchParams.get("minPrice"))
      : undefined,
    maxPrice: searchParams.get("maxPrice")
      ? Number(searchParams.get("maxPrice"))
      : undefined,
    sortBy: searchParams.get("sortBy") as ProductFilters["sortBy"],
    sortOrder: searchParams.get("sortOrder") as ProductFilters["sortOrder"],
  };

  return useGetProducts(filters);
}
