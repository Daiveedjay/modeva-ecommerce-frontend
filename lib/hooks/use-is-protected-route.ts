// hooks/use-is-protected-route.ts
"use client";

import { usePathname } from "next/navigation";

const PROTECTED_ROUTES = ["/profile", "/checkout", "/cart"];
const EXCLUDED_ROUTES = ["/auth-popup"];

export function useIsProtectedRoute() {
  const pathname = usePathname();

  if (EXCLUDED_ROUTES.some((route) => pathname.startsWith(route))) {
    return false;
  }

  return PROTECTED_ROUTES.some((route) => pathname.startsWith(route));
}
