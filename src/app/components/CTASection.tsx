"use client";
import { FiPhoneCall } from "react-icons/fi";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  Variants,
} from "framer-motion";
import { useRef } from "react";

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 90%", "end 35%"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 28,
    mass: 0.45,
    restDelta: 0.0005,
  });
  const contentOpacity = useTransform(smoothProgress, [0, 0.45], [0.25, 1]);
  const contentY = useTransform(smoothProgress, [0, 0.65], [42, 0]);
  const contentFilter = useTransform(
    smoothProgress,
    [0, 0.7],
    ["blur(14px)", "blur(0px)"]
  );
  const buttonScale = useTransform(smoothProgress, [0.1, 0.7], [0.94, 1]);

  // Variants for fade-up
  const fadeUpVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full bg-transparent text-neutral-950 overflow-hidden"
    >
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-start justify-between gap-6 px-5 py-14 sm:px-6 md:px-8 md:py-16 lg:flex-row lg:items-center">
        {/* Text Content */}
        <motion.div
          className="max-w-xl flex flex-col gap-4"
          style={
            shouldReduceMotion
              ? undefined
              : { opacity: contentOpacity, y: contentY, filter: contentFilter }
          }
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUpVariants}
        >
          <h2 className="font-poppins text-3xl font-medium leading-tight tracking-tight sm:text-4xl md:text-[clamp(2.6rem,4vw,3.125rem)] md:leading-[1.18]">
            Ready to Repeat Less &amp; <br /> Grow More?
          </h2>
          <p className="text-base leading-7 text-neutral-700 md:text-lg">
            Let&apos;s map your automation journey together. Book a free strategy call — serving businesses across the USA, Canada &amp; Europe.
          </p>
        </motion.div>

        {/* CTA Button */}
        <motion.a
          href="https://cal.com/chandan-kumar-zhrofj/30min"
          className="flex w-full items-center justify-center gap-2 rounded-full bg-[#4D00FF] px-5 py-3 text-center font-poppins text-sm font-medium leading-5 text-white shadow-sm transition-colors hover:bg-[#3F00D8] sm:w-auto"
          style={
            shouldReduceMotion
              ? undefined
              : { opacity: contentOpacity, y: contentY, filter: contentFilter, scale: buttonScale }
          }
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUpVariants}
        >
          <FiPhoneCall size={16} />
          Book a Free Strategy Call
        </motion.a>
      </div>
    </section>
  );
}
