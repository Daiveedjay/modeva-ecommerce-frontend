import { apiClient, ApiError } from "@/app/_queries/api-client";
import { API_USER_PREFIX } from "@/lib/constants";
import { ApiResponse } from "@/lib/types";
import { CreateOrderResponse, CreateUserOrderParams } from "@/lib/types/order";
import { toastError } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export async function createUserOrder(
  params: CreateUserOrderParams,
): Promise<ApiResponse<CreateOrderResponse>> {
  const url = `${API_USER_PREFIX}/orders`;
  const resp = await apiClient<
    CreateOrderResponse,
    CreateUserOrderParams,
    undefined
  >(url, {
    method: "post",
    withCredentials: true,
    data: params,
  });
  return resp;
}

export function useCreateUserOrder() {
  const queryClient = useQueryClient();

  return useMutation<
    ApiResponse<CreateOrderResponse>,
    ApiError,
    CreateUserOrderParams
  >({
    mutationFn: createUserOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-orders"] });
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
        toastError(`Could not create order: ${error.message}`);
      }
    },
  });
}
