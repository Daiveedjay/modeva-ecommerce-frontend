import HeroMain from "@/app/_sections/hero-section/hero-main";
import HeroSearch from "@/app/_sections/hero-section/hero-search";
import Link from "next/link";

export default function HeroSection() {
  return (
    <div className="px-6 md:px-14 pr-0 py-10 md:py-0 overflow-hidden">
      <ul className="list-none font-medium text-sm md:text-base w-min flex flex-row md:flex-col gap-4 md:gap-0">
        <Link
          href="/products?category=Men"
          className=" hover:underline underline-offset-2">
          MEN
        </Link>
        <Link
          href="/products?category=Women"
          className=" hover:underline underline-offset-2">
          WOMEN
        </Link>
        <Link
          href="/products?category=Kids"
          className=" hover:underline underline-offset-2">
          KIDS
        </Link>
      </ul>
      <div className="h-20"></div>
      {/* <HeroSearch /> */}
      <HeroMain />
    </div>
  );
}
