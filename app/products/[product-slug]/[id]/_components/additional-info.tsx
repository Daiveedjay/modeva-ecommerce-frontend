// import { useSingleProductStore } from "@/app/products/[product-slug]/[id]/_hooks/use-single-product-store";

// export default function AdditionalInfo({
//   allVariantsSelected,
//   stockStatus,
// }: {
//   allVariantsSelected: boolean;
//   stockStatus: { inStock: boolean; quantity: number };
// }) {
//   const variant_selections = useSingleProductStore(
//     (store) => store.variant_selections
//   );
//   return (
//     <div className="border-t pt-6 space-y-3 text-sm">
//       <div className="flex justify-between">
//         <span className="text-muted-foreground">Availability</span>
//         {!allVariantsSelected ? (
//           <span className="font-medium text-muted-foreground">
//             Select options
//           </span>
//         ) : stockStatus.inStock ? (
//           <span className="font-medium text-green-600">
//             In Stock ({stockStatus.quantity} available)
//           </span>
//         ) : (
//           <span className="font-medium text-red-600">Out of Stock</span>
//         )}
//       </div>

//       {Object.keys(variant_selections).length > 0 && (
//         <div className="flex justify-between">
//           <span className="text-muted-foreground">Selected</span>
//           <span className="font-medium">
//             {Object.entries(variant_selections)
//               .filter(([_, value]) => value)
//               .map(([_, value]) => value)
//               .join(" / ")}
//           </span>
//         </div>
//       )}
//     </div>
//   );
// }

import { useSingleProductStore } from "@/app/products/[product-slug]/[id]/_hooks/use-single-product-store";

export default function AdditionalInfo({
  allVariantsSelected,
  stockStatus,
}: {
  allVariantsSelected: boolean;
  stockStatus: { inStock: boolean; quantity: number };
}) {
  const variant_selections = useSingleProductStore(
    (store) => store.variant_selections
  );

  return (
    <div className="border-t pt-6 space-y-3 text-xs sm:text-sm">
      <div className="flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-0">
        <span className="text-muted-foreground">Availability</span>
        {!allVariantsSelected ? (
          <span className="font-medium text-muted-foreground">
            Select options
          </span>
        ) : stockStatus.inStock ? (
          <span className="font-medium text-green-600">
            In Stock ({stockStatus.quantity} available)
          </span>
        ) : (
          <span className="font-medium text-red-600">Out of Stock</span>
        )}
      </div>

      {Object.keys(variant_selections).length > 0 && (
        <div className="flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-0">
          <span className="text-muted-foreground">Selected</span>
          <span className="font-medium">
            {Object.entries(variant_selections)
              .filter(([_, value]) => value)
              .map(([_, value]) => value)
              .join(" / ")}
          </span>
        </div>
      )}
    </div>
  );
}
