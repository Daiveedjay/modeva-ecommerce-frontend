import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export function useProductsSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // searchTerm lives in the URL — useProductsFromUrl picks it up automatically
  const searchTerm = searchParams.get("q") ?? "";

  // inputValue is local — we don't push every keystroke to the URL
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

  const handleClearSearch = () => {
    setInputValue("");

    const params = new URLSearchParams(searchParams);
    params.delete("q");
    params.delete("page");
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return {
    inputValue,
    setInputValue,
    searchTerm,
    isSearching,
    handleSearch,
    handleClearSearch,
  };
}
