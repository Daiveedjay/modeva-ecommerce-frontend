"use client";

import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1746730921374-ab56549262f3?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "The New Collection",
    subtitle: "Autumn/Winter 2025",
  },
  {
    image:
      "https://images.unsplash.com/photo-1746730921416-f8e3f835938e?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Refined Minimalism",
    subtitle: "Timeless Essentials",
  },
  {
    image:
      "https://images.unsplash.com/photo-1746730921601-93229f28457b?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Tailored Excellence",
    subtitle: "Bespoke Menswear",
  },
  {
    image:
      "https://images.unsplash.com/photo-1763957047572-676433291f7d?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Statement Pieces",
    subtitle: "Accessories Edit",
  },
];

export function ImageCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextSlide = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setIsTransitioning(false);
    }, 500);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Background images */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000",
            index === currentSlide ? "opacity-100" : "opacity-0"
          )}>
          <img
            src={slide.image || "/placeholder.svg"}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-linear-to-r from-foreground/40 via-foreground/20 to-transparent" />
          <div className="absolute inset-0 bg-linear-to-t from-foreground/60 via-transparent to-foreground/20" />
        </div>
      ))}

      {/* Content overlay */}
      <div className="absolute inset-0 flex flex-col justify-between p-8 lg:p-12 text-background">
        {/* Top - Logo */}
        <div>
          <span className="text-sm tracking-[0.4em] uppercase opacity-80">
            Modeva
          </span>
        </div>

        {/* Bottom - Slide info */}
        <div className="space-y-6">
          {/* Slide text */}
          <div
            className={cn(
              "transition-all duration-500",
              isTransitioning
                ? "opacity-0 translate-y-4"
                : "opacity-100 translate-y-0"
            )}>
            <p className="text-xs tracking-[0.3em] uppercase opacity-70 mb-2">
              {slides[currentSlide].subtitle}
            </p>
            <h2 className="font-(family-name:--font-playfair) text-3xl lg:text-4xl xl:text-5xl font-light">
              {slides[currentSlide].title}
            </h2>
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-6">
            {/* Progress indicators */}
            <div className="flex items-center gap-3">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setIsTransitioning(true);
                    setTimeout(() => {
                      setCurrentSlide(index);
                      setIsTransitioning(false);
                    }, 300);
                  }}
                  className="group relative h-0.5 w-8 bg-background/30 overflow-hidden"
                  aria-label={`Go to slide ${index + 1}`}>
                  <span
                    className={cn(
                      "absolute inset-0 bg-background transition-transform duration-5000 ease-linear origin-left",
                      index === currentSlide ? "scale-x-100" : "scale-x-0",
                      index < currentSlide && "scale-x-100 transition-none"
                    )}
                  />
                </button>
              ))}
            </div>

            {/* Slide counter */}
            <span className="text-xs tracking-wider opacity-70">
              {String(currentSlide + 1).padStart(2, "0")} /{" "}
              {String(slides.length).padStart(2, "0")}
            </span>
          </div>

          {/* Decorative element */}
          <div className="flex items-center gap-4 pt-4">
            <div className="h-px w-12 bg-background/40" />
            <span className="text-[10px] tracking-[0.3em] uppercase opacity-60">
              Scroll to explore
            </span>
          </div>
        </div>
      </div>

      {/* Navigation arrows */}
      <div className="absolute right-8 lg:right-12 top-1/2 -translate-y-1/2 flex flex-col gap-4">
        <button
          onClick={() => {
            setIsTransitioning(true);
            setTimeout(() => {
              setCurrentSlide(
                (prev) => (prev - 1 + slides.length) % slides.length
              );
              setIsTransitioning(false);
            }, 300);
          }}
          className="p-3 border border-background/30 text-background hover:bg-background hover:text-foreground transition-all duration-300"
          aria-label="Previous slide">
          <svg
            className="size-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 15.75l7.5-7.5 7.5 7.5"
            />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="p-3 border border-background/30 text-background hover:bg-background hover:text-foreground transition-all duration-300"
          aria-label="Next slide">
          <svg
            className="size-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
