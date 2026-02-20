"use client";

import { Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useFilterStore } from "@/app/products/_filters/store/use-filter-store";

export function ProductsEmptyState({ onclick }: { onclick?: () => void }) {
  const router = useRouter();
  // const searchParams = useSearchParams();
  const pathname = usePathname();

  const clearAllFilters = useFilterStore((store) => store.clearAllFilters);

  const handleClearAll = () => {
    // 1. Clear Zustand filters so the UI chips disappear immediately
    clearAllFilters();

    // 2. Build a clean URL with no filters (and no query at all)
    const href = pathname; // e.g. /products

    // 3. Instantly update the address bar
    window.history.pushState(null, "", href);

    // 4. Ask Next to re-render with the new (empty) searchParams
    router.refresh();
  };
  return (
    <Empty className="border-none py-16 md:py-24">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Package className="text-muted-foreground" />
        </EmptyMedia>
        <EmptyTitle>No Products Found</EmptyTitle>
        <EmptyDescription>
          We couldn&apos;t find any products matching your criteria. Try
          adjusting your filters or search terms.
        </EmptyDescription>
      </EmptyHeader>

      <EmptyContent>
        <Button
          variant="outline"
          onClick={() => {
            handleClearAll();
            if (onclick) onclick();
          }}>
          Clear Filters
        </Button>
      </EmptyContent>
    </Empty>
  );
}
