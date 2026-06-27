"use client";

import Image from "next/image";
import { FiArrowUpRight } from "react-icons/fi";
import { Variants, motion } from "framer-motion";
import StarsCanvas from "@/Components/ShootingStars";
import FeaturesSection from "./Scroll";

// Animation Variants
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const fadeUpStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 },
  },
};

const Hero = () => {
  const stats = [
    { value: "30+", label: "Businesses Automated" },
    { value: "100+", label: "Automations Built" },
    { value: "100K+", label: "Followers Trust My Work" },
  ];

  const avatars = ["/images/1.svg", "/images/2.svg", "/images/4.svg", "/images/3.svg"];

  // Scroll to next section
  const scrollToNextSection = () => {
    const nextSection = document.getElementById("features-section");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <section
        id="home"
        className="relative h-screen w-full overflow-hidden text-white flex flex-col"
      >
        {/* Background Image */}
        <Image
          src="/images/herobg.png"
          alt="Hero Background"
          fill
          className="object-cover -z-20"
          priority
        />

        {/* Shooting Stars */}
        <div className="absolute inset-0 -z-10">
          <StarsCanvas />
        </div>

        {/* Hero Content */}
        <div className="flex-1 flex flex-col items-center justify-center text-center w-full px-4 sm:px-6 md:px-8 max-w-5xl mx-auto gap-5 sm:gap-7">

          {/* Trust badge */}
          <motion.div
            className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-xs sm:text-sm text-white/80 font-dmSans"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            100K+ followers · 30+ businesses automated · USA, Canada &amp; Europe
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="text-white font-poppins font-semibold text-4xl sm:text-6xl md:text-7xl leading-tight tracking-tight drop-shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
          >
            We Build AI That{" "}
            <span className="italic font-light underline decoration-purple-400 underline-offset-4">
              Runs Your Business.
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            className="font-dmSans text-sm sm:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            Hi, I&apos;m <span className="text-white font-medium">Chandan Kumar</span> — AI automation consultant trusted by{" "}
            <span className="text-purple-400">100,000+ business owners</span> on Instagram &amp; YouTube.
            I build custom <span className="text-purple-400">Claude AI &amp; n8n</span> systems that eliminate
            repetitive work and free your team to focus on growth.
          </motion.p>

          {/* CTA Button */}
          <motion.a
            href="https://calendly.com/chandannetha/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center bg-[#4D00FF] rounded-full px-8 py-3 sm:px-10 sm:py-4 gap-2 shadow-[0_0_32px_rgba(77,0,255,0.5)] hover:bg-[#3700cc] transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="font-poppins font-medium text-sm sm:text-base text-white">Get a Free Automation Audit</span>
            <FiArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </motion.a>
        </div>

        {/* Stats Bar */}
        <motion.div
          className="w-full max-w-4xl mx-auto px-6 sm:px-8 pb-10 sm:pb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUpStagger}
        >
          <motion.div
            className="flex flex-row items-center justify-center sm:justify-between gap-6 sm:gap-10 border-t border-white/10 pt-6"
            variants={fadeUp as Variants}
          >
            {stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center gap-1">
                <div className="font-poppins font-semibold text-2xl sm:text-4xl text-white">{stat.value}</div>
                <div className="font-dmSans text-[10px] sm:text-sm text-white/50 text-center leading-tight">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section with an id for scroll target */}
      <div id="features-section">
        <FeaturesSection />
      </div>
    </>
  );
};

export default Hero;
