"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface FeatureVisualProps {
  active: number;
}

function ResultsVisual() {
  return (
    <div className="flex h-full w-full items-center justify-center font-poppins text-neutral-950">
      <motion.div
        className="relative grid w-full max-w-[640px] gap-5 md:grid-cols-[1fr_1.05fr]"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <div className="flex flex-col justify-center gap-5">
          {[
            ["Manual work reduced", "68%", "#1C76FD"],
            ["Lead response accelerated", "21%", "#16A085"],
            ["Automation builds shipped", "100+", "#F97316"],
          ].map(([label, value, color], index) => (
            <motion.div
              key={label}
              className="border-l-2 pl-5"
              style={{ borderColor: color }}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, delay: index * 0.08 }}
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-500">{label}</p>
              <p className="mt-2 text-4xl font-semibold md:text-5xl" style={{ color }}>
                {value}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.svg
          viewBox="0 0 360 320"
          className="h-[280px] w-full overflow-visible md:h-[390px]"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45, delay: 0.08, ease: "easeOut" }}
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="resultLoop" x1="74" y1="246" x2="286" y2="74" gradientUnits="userSpaceOnUse">
              <stop stopColor="#24C6DC" />
              <stop offset="0.52" stopColor="#1C76FD" />
              <stop offset="1" stopColor="#6D21F0" />
            </linearGradient>
          </defs>
          <circle cx="180" cy="160" r="96" fill="#4D00FF" opacity="0.06" />
          <path
            d="M106 196 C106 128 150 90 207 92 C258 94 292 133 292 178 C292 227 252 260 202 260 L132 260"
            fill="none"
            stroke="url(#resultLoop)"
            strokeWidth="16"
            strokeLinecap="round"
          />
          <path
            d="M132 260 L96 260 L96 224"
            fill="none"
            stroke="#24C6DC"
            strokeWidth="16"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <g fill="#F4F1EC" strokeWidth="5">
            <circle cx="106" cy="196" r="13" stroke="#24C6DC" />
            <circle cx="207" cy="92" r="13" stroke="#1C76FD" />
            <circle cx="292" cy="178" r="13" stroke="#6D21F0" />
          </g>
          <text x="180" y="154" textAnchor="middle" className="fill-neutral-950 text-[21px] font-semibold">
            Repeatless
          </text>
          <text x="180" y="181" textAnchor="middle" className="fill-[#4D00FF] text-[11px] font-semibold uppercase tracking-[0.22em]">
            Results loop
          </text>
        </motion.svg>
      </motion.div>
    </div>
  );
}

function WorkflowVisual() {
  const nodes = [
    { x: 52, y: 158, label: "CRM", fill: "#1C76FD" },
    { x: 154, y: 70, label: "n8n", fill: "#6D21F0" },
    { x: 264, y: 122, label: "AI", fill: "#16A085" },
    { x: 230, y: 238, label: "Slack", fill: "#F97316" },
    { x: 112, y: 260, label: "GHL", fill: "#24C6DC" },
  ];

  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <motion.svg
        viewBox="0 0 330 330"
        className="h-[430px] w-[430px] max-w-full overflow-visible"
        initial={{ opacity: 0, rotate: -4 }}
        animate={{ opacity: 1, rotate: 0 }}
        transition={{ duration: 0.7 }}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="flowStroke" x1="40" y1="260" x2="280" y2="70" gradientUnits="userSpaceOnUse">
            <stop stopColor="#24C6DC" />
            <stop offset="0.45" stopColor="#6D21F0" />
            <stop offset="1" stopColor="#F97316" />
          </linearGradient>
        </defs>
        <motion.path
          d="M52 158 C94 96 112 82 154 70 C196 58 226 82 264 122 C287 148 274 207 230 238 C190 266 147 278 112 260 C76 242 42 200 52 158Z"
          fill="none"
          stroke="url(#flowStroke)"
          strokeWidth="3"
          strokeDasharray="10 12"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        />
        <motion.circle
          cx="165"
          cy="166"
          r="58"
          fill="#F4F1EC"
          stroke="#4D00FF"
          strokeWidth="2"
        />
        <text x="165" y="158" textAnchor="middle" className="fill-neutral-950 text-[17px] font-semibold">
          Workflow
        </text>
        <text x="165" y="180" textAnchor="middle" className="fill-[#4D00FF] text-[12px] font-semibold uppercase tracking-[0.18em]">
          Orchestration
        </text>
        {nodes.map((node, index) => (
          <motion.g
            key={node.label}
            initial={{ opacity: 0, scale: 0.65 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.12, duration: 0.4 }}
          >
            <circle cx={node.x} cy={node.y} r="32" fill={node.fill} opacity="0.16" />
            <circle cx={node.x} cy={node.y} r="20" fill={node.fill} />
            <text x={node.x} y={node.y + 5} textAnchor="middle" className="fill-white text-[10px] font-semibold">
              {node.label}
            </text>
          </motion.g>
        ))}
      </motion.svg>
      <div
        className="absolute bottom-10 left-1/2 flex -translate-x-1/2 gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-600"
      >
        <span>Trigger</span>
        <span className="text-[#4D00FF]">Build</span>
        <span>Optimize</span>
      </div>
    </div>
  );
}

