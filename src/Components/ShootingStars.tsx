"use client";

import { useEffect, useRef } from "react";

type Star = {
  baseX: number;
  baseY: number;
  phase: number;
  speed: number;
  amplitude: number;
  flickerSpeed: number;
  depth: number;
  isBlurred: boolean;
  size: number;
};

type ShootingStar = {
  startX: number;
  startY: number;
  x: number;
  y: number;
  speed: number;
  length: number;
  lifetime: number;
  createdAt: number;
  angle: number;
};

const StarsCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const shootingStarsRef = useRef<ShootingStar[]>([]);
  const mouseOffsetRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number | null>(null);

  // Firefly with randomized properties.
  const createStar = (canvasWidth: number, canvasHeight: number): Star => {
    const baseX = Math.random() * canvasWidth;
    const baseY = Math.random() * canvasHeight;
    const phase = Math.random() * Math.PI * 2;
    const speed = Math.random() * 0.5 + 0.2;
    const amplitude = Math.random() * 20 + 10;
    const flickerSpeed = Math.random() * 2 + 1;
    const depth = Math.random() * 0.6 + 0.2;
    const isBlurred = Math.random() < 0.3;
    const size = isBlurred ? Math.random() * 1 + 0.5 : Math.random() * 1 + 1;
    return {
      baseX,
      baseY,
      phase,
      speed,
      amplitude,
      flickerSpeed,
      depth,
      isBlurred,
      size,
    };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    const stars = starsRef.current;
    // Pre-populate with 50 fireflies.
    for (let i = 0; i < 50; i++) {
      stars.push(createStar(canvas.width, canvas.height));
    }
    const starInterval = setInterval(() => {
      stars.push(createStar(canvas.width, canvas.height));
      // Limiting to keep performance in check.
      if (stars.length > 100) {
        stars.shift();
      }
    }, 200);

    //Shooting star with randomized direction.
    const createShootingStar = (
      canvasWidth: number,
      canvasHeight: number
    ): ShootingStar => {
      const isDownRight = Math.random() < 0.5;
      let angle: number;
      let startX: number;
      if (isDownRight) {
        angle = Math.PI / 4;
        startX = Math.random() * canvasWidth * 0.4;
      } else {
        angle = (3 * Math.PI) / 4;
        startX = canvasWidth - Math.random() * canvasWidth * 0.4;
      }
      const startY = Math.random() * canvasHeight * 0.5;
      const speed = Math.random() * 50 + 50;
      const length = Math.random() * 50 + 100;
      const lifetime = Math.random() * 0.5 + 1.5;
      return {
        startX,
        startY,
        x: startX,
        y: startY,
        speed,
        length,
        lifetime,
        createdAt: performance.now(),
        angle,
      };
    };

    const shootingStarInterval = setInterval(() => {
      shootingStarsRef.current.push(
        createShootingStar(canvas.width, canvas.height)
      );
    }, 2000);

    let lastTime = performance.now();
    // Current parallax offset lags behind mouseOffsetRef.
    const currentParallax = { x: 0, y: 0 };

    const animate = (time: number) => {
      const dt = (time - lastTime) / 1000;
      lastTime = time;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      currentParallax.x += (mouseOffsetRef.current.x - currentParallax.x) * 0.1;
      currentParallax.y += (mouseOffsetRef.current.y - currentParallax.y) * 0.1;

      // Animate firefly stars.
      stars.forEach((star) => {
        star.phase += star.speed * dt;
        const offsetX = Math.cos(star.phase) * star.amplitude;
        const offsetY = Math.sin(star.phase) * star.amplitude;

        const parallaxX = currentParallax.x * star.depth;
        const parallaxY = currentParallax.y * star.depth;

        const finalX = star.baseX + offsetX + parallaxX;
        const finalY = star.baseY + offsetY + parallaxY;

        const opacity =
          0.5 +
          0.5 *
            Math.abs(
              Math.sin(time * 0.001 * star.flickerSpeed + star.phase) *
                Math.cos(time * 0.001 * star.flickerSpeed * 0.5 + star.phase)
            );

        ctx.save();
        if (star.isBlurred) {
          ctx.shadowBlur = 10;
          ctx.shadowColor = "white";
        }
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.beginPath();
        ctx.arc(finalX, finalY, star.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Shooting stars animation.
      for (let i = shootingStarsRef.current.length - 1; i >= 0; i--) {
        const shootingStar = shootingStarsRef.current[i];
        const elapsed = (time - shootingStar.createdAt) / 1000;
        if (elapsed > shootingStar.lifetime) {
          shootingStarsRef.current.splice(i, 1);
          continue;
        }
        shootingStar.x +=
          shootingStar.speed * dt * Math.cos(shootingStar.angle);
        shootingStar.y +=
          shootingStar.speed * dt * Math.sin(shootingStar.angle);
        const opacity = 0.5 * (1 - elapsed / shootingStar.lifetime);

        const tailX =
          shootingStar.x - shootingStar.length * Math.cos(shootingStar.angle);
        const tailY =
          shootingStar.y - shootingStar.length * Math.sin(shootingStar.angle);

        ctx.save();
        ctx.lineWidth = 2;
        const gradient = ctx.createLinearGradient(
          shootingStar.x,
          shootingStar.y,
          tailX,
          tailY
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${opacity})`);
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx.strokeStyle = gradient;
        ctx.beginPath();
        ctx.moveTo(shootingStar.x, shootingStar.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();
        ctx.restore();
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };
    animationFrameRef.current = requestAnimationFrame(animate);

    const handleMouseMove = (e: MouseEvent) => {
      const offsetX = (e.clientX - window.innerWidth / 2) * 0.05;
      const offsetY = (e.clientY - window.innerHeight / 2) * 0.05;
      mouseOffsetRef.current = { x: offsetX, y: offsetY };
    };
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", setCanvasSize);
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(starInterval);
      clearInterval(shootingStarInterval);
      if (animationFrameRef.current)
        cancelAnimationFrame(animationFrameRef.current);
      starsRef.current = [];
      shootingStarsRef.current = [];
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="star-canvas"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: -20,
      }}
    />
  );
};

export default StarsCanvas;