"use client";

import { useEffect, useRef } from "react";
import {
  MotionValue,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowDownRight, BarChart3, Bot, GitBranch } from "lucide-react";

type Feature = {
  id: string;
  title: string;
  eyebrow: string;
  desc: string;
  visualTitle: string;
  visualDesc: string;
  icon: "results" | "workflow" | "consultant";
};

const features: Feature[] = [
  {
    id: "01",
    title: "Proven Results",
    eyebrow: "Impact system",
    desc: "Real impact for real businesses. Clients across the USA, Canada, and India have reduced manual work, accelerated lead response, and cut operational costs with custom automation.",
    visualTitle: "Proven Results",
    visualDesc: "Measured gains from practical automation builds",
    icon: "results",
  },
  {
    id: "02",
    title: "n8n Automation Expert",
    eyebrow: "Workflow engine",
    desc: "Custom automation, maximum efficiency. I design powerful workflows from CRMs to SaaS tools, integrating n8n with Sheets, GHL, Slack, WhatsApp, and more.",
    visualTitle: "n8n Automation",
    visualDesc: "Connected workflows that remove repetitive work",
    icon: "workflow",
  },
  {
    id: "03",
    title: "Consultant Approach",
    eyebrow: "Hands-on delivery",
    desc: "Unlike agencies, I work as your dedicated automation consultant, hands-on from strategy to deployment, with ongoing support and optimization as your business scales.",
    visualTitle: "Consultant Approach",
    visualDesc: "Founder-led strategy, build, and iteration",
    icon: "consultant",
  },
];

function serviceRange(index: number) {
  const count = features.length;
  const start = index / count;
  const end = (index + 1) / count;
  const fade = 0.035;

  return [
    Math.max(0, start - fade),
    Math.min(1, start + fade),
    Math.max(0, end - fade),
    Math.min(1, end + fade),
  ] as [number, number, number, number];
}

function ServiceIcon({ type }: { type: Feature["icon"] }) {
  const className = "h-6 w-6";

  if (type === "workflow") return <GitBranch className={className} strokeWidth={1.8} />;
  if (type === "consultant") return <Bot className={className} strokeWidth={1.8} />;
  return <BarChart3 className={className} strokeWidth={1.8} />;
}

function OrbitVisual({
  feature,
  index,
  progress,
}: {
  feature: Feature;
  index: number;
  progress: MotionValue<number>;
}) {
  const rotate = useTransform(progress, [0, 1], [-135, 225]);
  const innerRotate = useTransform(progress, [0, 1], [18, -28]);

  return (
    <div className="relative h-[320px] w-[320px] md:h-[420px] md:w-[420px] xl:h-[500px] xl:w-[500px]">
      <div className="absolute inset-0 rounded-full bg-[#171724] shadow-[inset_0_0_92px_rgba(255,255,255,0.045)]" />
      <div className="absolute inset-[7%] rounded-full border border-dashed border-[#8B5CF6]/55" />
      <div className="absolute inset-[13%] rounded-full border border-white/10" />
      <motion.div
        style={{ rotate }}
        className="absolute inset-[2%] rounded-full border border-white/45 border-b-transparent border-l-transparent"
      >
        <span className="absolute right-[12%] top-[7%] h-3.5 w-3.5 rounded-full bg-[#A778FF]" />
      </motion.div>
      <motion.div
        style={{ rotate: innerRotate }}
        className="absolute inset-[24%] rounded-full bg-[#07070b]"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center px-10 text-center">
        <CircleContent feature={feature} index={index} progress={progress} />
      </div>
    </div>
  );
}

function CircleContent({
  feature,
  index,
  progress,
}: {
  feature: Feature;
  index: number;
  progress: MotionValue<number>;
}) {
  const input = serviceRange(index);
  const opacity = useTransform(progress, input, [0, 1, 1, 0]);
  const y = useTransform(progress, input, [34, 0, 0, -26]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="flex flex-col items-center justify-center"
    >
      <div className="mb-7 grid h-14 w-14 place-items-center rounded-full border border-white/20 bg-black/30 text-white shadow-[0_18px_50px_rgba(0,0,0,0.4)]">
        <ServiceIcon type={feature.icon} />
      </div>
      <h3 className="text-2xl font-extrabold tracking-tight text-white md:text-3xl">
        {feature.visualTitle}
      </h3>
      <p className="mx-auto mt-3 max-w-[260px] text-sm font-medium leading-relaxed text-white/78 md:text-base">
        {feature.visualDesc}
      </p>
    </motion.div>
  );
}

function ServiceScene({
  feature,
  index,
  progress,
}: {
  feature: Feature;
  index: number;
  progress: MotionValue<number>;
}) {
  const input = serviceRange(index);
  const opacity = useTransform(progress, input, [0, 1, 1, 0]);

  return (
    <motion.div
      style={{ opacity, pointerEvents: "none" }}
      className="absolute inset-0 grid grid-cols-12 items-center gap-8 px-8 pt-24 pb-8 lg:px-12"
    >
      <div className="col-span-7 h-full" />

      <div className="col-span-5 flex items-center justify-center">
        <OrbitVisual feature={feature} index={index} progress={progress} />
      </div>
    </motion.div>
  );
}

