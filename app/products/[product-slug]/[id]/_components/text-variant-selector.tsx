// components/product/variant-selectors/TextVariantSelector.tsx
"use client";

import { cn } from "@/lib/utils";

interface TextVariantSelectorProps {
  label: string;
  options: string[];
  selected: string | null;
  onSelect: (value: string) => void;
  disabled?: string[];
  className?: string;
  columns?: number;
}

export function TextVariantSelector({
  label,
  options,
  selected,
  onSelect,
  disabled = [],
  className,
  columns = 4,
}: TextVariantSelectorProps) {
  return (
    <div>
      <h3 className="font-semibold mb-3">{label}</h3>
      <div
        className={cn("grid gap-2", className)}
        style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
        {options.map((option) => {
          const isDisabled = disabled.includes(option);
          const isSelected = selected === option;

          return (
            <button
              key={option}
              onClick={() => !isDisabled && onSelect(option)}
              disabled={isDisabled}
              className={cn(
                "py-2 px-4 border font-medium transition-all text-sm",
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
              aria-label={`Select ${option}`}
              aria-pressed={isSelected}>
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}
