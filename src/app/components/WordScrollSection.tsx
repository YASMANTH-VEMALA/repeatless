"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";

const items = [
  "AI automations.",
  "workflow systems.",
  "sales pipelines.",
  "content systems.",
  "chat agents.",
  "CRM integrations.",
  "reporting dashboards.",
  "automation pipelines.",
  "performance systems.",
];

export default function WordScrollSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.45 });
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    document.body.classList.toggle("theme-dark", isInView);

    return () => {
      document.body.classList.remove("theme-dark");
    };
  }, [isInView]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % items.length);
    }, 1700);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section
      ref={containerRef}
      className="word-scroll fluid relative flex min-h-[72vh] w-full items-center justify-center overflow-hidden bg-[#151412] py-28 text-white md:min-h-screen"
    >
      <div className="word-scroll-inner w-full max-w-[1440px] px-6 font-sans md:px-16">
        <h2 className="word-scroll-heading heading-2 heading-sm flex flex-wrap items-baseline justify-center gap-x-[0.2em] font-extrabold leading-none tracking-tight text-white select-none">
          <span aria-hidden="true" className="leading-none">
            We build
          </span>
          <span className="sr-only">
            We build AI automations, workflow systems, sales pipelines, content systems,
            chat agents, CRM integrations, reporting dashboards, automation pipelines,
            and performance systems.
          </span>

          <span className="relative inline-block h-[1em] min-w-[min(100%,12ch)] overflow-hidden align-baseline text-left leading-none">
            <AnimatePresence mode="wait">
              <motion.span
                key={items[activeIndex]}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="word-scroll-item absolute left-0 top-0 whitespace-nowrap font-extrabold leading-none tracking-tight text-white select-none"
              >
                {items[activeIndex]}
              </motion.span>
            </AnimatePresence>
            <span
              className="invisible block whitespace-nowrap font-extrabold leading-none tracking-tight"
              aria-hidden="true"
            >
              reporting dashboards.
            </span>
          </span>
        </h2>
      </div>
    </section>
  );
}
