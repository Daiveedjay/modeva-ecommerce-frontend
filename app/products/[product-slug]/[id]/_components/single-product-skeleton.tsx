"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function SingleProductSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-20">
        {/* Image Gallery Skeleton (matches ImageGallery layout) */}
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-10 flex-1 lg:flex-[1.5]">
          {/* Main Display Image (order matches real component) */}
          <div className="overflow-hidden aspect-square flex items-center justify-center order-2 lg:order-1 flex-1">
            <Skeleton className="w-full h-full rounded-none" />
          </div>

          {/* Thumbnail Strip (row on small, column on lg) */}
          <div className="flex lg:flex-col gap-2 lg:gap-4 overflow-x-auto lg:overflow-x-visible flex-1 lg:flex-none order-1 lg:order-2">
            {Array.from({ length: 4 }).map((_, idx) => (
              <Skeleton
                key={idx}
                className="shrink-0 rounded-none border border-border
                           h-20 w-20 sm:h-24 sm:w-24 lg:h-32 lg:w-24"
              />
            ))}
          </div>
        </div>

        {/* Product Details Skeleton (matches SingleProduct panel classes) */}
        <div className="space-y-6 relative border border-border p-6 sm:p-8 lg:p-10 flex-1 lg:flex-1">
          {/* Header */}
          <div className="space-y-2">
            <Skeleton className="h-8 sm:h-10 lg:h-12 w-5/6 rounded-sm" />
            <Skeleton className="h-6 sm:h-8 w-1/3 rounded-sm" />
            <Skeleton className="h-4 w-1/2 rounded-sm" />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-full rounded-sm" />
            <Skeleton className="h-4 w-full rounded-sm" />
            <Skeleton className="h-4 w-4/5 rounded-sm" />
          </div>

          {/* VariantRenderer area */}
          <div className="space-y-6">
            {Array.from({ length: 2 }).map((_, blockIdx) => (
              <div key={blockIdx} className="space-y-3">
                <Skeleton className="h-5 w-1/4 rounded-sm" />
                <div className="flex flex-wrap gap-2">
                  {Array.from({ length: 6 }).map((__, optIdx) => (
                    <Skeleton key={optIdx} className="h-10 w-20 rounded-sm" />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* QuantityControllers area */}
          <div className="space-y-3">
            <Skeleton className="h-5 w-24 rounded-sm" />
            <div className="flex items-center gap-2 sm:gap-3 w-fit">
              <Skeleton className="w-8 sm:w-10 h-8 sm:h-10 rounded-none" />
              <Skeleton className="w-6 sm:w-8 h-5 rounded-sm" />
              <Skeleton className="w-8 sm:w-10 h-8 sm:h-10 rounded-none" />
            </div>
            <Skeleton className="h-3 w-32 rounded-sm" />
          </div>

          {/* ActionButtons area (two full-width buttons) */}
          <div className="flex flex-col gap-2 pt-4">
            <Skeleton className="h-12 sm:h-14 w-full rounded-none" />
            <Skeleton className="h-12 sm:h-14 w-full rounded-none" />
          </div>

          {/* AdditionalInfo area */}
          <div className="border-t pt-6 space-y-3">
            <div className="flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-0">
              <Skeleton className="h-4 w-1/3 rounded-sm" />
              <Skeleton className="h-4 w-1/3 rounded-sm" />
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-0">
              <Skeleton className="h-4 w-1/3 rounded-sm" />
              <Skeleton className="h-4 w-1/2 rounded-sm" />
            </div>
          </div>

          {/* WishlistButton placeholder */}
          <Skeleton className="h-10 w-40 rounded-none" />
        </div>
      </div>
    </div>
  );
}
