"use client";

import Image from "next/image";
import Link from "next/link";
import Marquee from "react-fast-marquee";
import { blogs } from "../../../public/data/blogs";
import { useEffect } from "react";
import { motion, Variants } from "framer-motion";

export default function CaseStudies() {
  const isDarkTheme = false;

  useEffect(() => {
    document.body.classList.remove("theme-dark");
  }, []);

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

  return (
    <motion.section
      id="case-studies"
      className="relative flex w-full flex-col items-center justify-center gap-12 overflow-hidden bg-transparent px-6 py-24 transition-colors duration-1000 md:px-20 md:py-32"
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
          className={`font-poppins text-[42px] font-semibold leading-[1.05] tracking-[-0.04em] transition-colors duration-700 md:text-[58px] ${
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

      <motion.div className="relative z-10 w-screen overflow-hidden" variants={cardVariants}>
        <Marquee
          autoFill
          pauseOnHover
          gradient
          gradientColor="244, 241, 236"
          gradientWidth={80}
          speed={36}
        >
          {blogs.map((item, idx) => (
            <Link
              key={item.slug}
              href={`/casestudies/${item.slug}`}
              className="group mx-3 flex h-[410px] w-[300px] shrink-0 flex-col overflow-hidden rounded-lg border border-neutral-950/10 bg-white/60 shadow-[0_16px_45px_rgba(24,24,27,0.06)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-[#8400FF]/35 hover:bg-white sm:h-[450px] sm:w-[360px] lg:h-[470px] lg:w-[420px]"
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
                <div className="mb-4 flex items-center justify-between gap-4 font-manrope text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-500">
                  <span>{String(idx + 1).padStart(2, "0")}</span>
                  <span>{item.category || "Case Study"}</span>
                </div>
                <h3 className="line-clamp-2 font-poppins text-[24px] font-semibold leading-[1.08] tracking-[-0.04em] text-neutral-950 transition-colors duration-300 group-hover:text-[#8400FF] sm:text-[30px]">
                  {item.title}
                </h3>
                <p className="mt-4 line-clamp-3 font-manrope text-sm leading-6 text-neutral-600">
                  {item.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </Marquee>
      </motion.div>
    </motion.section>
  );
}
