"use client";

import React, { useEffect, useRef, useState } from "react";
import Lottie from "lottie-react";
import type { LottieRefCurrentProps } from "lottie-react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import analysisAnimation from "../../../public/animations/work-analysis.json";
import designAnimation from "../../../public/animations/work-design.json";
import deployAnimation from "../../../public/animations/work-deploy-model.json";
import scaleAnimation from "../../../public/animations/work-scale-sale.json";

type WorkStep = {
  kicker: string;
  title: string;
  description: string;
  animation: unknown;
  tone: string;
  glow: string;
};

const steps: WorkStep[] = [
  {
    kicker: "01 / Discover",
    title: "Find the work that should not be manual anymore.",
    description:
      "I audit your workflows, tools, response times, missed handoffs, and repeated decisions to uncover where automation will create the most leverage.",
    animation: analysisAnimation,
    tone: "#7c3aed",
    glow: "rgba(124,58,237,0.28)",
  },
  {
    kicker: "02 / Design",
    title: "Turn the messy process into a clean automation blueprint.",
    description:
      "I design the workflow logic, triggers, approvals, integrations, and fallback paths before anything is built, so the system has a real operating model.",
    animation: designAnimation,
    tone: "#2563eb",
    glow: "rgba(37,99,235,0.24)",
  },
  {
    kicker: "03 / Deploy",
    title: "Launch the automation inside your actual business stack.",
    description:
      "I connect the tools, build the automations, test edge cases, and roll everything out carefully so your operations keep moving while the system goes live.",
    animation: deployAnimation,
    tone: "#8400ff",
    glow: "rgba(132,0,255,0.28)",
  },
  {
    kicker: "04 / Scale",
    title: "Improve, expand, and compound the system over time.",
    description:
      "Once the system is live, I monitor performance, remove friction, add new branches, and keep improving the automation as your business grows.",
    animation: scaleAnimation,
    tone: "#0f766e",
    glow: "rgba(20,184,166,0.22)",
  },
];

function StepVisual({
  isActive,
  shouldReduceMotion,
  step,
}: {
  isActive: boolean;
  shouldReduceMotion: boolean | null;
  step: WorkStep;
}) {
  const lottieRef = useRef<LottieRefCurrentProps | null>(null);

  useEffect(() => {
    const animation = lottieRef.current;
    if (!animation) return;

    if (isActive && !shouldReduceMotion) {
      animation.play();
    } else {
      animation.pause();
    }
  }, [isActive, shouldReduceMotion]);

  return (
    <motion.div
      aria-hidden={!isActive}
      animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.98 }}
      transition={{ duration: 0.2, ease: "linear" }}
      className="pointer-events-none absolute right-0 top-1/2 z-0 flex w-full -translate-y-1/2 transform-gpu items-center justify-center opacity-90 contain-paint lg:w-[68vw] lg:justify-end lg:pr-10"
      style={{ visibility: isActive ? "visible" : "hidden" }}
    >
      <div
        aria-hidden="true"
        className="absolute h-[min(88vw,640px)] w-[min(88vw,640px)] rounded-full opacity-80"
        style={{ background: `radial-gradient(circle, ${step.glow}, transparent 68%)` }}
      />

      <div className="relative flex aspect-square w-[min(108vw,820px)] items-center justify-center opacity-75 lg:opacity-100">
        <div className="absolute inset-[18%] rounded-full bg-white/25" />
        <div className="relative z-10 h-full w-full transform-gpu">
          <Lottie
            lottieRef={lottieRef}
            animationData={step.animation}
            autoplay={isActive && !shouldReduceMotion}
            loop={!shouldReduceMotion}
            rendererSettings={{ progressiveLoad: true }}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const activeIndexRef = useRef(0);
  const shouldReduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const nextIndex = Math.min(steps.length - 1, Math.floor(latest * steps.length));
    if (activeIndexRef.current !== nextIndex) {
      activeIndexRef.current = nextIndex;
      setActiveIndex(nextIndex);
    }
  });

  const trackX = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `-${(steps.length - 1) * 100}%`]
  );
  const progressScale = useTransform(scrollYProgress, [0.02, 0.98], [0, 1]);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative w-full bg-transparent"
      style={{ minHeight: `calc(${steps.length} * 100vh)` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute inset-x-0 top-0 z-20 h-1 bg-black/[0.04]">
          <motion.div
            style={{ scaleX: shouldReduceMotion ? 1 : progressScale }}
            className="h-full origin-left bg-[#8400FF]"
          />
        </div>

        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.035)_1px,transparent_1px)] bg-[size:48px_48px] opacity-40 [mask-image:linear-gradient(to_bottom,transparent,black_16%,black_84%,transparent)]" />

        <div className="absolute left-5 top-24 z-20 md:left-12 lg:left-24">
          <div className="flex w-fit items-center justify-center gap-[10px] rounded-[59px] border border-black/5 bg-white/75 px-5 py-2.5 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.05)] backdrop-blur-xl">
            <div className="h-3 w-3 rounded-full bg-[#8400FF] shadow-[0_0_16px_#6D21F0,0_0_8.1px_#1C76FD]" />
            <span className="font-poppins text-base leading-[130%] text-[#8400FF] md:text-xl">
              How it works
            </span>
          </div>
        </div>

        <motion.div
          className="flex h-screen w-full transform-gpu will-change-transform"
          style={shouldReduceMotion ? undefined : { x: trackX }}
        >
          {steps.map((step, index) => {
            const isActive = activeIndex === index;
            return (
              <article
                key={step.kicker}
                className="relative grid h-screen w-screen shrink-0 grid-cols-1 items-center gap-8 overflow-hidden px-5 pb-28 pt-36 md:px-12 md:pb-32 lg:grid-cols-[0.9fr_1.1fr] lg:px-24 lg:pb-36 lg:pt-24"
              >
                <motion.div
                  animate={{ opacity: isActive ? 1 : 0.35 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="relative z-20 max-w-[680px]"
                >
                  <div className="font-poppins text-sm font-semibold uppercase tracking-[0.24em]" style={{ color: step.tone }}>
                    {step.kicker}
                  </div>
                  <h2 className="mt-5 font-poppins text-[clamp(2.8rem,4.8vw,5.4rem)] font-medium leading-[0.96] tracking-[-0.045em] text-neutral-950">
                    {step.title}
                  </h2>
                  <p className="mt-5 max-w-xl font-roboto text-lg leading-8 text-neutral-600 md:text-xl md:leading-9">
                    {step.description}
                  </p>

                  <div className="mt-7 flex items-center gap-3">
                    {steps.map((item, dotIndex) => (
                      <div
                        key={item.kicker}
                        className="h-2 rounded-full transition-all duration-300"
                        style={{
                          width: dotIndex === activeIndex ? 48 : 10,
                          backgroundColor:
                            dotIndex === activeIndex ? steps[activeIndex].tone : "rgba(24,24,27,0.16)",
                        }}
                      />
                    ))}
                  </div>
                </motion.div>

                <StepVisual
                  isActive={isActive}
                  shouldReduceMotion={shouldReduceMotion}
                  step={step}
                />
              </article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
