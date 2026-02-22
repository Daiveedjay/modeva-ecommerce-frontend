"use client";

import { useSearchParams } from "next/navigation";
import { useSizeFilterStore } from "@/app/products/_filters/store/use-size-filter-store";
import { useColorFilterStore } from "@/app/products/_filters/store/use-color-filter-store";
import { useAvailabilityFilterStore } from "@/app/products/_filters/store/use-availability-filter-store";
import { useCategoryFilterStore } from "@/app/products/_filters/store/use-category-filter-store";
import { usePriceRangeFilterStore } from "@/app/products/_filters/store/use-price-range-filter";
import { useGetFiltersMetadata } from "@/app/_queries/filters/get-filters-metadata";
import { useEffect } from "react";

export function SyncFiltersFromUrl() {
  const searchParams = useSearchParams();
  const { data: filtersData } = useGetFiltersMetadata();

  // ─────────────────────────────────────────────
  // ALL FILTERS EXCEPT CATEGORIES
  // ─────────────────────────────────────────────
  useEffect(() => {
    // SIZES
    const urlSizes = searchParams.getAll("size");
    useSizeFilterStore.getState().initializeFromUrl(urlSizes);

    // COLORS
    const urlColors = searchParams.getAll("color");
    useColorFilterStore.getState().initializeFromUrl(urlColors);

    // AVAILABILITY
    const urlAvailability = searchParams.get("availability");
    useAvailabilityFilterStore
      .getState()
      .initializeFromUrl(urlAvailability as "inStock" | "outOfStock" | null);

    // PRICE RANGE
    const urlMinPrice = searchParams.get("minPrice");
    const urlMaxPrice = searchParams.get("maxPrice");

    const min = urlMinPrice ? Number(urlMinPrice) : null;
    const max = urlMaxPrice ? Number(urlMaxPrice) : null;

    usePriceRangeFilterStore.getState().initializeFromUrl(min, max);
  }, [searchParams]);

  // ─────────────────────────────────────────────
  // CATEGORIES & SUBCATEGORIES
  // ─────────────────────────────────────────────
  useEffect(() => {
    if (!filtersData?.data?.categories) return;

    const urlCategories = searchParams.getAll("category");
    const urlSubcategories = searchParams.getAll("subcategory");

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
        categoriesWithParentId,
      );
  }, [filtersData, searchParams]);

  return null;
}
