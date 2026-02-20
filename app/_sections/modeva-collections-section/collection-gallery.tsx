import { formatCurrency } from "@/lib/utils";
import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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

export default function CollectionGallery() {
  return (
    <section className="mt-20 md:mt-28">
      {/* Category selector */}

      {/* Gallery */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-20 mt-24">
        {images.map((image, index) => (
          <article key={index} className="">
            {/* Image */}
            <Link
              href={`/products/${image.name}/${image.id}`}
              className="relative group overflow-hidden">
              <Image
                src={image.url || "/placeholder.svg"}
                alt={`Collection piece ${index + 1}`}
                width={400}
                height={520}
                className="w-full aspect-4/5] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />

              {/* Add action */}
              <button className="absolute bottom-5 right-5 flex h-10 w-10 items-center justify-center bg-background/80 backdrop-blur-sm border border-border opacity-0 translate-y-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0 hover:bg-foreground hover:text-background hover:cursor-pointer">
                <Plus size={16} strokeWidth={1.25} />
              </button>
            </Link>

            {/* Meta */}
            <div className="mt-6 space-y-1.5">
              <p className="tab_leading ">Modeva {image.type}</p>

              <p className="section_text capitalize">
                {image.name.replaceAll("-", " ")}
              </p>

              <p className="text-sm font-bold tracking-wide">
                {formatCurrency(image.price)}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
