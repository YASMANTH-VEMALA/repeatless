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
};

const steps: WorkStep[] = [
  {
    kicker: "01 / Discover",
    title: "Find the work that should not be manual anymore.",
    description:
      "I audit your workflows, tools, response times, missed handoffs, and repeated decisions to uncover where automation will create the most leverage.",
    animation: analysisAnimation,
    tone: "#7c3aed",
  },
  {
    kicker: "02 / Design",
    title: "Turn the messy process into a clean automation blueprint.",
    description:
      "I design the workflow logic, triggers, approvals, integrations, and fallback paths before anything is built, so the system has a real operating model.",
    animation: designAnimation,
    tone: "#2563eb",
  },
  {
    kicker: "03 / Deploy",
    title: "Launch the automation inside your actual business stack.",
    description:
      "I connect the tools, build the automations, test edge cases, and roll everything out carefully so your operations keep moving while the system goes live.",
    animation: deployAnimation,
    tone: "#8400ff",
  },
  {
    kicker: "04 / Scale",
    title: "Improve, expand, and compound the system over time.",
    description:
      "Once the system is live, I monitor performance, remove friction, add new branches, and keep improving the automation as your business grows.",
    animation: scaleAnimation,
    tone: "#0f766e",
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
      className="pointer-events-none absolute right-0 top-1/2 z-0 flex w-full -translate-y-1/2 transform-gpu items-center justify-center opacity-90 contain-paint min-[1180px]:w-[62vw] min-[1180px]:justify-end min-[1180px]:pr-8 xl:w-[68vw] xl:pr-10"
      style={{ visibility: isActive ? "visible" : "hidden" }}
    >
      <div className="relative flex aspect-square w-[min(92vw,70svh,760px)] items-center justify-center opacity-75 min-[1180px]:opacity-100">
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

function MobileStepVisual({
  step,
  shouldReduceMotion,
}: {
  step: WorkStep;
  shouldReduceMotion: boolean | null;
}) {
  const lottieRef = useRef<LottieRefCurrentProps | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Play the animation only while it is on screen. Previously every step's
  // Lottie autoplayed and looped at once (4 running simultaneously), which is
  // what made mobile scrolling stutter. An IntersectionObserver keeps at most
  // the visible one or two running.
  useEffect(() => {
    if (shouldReduceMotion) return;
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const animation = lottieRef.current;
        if (!animation) return;
        if (entry.isIntersecting) animation.play();
        else animation.pause();
      },
      { threshold: 0.35 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [shouldReduceMotion]);

  return (
    <div ref={containerRef} className="relative mt-6 aspect-square w-full">
      <Lottie
        lottieRef={lottieRef}
        animationData={step.animation}
        autoplay={false}
        loop={!shouldReduceMotion}
        rendererSettings={{ progressiveLoad: true }}
      />
    </div>
  );
}

function MobileProcess() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="flex flex-col gap-14 px-5 py-16 sm:px-6 min-[1180px]:hidden">
      {steps.map((step) => (
        <motion.article
          key={step.kicker}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="font-poppins text-xs font-semibold uppercase tracking-[0.22em]" style={{ color: step.tone }}>
            {step.kicker}
          </div>
          <h2 className="mt-4 font-poppins text-[clamp(2rem,9vw,2.65rem)] font-medium leading-[1.05] tracking-tight text-neutral-950">
            {step.title}
          </h2>
          <p className="mt-4 text-base leading-7 text-neutral-600">
            {step.description}
          </p>

          <MobileStepVisual step={step} shouldReduceMotion={shouldReduceMotion} />
        </motion.article>
      ))}
    </div>
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
      className="relative w-full bg-transparent min-[1180px]:min-h-[400vh]"
    >
      <MobileProcess />

      <div className="sticky top-0 hidden h-[100svh] overflow-hidden min-[1180px]:block">
        <div className="absolute inset-x-0 top-0 z-20 h-1 bg-black/[0.04]">
          <motion.div
            style={{ scaleX: shouldReduceMotion ? 1 : progressScale }}
            className="h-full origin-left bg-[#8400FF]"
          />
        </div>

        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.035)_1px,transparent_1px)] bg-[size:48px_48px] opacity-40 [mask-image:linear-gradient(to_bottom,transparent,black_16%,black_84%,transparent)]" />

        <motion.div
          className="flex h-[100svh] w-full transform-gpu will-change-transform"
          style={shouldReduceMotion ? undefined : { x: trackX }}
        >
          {steps.map((step, index) => {
            const isActive = activeIndex === index;
            return (
              <article
                key={step.kicker}
                className="relative grid h-[100svh] w-[100dvw] shrink-0 grid-cols-1 items-center gap-8 overflow-y-auto overflow-x-hidden px-5 pb-20 pt-36 md:px-12 md:pb-24 min-[1180px]:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] min-[1180px]:px-16 min-[1180px]:pb-24 min-[1180px]:pt-24 xl:px-24 xl:pb-32"
              >
                <motion.div
                  animate={{ opacity: isActive ? 1 : 0.35 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="relative z-20 max-w-[660px]"
                >
                  <div className="font-poppins text-sm font-semibold uppercase tracking-[0.24em]" style={{ color: step.tone }}>
                    {step.kicker}
                  </div>
                  <h2 className="mt-5 font-poppins text-[clamp(2.4rem,4.2vw,4.9rem)] font-medium leading-[1] tracking-tight text-neutral-950">
                    {step.title}
                  </h2>
                  <p className="mt-5 max-w-xl font-poppins text-base leading-8 text-neutral-600 xl:text-lg xl:leading-8">
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
