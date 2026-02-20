"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { CarouselApi } from "@/components/ui/carousel";
import React from "react";

type CarouselNavButtonProps = {
  /** Carousel instance */
  api?: CarouselApi | null;
  /** Direction to scroll */
  direction: "prev" | "next";
  /** Optional custom icon */
  icon?: React.ReactNode;
  /** Optional custom className for the button */
  className?: string;
  /** Whether the button is disabled */
  disabled?: boolean;
};

export default function CarouselNavButton({
  api,
  direction,
  icon,
  className = "",
  disabled,
}: CarouselNavButtonProps) {
  const handleClick = () => {
    if (!api) return;
    direction === "prev" ? api.scrollPrev() : api.scrollNext();
  };

  const Icon =
    icon ||
    (direction === "prev" ? (
      <ChevronLeft
        size={20}
        className={`transition-colors ${
          disabled ? "text-muted-foreground" : "text-black"
        }`}
      />
    ) : (
      <ChevronRight
        size={20}
        className={`transition-colors ${
          disabled ? "text-muted-foreground" : "text-black"
        }`}
      />
    ));

  return (
    <Button
      variant="ghost"
      className={`h-full rounded-none ${className}`}
      onClick={handleClick}
      disabled={disabled}>
      {Icon}
    </Button>
  );
}
