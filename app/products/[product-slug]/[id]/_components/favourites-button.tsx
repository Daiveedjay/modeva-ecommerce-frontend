//

"use client";

import { useFavouritesStore } from "@/app/cart/_hooks/use-favourites-store";
import { Button } from "@/components/ui/button";
import { slugify, toastSuccess } from "@/lib/utils";
import { Heart } from "lucide-react";
import { useState } from "react";

export default function FavouritesButton({
  product_id,
  product_name,
  price,
  image_url,
}: {
  product_id: string;
  product_name: string;
  price: number;
  image_url: string;
}) {
  const { items, addFavourite, removeFavourite } = useFavouritesStore();
  const isWishlisted = items.some((item) => item.product_id === product_id);

  const handleToggleWishlist = () => {
    if (isWishlisted) {
      removeFavourite(product_id);
      toastSuccess("Removed from favourites!");
    } else {
      addFavourite({
        product_id,
        product_name: slugify(product_name),
        price,
        image_url,
      });
      toastSuccess("Added to favourites!");
    }
  };
  return (
    <div className="absolute top-4 right-4   z-5">
      <Button
        size="sm"
        onClick={handleToggleWishlist}
        className="w-10 h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 p-0 text-foreground rounded-none bg-background border border-border hover:bg-background/80 transition-all active:scale-95">
        <Heart
          strokeWidth={1.5}
          size={16}
          className="md:w-5 md:h-5 lg:w-5 lg:h-5 -rotate-[41.78deg] transition-all"
          fill={isWishlisted ? "currentColor" : "none"}
        />
      </Button>
    </div>
  );
}
