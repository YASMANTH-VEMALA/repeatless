"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
  Variants,
} from "framer-motion";
import { FiInstagram, FiArrowUpRight } from "react-icons/fi";
import { FaYoutube, FaLinkedin } from "react-icons/fa";

/* ---------------------------------------------------------------- */
/* Animation variants                                               */
/* ---------------------------------------------------------------- */
const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.08 } },
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

/* ---------------------------------------------------------------- */
/* Count-up stat                                                    */
/* ---------------------------------------------------------------- */
function StatCounter({
  to,
  suffix,
  label,
}: {
  to: number;
  suffix: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));

  useEffect(() => {
    if (inView) {
      const controls = animate(count, to, { duration: 1.8, ease: "easeOut" });
      return controls.stop;
    }
  }, [inView, to, count]);

  return (
    <motion.div ref={ref} variants={fadeUpVariants} className="flex flex-col gap-0.5">
      <div className="font-poppins text-2xl font-semibold text-neutral-950 sm:text-3xl">
        <motion.span>{rounded}</motion.span>
        {suffix}
      </div>
      <span className="font-manrope text-xs text-neutral-500 sm:text-sm">{label}</span>
    </motion.div>
  );
}

/* ---------------------------------------------------------------- */
/* Data                                                             */
/* ---------------------------------------------------------------- */
const socials = [
  {
    icon: FiInstagram,
    name: "Instagram",
    detail: "35K+ followers",
    href: "https://www.instagram.com/chandan_cheripally_",
  },
  {
    icon: FaYoutube,
    name: "YouTube",
    detail: "Automation tutorials",
    href: "https://www.youtube.com/@chandankumarnetha",
  },
  {
    icon: FaLinkedin,
    name: "LinkedIn",
    detail: "B2B network",
    href: "https://www.linkedin.com/in/chandan-kumar-cheripally-78738a253/",
  },
];

const stats = [
  { to: 30, suffix: "+", label: "Businesses Automated" },
  { to: 100, suffix: "+", label: "Automations Built" },
  { to: 3, suffix: "+", label: "Years Experience" },
  { to: 100, suffix: "K+", label: "Social Followers" },
];

export default function FounderSection() {
  return (
    <section
      id="founder"
      className="relative w-full overflow-hidden bg-transparent py-14 md:py-20"
    >
      <motion.div
        className="relative mx-auto grid w-full max-w-[1200px] grid-cols-1 items-center gap-8 px-5 sm:px-6 md:px-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-14"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        variants={containerVariants}
      >
        {/* Left: transparent cutout, sitting directly on the cream background */}
        <div className="flex justify-center lg:justify-start">
          <div className="relative w-full max-w-[340px]">
            {/* Soft ground shadow beneath the cutout */}
            <div className="absolute inset-x-8 bottom-2 h-8 rounded-[50%] bg-black/15 blur-xl" />
            <Image
              src="/images/founder-repeatless.png"
              alt="Chandan Kumar — Founder of Repeatless"
              width={600}
              height={600}
              className="relative h-auto w-full object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.18)]"
              priority={false}
            />
          </div>
        </div>

        {/* Right: Content */}
        <div className="flex flex-col gap-4">
          <motion.span
            variants={fadeUpVariants}
            className="font-manrope text-xs font-semibold uppercase tracking-[0.22em] text-neutral-500"
          >
            Who is behind Repeatless
          </motion.span>

          <motion.h2
            variants={fadeUpVariants}
            className="font-poppins text-3xl font-medium leading-[1.1] tracking-tight text-neutral-950 sm:text-4xl md:text-[clamp(2.2rem,3.2vw,2.9rem)]"
          >
            Hi, I&apos;m Chandan Kumar.
          </motion.h2>

          <motion.p
            variants={fadeUpVariants}
            className="font-manrope text-base text-neutral-500"
          >
            AI Automation Consultant · Hyderabad, India
          </motion.p>

          <motion.p
            variants={fadeUpVariants}
            className="max-w-2xl font-manrope text-sm leading-7 text-neutral-700 md:text-base"
          >
            I help businesses in the{" "}
            <span className="font-semibold text-neutral-950">USA, Canada &amp; Europe</span>{" "}
            eliminate the repetitive work that kills growth. I build custom{" "}
            <span className="font-semibold text-neutral-950">Claude AI &amp; n8n</span>{" "}
            systems — from lead automation and content pipelines to full operations
            overhauls — so you can focus on what actually moves the needle.
          </motion.p>

          <motion.p
            variants={fadeUpVariants}
            className="max-w-2xl font-manrope text-sm leading-7 text-neutral-700 md:text-base"
          >
            Over{" "}
            <span className="font-semibold text-neutral-950">100,000 business owners</span>{" "}
            follow my automation work on Instagram and YouTube. Every system I build is
            the same kind I share publicly — battle-tested, real, and built to last.
          </motion.p>

          {/* Social cards */}
          <motion.div
            variants={fadeUpVariants}
            className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap"
          >
            {socials.map(({ icon: Icon, name, detail, href }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-xl border border-black/10 bg-white/60 px-3.5 py-2.5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-black/25 hover:bg-white"
              >
                <Icon className="h-5 w-5 shrink-0 text-neutral-700" />
                <span className="flex flex-col">
                  <span className="font-poppins text-sm font-semibold text-neutral-950">
                    {name}
                  </span>
                  <span className="font-manrope text-xs text-neutral-500">{detail}</span>
                </span>
                <FiArrowUpRight className="ml-auto h-4 w-4 text-neutral-400 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-neutral-900" />
              </a>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={containerVariants}
            className="mt-3 grid grid-cols-2 gap-5 border-t border-black/10 pt-6 sm:grid-cols-4"
          >
            {stats.map((s) => (
              <StatCounter key={s.label} to={s.to} suffix={s.suffix} label={s.label} />
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
