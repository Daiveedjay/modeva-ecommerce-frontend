// components/product/variant-selectors/ColorSelector.tsx
"use client";

import { getColorHex } from "@/lib/types/product";
import { cn } from "@/lib/utils";

interface ColorSelectorProps {
  options: string[];
  selected: string | null;
  onSelect: (color: string) => void;
  disabled?: string[];
  className?: string;
}

export function ColorSelector({
  options,
  selected,
  onSelect,
  disabled = [],
  className,
}: ColorSelectorProps) {
  return (
    <div>
      <h3 className="font-semibold mb-3">Color</h3>
      <div className={cn("flex gap-3 flex-wrap", className)}>
        {options.map((color) => {
          const isDisabled = disabled.includes(color);
          const isSelected = selected === color;

          return (
            <button
              key={color}
              onClick={() => !isDisabled && onSelect(color)}
              disabled={isDisabled}
              className={cn(
                "w-10 h-10  border-2 cursor-pointer transition-all relative",
                "active:scale-95 active:translate-y-px",
                isSelected && [
                  "border-primary ring-2 ring-primary ring-offset-2",
                ],
                !isSelected && "border-border hover:border-primary",
                isDisabled && [
                  "opacity-40 cursor-not-allowed hover:border-border",
                  "before:absolute before:inset-0",
                  "before:bg-[linear-gradient(45deg,transparent_40%,#ff0000_40%,#ff0000_60%,transparent_60%)]",
                ],
              )}
              style={{ backgroundColor: getColorHex(color) }}
              title={color}
              aria-label={`Select ${color} color`}
              aria-pressed={isSelected}
            />
          );
        })}
      </div>
    </div>
  );
}
