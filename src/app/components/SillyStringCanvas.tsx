"use client";

import React, { useEffect, useRef, useState } from "react";

// Point class for physics simulation
class Pt {
  x: number;
  y: number;
  ox: number;
  oy: number;
  done: boolean;
  st: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.ox = x;
    this.oy = y;
    this.done = false;
    this.st = 0;
  }

  update(
    w: number,
    h: number,
    gravityVal: number,
    hitFn: (x: number, y: number) => boolean
  ) {
    if (this.done) return;
    const g = (gravityVal / 100) * 0.4;
    const vx = (this.x - this.ox) * 0.97;
    const vy = (this.y - this.oy) * 0.97;
    this.ox = this.x;
    this.oy = this.y;
    this.x += vx;
    this.y += vy + g;

    if (hitFn(this.x, this.y)) {
      if (!hitFn(this.x, this.oy)) {
        this.y = this.oy;
        this.oy = this.y;
      } else if (!hitFn(this.ox, this.y)) {
        this.x = this.ox;
        this.ox = this.x;
      } else {
        this.x = this.ox;
        this.y = this.oy;
      }
      this.ox = this.x;
      this.oy = this.y;
      this.st += 4;
    }

    if (this.y > h - 1) {
      this.y = h - 1;
      this.oy = this.y;
      this.st += 4;
    }
    if (this.y < 0) {
      this.y = 0;
      this.oy = 0;
      this.st += 4;
    }
    if (this.x < 0) this.x = 0;
    if (this.x > w) this.x = w;
    if (this.st > 14) this.done = true;
  }
}

// Distance constraint link between points
class Lk {
  a: Pt;
  b: Pt;
  l: number;
  broken: boolean;

  constructor(a: Pt, b: Pt) {
    this.a = a;
    this.b = b;
    this.l = 2.5;
    this.broken = false;
  }

  solve() {
    if (this.broken) return;
    const dx = this.b.x - this.a.x;
    const dy = this.b.y - this.a.y;
    const d = Math.sqrt(dx * dx + dy * dy) || 0.001;
    if (d > 25) {
      this.broken = true;
      return;
    }
    const f = ((this.l - d) / d) * 0.25;
    if (!this.a.done) {
      this.a.x -= dx * f;
      this.a.y -= dy * f;
    }
    if (!this.b.done) {
      this.b.x += dx * f;
      this.b.y += dy * f;
    }
  }
}

// A single string line composed of multiple points and constraint links
class Strand {
  pts: Pt[];
  lks: Lk[];
  ci: number;

  constructor(i: number) {
    this.pts = [];
    this.lks = [];
    this.ci = i;
  }

  add(x: number, y: number, vx: number, vy: number) {
    const p = new Pt(x, y);
    p.ox = x - vx;
    p.oy = y - vy;
    if (this.pts.length > 0) {
      this.lks.push(new Lk(this.pts[this.pts.length - 1], p));
    }
    this.pts.push(p);
  }
}

