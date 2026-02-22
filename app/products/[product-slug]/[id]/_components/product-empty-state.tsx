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
import { usePathname, useRouter } from "next/navigation";
import { useFilterStore } from "@/app/products/_filters/store/use-filter-store";

export function ProductsEmptyState({ onclick }: { onclick?: () => void }) {
  const router = useRouter();
  const pathname = usePathname();
  const clearAllFilters = useFilterStore((store) => store.clearAllFilters);

  const handleClearAll = () => {
    clearAllFilters();
    if (onclick) onclick(); // only resets inputValue, no navigation
    router.push(pathname, { scroll: false }); // single push wins
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
        <Button variant="outline" onClick={handleClearAll}>
          Clear Filters
        </Button>
      </EmptyContent>
    </Empty>
  );
}
