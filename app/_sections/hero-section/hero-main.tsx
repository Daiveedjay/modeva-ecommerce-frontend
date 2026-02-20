"use client";

import { useRef, useState } from "react";
import LongArrow from "@/app/_resuseables/long-arrow";
import HeroCarousel from "@/app/_sections/hero-section/hero-carousel";
import type { CarouselApi } from "@/components/ui/carousel";
import CarouselNavButton from "@/app/_resuseables/carousel-nav-buttons";
import Link from "next/link";

export default function HeroMain() {
  const carouselRef = useRef<CarouselApi | null>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const handleReady = (api: CarouselApi) => {
    if (!api) return;
    carouselRef.current = api;

    const updateArrows = () => {
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    };

    updateArrows();
    api.on("select", updateArrows);
    api.on("reInit", updateArrows);
  };

  return (
    <div className="flex flex-col min-[1100px]:flex-row mt-10 min-[1100px]:mt-20 min-h-125 min-[1100px]:h-94 gap-10 min-[1100px]:gap-0">
      <div className="flex flex-col md:flex-1/3 h-full justify-between pr-6 gap-8 md:gap-0">
        <div className="space-y-4">
          <h1 className="section_header">
            <span>NEW</span> <br />
            <span>COLLECTION</span>
          </h1>
          <div className="tab_leading mb-8 text-sm md:text-base">
            <p>Summer</p>
            <p>2026</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-6">
          <Link
            href="/products"
            className="button py-5 cursor-pointer text-foreground px-8! bg-primary flex tracking-[0px] justify-between w-full max-[1100px]:w-100 max-[500px]:w-full text-base">
            <span>Go To Shop</span>
            <LongArrow strokeWidth={1.2} className="size-auto" />
          </Link>

          <div className="flex space-x-3 items-center">
            <CarouselNavButton
              api={carouselRef.current}
              direction="prev"
              disabled={!canScrollPrev}
            />
            <CarouselNavButton
              api={carouselRef.current}
              direction="next"
              disabled={!canScrollNext}
            />
          </div>
        </div>
      </div>

      <div className="w-full max-[1100px]:max-w-full max-w-2/3">
        <HeroCarousel onReady={handleReady} />
      </div>
    </div>
  );
}
