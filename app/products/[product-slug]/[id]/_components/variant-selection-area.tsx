// "use client";

// import { useEffect, useRef } from "react";
// import { useMultiSelectStore } from "@/app/products/[product-slug]/[id]/_hooks/use-multi-select-store";
// import type { VariantCombination } from "@/app/products/[product-slug]/[id]/_modals/multi-select-modal";
// import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
// import { formatCurrency } from "@/lib/utils";
// import { X } from "lucide-react";

// export default function VariantSelectionArea({
//   allCombinations,
// }: {
//   allCombinations: VariantCombination[];
// }) {
//   const { updateQuantity, selected_variants } = useMultiSelectStore();
//   const entries = Object.entries(selected_variants);

//   // Wrapper ref (so this works even if your ScrollArea wrapper does not forward refs)
//   const wrapperRef = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     const root = wrapperRef.current;
//     if (!root) return;

//     const viewport = root.querySelector<HTMLElement>(
//       "[data-radix-scroll-area-viewport]"
//     );
//     if (!viewport) return;

//     const onWheel = (e: WheelEvent) => {
//       // Only on <lg screens (Tailwind lg is 1024px)
//       if (window.matchMedia("(min-width: 1024px)").matches) return;

//       // Only hijack when we actually have horizontal overflow
//       const hasXOverflow = viewport.scrollWidth > viewport.clientWidth;
//       if (!hasXOverflow) return;

//       // Do not hijack if the viewport also needs vertical scrolling
//       const hasYOverflow = viewport.scrollHeight > viewport.clientHeight;
//       if (hasYOverflow) return;

//       // Let shift + wheel behave normally (some users expect this)
//       if (e.shiftKey) return;

//       // If this is already a horizontal gesture (trackpad), let the browser handle it
//       if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;

//       e.preventDefault();
//       viewport.scrollLeft += e.deltaY;
//     };

//     viewport.addEventListener("wheel", onWheel, { passive: false });
//     return () => viewport.removeEventListener("wheel", onWheel);
//   }, []);

//   return (
//     <div ref={wrapperRef} className="flex-1 min-h-min min-w-0">
//       <ScrollArea type="auto" className="h-full min-w-0">
//         <div className="p-4 sm:p-6 md:p-8 lg:p-10">
//           {entries.length === 0 ? (
//             <div className="py-16 sm:py-20 text-center">
//               <p className="text-xs sm:text-sm uppercase tracking-[0.25em] text-muted-foreground/50 font-black">
//                 Selection is empty
//               </p>
//             </div>
//           ) : (
//             <div
//               className="
//                 flex w-max gap-3 pb-2

//                 lg:w-full lg:flex-col lg:gap-4
//               ">
//               {entries.map(([variant_name, qty]) => {
//                 const combo = allCombinations.find(
//                   (c) => c.variant_name === variant_name
//                 );
//                 if (!combo) return null;

//                 return (
//                   <div
//                     key={variant_name}
//                     className="
//                       shrink-0 min-w-55
//                       flex flex-col gap-2
//                        border border-border/30 bg-white/70 p-3
//                       animate-in fade-in slide-in-from-right-4

//                       lg:min-w-0 lg:flex-row lg:items-center lg:justify-between
//                       lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0
//                     ">
//                     <div className="space-y-0.5 min-w-0">
//                       <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.5px] truncate">
//                         {variant_name}
//                       </p>
//                       <p className="text-[9px] sm:text-xs uppercase tracking-widest text-muted-foreground">
//                         {qty} × {formatCurrency(combo.price)}
//                       </p>
//                     </div>

//                     <div className="flex items-center gap-3 shrink-0">
//                       <span className="text-xs sm:text-sm font-medium tabular-nums tracking-tighter">
//                         {formatCurrency(combo.price * qty)}
//                       </span>
//                       <button
//                         onClick={() => updateQuantity(variant_name, 0)}
//                         className="p-1 text-destructive hover:bg-destructive/10 transition-colors hover:cursor-pointer">
//                         <X className="h-3 w-3" />
//                       </button>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </div>

//         {/* Horizontal scrolling indicator on small screens */}
//         <ScrollBar orientation="horizontal" className="lg:hidden" />

//         {/* Optional: show a vertical scrollbar on lg if the list gets tall */}
//         <ScrollBar orientation="vertical" className="hidden lg:flex" />
//       </ScrollArea>
//     </div>
//   );
// }

// //////////TODO
// "use client";

// import { useEffect, useRef } from "react";
// import { useMultiSelectStore } from "@/app/products/[product-slug]/[id]/_hooks/use-multi-select-store";
// import type { VariantCombination } from "@/app/products/[product-slug]/[id]/_modals/multi-select-modal";
// import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
// import { formatCurrency } from "@/lib/utils";
// import { X } from "lucide-react";

// export default function VariantSelectionArea({
//   allCombinations,
// }: {
//   allCombinations: VariantCombination[];
// }) {
//   const { updateQuantity, selected_variants } = useMultiSelectStore();
//   const entries = Object.entries(selected_variants);

//   const wrapperRef = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     const root = wrapperRef.current;
//     if (!root) return;

//     const viewport = root.querySelector<HTMLElement>(
//       "[data-radix-scroll-area-viewport]"
//     );
//     if (!viewport) return;

//     const onWheel = (e: WheelEvent) => {
//       if (window.matchMedia("(min-width: 1024px)").matches) return;

//       const hasXOverflow = viewport.scrollWidth > viewport.clientWidth;
//       if (!hasXOverflow) return;

//       const hasYOverflow = viewport.scrollHeight > viewport.clientHeight;
//       if (hasYOverflow) return;

