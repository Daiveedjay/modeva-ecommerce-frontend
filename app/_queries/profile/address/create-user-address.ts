import { apiClient, ApiError } from "@/app/_queries/api-client";
import { API_USER_PREFIX } from "@/lib/constants";
import { ApiResponse } from "@/lib/types";
import { CreateUserAddressParams } from "@/lib/types/address";

import { toastError } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export async function createUserAddress(
  params: CreateUserAddressParams,
): Promise<ApiResponse<null>> {
  const url = `${API_USER_PREFIX}/addresses`;
  const resp = await apiClient<null, CreateUserAddressParams, undefined>(url, {
    method: "post",
    withCredentials: true,
    data: params,
  });
  return resp;
}

export function useCreateUserAddress() {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<null>, ApiError, CreateUserAddressParams>({
    mutationFn: createUserAddress,
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
        toastError(`Could not create address: ${error.message}`);
      }
    },
  });
}
