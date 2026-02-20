"use client";

import NavBar from "@/app/_resuseables/nav-bar";
import CartTab from "@/app/cart/_components/cart-tab";
import CartTabControls from "@/app/cart/_components/cart-tab-controls";
import FavouritesTab from "@/app/cart/_components/favourites-tab";
import { useCartStore } from "@/app/cart/_hooks/use-cart-store";
import { Tabs } from "@/components/ui/tabs";
import { useSearchParams, useRouter } from "next/navigation";

export default function CartPage() {
  const cart_items = useCartStore((s) => s.items);

  const searchParams = useSearchParams();
  const router = useRouter();

  const initialTab =
    (searchParams.get("tab") as "cart" | "favourites") || "cart";

  const handleTabChange = (value: string) => {
    if (value !== "cart" && value !== "favourites") return;

    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.set("tab", value);
    router.replace(`${window.location.pathname}?${params.toString()}`);
  };
  return (
    <>
      {" "}
      <NavBar />
      <main className="min-h-screen pt-24 pb-40 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <header className="mb-16 space-y-4">
            <p className="text-xs uppercase tracking-[1px] font-black text-muted-foreground/60">
              Personal Collection
            </p>
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-beatrice-deck uppercase tracking-tighter">
              Your {initialTab === "cart" ? "Shopping bag" : "Favourites"}
            </h1>
          </header>

          <Tabs
            value={initialTab}
            onValueChange={handleTabChange}
            className="w-full">
            <CartTabControls
              activeTab={initialTab}
              setActiveTab={handleTabChange}
              cart_items_length={cart_items.length}
            />

            {/* ---------------- CART TAB ---------------- */}
            <CartTab />

            {/* ---------------- FAVORITES TAB ---------------- */}
            <FavouritesTab />
          </Tabs>
        </div>
      </main>
    </>
  );
}
