import NewSectionCarousel from "@/app/_sections/new-section/new-section-carousel";
import Link from "next/link";

export default function NewSection() {
  return (
    <div className="px-6 md:px-14 py-10 md:py-0 overflow-hidden flex-col">
      <div className="space-y-4">
        <h2 className="section_header">
          <span>NEW</span> <br />
          <span className=" relative">
            THIS WEEK{" "}
            <span className=" absolute top-0 -translate-y-1/3 right-0 translate-x-full text-2xl text-[#000E8A]">
              (10)
            </span>
          </span>
        </h2>
      </div>
      <div className=" mb-6 text-right ">
        <Link
          href="/products"
          className=" inline-block tab_actions text-foreground!">
          See All
        </Link>
      </div>
      <div>
        <NewSectionCarousel />
      </div>
    </div>
  );
}