export default function SillyStringCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  // Reference to track scroll position to avoid reading window.scrollY inside the 60fps loop
  const scrollYRef = useRef(0);

  // References to range elements so the 60fps canvas loop can query them synchronously without state re-renders
  const pressureRef = useRef<HTMLInputElement>(null);
  const gravityRef = useRef<HTMLInputElement>(null);
  const curlRef = useRef<HTMLInputElement>(null);
  const thickRef = useRef<HTMLInputElement>(null);
  const chaosRef = useRef<HTMLInputElement>(null);

  // Help functions to fetch current slider values, falling back to defaults if not ready
  const getVal = (ref: React.RefObject<HTMLInputElement | null>, def: number) => {
    return ref.current ? +ref.current.value : def;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Cache scroll position immediately and set up event listener
    scrollYRef.current = window.scrollY;
    const handleScroll = () => {
      scrollYRef.current = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    const getPageHeight = () => {
      const body = document.body;
      const html = document.documentElement;
      return Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight
      ) || window.innerHeight;
    };

    let W = (canvas.width = window.innerWidth);
    let H = getPageHeight();
    canvas.height = window.innerHeight;

    let logoImg: HTMLImageElement | null = null;
    let collData: Uint8ClampedArray | null = null;
    let LS = 1;
    let LW = 147;
    let LH = 24;
    let LOX = 0;
    let LOY = 0;
    let ready = false;

    // Strands array and color palette
    let strands: Strand[] = [];
    const COLS = ["#ff1493", "#00d9a0", "#ffc400", "#00b8ff", "#ff5533", "#b84dff"];
    const COLS_L = ["#ff6ec7", "#66ffc8", "#ffe066", "#66d9ff", "#ff9a75", "#d4a0ff"];
    let ci = 0;
    let curStrand: Strand | null = null;

    // Interaction state
    let mx = W / 2;
    let my = H * 0.2;
    let spraying = false;
    let spT = 0;
    let demo = true;
    let demoT = 0;
    let isMouseOver = false;
    let isDrawing = true;

    // Load SVG image from markup string helper
    const loadImg = (svgMarkup: string): Promise<HTMLImageElement> => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svgMarkup);
      });
    };

    // Load and build the logo maps
    const buildLogo = async () => {
      try {
        ready = false;
        const res = await fetch("/images/logo.svg");
        if (!res.ok) throw new Error("Failed to load logo.svg");
        const svgText = await res.text();

        // 1. Process SVG for displaying on canvas (colored to fit light theme, slightly thicker lines)
        const displaySvg = svgText
          .replaceAll('stroke="white"', 'stroke="#1E1B4B"') // Indigo-950
          .replaceAll('fill="white"', 'fill="#1E1B4B"')
          .replaceAll('stroke-width="1.99283"', 'stroke-width="2.3"');

        // 2. Process SVG for collision mapping (pure solid black, thicker to capture string physics)
        const collisionSvg = svgText
          .replaceAll('stroke="white"', 'stroke="#000000"')
          .replaceAll('fill="white"', 'fill="#000000"')
          .replaceAll('stroke-width="1.99283"', 'stroke-width="2.8"');

        logoImg = await loadImg(displaySvg);
        const collisionImg = await loadImg(collisionSvg);

        // Scale and positioning calculations (55% width of screen, locked in center)
        LS = (W * 0.55) / 147;
        // Cap the scale to avoid massive logo size on wide monitors
        if (LS > 3.5) LS = 3.5;
        // Don't make it too tiny on mobile
        if (LS < 1.2 && W < 640) LS = 1.2;

        LW = 147 * LS;
        LH = 24 * LS;

        const spacer = document.getElementById("hero-logo-spacer");
        if (spacer) {
          const rect = spacer.getBoundingClientRect();
          const canvasRect = canvas.getBoundingClientRect();
          LOX = rect.left - canvasRect.left + (rect.width - LW) / 2;
          LOY = rect.top - canvasRect.top + (rect.height - LH) / 2;
        } else {
          LOX = (W - LW) / 2;
          LOY = (H - LH) / 2;
        }

        // Draw collision image off-screen to read alpha data (optimized to logo bounds)
        const offscreen = document.createElement("canvas");
        const oW = Math.ceil(LW);
        const oH = Math.ceil(LH);
        offscreen.width = oW;
        offscreen.height = oH;
        const offscreenCtx = offscreen.getContext("2d");
        if (offscreenCtx) {
          offscreenCtx.drawImage(collisionImg, 0, 0, LW, LH);
          collData = offscreenCtx.getImageData(0, 0, oW, oH).data;
        }
        ready = true;
      } catch (err) {
        console.error("SillyStringCanvas logo processing error:", err);
      }
    };

    buildLogo();
    const timer1 = setTimeout(buildLogo, 100);
    const timer2 = setTimeout(buildLogo, 500);

    // Check collision map
    const hit = (x: number, y: number): boolean => {
      if (!ready || !collData) return false;
      const ix = Math.round(x);
      const iy = Math.round(y);
      if (ix < LOX || iy < LOY || ix >= LOX + LW || iy >= LOY + LH) return false;
      const lx = Math.round(ix - LOX);
      const ly = Math.round(iy - LOY);
      const oW = Math.ceil(LW);
      return collData[(ly * oW + lx) * 4 + 3] > 30;
    };

    // Resize handler
    const handleResize = () => {
      W = canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      H = getPageHeight();
      buildLogo();
    };
    window.addEventListener("resize", handleResize);

    // Aerosol position helpers
    const CW = 18;
    const CH = 46;
    const NX = 10;
    const NY = -CH / 2 - 3;

    const aimAngle = (cx: number, cy: number) => {
      const rawA = Math.atan2(LOY + LH / 2 - cy, LOX + LW / 2 - cx);
      return Math.atan2(Math.sin(rawA) * 0.15, Math.cos(rawA));
    };

    const tipWorld = (cx: number, cy: number, rot: number) => {
      return {
        x: cx + NX * Math.cos(rot) - NY * Math.sin(rot),
        y: cy + NX * Math.sin(rot) + NY * Math.cos(rot),
      };
    };

    // Draw rounded rectangle
    const rr = (
      c: CanvasRenderingContext2D,
      x: number,
      y: number,
      w: number,
      h: number,
      r: number
    ) => {
      c.beginPath();
      c.moveTo(x + r, y);
      c.lineTo(x + w - r, y);
      c.quadraticCurveTo(x + w, y, x + w, y + r);
      c.lineTo(x + w, y + h - r);
      c.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      c.lineTo(x + r, y + h);
      c.quadraticCurveTo(x, y + h, x, y + h - r);
      c.lineTo(x, y + r);
      c.quadraticCurveTo(x, y, x + r, y);
      c.closePath();
    };

    // Draw the aerosol spray can
    const drawCan = (c: CanvasRenderingContext2D, cx: number, cy: number) => {
      const a = aimAngle(cx, cy);
      c.save();
      c.translate(cx, cy);
      c.rotate(a);

      // Shadow
      c.save();
      c.shadowColor = "rgba(0,0,0,0.1)";
      c.shadowBlur = 8;
      c.shadowOffsetY = 3;

      // Aerosol gradient (Red label can)
      const bg = c.createLinearGradient(-CW / 2, 0, CW / 2, 0);
      bg.addColorStop(0, "#8a1818");
      bg.addColorStop(0.13, "#d43530");
      bg.addColorStop(0.4, "#ee4e48");
      bg.addColorStop(0.6, "#e84040");
      bg.addColorStop(0.85, "#d43530");
      bg.addColorStop(1, "#8a1818");
      c.fillStyle = bg;
      rr(c, -CW / 2, -CH / 2, CW, CH, 4);
      c.fill();
      c.restore();

      // Metal rims
      const m = c.createLinearGradient(-CW / 2, 0, CW / 2, 0);
      m.addColorStop(0, "#aaa");
      m.addColorStop(0.4, "#ddd");
      m.addColorStop(1, "#999");
      c.fillStyle = m;
      rr(c, -CW / 2 + 1, CH / 2 - 3, CW - 2, 3, 1);
      c.fill();
      rr(c, -CW / 2 + 1, -CH / 2, CW - 2, 3, 1);
      c.fill();

      // Label details
      c.fillStyle = "rgba(255,255,255,0.08)";
      rr(c, -CW / 2 + 2, -5, CW - 4, 12, 2);
      c.fill();
      c.fillStyle = "rgba(255,255,255,0.25)";
      c.font = "bold 4px sans-serif";
      c.textAlign = "center";
      c.fillText("SILLY", 0, 1);
      c.fillText("STRING", 0, 5.5);

      // Top cap connector
      c.fillStyle = m;
      rr(c, -5, -CH / 2 - 4, 10, 5, 2);
      c.fill();

      // Color indicator nozzle
      c.fillStyle = curStrand ? COLS[curStrand.ci] : "#d44";
      c.beginPath();
      c.ellipse(0, -CH / 2 - 5, 4, 2, 0, 0, Math.PI * 2);
      c.fill();

      // Spray tip nozzle
      c.fillStyle = "#bbb";
      c.beginPath();
      c.moveTo(2, -CH / 2 - 3);
      c.lineTo(NX - 1, NY - 1);
      c.lineTo(NX - 1, NY + 2);
      c.lineTo(2, -CH / 2 + 1);
      c.closePath();
      c.fill();

      c.fillStyle = "#888";
      c.beginPath();
      c.arc(NX, NY, 2, 0, Math.PI * 2);
      c.fill();

      // Cloud particles while spraying
      if (spraying && curStrand) {
        for (let i = 0; i < 3; i++) {
          const d = 1 + Math.random() * 5;
          c.fillStyle = COLS[curStrand.ci];
          c.globalAlpha = 0.08 + Math.random() * 0.1;
          c.beginPath();
          c.arc(
            NX + d,
            NY + (Math.random() - 0.5) * 3,
            0.3 + Math.random() * 0.4,
            0,
            Math.PI * 2
          );
          c.fill();
        }
        c.globalAlpha = 1;
      }
      c.restore();
    };

    // Emit strands from aerosol nozzle tip
    const emitFrom = (cx: number, cy: number) => {
      if (!curStrand) return;
      spT++;
      const a = aimAngle(cx, cy);
      const tip = tipWorld(cx, cy, a);
      const pressure = 3 + (getVal(pressureRef, 50) / 100) * 11;
      const curlAmt = (getVal(curlRef, 50) / 100) * 4;
      const chaos = (getVal(chaosRef, 25) / 100) * 1.2;

      for (let j = 0; j < 3; j++) {
        const speed = pressure + Math.random() * 2;
        const curl = Math.sin(spT * 0.35 + j * 1.7) * curlAmt;
        const wobble = (Math.random() - 0.5) * (0.15 + chaos);
        const pa = a + Math.PI / 2;

        curStrand.add(
          tip.x,
          tip.y,
          Math.cos(a + wobble) * speed + Math.cos(pa) * curl,
          Math.sin(a + wobble) * speed + Math.sin(pa) * curl
        );
      }

      // Memory limit (cap absolute max points)
      let tot = 0;
      for (const s of strands) tot += s.pts.length;
      while (tot > 7000 && strands.length > 1) {
        const o = strands[0];
        if (o === curStrand) break;
        if (o.pts.length > 0) {
          o.pts.shift();
          o.lks.shift();
          tot--;
        } else {
          strands.shift();
        }
      }
    };

    // Draw existing strands
    const drawStrands = (c: CanvasRenderingContext2D) => {
      const thick = 0.5 + (getVal(thickRef, 40) / 100) * 3.5;
      const scrollY = scrollYRef.current;
      for (const s of strands) {
        if (s.pts.length < 2) continue;
        const pts = s.pts;
        const lks = s.lks;
        const col = COLS[s.ci];
        const colL = COLS_L[s.ci];

        c.lineCap = "round";
        c.lineJoin = "round";
        c.beginPath();
        c.moveTo(pts[0].x, pts[0].y - scrollY);

        for (let i = 1; i < pts.length; i++) {
          if (i - 1 < lks.length && lks[i - 1].broken) {
            c.moveTo(pts[i].x, pts[i].y - scrollY);
            continue;
          }
          const dx = pts[i].x - pts[i - 1].x;
          const dy = pts[i].y - pts[i - 1].y;
          if (dx * dx + dy * dy > 600) {
            c.moveTo(pts[i].x, pts[i].y - scrollY);
            continue;
          }
          c.quadraticCurveTo(
            pts[i - 1].x,
            pts[i - 1].y - scrollY,
            (pts[i - 1].x + pts[i].x) / 2,
            (pts[i - 1].y - scrollY + pts[i].y - scrollY) / 2
          );
        }

        // Glow shadow
        c.save();
        c.shadowColor = col;
        c.shadowBlur = 2;
        c.strokeStyle = col;
        c.globalAlpha = 0.12;
        c.lineWidth = thick + 2;
        c.stroke();
        c.restore();

        // Main line
        c.strokeStyle = col;
        c.globalAlpha = 0.9;
        c.lineWidth = thick;
        c.stroke();

        // Inner highlight core
        c.strokeStyle = colL;
        c.globalAlpha = 0.25;
        c.lineWidth = thick * 0.3;
        c.stroke();
        c.globalAlpha = 1;
      }
    };

    let frameId: number;

    // Simulation loop
    const tick = () => {
      const scrollY = scrollYRef.current;
      const threshold = window.innerHeight * 1.1;

      // Stop calculations and clear canvas when off-screen to improve scroll performance
      if (scrollY >= threshold) {
        if (isDrawing) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          isDrawing = false;
        }
        frameId = requestAnimationFrame(tick);
        return;
      }

      isDrawing = true;
      demoT++;
      let canX = mx;
      let canY = my;

      // Passive demo spray when user is not interacting
      if (demo) {
        canX = W * 0.15 + ((Math.sin(demoT * 0.008) + 1) / 2) * W * 0.7;
        canY = window.innerHeight * 0.2 + Math.sin(demoT * 0.035) * 12;
        if (demoT % 2 === 0 && scrollY < window.innerHeight) {
          if (!curStrand || curStrand.pts.length > 150) {
            curStrand = new Strand(ci++ % COLS.length);
            strands.push(curStrand);
          }
          spraying = true;
        } else if (scrollY >= window.innerHeight) {
          spraying = false;
          curStrand = null;
        }
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Emit new particles
      if (spraying) {
        emitFrom(canX, canY);
      }

      const gravityVal = getVal(gravityRef, 30);

      // Solve point relaxation constraint iterations
      for (const s of strands) {
        for (const p of s.pts) {
          p.update(W, H, gravityVal, hit);
        }
        for (let i = 0; i < 2; i++) {
          for (const k of s.lks) {
            k.solve();
          }
        }
      }

      // Draw all strands
      drawStrands(ctx);

      // Draw centered logo
      if (logoImg && ready) {
        ctx.drawImage(logoImg, LOX, LOY - scrollY, LW, LH);
      }

      // Draw custom spray can (either on hover, or during active demo)
      if (isMouseOver || (demo && scrollY < window.innerHeight * 1.2)) {
        drawCan(ctx, canX, canY - scrollY);
      }

      frameId = requestAnimationFrame(tick);
    };

    // Start tick
    frameId = requestAnimationFrame(tick);

    // Event listeners mapped to bounding client coordinates
    const getCoords = (e: MouseEvent | Touch) => {
      const rect = canvas.getBoundingClientRect();
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top + scrollYRef.current,
      };
    };

    const handleMouseDown = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("#panel") || target.closest("#reset")) return;

      demo = false;
      spraying = true;
      spT = 0;
      const coords = getCoords(e);
      mx = coords.x;
      my = coords.y;

      curStrand = new Strand(ci++ % COLS.length);
      strands.push(curStrand);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (demo && !target.closest("#panel") && !target.closest("#reset")) {
        demo = false;
        spraying = false;
        curStrand = null;
      }
      const coords = getCoords(e);
      mx = coords.x;
      my = coords.y;
    };

    const handleMouseUp = () => {
      spraying = false;
      curStrand = null;
    };

    const handleMouseEnter = () => {
      isMouseOver = true;
    };

    const handleMouseLeave = () => {
      isMouseOver = false;
      spraying = false;
      curStrand = null;
    };

    // Mobile touch events
    const handleTouchStart = (e: TouchEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("#panel") || target.closest("#reset")) return;

      e.preventDefault();
      demo = false;
      const t = e.touches[0];
      const coords = getCoords(t as unknown as Touch);
      mx = coords.x;
      my = coords.y;

      spraying = true;
      spT = 0;
      curStrand = new Strand(ci++ % COLS.length);
      strands.push(curStrand);
    };

    const handleTouchMove = (e: TouchEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("#panel")) return;

      e.preventDefault();
      const t = e.touches[0];
      const coords = getCoords(t as unknown as Touch);
      mx = coords.x;
      my = coords.y;
    };

    const handleTouchEnd = () => {
      spraying = false;
      curStrand = null;
    };

    // Reset button logic
    const handleResetClick = () => {
      strands = [];
      curStrand = null;
    };

    const resetBtn = document.getElementById("reset");
    if (resetBtn) {
      resetBtn.addEventListener("click", handleResetClick);
    }

    // Attach canvas events
    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("mouseenter", handleMouseEnter);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    canvas.addEventListener("touchstart", handleTouchStart, { passive: false });
    canvas.addEventListener("touchmove", handleTouchMove, { passive: false });
    canvas.addEventListener("touchend", handleTouchEnd);

    // Cleanup
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer1);
      clearTimeout(timer2);

      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener("mouseenter", handleMouseEnter);
      canvas.removeEventListener("mouseleave", handleMouseLeave);

      canvas.removeEventListener("touchstart", handleTouchStart);
      canvas.removeEventListener("touchmove", handleTouchMove);
      canvas.removeEventListener("touchend", handleTouchEnd);

      if (resetBtn) {
        resetBtn.removeEventListener("click", handleResetClick);
      }
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-20 h-[100svh] w-[100dvw] select-none overflow-hidden hero-canvas-container">
      {/* Physics Canvas */}
      <canvas
        ref={canvasRef}
        className="block w-full h-full pointer-events-auto"
        style={{ cursor: "none" }}
      />
    </div>
  );
}
