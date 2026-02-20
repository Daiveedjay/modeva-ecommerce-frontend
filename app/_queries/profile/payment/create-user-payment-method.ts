import { apiClient, ApiError } from "@/app/_queries/api-client";
import { API_USER_PREFIX } from "@/lib/constants";
import { ApiResponse } from "@/lib/types";
import { CreatePaymentMethodRequest } from "@/lib/types/payment";
import { toastError } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export async function createUserPaymentMethod(
  data: CreatePaymentMethodRequest,
): Promise<ApiResponse<{ id: string }>> {
  const url = `${API_USER_PREFIX}/payment-methods`;
  const resp = await apiClient<
    { id: string },
    CreatePaymentMethodRequest,
    undefined
  >(url, {
    method: "post",
    withCredentials: true,
    data: data,
  });
  return resp;
}

export function useCreateUserPaymentMethod() {
  const queryClient = useQueryClient();

  return useMutation<
    ApiResponse<{ id: string }>,
    ApiError,
    CreatePaymentMethodRequest
  >({
    mutationFn: createUserPaymentMethod,
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
