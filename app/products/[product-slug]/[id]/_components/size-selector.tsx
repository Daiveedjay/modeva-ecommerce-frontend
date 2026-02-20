// components/product/variant-selectors/SizeSelector.tsx
"use client";

import { cn } from "@/lib/utils";

interface SizeSelectorProps {
  options: string[];
  selected: string | null;
  onSelect: (size: string) => void;
  disabled?: string[];
  className?: string;
}

export function SizeSelector({
  options,
  selected,
  onSelect,
  disabled = [],
  className,
}: SizeSelectorProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold">Size</h3>
      </div>
      <div className={cn("grid grid-cols-6 gap-2", className)}>
        {options.map((size) => {
          const isDisabled = disabled.includes(size);
          const isSelected = selected === size;

          return (
            <button
              key={size}
              onClick={() => !isDisabled && onSelect(size)}
              disabled={isDisabled}
              className={cn(
                "py-2 px-3 border cursor-pointer font-medium transition-all",
                "active:scale-95 active:translate-y-px",
                "hover:bg-primary hover:border-primary",
                isSelected && [
                  "border-primary bg-foreground text-primary-foreground",
                  "hover:bg-foreground",
                ],
                !isSelected && "border-border",
                isDisabled && [
                  "opacity-40 cursor-not-allowed",
                  "hover:bg-transparent hover:border-border",
                  "line-through",
                ]
              )}
              aria-label={`Select size ${size}`}
              aria-pressed={isSelected}>
              {size}
            </button>
          );
        })}
      </div>
    </div>
  );
}
