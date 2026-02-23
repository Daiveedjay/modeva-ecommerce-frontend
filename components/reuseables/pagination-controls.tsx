"use client";

import { Spinner } from "@/components/reuseables/spinner";
import { Button } from "@/components/ui/button";
import { ApiResponse } from "@/lib/types";
import { usePathname, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

type PaginationControlsProps<T> = {
  data: ApiResponse<T[]> | undefined;
  setPage: (page: number) => void;
  isFetching: boolean;
};

export function PaginationControls<T>({
  data,
  setPage,
  isFetching,
}: PaginationControlsProps<T>) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (!data?.meta) return null;

  const { page: current_page, total_pages } = data.meta;

  const updatePageInstant = (page: number) => {
    // update state (triggers React Query refetch)
    setPage(page);

    // update search params WITHOUT triggering Next.js router delay
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));

    const href = `${pathname}?${params.toString()}`;

    // instantly update URL (no RSC)
    window.history.pushState(null, "", href);
  };

  // Calculate visible page numbers for mobile
  const getVisiblePages = () => {
    const maxVisible = 3;

    if (total_pages <= maxVisible) {
      return Array.from({ length: total_pages }, (_, i) => i + 1);
    }

    // Sliding window centered around current page
    let start = Math.max(1, current_page - 1);
    let end = start + maxVisible - 1;

    // If we overflow the total pages, shift back
    if (end > total_pages) {
      end = total_pages;
      start = end - maxVisible + 1;
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const visiblePages = getVisiblePages();
  const allPages = Array.from({ length: total_pages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center mt-4 gap-1 md:gap-2">
      {/* Previous Button */}
      <Button
        variant="outline"
        size="sm"
        className="disabled:cursor-not-allowed button h-8 md:h-10 px-2 md:px-4"
        onClick={() => updatePageInstant(Math.max(current_page - 1, 1))}
        disabled={current_page === 1}>
        <ChevronLeft className="h-4 w-4 md:hidden" />
        <span className="hidden md:inline">Previous</span>
      </Button>

      {/* Page number buttons - Mobile (3 pages max) */}
      <div className="flex md:hidden gap-1">
        {current_page > 2 && total_pages > 3 && (
          <>
            <Button
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => updatePageInstant(1)}
              variant="outline">
              1
            </Button>
            {current_page > 3 && (
              <span className="flex items-center px-1 text-sm text-muted-foreground">
                ...
              </span>
            )}
          </>
        )}

        {visiblePages.map((p) => (
          <Button
            key={p}
            size="sm"
            className={`h-8 w-8 p-0 ${p === current_page ? "bg-foreground" : ""}`}
            onClick={() => updatePageInstant(p)}
            variant={p === current_page ? "default" : "outline"}>
            {p}
          </Button>
        ))}

        {current_page < total_pages - 1 && total_pages > 3 && (
          <>
            {current_page < total_pages - 2 && (
              <span className="flex items-center px-1 text-sm text-muted-foreground">
                ...
              </span>
            )}
            <Button
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => updatePageInstant(total_pages)}
              variant="outline">
              {total_pages}
            </Button>
          </>
        )}
      </div>

      {/* Page number buttons - Desktop (all pages) */}
      <div className="hidden md:flex gap-2">
        {allPages.map((p) => (
          <Button
            key={p}
            size="sm"
            className={`h-10 min-w-10 ${p === current_page ? "bg-foreground" : ""}`}
            onClick={() => updatePageInstant(p)}
            variant={p === current_page ? "default" : "outline"}>
            {p}
          </Button>
        ))}
      </div>

      {/* Next Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={() =>
          updatePageInstant(Math.min(current_page + 1, total_pages))
        }
        className="disabled:cursor-not-allowed button h-8 md:h-10 px-2 md:px-4"
        disabled={current_page === total_pages}>
        <ChevronRight className="h-4 w-4 md:hidden" />
        <span className="hidden md:inline">Next</span>
      </Button>

      {/* Loading Spinner */}
      {isFetching && (
        <span className="ml-1 md:ml-2">
          <Spinner className="h-4 w-4" />
        </span>
      )}
    </div>
  );
}
