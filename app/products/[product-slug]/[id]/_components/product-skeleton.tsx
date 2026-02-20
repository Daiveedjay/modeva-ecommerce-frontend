"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function ProductSkeleton() {
  return (
    <div className="group space-y-4">
      {/* Image skeleton */}
      <Skeleton className="w-full aspect-square rounded-sm " />

      {/* Product info skeletons */}
      <div className="space-y-2">
        <div className="flex justify-between gap-4">
          <Skeleton className="h-4 w-2/3 rounded-sm " />
          <Skeleton className="h-4  w-1/4 rounded-sm " />
        </div>
      </div>
    </div>
  );
}

export function ProductsGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
      {Array.from({ length: count }).map((_, i) => (
        <ProductSkeleton key={i} />
      ))}
    </div>
  );
}
