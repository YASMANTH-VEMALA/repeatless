"use client";
import { FiPhoneCall } from "react-icons/fi";
import { motion, Variants } from "framer-motion";

export default function CTASection() {
  // Variants for fade-up
  const fadeUpVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section className="relative w-full bg-[#04051B] text-white overflow-hidden">
      {/* purple blur ellipse */}
      <div className="absolute -left-40 -top-40 w-[354px] h-[344px] bg-[#4E2FFF] opacity-80 blur-[96px]" />

      <div className="container mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between px-8 py-16 gap-6">
        {/* Text Content */}
        <motion.div
          className="max-w-xl flex flex-col gap-4"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUpVariants}
        >
          <h2 className="font-poppins font-medium text-[50px] leading-[60px] tracking-[-1px]">
            Ready to Stop Doing Work <br /> <span className="text-purple-400">AI Should Handle?</span>
          </h2>
          <p className="text-white/80 text-lg leading-7">
            Book a free automation audit — I&apos;ll map exactly what to automate in your business first. No pitch. No commitment. Serving businesses across the USA, Canada &amp; Europe.
          </p>
        </motion.div>

        {/* CTA Button */}
        <motion.a
          href="https://calendly.com/chandannetha/30min"
          className="flex items-center justify-center gap-2 px-5 py-3 bg-[#4D00FF] rounded-full shadow-[0_0_16px_#6D21F0,0_0_8.1px_#1C76FD] text-white font-poppins font-medium text-sm whitespace-nowrap"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUpVariants}
        >
          <FiPhoneCall size={16} />
          Get a Free Automation Audit
        </motion.a>
      </div>
    </section>
  );
}
