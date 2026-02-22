"use client";

import { useFilterStore } from "@/app/products/_filters/store/use-filter-store";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function ActiveFilters() {
  const {
    activeFilters,
    hasActiveFilters,
    activeFilterCount,
    clearAllFilters,
  } = useFilterStore();

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  console.log("Active filters", activeFilters);

  const handleApplyFilters = () => {
    const params = new URLSearchParams(searchParams.toString());

    params.delete("size");
    params.delete("availability");
    params.delete("category");
    params.delete("subcategory");
    params.delete("color");
    params.delete("price");
    params.delete("minPrice");
    params.delete("maxPrice");

    activeFilters.forEach((filter) => {
      if (filter.type === "size") {
        params.append("size", filter.value.replace("Size: ", ""));
      } else if (filter.type === "availability") {
        params.set("availability", filter.value);
      } else if (filter.type === "category") {
        params.append("category", filter.value);
      } else if (filter.type === "subcategory") {
        params.append("subcategory", filter.value);
      } else if (filter.type === "color") {
        params.append("color", filter.value);
      } else if (filter.type === "price") {
        const [minStr, maxStr] = filter.value.split("-");
        if (minStr) params.set("minPrice", minStr);
        if (maxStr) params.set("maxPrice", maxStr);
      }
    });

    // ✅ Use router.push so Next.js owns the URL state
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleClearAll = () => {
    clearAllFilters();
    // ✅ Already correct - but only works if handleApplyFilters is also fixed
    router.push(pathname, { scroll: false });
  };

  if (!hasActiveFilters) return null;

  return (
    <div className="mt-6 p-2 font-beatrice tracking-[0px] bg-muted border border-border">
      <div className="flex justify-between mb-3">
        <div className=" flex flex-col">
          <h4 className="text-xs font-semibold ">Active Filters</h4>
          <span className="text-xs text-muted-foreground">
            {activeFilterCount} applied{" "}
          </span>
        </div>

        <button
          onClick={handleClearAll}
          className=" text-[8px] sm:text-[9px]
              uppercase tracking-[1px] font-bold
               cursor-pointer text-destructive py-0.5 px-1 h-min hover:bg-destructive/60 hover:text-secondary transition-colors flex gap-1">
          Clear All
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {activeFilters.map((filter, index) => (
          <FilterTag
            key={`${filter.type}-${index}`}
            label={filter.label}
            onRemove={filter.onRemove}
          />
        ))}
      </div>
      <div className=" mt-4 flex justify-end mr-1">
        <Button
          className=" bg-foreground hover:bg-foreground/70 text-background py-2 px-6 rounded-none"
          onClick={handleApplyFilters}>
          Apply
        </Button>
      </div>
    </div>
  );
}

function FilterTag({
  label,
  onRemove,
}: {
  label: string;
  onRemove: () => void;
}) {
  return (
    <button
      onClick={onRemove}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs
        bg-background border border-border
        hover:bg-destructive/10 hover:border-destructive hover:text-destructive
        transition-all duration-200 group
        active:scale-95">
      <span className="font-medium">{label}</span>
      <X
        size={14}
        className="opacity-50 group-hover:opacity-100 transition-opacity"
      />
    </button>
  );
}
