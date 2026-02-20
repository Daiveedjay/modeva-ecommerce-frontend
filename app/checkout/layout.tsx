"use client";

// ✅ Simplest solution: Remove the guard entirely from layout
// Let individual pages handle their own requirements

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
