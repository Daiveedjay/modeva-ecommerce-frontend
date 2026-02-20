"use client";

import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { useGetFiltersMetadata } from "@/app/_queries/filters/get-filters-metadata";
import { usePriceRangeFilterStore } from "@/app/products/_filters/store/use-price-range-filter";
import { FilterSection } from "@/app/products/_filters/components/filter-section";
import { useState } from "react";
import { formatCurrency } from "@/lib/utils";

// Skeleton component for loading state
function PriceRangeFilterSkeleton() {
  return (
    <div className="space-y-3 p-2">
      <div className="h-2 bg-muted animate-pulse rounded" />
      <div className="flex gap-3">
        <div className="flex-1 h-9 bg-muted animate-pulse rounded" />
        <div className="flex-1 h-9 bg-muted animate-pulse rounded" />
      </div>
      <div className="flex justify-between">
        <div className="h-4 w-16 bg-muted animate-pulse rounded" />
        <div className="h-4 w-16 bg-muted animate-pulse rounded" />
      </div>
    </div>
  );
}

export function PriceRangeFilter() {
  const {
    minPrice,
    maxPrice,
    isExpanded,
    setMinPrice,
    setMaxPrice,
    setRange,
    clearPriceRange,
    toggleExpanded,
  } = usePriceRangeFilterStore();

  const { data, isLoading, isError } = useGetFiltersMetadata();

  // Local input state to allow typing freely
  const [minInput, setMinInput] = useState<string>("");
  const [maxInput, setMaxInput] = useState<string>("");

  // Loading state: show skeleton inside FilterSection
  if (isLoading) {
    return (
      <FilterSection
        title="Price Range"
        isExpanded={isExpanded}
        onToggle={toggleExpanded}
        onClear={clearPriceRange}
        hasActiveFilters={false}>
        <PriceRangeFilterSkeleton />
      </FilterSection>
    );
  }

  // Error / empty data state
  if (isError || !data?.data?.priceRange) {
    return (
      <FilterSection
        title="Price Range"
        isExpanded={isExpanded}
        onToggle={toggleExpanded}
        onClear={clearPriceRange}
        hasActiveFilters={false}>
        <div className="text-sm text-destructive p-2">
          Failed to load price range
        </div>
      </FilterSection>
    );
  }

  // Get bounds from API
  const { min, max } = data.data.priceRange;

  // Effective values used by UI
  const effectiveMin = minPrice ?? min;
  const effectiveMax = maxPrice ?? max;
  const currentRange: [number, number] = [effectiveMin, effectiveMax];

  // Active when user deviates from defaults
  const hasActiveFilters = minPrice !== null || maxPrice !== null;

  const handleMinInputChange = (value: string) => {
    setMinInput(value);

    // If empty or not a valid number, don't update store yet
    if (value === "" || value === "-") {
      return;
    }

    const numValue = Number(value);
    if (!Number.isNaN(numValue)) {
      const clamped = Math.max(min, Math.min(numValue, effectiveMax));
      setMinPrice(clamped);
    }
  };

  const handleMaxInputChange = (value: string) => {
    setMaxInput(value);

    // If empty or not a valid number, don't update store yet
    if (value === "" || value === "-") {
      return;
    }

    const numValue = Number(value);
    if (!Number.isNaN(numValue)) {
      const clamped = Math.min(max, Math.max(numValue, effectiveMin));
      setMaxPrice(clamped);
    }
  };

  const handleMinBlur = () => {
    // On blur, if empty or invalid, reset to effective value
    if (minInput === "" || Number.isNaN(Number(minInput))) {
      setMinInput("");
    }
  };

  const handleMaxBlur = () => {
    // On blur, if empty or invalid, reset to effective value
    if (maxInput === "" || Number.isNaN(Number(maxInput))) {
      setMaxInput("");
    }
  };

  // Display value: use local input if user is typing, otherwise show effective value
  const displayMinValue = minInput !== "" ? minInput : effectiveMin.toString();
  const displayMaxValue = maxInput !== "" ? maxInput : effectiveMax.toString();

  return (
    <FilterSection
      title="Price Range"
      isExpanded={isExpanded}
      onToggle={toggleExpanded}
      onClear={() => {
        clearPriceRange();
        setMinInput("");
        setMaxInput("");
      }}
      hasActiveFilters={hasActiveFilters}>
      <div className="space-y-4 p-2">
        {/* Slider */}
        <Slider
          value={currentRange}
          onValueChange={(value) => {
            setRange(value as [number, number]);
            // Clear local input state when slider changes
            setMinInput("");
            setMaxInput("");
          }}
          min={min}
          max={max}
          step={1}
          className="w-[98%]"
        />

        {/* Price inputs */}
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <label className="text-xs uppercase text-muted-foreground mb-1 block">
              Min
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                $
              </span>
              <Input
                type="number"
                value={displayMinValue}
                onChange={(e) => handleMinInputChange(e.target.value)}
                onBlur={handleMinBlur}
                onFocus={() => setMinInput(effectiveMin.toString())}
                min={min}
                max={effectiveMax}
                className="pl-6 h-9"
              />
            </div>
          </div>

          <div className="pt-5 text-muted-foreground">-</div>

          <div className="flex-1">
            <label className="text-xs uppercase text-muted-foreground mb-1 block">
              Max
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                $
              </span>
              <Input
                type="number"
                value={displayMaxValue}
                onChange={(e) => handleMaxInputChange(e.target.value)}
                onBlur={handleMaxBlur}
                onFocus={() => setMaxInput(effectiveMax.toString())}
                min={effectiveMin}
                max={max}
                className="pl-6 h-9"
              />
            </div>
          </div>
        </div>

        {/* Display absolute bounds from metadata */}
        <div className="flex justify-between text-xs text-muted-foreground">
          <span className="uppercase">Min: {formatCurrency(min)}</span>
          <span className="uppercase">Max: {formatCurrency(max)}</span>
        </div>
      </div>
    </FilterSection>
  );
}
