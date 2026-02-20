import { apiClient, ApiError } from "@/app/_queries/api-client";

import { API_STORE_PREFIX } from "@/lib/constants";

import { ApiResponse } from "@/lib/types";
import { Product } from "@/lib/types/product";
import { useQuery } from "@tanstack/react-query";

export async function getProductById(
  productId: string,
  signal?: AbortSignal,
): Promise<ApiResponse<Product>> {
  const resp = await apiClient<Product>(
    `${API_STORE_PREFIX}/products/${productId}`,
    {
      method: "get",
      signal,
    },
  );
  return resp;
}

export function useGetProductById(productId: string, enabled = false) {
  return useQuery<ApiResponse<Product>, ApiError>({
    queryKey: ["storefront-product", productId],
    queryFn: ({ signal }) => getProductById(productId, signal),
    enabled,
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
