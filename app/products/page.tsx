import ProductContent from "@/app/products/[product-slug]/[id]/_components/product-content";
import ProductFilters from "@/app/products/[product-slug]/[id]/_components/product-filters";

export default function ProductsPage() {
  return (
    <div className=" page_spacing">
      <div className=" flex  gap-20 relative">
        <ProductFilters />
        <ProductContent />
      </div>
      <div className=" p-12"></div>
    </div>
  );
}
