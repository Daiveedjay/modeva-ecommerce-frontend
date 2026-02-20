"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ProductsGridSkeleton } from "@/app/products/[product-slug]/[id]/_components/product-skeleton";
import { ProductsErrorState } from "@/app/products/[product-slug]/[id]/_components/product-error-state";
import { ProductsEmptyState } from "@/app/products/[product-slug]/[id]/_components/product-empty-state";
import { PaginationControls } from "@/components/reuseables/pagination-controls";
import { SyncFiltersFromUrl } from "@/app/products/_filters/components/sync-filters-from-url";
import { ProductResponse } from "@/lib/types/product";
import Link from "next/link";
import { useProductsData } from "@/app/products/[product-slug]/[id]/_hooks/use-product-data";
import { ProductsSearchBar } from "@/app/products/[product-slug]/[id]/_components/products-search-bar";
import { ProductStyleFilters } from "@/app/products/[product-slug]/[id]/_components/product-style-filters";
import { ProductsGrid } from "@/app/products/[product-slug]/[id]/_components/products-grid";
import { Spinner } from "@/components/reuseables/spinner";

export const dynamic = "force-dynamic";

export default function ProductsPage() {
  return (
    <div className="flex-5">
      <div className="tab_leading text-muted-foreground mb-4">
        <Link href="/">Home</Link> /{" "}
        <span className="text-foreground">Products</span>
      </div>

      <h1 className="tab_header mb-8">PRODUCTS</h1>

      <Suspense fallback={<ProductsGridSkeleton count={6} />}>
        <SyncFiltersFromUrl />
        <ProductsPageContent />
      </Suspense>
    </div>
  );
}

function ProductsPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    data,
    isLoading,
    isError,
    isFetching,
    refetch,
    inputValue,
    setInputValue,
    searchTerm,
    isSearching,
    handleSearch,
    handleClearSearch,
  } = useProductsData();

  const setPage = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(newPage));
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <>
      <ProductsSearchBar
        value={inputValue}
        onChange={setInputValue}
        onSearch={handleSearch}
        onClear={handleClearSearch}
        isSearching={isSearching}
      />

      {!isSearching && <ProductStyleFilters />}

      {isSearching && (
        <p className="text-muted-foreground mb-6">
          Showing search results for{" "}
          <span className="text-foreground font-medium">"{searchTerm}"</span>
          {isFetching && <Spinner />}
        </p>
      )}

      {isLoading && <ProductsGridSkeleton count={6} />}

      {isError && <ProductsErrorState onRetry={refetch} />}

      {!isLoading && !isError && data?.data?.length === 0 && (
        <ProductsEmptyState onclick={handleClearSearch} />
      )}

      {!isLoading && !isError && data?.data && data.data.length > 0 && (
        <ProductsGrid products={data.data} />
      )}

      {data?.meta && (
        <div className="flex justify-end">
          <PaginationControls<ProductResponse>
            data={data}
            setPage={setPage}
            isFetching={isFetching}
          />
        </div>
      )}
    </>
  );
}
