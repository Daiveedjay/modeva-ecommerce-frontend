// app/profile/_hooks/use-logout.ts
import { API_ENDPOINT } from "@/lib/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type UseLogoutOptions = {
  onDone?: () => void;
};

export function useLogout(options?: UseLogoutOptions) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await fetch(`${API_ENDPOINT}auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    },
    onMutate: async () => {
      // Navigate immediately before server responds
      // so user never sees the auth modal flash
      options?.onDone?.();
    },
    onSettled: async () => {
      // Clean up auth state after navigation
      queryClient.setQueryData(["me"], null);
      await queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
}
