"use client";

import { FC, useEffect, useRef, useState } from "react";
import {
  MotionValue,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  Variants,
} from "framer-motion";
import Lottie from "lottie-react";
import styles from "./SolutionsSection.module.css";
import workflowAnimation from "../../../public/animations/workflow_v2.json";
import chatbotAnimation from "../../../public/animations/chatbot.json";
import liveChatbotAnimation from "../../../public/animations/live-chatbot.json";
import aiToolsAnimation from "../../../public/animations/ai-tools.json";

type Solution = {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  animation?: unknown;
  loop?: boolean;
  objectFit?: "cover" | "contain";
  background?: string;
};

const solutions: Solution[] = [
  {
    eyebrow: "Solution A",
    title: "Workflow Automation.",
    description:
      "Automate repetitive manual tasks like data entry, scheduling, and approvals with intelligent AI flows. Free up your team's time to focus on high-value work while reducing errors and delays.",
    image: "/images/sol5.png",
    animation: workflowAnimation,
    objectFit: "contain",
    background: "transparent",
  },
  {
    eyebrow: "Solution B",
    title: "Smart Chat Agents.",
    description:
      "AI chat agents work 24/7 - delivering instant, human-like responses for product recommendations, order tracking, support, and customer experience at scale.",
    image: "/images/sol1.png",
    animation: chatbotAnimation,
    background: "transparent",
  },
  {
    eyebrow: "Solution C",
    title: "Mass Voice Automation.",
    description:
      "Engage thousands with lifelike AI voice agents in 30+ languages. From scheduling to reminders, calls are handled seamlessly without double bookings.",
    image: "/images/sol2.png",
    animation: liveChatbotAnimation,
    loop: true,
    objectFit: "contain",
    background: "transparent",
  },
  {
    eyebrow: "Solution D",
    title: "Effortless Operations.",
    description:
      "Supercharge productivity with AI-powered workflows that automate data, support, admin, and approvals so your team can focus on growth.",
    image: "/images/workflow_automation_diagram.png",
    objectFit: "contain",
    background: "#2e2e2e",
  },
  {
    eyebrow: "Solution E",
    title: "Tailored AI Solutions.",
    description:
      "Every business is unique. We build AI systems around your goals, tools, and workflows so automation delivers impact now and scales with you later.",
    image: "/images/sol4.png",
    animation: aiToolsAnimation,
    objectFit: "contain",
    background: "transparent",
  },
];

const HORIZONTAL_SCROLL_SLOWDOWN = 1.65;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

const wordReveal: Variants = {
  hidden: { y: "115%" },
  show: {
    y: "0%",
    transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] },
  },
};

