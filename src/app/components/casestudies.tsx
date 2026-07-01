"use client";

import Image from "next/image";
import Link from "next/link";
import { blogs } from "../../../public/data/blogs";
import { useEffect, useRef } from "react";
import { motion, Variants } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

export default function CaseStudies() {
  const isDarkTheme = false;
  const scrollerRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const resumeAtRef = useRef(0);

  useEffect(() => {
    document.body.classList.remove("theme-dark");
  }, []);

  // Continuous auto-scroll (marquee style) with seamless looping.
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    let raf = 0;
    const speed = 0.6; // px per frame

    const step = () => {
      if (!pausedRef.current && performance.now() >= resumeAtRef.current) {
        const half = el.scrollWidth / 2;
        let next = el.scrollLeft + speed;
        if (half > 0 && next >= half) next -= half;
        el.scrollLeft = next;
      }
      raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  const scrollByCards = (direction: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const firstCard = el.querySelector<HTMLElement>("[data-card]");
    const gap = parseFloat(getComputedStyle(el).columnGap || "0") || 0;
    const amount = firstCard ? firstCard.offsetWidth + gap : el.clientWidth * 0.8;
    // Pause auto-scroll briefly so the manual step isn't fought by the loop.
    resumeAtRef.current = performance.now() + 2500;
    el.scrollBy({ left: direction * amount, behavior: "smooth" });
  };

  const containerVariants: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.1 },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  // Duplicate the list so the auto-scroll can loop seamlessly.
  const loopItems = [...blogs, ...blogs];

  return (
    <motion.section
      id="case-studies"
      className="relative flex w-full flex-col items-center justify-center gap-10 overflow-hidden bg-transparent px-5 py-16 transition-colors duration-1000 sm:px-6 md:gap-12 md:px-20 md:py-32"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-900/60 via-transparent to-transparent transition-opacity duration-1000"
        style={{ opacity: isDarkTheme ? 0.7 : 0 }}
      />

      <motion.div
        className="relative z-10 mx-auto flex max-w-[934px] flex-col items-center gap-4 text-center"
        variants={cardVariants}
      >
        <span className="mb-2 block font-poppins text-xs font-semibold uppercase tracking-[0.25em] text-[#8400FF]">
          The Gallery
        </span>
        <h2
          className={`font-poppins text-3xl font-semibold leading-[1.08] tracking-[-0.035em] transition-colors duration-700 sm:text-[42px] md:text-[58px] ${
            isDarkTheme ? "text-white" : "text-neutral-950"
          }`}
        >
          Proven Results. Real Impact.
        </h2>
        <p
          className={`max-w-[578px] text-center font-manrope text-[15px] font-light leading-[1.6] opacity-80 transition-colors duration-700 md:text-[17px] ${
            isDarkTheme ? "text-neutral-300" : "text-neutral-700"
          }`}
        >
          Discover how we have helped businesses across industries automate their
          operations, improve efficiency, and drive growth through innovative AI
          solutions.
        </p>
      </motion.div>

      <motion.div
        className="relative z-10 w-full"
        variants={cardVariants}
        onMouseEnter={() => (pausedRef.current = true)}
        onMouseLeave={() => (pausedRef.current = false)}
      >
        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[rgb(244,241,236)] to-transparent md:w-20" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[rgb(244,241,236)] to-transparent md:w-20" />

        <div
          ref={scrollerRef}
          className="flex gap-4 overflow-x-auto px-1 pb-4 [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-6 [&::-webkit-scrollbar]:hidden"
        >
          {loopItems.map((item, i) => {
            const idx = i % blogs.length;
            return (
              <Link
                key={`${item.slug}-${i}`}
                href={`/casestudies/${item.slug}`}
                data-card
                className="group flex h-[400px] w-[min(82vw,300px)] shrink-0 flex-col overflow-hidden rounded-lg border border-neutral-950/10 bg-white/60 shadow-[0_16px_45px_rgba(24,24,27,0.06)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-[#8400FF]/35 hover:bg-white sm:h-[460px] sm:w-[360px] lg:h-[480px] lg:w-[420px]"
              >
                <div className="relative h-[170px] w-full shrink-0 overflow-hidden bg-neutral-950/5 sm:h-[210px]">
                  <Image
                    src={item.image}
                    alt={`${item.title} automation case study`}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(min-width: 1024px) 420px, (min-width: 640px) 360px, 300px"
                  />
                </div>

                <div className="flex min-h-0 flex-1 flex-col p-5">
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 font-manrope text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-500">
                    <span>{String(idx + 1).padStart(2, "0")}</span>
                    <span>{item.category || "Case Study"}</span>
                  </div>
                  <h3 className="line-clamp-2 font-poppins text-[22px] font-semibold leading-[1.12] tracking-tight text-neutral-950 transition-colors duration-300 group-hover:text-[#8400FF] sm:text-[clamp(1.625rem,2.5vw,1.875rem)]">
                    {item.title}
                  </h3>
                  <p className="mt-4 line-clamp-3 font-manrope text-sm leading-6 text-neutral-600">
                    {item.excerpt}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Arrow controls */}
        <button
          type="button"
          aria-label="Previous case studies"
          onClick={() => scrollByCards(-1)}
          className="absolute left-2 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-950/10 bg-white/80 text-neutral-800 shadow-[0_8px_24px_rgba(24,24,27,0.12)] backdrop-blur transition hover:border-[#8400FF]/40 hover:bg-white hover:text-[#8400FF] md:left-4"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          aria-label="Next case studies"
          onClick={() => scrollByCards(1)}
          className="absolute right-2 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-950/10 bg-white/80 text-neutral-800 shadow-[0_8px_24px_rgba(24,24,27,0.12)] backdrop-blur transition hover:border-[#8400FF]/40 hover:bg-white hover:text-[#8400FF] md:right-4"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </motion.div>

      {/* View all CTA */}
      <motion.div variants={cardVariants} className="relative z-10">
        <Link
          href="/casestudies"
          className="group inline-flex items-center gap-2 rounded-full bg-[#8400FF] px-7 py-3 font-poppins text-sm font-semibold text-white shadow-[0_12px_30px_rgba(132,0,255,0.28)] transition hover:bg-[#6f00d6]"
        >
          View all case studies
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </motion.div>
    </motion.section>
  );
}
