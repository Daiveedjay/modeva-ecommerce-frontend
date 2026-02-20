"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/app/cart/_hooks/use-cart-store";

export function RequireCartItems({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const itemsCount = useCartStore((s) => s.items.length);

  useEffect(() => {
    if (itemsCount === 0) router.replace("/cart");
  }, [itemsCount, router]);

  if (itemsCount === 0) return null;

  return <>{children}</>;
}
