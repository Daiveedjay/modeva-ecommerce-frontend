import { apiClient, ApiError } from "@/app/_queries/api-client";
import { API_USER_PREFIX } from "@/lib/constants";
import { ApiResponse } from "@/lib/types";
import { PaymentMethodResponse } from "@/lib/types/payment";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

// Core fetch
export async function getUserPaymentMethods(
  signal?: AbortSignal,
): Promise<ApiResponse<PaymentMethodResponse[]>> {
  const url = `${API_USER_PREFIX}/payment-methods`;
  const resp = await apiClient<PaymentMethodResponse[], never, undefined>(url, {
    method: "get",
    signal,
    withCredentials: true,
  });
  return resp;
}

// Hook
export function useGetUserPaymentMethods(options?: { enabled?: boolean }) {
  return useQuery<ApiResponse<PaymentMethodResponse[]>, ApiError>({
    queryKey: ["user-payment-methods"],
    queryFn: ({ signal }) => getUserPaymentMethods(signal),
    enabled: options?.enabled ?? true,
    // refetchOnMount: false,
    // staleTime: 1000 * 60 * 5, // 5 minutes
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
