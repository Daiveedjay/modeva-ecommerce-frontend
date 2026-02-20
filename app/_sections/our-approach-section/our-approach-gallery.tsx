import { motion } from "motion/react";
import Image from "next/image";

const images = [
  "/hero-1.webp",
  "/hero-2.webp",
  "/hero-3.webp",
  "/hero-4.webp",
  "/hero-5.webp",
  "/hero-6.webp",
  "/hero-7.webp",
  "/hero-8.webp",
  "/hero-9.webp",
  "/hero-10.webp",
  "/hero-11.webp",
  "/hero-12.webp",
];

export default function OurApproachGallery() {
  return (
    <div className="flex gap-8 md:gap-16 px-6 md:px-14 items-center">
      {images.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: index * 0.1,
            ease: "easeOut",
          }}
          viewport={{ once: true }}
          className={`relative shrink-0 w-70 md:w-87.5 aspect-3/4 border border-border/50 bg-secondary/20 overflow-hidden group
            ${index % 2 === 0 ? "-translate-y-5" : "-translate-y-10"}
          `}>
          <Image
            src={item}
            alt={"title"}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          {/* <div className="absolute bottom-4 left-4">
            <p className="tab_leading mb-1">Modeva Studio</p>
            <p className="section_text">{"title"}</p>
          </div> */}
        </motion.div>
      ))}
      {/* Spacer to allow full scroll */}
      <div className="w-[10vw] shrink-0" />
    </div>
  );
}
