"use client";

import { useEffect, useRef } from "react";

interface NeuralNoiseCanvasProps {
  className?: string;
  canvasClassName?: string;
}

const vertexShaderSource = `
precision mediump float;

varying vec2 vUv;
attribute vec2 a_position;

void main() {
  vUv = .5 * (a_position + 1.);
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const fragmentShaderSource = `
precision mediump float;

varying vec2 vUv;
uniform float u_time;
uniform float u_ratio;
uniform vec2 u_pointer_position;
uniform float u_scroll_progress;

vec2 rotate(vec2 uv, float th) {
  return mat2(cos(th), sin(th), -sin(th), cos(th)) * uv;
}

float neuro_shape(vec2 uv, float t, float p) {
  vec2 sine_acc = vec2(0.);
  vec2 res = vec2(0.);
  float scale = 8.;

  for (int j = 0; j < 15; j++) {
    uv = rotate(uv, 1.);
    sine_acc = rotate(sine_acc, 1.);
    vec2 layer = uv * scale + float(j) + sine_acc - t;
    sine_acc += sin(layer) + 2.4 * p;
    res += (.5 + .5 * cos(layer)) / scale;
    scale *= 1.2;
  }

  return res.x + res.y;
}

void main() {
  vec2 uv = .5 * vUv;
  uv.x *= u_ratio;

  vec2 pointer = vUv - u_pointer_position;
  pointer.x *= u_ratio;
  float p = clamp(length(pointer), 0., 1.);
  p = .5 * pow(1. - p, 2.);

  float t = .001 * u_time;
  float noise = neuro_shape(uv, t, p);

  noise = 1.2 * pow(noise, 3.);
  noise += pow(noise, 10.);
  noise = max(.0, noise - .5);
  noise *= (1. - length(vUv - .5));

  vec3 color = normalize(vec3(.2, .5 + .4 * cos(3. * u_scroll_progress), .5 + .5 * sin(3. * u_scroll_progress)));
  color = color * noise;

  gl_FragColor = vec4(color, noise);
}
`;

type Uniforms = {
  u_time: WebGLUniformLocation | null;
  u_ratio: WebGLUniformLocation | null;
  u_pointer_position: WebGLUniformLocation | null;
  u_scroll_progress: WebGLUniformLocation | null;
};

function createShader(gl: WebGLRenderingContext, source: string, type: number) {
  const shader = gl.createShader(type);

  if (!shader) {
    return null;
  }

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

export default function NeuralNoiseCanvas({ className = "", canvasClassName = "" }: NeuralNoiseCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;

    if (!canvas || !wrapper) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: "low-power",
      preserveDrawingBuffer: false,
    });

    if (!gl) {
      return;
    }

    const vertexShader = createShader(gl, vertexShaderSource, gl.VERTEX_SHADER);
    const fragmentShader = createShader(gl, fragmentShaderSource, gl.FRAGMENT_SHADER);

    if (!vertexShader || !fragmentShader) {
      return;
    }

    const program = gl.createProgram();

    if (!program) {
      return;
    }

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      return;
    }

    const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    const vertexBuffer = gl.createBuffer();
    const positionLocation = gl.getAttribLocation(program, "a_position");

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    gl.useProgram(program);
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const uniforms: Uniforms = {
      u_time: gl.getUniformLocation(program, "u_time"),
      u_ratio: gl.getUniformLocation(program, "u_ratio"),
      u_pointer_position: gl.getUniformLocation(program, "u_pointer_position"),
      u_scroll_progress: gl.getUniformLocation(program, "u_scroll_progress"),
    };

    const pointer = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
    };

    let animationFrame = 0;
    let lastFrame = 0;
    let isVisible = true;
    let isTabVisible = !document.hidden;

    const resizeCanvas = () => {
      const width = wrapper.clientWidth || window.innerWidth;
      const height = wrapper.clientHeight || window.innerHeight;
      const maxPixelRatio = width < 768 ? 0.9 : 1.1;
      const pixelRatio = Math.min(window.devicePixelRatio || 1, maxPixelRatio);

      canvas.width = Math.floor(width * pixelRatio);
      canvas.height = Math.floor(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform1f(uniforms.u_ratio, canvas.width / Math.max(canvas.height, 1));
    };

    const render = (time: number) => {
      if (!isVisible || !isTabVisible) {
        animationFrame = requestAnimationFrame(render);
        return;
      }

      if (time - lastFrame < 40 && !prefersReducedMotion) {
        animationFrame = requestAnimationFrame(render);
        return;
      }

      lastFrame = time;
      pointer.x += (pointer.targetX - pointer.x) * 0.12;
      pointer.y += (pointer.targetY - pointer.y) * 0.12;

      const rect = canvas.getBoundingClientRect();
      const relativeX = (pointer.x - rect.left) / Math.max(rect.width, 1);
      const relativeY = 1 - (pointer.y - rect.top) / Math.max(rect.height, 1);

      gl.uniform1f(uniforms.u_time, prefersReducedMotion ? 0 : time);
      gl.uniform2f(uniforms.u_pointer_position, relativeX, relativeY);
      gl.uniform1f(uniforms.u_scroll_progress, window.scrollY / Math.max(window.innerHeight * 2, 1));
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      if (!prefersReducedMotion) {
        animationFrame = requestAnimationFrame(render);
      }
    };

    const updatePointer = (x: number, y: number) => {
      pointer.targetX = x;
      pointer.targetY = y;
    };

    const handlePointerMove = (event: PointerEvent) => {
      updatePointer(event.clientX, event.clientY);
    };

    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.01 }
    );

    resizeCanvas();
    observer.observe(wrapper);
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);
    animationFrame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrame);
      observer.disconnect();
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      gl.deleteBuffer(vertexBuffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
    };
  }, []);

  return (
    <div ref={wrapperRef} className={`absolute inset-0 z-0 overflow-hidden bg-[#151912] ${className}`}>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className={`h-full w-full opacity-100 ${canvasClassName}`}
      />
    </div>
  );
}
