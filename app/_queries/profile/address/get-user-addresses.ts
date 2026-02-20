import { apiClient, ApiError } from "@/app/_queries/api-client";
import { API_USER_PREFIX } from "@/lib/constants";
import { ApiResponse } from "@/lib/types";
import { AddressResponse } from "@/lib/types/address";

import { keepPreviousData, useQuery } from "@tanstack/react-query";

export async function getUserAddresses(
  signal?: AbortSignal,
): Promise<ApiResponse<AddressResponse[]>> {
  const url = `${API_USER_PREFIX}/addresses`;
  const resp = await apiClient<AddressResponse[], never, undefined>(url, {
    method: "get",
    signal,
    withCredentials: true,
  });
  return resp;
}

export function useGetUserAddresses(options?: { enabled?: boolean }) {
  return useQuery<ApiResponse<AddressResponse[]>, ApiError>({
    queryKey: ["user-addresses"],
    queryFn: ({ signal }) => getUserAddresses(signal),
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
