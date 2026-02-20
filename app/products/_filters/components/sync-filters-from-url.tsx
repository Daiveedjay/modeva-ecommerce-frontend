// app/products/_filters/sync-filters-from-url.tsx
"use client";

import { useSearchParams } from "next/navigation";
import { useSizeFilterStore } from "@/app/products/_filters/store/use-size-filter-store";
import { useColorFilterStore } from "@/app/products/_filters/store/use-color-filter-store";
import { useAvailabilityFilterStore } from "@/app/products/_filters/store/use-availability-filter-store";
import { useCategoryFilterStore } from "@/app/products/_filters/store/use-category-filter-store";
import { usePriceRangeFilterStore } from "@/app/products/_filters/store/use-price-range-filter";
import { useGetFiltersMetadata } from "@/app/_queries/filters/get-filters-metadata";
import { useRef, useEffect } from "react";

export function SyncFiltersFromUrl() {
  const searchParams = useSearchParams();
  const { data: filtersData } = useGetFiltersMetadata();
  const hasInitialized = useRef(false);

  // Initialize all filters except categories immediately
  if (!hasInitialized.current) {
    hasInitialized.current = true;

    // ─────────────────────────────────────────────
    // SIZES
    // ─────────────────────────────────────────────
    const urlSizes = searchParams.getAll("size");
    if (urlSizes.length > 0) {
      useSizeFilterStore.getState().initializeFromUrl(urlSizes);
    }

    // ─────────────────────────────────────────────
    // COLORS
    // ─────────────────────────────────────────────
    const urlColors = searchParams.getAll("color");
    if (urlColors.length > 0) {
      useColorFilterStore.getState().initializeFromUrl(urlColors);
    }

    // ─────────────────────────────────────────────
    // AVAILABILITY
    // ─────────────────────────────────────────────
    const urlAvailability = searchParams.get("availability");
    if (urlAvailability) {
      useAvailabilityFilterStore
        .getState()
        .initializeFromUrl(urlAvailability as "inStock" | "outOfStock");
    }

    // ─────────────────────────────────────────────
    // PRICE RANGE
    // ─────────────────────────────────────────────
    const urlMinPrice = searchParams.get("minPrice");
    const urlMaxPrice = searchParams.get("maxPrice");
    if (urlMinPrice || urlMaxPrice) {
      const min = urlMinPrice ? Number(urlMinPrice) : null;
      const max = urlMaxPrice ? Number(urlMaxPrice) : null;
      usePriceRangeFilterStore.getState().initializeFromUrl(min, max);
    }
  }

  // ─────────────────────────────────────────────
  // CATEGORIES & SUBCATEGORIES (needs categories data)
  // ─────────────────────────────────────────────
  const categoriesInitialized = useRef(false);
  
  useEffect(() => {
    // Only initialize once when categories data becomes available
    if (!categoriesInitialized.current && filtersData?.data?.categories) {
      categoriesInitialized.current = true;
      
      const urlCategories = searchParams.getAll("category");
      const urlSubcategories = searchParams.getAll("subcategory");
      
      if (urlCategories.length > 0 || urlSubcategories.length > 0) {
        // Transform API categories to add parentId to subcategories
        const categoriesWithParentId = filtersData.data.categories.map((cat) => ({
          ...cat,
          subcategories: cat.subcategories?.map((sub) => ({
            ...sub,
            parentId: cat.id,
          })),
        }));
        
        useCategoryFilterStore
          .getState()
          .initializeFromUrl(
            urlCategories,
            urlSubcategories,
            categoriesWithParentId
          );
      }
    }
  }, [filtersData, searchParams]);

  return null;
}