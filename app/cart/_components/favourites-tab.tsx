"use client";

import { useFavouritesStore } from "@/app/cart/_hooks/use-favourites-store";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
} from "@/components/ui/empty";
import { TabsContent } from "@/components/ui/tabs";
import { formatCurrency } from "@/lib/utils";
import { Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function FavouritesTab() {
  const items = useFavouritesStore((s) => s.items);
  const removeFavourite = useFavouritesStore((s) => s.removeFavourite);

  return (
    <TabsContent value="favourites" className="focus-visible:ring-0">
      {items.length > 0 ? (
        <div className="space-y-12 md:w-3/4">
          {items.map((item) => (
            <div
              key={item.product_id}
              className=" flex flex-col md:flex-row gap-8 py-4 border-b border-border/50 last:border-0">
              {/* Image */}
              <div className="relative aspect-3/4 w-full md:w-48 bg-muted group overflow-hidden shrink-0">
                <Image
                  src={item.image_url || "/placeholder.svg"}
                  alt={item.product_name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-col justify-between py-2">
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start">
                    <div>
                      <h3 className="text-sm font-black uppercase tracking-[1px] mb-1">
                        {item.product_name}
                      </h3>
                    </div>

                    <p className="font-serif text-xl">
                      {formatCurrency(item.price)}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between mt-8">
                  <Link
                    href={`/products/${item.product_name}/${item.product_id}`}>
                    <Button className="h-10 px-6 bg-foreground text-background hover:bg-foreground/90 rounded-none text-[10px] uppercase tracking-[0.3em] font-black">
                      View Product
                      <ArrowRight className="ml-2 h-3 w-3" />
                    </Button>
                  </Link>

                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => removeFavourite(item.product_id)}
                    className="text-[9px] uppercase tracking-[2px] font-black text-destructive hover:text-foreground hover:bg-destructive/40 transition-all">
                    <Trash2 className="h-3 w-3 mr-2" />
                    Remove
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyFavourites />
      )}
    </TabsContent>
  );
}

const EmptyFavourites = () => {
  return (
    <Empty className="py-32 border-none">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <ShoppingBag />
        </EmptyMedia>
        <EmptyTitle className="text-2xl mb-2">No favourites yet</EmptyTitle>
        <EmptyDescription>
          Save pieces you love and revisit them anytime.
        </EmptyDescription>
      </EmptyHeader>

      <Link href="/products">
        <Button
          variant="outline"
          className="px-8 py-6 text-[10px] bg-transparent">
          Explore Products
        </Button>
      </Link>
    </Empty>
  );
};
