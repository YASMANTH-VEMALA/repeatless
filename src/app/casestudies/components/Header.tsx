"use client";

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
  return (
    <section className="relative mx-auto flex w-full max-w-[1440px] flex-col items-center justify-center gap-8 px-5 pt-16 text-neutral-950 sm:gap-12 sm:px-8 sm:pt-20 lg:gap-[50px] lg:px-[clamp(4rem,9vw,150px)] lg:pt-[100px]">
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
        <h1 className="text-3xl font-medium leading-snug tracking-tight sm:text-4xl sm:leading-[1.18] lg:text-[clamp(2.75rem,4vw,3rem)] lg:leading-[1.2]">
          {title}
        </h1>

        <p className="text-base font-light leading-relaxed text-neutral-600 sm:text-lg sm:leading-[28px] lg:text-[clamp(1.2rem,1.8vw,1.375rem)] lg:leading-[1.6]">
          {description}
        </p>

        {/* Meta info */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <span className="text-base font-medium uppercase tracking-normal text-[#0F6CBD] sm:text-lg lg:text-[clamp(1.1rem,1.8vw,1.375rem)]">
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
