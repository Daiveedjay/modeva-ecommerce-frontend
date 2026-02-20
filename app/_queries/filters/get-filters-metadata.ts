// queries/use-get-filters-metadata.ts
import { apiClient, ApiError } from "@/app/_queries/api-client";
import { API_STORE_PREFIX } from "@/lib/constants";
import { ApiResponse } from "@/lib/types";
import { Availability, Category, PriceRange } from "@/lib/types/filters";
import { useQuery } from "@tanstack/react-query";

interface FilterMetadata {
  availability: Availability;
  categories: Category[];
  priceRange: PriceRange;
}

export async function getFiltersMetadata(
  signal?: AbortSignal,
): Promise<ApiResponse<FilterMetadata>> {
  const resp = await apiClient<FilterMetadata>(
    `${API_STORE_PREFIX}/filters/metadata`,
    {
      method: "get",
      signal,
    },
  );
  return resp;
}

export function useGetFiltersMetadata() {
  return useQuery<ApiResponse<FilterMetadata>, ApiError>({
    queryKey: ["filters-metadata"],
    queryFn: ({ signal }) => getFiltersMetadata(signal),
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
