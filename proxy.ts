import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function proxy(request: NextRequest) {
  const authToken = request.cookies.get("auth_token");
  const { pathname } = request.nextUrl;

  // Define protected routes
  const protectedRoutes = ["/profile", "/checkout", "/cart"];

  // Check if the current path is a protected route
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // If accessing a protected route without auth, add header to show modal
  if (isProtectedRoute && !authToken) {
    console.log(`🔒 Protected route accessed without auth: ${pathname}`);

    // Let the page load, but add a header to trigger auth modal
    const response = NextResponse.next();
    response.headers.set("x-auth-required", "true");
    return response;
  }

  // If accessing login page with valid auth token, redirect to profile
  if (pathname === "/login" && authToken) {
    console.log("✅ Already authenticated, redirecting to profile");
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\..*|api|auth-popup).*)",
  ],
};
