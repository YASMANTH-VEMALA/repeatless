"use client";

import Image from "next/image";
import Link from "next/link";
import { blogs } from "../../../public/data/blogs";
import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";

const FEATURED = blogs.slice(0, 6);

export default function CaseStudies() {
  return (
    <section id="case-studies" className="w-full bg-[#04051B] py-20 sm:py-28 px-4 sm:px-10">
      <div className="max-w-6xl mx-auto flex flex-col gap-14">

        {/* Heading */}
        <motion.div
          className="flex flex-col items-center text-center gap-4"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-2 px-4 py-1.5 bg-[rgba(77,0,255,0.1)] border border-white/10 rounded-full">
            <span className="w-2.5 h-2.5 rounded-full bg-[#8400FF] shadow-[0_0_10px_#6D21F0]" />
            <span className="text-[#8400FF] text-sm font-dmSans">Real Work. Real Results.</span>
          </div>

          <h2 className="text-white font-poppins font-semibold text-3xl sm:text-5xl leading-tight tracking-tight max-w-2xl">
            Businesses I&apos;ve Automated Across the West
          </h2>
          <p className="text-white/50 font-dmSans text-base sm:text-lg max-w-xl leading-relaxed">
            From New York ad agencies to Toronto content brands — every system built, every result real.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURED.map((item, idx) => (
            <motion.div
              key={item.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
            >
              <Link
                href={`/casestudies/${item.slug}`}
                className="group flex flex-col gap-4 bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden hover:border-purple-500/40 hover:bg-white/[0.05] transition-all duration-300"
              >
                {/* Image */}
                <div className="relative w-full h-48 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Category badge */}
                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm border border-white/10 rounded-full px-3 py-1 text-[11px] text-white/70 font-dmSans">
                    {item.category}
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col gap-3 px-5 pb-5">
                  {/* Result stat */}
                  <div className="text-purple-400 font-dmSans text-xs font-medium tracking-wide uppercase">
                    {item.hero.meta.stat}
                  </div>

                  {/* Title */}
                  <h3 className="text-white font-poppins font-medium text-base leading-snug">
                    {item.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-white/50 font-dmSans text-sm leading-relaxed line-clamp-2">
                    {item.excerpt}
                  </p>

                  {/* Read more */}
                  <div className="flex items-center gap-1 text-purple-400 font-dmSans text-sm mt-1 group-hover:gap-2 transition-all duration-200">
                    Read case study <FiArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View all CTA */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link
            href="/casestudies"
            className="flex items-center gap-2 border border-white/20 hover:border-purple-500/60 text-white font-poppins text-sm font-medium px-7 py-3 rounded-full hover:bg-white/5 transition-all duration-300"
          >
            View All Case Studies <FiArrowUpRight className="w-4 h-4" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
