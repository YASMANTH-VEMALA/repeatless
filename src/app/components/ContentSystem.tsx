"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const ContentSystem: React.FC = () => {
  return (
    <section className="relative w-full py-20 px-6 md:px-12 lg:px-20 bg-black overflow-hidden">

      {/* Background Glow */}
      <div className="absolute left-[-200px] top-[100px] w-[500px] h-[500px] 
        bg-[#4D00FF] rounded-full blur-[250px] mix-blend-screen bg-opacity-20 pointer-events-none -z-10" />

      <div className="max-w-[1440px] mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col gap-6"
        >
          {/* Badge */}
          <div className="flex items-center gap-2 px-4 py-2 bg-[rgba(77,0,255,0.1)] border border-white/10 rounded-full w-fit">
            <span className="w-2 h-2 rounded-full bg-[#8400FF] shadow-[0_0_10px_#6D21F0]" />
            <span className="text-[#8400FF] text-sm font-medium tracking-wide uppercase">
              How The System Works
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium text-white leading-[1.1] tracking-tight">
            A Complete <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A84AFF] to-[#1C76FD]">
              Automated Infrastructure
            </span>
          </h2>

          <h3 className="text-xl md:text-2xl text-white/90 font-light">
            Not just a tool. A seamless output engine.
          </h3>

          <div className="space-y-6 text-lg text-white/70 font-light font-poppins">
            <p>
              Our automation engine connects content generation, optimization, and publishing into one seamless workflow.
              From <strong className="text-white/90 font-normal">blog articles</strong> to <strong className="text-white/90 font-normal">short-form videos</strong>,
              the system automatically creates and distributes multi-format content to all your social platforms—ensuring
              consistent visibility without manual intervention.
            </p>
            <p>
              Built for businesses that demand growth, this hands-free operation replaces manual coordination with intelligent systems.
              Whether you're a startup or scaling agency, maintain a continuous digital presence and let your marketing run on autopilot
              while you focus on results.
            </p>
          </div>

          <div className="pt-4">
            <a
              href="https://cal.com/chandan-kumar-zhrofj/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#4D00FF] rounded-full text-white font-medium hover:bg-[#3d00cc] transition-all group"
            >
              Start Automating
              <svg
                width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                className="group-hover:translate-x-1 transition-transform"
              >
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </motion.div>

        {/* Image Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="relative"
        >
          <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-4 md:p-6 overflow-hidden">
            {/* Glow behind image */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#8400FF]/10 to-transparent pointer-events-none" />

            <Image
              src="/images/content_system.png"
              alt="Automated Content System Diagram showing workflow from generation to publishing"
              width={800}
              height={600}
              className="w-full h-auto rounded-lg shadow-2xl"
              priority
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContentSystem;
