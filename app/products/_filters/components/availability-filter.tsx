// components/filters/AvailabilityFilter.tsx
"use client";

import { Checkbox } from "@/components/ui/checkbox";

import { useAvailabilityFilterStore } from "@/app/products/_filters/store/use-availability-filter-store";
import { useGetFiltersMetadata } from "@/app/_queries/filters/get-filters-metadata";
import { FilterSection } from "@/app/products/_filters/components/filter-section";

interface AvailabilityData {
  inStock: number;
  outOfStock: number;
}

function AvailabilityFilterSkeleton() {
  return (
    <div className="space-y-3">
      {[1, 2].map((i) => (
        <div key={i} className="flex items-center gap-3">
          <div className="h-4 w-4 rounded bg-muted animate-pulse" />
          <div className="h-4 flex-1 rounded bg-muted animate-pulse" />
          <div className="h-4 w-8 rounded bg-muted animate-pulse" />
        </div>
      ))}
    </div>
  );
}

export function AvailabilityFilter() {
  const {
    inStock,
    outOfStock,
    isExpanded,
    setInStock,
    setOutOfStock,
    clearAvailability,
    toggleExpanded,
  } = useAvailabilityFilterStore();

  const hasActiveFilters = inStock || outOfStock;

  const { data, isLoading, isError } = useGetFiltersMetadata();

  // Loading state
  if (isLoading) {
    return (
      <FilterSection
        title="Availability"
        isExpanded={isExpanded}
        onToggle={toggleExpanded}
        onClear={clearAvailability}
        hasActiveFilters={hasActiveFilters}>
        <AvailabilityFilterSkeleton />
      </FilterSection>
    );
  }

  // Error state
  if (isError || !data?.data) {
    return (
      <FilterSection
        title="Availability"
        isExpanded={isExpanded}
        onToggle={toggleExpanded}
        onClear={clearAvailability}
        hasActiveFilters={hasActiveFilters}>
        <div className="text-sm text-destructive">
          Failed to load availability
        </div>
      </FilterSection>
    );
  }

  const availabilityData = data.data.availability as AvailabilityData;

  return (
    <FilterSection
      title="Availability"
      isExpanded={isExpanded}
      onToggle={toggleExpanded}
      onClear={clearAvailability}
      hasActiveFilters={hasActiveFilters}>
      <div className="space-y-3">
        <label className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
          <Checkbox
            checked={inStock}
            onCheckedChange={setInStock}
            className="cursor-pointer"
          />
          <span className="tab_text uppercase text-foreground! flex-1">
            In Stock
          </span>
          <span className="text-sm text-blue-600 font-medium">
            ({availabilityData?.inStock ?? 0})
          </span>
        </label>

        <label className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
          <Checkbox
            checked={outOfStock}
            onCheckedChange={setOutOfStock}
            className="cursor-pointer"
          />
          <span className="tab_text uppercase text-foreground! flex-1">
            Out of Stock
          </span>
          <span className="text-sm text-blue-600 font-medium">
            ({availabilityData?.outOfStock ?? 0})
          </span>
        </label>
      </div>
    </FilterSection>
  );
}
