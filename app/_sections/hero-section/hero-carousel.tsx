"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";

type HeroCarouselProps = {
  onReady?: (api: CarouselApi) => void;
};

const images = [
  {
    imageUrl: "/hero-1.webp",
    name: "short-faux-leather-jacket",
    id: "019c623b-42cd-7cbc-b8b0-3157e918ec56",
  },
  {
    imageUrl: "/hero-2.webp",
    name: "western-denim-shirt",
    id: "019b4fd8-7fe7-7067-a656-e7caffb24307",
  },
  {
    imageUrl: "/hero-3.webp",
    name: "light-weight-water-repellant-jacket",
    id: "019c628b-7518-7cfd-bc54-ce7733854bf3",
  },
  {
    imageUrl: "/hero-4.webp",
    name: "limited-edition-leather-jacket",
    id: "019c6286-fc78-7479-93fd-4aa494eb8cc3",
  },
  {
    imageUrl: "/hero-5.webp",
    name: "striped-shirt-with-volume-sleeves",
    id: "019c6242-68ce-734d-9c04-3063af170513",
  },
];

export default function HeroCarousel({ onReady }: HeroCarouselProps) {
  return (
    <div className="relative w-full max-w-6xl mx-auto">
      <Carousel
        setApi={onReady}
        opts={{
          align: "start",
          slidesToScroll: 1,
        }}
        className="w-full">
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem
              key={index}
              className="basis-1/1 sm:basis-1/2 md:basis-1/3 flex justify-center items-center">
              <Link
                href={`/products/${image.name}/${image.id}`}
                className="relative cursor-pointer border border-border w-91.5 h-94 group overflow-hidden">
                <Image
                  src={image.imageUrl}
                  alt={`carousel-image-${index}`}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  priority={index === 0}
                />
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