const imageReveal: Variants = {
  hidden: { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" },
  show: {
    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
    transition: { duration: 1.25, ease: [0.16, 1, 0.3, 1] },
  },
};

const splitWords = (text: string) =>
  text.split(" ").map((word, index) => (
    <span className={styles.wordWrap} key={`${word}-${index}`}>
      <motion.span variants={wordReveal} className={styles.word}>
        {word}
        {index < text.split(" ").length - 1 ? "\u00a0" : ""}
      </motion.span>
    </span>
  ));

const HorizontalPanel: FC<{
  solution: Solution;
  index: number;
  parentScrollProgress: MotionValue<number>;
}> = ({ solution, index, parentScrollProgress }) => {
  const panelRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const lottieRef = useRef<any>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: panelRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  const step = 1 / (solutions.length - 1);
  const center = index * step;
  const start = index === 0 ? 0 : Math.max(0, center - step * 0.72);
  const end = index === 0 ? step * 0.9 : Math.min(1, center + step * 0.48);
  const enter = Math.max(0, center - step * 0.82);
  const exit = Math.min(1, center + step * 0.82);

  const panelProgress = useTransform(
    parentScrollProgress,
    [start, end],
    [0, 1]
  );
  const contentOpacity = useTransform(
    parentScrollProgress,
    [enter, center, exit],
    index === 0 ? [1, 1, 0.36] : [0.28, 1, 0.28]
  );
  const contentY = useTransform(
    parentScrollProgress,
    [enter, center, exit],
    index === 0 ? ["0px", "0px", "-22px"] : ["34px", "0px", "-28px"]
  );
  const imageScale = useTransform(
    parentScrollProgress,
    [enter, center, exit],
    index === 0 ? [1, 1, 0.97] : [0.96, 1, 0.97]
  );

  useEffect(() => {
    if (solution.loop) return;
    if (!lottieRef.current) return;

    const updateFrame = (latest: number) => {
      const clamped = Math.max(0, Math.min(1, latest));
      const totalFrames = lottieRef.current.getDuration(true);
      const lastFrame = Math.max(totalFrames - 1, 0);
      lottieRef.current.goToAndStop(clamped * lastFrame, true);
    };

    updateFrame(panelProgress.get());

    const unsubscribe = panelProgress.on("change", updateFrame);
    return () => unsubscribe();
  }, [isMounted, panelProgress, solution.loop]);

  return (
    <motion.div
      ref={panelRef}
      className={styles.hPanel}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.36 }}
    >
      <motion.div
        className={styles.hText}
        style={shouldReduceMotion ? undefined : { opacity: contentOpacity, y: contentY }}
      >
        <motion.div variants={fadeUp} className={styles.caption}>
          {solution.eyebrow}
        </motion.div>
        <h2 className={styles.panelTitle}>{splitWords(solution.title)}</h2>
        <motion.p variants={fadeUp} className={styles.panelBody}>
          {solution.description}
        </motion.p>
        <motion.div variants={fadeUp} className={styles.panelMeta}>
          {String(index + 1).padStart(2, "0")} /{" "}
          {String(solutions.length).padStart(2, "0")}
        </motion.div>
      </motion.div>

      <motion.div
        variants={imageReveal}
        className={styles.imageMask}
        style={{
          ...(solution.background ? { background: solution.background } : {}),
          ...(shouldReduceMotion ? {} : { scale: imageScale }),
        }}
      >
        {isMounted && solution.animation ? (
          <Lottie
            lottieRef={lottieRef}
            animationData={solution.animation}
            autoplay={solution.loop ?? false}
            loop={solution.loop ?? false}
            style={{
              width: "100%",
              height: "100%",
              objectFit: solution.objectFit || "cover",
            }}
          />
        ) : (
          <motion.img
            src={solution.image}
            alt={solution.title}
            loading={index > 1 ? "lazy" : "eager"}
            style={{
              ...(shouldReduceMotion ? {} : { y: imageY }),
              objectFit: solution.objectFit || "cover",
            }}
            className={styles.panelImage}
          />
        )}
      </motion.div>
    </motion.div>
  );
};

const SolutionsSection: FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [scrollDistance, setScrollDistance] = useState(0);
  const [trackDistance, setTrackDistance] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const measure = () => {
      const distance = Math.max(0, window.innerWidth * (solutions.length - 1));
      setTrackDistance(distance);
      setScrollDistance(distance * HORIZONTAL_SCROLL_SLOWDOWN);
    };

    measure();
    window.addEventListener("resize", measure);

    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const smoothScrollProgress = useSpring(scrollYProgress, {
    stiffness: 64,
    damping: 30,
    mass: 0.45,
    restDelta: 0.0005,
  });
  const trackX = useTransform(smoothScrollProgress, [0, 1], [0, -trackDistance]);

  return (
    <section
      id="solutions"
      ref={sectionRef}
      className={styles.horizSection}
      style={{
        minHeight: scrollDistance
          ? `calc(100vh + ${Math.round(scrollDistance)}px)`
          : undefined,
      }}
    >
      <div ref={viewportRef} className={styles.stickyViewport}>
        <motion.div
          className={styles.horizTrack}
          style={shouldReduceMotion ? undefined : { x: trackX }}
        >
          {solutions.map((solution, index) => (
            <HorizontalPanel
              key={solution.title}
              solution={solution}
              index={index}
              parentScrollProgress={smoothScrollProgress}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SolutionsSection;
