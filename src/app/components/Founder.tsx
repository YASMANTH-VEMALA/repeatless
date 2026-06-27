"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiInstagram, FiArrowUpRight } from "react-icons/fi";
import { FaLinkedin, FaYoutube } from "react-icons/fa";

const stats = [
  { value: "30+", label: "Businesses Automated" },
  { value: "100+", label: "Automations Built" },
  { value: "3+", label: "Years Experience" },
  { value: "100K+", label: "Social Followers" },
];

const socials = [
  {
    icon: FiInstagram,
    label: "Instagram",
    sub: "35K+ followers",
    href: "https://www.instagram.com/chandan_cheripally_",
  },
  {
    icon: FaYoutube,
    label: "YouTube",
    sub: "Automation tutorials",
    href: "https://www.youtube.com/@chandankumarnetha",
  },
  {
    icon: FaLinkedin,
    label: "LinkedIn",
    sub: "B2B network",
    href: "https://www.linkedin.com/in/chandan-kumar-cheripally-78738a253/",
  },
];

export default function FounderSection() {
  return (
    <section className="relative w-full bg-[#04051B] text-white overflow-hidden py-20 sm:py-28">
      {/* Background glow */}
      <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-[#4E2FFF] opacity-20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute left-0 bottom-0 w-[300px] h-[300px] bg-[#4E2FFF] opacity-10 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6 sm:px-10 flex flex-col lg:flex-row items-center gap-16 lg:gap-20">

        {/* Photo */}
        <motion.div
          className="relative shrink-0 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_60px_rgba(77,0,255,0.25)]"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <Image
            src="/images/myavatar.png"
            alt="Chandan Kumar — AI Automation Consultant"
            fill
            className="object-cover object-top"
            priority
          />
          {/* Gradient fade at bottom to mask logo */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#04051B] to-transparent" />
        </motion.div>

        {/* Content */}
        <motion.div
          className="flex flex-col gap-6 max-w-xl"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          {/* Label */}
          <span className="text-purple-400 font-dmSans text-sm font-medium tracking-widest uppercase">
            Who Is Behind Repeatless
          </span>

          {/* Name & title */}
          <div>
            <h2 className="font-poppins font-semibold text-3xl sm:text-4xl lg:text-5xl leading-tight">
              Hi, I&apos;m Chandan Kumar.
            </h2>
            <p className="text-white/50 font-dmSans text-base mt-1">
              AI Automation Consultant · Hyderabad, India
            </p>
          </div>

          {/* Bio */}
          <p className="font-dmSans text-base sm:text-lg text-white/70 leading-relaxed">
            I help businesses in the <span className="text-white">USA, Canada &amp; Europe</span> eliminate
            the repetitive work that kills growth. I build custom{" "}
            <span className="text-purple-400">Claude AI &amp; n8n</span> systems — from lead automation
            and content pipelines to full operations overhauls — so you can focus on what actually
            moves the needle.
          </p>

          <p className="font-dmSans text-base sm:text-lg text-white/70 leading-relaxed">
            Over <span className="text-white">100,000 business owners</span> follow my automation work
            on Instagram and YouTube. Every system I build is the same kind I share publicly —
            battle-tested, real, and built to last.
          </p>

          {/* Socials */}
          <div className="flex flex-wrap gap-3">
            {socials.map(({ icon: Icon, label, sub, href }) => (
              <Link
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl px-4 py-2.5 transition-all duration-200 group"
              >
                <Icon className="w-4 h-4 text-purple-400" />
                <div className="flex flex-col">
                  <span className="font-dmSans text-sm text-white font-medium leading-none">{label}</span>
                  <span className="font-dmSans text-[11px] text-white/40 mt-0.5">{sub}</span>
                </div>
                <FiArrowUpRight className="w-3 h-3 text-white/30 group-hover:text-white/60 transition-colors ml-1" />
              </Link>
            ))}
          </div>

          {/* Stats strip */}
          <div className="grid grid-cols-4 gap-4 pt-2 border-t border-white/10 mt-2">
            {stats.map(({ value, label }) => (
              <div key={label} className="flex flex-col gap-1">
                <span className="font-poppins font-semibold text-xl sm:text-2xl text-white">{value}</span>
                <span className="font-dmSans text-[10px] sm:text-xs text-white/40 leading-tight">{label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
