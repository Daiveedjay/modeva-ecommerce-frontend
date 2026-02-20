import { useProductsFromUrl } from "@/app/_queries/products/get-products";
import { useProductsSearch } from "./use-products-search";

export function useProductsData() {
  // All data comes from a single source — useProductsFromUrl reads q from the URL
  const { data, isLoading, isError, isFetching, refetch } =
    useProductsFromUrl();
  const search = useProductsSearch();

  return {
    data,
    isLoading,
    isError,
    isFetching,
    refetch,
    ...search,
  };
}
