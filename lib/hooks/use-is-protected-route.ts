// hooks/use-is-protected-route.ts
"use client";

import { usePathname } from "next/navigation";

const PROTECTED_ROUTES = ["/profile", "/checkout", "/cart"];

export function useIsProtectedRoute() {
  const pathname = usePathname();

  return PROTECTED_ROUTES.some((route) => pathname.startsWith(route));
}
