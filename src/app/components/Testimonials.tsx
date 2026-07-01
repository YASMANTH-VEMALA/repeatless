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
      className="flex w-full flex-col items-center overflow-hidden bg-transparent pb-14 pt-4 md:pb-16 2xl:pt-24"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      {/* Heading */}
      <motion.div
        className="flex w-full flex-col items-center justify-center px-5 pb-8 sm:px-6 md:pb-16"
        variants={fadeUpVariants}
      >
        {/* Section Heading */}
        <h2 className="max-w-[633px] text-center font-poppins text-3xl font-medium leading-tight tracking-tight text-neutral-950 sm:text-[2rem] md:text-[clamp(3rem,4.5vw,3.375rem)] md:leading-[1.12]">
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
