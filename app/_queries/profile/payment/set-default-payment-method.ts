import { apiClient, ApiError } from "@/app/_queries/api-client";
import { API_USER_PREFIX } from "@/lib/constants";
import { ApiResponse } from "@/lib/types";
import { toastError } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export async function setDefaultPaymentMethod(
  payment_method_id: string
): Promise<ApiResponse<null>> {
  const url = `${API_USER_PREFIX}/payment-methods/${payment_method_id}/default`;
  const resp = await apiClient<null, string, undefined>(url, {
    method: "patch",
    withCredentials: true,
  });
  return resp;
}
export function useSetDefaultPaymentMethod() {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse<null>, ApiError, string>({
    mutationFn: setDefaultPaymentMethod,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-payment-methods"] });
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
        toastError(`Could not add payment method: ${error.message}`);
      }
    },
  });
}
