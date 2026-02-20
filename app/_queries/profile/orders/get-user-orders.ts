import { apiClient, ApiError } from "@/app/_queries/api-client";
import { API_USER_PREFIX } from "@/lib/constants";
import { ApiResponse } from "@/lib/types";
import { OrderResponse } from "@/lib/types/order";
import { SharedQueryParams } from "@/lib/utils";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export async function getUserOrders(
  page: number,
  limit: number,
  signal?: AbortSignal,
): Promise<ApiResponse<OrderResponse[]>> {
  const params: SharedQueryParams = { page, limit };
  const url = `${API_USER_PREFIX}/orders`;
  const resp = await apiClient<OrderResponse[], never, SharedQueryParams>(url, {
    method: "get",
    params,
    signal,
    withCredentials: true,
  });
  return resp;
}

export function useGetUserOrders(
  page = 1,
  limit = 5,
  options?: { enabled?: boolean },
) {
  return useQuery<ApiResponse<OrderResponse[]>, ApiError>({
    queryKey: ["user-orders", page, limit],
    queryFn: ({ signal }) => getUserOrders(page, limit, signal),
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
