"use client";

import { FC } from "react";
import { FiArrowRight, FiPhoneCall, FiCheck } from "react-icons/fi";
import { motion, Variants } from "framer-motion";

const packages = [
  {
    name: "Marketing Automation",
    tagline: "Turn conversations into customers — on autopilot.",
    features: [
      "Customer Support Manager (WhatsApp)",
      "Cold Outreach Automation",
      "Cold Calling Automation",
      "Newsletter Automation",
      "Meta Ads Automation",
    ],
    highlight: false,
  },
  {
    name: "Content Automation",
    tagline: "Publish consistently without lifting a finger.",
    features: [
      "SEO Blog Post Automation",
      "Image Post Automation",
      "Video Post Automation",
    ],
    highlight: true,
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const PackagesSection: FC = () => {
  return (
    <motion.section
      id="packages"
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="relative w-full max-w-[1440px] mx-auto px-6 py-20 text-white overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute left-[-200px] top-[100px] w-[700px] h-[600px] bg-[#1D2688] rounded-full blur-[300px] mix-blend-plus-lighter bg-opacity-30 -z-10" />

      {/* Badge */}
      <motion.div
        variants={fadeUp}
        className="flex items-center gap-2 px-5 py-2 bg-[rgba(77,0,255,0.1)] border border-white/10 rounded-full w-fit"
      >
        <span className="w-3 h-3 rounded-full bg-[#8400FF] shadow-[0_0_16px_#6D21F0,0_0_8px_#1C76FD]" />
        <span className="text-[#8400FF] text-lg">Automation Packages</span>
      </motion.div>

      {/* Heading */}
      <motion.div
        variants={fadeUp}
        className="mt-10 flex flex-col md:flex-row md:justify-between gap-6"
      >
        <h2 className="text-4xl md:text-6xl font-medium tracking-tight max-w-lg">
          Packages Built for Results
        </h2>
        <p className="text-lg max-w-xl text-white/80">
          Choose a package or combine them. Every engagement starts with a free strategy call to understand your goals.
        </p>
      </motion.div>

      {/* Cards */}
      <motion.div
        variants={stagger}
        className="mt-16 grid md:grid-cols-2 gap-6"
      >
        {packages.map((pkg, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            className={`relative p-[1px] rounded-2xl ${
              pkg.highlight
                ? "bg-gradient-to-br from-[#6D21F0] via-[#1C76FD] to-[#6D21F0]"
                : "bg-gradient-to-br from-white/20 via-white/10 to-white/5"
            }`}
          >
            <div className="bg-[#08001A] rounded-2xl p-8 flex flex-col gap-6 h-full">
              {pkg.highlight && (
                <span className="text-xs font-semibold text-[#8400FF] uppercase tracking-widest">
                  Most Popular
                </span>
              )}
              <div>
                <h3 className="text-2xl font-semibold text-white">{pkg.name}</h3>
                <p className="mt-2 text-[#9B96B0] text-sm">{pkg.tagline}</p>
              </div>

              <ul className="flex flex-col gap-3">
                {pkg.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-3 text-white/80 text-sm">
                    <FiCheck className="text-[#8400FF] shrink-0" size={16} />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-4 border-t border-white/10 flex justify-center">
                <a
                  href="https://cal.com/chandan-kumar-zhrofj/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-[#4D00FF] rounded-full text-sm hover:bg-[#5E1FFF] transition-all"
                >
                  <FiPhoneCall size={15} />
                  Book a Free Strategy Call
                  <FiArrowRight size={14} />
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

    </motion.section>
  );
};

export default PackagesSection;
