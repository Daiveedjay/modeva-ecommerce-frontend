// components/filters/CategoryFilter.tsx
"use client";

import { useGetFiltersMetadata } from "@/app/_queries/filters/get-filters-metadata";
import { FilterSection } from "@/app/products/_filters/components/filter-section";
import { useFilterStore } from "@/app/products/_filters/store/use-filter-store";
import { useCategoryFilterStore } from "@/app/products/_filters/store/use-category-filter-store";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronDown, ChevronRight } from "lucide-react";
import React, { useState, useEffect } from "react";

interface Subcategory {
  id: string;
  name: string;
  parentId: string;
}

interface Category {
  id: string;
  name: string;
  subcategories?: Subcategory[];
}

// Optional: simple skeleton component
function CategoryFilterSkeleton() {
  return (
    <div className="space-y-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-4 w-32 rounded bg-muted animate-pulse" />
      ))}
    </div>
  );
}

export function CategoryFilter() {
  const {
    selectedCategories,
    selectedSubcategories,
    isExpanded,
    toggleCategory,
    toggleSubcategory,
    clearCategories,
    toggleExpanded,
  } = useCategoryFilterStore();

  const { data, isLoading, isError } = useGetFiltersMetadata();
  const { updateActiveFilters } = useFilterStore();

  // Track which categories are expanded (showing subcategories)
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set()
  );

  const hasActiveFilters =
    selectedCategories.length > 0 || selectedSubcategories.length > 0;

  const categories = (data?.data?.categories as Category[]) ?? [];

  // ✅ Update active filters whenever category data or selections change
  useEffect(() => {
    if (categories.length > 0) {
      updateActiveFilters(categories);
    }
  }, [categories, selectedCategories, selectedSubcategories, updateActiveFilters]);

  // Loading state: show skeleton inside FilterSection
  if (isLoading) {
    return (
      <FilterSection
        title="Category"
        isExpanded={isExpanded}
        onToggle={toggleExpanded}
        onClear={clearCategories}
        hasActiveFilters={hasActiveFilters}>
        <CategoryFilterSkeleton />
      </FilterSection>
    );
  }

  // Error / empty data state
  if (isError || !data?.data) {
    return (
      <FilterSection
        title="Category"
        isExpanded={isExpanded}
        onToggle={toggleExpanded}
        onClear={clearCategories}
        hasActiveFilters={hasActiveFilters}>
        <div className="text-sm text-destructive">
          Failed to load categories
        </div>
      </FilterSection>
    );
  }

  const toggleCategoryExpansion = (categoryId: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(categoryId)) {
        next.delete(categoryId);
      } else {
        next.add(categoryId);
      }
      return next;
    });
  };

  return (
    <FilterSection
      title="Category"
      isExpanded={isExpanded}
      onToggle={toggleExpanded}
      onClear={clearCategories}
      hasActiveFilters={hasActiveFilters}>
      <div className="space-y-3">
        {categories.map((category) => {
          const subcategories = category.subcategories ?? [];
          const hasSubcategories = subcategories.length > 0;
          const isCategoryExpanded = expandedCategories.has(category.id);

          return (
            <div key={category.id}>
              {/* Main Category */}
              <div className="flex items-center justify-between gap-2">
                <div className="w-min">
                  <label className="flex items-center gap-3 hover:opacity-80 transition-opacity flex-1">
                    <Checkbox
                      checked={selectedCategories.includes(category.id)}
                      onCheckedChange={() =>
                        toggleCategory(category.id, subcategories)
                      }
                      className="cursor-pointer"
                    />
                    <span className="tab_text uppercase text-foreground! cursor-pointer">
                      {category.name}
                    </span>
                  </label>
                </div>

                {/* Chevron icon - only show if has subcategories */}
                {hasSubcategories && (
                  <button
                    onClick={() => toggleCategoryExpansion(category.id)}
                    className="p-1 cursor-pointer hover:bg-primary hover:bg-muted rounded transition-colors"
                    aria-label={
                      isCategoryExpanded
                        ? "Collapse subcategories"
                        : "Expand subcategories"
                    }>
                    {isCategoryExpanded ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </button>
                )}
              </div>

              {/* Subcategories */}
              {hasSubcategories && isCategoryExpanded && (
                <div className="ml-7 mt-2 space-y-2 animate-in fade-in slide-in-from-left-2 duration-300">
                  {subcategories.map((sub) => (
                    <label
                      key={sub.id}
                      className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
                      <Checkbox
                        checked={selectedSubcategories.some(
                          (selected) => selected.id === sub.id
                        )}
                        onCheckedChange={() =>
                          toggleSubcategory(
                            sub.id,
                            sub.name,
                            sub.parentId,
                            category.name
                          )
                        }
                        className="cursor-pointer"
                      />
                      <span className="text-sm text-muted-foreground">
                        {sub.name}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </FilterSection>
  );
}