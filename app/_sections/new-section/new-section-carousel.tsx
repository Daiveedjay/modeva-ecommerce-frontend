"use client";

import * as React from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Plus } from "lucide-react";
import CarouselNavButton from "@/app/_resuseables/carousel-nav-buttons";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";

// const images = [
//   "/hero-4.webp",
//   "/hero-5.webp",
//   "/hero-6.webp",
//   "/hero-7.webp",
//   "/hero-8.webp",
//   "/hero-9.webp",
//   "/hero-10.webp",
//   "/hero-11.webp",
// ];

const images = [
  {
    name: "limited-edition-leather-jacket",
    id: "019c6286-fc78-7479-93fd-4aa494eb8cc3",
    type: "Jacket",
    url: "/hero-4.webp",
    price: 4150,
  },
  {
    name: "striped-shirt-with-volume-sleeves",
    id: "019c6242-68ce-734d-9c04-3063af170513",
    type: "Shirt",
    url: "/hero-5.webp",
    price: 3990,
  },
  {
    name: "suit-blazer",
    id: "019c62b9-c4b6-7b58-90c6-a48762fc9c98",
    type: "Suit",
    url: "/hero-6.webp",
    price: 455,
  },
  {
    name: "faded-effect-denim-jacket",
    id: "019c62b6-644d-71e5-8393-b4f49a9d4a4c",
    type: "Jacket",
    url: "/hero-7.webp",
    price: 995,
  },
  {
    name: "embroidered-crochet-knit-shirt",
    id: "019c629d-6c0d-7105-aa54-5b3ab78a0e1f",
    type: "Shirt",
    url: "/hero-8.webp",
    price: 1150,
  },
  {
    name: "double-waistband-wide-leg-trousers",
    id: "019c6293-ce33-771b-bba8-29c967696fae",
    type: "Pants",
    url: "/hero-9.webp",
    price: 1675,
  },
  {
    name: "linen-relaxed-fit-shirt",
    id: "019c6283-23bb-709e-8116-1b3137705e40",
    type: "Shirt",
    url: "/hero-10.webp",
    price: 2450,
  },
  {
    name: "satin-shirt",
    id: "019c6264-a2d9-79c1-b898-1d6d62a44c16",
    type: "Shirt",
    url: "/hero-11.webp",
    price: 950,
  },
];

export default function NewSectionCarousel() {
  const [api, setApi] = React.useState<CarouselApi | undefined>(undefined);
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);

  const handleApiReady = (carouselApi: CarouselApi) => {
    if (!carouselApi) return;
    setApi(carouselApi);

    // set initial button states
    setCanScrollPrev(carouselApi.canScrollPrev());
    setCanScrollNext(carouselApi.canScrollNext());

    // attach listeners directly
    carouselApi.on("select", () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
    });

    carouselApi.on("reInit", () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
    });
  };

  return (
    <div className="relative w-full overflow-hidden">
      <Carousel
        setApi={handleApiReady}
        opts={{
          align: "start",
          slidesToScroll: 1, // default (mobile-first)
          breakpoints: {
            "(min-width: 768px)": {
              slidesToScroll: 2,
            },
          },
        }}
        className="w-full">
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem
              key={index}
              className="basis-100 flex flex-col justify-center">
              <Link
                href={`/products/${image.name}/${image.id}`}
                className="relative bg-[#F1F2F6] flex justify-center items-center w-full group overflow-hidden h-78.25 border border-border">
                <Image
                  src={image.url}
                  alt={`carousel-image-${index}`}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  priority={index === 0}
                />
              </Link>
              <div className="py-2 tracking-[0px] space-y-1 text-xs">
                <p className="tab_leading">Modeva {image.type}</p>
                <div className="text-sm flex flex-col sm:flex-row justify-between capitalize">
                  <span>{image.name.replaceAll("-", " ")}</span>
                  <span className=" mt-2 sm:mt-0 font-bold">
                    {formatCurrency(image.price)}
                  </span>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* bottom nav buttons */}
        <div className="flex mt-6 items-center gap-3 justify-center w-full px-2">
          <CarouselNavButton
            api={api}
            direction="prev"
            className="w-10 h-10"
            disabled={!canScrollPrev}
          />
          <CarouselNavButton
            api={api}
            direction="next"
            className="w-10 h-10"
            disabled={!canScrollNext}
          />
        </div>
      </Carousel>
    </div>
  );
}
