"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";
import { VolumetricStudio } from "@/Components/ui/volumetric-studio";

const Hero = () => {
  // Smooth scroll to the next section
  const scrollToNextSection = () => {
    const nextSection = document.getElementById("about") || document.getElementById("case-studies");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative h-screen w-full bg-black text-white flex flex-col justify-between items-center select-none overflow-hidden transition-colors duration-1000"
    >
      <div className="absolute inset-0 z-0">
        <VolumetricStudio className="min-h-0" />
      </div>
      <div aria-hidden="true" className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_50%_42%,rgba(0,0,0,0)_0,rgba(0,0,0,0.1)_42%,rgba(0,0,0,0.72)_100%)]" />

      {/* Spacer for Top Menu alignment */}
      <div className="relative z-10 h-20" />

      {/* Centered Loop Icon & Headline Deck */}
      <div className="relative flex flex-col items-center justify-center max-w-4xl px-6 text-center z-10 w-full">
        {/* Company mark */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative mb-5 flex h-24 w-24 items-center justify-center sm:h-32 sm:w-32"
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
          className="font-display font-extrabold text-[2.05rem] sm:text-5xl md:text-[3.4rem] lg:text-[3.65rem] leading-[1.12] sm:leading-[1.06] tracking-normal max-w-[22rem] sm:max-w-3xl text-white z-10 drop-shadow-[0_20px_50px_rgba(0,0,0,0.55)]"
        >
          We build custom AI automations for business growth
        </motion.h1>
      </div>

      {/* Scroll to know more Anchor */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 1, duration: 1 }}
        onClick={scrollToNextSection}
        className="flex flex-col items-center gap-1.5 cursor-pointer pb-8 z-10 text-white/60 hover:text-white transition-colors duration-300"
      >
        <span className="font-manrope text-[10px] sm:text-xs uppercase tracking-[0.2em] font-semibold">
          Scroll to know more
        </span>
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <FiChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
