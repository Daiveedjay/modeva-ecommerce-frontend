"use client";

import { useEffect } from "react";

export default function AuthPopupPage() {
  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return;

    // Check if this is a popup
    if (!window.opener) {
      console.error("❌ Not opened as popup");
      return;
    }

    console.log("✅ Popup detected, processing auth...");

    // Log all cookies for debugging
    console.log("🍪 All cookies:", document.cookie);

    // Read user_data cookie
    const cookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("user_data="));

    console.log("🔍 Found user_data cookie:", cookie);

    if (cookie) {
      try {
        const encodedUserData = cookie.split("=")[1];
        console.log("📦 Encoded data:", encodedUserData);

        // Decode the URL-encoded string
        const decodedUserData = decodeURIComponent(encodedUserData);
        console.log("📝 Decoded data:", decodedUserData);

        // Parse JSON
        const user = JSON.parse(decodedUserData);
        console.log("✅ Parsed user:", user);

        // Send to parent window
        window.opener.postMessage(
          {
            type: "AUTH_SUCCESS",
            user: user,
          },
          window.location.origin,
        );

        console.log("✅ Message sent to parent");

        // Clear the temporary cookie
        document.cookie =
          "user_data=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

        // Close popup after short delay
        setTimeout(() => {
          console.log("✅ Closing popup...");
          window.close();
        }, 300);
      } catch (e) {
        console.error("❌ Failed to parse user data:", e);
        console.error("❌ Error details:", {
          message: e instanceof Error ? e.message : "Unknown error",
          cookie: cookie,
        });

        window.opener.postMessage(
          {
            type: "AUTH_ERROR",
            error: "parse_failed",
          },
          window.location.origin,
        );

        setTimeout(() => window.close(), 500);
      }
    } else {
      // Cookie not readable (cross-port locally or cross-origin in production)
      // Parent will refetch /user/me via invalidateQueries on AUTH_SUCCESS anyway
      console.log("⚠️ No user_data cookie found - using fallback AUTH_SUCCESS");

      window.opener.postMessage(
        { type: "AUTH_SUCCESS", user: null },
        window.location.origin,
      );

      setTimeout(() => window.close(), 300);
    }
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="text-center space-y-4">
        {/* Spinner */}
        <div className="relative w-12 h-12 mx-auto">
          <div className="absolute inset-0 border-4 border-border rounded-full" />
          <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>

        <div className="space-y-2">
          <p className="text-lg font-medium text-foreground">
            Completing sign in...
          </p>
          <p className="text-sm text-muted-foreground">
            This window will close automatically
          </p>
        </div>
      </div>
    </div>
  );
}
