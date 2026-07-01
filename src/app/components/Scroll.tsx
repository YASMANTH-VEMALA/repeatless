"use client";

import { useEffect, useId, useRef, useState } from "react";
import {
  MotionValue,
  motion,
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
  const fade = 0.055;

  return [
    Math.max(0, start - fade),
    Math.min(1, start + fade),
    Math.max(0, end - fade * 0.8),
    Math.min(1, end + fade),
  ] as [number, number, number, number];
}

function ServiceIcon({ type }: { type: Feature["icon"] }) {
  const className = "h-5 w-5";

  if (type === "workflow") return <GitBranch className={className} strokeWidth={1.8} />;
  if (type === "consultant") return <Bot className={className} strokeWidth={1.8} />;
  return <BarChart3 className={className} strokeWidth={1.8} />;
}

function OrbitVisual({ progress }: { progress: MotionValue<number> }) {
  // Unique per instance: OrbitVisual renders on both mobile and desktop (one
  // hidden via lg:), so hard-coded SVG ids would collide and url(#id) refs
  // could resolve to the wrong (hidden) element.
  const uid = useId();
  const glowId = `orbit-glow-${uid}`;
  const fillId = `orbit-fill-${uid}`;
  // Reach a full circle at 0.92 and hold it full through the short final
  // stretch. This completion buffer absorbs the spring's (now small) follow lag
  // so the ring reads 100% before the section un-pins — fixing the "released at
  // ~95%" glitch — while the tight 0.08 tail avoids the wasted "extra scrolls"
  // after it fills. useTransform clamps by default, so it stays at 1 past 0.92.
  const ringProgress = useTransform(progress, [0.02, 0.92], [0, 1]);
  const circumference = 2 * Math.PI * 176;
  const dashOffset = useTransform(ringProgress, (value) => circumference * (1 - value));
  const dotX = useTransform(ringProgress, (value) => {
    const angle = (Math.PI / 180) * (180 + value * 360);
    return 210 + Math.cos(angle) * 176;
  });
  const dotY = useTransform(ringProgress, (value) => {
    const angle = (Math.PI / 180) * (180 + value * 360);
    return 210 + Math.sin(angle) * 176;
  });
  const tailX = useTransform(ringProgress, (value) => {
    const angle = (Math.PI / 180) * (180 + Math.max(0, value - 0.018) * 360);
    return 210 + Math.cos(angle) * 176;
  });
  const tailY = useTransform(ringProgress, (value) => {
    const angle = (Math.PI / 180) * (180 + Math.max(0, value - 0.018) * 360);
    return 210 + Math.sin(angle) * 176;
  });

  return (
    <div className="relative aspect-square w-[min(84vw,42svh,380px)] lg:w-[min(40vw,560px)] lg:min-w-[380px] lg:max-w-[560px]">
      <div className="absolute inset-[7%] rounded-full bg-[#11111d] shadow-[0_0_70px_rgba(109,33,240,0.18),inset_0_0_120px_rgba(255,255,255,0.035)]" />
      <svg
        aria-hidden="true"
        viewBox="0 0 420 420"
        className="absolute inset-0 h-full w-full overflow-visible"
      >
        <defs>
          <filter id={glowId} x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id={fillId} cx="50%" cy="50%" r="58%">
            <stop offset="0%" stopColor="#050608" />
            <stop offset="68%" stopColor="#12111d" />
            <stop offset="100%" stopColor="#171329" />
          </radialGradient>
        </defs>

        <circle cx="210" cy="210" r="154" fill={`url(#${fillId})`} />
        <circle
          cx="210"
          cy="210"
          r="160"
          fill="none"
          stroke="rgba(124,58,237,0.42)"
          strokeWidth="1.5"
          strokeDasharray="7 6"
        />
        <circle
          cx="210"
          cy="210"
          r="176"
          fill="none"
          stroke="rgba(255,255,255,0.13)"
          strokeWidth="1"
        />
        <motion.circle
          cx="210"
          cy="210"
          r="176"
          fill="none"
          stroke="rgba(255,255,255,0.72)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray={circumference}
          style={{ strokeDashoffset: dashOffset }}
          transform="rotate(180 210 210)"
        />
        <motion.line
          x1={tailX}
          y1={tailY}
          x2={dotX}
          y2={dotY}
          stroke="rgba(255,255,255,0.72)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <motion.circle
          cx={dotX}
          cy={dotY}
          r="5.2"
          fill="#A778FF"
          filter={`url(#${glowId})`}
        />
        <motion.circle
          cx={dotX}
          cy={dotY}
          r="10"
          fill="rgba(167,120,255,0.16)"
        />
      </svg>
      <div className="absolute inset-[22%] rounded-full bg-[#050608]/82 shadow-[inset_0_0_70px_rgba(0,0,0,0.82)]" />
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center min-[390px]:px-8 lg:px-10">
        {features.map((feature, index) => (
          <div key={feature.id} className="absolute inset-0 flex items-center justify-center px-6 min-[390px]:px-8 lg:px-10">
            <CircleContent feature={feature} index={index} progress={progress} />
          </div>
        ))}
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
  // The last card has no successor to hand off to, so it must stay fully
  // visible until the section is completely scrolled through (progress = 1)
  // instead of fading out at ~95%. Only then does the pinned section release.
  const isLast = index === features.length - 1;
  const opacity = useTransform(progress, input, isLast ? [0, 1, 1, 1] : [0, 1, 1, 0]);
  const y = useTransform(progress, input, isLast ? [34, 0, 0, 0] : [34, 0, 0, -26]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="flex flex-col items-center justify-center"
    >
      <div className="mb-4 grid h-10 w-10 place-items-center rounded-full border border-white/22 bg-black/35 text-white shadow-[0_18px_50px_rgba(0,0,0,0.4)] min-[390px]:mb-6 min-[390px]:h-12 min-[390px]:w-12">
        <ServiceIcon type={feature.icon} />
      </div>
      <h3 className="text-xl font-extrabold tracking-tight text-white min-[390px]:text-2xl md:text-[1.65rem]">
        {feature.visualTitle}
      </h3>
      <p className="mx-auto mt-2 max-w-[210px] text-[0.8rem] font-medium leading-relaxed text-white/82 min-[390px]:mt-3 min-[390px]:max-w-[260px] min-[390px]:text-sm md:text-base">
        {feature.visualDesc}
      </p>
    </motion.div>
  );
}

function CopyReel({ progress }: { progress: MotionValue<number> }) {
  const titleY = useTransform(
    progress,
    [0, 0.26, 0.37, 0.58, 0.69, 1],
    ["0%", "0%", "-33.3333%", "-33.3333%", "-66.6666%", "-66.6666%"]
  );
  const descY = useTransform(
    progress,
    [0, 0.28, 0.39, 0.6, 0.71, 1],
    ["0%", "0%", "-33.3333%", "-33.3333%", "-66.6666%", "-66.6666%"]
  );

  return (
    <div className="pointer-events-none absolute left-8 top-[34vh] z-20 w-[min(680px,54vw)] lg:left-12">
      <div className="h-[52px] overflow-hidden">
        <motion.div style={{ y: titleY }} className="flex flex-col">
          {features.map((feature) => (
            <div key={feature.id} className="h-[52px]">
              <p className="flex items-center gap-3 text-lg font-bold leading-tight text-white xl:text-xl">
                <span className="grid h-8 w-8 place-items-center rounded-full border border-[#A778FF]/35 text-[#A778FF]">
                  <ArrowDownRight className="h-4 w-4" />
                </span>
                {feature.title}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="mt-4 h-[132px] overflow-hidden">
        <motion.div style={{ y: descY }} className="flex flex-col">
          {features.map((feature) => (
            <div key={feature.id} className="h-[132px]">
              <p className="max-w-[680px] text-base font-medium leading-relaxed text-white/56 xl:text-lg">
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
    [0, 0.26, 0.37, 0.58, 0.69, 1],
    ["0em", "0em", "-1em", "-1em", "-2em", "-2em"]
  );

  return (
    <div className="pointer-events-none absolute bottom-8 left-8 z-20 flex font-display text-[clamp(5.8rem,12vw,12rem)] font-extrabold leading-none text-white lg:left-12">
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

function MobileCopyReel({ progress }: { progress: MotionValue<number> }) {
  // Reel-based, matching the desktop CopyReel/StepCounter behaviour: the
  // number counts up in place and the description scrolls to the next entry
  // inside an overflow-hidden window — no more cross-fading absolute items
  // stacking on top of each other. Keyframes are tuned for 3 features: each
  // holds, then advances by one slot (-1em for the digit, -33.33% for copy).
  const digitY = useTransform(
    progress,
    [0, 0.26, 0.37, 0.58, 0.69, 1],
    ["0em", "0em", "-1em", "-1em", "-2em", "-2em"]
  );
  const descY = useTransform(
    progress,
    [0, 0.28, 0.39, 0.6, 0.71, 1],
    ["0%", "0%", "-33.3333%", "-33.3333%", "-66.6666%", "-66.6666%"]
  );

  return (
    <div className="mt-8 flex w-full items-start gap-5">
      <div className="flex shrink-0 font-display text-[2.6rem] font-extrabold leading-none tracking-normal text-white min-[390px]:text-[2.9rem]">
        <span>0</span>
        <span className="relative ml-2 inline-block h-[1em] w-[0.62em] overflow-hidden">
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

      <div className="min-w-0 flex-1">
        <div className="mb-1 flex h-5 items-center text-white/80">
          <ArrowDownRight className="h-4 w-4" strokeWidth={1.8} />
        </div>
        <div className="h-[168px] overflow-hidden min-[390px]:h-[176px]">
          <motion.div style={{ y: descY }} className="flex flex-col">
            {features.map((feature) => (
              <p
                key={feature.id}
                className="h-[168px] text-[0.95rem] font-medium leading-[1.42] text-white/56 min-[390px]:h-[176px] min-[390px]:text-base"
              >
                {feature.desc}
              </p>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

type PinState = "before" | "active" | "after";

function DesktopServices({
  progress,
  pinState,
}: {
  progress: MotionValue<number>;
  pinState: PinState;
}) {
  const progressWidth = useTransform(progress, [0.02, 0.92], ["0%", "100%"]);
  const headingY = useTransform(progress, [0, 0.08, 0.94, 1], [22, 0, 0, -20]);
  const pinClass =
    pinState === "before"
      ? "absolute top-0"
      : pinState === "after"
        ? "absolute bottom-0"
        : "fixed top-0";

  return (
    <div className={`left-0 z-10 hidden h-[100svh] w-full overflow-hidden lg:block ${pinClass}`}>
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
        className="absolute left-8 top-[118px] z-20 font-display text-[clamp(3.7rem,6.2vw,7.2rem)] font-extrabold leading-[0.92] tracking-normal text-white lg:left-12"
      >
        What We Do
      </motion.h2>

      <div className="pointer-events-none absolute inset-0 grid grid-cols-12 items-center gap-6 px-8 pb-8 pt-28 lg:px-12 xl:gap-8">
        <div className="col-span-7 h-full" />
        <div className="col-span-5 flex items-center justify-center">
          <OrbitVisual progress={progress} />
        </div>
      </div>
      <CopyReel progress={progress} />
      <StepCounter progress={progress} />
    </div>
  );
}

function MobileServices({ progress }: { progress: MotionValue<number> }) {
  const progressWidth = useTransform(progress, [0.02, 0.92], ["0%", "100%"]);

  return (
    <div className="sticky top-0 h-[100svh] w-full overflow-hidden bg-[#050608] px-5 pb-7 pt-24 sm:px-7 lg:hidden">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#07080b_0%,#050507_100%)]" />
      <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:72px_72px]" />
      <div className="relative z-10 flex h-full flex-col">
        <div>
          <div className="h-px overflow-hidden bg-white/10">
            <motion.div
              style={{ width: progressWidth }}
              className="h-full bg-gradient-to-r from-[#6D21F0] via-[#A778FF] to-white"
            />
          </div>
          <h2 className="mt-6 font-display text-[2.35rem] font-extrabold leading-none tracking-normal text-white min-[390px]:text-[2.65rem]">
            What We Do
          </h2>
          <MobileCopyReel progress={progress} />
        </div>

        <div className="mt-auto flex justify-center pb-4">
          <OrbitVisual progress={progress} />
        </div>
      </div>
    </div>
  );
}

export default function FeaturesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pinState, setPinState] = useState<PinState>("before");

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Responsive-but-smooth: high natural frequency so the ring tracks the
  // scroll closely (no laggy creep-then-snap), with mild overdamping (ζ ≈ 1.5)
  // so it never overshoots/rebounds. The snappier spring keeps follow lag small,
  // so the completion buffer below can be tight — the circle fills right as the
  // section reaches its end, with only a touch of scroll to spare.
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 190,
    damping: 34,
    mass: 0.7,
    restDelta: 0.0005,
  });

  useEffect(() => {
    const section = containerRef.current;
    if (!section) return;

    const updatePinState = () => {
      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      if (rect.top > 0) {
        setPinState("before");
      } else if (rect.bottom <= viewportHeight) {
        setPinState("after");
      } else {
        setPinState("active");
      }
    };

    updatePinState();
    window.addEventListener("scroll", updatePinState, { passive: true });
    window.addEventListener("resize", updatePinState);

    return () => {
      window.removeEventListener("scroll", updatePinState);
      window.removeEventListener("resize", updatePinState);
    };
  }, []);

  return (
    <section ref={containerRef} data-theme="dark" className="relative h-[260svh] w-full bg-[#050608] lg:h-[280svh]">
      <MobileServices progress={smoothProgress} />
      <DesktopServices progress={smoothProgress} pinState={pinState} />
    </section>
  );
}