//       if (e.shiftKey) return;
//       if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;

//       e.preventDefault();
//       viewport.scrollLeft += e.deltaY;
//     };

//     viewport.addEventListener("wheel", onWheel, { passive: false });
//     return () => viewport.removeEventListener("wheel", onWheel);
//   }, []);

//   return (
//     <div ref={wrapperRef} className="flex-1 min-h-min min-w-0">
//       <ScrollArea type="auto" className="h-full min-w-0">
//         <div className="p-4 sm:p-6 md:p-8 lg:p-10">
//           {entries.length === 0 ? (
//             <div className="py-16 sm:py-20 text-center">
//               <p className="text-xs sm:text-sm uppercase tracking-[0.25em] text-muted-foreground/50 font-black">
//                 Selection is empty
//               </p>
//             </div>
//           ) : (
//             <div
//               className="
//                 flex w-max gap-3
//                 pb-0 sm:pb-2

//                 lg:w-full lg:flex-col lg:gap-4
//               ">
//               {entries.map(([variant_name, qty]) => {
//                 const combo = allCombinations.find(
//                   (c) => c.variant_name === variant_name
//                 );
//                 if (!combo) return null;

//                 return (
//                   <div
//                     key={variant_name}
//                     className="
//                       shrink-0 min-w-55
//                       flex flex-col gap-2
//                       border border-border/30 bg-white/70 p-3
//                       animate-in fade-in slide-in-from-right-4

//                       lg:min-w-0 lg:flex-row lg:items-center lg:justify-between
//                       lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0
//                     ">
//                     <div className="space-y-0.5 min-w-0">
//                       <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.5px] truncate">
//                         {variant_name}
//                       </p>
//                       <p className="text-[9px] sm:text-xs uppercase tracking-widest text-muted-foreground">
//                         {qty} × {formatCurrency(combo.price)}
//                       </p>
//                     </div>

//                     <div className="flex items-center gap-3 shrink-0">
//                       <span className="text-xs sm:text-sm font-medium tabular-nums tracking-tighter">
//                         {formatCurrency(combo.price * qty)}
//                       </span>
//                       <button
//                         onClick={() => updateQuantity(variant_name, 0)}
//                         className="p-1 text-destructive hover:bg-destructive/10 transition-colors hover:cursor-pointer">
//                         <X className="h-3 w-3" />
//                       </button>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </div>

//         {/* Overlay the horizontal scrollbar so it doesn't add bottom "space" */}
//         <ScrollBar
//           orientation="horizontal"
//           className="lg:hidden absolute left-0 right-0 bottom-0"
//         />

//         <ScrollBar orientation="vertical" className="hidden lg:flex" />
//       </ScrollArea>
//     </div>
//   );
// }

"use client";

import { useEffect, useRef } from "react";
import { useMultiSelectStore } from "@/app/products/[product-slug]/[id]/_hooks/use-multi-select-store";
import type { VariantCombination } from "@/app/products/[product-slug]/[id]/_modals/multi-select-modal";
import { formatCurrency } from "@/lib/utils";
import { X } from "lucide-react";

export default function VariantSelectionArea({
  allCombinations,
}: {
  allCombinations: VariantCombination[];
}) {
  const { updateQuantity, selected_variants } = useMultiSelectStore();
  const entries = Object.entries(selected_variants);

  const scrollerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      // Only below lg (1024px)
      if (window.matchMedia("(min-width: 1024px)").matches) return;

      const hasXOverflow = el.scrollWidth > el.clientWidth;
      if (!hasXOverflow) return;

      // Respect common expectations
      if (e.shiftKey) return;
      if (e.ctrlKey) return;

      // If already horizontal (trackpad), do not hijack
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;

      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  return (
    // Key change: no flex-1 on small screens
    <div className="shrink-0 min-w-0 lg:flex-1 lg:min-h-0">
      <div
        ref={scrollerRef}
        className="
          min-w-0
          overflow-x-auto overflow-y-hidden
          overscroll-x-contain

          lg:h-full
          lg:overflow-y-auto lg:overflow-x-hidden

          lg:[scrollbar-gutter:stable]
        ">
        <div className="p-4 sm:p-6 md:p-8 lg:p-10">
          {entries.length === 0 ? (
            <div className="py-16 sm:py-20 text-center">
              <p className="text-xs sm:text-sm uppercase tracking-[0.25em] text-muted-foreground/50 font-black">
                Selection is empty
              </p>
            </div>
          ) : (
            <div
              className="
                flex w-max gap-3
                pb-0

                lg:w-full lg:flex-col lg:gap-4
              ">
              {entries.map(([variant_name, qty]) => {
                const combo = allCombinations.find(
                  (c) => c.variant_name === variant_name
                );
                if (!combo) return null;

                return (
                  <div
                    key={variant_name}
                    className="
                      shrink-0 min-w-55
                      flex flex-col gap-2
                      border border-border/30 bg-white/70 p-3
                      animate-in fade-in slide-in-from-right-4

                      lg:min-w-0 lg:flex-row lg:items-center lg:justify-between
                      lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0
                    ">
                    <div className="space-y-0.5 min-w-0">
                      <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.5px] truncate">
                        {variant_name}
                      </p>
                      <p className="text-[9px] sm:text-xs uppercase tracking-widest text-muted-foreground">
                        {qty} × {formatCurrency(combo.price)}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-xs sm:text-sm font-medium tabular-nums tracking-tighter">
                        {formatCurrency(combo.price * qty)}
                      </span>
                      <button
                        onClick={() => updateQuantity(variant_name, 0)}
                        className="p-1 text-destructive hover:bg-destructive/10 transition-colors hover:cursor-pointer">
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
