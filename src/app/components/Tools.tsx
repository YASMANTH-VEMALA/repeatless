"use client";

import { FC } from "react";
import { motion, Variants } from "framer-motion";

const tools = [
  { name: "Claude AI",      icon: "/images/tools/anthropic.svg" },
  { name: "OpenAI",         icon: "/images/tools/openai.svg" },
  { name: "Gemini",         icon: "/images/tools/googlegemini.svg" },
  { name: "n8n",            icon: "/images/tools/n8n.svg" },
  { name: "Make.com",       icon: "/images/tools/make.svg" },
  { name: "Zapier",         icon: "/images/tools/zapier.svg" },
  { name: "WhatsApp",       icon: "/images/tools/whatsapp.svg" },
  { name: "Slack",          icon: "/images/tools/slack.svg" },
  { name: "Telegram",       icon: "/images/tools/telegram.svg" },
  { name: "HubSpot",        icon: "/images/tools/hubspot.svg" },
  { name: "Notion",         icon: "/images/tools/notion.svg" },
  { name: "Airtable",       icon: "/images/tools/airtable.svg" },
  { name: "Google Sheets",  icon: "/images/tools/googlesheets.svg" },
  { name: "Google Drive",   icon: "/images/tools/googledrive.svg" },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const ToolsSection: FC = () => {
  return (
    <motion.section
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      className="relative w-full bg-[#050014] overflow-hidden py-20 px-6"
    >
      {/* Background glow */}
      <div className="absolute right-[-150px] top-[80px] w-[600px] h-[500px] bg-[#1D2688] rounded-full blur-[280px] mix-blend-plus-lighter opacity-30 -z-10" />

      <div className="max-w-[1440px] mx-auto flex flex-col items-center gap-12">

        {/* Badge */}
        <motion.div
          variants={fadeUp}
          className="flex items-center gap-2 px-5 py-2 bg-[rgba(77,0,255,0.1)] border border-white/10 rounded-full"
        >
          <span className="w-3 h-3 rounded-full bg-[#8400FF] shadow-[0_0_16px_#6D21F0,0_0_8px_#1C76FD]" />
          <span className="text-[#8400FF] text-lg">Our Tech Stack</span>
        </motion.div>

        {/* Heading */}
        <motion.div variants={fadeUp} className="flex flex-col items-center gap-4 text-center">
          <h2 className="font-poppins font-medium text-white text-4xl md:text-5xl lg:text-6xl tracking-tight max-w-3xl">
            We Build With the Best<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A84AFF] to-[#1C76FD]">
              AI &amp; Automation Tools
            </span>
          </h2>
          <p className="text-white/60 text-base md:text-lg max-w-2xl">
            From Claude AI to n8n to Make.com — we combine the most powerful platforms available to build custom automations precisely tailored to your business requirements.
          </p>
        </motion.div>

        {/* Logo grid */}
        <motion.div
          variants={stagger}
          className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 gap-4 w-full max-w-4xl"
        >
          {tools.map((tool, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="flex flex-col items-center justify-center gap-3 p-4 rounded-2xl border border-white/8 bg-white/[0.03] hover:border-[#8400FF]/50 hover:bg-[rgba(132,0,255,0.08)] hover:shadow-[0_0_20px_rgba(109,33,240,0.25)] transition-all duration-300 cursor-default group"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={tool.icon}
                alt={tool.name}
                width={32}
                height={32}
                className="w-8 h-8 opacity-70 group-hover:opacity-100 transition-opacity duration-300"
              />
              <span className="text-white/50 group-hover:text-white/80 text-[10px] sm:text-xs text-center leading-tight transition-colors duration-300">
                {tool.name}
              </span>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </motion.section>
  );
};

export default ToolsSection;
