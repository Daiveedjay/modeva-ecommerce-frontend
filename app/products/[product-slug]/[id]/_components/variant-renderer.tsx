"use client";

import { useGetProductById } from "@/app/_queries/products/get-product-by-id";

import { useSingleProductStore } from "@/app/products/[product-slug]/[id]/_hooks/use-single-product-store";
import { ColorSelector } from "@/app/products/[product-slug]/[id]/_components/color-selector";
import { SizeSelector } from "@/app/products/[product-slug]/[id]/_components/size-selector";
import { TextVariantSelector } from "@/app/products/[product-slug]/[id]/_components/text-variant-selector";
import { useParams } from "next/navigation";
import { getAvailableOptions, Variant } from "@/lib/types/product";

export function VariantRenderer() {
  const {
    variant_selections,

    setVariant,
  } = useSingleProductStore();

  const { id } = useParams<{ id: string }>();
  const { data, error, isLoading, isPending, refetch } = useGetProductById(
    id,
    !!id,
  );

  const product = data?.data;

  const { variants, inventory } = product || { variants: [], inventory: [] };

  const renderVariant = (variant: Variant) => {
    const { type, options } = variant;
    const selected = variant_selections[type] || null;

    const availableOptions = getAvailableOptions(
      type,
      variant_selections,
      inventory,
      variants,
    );

    const disabledOptions = options.filter(
      (opt) => !availableOptions.includes(opt),
    );

    const normalizedType = type.toLowerCase();

    if (normalizedType === "color" || normalizedType === "colour") {
      return (
        <ColorSelector
          key={type}
          options={options}
          selected={selected}
          onSelect={(value) => setVariant(type, value)}
          disabled={disabledOptions}
        />
      );
    }

    if (normalizedType === "size") {
      return (
        <SizeSelector
          key={type}
          options={options}
          selected={selected}
          onSelect={(value) => setVariant(type, value)}
          disabled={disabledOptions}
        />
      );
    }

    if (
      normalizedType === "material" ||
      normalizedType === "fabric" ||
      normalizedType === "finish"
    ) {
      return (
        <TextVariantSelector
          key={type}
          label={type}
          options={options}
          selected={selected}
          onSelect={(value) => setVariant(type, value)}
          disabled={disabledOptions}
          columns={3}
        />
      );
    }

    if (
      normalizedType === "style" ||
      normalizedType === "fit" ||
      normalizedType === "cut"
    ) {
      return (
        <TextVariantSelector
          key={type}
          label={type}
          options={options}
          selected={selected}
          onSelect={(value) => setVariant(type, value)}
          disabled={disabledOptions}
          columns={2}
        />
      );
    }

    return (
      <TextVariantSelector
        key={type}
        label={type}
        options={options}
        selected={selected}
        onSelect={(value) => setVariant(type, value)}
        disabled={disabledOptions}
        columns={4}
      />
    );
  };

  return (
    <div className="space-y-6">
      {variants.map((variant) => renderVariant(variant))}
    </div>
  );
}
