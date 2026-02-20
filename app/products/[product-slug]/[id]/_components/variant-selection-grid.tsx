"use client";

import type React from "react";

import { useMultiSelectStore } from "@/app/products/[product-slug]/[id]/_hooks/use-multi-select-store";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function VariantSelectionGrid({
  children,
}: {
  children?: React.ReactNode;
}) {
  const {
    search_query,
    show_only_available,
    setSearchQuery,
    setShowOnlyAvailable,
  } = useMultiSelectStore();

  return (
    <div className="w-full flex-1 min-h-0 flex flex-col bg-white overflow-hidden">
      <div className="px-4 sm:px-6 md:px-8 lg:px-10 py-4 sm:py-5 md:py-6 space-y-3 sm:space-y-4 border-b border-border/20 shrink-0">
        <div className="relative group">
          <Search className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60 transition-colors group-focus-within:text-foreground" />
          <Input
            placeholder="Filter variants..."
            value={search_query}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 h-9 sm:h-10 bg-transparent border-0 border-b border-border/60 shadow-none rounded-none focus-visible:ring-0 focus-visible:border-foreground transition-all placeholder:text-muted-foreground/40 text-xs sm:text-sm uppercase tracking-wider"
          />
        </div>
        <div className="flex items-center gap-3">
          <Checkbox
            id="available"
            checked={show_only_available}
            onCheckedChange={(checked) => setShowOnlyAvailable(!!checked)}
            className="rounded-none border-border/60 data-[state=checked]:bg-foreground data-[state=checked]:border-foreground h-4 w-4 sm:h-5 sm:w-5"
          />
          <label
            htmlFor="available"
            className="text-[10px] sm:text-xs uppercase tracking-[0.15em] cursor-pointer select-none text-muted-foreground/80 hover:text-foreground transition-colors font-bold">
            In-Stock Only
          </label>
        </div>
      </div>
      {children}
    </div>
  );
}
