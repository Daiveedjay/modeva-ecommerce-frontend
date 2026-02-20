// components/auth/protected-route.tsx
"use client";

import { useMe } from "@/app/profile/_hooks/use-me";
import { AuthRequiredModal } from "@/components/auth/auth-required-modal";
import { useIsProtectedRoute } from "@/lib/hooks/use-is-protected-route";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isProtectedRoute = useIsProtectedRoute();
  const { data: user, isLoading, error } = useMe();

  // Only enforce auth on protected routes
  if (!isProtectedRoute) {
    return <>{children}</>;
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-foreground" />
      </div>
    );
  }

  // Auth failed on protected route - show UNCLOSEABLE modal
  if (!user || error) {
    return (
      <AuthRequiredModal
        isOpen={true}
        // No onClose prop = uncloseable
      />
    );
  }

  // Authenticated - show content
  return <>{children}</>;
}
