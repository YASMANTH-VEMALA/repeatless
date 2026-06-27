'use client';
import { FiPhoneCall } from "react-icons/fi";

export default function CTASection() {
  return (
    <section className="relative w-full bg-black text-white overflow-hidden">
      {/* Purple blur ellipse */}
      <div className="absolute -left-36 -top-36 w-[300px] h-[300px] rounded-full  opacity-30 filter blur-3xl lg:-left-40 lg:-top-40 lg:w-[354px] lg:h-[344px]" />

      <div className="container mx-auto flex flex-col lg:flex-row items-center lg:items-center justify-between px-6 sm:px-8 py-12 sm:py-16 gap-6">
        <div className="flex flex-col gap-4 text-center lg:text-left max-w-full lg:max-w-xl">
          <h2 className="font-poppins font-medium text-3xl sm:text-4xl md:text-5xl leading-[1.2] sm:leading-[1.2] tracking-[-0.5px]">
            Ready to Repeat Less &amp; <br /> Grow More?
          </h2>
          <p className="text-white/80 text-base sm:text-lg leading-6 sm:leading-7">
            Let’s map your automation journey together. Book your personalized demo today.
          </p>
        </div>

        <a
          href="https://calendly.com/chandannetha/30min"
          className="flex items-center justify-center gap-2 px-4 sm:px-5 py-3 sm:py-3 bg-[#4D00FF] rounded-full shadow-[0_0_16px_#6D21F0,0_0_8.1px_#1C76FD] text-white font-poppins font-medium text-sm sm:text-base whitespace-nowrap"
        >
          <FiPhoneCall size={16} />
          Book a Demo
        </a>
      </div>
    </section>
  );
}
