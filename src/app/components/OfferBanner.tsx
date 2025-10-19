"use client";
import { FiArrowUpRight } from "react-icons/fi";
import { motion, Variants } from "framer-motion";

export default function OfferBanner() {
  // Variants for fade-up
  const fadeUpVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <motion.section
    id="contact"
      className="w-full bg-[#04051B] py-8 sm:py-12 flex justify-center"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeUpVariants}
    >
      <div className="bg-[rgba(115,0,255,0.15)] rounded-[9px] max-w-6xl w-full flex flex-col gap-6 p-4 sm:p-7">
        {/* Banner Top */}
        <div
          className="w-full h-60 sm:h-[382px] rounded-[12px] bg-contain bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/banner.png')",
          }}
        ></div>

        {/* Content */}
        <div className="flex flex-col items-center gap-4 sm:gap-6 px-2 sm:px-0 max-w-3xl mx-auto">
          {/* Main Heading */}
          <h3 className="text-white/80 font-poppins font-medium text-[22px] sm:text-[32px] leading-[28px] sm:leading-[48px] text-center">
           The Repeatless Grand Slam Offer
          </h3>

          {/* Features / Description */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-12 text-white/80 text-[14px] sm:text-[16px] leading-[20px] sm:leading-[24px] pb-4 sm:pb-5">
            <ul className="list-disc list-inside flex flex-col gap-2">
              <li>Done-For-You Setup (7–10 days)</li>
              <li>24/7 Monitoring + Alerts</li>
              <li>Monthly Optimization Sprints</li>
            </ul>
            <ul className="list-disc list-inside flex flex-col gap-2">
              <li>ROI Dashboard & Reports</li>
              <li>60-Day Hours-Saved Guarantee</li>
              <li>Bonus: $499 Template Pack</li>
            </ul>
          </div>

          {/* CTA Button */}
          <a
            href="https://calendly.com/chandannetha/30min"
            className="relative flex items-center justify-center gap-2 px-4 py-2 sm:px-[19px] sm:py-[8px] bg-[#4D00FF] rounded-[38px] text-white font-poppins text-[15px] sm:text-[17px] leading-[25px] sm:leading-[31px] shadow-[0_0_16px_#6D21F0,0_0_8.1px_#1C76FD] hover:brightness-110 transition-all"
          >
            Book a 20-min Demo
            <FiArrowUpRight className="rotate-45 w-5 h-5 sm:w-[21px] sm:h-[21px]" />
          </a>
        </div>
      </div>
    </motion.section>
  );
}
