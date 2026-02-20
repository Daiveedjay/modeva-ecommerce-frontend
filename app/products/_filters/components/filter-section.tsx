// // components/filters/FilterSection.tsx
// "use client";

// import { ReactNode } from "react";
// import { ChevronRight } from "lucide-react";
// import { Button } from "@/components/ui/button";

// interface FilterSectionProps {
//   title: string;
//   isExpanded: boolean;
//   onToggle: () => void;
//   onClear?: () => void;
//   hasActiveFilters?: boolean;
//   children: ReactNode;
//   defaultExpanded?: boolean;
// }

// export function FilterSection({
//   title,
//   isExpanded,
//   onToggle,
//   onClear,
//   hasActiveFilters = false,
//   children,
// }: FilterSectionProps) {
//   return (
//     <div className="mb-6">
//       {/* Header */}
//       <div
//         className="flex items-start hover:cursor-pointer justify-between pb-4 border-b border-dashed border-border"
//         onClick={onToggle}>
//         {/* Left side: title + Active under it */}
//         <button className="flex items-center gap-2 hover:opacity-70 transition-opacity flex-1">
//           <div className="text-sm flex items-start flex-col font-semibold relative">
//             <h3 className="text-sm  font-semibold">{title}</h3>

//             {/* Active tag UNDER the text, no dead space when hidden */}
//             <div
//               className={`overflow-hidden transition-all duration-200 ease-out
//                 ${
//                   hasActiveFilters
//                     ? "max-h-6 mt-1 opacity-100 translate-y-0"
//                     : "max-h-0 mt-0 opacity-0 -translate-y-1"
//                 }`}>
//               <span className="inline-flex text-xs bg-chart-2 text-primary-foreground font-normal px-2 py-0.5 rounded-full">
//                 Active
//               </span>
//             </div>
//           </div>
//         </button>

//         {/* Right side: Clear + chevron */}
//         <div className="flex items-center gap-2 relative">
//           {onClear && (
//             <div
//               className={`overflow-hidden transition-all duration-200 ease-out
//                 ${
//                   hasActiveFilters
//                     ? "max-w-[80px] opacity-100 translate-x-0"
//                     : "max-w-0 opacity-0 translate-x-1"
//                 }`}
//               onClick={(e) => e.stopPropagation()}>
//               <Button
//                 size="sm"
//                 variant="outline"
//                 onClick={() => onClear()}
//                 className="h-6 px-2 text-xs hover:bg-destructive/10 hover:text-destructive whitespace-nowrap">
//                 Clear
//               </Button>
//             </div>
//           )}

//           <ChevronRight
//             size={20}
//             className={`transition-transform duration-300 ${
//               isExpanded ? "rotate-90" : ""
//             }`}
//           />
//         </div>
//       </div>

//       {/* Content with smooth animation */}
//       <div
//         className={`grid transition-all duration-300 ease-in-out ${
//           isExpanded
//             ? "grid-rows-[1fr] opacity-100 mt-4"
//             : "grid-rows-[0fr] opacity-0"
//         }`}>
//         <div className="overflow-hidden">{children}</div>
//       </div>
//     </div>
//   );
// }

// components/filters/FilterSection.tsx
"use client";

import { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FilterSectionProps {
  title: string;
  isExpanded: boolean;
  onToggle: () => void;
  onClear?: () => void;
  hasActiveFilters?: boolean;
  children: ReactNode;
  defaultExpanded?: boolean;
}

export function FilterSection({
  title,
  isExpanded,
  onToggle,
  onClear,
  hasActiveFilters = false,
  children,
}: FilterSectionProps) {
  return (
    <div className="mb-6">
      {/* Header */}
      <div
        className="flex items-start hover:cursor-pointer justify-between pb-4 border-b border-dashed border-border"
        onClick={onToggle}>
        {/* Left side: title + Active under it */}
        <button className="flex items-center gap-2 hover:opacity-70 transition-opacity flex-1">
          <div className="text-sm flex items-start flex-col font-semibold relative">
            <h3 className="tab_leading">{title}</h3>

            {/* Active tag UNDER the text, no dead space when hidden */}
            <div
              className={`overflow-hidden transition-all duration-200 ease-out
                ${
                  hasActiveFilters
                    ? "max-h-6 mt-1 opacity-100 translate-y-0"
                    : "max-h-0 mt-0 opacity-0 -translate-y-1"
                }`}>
              <span className="inline-flex text-xs bg-chart-2 text-primary-foreground font-normal px-2 py-0.5 rounded-full">
                Active
              </span>
            </div>
          </div>
        </button>

        {/* Right side: Clear + chevron */}
        <div className="flex items-center gap-2 relative">
          {onClear && (
            <div
              className={`overflow-hidden transition-all duration-200 ease-out
                ${
                  hasActiveFilters
                    ? "max-w-[80px] opacity-100 translate-x-0"
                    : "max-w-0 opacity-0 translate-x-1"
                }`}
              onClick={(e) => e.stopPropagation()}>
              <Button
                size="sm"
                variant="outline"
                onClick={() => onClear()}
                className="h-6 px-2 text-xs hover:bg-destructive/10 hover:text-destructive whitespace-nowrap">
                Clear
              </Button>
            </div>
          )}

          <ChevronRight
            size={20}
            className={`transition-transform duration-300 ${
              isExpanded ? "rotate-90" : ""
            }`}
          />
        </div>
      </div>

      {/* Content with smooth animation */}
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isExpanded
            ? "grid-rows-[1fr] opacity-100 mt-4"
            : "grid-rows-[0fr] opacity-0"
        }`}>
        <div className="overflow-hidden">{children}</div>
      </div>
    </div>
  );
}
