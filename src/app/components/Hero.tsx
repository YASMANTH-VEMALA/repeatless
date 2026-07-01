"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import AnimatedGrid from "./AnimatedGrid";

const Hero = () => {
  return (
    <section
      id="home"
      data-theme="dark"
      className="relative flex min-h-[100svh] w-full flex-col items-center justify-between overflow-hidden bg-black text-white select-none transition-colors duration-1000"
    >
      <div className="absolute inset-0 z-0">
        <AnimatedGrid />
      </div>
      <div aria-hidden="true" className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_50%_42%,rgba(0,0,0,0)_0,rgba(0,0,0,0.35)_55%,rgba(0,0,0,0.85)_100%)]" />

      {/* Spacer for Top Menu alignment */}
      <div className="relative z-10 h-20 shrink-0 sm:h-24" />

      {/* Centered Loop Icon & Headline Deck */}
      <div className="relative z-10 flex w-full max-w-4xl flex-1 flex-col items-center justify-center px-5 py-8 text-center sm:px-6">
        {/* Company mark */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative mb-4 flex h-20 w-20 items-center justify-center sm:mb-5 sm:h-32 sm:w-32"
        >
          <Image
            src="/images/repeatless-mark.png"
            alt="Repeatless"
            fill
            priority
            sizes="(min-width: 640px) 8rem, 6rem"
            className="object-contain opacity-95 invert drop-shadow-[0_18px_34px_rgba(255,255,255,0.12)]"
          />
        </motion.div>

        {/* Main Centered Mission Statement */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
          className="z-10 max-w-[24rem] bg-linear-to-b from-white to-white/45 bg-clip-text font-general text-[clamp(2.25rem,12vw,3.25rem)] font-bold leading-[1.04] tracking-tight text-transparent drop-shadow-[0_20px_50px_rgba(0,0,0,0.55)] sm:max-w-4xl sm:text-6xl md:text-[clamp(4rem,6vw,4.35rem)] lg:text-[clamp(4.25rem,5.4vw,5rem)]"
        >
          We build custom AI automations for business growth
        </motion.h1>
      </div>
      <div className="relative z-10 h-10 shrink-0 sm:h-12" />
    </section>
  );
};

export default Hero;
