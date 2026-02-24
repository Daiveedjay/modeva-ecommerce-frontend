
"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import OurApproachGallery from "./our-approach-gallery";
import OurApproachGrid from "@/app/_sections/our-approach-section/our-approach-grid";

export default function OurApproach() {
  const targetRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [xRange, setXRange] = useState<[string, string]>(["0%", "-100%"]);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  useEffect(() => {
    const calculateScroll = () => {
      if (containerRef.current) {
        const scrollWidth = containerRef.current.scrollWidth;
        const viewportWidth = window.innerWidth;
        const distance = scrollWidth - viewportWidth;
        const percentage = (distance / viewportWidth) * 100;
        setXRange(["0%", `-${percentage}%`]);
      }
    };

    calculateScroll();
    window.addEventListener("resize", calculateScroll);
    return () => window.removeEventListener("resize", calculateScroll);
  }, []);

  const x = useTransform(scrollYProgress, [0, 1], xRange);

  return (
    <div>
      <section
        ref={targetRef}
        className="relative hidden lg:block  h-[200vh] sm:h-[250vh] md:h-[300vh] lg:h-[400vh]">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <div className="flex flex-col w-full">
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
                className="mt-6 w-full md:w-1/2 mx-auto text-pretty text-center text-muted-foreground leading-relaxed">
                At Modeva we blend creativity with craftsmanship to create
                fashion that transcends trends and stands the test of time. Each
                design is meticulously crafted ensuring the highest quality
                exquisite finish.
              </motion.p>
            </div>

            <motion.div style={{ x }} className="flex mt-10" ref={containerRef}>
              <OurApproachGallery />
            </motion.div>
          </div>
        </div>
      </section>

      <div className="block lg:hidden">
        <OurApproachGrid />
      </div>
    </div>
  );
}
