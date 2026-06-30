"use client";

import Image from "next/image";

import Marquee from "react-fast-marquee";
import { motion, Variants } from "framer-motion";

const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

interface LogoMarqueeProps {
  paddingTop?: string;
}

const LogoMarquee = ({ }: LogoMarqueeProps) => {
  return (
    <motion.div
      variants={fadeUpVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className={`w-full flex flex-col items-center overflow-hidden`}
    >
      <p className="text-[1.5rem]">Trusted by</p>

      <Marquee speed={40} gradient={false}>
        <div className="h-[45px] md:h-[80px] w-auto flex items-center gap-12 ml-16 mt-4">
          <Image src="/images/1.svg" alt="Partner Logo 1" width={160} height={80} className="h-full w-auto" priority />
          <Image src="/images/2.svg" alt="Partner Logo 2" width={160} height={80} className="h-full w-auto" priority />
          <Image src="/images/3.svg" alt="Partner Logo 3" width={160} height={80} className="h-full w-auto" priority />
          <Image src="/images/4.svg" alt="Partner Logo 4" width={160} height={80} className="h-full w-auto" priority />
          {/* repeat for smoother marquee loop */}
          <Image src="/images/1.svg" alt="Partner Logo 1" width={160} height={80} className="h-full w-auto" />
          <Image src="/images/2.svg" alt="Partner Logo 2" width={160} height={80} className="h-full w-auto" />
          <Image src="/images/3.svg" alt="Partner Logo 3" width={160} height={80} className="h-full w-auto" />
          <Image src="/images/4.svg" alt="Partner Logo 4" width={160} height={80} className="h-full w-auto" />
          <Image src="/images/1.svg" alt="Partner Logo 1" width={160} height={80} className="h-full w-auto" />
          <Image src="/images/2.svg" alt="Partner Logo 2" width={160} height={80} className="h-full w-auto" />
          <Image src="/images/3.svg" alt="Partner Logo 3" width={160} height={80} className="h-full w-auto" />
          <Image src="/images/4.svg" alt="Partner Logo 4" width={160} height={80} className="h-full w-auto" />
        </div>
      </Marquee>
    </motion.div>
  );
};

export default LogoMarquee;