"use client";
import { FiArrowUpRight } from "react-icons/fi";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  Variants,
} from "framer-motion";
import { useRef } from "react";

export default function OfferBanner() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 92%", "center 45%"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 68,
    damping: 30,
    mass: 0.45,
    restDelta: 0.0005,
  });
  const cardOpacity = useTransform(smoothProgress, [0, 0.52], [0.3, 1]);
  const cardY = useTransform(smoothProgress, [0, 0.75], [70, 0]);
  const cardScale = useTransform(smoothProgress, [0, 0.75], [0.965, 1]);
  const cardFilter = useTransform(
    smoothProgress,
    [0, 0.78],
    ["blur(18px)", "blur(0px)"]
  );
  const bannerFilter = useTransform(
    smoothProgress,
    [0.08, 0.82],
    ["blur(20px) saturate(0.78)", "blur(0px) saturate(1)"]
  );
  const bannerOpacity = useTransform(smoothProgress, [0.05, 0.62], [0.45, 1]);

  // Variants for fade-up
  const fadeUpVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <motion.section
      id="contact"
      ref={sectionRef}
      className="flex w-full justify-center bg-transparent px-5 py-8 sm:px-6 sm:py-12"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeUpVariants}
    >
      <motion.div
        className="flex w-full max-w-6xl flex-col gap-5 rounded-[9px] border border-black/10 bg-white/72 p-4 shadow-sm sm:gap-6 sm:p-7"
        style={
          shouldReduceMotion
            ? undefined
            : { opacity: cardOpacity, y: cardY, scale: cardScale, filter: cardFilter }
        }
      >
        {/* Banner Top */}
        <motion.div
          className="h-[44vw] min-h-[170px] w-full rounded-[12px] bg-contain bg-center bg-no-repeat sm:h-[clamp(260px,32vw,382px)]"
          style={{
            backgroundImage: "url('/images/banner.png')",
            ...(shouldReduceMotion
              ? {}
              : { filter: bannerFilter, opacity: bannerOpacity }),
          }}
        />

        {/* Content */}
        <div className="flex flex-col items-center gap-4 sm:gap-6 px-2 sm:px-0 max-w-3xl mx-auto">
          {/* Main Heading */}
          <h3 className="text-center font-poppins text-[22px] font-medium leading-tight text-neutral-900 sm:text-[32px] sm:leading-[1.3]">
            The Repeatless Grand Slam Offer
          </h3>

          {/* Features / Description */}
          <div className="grid grid-cols-1 gap-4 pb-4 text-[14px] leading-6 text-neutral-700 sm:gap-8 sm:pb-5 sm:text-[16px] md:grid-cols-2 md:gap-12">
            <ul className="flex list-inside list-disc flex-col gap-2">
              <li>Done-For-You Setup (7–10 days)</li>
              <li>24/7 Monitoring + Alerts</li>
              <li>Monthly Optimization Sprints</li>
            </ul>
            <ul className="flex list-inside list-disc flex-col gap-2">
              <li>ROI Dashboard & Reports</li>
              <li>60-Day Hours-Saved Guarantee</li>
              <li>Bonus: $499 Template Pack</li>
            </ul>
          </div>

          {/* CTA Button */}
          <a
            href="https://cal.com/chandan-kumar-zhrofj/30min"
            className="relative flex max-w-full items-center justify-center gap-2 rounded-[38px] bg-[#4D00FF] px-4 py-2 text-center font-poppins text-[15px] leading-[25px] text-white shadow-sm transition-colors hover:bg-[#3F00D8] sm:px-[19px] sm:py-[8px] sm:text-[17px] sm:leading-[31px]"
          >
            Book a 20-min Demo
            <FiArrowUpRight className="rotate-45 w-5 h-5 sm:w-[21px] sm:h-[21px]" />
          </a>
        </div>
      </motion.div>
    </motion.section>
  );
}