function CopyReel({ progress }: { progress: MotionValue<number> }) {
  const titleY = useTransform(
    progress,
    [0, 0.27, 0.38, 0.6, 0.71, 1],
    ["0%", "0%", "-33.3333%", "-33.3333%", "-66.6666%", "-66.6666%"]
  );
  const descY = useTransform(
    progress,
    [0, 0.31, 0.42, 0.64, 0.75, 1],
    ["0%", "0%", "-33.3333%", "-33.3333%", "-66.6666%", "-66.6666%"]
  );

  return (
    <div className="pointer-events-none absolute left-8 top-[31vh] z-20 w-[min(720px,58vw)] lg:left-12">
      <div className="h-[46px] overflow-hidden">
        <motion.div style={{ y: titleY }} className="flex flex-col">
          {features.map((feature) => (
            <div key={feature.id} className="h-[46px]">
              <p className="flex items-center gap-3 text-xl font-bold text-white">
                <span className="grid h-8 w-8 place-items-center rounded-full border border-[#A778FF]/35 text-[#A778FF]">
                  <ArrowDownRight className="h-4 w-4" />
                </span>
                {feature.title}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="mt-4 h-[102px] overflow-hidden">
        <motion.div style={{ y: descY }} className="flex flex-col">
          {features.map((feature) => (
            <div key={feature.id} className="h-[102px]">
              <p className="max-w-[720px] text-lg font-medium leading-relaxed text-white/56">
                {feature.desc}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function StepCounter({ progress }: { progress: MotionValue<number> }) {
  const digitY = useTransform(
    progress,
    [0, 0.27, 0.38, 0.6, 0.71, 1],
    ["0em", "0em", "-1em", "-1em", "-2em", "-2em"]
  );

  return (
    <div className="pointer-events-none absolute bottom-10 left-8 z-20 flex font-display text-[clamp(7rem,14vw,14rem)] font-extrabold leading-none text-white lg:left-12">
      <span>0</span>
      <span className="relative inline-block h-[1em] w-[0.72em] overflow-hidden">
        <motion.span
          style={{ y: digitY }}
          className="absolute left-0 top-0 flex flex-col"
        >
          {features.map((feature) => (
            <span key={feature.id} className="block h-[1em] leading-none">
              {feature.id.slice(1)}
            </span>
          ))}
        </motion.span>
      </span>
    </div>
  );
}

function DesktopServices({ progress }: { progress: MotionValue<number> }) {
  const progressWidth = useTransform(progress, [0.02, 0.98], ["0%", "100%"]);
  const headingY = useTransform(progress, [0, 0.08, 0.94, 1], [22, 0, 0, -20]);

  return (
    <div className="hidden md:sticky md:top-0 md:block md:h-screen md:w-full md:overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#07080b_0%,#050507_100%)]" />
      <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:96px_96px]" />
      <div className="absolute left-8 right-8 top-[92px] h-px overflow-hidden bg-white/10 lg:left-12 lg:right-12">
        <motion.div
          style={{ width: progressWidth }}
          className="h-full bg-gradient-to-r from-[#6D21F0] via-[#A778FF] to-white"
        />
      </div>

      <motion.h2
        style={{ y: headingY }}
        className="absolute left-8 top-[118px] z-20 font-display text-[clamp(4.2rem,7vw,8rem)] font-extrabold leading-[0.92] tracking-normal text-white lg:left-12"
      >
        What We Do
      </motion.h2>

      {features.map((feature, index) => (
        <ServiceScene
          key={feature.id}
          feature={feature}
          index={index}
          progress={progress}
        />
      ))}
      <CopyReel progress={progress} />
      <StepCounter progress={progress} />
    </div>
  );
}

export default function FeaturesSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 36,
    damping: 30,
    mass: 1.15,
    restDelta: 0.0004,
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const active = latest > 0.001 && latest < 0.999;
    document.body.classList.toggle("theme-dark", active);
    document.documentElement.classList.toggle("theme-dark", active);
  });

  useEffect(() => {
    const section = containerRef.current;
    if (!section) return;

    const updateTheme = () => {
      const rect = section.getBoundingClientRect();
      const active = rect.top < window.innerHeight * 0.72 && rect.bottom > window.innerHeight * 0.28;
      document.body.classList.toggle("theme-dark", active);
      document.documentElement.classList.toggle("theme-dark", active);
    };

    updateTheme();
    window.addEventListener("scroll", updateTheme, { passive: true });
    window.addEventListener("resize", updateTheme);

    return () => {
      window.removeEventListener("scroll", updateTheme);
      window.removeEventListener("resize", updateTheme);
      document.body.classList.remove("theme-dark");
      document.documentElement.classList.remove("theme-dark");
    };
  }, []);

  return (
    <section ref={containerRef} className="relative w-full bg-[#050608] md:h-[480vh]">
      <DesktopServices progress={smoothProgress} />

      <div className="flex flex-col gap-12 px-6 py-16 md:hidden">
        <h2 className="font-display text-5xl font-extrabold leading-none text-white">
          What We Do
        </h2>
        {features.map((item, index) => (
          <motion.article
            key={item.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="border-t border-white/10 pt-8"
          >
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#A778FF]">
                  {item.eyebrow}
                </p>
                <h3 className="mt-3 text-3xl font-extrabold tracking-tight text-white">
                  {item.title}
                </h3>
              </div>
              <span className="font-display text-5xl font-extrabold leading-none text-white">
                {item.id}
              </span>
            </div>
            <p className="mt-5 text-base font-medium leading-relaxed text-white/62">
              {item.desc}
            </p>
            <div className="mt-8 flex justify-center">
              <OrbitVisual feature={item} index={index} progress={smoothProgress} />
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
