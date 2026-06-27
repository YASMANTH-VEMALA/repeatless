"use client";
import React from "react";
import { Variants, motion } from "framer-motion";

const HeroSection: React.FC = () => {
  const mobileCards = [
    { title: "Discover", desc: "I analyze your current workflows, pain points, and growth goals in a 1:1 strategy session.", img: "/images/a1.png" },
    { title: "Design", desc: "I build a custom automation blueprint tailored to your tools, team, and business model.", img: "/images/a2.png" },
    { title: "Deploy", desc: "I implement and integrate everything with minimal disruption to your operations.", img: "/images/a3.png" },
    { title: "Scale", desc: "I monitor, optimize, and expand your automation systems as your business grows.", img: "/images/a4.png" },
  ];

  const cardVariant = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    show: (i: number) => ({ opacity: 1, y: 0, scale: 1, transition: { delay: 0.14 * i, duration: 0.55, ease: "easeOut" } }),
  };

  return (
    <section className="relative w-full min-h-[744px] bg-[#000000] overflow-hidden">
      {/* ---------- HERO CONTENT (Pill + Title) ---------- */}
      <div
        className="
          px-6 pt-8 pb-4 md:!px-8 lg:!px-0 lg:absolute lg:left-[101px] lg:top-[65px]
          w-full lg:w-[566px] h-auto lg:h-[201px]
          flex flex-col items-start gap-[16px]
        "
      >
        {/* count pill */}
        <div
          className="
            flex items-center justify-center gap-[10px]
            px-[20px] py-[10px]
            bg-[rgba(77,0,255,0.1)] border border-[rgba(255,255,255,0.1)]
            rounded-[59px] w-fit
          "
        >
          <div
            className="
              w-[12px] h-[12px] rounded-full bg-[#8400FF]
              shadow-[0_0_16px_#6D21F0,0_0_8.1px_#1C76FD]
            "
          />
          <span className="text-[#8400FF] font-poppins font-normal text-[14px] sm:text-[16px] md:text-[20px] leading-[130%]">
            How it works
          </span>
        </div>

        {/* title */}
        <motion.h1
          variants={{
            hidden: { opacity: 0, y: 28 },
            show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
          className="
            font-poppins font-medium text-white
            text-2xl sm:text-3xl md:text-4xl lg:text-[54px]
            leading-[120%] md:leading-[69px]
            tracking-[-1px] md:tracking-[-3.69497px]
            max-w-full break-words
          "
        >
          How I Work With You
        </motion.h1>
      </div>

      {/* ---------- DESKTOP: absolute-positioned cards ---------- */}
      <motion.div initial="hidden" animate="show" className="hidden lg:block">
        {/* Discover */}
        <motion.div custom={0} className="md:absolute md:left-[84px] md:top-[330px] w-[153px] h-[226px] flex flex-col items-center gap-4">
          <div
            className="w-[115px] h-[106px] rounded-[25px] border border-[rgba(255,255,255,0.1)] shadow-[0_0_16px_#6D21F0,0_0_8.1px_#1C76FD] bg-cover bg-center"
            style={{ backgroundImage: "url('/images/a1.png')" }}
          />
          <div className="flex flex-col items-center gap-2 text-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70 font-roboto font-medium text-[18px] leading-[24px]">
              Discover
            </span>
            <p className="text-[#9B96B0] font-roboto text-[16px] leading-[24px] w-[153px]">I analyze your current workflows, pain points, and growth goals in a 1:1 strategy session.</p>
          </div>
        </motion.div>

        {/* Design */}
        <motion.div custom={1} variants={cardVariant as Variants} className="md:absolute md:left-[367px] md:top-[330px] w-[211px] h-[228px] flex flex-col items-center gap-2">
          <div className="flex flex-col items-center gap-2 text-center pb-5">
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70 font-roboto font-medium text-[18px] leading-[24px]">Design</span>
            <p className="text-[#9B96B0] font-roboto text-[16px] leading-[24px] w-[191px]">I build a custom automation blueprint tailored to your tools, team, and business model.</p>
          </div>
          <div
            className="w-[100px] h-[98px] rounded-[25px] border border-[rgba(255,255,255,0.1)] shadow-[0_0_16px_#6D21F0,0_0_8.1px_#1C76FD] bg-cover bg-center pt-5"
            style={{ backgroundImage: "url('/images/a2.png')" }}
          />
        </motion.div>

        {/* Deploy */}
        <motion.div custom={2} variants={{
          hidden: { opacity: 0, y: 28, scale: 0.8 },
          show: (i: number) => ({
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { delay: i * 0.1, duration: 0.6, ease: "easeInOut" },
          }),
        }} className="md:absolute md:left-[736px] md:top-[330px] w-[191px] h-[214px] flex flex-col items-center gap-2">
          <div
            className="w-[100px] h-[98px] rounded-[25px] border border-[rgba(255,255,255,0.1)] shadow-[0_0_16px_#6D21F0,0_0_8.1px_#1C76FD] bg-cover bg-center"
            style={{ backgroundImage: "url('/images/a3.png')" }}
          />
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70 font-roboto font-medium text-[18px] leading-[24px]">Deploy</span>
          <p className="text-[#9B96B0] font-roboto text-[16px] leading-[24px] w-[191px] text-center">I implement and integrate everything with minimal disruption to your operations.</p>
        </motion.div>

        {/* Scale */}
        <motion.div custom={3} variants={{
          hidden: { opacity: 0, y: 20, scale: 0.8 },
          show: (i: number) => ({
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
          }),
        }} className="md:absolute md:left-[1200px] md:top-[330px] w-[191px] h-[254px] flex flex-col items-center gap-2">
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70 font-roboto font-medium text-[18px] leading-[24px]">Scale</span>
          <p className="text-[#9B96B0] font-roboto text-[16px] leading-[24px] w-[191px] text-center">I monitor, optimize, and expand your automation systems as your business grows.</p>
          <div
            className="w-[100px] h-[98px] rounded-[25px] border border-[rgba(255,255,255,0.1)] shadow-[0_0_16px_#6D21F0,0_0_8.1px_#1C76FD] bg-cover bg-center"
            style={{ backgroundImage: "url('/images/a4.png')" }}
          />
        </motion.div>
      </motion.div>

      {/* ---------- MOBILE/TABLET: horizontal cards ---------- */}
      <div className="lg:hidden mt-6 px-4">
        <div className="grid grid-cols-2 gap-4">
          {mobileCards.map((c, i) => (
            <motion.div
              key={c.title}
              custom={i}
              variants={{
                hidden: { opacity: 0, y: 20, scale: 0.9 },
                show: (i: number) => ({
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
                }),
              }}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.6 }}
              className="flex flex-col items-center gap-3"
            >
              <div
                className="w-[90px] h-[90px] rounded-[20px] border border-[rgba(255,255,255,0.1)] shadow-[0_0_12px_#6D21F0,0_0_6px_#1C76FD] bg-cover bg-center"
                style={{ backgroundImage: `url(${c.img})` }}
              />
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70 font-roboto font-medium text-[15px] text-center">
                {c.title}
              </span>
              <p className="text-[#9B96B0] text-center text-sm px-1">{c.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <svg className="hidden lg:block absolute left-[237px] top-[363.5px]" width="921" height="125" viewBox="0 0 921 125" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 112C60.9571 112 62.5923 10.0001 144.352 0.499268M341.665 0.499268C399.442 0.499268 398.897 124 485.562 124M711.764 124C812.056 121.001 827.339 0.499039 920 0.499271" stroke="white" strokeLinecap="round" strokeDasharray="15 15" />
      </svg>
      {/* CTA Button */}
      <div className="flex justify-center lg:absolute lg:bottom-4 lg:left-1/2 lg:-translate-x-1/2 pt-10">
        <a
          href="https://calendly.com/chandannetha/30min"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 px-4 py-2 md:px-5 md:py-3 bg-[#4D00FF] rounded-[40px] hover:bg-[#3700cc] transition"
        >
          <span className="text-white font-poppins text-[12px] sm:text-[14px] md:text-[14px]">
            Book a Free Strategy Call
          </span>
          <svg
            width="18"
            height="18"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="rotate-90"
          >
            <path
              d="M6 9L11 14L16 9"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>

      </div>


    </section>
  );
};

export default HeroSection;
