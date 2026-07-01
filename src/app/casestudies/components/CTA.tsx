'use client';
import { FiPhoneCall } from "react-icons/fi";

export default function CTASection() {
  return (
    <section className="relative w-full bg-black text-white overflow-hidden">
      {/* Purple blur ellipse */}
      <div className="absolute -left-36 -top-36 w-[300px] h-[300px] rounded-full  opacity-30 filter blur-3xl lg:-left-40 lg:-top-40 lg:w-[354px] lg:h-[344px]" />

      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center justify-between gap-6 px-5 py-12 sm:px-8 sm:py-16 lg:flex-row lg:items-center">
        <div className="flex flex-col gap-4 text-center lg:text-left max-w-full lg:max-w-xl">
          <h2 className="font-poppins text-3xl font-medium leading-[1.2] tracking-normal sm:text-4xl sm:leading-[1.2] md:text-[clamp(2.75rem,4vw,3rem)]">
            Ready to Repeat Less &amp; <br /> Grow More?
          </h2>
          <p className="text-white/80 text-base sm:text-lg leading-6 sm:leading-7">
            Let’s map your automation journey together. Book your personalized demo today.
          </p>
        </div>

        <a
          href="https://cal.com/chandan-kumar-zhrofj/30min"
          className="flex max-w-full items-center justify-center gap-2 rounded-full bg-[#4D00FF] px-4 py-3 text-center font-poppins text-sm font-medium leading-5 text-white shadow-[0_0_16px_#6D21F0,0_0_8.1px_#1C76FD] sm:px-5 sm:py-3 sm:text-base"
        >
          <FiPhoneCall size={16} />
          Book a Demo
        </a>
      </div>
    </section>
  );
}
