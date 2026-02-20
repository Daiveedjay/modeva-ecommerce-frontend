"use client";

import Link from "next/link";
import { Heart, ShoppingBag, Menu, Box, Home } from "lucide-react";

import Logo from "@/app/_resuseables/logo";
import { useCartStore } from "@/app/cart/_hooks/use-cart-store";
import UserAvatar from "@/components/reuseables/user-avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useFavouritesStore } from "@/app/cart/_hooks/use-favourites-store";

export default function NavBar() {
  const cartItems = useCartStore((s) => s.items);
  const itemsLength = useFavouritesStore((s) => s.items.length);

  return (
    <header className="sticky top-0 z-10 backdrop-blur-[10px]">
      <div className="flex items-center justify-between py-4 md:py-8 page_spacing">
        {/* Desktop links */}
        <ul className="hidden md:flex gap-8 items-center list-none">
          <Link className="tab_actions text-[12px]!" href="/">
            Home
          </Link>
          <Link className="tab_actions text-[12px]!" href="/products">
            Products
          </Link>
        </ul>

        {/* Mobile menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <button
                aria-label="Open menu"
                className="p-2 cursor-pointer hover:bg-primary transition">
                <Menu size={24} />
              </button>
            </SheetTrigger>

            <SheetContent side="left" className="bg-background px-5 pt-6 pb-8">
              <nav className="flex mt-10 flex-col h-full">
                {/* Primary navigation */}
                <div className="space-y-3">
                  <Link
                    href="/"
                    className="flex items-center gap-3 px-4 py-3 text-sm font-semibold hover:bg-muted transition uppercase tracking-[0.5px]">
                    <Home size={18} />
                    Home
                  </Link>

                  <Link
                    href="/products"
                    className="flex items-center gap-3 px-4 py-3 text-sm font-semibold hover:bg-muted transition uppercase tracking-[0.5px]">
                    <Box size={18} />
                    Products
                  </Link>

                  <Link
                    href="/cart"
                    className="flex items-center gap-3 px-4 py-3 text-sm font-semibold hover:bg-muted transition uppercase tracking-[0.5px]">
                    <ShoppingBag size={18} />
                    Cart
                  </Link>
                  <Link
                    href="/cart?tab=favourites"
                    className="flex items-center relative gap-3 px-4 py-3 text-sm font-semibold hover:bg-muted transition uppercase tracking-[0.5px]">
                    <Heart size={18} />
                    Favourites
                    {itemsLength > 0 && (
                      <span className="ml-auto text-emerald-600 absolute font-bold tab_leading text-xs">
                        [{itemsLength}]
                      </span>
                    )}
                  </Link>
                </div>

                {/* Categories */}
                <div className="mt-10 space-y-4">
                  <p className="px-4 text-base font-medium text-muted-foreground uppercase tracking-widest">
                    Categories
                  </p>

                  <div className="space-y-2">
                    <Link
                      href="/men"
                      className="block px-4 py-2.5 text-sm hover:bg-muted transition tab_leading text-foreground!">
                      Men
                    </Link>
                    <Link
                      href="/women"
                      className="block px-4 py-2.5 text-sm hover:bg-muted transition tab_leading text-foreground!">
                      Women
                    </Link>
                    <Link
                      href="/kids"
                      className="block px-4 py-2.5 text-sm hover:bg-muted transition tab_leading text-foreground!">
                      Kids
                    </Link>
                  </div>
                </div>

                {/* Account */}
                <div className="mt-auto pt-6 border-t">
                  <Link
                    href="/profile"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted transition">
                    <UserAvatar />
                    <div className="leading-tight">
                      <p className="text-sm uppercase font-medium">Account</p>
                      <p className="text-xs text-muted-foreground">
                        Profile & orders
                      </p>
                    </div>
                  </Link>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        {/* Logo */}
        <Logo className="h-8 w-8 md:h-10 md:w-10 lg:h-16 lg:w-16" />

        {/* Actions */}
        <div className="flex items-center gap-4 md:gap-10">
          {/* Favourites – desktop only */}
          <Link
            href="/cart?tab=favourites"
            className="hidden md:flex relative transition-transform hover:-translate-y-1 bg-foreground p-4 rounded-full">
            <Heart
              strokeWidth={2}
              size={20}
              className="text-background -rotate-[41.78deg]"
            />
            {itemsLength > 0 && (
              <span className="ml-auto top-1 right-1 text-emerald-600! absolute font-bold tab_leading text-xs">
                [{itemsLength}]
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link href="/cart" className="relative flex items-center">
            {/* Desktop pill */}
            <div className="hidden md:flex px-6 py-4 bg-foreground rounded-[22px] text-xs text-background">
              <p className="tab_actions space-x-2">
                <span>Cart</span>
                <span className="text-emerald-600 font-bold">
                  [{cartItems.length}]
                </span>
              </p>
            </div>

            {/* Icon */}
            <div className="relative md:-translate-x-1 rounded-full p-1.5 sm:p-3 border-foreground border-4">
              <ShoppingBag
                strokeWidth={1.5}
                size={16}
                className="text-foreground"
              />

              {/* Mobile count badge */}
              {cartItems.length > 0 && (
                <span className="md:hidden absolute -top-1.5 -right-1.5 bg-emerald-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {cartItems.length}
                </span>
              )}
            </div>
          </Link>

          <UserAvatar />
        </div>
      </div>
    </header>
  );
}
