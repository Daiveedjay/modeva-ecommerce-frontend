import { ProductResponse } from "@/lib/types/product";
import { formatCurrency, slugify } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export const ProductRow = ({ product }: { product: ProductResponse }) => {
  return (
    <Link
      href={`/products/${slugify(product.name)}/${product.id}`}
      key={product.id}
      className="group cursor-pointer">
      {/* Product Image */}
      <div className="mb-4 relative border border-border bg-muted overflow-hidden aspect-square">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className="w-full aspect-square h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Product Info */}
      <div className="space-y-2">
        <div className="flex justify-between">
          <h3 className="font-medium w-2/3 tracking-[0] font-beatrice-deck text-foreground">
            {product.name
              .toLowerCase()
              .split(" ")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}
          </h3>
          <p className="text-lg tracking-[0px] w-1/3 text-right font-medium text-foreground">
            {formatCurrency(product.price)}
          </p>
        </div>
      </div>
    </Link>
  );
};
