import { useCartStore } from "@/app/cart/_hooks/use-cart-store";
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
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CartTab() {
  const cart_items = useCartStore((s) => s.items);
  const removeFromCart = useCartStore((s) => s.removeFromCart);
  const incrementItem = useCartStore((s) => s.incrementItem);
  const decrementItem = useCartStore((s) => s.decrementItem);

  const subtotal = cart_items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  console.log(cart_items);

  // 5 percent
  const shipping = 0.05 * subtotal;
  const tax = 0.1 * subtotal;

  const total_cost = shipping + subtotal + tax;

  return (
    <TabsContent value="cart" className="focus-visible:ring-0 ">
      <>
        {cart_items.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 ">
            <div className="lg:col-span-8 space-y-12">
              {cart_items.map((item) => {
                const variant_label = Object.values(
                  item.variant_selections,
                ).join(" / ");

                return (
                  <div
                    key={item.variant_key}
                    className=" flex flex-col md:flex-row gap-8 py-4 border-b border-border/50 last:border-0">
                    <Link
                      href={`/products/${item.product_name}/${item.product_id}`}
                      className="relative aspect-3/4 w-full md:w-48 bg-muted group group overflow-hidden shrink-0">
                      <Image
                        src={item.image_url || "/placeholder.svg"}
                        alt={item.product_name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />

                      <Button className="h-10 w-full translate-y-full absolute bottom-0 left-0 duration-700 group-hover:translate-y-0 px-6 bg-foreground text-background hover:bg-foreground/90 rounded-none text-[10px] uppercase tracking-[0.3em] font-black">
                        View Product
                        <ArrowRight className="ml-2 h-3 w-3" />
                      </Button>
                    </Link>

                    <div className="flex-1 flex flex-col justify-between py-2">
                      <div className="space-y-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-sm font-black uppercase tracking-[1px] mb-1">
                              {item.product_name}
                            </h3>
                            <p className="text-xs text-muted-foreground uppercase tracking-widest">
                              {variant_label}
                            </p>
                          </div>
                          <p className="font-serif text-xl">
                            {formatCurrency(item.price)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-8">
                        <div className=" flex flex-col">
                          <div className="flex items-center h-10 ">
                            <button
                              onClick={() =>
                                decrementItem(item.variant_key, item.product_id)
                              }
                              disabled={item.quantity <= 1}
                              className="w-10 flex justify-center items-center cursor-pointer text-center h-10 border border-border hover:bg-primary/40 transition-all active:scale-95 active:translate-y-px disabled:opacity-50 disabled:cursor-not-allowed bg-background">
                              <Minus className="h-3 w-3" />
                            </button>

                            <span className="w-10 text-center text-xs font-bold tabular-nums h-full flex items-center justify-center">
                              {item.quantity}
                            </span>

                            <button
                              onClick={() =>
                                incrementItem(item.variant_key, item.product_id)
                              }
                              disabled={item.quantity >= item.max_quantity}
                              className="w-10 flex justify-center items-center cursor-pointer text-center h-10 border border-border hover:bg-primary/40 transition-all active:scale-95 active:translate-y-px disabled:opacity-50 disabled:cursor-not-allowed bg-background">
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          {item.max_quantity > 0 && (
                            <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-2">
                              {item.max_quantity} available
                            </p>
                          )}
                        </div>

                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() =>
                            removeFromCart(item.variant_key, item.product_id)
                          }
                          className="text-[9px] uppercase tracking-[2px] font-black text-destructive hover:text-foreground hover:bg-destructive/40 transition-all">
                          <Trash2 className="h-3 w-3 mr-2" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ---------------- SUMMARY ---------------- */}
            <aside className="lg:col-span-4 lg:sticky lg:top-32 h-fit space-y-8 bg-neutral-50/50 p-8 md:p-10 border border-border/50 ">
              <h3 className="text-sm uppercase tracking-[1px] font-black text-muted-foreground/60">
                Order Summary
              </h3>

              <div className="space-y-4">
                <div className="flex justify-between text-xs font-bold uppercase tracking-[1px]">
                  <span>Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>

                <div className="flex justify-between text-xs font-bold uppercase tracking-[1px]">
                  <span>Tax</span>
                  <span className="text-muted-foreground">
                    {formatCurrency(tax)}
                  </span>
                </div>
                <div className="flex justify-between text-xs font-bold uppercase tracking-[1px]">
                  <span>Shipping</span>
                  <span className="text-muted-foreground">
                    {formatCurrency(shipping)}
                  </span>
                </div>

                <div className="pt-8 border-t border-border/40">
                  <div className="flex justify-between items-baseline mb-8">
                    <span className="text-xs uppercase tracking-[1px] font-black">
                      Total
                    </span>
                    <span className="text-2xl font-beatrice-deck tracking-tighter">
                      {formatCurrency(total_cost)}
                    </span>
                  </div>

                  <Link href="/checkout">
                    {" "}
                    <Button className="w-full h-14 bg-foreground text-background hover:bg-foreground/90 rounded-none text-xs uppercase tracking-[0.3em] font-black group">
                      Begin Checkout
                      <ArrowRight className="ml-3 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        ) : (
          <EmptyCart />
        )}
      </>
    </TabsContent>
  );
}

const EmptyCart = () => {
  return (
    <Empty className="py-32 border-none">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <ShoppingBag />
        </EmptyMedia>
        <EmptyTitle className="text-2xl  mb-2">Your bag is empty</EmptyTitle>
        <EmptyDescription className="tab_leading">
          Discover our unique pieces and start your collection.
        </EmptyDescription>
      </EmptyHeader>
      <Link href="/products">
        <Button
          variant="outline"
          className=" button px-8 py-6 text-[10px]  bg-transparent">
          Explore Products
        </Button>
      </Link>
    </Empty>
  );
};
