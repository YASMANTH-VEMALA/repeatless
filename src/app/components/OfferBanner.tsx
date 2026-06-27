"use client";

import { motion } from "framer-motion";
import { FiArrowUpRight, FiCheck } from "react-icons/fi";

const deliverables = [
  {
    title: "Done-For-You Build",
    desc: "Your automation is fully built, tested, and deployed by me — not handed to a junior. Ready in 7–10 days.",
  },
  {
    title: "1 Month Free Support",
    desc: "Every system I build comes with 1 month of free support — bug fixes, tweaks, and questions included. No extra charge.",
  },
  {
    title: "Full Maintenance Included",
    desc: "Monitoring, alerts, fixes, optimizations, and updates — all handled as part of maintenance. One less thing to worry about.",
  },
  {
    title: "ROI Dashboard",
    desc: "A live dashboard showing hours saved, tasks automated, and real business impact — every single week.",
  },
  {
    title: "30-Day Guarantee",
    desc: "If your automation doesn't deliver measurable results within 30 days, I fix or rebuild it at no charge.",
  },
  {
    title: "$499 Template Pack — Free",
    desc: "Every client gets my personal library of pre-built n8n templates. Plug in, customize, and launch in minutes.",
  },
];

export default function OfferBanner() {
  return (
    <section id="contact" className="w-full bg-[#04051B] py-20 sm:py-28 px-4 sm:px-10">
      <div className="max-w-6xl mx-auto">

        {/* Card */}
        <motion.div
          className="relative rounded-3xl overflow-hidden border border-purple-500/20 bg-gradient-to-br from-[#0d0630] via-[#08021f] to-[#04051B] p-8 sm:p-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* Glow accents */}
          <div className="absolute -top-20 -left-20 w-80 h-80 bg-purple-600 opacity-20 blur-[100px] rounded-full pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-blue-600 opacity-10 blur-[120px] rounded-full pointer-events-none" />

          <div className="relative flex flex-col gap-10">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
              <div className="flex flex-col gap-3 max-w-xl">
                <span className="text-purple-400 font-dmSans text-sm font-medium tracking-widest uppercase">
                  What You Get When You Work With Me
                </span>
                <h2 className="text-white font-poppins font-semibold text-3xl sm:text-5xl leading-tight tracking-tight">
                  Everything to Automate,<br className="hidden sm:block" /> Scale &amp; Stay Ahead.
                </h2>
                <p className="text-white/50 font-dmSans text-base leading-relaxed">
                  Not a template. Not an offshore team. You get me — building, running, and optimizing
                  your systems personally.
                </p>
              </div>

              {/* CTA — desktop */}
              <a
                href="https://calendly.com/chandannetha/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-2 bg-[#4D00FF] hover:bg-[#3700cc] text-white font-poppins font-medium text-sm px-8 py-4 rounded-full shadow-[0_0_32px_rgba(77,0,255,0.4)] transition-all duration-300 whitespace-nowrap shrink-0 self-start"
              >
                Book a Free Audit <FiArrowUpRight className="w-4 h-4" />
              </a>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-white/8" />

            {/* Deliverables grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {deliverables.map((item, idx) => (
                <motion.div
                  key={idx}
                  className="flex flex-col gap-3 p-5 rounded-2xl bg-white/[0.03] border border-white/8 hover:border-purple-500/30 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.07 }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center shrink-0">
                      <FiCheck className="w-3 h-3 text-purple-400" />
                    </div>
                    <h3 className="text-white font-poppins font-medium text-sm">{item.title}</h3>
                  </div>
                  <p className="text-white/45 font-dmSans text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* CTA — mobile */}
            <a
              href="https://calendly.com/chandannetha/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="sm:hidden flex items-center justify-center gap-2 bg-[#4D00FF] hover:bg-[#3700cc] text-white font-poppins font-medium text-sm px-8 py-4 rounded-full shadow-[0_0_32px_rgba(77,0,255,0.4)] transition-all duration-300"
            >
              Book a Free Audit <FiArrowUpRight className="w-4 h-4" />
            </a>

            {/* Trust line */}
            <p className="text-center text-white/25 font-dmSans text-xs">
              No contracts. No retainer required to start. 1 month free support on every build. 30-day results guarantee.
            </p>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
