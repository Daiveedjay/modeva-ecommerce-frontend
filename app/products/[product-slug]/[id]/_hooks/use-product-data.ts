import { useProductsFromUrl } from "@/app/_queries/products/get-products";
import { useProductsSearch } from "./use-products-search";

export function useProductsData() {
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
