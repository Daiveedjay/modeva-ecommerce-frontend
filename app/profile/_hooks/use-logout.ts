// app/profile/_hooks/use-logout.ts
// - calls backend logout
// - clears the ["me"] query immediately so the UI updates everywhere
// - allows caller to pass an onDone callback (eg router.push("/"))

import { API_ENDPOINT } from "@/lib/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type UseLogoutOptions = {
  onDone?: () => void;
};

export function useLogout(options?: UseLogoutOptions) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      // If this fails, we still clear local state in onSettled
      await fetch(`${API_ENDPOINT}auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    },
    onSettled: async () => {
      // Always clear client auth state, even if server logout errors
      queryClient.setQueryData(["me"], null);
      await queryClient.invalidateQueries({ queryKey: ["me"] });
      options?.onDone?.();
    },
  });
}
