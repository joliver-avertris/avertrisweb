"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";
import { createNoise3D } from "simplex-noise";

export const WavyBackground = ({
  children,
  className,
  containerClassName,
  colors,
  waveWidth,
  backgroundFill,
  blur = 10,
  speed = "fast",
  waveOpacity = 0.5,
  ...props
}: {
  children?: any;
  className?: string;
  containerClassName?: string;
  colors?: string[];
  waveWidth?: number;
  backgroundFill?: string;
  blur?: number;
  speed?: "slow" | "fast";
  waveOpacity?: number;
  [key: string]: any;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  const [isSafari, setIsSafari] = useState(false);
  useEffect(() => {
    setIsSafari(
      typeof window !== "undefined" &&
        navigator.userAgent.includes("Safari") &&
        !navigator.userAgent.includes("Chrome")
    );
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const noise = createNoise3D();
    const spd = speed === "fast" ? 0.002 : 0.001;
    const wColors = colors ?? ["#38bdf8", "#818cf8", "#c084fc", "#e879f9", "#22d3ee"];
    const wW = waveWidth || 50;
    const fill = backgroundFill || "black";
    const WAVE_COUNT = Math.min(wColors.length, 3);
    const STEP = 15; // pixel step — higher = fewer lineTo calls
    const FPS_INTERVAL = 1000 / 30; // cap at 30fps

    let w = 0, h = 0, nt = 0;
    let lastTime = 0;

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      ctx.filter = `blur(${blur}px)`;
    };
    resize();
    window.addEventListener("resize", resize);

    const render = (time: number) => {
      animRef.current = requestAnimationFrame(render);
      const delta = time - lastTime;
      if (delta < FPS_INTERVAL) return;
      lastTime = time - (delta % FPS_INTERVAL);

      ctx.fillStyle = fill;
      ctx.globalAlpha = waveOpacity;
      ctx.fillRect(0, 0, w, h);
      nt += spd;
      for (let i = 0; i < WAVE_COUNT; i++) {
        ctx.beginPath();
        ctx.lineWidth = wW;
        ctx.strokeStyle = wColors[i % wColors.length];
        for (let x = 0; x < w; x += STEP) {
          const y = noise(x / 800, 0.3 * i, nt) * 100;
          ctx.lineTo(x, y + h * 0.5);
        }
        ctx.stroke();
        ctx.closePath();
      }
    };

    animRef.current = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div
      className={cn(
        "h-full flex flex-col items-center justify-center",
        containerClassName
      )}
    >
      <canvas
        className="absolute inset-0 z-0"
        ref={canvasRef}
        id="canvas"
        style={{
          ...(isSafari ? { filter: `blur(${blur}px)` } : {}),
        }}
      ></canvas>
      <div className={cn("relative z-10", className)} {...props}>
        {children}
      </div>
    </div>
  );
};
