// our-approach-grid.tsx
"use client";

import { motion } from "motion/react";
import Image from "next/image";

const images = [
  "/hero-4.webp",
  "/hero-5.webp",
  "/hero-6.webp",
  "/hero-7.webp",
  "/hero-8.webp",
  "/hero-9.webp",
  "/hero-10.webp",
  "/hero-11.webp",
];

export default function OurApproachGrid() {
  return (
    <div>
      {" "}
      <div className="px-6 md:px-14 mb-8 md:mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center uppercase section_header font-normal!">
          Our Approach to Fashion Design
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-6 w-full  mx-auto text-pretty text-center text-muted-foreground leading-relaxed">
          At Modeva we blend creativity with craftsmanship to create fashion
          that transcends trends and stands the test of time. Each design is
          meticulously crafted ensuring the highest quality exquisite finish.
        </motion.p>
      </div>
      <div className="px-6 md:px-14">
        {/* Bento-style luxury grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {images.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: "easeOut",
              }}
              viewport={{ once: true, margin: "-50px" }}
              className={`
              relative overflow-hidden group border border-border/50 bg-secondary/20
              ${
                // Create varying heights for bento effect
                index === 0 || index === 4
                  ? "row-span-2 aspect-3/4"
                  : index === 2 || index === 6
                    ? "col-span-2 md:col-span-1 aspect-square"
                    : "aspect-4/5"
              }
            `}>
              <Image
                src={item}
                alt="Modeva Collection"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
