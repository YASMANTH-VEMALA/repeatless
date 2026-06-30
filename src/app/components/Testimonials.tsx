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
      className="flex flex-col items-center pt-0 2xl:pt-25 pb-17 w-full bg-transparent overflow-hidden"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      {/* Heading */}
      <motion.div
        className="flex flex-col justify-center items-center px-4 pb-12 md:pb-16 w-full"
        variants={fadeUpVariants}
      >
        {/* Section Heading */}
        <h2 className="text-neutral-950 text-[2rem] leading-[40px] md:text-[3.375rem] md:leading-[69px] text-center font-poppins font-medium tracking-[-0.04em] max-w-[633px]">
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
