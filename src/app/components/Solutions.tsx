"use client";

import { FC } from "react";
import { FiPhoneCall, FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";
import styles from "./SolutionsSection.module.css"; // CSS module
import { Variants } from "framer-motion";

const topSolutions = [
  {
    title: "Workflow Automation",
    description:
      "Automate repetitive manual tasks like data entry, scheduling, and approvals with intelligent AI flows. Free up your team’s time to focus on high-value work while reducing errors and delays.",
    image: "/images/sol5.png",
  },
  {
    title: "Smart Chat Agents",
    description:
      "Our AI chat agents work 24/7—delivering instant, human-like responses for everything from product recommendations to order tracking. Automate support, cut wait times, and elevate customer experience effortlessly.",
    image: "/images/sol1.png",
  },
];

const bottomSolutions = [
  {
    title: "Mass Voice Automation",
    description:
      "Engage thousands with lifelike AI voice agents in 30+ languages. From scheduling to reminders, our AI handles calls seamlessly—preventing double bookings and scaling smooth conversations effortlessly.",
    image: "/images/sol2.png",
  },
  {
    title: "Effortless Operations",
    description:
      "Supercharge productivity with AI-powered workflows. Automate tasks, cut errors, and streamline everything from data to support—boosting efficiency and freeing your team to focus on growth.",
    image: "/images/sol3.png",
  },
  {
    title: "Tailored AI Solutions",
    description:
      "Every business is unique—so are our AI solutions. Tailored to your goals, they deliver instant impact and scale effortlessly as you grow—optimizing operations and elevating customer experiences along the way.",
    image: "/images/sol4.png",
  },
];

// Animation Variants
const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const SolutionsSection: FC = () => {
  return (
    <motion.section
      id="solutions"
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="relative w-full max-w-[1440px] mx-auto px-6 py-20 text-white overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute right-[-200px] top-[150px] w-[847px] h-[797px] 
        bg-[#1D2688] rounded-full blur-[300px] mix-blend-plus-lighter bg-opacity-30 -z-10" />

      {/* Top Tag */}
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 60 },
          show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] } },
        }}
        className="flex items-center gap-2 px-5 py-2 bg-[rgba(77,0,255,0.1)] border border-white/10 rounded-full w-fit relative z-10"
      >
        <span className="w-3 h-3 rounded-full bg-[#8400FF] shadow-[0_0_16px_#6D21F0,0_0_8px_#1C76FD]" />
        <span className="text-[#8400FF] text-lg">
          AI Automation Consultant
        </span>
      </motion.div>

      {/* Heading */}
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 60 },
          show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] } },
        }}
        className="mt-10 flex flex-col md:flex-row md:justify-between gap-6 relative z-10"
      >
        <h2 className="text-4xl md:text-6xl font-medium tracking-tight max-w-lg">
          Automation Solutions Built for Your Business
        </h2>
        <p className="text-lg max-w-xl text-white/80">
          From startups to enterprises across the USA, Canada, and Europe — I design, build, and manage custom automation systems tailored to your business goals.
        </p>
      </motion.div>

      {/* Top Row Cards */}
      <motion.div
        variants={staggerContainer}
        className="mt-16 grid md:grid-cols-2 gap-6 relative z-10"
      >
        {topSolutions.map((s, i) => (
          <motion.div key={i}
            variants={{
              hidden: { opacity: 0, y: 60 },
              show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] } },
            }}
            className={styles.cardBorder}>
            <div className={`${styles.cardInner} p-6 flex flex-col`}>
              <div
                className="h-40 w-full bg-cover bg-center rounded-lg mb-6"
                style={{ backgroundImage: `url(${s.image})` }}
              />
              <h3 className="text-lg font-medium bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent">
                {s.title}
              </h3>
              <p className="mt-3 text-sm text-[#9B96B0]">{s.description}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Bottom Row Cards */}
      <motion.div
        variants={staggerContainer}
        className="mt-8 grid md:grid-cols-3 gap-6 relative z-10"
      >
        {bottomSolutions.map((s, i) => (
          <motion.div key={i}
            variants={{
              hidden: { opacity: 0, y: 60 },
              show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] } },
            }}
            className={styles.cardBorder}>
            <div className={`${styles.cardInner} p-6 flex flex-col`}>
              <div
                className="h-40 w-full bg-cover bg-center rounded-lg mb-6"
                style={{ backgroundImage: `url(${s.image})` }}
              />
              <h3 className="text-lg font-medium bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent">
                {s.title}
              </h3>
              <p className="mt-3 text-sm text-[#9B96B0]">{s.description}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* CTA */}
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 60 },
          show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] } },
        }}
        className="mt-16 flex flex-col items-center gap-5 relative z-10"
      >
        <a href="https://cal.com/chandan-kumar-zhrofj/30min" target="_blank" rel="noopener noreferrer">
          <button className="flex items-center gap-2 px-6 py-2 bg-[#4D00FF] rounded-full text-sm hover:bg-[#5E1FFF] transition-all">
            <FiPhoneCall size={16} />
            Book a Free Strategy Call
            <FiArrowRight size={18} />
          </button>
        </a>
      </motion.div>
    </motion.section>
  );
};

export default SolutionsSection;
