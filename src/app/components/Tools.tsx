"use client";

import { FC } from "react";
import { motion, Variants } from "framer-motion";
import { ClipPathLogoGrid, type ClipPathLinkItem } from "@/Components/ui/clip-path-links";

const tools: ClipPathLinkItem[] = [
  { label: "Claude AI", imgSrc: "/images/tools/anthropic.svg" },
  { label: "OpenAI", imgSrc: "/images/tools/openai.svg" },
  { label: "Gemini", imgSrc: "/images/tools/googlegemini.svg" },
  { label: "n8n", imgSrc: "/images/tools/n8n.svg" },
  { label: "Make.com", imgSrc: "/images/tools/make.svg" },
  { label: "Zapier", imgSrc: "/images/tools/zapier.svg" },
  { label: "WhatsApp", imgSrc: "/images/tools/whatsapp.svg" },
  { label: "Slack", imgSrc: "/images/tools/slack.svg" },
  { label: "Telegram", imgSrc: "/images/tools/telegram.svg" },
  { label: "HubSpot", imgSrc: "/images/tools/hubspot.svg" },
  { label: "Notion", imgSrc: "/images/tools/notion.svg" },
  { label: "Airtable", imgSrc: "/images/tools/airtable.svg" },
  { label: "Google Sheets", imgSrc: "/images/tools/googlesheets.svg" },
  { label: "Google Drive", imgSrc: "/images/tools/googledrive.svg" },
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
      className="relative w-full bg-transparent overflow-hidden py-20 px-6"
    >
      {/* Background glow */}
      <div className="absolute right-[-150px] top-[80px] w-[600px] h-[500px] bg-[#1D2688]/10 rounded-full blur-[200px] mix-blend-multiply -z-10" />

      <div className="max-w-[1440px] mx-auto flex flex-col items-center gap-12">
        {/* Badge */}
        <motion.div
          variants={fadeUp}
          className="flex items-center gap-2 px-[20px] py-[10px] bg-white/70 border border-black/5 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.05)] rounded-[59px]"
        >
          <span className="w-[12px] h-[12px] rounded-full bg-[#8400FF] shadow-[0_0_16px_#6D21F0,0_0_8.1px_#1C76FD]" />
          <span className="text-[#8400FF] font-poppins font-normal text-[14px] sm:text-[16px] md:text-[20px] leading-[130%]">
            Our Tech Stack
          </span>
        </motion.div>

        {/* Heading */}
        <motion.div variants={fadeUp} className="flex flex-col items-center gap-4 text-center">
          <h2 className="font-poppins font-medium text-neutral-950 text-4xl md:text-5xl lg:text-6xl tracking-tight max-w-3xl">
            We Build With the Best
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A84AFF] to-[#1C76FD]">
              AI &amp; Automation Tools
            </span>
          </h2>
          <p className="text-neutral-700 text-base md:text-lg max-w-2xl">
            From Claude AI to n8n to Make.com &mdash; we combine the most powerful platforms available to build custom
            automations precisely tailored to your business requirements.
          </p>
        </motion.div>

        {/* Logo grid */}
        <motion.div variants={stagger} className="w-full max-w-4xl">
          <ClipPathLogoGrid
            items={tools}
            className="w-full"
            itemClassName="transition-shadow duration-300 hover:border-[#8400FF]/50 hover:shadow-[0_10px_20px_rgba(132,0,255,0.08)]"
          />
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ToolsSection;
