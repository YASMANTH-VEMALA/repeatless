"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    id: "01",
    icon: "/images/Box.png",
    title: "Proven Results",
    desc: "Real Impact for Real Businesses. Clients across the USA, Canada, and India have reduced manual work, accelerated lead response, and cut operational costs with custom automation.",
    img: "/images/scroll2.png",
    gradient: true,
  },
  {
    id: "02",
    icon: "/images/sicon2.png",
    title: "n8n Automation Expert",
    desc: "Custom Automation, Maximum Efficiency. I design powerful workflows — from CRMs to SaaS tools — integrating n8n with Sheets, GHL, Slack, WhatsApp, and more.",
    img: "/images/scroll1.png",
    gradient: false,
  },
  {
    id: "03",
    icon: "/images/sicon3.png",
    title: "Consultant Approach",
    desc: "Unlike agencies, I work as your dedicated automation consultant — hands-on from strategy to deployment, with ongoing support and optimization as your business scales.",
    img: "/images/scroll3.svg",
    gradient: false,
  },
];

export default function FeaturesSection() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only initialize GSAP for md+ screens
    if (window.innerWidth < 768) return;

    if (sectionRef.current && lineRef.current) {
      // Animate the gradient line
      gsap.to(lineRef.current, {
        height: "100%",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${features.length * window.innerHeight}`,
          scrub: true,
        },
      });

      // Pin section and track active feature
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${features.length * window.innerHeight}`,
        pin: true,
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const index = Math.floor(progress * features.length);
          setActive(Math.min(index, features.length - 1));
        },
      });
    }

    // Cleanup ScrollTriggers on unmount
    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full bg-[#050014]">
      {/* ===== DESKTOP & TABLET ===== */}
      <div className="hidden md:flex justify-center py-20">
        <div className="relative flex w-[1176px] gap-20">
          {/* LEFT SIDE: Feature IDs and line */}
          <div className="flex flex-col items-start gap-[85px] py-[53px] w-[37px] h-[592px] relative">
            {features.map((f, i) => (
              <span
                key={f.id}
                className={`font-dmSans font-medium text-[30px] tracking-[-0.02em] transition-colors duration-300 ${
                  active === i ? "text-white" : "text-[#E6E6E6] opacity-50"
                }`}
              >
                {f.id}
              </span>
            ))}
            <div
              className="absolute left-16 top-0 w-[3px] bg-gradient-to-b from-[#1C76FD] to-[#6D21F0] rounded"
              ref={lineRef}
            />
          </div>

          {/* MIDDLE & RIGHT: Feature Content */}
          <div className="flex-1 flex gap-8">
            {/* Feature titles and descriptions */}
            <div className="flex flex-col gap-8 relative w-[300px]">
              {features.map((f, i) => (
                <motion.div
                  key={f.id}
                  className="flex flex-row items-start gap-5 w-full h-[170px]"
                  initial={{ opacity: 0.35, y: 20 }}
                  animate={{ opacity: active === i ? 1 : 0.35, y: active === i ? 0 : 20 }}
                  transition={{ duration: 0.5 }}
                >
                  <div
                    className={`w-[46px] h-[46px] rounded-full border flex items-center justify-center shrink-0 ${
                      active === i
                        ? "border-white shadow-[0_0_16px_#6D21F0,0_0_8px_#1C76FD]"
                        : "border-white/40"
                    }`}
                  >
                    <Image src={f.icon} alt={f.title} width={32} height={32} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3
                      className={`font-poppins font-medium text-[20px] ${
                        active === i
                          ? "text-transparent bg-clip-text bg-gradient-to-r from-[#1C76FD] to-[#6D21F0]"
                          : "text-[#E6E6E6]"
                      }`}
                    >
                      {f.title}
                    </h3>
                    <p className={`text-[12px] ${active === i ? "text-white" : "text-white/60"}`}>
                      {f.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Feature image */}
            <div className="flex-1 flex justify-center items-center relative pl-20">
              <motion.div
                key={features[active].id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="relative w-full max-w-[770px] h-[550px] drop-shadow-[0_3px_39px_#4D00FF]"
              >
                <div className="absolute inset-0 bg-[#F6F6F9] rounded-l-[25px]" />
                <div className="absolute top-[24px] left-[3%] right-0 bottom-0 bg-[#0B001C] rounded-[22px] shadow-[0_4px_13px_#1C76FD] overflow-hidden">
                  <Image
                    src={features[active].img}
                    alt={features[active].title}
                    fill
                    className="object-contain"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== MOBILE VERSION (scroll not pinned) ===== */}
      <div className="flex flex-col gap-16 md:hidden px-6 py-12">
        {features.map((f) => (
          <motion.div
            key={f.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6"
          >
            <div className="flex items-center gap-4">
              <span className="text-white text-2xl font-bold">{f.id}</span>
              <div className="w-12 h-12 rounded-full border border-white flex items-center justify-center shadow-[0_0_16px_#6D21F0,0_0_8px_#1C76FD]">
                <Image src={f.icon} alt={f.title} width={28} height={28} />
              </div>
            </div>
            <div>
              <h3
                className={`text-xl font-semibold ${
                  f.gradient
                    ? "bg-gradient-to-r from-[#1C76FD] to-[#6D21F0] bg-clip-text text-transparent"
                    : "text-white"
                }`}
              >
                {f.title}
              </h3>
              <p className="text-sm text-white/80 mt-2">{f.desc}</p>
            </div>
            <div className="w-full h-64 rounded-2xl overflow-hidden shadow-[0_4px_20px_#1C76FD]">
              <Image
                src={f.img}
                alt={f.title}
                width={800}
                height={400}
                className="w-full h-full object-contain"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
