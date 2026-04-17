"use client";

import Image from "next/image";
import { FiArrowDown } from "react-icons/fi";
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
    { value: "3+", label: "Years of n8n Experience" },
    { value: "200+", label: "Businesses Helped" },
    { value: "1K+", label: "Automations Delivered" },
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
        className="relative h-screen w-full overflow-hidden text-white flex flex-col justify-between"
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
        <motion.div
          className="flex flex-col items-center justify-center text-center w-full px-4 sm:px-6 md:px-8 max-w-4xl mx-auto pt-48 sm:pt-36 md:pt-36"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUpStagger}
        >
          {/* Headline */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4"
            variants={fadeUpStagger}
          >
            <motion.h1
              className="font-poppins font-medium text-[26px] sm:text-5xl md:text-6xl lg:text-7xl drop-shadow-lg"
              variants={fadeUp as Variants}
            >
              Your AI
            </motion.h1>
            <motion.h1
              className="font-poppins italic font-light text-[26px] sm:text-5xl md:text-6xl lg:text-7xl underline drop-shadow-lg"
              variants={fadeUp as Variants}
            >
              Automation
            </motion.h1>
          </motion.div>

          <motion.h2
            className="font-poppins font-medium text-[22px] sm:text-4xl md:text-5xl lg:text-6xl mt-2 sm:mt-4"
            variants={fadeUp as Variants}
          >
            Consultant for <span className="text-purple-400">Business Growth.</span>
          </motion.h2>

          {/* Subtext */}
          <motion.p
            className="font-dmSans text-xs sm:text-base md:text-lg mt-3 sm:mt-5 max-w-sm sm:max-w-xl mx-auto leading-relaxed"
            variants={fadeUp as Variants}
          >
            I help businesses across the <span className="text-purple-400">USA, Canada, and India</span> eliminate repetitive tasks with custom <span className="text-purple-400">n8n automation</span> — as your dedicated <span className="text-purple-400">AI automation consultant</span>.
          </motion.p>

          {/* CTA Button */}
          <motion.a
            href="https://cal.com/chandan-kumar-zhrofj/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 flex items-center justify-center bg-[#4D00FF] rounded-full px-6 py-2 sm:px-8 sm:py-3 gap-2 shadow-lg hover:bg-[#3700cc] transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            variants={fadeUp as Variants}
          >
            <span className="font-poppins text-sm sm:text-base">Book a Free Strategy Call</span>
            <FiArrowUpRight className="w-4 h-4 sm:w-6 sm:h-6 rotate-45" />
          </motion.a>
        </motion.div>

        {/* Stats Section */}
        {/* Stats Section */}
        <motion.div
          className="relative flex flex-col sm:flex-row flex-wrap justify-center sm:justify-between items-center w-full max-w-6xl mx-auto px-4 sm:px-6 gap-4 sm:gap-6 pb-20 sm:pb-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUpStagger}
        >
          {/* Left Stats */}
          <div className="flex flex-row justify-center sm:justify-start items-center gap-4 sm:gap-10 w-full sm:w-auto">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                className="flex flex-col items-center sm:items-start gap-1 flex-1 min-w-[70px] max-w-[120px]"
                variants={fadeUp as Variants}
              >
                <div className="font-dmSans font-medium text-lg sm:text-3xl">{stat.value}</div>
                <div className="font-dmSans text-[10px] sm:text-sm text-[#F2F2F2] text-center sm:text-left">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Automation Build Card */}
          <motion.div
            className="relative w-full max-w-[280px] sm:max-w-[323px] p-[1px] rounded-[30px] bg-gradient-to-r from-white/80 via-white/40 to-white/10 mt-6 sm:mt-0"
            variants={fadeUp as Variants}
          >
            <div className="flex items-center gap-3 relative z-10 bg-[rgba(77,0,255,0.15)] backdrop-blur-[6px] rounded-[30px] px-3 py-2 sm:px-4 sm:py-3">
              {/* Avatars */}
              <div className="relative w-[130px] h-[40px] sm:w-[160px] sm:h-[56px]">
                {avatars.map((src, idx) => (
                  <div
                    key={idx}
                    className={`absolute w-[40px] h-[40px] sm:w-[56px] sm:h-[56px] rounded-full overflow-hidden ${idx === 0
                      ? "bg-gradient-to-br from-pink-400 to-red-500 left-0 z-30"
                      : idx === 1
                        ? "bg-gradient-to-br from-purple-400 to-blue-500 left-[25px] sm:left-[35px] z-20"
                        : idx === 2
                          ? "bg-gradient-to-br from-blue-400 to-cyan-500 left-[50px] sm:left-[70px] z-10"
                          : "bg-gradient-to-br from-green-400 to-teal-500 left-[75px] sm:left-[105px] z-0"
                      }`}
                  >
                    <Image src={src} alt={`Avatar ${idx}`} width={56} height={56} className="rounded-full object-cover" />
                  </div>
                ))}
              </div>

              {/* Text */}
              <div className="flex flex-col items-start justify-center">
                <div className="font-jakarta font-medium text-base sm:text-xl text-white">
                  100+
                </div>
                <div className="font-jakarta text-[10px] sm:text-sm text-white">
                  Automation Build
                </div>
              </div>
            </div>
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
