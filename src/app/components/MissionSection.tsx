"use client";

import { FC, useRef } from "react";
import { MotionValue, motion, useScroll, useSpring, useTransform } from "framer-motion";

interface PhraseProps {
  children: React.ReactNode;
  index: number;
  total: number;
  progress: MotionValue<number>;
}

const Phrase: FC<PhraseProps> = ({ children, index, total, progress }) => {
  const start = Math.max(0, (index - 0.8) / total);
  const peak = (index + 0.35) / total;
  const end = Math.min(1, (index + 1.35) / total);
  const opacity = useTransform(progress, [start, peak, end], [0.14, 1, 1]);
  const y = useTransform(progress, [start, peak, end], [10, 0, -6]);
  const textShadow = useTransform(progress, [start, peak, end], [
    "0 0 0 rgba(255,255,255,0)",
    "0 0 28px rgba(255,255,255,0.34)",
    "0 0 8px rgba(255,255,255,0.12)",
  ]);

  return (
    <motion.span
      style={{ opacity, y, textShadow }}
      className="relative block text-[#F6F3F4] will-change-transform"
    >
      {children}
    </motion.span>
  );
};

const MissionSection: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    damping: 38,
    stiffness: 54,
    mass: 1.2,
  });

  const missionLines = [
    "Our mission is to eliminate repetitive",
    "tasks",
    "and accelerate business growth",
    "through custom AI & n8n automations.",
    "We transform complex operational",
    "hurdles into seamless, end-to-end",
    "workflows,",
    "with enterprise-grade security, speed,",
    "and precision at their core.",
  ];

  return (
    <div ref={containerRef} className="relative h-[320vh] w-full bg-[#05060B]">
      <section
        id="about"
        className="sticky top-0 flex h-[100svh] w-full flex-col justify-center overflow-hidden bg-[#05060B] select-none"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 z-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:11.111%_100%,100%_100svh]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_70%_36%,rgba(255,255,255,0.055),transparent_26%),linear-gradient(to_bottom,rgba(5,6,11,0.1),rgba(5,6,11,0.84))] pointer-events-none"
        />

        {/* Main Grid Content */}
        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-16 py-16 md:py-20 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center">
          {/* Left Column: Heading */}
          <div className="md:col-span-5 lg:col-span-5 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5rem] font-sans font-medium tracking-normal text-[#F6F3F4] leading-[1.12]">
                Mission<br className="hidden md:block" /> Statement
              </h2>
            </motion.div>
          </div>

          {/* Right Column: Phrase-by-phrase Scroll Reveal */}
          <div className="md:col-span-7 lg:col-span-7 md:pl-4">
            <p className="max-w-[760px] space-y-2 text-xl sm:text-2xl md:text-[1.75rem] lg:text-[2rem] font-sans font-bold tracking-normal leading-[1.35]">
              {missionLines.map((phrase, index) => (
                <Phrase key={phrase} index={index} total={missionLines.length} progress={smoothProgress}>
                  {phrase}
                </Phrase>
              ))}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MissionSection;
