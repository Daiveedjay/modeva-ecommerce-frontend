import { useFavouritesStore } from "@/app/cart/_hooks/use-favourites-store";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function CartTabControls({
  cart_items_length,

  activeTab,
  setActiveTab,
}: {
  activeTab: "cart" | "favourites";
  cart_items_length: number;

  setActiveTab: (tab: "cart" | "favourites") => void;
}) {
  const favourites_length = useFavouritesStore((store) => store.items.length);
  return (
    <TabsList className="bg-transparent p-0 h-auto gap-4 sm:gap-8 mb-12 border-b border-border/40 w-full justify-start rounded-none">
      <TabsTrigger
        value="cart"
        className={`bg-transparent shadow-none border-b-2 border-transparent data-[state=active]:border-primary rounded-none px-0 pb-4 text-xs font-black uppercase tracking-[1px] ${
          activeTab === "cart" && "text-foreground"
        }
            data-[state=active]:bg-foreground
    data-[state=active]:text-background`}
        onClick={() => setActiveTab("cart")}>
        <span className=" text-[10px] sm:text-xs block translate-y-1.5">
          {" "}
          Shopping Bag ({cart_items_length})
        </span>
      </TabsTrigger>

      <TabsTrigger
        value="favourites"
        className={`bg-transparent shadow-none border-b-2 border-transparent data-[state=active]:border-primary rounded-none px-0 pb-4 text-xs font-black uppercase tracking-[1px] ${
          activeTab === "favourites" && "text-foreground"
        } data-[state=active]:bg-foreground
    data-[state=active]:text-background`}
        onClick={() => setActiveTab("favourites")}>
        <span className="text-[10px] sm:text-xs block translate-y-1.5">
          {" "}
          Favourites ({favourites_length})
        </span>
      </TabsTrigger>
    </TabsList>
  );
}
