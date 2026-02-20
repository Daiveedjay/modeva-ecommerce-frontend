import { apiClient, ApiError } from "@/app/_queries/api-client";
import { API_USER_PREFIX } from "@/lib/constants";
import { ApiResponse } from "@/lib/types";
import { OrderDetailsResponse } from "@/lib/types/order";
import { useQuery } from "@tanstack/react-query";

export async function getUserOrderDetails(
  orderId: string,
  signal?: AbortSignal,
): Promise<ApiResponse<OrderDetailsResponse>> {
  const url = `${API_USER_PREFIX}/orders/${orderId}`;
  const resp = await apiClient<OrderDetailsResponse, never, undefined>(url, {
    method: "get",
    signal,
    withCredentials: true,
  });
  return resp;
}

export function useGetUserOrderDetails(
  orderId: string,
  { enabled = true }: { enabled?: boolean } = {},
) {
  return useQuery<ApiResponse<OrderDetailsResponse>, ApiError>({
    queryKey: ["user-order-details", orderId],
    queryFn: ({ signal }) => getUserOrderDetails(orderId, signal),

    enabled,
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
