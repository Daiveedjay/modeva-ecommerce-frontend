import { apiClient, ApiError } from "@/app/_queries/api-client";
import { API_USER_PREFIX } from "@/lib/constants";
import { ApiResponse } from "@/lib/types";
import { UpdateUserAddressParams } from "@/lib/types/address";

import { toastError } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export async function setDefaultUserAddress(params: {
  address_id: string;
}): Promise<ApiResponse<null>> {
  const url = `${API_USER_PREFIX}/addresses/${params.address_id}/default`;
  const resp = await apiClient<null, { address_id: string }, undefined>(url, {
    method: "patch",
    withCredentials: true,
  });
  return resp;
}

export function useSetDefaultUserAddress() {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse<null>, ApiError, { address_id: string }>({
    mutationFn: setDefaultUserAddress,
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
      } else if (error.statusCode === 409) {
        // conflict, e.g. duplicate name
        toastError(`Conflict: ${error.message}`);
      } else {
        // generic error
        toastError(`Could not set default address: ${error.message}`);
      }
    },
  });
}
