import { ProductResponse } from "@/lib/types/product";
import { ProductRow } from "@/app/products/[product-slug]/[id]/_components/product-row";

interface ProductsGridProps {
  products: ProductResponse[];
}

export function ProductsGrid({ products }: ProductsGridProps) {
  return (
    <div className="grid mb-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductRow key={product.id} product={product} />
      ))}
    </div>
  );
}
