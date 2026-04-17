"use client";

import TestimonialCarousel from "./Carousel/Testimonial";
import { TestimonialData } from "../../../public/data/testimonialData";
import React from "react";
import { motion, Variants } from "framer-motion";

const TestimonialsSection = () => {
  // Variants for fade-up
  const containerVariants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.2 } },
  };

  const fadeUpVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <motion.section
    id="testimonials"
      className="flex flex-col items-center pt-0 2xl:pt-25 pb-17 w-full bg-[#0A0118]"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      {/* Heading */}
      <motion.div
        className="flex flex-col justify-center items-center px-4 pb-[100px] w-full"
        variants={fadeUpVariants}
      >
        {/* Badge */}
        <div className="flex items-center gap-2 px-5 py-2 bg-[rgba(77,0,255,0.1)] border border-white/10 rounded-full mb-6">
          <span className="w-3 h-3 rounded-full bg-[#8400FF] shadow-[0_0_16px_#6D21F0,0_0_8px_#1C76FD]" />
          <span className="text-[#8400FF] text-lg font-normal">Testimonials</span>
        </div>

        {/* Section Heading */}
        <h2 className="text-white text-[2rem] leading-[40px] md:text-[3.375rem] md:leading-[69px] text-center font-poppins font-medium tracking-[-0.04em] max-w-[633px]">
          What Clients Say About Working With Me
        </h2>
      </motion.div>

      {/* Carousel */}
      <motion.div variants={fadeUpVariants} className="w-full">
        <TestimonialCarousel testimonialData={TestimonialData} />
      </motion.div>
    </motion.section>
  );
};

export default TestimonialsSection;
