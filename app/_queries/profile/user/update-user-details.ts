import { apiClient, ApiError } from "@/app/_queries/api-client";
import { MeUser } from "@/app/profile/_hooks/use-me";
import { API_USER_PREFIX } from "@/lib/constants";
import { ApiResponse } from "@/lib/types";
import { UpdateUserDetailsParams } from "@/lib/types/profile";
import { toastError } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export async function updateUserDetails(
  params: UpdateUserDetailsParams,
): Promise<ApiResponse<MeUser>> {
  const url = `${API_USER_PREFIX}/`; // e.g. "/user"
  const resp = await apiClient<MeUser, UpdateUserDetailsParams, undefined>(
    url,
    {
      method: "patch",
      withCredentials: true,
      data: params,
    },
  );
  return resp;
}

export function useUpdateUserDetails() {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<MeUser>, ApiError, UpdateUserDetailsParams>({
    mutationFn: (params) => updateUserDetails(params),

    onSuccess: (resp) => {
      // keep /me in sync after an update
      if (resp.data) {
        queryClient.setQueryData(["me"], resp.data);
      }
      queryClient.invalidateQueries({ queryKey: ["me"] });
      queryClient.invalidateQueries({ queryKey: ["user-overview"] });
    },

    onError: (error: ApiError) => {
      if (error.isCanceled) return;

      if (error.statusCode === 400) {
        toastError(`Validation error: ${error.message}`);
      } else if (error.statusCode === 401) {
        toastError("Session expired. Please sign in again.");
      } else if (error.statusCode === 403) {
        toastError(`Not allowed: ${error.message}`);
      } else {
        toastError(`Could not update profile: ${error.message}`);
      }
    },
  });
}
