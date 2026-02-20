import Logo from "@/app/_resuseables/logo";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className=" bg-muted-foreground/10 px-6 md:px-14 py-20 pb-20 md:pb-60  font-beatrice">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0 items-start">
          {/* Left Section: Info and Languages */}
          <div className="space-y-16">
            <div>
              <h4 className="tab_leading mb-8 ">Info</h4>
              <ul className="space-y-4 text-sm tracking-wide font-medium">
                <li>
                  <Link href="#">
                    PRICING <span className="opacity-30 ml-1">/</span>
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    ABOUT <span className="opacity-30 ml-1">/</span>
                  </Link>
                </li>
                <li>
                  <Link href="#">CONTACTS</Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className=" tab_leading mb-8">Languages</h4>
              <ul className="space-y-4  text-sm tracking-wide font-medium">
                <li>
                  <Link href="#">
                    ENG <span className="opacity-30 ml-1">/</span>
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    ESP <span className="opacity-30 ml-1">/</span>
                  </Link>
                </li>
                <li>
                  <Link href="#">SVE</Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Center Section: Large Typography */}
          <div className="flex flex-col justify-center ">
            {/* <div className="w-12 h-12 mb-8 relative">
              <div className="absolute inset-0 bg-[#2D241E] rotate-45 transform origin-center"></div>
              <div className="absolute inset-0 bg-[#FDFCF8] rotate-45 transform origin-center scale-[0.35] translate-x-[-2px] translate-y-[-2px]"></div>
            </div> */}
            <Logo className=" w-10 md:w-20 aspect-square" />
            <h2 className=" text-4xl md:text-7xl mt-10 md:text-[120px] font-bold leading-[0.85] tracking-[0.5px] uppercase font-beatrice-deck ">
              MOD
              <br />
              EVA
            </h2>
          </div>

          {/* Right Section: Technologies */}
          {/* <div className="md:text-right flex flex-col md:items-end">
            <h4 className="text-[10px] tracking-[0.2em] uppercase mb-8 opacity-50 font-sans font-medium">
              Technologies
            </h4>
            <div className="flex items-center gap-6">
              <p className="text-sm font-sans tracking-wide max-w-[200px] leading-relaxed opacity-70">
                Near-field communication
              </p>
              <div className="hidden md:block w-[1px] h-20 bg-[#2D241E] rotate-[25deg] origin-center opacity-20"></div>
            </div>
          </div> */}
        </div>

        {/* Bottom Bar */}
      </div>
    </footer>
  );
}
