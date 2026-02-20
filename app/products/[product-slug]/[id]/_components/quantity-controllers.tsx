// import { useSingleProductStore } from "@/app/products/[product-slug]/[id]/_hooks/use-single-product-store";
// import { Minus, Plus } from "lucide-react";

// export default function QuantityControllers({
//   allVariantsSelected,
//   stockStatus,
// }: {
//   allVariantsSelected: boolean;
//   stockStatus: { inStock: boolean; quantity: number };
// }) {
//   // Store hooks
//   const { decrementQuantity, incrementQuantity, quantity } =
//     useSingleProductStore();
//   return (
//     <div>
//       <h3 className="font-semibold mb-3">Quantity</h3>
//       <div className="flex items-center gap-3 w-fit">
//         <button
//           disabled={allVariantsSelected && quantity === 1}
//           onClick={decrementQuantity}
//           className="w-10 flex justify-center items-center cursor-pointer text-center h-10 border border-border hover:bg-primary/40 transition-all active:scale-95 active:translate-y-px disabled:opacity-50 disabled:cursor-not-allowed">
//           <Minus size={14} />
//         </button>

//         <span className="w-8 text-center font-medium">{quantity}</span>

//         <button
//           onClick={() =>
//             incrementQuantity(
//               allVariantsSelected ? stockStatus.quantity : undefined
//             )
//           }
//           disabled={allVariantsSelected && quantity >= stockStatus.quantity}
//           className="w-10 flex justify-center items-center cursor-pointer h-10 border border-border transition-all hover:bg-primary/40 active:scale-95 active:translate-y-px disabled:opacity-50 disabled:cursor-not-allowed">
//           <Plus size={14} />
//         </button>
//       </div>

//       {allVariantsSelected && stockStatus.inStock && (
//         <p className="text-xs text-muted-foreground absolute top-0 left-0 mt-2">
//           {stockStatus.quantity} available
//         </p>
//       )}
//     </div>
//   );
// }

"use client";

import { useSingleProductStore } from "@/app/products/[product-slug]/[id]/_hooks/use-single-product-store";
import { Minus, Plus } from "lucide-react";

export default function QuantityControllers({
  allVariantsSelected,
  stockStatus,
}: {
  allVariantsSelected: boolean;
  stockStatus: { inStock: boolean; quantity: number };
}) {
  const { decrementQuantity, incrementQuantity, quantity } =
    useSingleProductStore();

  return (
    <div>
      <h3 className="font-semibold mb-3 text-sm sm:text-base">Quantity</h3>
      <div className="flex items-center gap-2 sm:gap-3 w-fit">
        <button
          disabled={allVariantsSelected && quantity === 1}
          onClick={decrementQuantity}
          className="w-8 sm:w-10 h-8 sm:h-10 flex justify-center items-center cursor-pointer text-center border border-border hover:bg-primary/40 transition-all active:scale-95 active:translate-y-px disabled:opacity-50 disabled:cursor-not-allowed">
          <Minus size={14} />
        </button>

        <span className="w-6 sm:w-8 text-center font-medium text-sm">
          {quantity}
        </span>

        <button
          onClick={() =>
            incrementQuantity(
              allVariantsSelected ? stockStatus.quantity : undefined
            )
          }
          disabled={allVariantsSelected && quantity >= stockStatus.quantity}
          className="w-8 sm:w-10 h-8 sm:h-10 flex justify-center items-center cursor-pointer border border-border transition-all hover:bg-primary/40 active:scale-95 active:translate-y-px disabled:opacity-50 disabled:cursor-not-allowed">
          <Plus size={14} />
        </button>
      </div>

      {allVariantsSelected && stockStatus.inStock && (
        <p className="text-xs text-muted-foreground mt-2">
          {stockStatus.quantity} available
        </p>
      )}
    </div>
  );
}
