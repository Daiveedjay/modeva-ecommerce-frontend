import { apiClient, ApiError } from "@/app/_queries/api-client";
import { API_USER_PREFIX } from "@/lib/constants";
import { ApiResponse } from "@/lib/types";
import { UserOverviewResponse } from "@/lib/types/profile";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export async function getUserOverview(
  signal?: AbortSignal,
): Promise<ApiResponse<UserOverviewResponse>> {
  const url = `${API_USER_PREFIX}/overview`;
  const resp = await apiClient<UserOverviewResponse, never, undefined>(url, {
    method: "get",
    signal,
    withCredentials: true,
  });
  return resp;
}

export function useGetUserOverview(options?: { enabled?: boolean }) {
  return useQuery<ApiResponse<UserOverviewResponse>, ApiError>({
    queryKey: ["user-overview"],
    queryFn: ({ signal }) => getUserOverview(signal),
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
