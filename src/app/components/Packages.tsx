"use client";

import { FC, useRef } from "react";
import {
  FiArrowRight,
  FiCheck,
  FiCompass,
  FiGitBranch,
  FiPhoneCall,
  FiPlayCircle,
} from "react-icons/fi";
import {
  motion,
  MotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  Variants,
} from "framer-motion";

const packages = [
  {
    title: "Marketing Automation",
    kicker: "Capture",
    description:
      "For follow-ups, qualification, outbound touchpoints, newsletters, and campaign handoffs.",
    items: [
      "Customer Support Manager",
      "Cold Outreach",
      "Cold Calling",
      "Newsletter Flow",
      "Meta Ads Follow-up",
    ],
  },
  {
    title: "Content Automation",
    kicker: "Publish",
    description:
      "For repeatable publishing workflows that turn ideas into blogs, image posts, and short-form output.",
    items: ["SEO Blog Posts", "Image Posts", "Video Posts"],
  },
];

const phases = [
  {
    title: "Map",
    detail: "We audit the workflow, tools, data, and handoff points.",
    icon: FiCompass,
  },
  {
    title: "Build",
    detail: "We connect the logic, automations, and review checkpoints.",
    icon: FiGitBranch,
  },
  {
    title: "Launch",
    detail: "We test, document, and hand over a working system.",
    icon: FiPlayCircle,
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const packageRanges = [
  [0.2, 0.52, 0.78],
  [0.42, 0.74, 1],
];

const PackageCard: FC<{
  pkg: (typeof packages)[number];
  index: number;
  progress: MotionValue<number>;
  reduced: boolean | null;
}> = ({ pkg, index, progress, reduced }) => {
  const range = packageRanges[index];
  const opacity = useTransform(progress, range, [0.72, 1, 0.9]);
  const y = useTransform(progress, range, [28, 0, -12]);
  const scale = useTransform(progress, range, [0.985, 1, 0.99]);
  const borderColor = useTransform(progress, range, [
    "rgba(0, 0, 0, 0.07)",
    "rgba(132, 0, 255, 0.28)",
    "rgba(0, 0, 0, 0.08)",
  ]);

  return (
    <motion.article
      style={reduced ? undefined : { opacity, y, scale, borderColor }}
      className="group relative overflow-hidden rounded-[8px] border bg-white/78 p-5 shadow-[0_20px_70px_rgba(25,20,40,0.07)] backdrop-blur-md md:p-6"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-[#8400FF] via-[#1C76FD] to-transparent opacity-80" />

      <div className="flex items-start justify-between gap-5">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#8400FF]">
            {pkg.kicker}
          </span>
          <h3 className="mt-4 font-poppins text-2xl font-semibold leading-tight text-neutral-950 md:text-3xl">
            {pkg.title}
          </h3>
          <p className="mt-3 max-w-xl text-sm leading-7 text-neutral-600 md:text-base">
            {pkg.description}
          </p>
        </div>
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-black/10 bg-neutral-950 text-sm font-semibold text-white">
          0{index + 1}
        </span>
      </div>

      <ul className="mt-6 grid gap-2 sm:grid-cols-2">
        {pkg.items.map((item) => (
          <li
            key={item}
            className="flex min-h-11 items-center gap-3 rounded-[8px] border border-black/[0.06] bg-white/70 px-3 text-sm text-neutral-700"
          >
            <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#8400FF]/10 text-[#8400FF]">
              <FiCheck size={14} />
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </motion.article>
  );
};

const PackagesSection: FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 58,
    damping: 28,
    mass: 0.55,
    restDelta: 0.0007,
  });

  const introOpacity = useTransform(smoothProgress, [0, 0.12, 0.34], [1, 1, 0.78]);
  const introY = useTransform(smoothProgress, [0, 0.34], [0, -10]);
  const timelineHeight = useTransform(smoothProgress, [0.18, 0.82], ["0%", "100%"]);
  const railX = useTransform(smoothProgress, [0.16, 0.82], [-18, 12]);
  const ctaOpacity = useTransform(smoothProgress, [0.78, 0.94], [0, 1]);
  const ctaY = useTransform(smoothProgress, [0.78, 0.94], [18, 0]);

  return (
    <section
      id="packages"
      ref={sectionRef}
      className="relative w-full border-y border-black/[0.04] bg-[linear-gradient(to_right,rgba(0,0,0,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.025)_1px,transparent_1px)] bg-[size:40px_40px] text-neutral-950 lg:min-h-[185vh]"
    >
      <div className="flex min-h-screen items-center overflow-hidden px-6 py-20 md:px-10 lg:sticky lg:top-20 lg:min-h-[calc(100vh-5rem)] lg:px-16 lg:py-8">
        <div className="mx-auto grid w-full max-w-[1440px] gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.35 }}
            style={shouldReduceMotion ? undefined : { opacity: introOpacity, y: introY }}
            className="max-w-xl"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8400FF]">
              / Automation Blueprint
            </span>
            <h2 className="mt-6 font-poppins text-4xl font-semibold leading-[1.04] tracking-tight md:text-5xl xl:text-6xl">
              Choose the workflow.
              <br />
              We build the{" "}
              <span className="bg-gradient-to-r from-[#8400FF] to-[#1C76FD] bg-clip-text text-transparent">
                system.
              </span>
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-8 text-neutral-700 md:text-lg">
              Pick a starting point, then we turn it into a practical operating flow with clear handoffs,
              review points, and launch support.
            </p>

            <motion.div
              style={shouldReduceMotion ? undefined : { x: railX }}
              className="mt-10 rounded-[8px] border border-black/[0.08] bg-white/62 p-5 shadow-[0_18px_60px_rgba(25,20,40,0.06)] backdrop-blur"
            >
              <div className="relative grid gap-5">
                <div className="absolute left-5 top-5 h-[calc(100%-40px)] w-px bg-black/10" />
                <motion.div
                  style={shouldReduceMotion ? { height: "100%" } : { height: timelineHeight }}
                  className="absolute left-5 top-5 w-px bg-gradient-to-b from-[#8400FF] to-[#1C76FD]"
                />

                {phases.map((phase, index) => {
                  const Icon = phase.icon;
                  return (
                    <div key={phase.title} className="relative flex gap-4">
                      <span className="z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-black/[0.08] bg-white text-[#8400FF] shadow-[0_10px_30px_rgba(25,20,40,0.06)]">
                        <Icon size={17} />
                      </span>
                      <div className="pt-0.5">
                        <div className="flex items-center gap-3">
                          <span className="text-[11px] font-semibold tracking-[0.18em] text-neutral-400">
                            0{index + 1}
                          </span>
                          <h3 className="font-poppins text-lg font-semibold text-neutral-950">
                            {phase.title}
                          </h3>
                        </div>
                        <p className="mt-1 text-sm leading-6 text-neutral-600">{phase.detail}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>

          <div className="grid gap-4">
            {packages.map((pkg, index) => (
              <PackageCard
                key={pkg.title}
                pkg={pkg}
                index={index}
                progress={smoothProgress}
                reduced={shouldReduceMotion}
              />
            ))}

            <motion.a
              style={shouldReduceMotion ? undefined : { opacity: ctaOpacity, y: ctaY }}
              href="https://cal.com/chandan-kumar-zhrofj/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-1 inline-flex min-h-14 items-center justify-center gap-2 rounded-[8px] bg-neutral-950 px-6 text-sm font-semibold text-white shadow-[0_18px_44px_rgba(20,16,30,0.18)] transition-colors duration-300 hover:bg-[#4D00FF]"
            >
              <FiPhoneCall size={15} />
              Book a Free Strategy Call
              <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" size={15} />
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PackagesSection;
