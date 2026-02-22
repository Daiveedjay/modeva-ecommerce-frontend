import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export function useProductsSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const searchTerm = searchParams.get("q") ?? "";
  const [inputValue, setInputValue] = useState(searchTerm);
  const isSearching = !!searchTerm;

  const handleSearch = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;

    const params = new URLSearchParams(searchParams);
    params.set("q", trimmed);
    params.delete("page");
    router.push(`?${params.toString()}`, { scroll: false });
  };

  // Used by the search bar X button — clears q from URL, keeps filters
  const handleClearSearchWithNav = () => {
    setInputValue("");
    const params = new URLSearchParams(searchParams);
    params.delete("q");
    params.delete("page");
    router.push(`?${params.toString()}`, { scroll: false });
  };

  // Used when caller owns navigation (e.g. ProductsEmptyState)
  const handleClearSearch = () => {
    setInputValue("");
  };

  return {
    inputValue,
    setInputValue,
    searchTerm,
    isSearching,
    handleSearch,
    handleClearSearch,
    handleClearSearchWithNav,
  };
}
