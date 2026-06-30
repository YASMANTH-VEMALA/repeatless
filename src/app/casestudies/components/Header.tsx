"use client";

import { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";

type HeroProps = {
  title: string;
  description: string;
  meta: { solution: string; stat: string };
  image: string;
  video?: string;
};

// Fade-up animation variants
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function BlogHero({ title, description, meta, image, video }: HeroProps) {
  const [scrollWidth, setScrollWidth] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const maxHeight = document.body.scrollHeight - window.innerHeight;
      const scrollTop = window.scrollY;
      const progress = (scrollTop / maxHeight) * 100;
      setScrollWidth(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative flex flex-col items-center justify-center px-6 sm:px-12 lg:px-[150px] pt-16 sm:pt-20 lg:pt-[100px] gap-8 sm:gap-12 lg:gap-[50px] text-neutral-950 w-full max-w-[1440px] mx-auto">
      {/* Gradient line progress (optional) */}
      {/* <div className="absolute top-5 left-0 w-full h-[12px] bg-gradient-to-r from-[#0F6CBD] to-[#27C840] opacity-90 z-10">
        <div
          className="h-[12px] bg-gradient-to-r from-[#0F6CBD] to-[#27C840] transition-all duration-300 ease-out"
          style={{ width: `${scrollWidth}%` }}
        />
      </div> */}

      {/* Title + Description */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="flex flex-col gap-4 sm:gap-6 w-full max-w-[1140px]"
      >
        <h1 className="text-3xl sm:text-4xl lg:text-[48px] leading-snug sm:leading-[50px] lg:leading-[66px] font-medium tracking-tight">
          {title}
        </h1>

        <p className="text-base sm:text-lg lg:text-[22px] font-light leading-relaxed sm:leading-[28px] lg:leading-[35px] text-neutral-600">
          {description}
        </p>

        {/* Meta info */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <span className="text-[#0F6CBD] text-base sm:text-lg lg:text-[22px] font-medium uppercase tracking-[-0.03em]">
            {meta.solution}
          </span>
          <div className="w-2 h-2 rounded-full bg-neutral-300" />
          <span className="text-[#27C840] text-sm sm:text-base lg:text-[18px] font-medium uppercase">
            {meta.stat}
          </span>
        </div>
      </motion.div>

      {/* Media: prefer video if provided, else image */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="w-full max-w-[1140px] h-[220px] sm:h-[350px] lg:h-[510px] rounded-2xl overflow-hidden"
      >
        {typeof video === "string" && video.length > 0 ? (
          video.includes("youtube.com") || video.includes("youtu.be") ? (
            <iframe
              src={
                video.includes("embed")
                  ? video
                  : video.includes("watch?v=")
                  ? video.replace("watch?v=", "embed/")
                  : video.replace("youtu.be/", "www.youtube.com/embed/")
              }
              title="Hero Video"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <video src={video} className="w-full h-full object-cover" controls />
          )
        ) : (
          <img
            src={image}
            alt="Blog Hero"
            className="w-full h-full object-cover"
          />
        )}
      </motion.div>
    </section>
  );
}