function ConsultantVisual() {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-visible">
      <div className="absolute left-8 top-20 hidden h-64 w-64 rounded-full border border-[#1C76FD]/25 md:block" />
      <div className="absolute right-20 bottom-16 hidden h-48 w-48 rounded-full border border-[#F97316]/25 md:block" />

      <motion.svg
        viewBox="0 0 620 430"
        className="absolute inset-0 hidden h-full w-full overflow-visible md:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="consultPath" x1="80" y1="320" x2="520" y2="95" gradientUnits="userSpaceOnUse">
            <stop stopColor="#24C6DC" />
            <stop offset="0.5" stopColor="#6D21F0" />
            <stop offset="1" stopColor="#F97316" />
          </linearGradient>
        </defs>
        <motion.path
          d="M82 320 C168 242 236 286 296 206 C356 126 438 154 534 92"
          fill="none"
          stroke="url(#consultPath)"
          strokeWidth="4"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
        />
        {[
          { x: 82, y: 320 },
          { x: 296, y: 206 },
          { x: 534, y: 92 },
        ].map((item, index) => (
          <motion.g key={`${item.x}-${item.y}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 + index * 0.15 }}>
            <circle cx={item.x} cy={item.y} r="9" fill="#F4F1EC" stroke="#4D00FF" strokeWidth="4" />
          </motion.g>
        ))}
      </motion.svg>

      <motion.div
        className="relative z-10 flex w-full max-w-[640px] flex-col items-start justify-center gap-4 pt-4 md:flex-row md:items-end md:justify-between md:gap-8 md:pt-20"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65 }}
      >
        <div className="max-w-[270px] pb-2 md:pb-12">
          <p className="text-[12px] font-semibold uppercase tracking-[0.28em] text-[#4D00FF]">Founder-led automation</p>
          <h4 className="mt-4 font-poppins text-2xl font-semibold leading-tight text-neutral-950 md:text-3xl">Direct strategy, cleaner builds, faster iteration.</h4>
          <p className="mt-4 text-sm leading-7 text-neutral-600">
            One consultant stays close to the business goal, maps the workflow, ships the automation, and keeps improving it as the system grows.
          </p>
        </div>

        <div className="relative h-[250px] w-[220px] shrink-0 self-center md:h-[350px] md:w-[265px]">
          <div className="absolute bottom-2 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-[#4D00FF]/15 blur-2xl" />
          <Image src="/images/founder-repeatless.png" alt="Repeatless founder" fill sizes="265px" className="object-contain object-bottom drop-shadow-[0_24px_42px_rgba(28,26,23,0.22)]" priority />
        </div>
      </motion.div>
    </div>
  );
}

export function FeatureVisual({ active }: FeatureVisualProps) {
  if (active === 1) return <WorkflowVisual />;
  if (active === 2) return <ConsultantVisual />;
  return <ResultsVisual />;
}
