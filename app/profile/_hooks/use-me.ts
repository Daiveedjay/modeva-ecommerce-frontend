// app/_queries/user/me.ts
import { apiClient } from "@/app/_queries/api-client";
import { useQuery } from "@tanstack/react-query";

export type MeUser = {
  id: string;
  email: string;
  phone: string;
  name: string;
  provider: string;
  email_verified: boolean;
  avatar?: string;
  created_at: string;
};

export function useMe() {
  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const resp = await apiClient<MeUser>("/user/me", {
        method: "get",
        withCredentials: true,
      });
      return resp.data;
    },
    retry: false,
    refetchOnWindowFocus: true,
    staleTime: 60 * 60 * 1000, // 1 hr
    // Fail silently - don't throw errors to error boundaries
    throwOnError: false,
  });
}
