// components/auth/auth-required-modal.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { toastError, toastSuccess } from "@/lib/utils";

interface AuthRequiredModalProps {
  isOpen: boolean;
  onClose?: () => void;
}

export function AuthRequiredModal({ isOpen, onClose }: AuthRequiredModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleGoogleLogin = async () => {
    setIsLoading(true);

    try {
      const backendUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:8081";

      const width = 500;
      const height = 600;
      const left = window.screen.width / 2 - width / 2;
      const top = window.screen.height / 2 - height / 2;

      const popup = window.open(
        `${backendUrl}/api/v1/auth/google`,
        "Google Sign In",
        `width=${width},height=${height},left=${left},top=${top}`,
      );

      if (!popup) {
        toastError("Popup blocked", "Please allow popups for this site.");
        setIsLoading(false);
        return;
      }

      const allowedOrigins = [
        window.location.origin,
        new URL(backendUrl).origin,
      ];

      const handleMessage = async (event: MessageEvent) => {
        if (!allowedOrigins.includes(event.origin)) return;

        if (event.data?.type === "AUTH_SUCCESS") {
          window.removeEventListener("message", handleMessage);

          try {
            await queryClient.invalidateQueries({ queryKey: ["me"] });
            await queryClient.refetchQueries({ queryKey: ["me"] });

            const meData = queryClient.getQueryData(["me"]);

            if (!meData) {
              toastError("Account inactive", "Your account is not active.");
              setIsLoading(false);
              return;
            }

            toastSuccess("Welcome! You're now signed in.");
            router.refresh();
            setIsLoading(false);
            onClose?.();
          } catch {
            toastError("Authentication failed", "Please try again.");
            setIsLoading(false);
          }
          return;
        }
        if (event.data?.type === "AUTH_ERROR") {
          window.removeEventListener("message", handleMessage);
          const msg =
            event.data.error === "banned"
              ? "Your account has been suspended."
              : "Sign in failed. Please try again.";
          toastError("Authentication failed", msg);
          setIsLoading(false);
        }
      };

      window.addEventListener("message", handleMessage);

      setTimeout(
        () => {
          window.removeEventListener("message", handleMessage);
          setIsLoading(false);
        },
        5 * 60 * 1000,
      );
    } catch (error) {
      console.error("Login error:", error);
      toastError("Something went wrong", "Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose ? onClose : undefined}>
      <DialogContent
        className="sm:max-w-md tracking-[0] font-beatrice-deck"
        showCloseButton={!onClose}>
        <DialogHeader>
          <DialogTitle className="text-2xl tracking-[0.5px] font-semibold">
            Sign in required
          </DialogTitle>
          <DialogDescription className="text-base font-beatrice">
            {onClose
              ? "Please sign in to continue"
              : "You must sign in to access this page"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <Button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            size="lg"
            className="w-full h-12 text-sm font-normal tracking-wide bg-transparent border border-foreground/20 hover:bg-foreground hover:text-background transition-all duration-300"
            variant="outline">
            {isLoading ? (
              <span className="flex items-center gap-3">
                <svg
                  className="animate-spin size-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Connecting...
              </span>
            ) : (
              <span className="flex items-center gap-3">
                <GoogleIcon className="size-5" />
                Continue with Google
              </span>
            )}
          </Button>

          <div className="flex items-center justify-center gap-6 text-muted-foreground text-xs">
            <div className="flex items-center gap-2">
              <svg
                className="size-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                />
              </svg>
              <span>Secure</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="size-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                />
              </svg>
              <span>Private</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}
