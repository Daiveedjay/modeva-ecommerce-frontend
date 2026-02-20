import { apiClient, ApiError } from "@/app/_queries/api-client";

import { API_USER_PREFIX } from "@/lib/constants";
import { ApiResponse } from "@/lib/types";
import { UpdateUserAddressParams } from "@/lib/types/address";

import { toastError } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export async function updateUserAddress(
  address_id: string,
  params: UpdateUserAddressParams,
): Promise<ApiResponse<null>> {
  const url = `${API_USER_PREFIX}/addresses/${address_id}`;
  const resp = await apiClient<null, UpdateUserAddressParams, undefined>(url, {
    method: "patch",
    withCredentials: true,
    data: params,
  });
  return resp;
}

export function useUpdateUserAddress(address_id: string) {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse<null>, ApiError, UpdateUserAddressParams>({
    mutationFn: (params) => updateUserAddress(address_id, params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-addresses"] });
    },
    onError: (error: ApiError) => {
      if (error.isCanceled) {
        // maybe ignore if canceled
        return;
      }
      if (error.statusCode === 400) {
        // validation error
        toastError(`Validation error: ${error.message}`);
      } else if (error.statusCode === 404) {
        // not found
        toastError(`Address not found: ${error.message}`);
      } else {
        // generic error
        toastError(`Could not update address: ${error.message}`);
      }
    },
  });
}
