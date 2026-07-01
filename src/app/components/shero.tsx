"use client";

import { motion } from "framer-motion";

export default function AutomationSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }} // start faded and slightly down
      whileInView={{ opacity: 1, y: 0 }} // fade up into place
      transition={{ duration: 1, ease: "easeOut" }} // smooth transition
      viewport={{ once: true, amount: 0.2 }} // trigger once when 20% visible
      className="relative flex flex-col items-center gap-6 py-20 px-6 md:px-0 overflow-hidden"
    >
      {/* Background glow circle */}
      <div className="absolute w-[847px] h-[797px] left-[calc(50%-847px/2-754.5px)] top-[53px] bg-[#1D2688] blur-[500px] rounded-full bg-opacity-40"></div>

      {/* Heading */}
      <h1 className="max-w-[754px] text-center font-poppins text-[clamp(2rem,8vw,3.375rem)] font-medium leading-[1.18] tracking-tight text-white md:text-[40px] md:leading-[1.2] sm:text-[28px] sm:leading-[1.25]">
        Revolutionize Your Business with Intelligent Automation
      </h1>

      {/* Description */}
      <p className="text-center font-poppins font-medium text-[16px] leading-[150%] text-white max-w-[650px]">
        At Repeatless, we are pioneering the future of business automation with our cutting-edge AI solutions. Our intelligent agents are designed to revolutionize how businesses interact with their customers and manage their operations.
      </p>

      {/* Bullet points */}
      <div className="flex flex-col gap-2.5 opacity-80">
        <div className="flex justify-center items-center gap-3">
          <span className="hidden w-3 h-3 bg-[#A84AFF] rounded-full"></span>
          <p className="text-center font-dmSans font-normal text-[14px] leading-[150%] text-white">
            Custom-built AI solutions tailored to your specific business needs
          </p>
        </div>
        <div className="flex justify-center items-center gap-3">
          <span className="hidden w-3 h-3 bg-[#A84AFF] rounded-full"></span>
          <p className="text-center font-dmSans font-normal text-[14px] leading-[150%] text-white">
            24/7 intelligent support across customer service, sales, and marketing
          </p>
        </div>
        <div className="flex justify-center items-center gap-3">
          <span className="hidden w-3 h-3 bg-[#A84AFF] rounded-full"></span>
          <p className="text-center font-dmSans font-normal text-[14px] leading-[150%] text-white">
            Proven results in reducing operational costs while enhancing customer satisfaction
          </p>
        </div>
      </div>
    </motion.div>
  );
}
