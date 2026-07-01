"use client";

import { useEffect, useRef } from "react";

interface AnimatedGridProps {
  className?: string;
}

type Pulse = {
  axis: "h" | "v";
  line: number; // grid line index the pulse travels along
  pos: number; // current position in px along the axis
  speed: number; // px per second (can be negative)
  len: number; // trail length in px
};

type Cell = {
  col: number;
  row: number;
  phase: number; // 0..1 through its glow cycle
  duration: number; // seconds for a full glow cycle
  peak: number; // max opacity
};

const CELL = 64; // grid cell size in px

export default function AnimatedGrid({ className = "" }: AnimatedGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    let dpr = 1;

    let pulses: Pulse[] = [];
    let cells: Cell[] = [];

    // Deterministic-ish randomness (no seed needed for a background)
    const rand = (min: number, max: number) => min + Math.random() * (max - min);

    const seedPulses = () => {
      pulses = [];
      const target = Math.round((cols + rows) * 0.35);
      for (let i = 0; i < target; i++) {
        const axis: "h" | "v" = Math.random() > 0.5 ? "h" : "v";
        const maxLine = axis === "h" ? rows : cols;
        const travel = axis === "h" ? width : height;
        const dir = Math.random() > 0.5 ? 1 : -1;
        pulses.push({
          axis,
          line: Math.floor(rand(0, maxLine + 1)),
          pos: rand(0, travel),
          speed: dir * rand(45, 120),
          len: rand(90, 220),
        });
      }
    };

    const seedCells = () => {
      cells = [];
      const target = Math.round(cols * rows * 0.05);
      for (let i = 0; i < target; i++) {
        cells.push({
          col: Math.floor(rand(0, cols)),
          row: Math.floor(rand(0, rows)),
          phase: Math.random(),
          duration: rand(3, 7),
          peak: rand(0.04, 0.14),
        });
      }
    };

    const resize = () => {
      width = wrapper.clientWidth || window.innerWidth;
      height = wrapper.clientHeight || window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(width / CELL);
      rows = Math.ceil(height / CELL);
      seedPulses();
      seedCells();
    };

    const drawGrid = () => {
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(255,255,255,0.045)";
      ctx.beginPath();
      for (let c = 0; c <= cols; c++) {
        const x = c * CELL + 0.5;
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let r = 0; r <= rows; r++) {
        const y = r * CELL + 0.5;
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();
    };

    const drawCells = (dt: number) => {
      for (const cell of cells) {
        if (!prefersReducedMotion) cell.phase += dt / cell.duration;
        if (cell.phase >= 1) {
          // recycle to a fresh location once its cycle completes
          cell.phase = 0;
          cell.col = Math.floor(rand(0, cols));
          cell.row = Math.floor(rand(0, rows));
          cell.duration = rand(3, 7);
          cell.peak = rand(0.04, 0.14);
        }
        // ease in/out triangle -> smooth glow
        const t = cell.phase;
        const glow = Math.sin(t * Math.PI) * cell.peak;
        if (glow <= 0.002) continue;
        ctx.fillStyle = `rgba(255,255,255,${glow})`;
        ctx.fillRect(cell.col * CELL + 1, cell.row * CELL + 1, CELL - 1, CELL - 1);
      }
    };

    const drawPulses = (dt: number) => {
      for (const pulse of pulses) {
        if (!prefersReducedMotion) pulse.pos += pulse.speed * dt;
        const travel = pulse.axis === "h" ? width : height;
        // wrap around
        if (pulse.pos > travel + pulse.len) pulse.pos = -pulse.len;
        if (pulse.pos < -pulse.len) pulse.pos = travel + pulse.len;

        const along = pulse.axis === "h" ? pulse.line * CELL + 0.5 : pulse.line * CELL + 0.5;
        const head = pulse.pos;
        const tail = pulse.pos - Math.sign(pulse.speed || 1) * pulse.len;

        let grad: CanvasGradient;
        if (pulse.axis === "h") {
          grad = ctx.createLinearGradient(tail, along, head, along);
        } else {
          grad = ctx.createLinearGradient(along, tail, along, head);
        }
        grad.addColorStop(0, "rgba(180,210,255,0)");
        grad.addColorStop(0.75, "rgba(190,215,255,0.10)");
        grad.addColorStop(1, "rgba(225,240,255,0.55)");

        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        if (pulse.axis === "h") {
          ctx.moveTo(tail, along);
          ctx.lineTo(head, along);
        } else {
          ctx.moveTo(along, tail);
          ctx.lineTo(along, head);
        }
        ctx.stroke();

        // bright head dot
        ctx.fillStyle = "rgba(235,245,255,0.7)";
        ctx.beginPath();
        const hx = pulse.axis === "h" ? head : along;
        const hy = pulse.axis === "h" ? along : head;
        ctx.arc(hx, hy, 1.6, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    let raf = 0;
    let last = 0;
    let isVisible = true;
    let isTabVisible = !document.hidden;

    const frame = (time: number) => {
      raf = requestAnimationFrame(frame);
      if (!isVisible || !isTabVisible) {
        last = time;
        return;
      }
      const dt = Math.min((time - last) / 1000, 0.05);
      last = time;

      ctx.clearRect(0, 0, width, height);
      drawGrid();
      drawCells(dt);
      drawPulses(dt);

      if (prefersReducedMotion) {
        cancelAnimationFrame(raf);
      }
    };

    const handleVisibility = () => {
      isTabVisible = !document.hidden;
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.01 }
    );

    resize();
    observer.observe(wrapper);
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", handleVisibility);
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <div ref={wrapperRef} className={`absolute inset-0 overflow-hidden bg-black ${className}`}>
      <canvas ref={canvasRef} aria-hidden="true" className="h-full w-full" />
    </div>
  );
}
