import { apiClient, ApiError } from "@/app/_queries/api-client";
import { API_USER_PREFIX } from "@/lib/constants";
import { ApiResponse } from "@/lib/types";
import { toastError } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export async function deleteUserAddress(
  address_id: string
): Promise<ApiResponse<null>> {
  const url = `${API_USER_PREFIX}/addresses/${address_id}`;
  const resp = await apiClient<null, string, undefined>(url, {
    method: "delete",
    withCredentials: true,
  });
  return resp;
}

export function useDeleteUserAddress() {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse<null>, ApiError, string>({
    mutationFn: deleteUserAddress,
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
        toastError(`Could not delete address: ${error.message}`);
      }
    },
  });
}
