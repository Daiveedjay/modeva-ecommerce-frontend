"use client";

import { Suspense, useState } from "react";
import { AvailabilityFilter } from "@/app/products/_filters/components/availability-filter";
import { CategoryFilter } from "@/app/products/_filters/components/category-filter";
import { ColorFilter } from "@/app/products/_filters/components/color-filter";
import { PriceRangeFilter } from "@/app/products/_filters/components/price-range-filter";
import { SizeFilter } from "@/app/products/_filters/components/size-filter";
import { ActiveFilters } from "@/app/products/_filters/components/active-filters";
import { Button } from "@/components/ui/button";
import { Filter as FilterIcon } from "lucide-react";
import { FiltersSidebarSkeleton } from "@/app/products/_filters/components/filter-skeletons";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function ProductFilters() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile: hamburger trigger */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 xl:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="lg"
              className="flex items-center gap-3 border-foreground/10 bg-background/90 backdrop-blur-md px-8 h-12 shadow-xl hover:bg-foreground hover:text-background transition-all duration-300 group">
              <FilterIcon className="w-3 h-3 transition-transform group-hover:rotate-12" />
              <span className="button">Filters</span>
            </Button>
          </SheetTrigger>

          <SheetContent side="bottom" className="h-[90vh] p-0 bg-background">
            <div className="mx-auto w-12 h-1.5 bg-foreground/10 my-4" />
            <SheetHeader className="px-8 pb-6">
              <SheetTitle className="text-lg font-semibold uppercase">
                Filters
              </SheetTitle>
            </SheetHeader>

            <div className="flex-1 overflow-y-auto px-8 py-10 space-y-12">
              <FiltersContent />
              <div className="pt-6 border-border/50">
                <Suspense fallback={<FiltersSidebarSkeleton />}>
                  <ActiveFilters onApply={() => setOpen(false)} />
                </Suspense>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden xl:block flex-1 min-w-62.5 xl:min-w-87.5 relative left-0 mt-28">
        <div className="z-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold uppercase">Filters</h2>
          </div>

          {/* Filter Components */}
          <FiltersContent />

          {/* Active Filters Summary */}
          <Suspense fallback={<FiltersSidebarSkeleton />}>
            <ActiveFilters />
          </Suspense>
          <div className="p-12" />
        </div>
      </div>
    </>
  );
}

// Reusable content so desktop + mobile share the exact same filters
function FiltersContent() {
  return (
    <>
      <SizeFilter />
      <AvailabilityFilter />
      <CategoryFilter />
      <ColorFilter />
      <PriceRangeFilter />
    </>
  );
}
