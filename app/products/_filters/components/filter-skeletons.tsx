import { Skeleton } from "@/components/ui/skeleton";

// Individual filter section skeleton with luxury minimal aesthetic
function FilterSectionSkeleton({
  itemCount = 4,
  hasCheckbox = true,
  itemWidth = "w-16",
}: {
  itemCount?: number;
  hasCheckbox?: boolean;
  itemWidth?: string;
}) {
  return (
    <div className="py-4 border-b border-border/50">
      {/* Filter title */}
      <div className="flex items-center justify-between mb-4">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-4" />
      </div>

      {/* Filter options */}
      <div className="space-y-3">
        {Array.from({ length: itemCount }).map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            {hasCheckbox && <Skeleton className="h-4 w-4 rounded-sm" />}
            <Skeleton className={`h-3 ${itemWidth}`} />
          </div>
        ))}
      </div>
    </div>
  );
}

// Size filter skeleton - grid of size boxes
export function SizeFilterSkeleton() {
  return (
    <div className="py-4 border-b border-border/50">
      <div className="flex items-center justify-between mb-4">
        <Skeleton className="h-4 w-12" />
        <Skeleton className="h-4 w-4" />
      </div>
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-10 w-10 rounded-none" />
        ))}
      </div>
    </div>
  );
}

// Availability filter skeleton
export function AvailabilityFilterSkeleton() {
  return <FilterSectionSkeleton itemCount={2} itemWidth="w-20" />;
}

// Category filter skeleton
export function CategoryFilterSkeleton() {
  return <FilterSectionSkeleton itemCount={5} itemWidth="w-24" />;
}

// Color filter skeleton - circular swatches
export function ColorFilterSkeleton() {
  return (
    <div className="py-4 border-b border-border/50">
      <div className="flex items-center justify-between mb-4">
        <Skeleton className="h-4 w-14" />
        <Skeleton className="h-4 w-4" />
      </div>
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-6 w-6 rounded-full" />
        ))}
      </div>
    </div>
  );
}

// Price range filter skeleton - slider style
export function PriceRangeFilterSkeleton() {
  return (
    <div className="py-4 border-b border-border/50">
      <div className="flex items-center justify-between mb-4">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-4" />
      </div>
      {/* Price inputs */}
      <div className="flex items-center gap-3 mb-4">
        <Skeleton className="h-10 flex-1 rounded-none" />
        <Skeleton className="h-3 w-4" />
        <Skeleton className="h-10 flex-1 rounded-none" />
      </div>
      {/* Range slider */}
      <Skeleton className="h-1 w-full rounded-full" />
    </div>
  );
}

// Active filters skeleton - pills
export function ActiveFiltersSkeleton() {
  return (
    <div className="pt-4">
      <div className="flex items-center gap-2 mb-3">
        <Skeleton className="h-3 w-20" />
      </div>
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-7 w-20 rounded-full" />
        ))}
      </div>
    </div>
  );
}

// Combined filters content skeleton
export function FiltersContentSkeleton() {
  return (
    <div className="animate-pulse">
      <SizeFilterSkeleton />
      <AvailabilityFilterSkeleton />
      <CategoryFilterSkeleton />
      <ColorFilterSkeleton />
      <PriceRangeFilterSkeleton />
    </div>
  );
}

// Full sidebar skeleton for complete loading state
export function FiltersSidebarSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Skeleton className="h-5 w-16" />
      </div>

      <FiltersContentSkeleton />
      <ActiveFiltersSkeleton />
    </div>
  );
}
