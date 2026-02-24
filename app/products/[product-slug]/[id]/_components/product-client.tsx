"use client";

import { useGetProductById } from "@/app/_queries/products/get-product-by-id";
import ActionButtons from "@/app/products/[product-slug]/[id]/_components/action-buttons";
import AdditionalInfo from "@/app/products/[product-slug]/[id]/_components/additional-info";
import FavouritesButton from "@/app/products/[product-slug]/[id]/_components/favourites-button";
import ImageGallery from "@/app/products/[product-slug]/[id]/_components/image-gallery";
import QuantityControllers from "@/app/products/[product-slug]/[id]/_components/quantity-controllers";
import { SingleProductError } from "@/app/products/[product-slug]/[id]/_components/single-product-error";
import { SingleProductSkeleton } from "@/app/products/[product-slug]/[id]/_components/single-product-skeleton";
import { VariantRenderer } from "@/app/products/[product-slug]/[id]/_components/variant-renderer";
import { useSingleProductStore } from "@/app/products/[product-slug]/[id]/_hooks/use-single-product-store";
import { MultiSelectModal } from "@/app/products/[product-slug]/[id]/_modals/multi-select-modal";
import { isInStock } from "@/lib/types/product";
import { formatCurrency } from "@/lib/utils";
import { useParams } from "next/navigation";
import { useMemo } from "react";

export default function ProductClient() {
  const { id } = useParams<{ id: string }>();
  const { data, error, isLoading, isPending, refetch } = useGetProductById(
    id,
    true,
  );

  const product = data?.data;
  const { variant_selections, is_multi_select_open, closeMultiSelect } =
    useSingleProductStore();

  const stockStatus = useMemo(() => {
    if (!product) return { inStock: false, quantity: 0 };
    return isInStock(variant_selections, product.inventory, product.variants);
  }, [variant_selections, product]);

  const allVariantsSelected = useMemo(() => {
    if (!product) return false;
    return product.variants.every((v) => variant_selections[v.type]);
  }, [variant_selections, product]);

  const sortedMedia = useMemo(() => {
    if (!product) return [];
    return [...product.media.other].sort((a, b) => a.order - b.order);
  }, [product]);

  if (isLoading || isPending) return <SingleProductSkeleton />;
  if (error || !product) return <SingleProductError onRetry={refetch} />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-20">
        <ImageGallery
          product_name={product.name}
          product_primary_image={product.media.primary.url}
          sortedMedia={sortedMedia}
        />

        <div className="space-y-6 relative border border-border p-6 sm:p-8 lg:p-10 flex-1">
          <div>
            <h1 className="text-2xl sm:text-4xl font-medium mb-2">
              {product.name}
            </h1>
            <p className="text-xl sm:text-2xl font-medium">
              {formatCurrency(product.price)}
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground">
              MRP excl. of all taxes
            </p>
          </div>

          <p className="text-sm sm:text-base text-foreground leading-relaxed">
            {product.description}
          </p>

          <VariantRenderer />

          <QuantityControllers
            allVariantsSelected={allVariantsSelected}
            stockStatus={stockStatus}
          />

          <ActionButtons
            product_name={product.name}
            product_id={product.id}
            product_image={product.media.primary.url}
            inventory={product.inventory}
            price={product.price}
            allVariantsSelected={allVariantsSelected}
            stockStatus={stockStatus}
          />

          <MultiSelectModal
            isOpen={is_multi_select_open}
            onClose={closeMultiSelect}
          />

          <AdditionalInfo
            allVariantsSelected={allVariantsSelected}
            stockStatus={stockStatus}
          />

          <FavouritesButton
            product_id={product.id}
            product_name={product.name}
            price={product.price}
            image_url={product.media.primary.url}
          />
        </div>
      </div>
    </div>
  );
}
