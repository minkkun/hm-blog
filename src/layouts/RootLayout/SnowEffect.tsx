"use client";
import { useEffect, useRef } from "react";

export default function SnowEffect() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // create canvas and append to body so it doesn't affect layout or stacking contexts
    const canvas = document.createElement("canvas");
    canvas.id = "snow-canvas";
    canvas.setAttribute("aria-hidden", "true");
    canvas.setAttribute("role", "presentation");
    Object.assign(canvas.style, {
      position: "fixed",
      top: "0",
      left: "0",
      width: "100vw",
      height: "100vh",
      pointerEvents: "none",
      zIndex: "0",
    } as Partial<CSSStyleDeclaration>);
    document.body.appendChild(canvas);
    canvasRef.current = canvas;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // HiDPI-aware sizing so text flakes look crisp
    const setCanvasSize = () => {
      const dpr = Math.max(1, window.devicePixelRatio || 1);
      // keep CSS size 100% so it never impacts layout; canvas bitmap uses device pixels
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    type Flake = { x: number; y: number; size: number; speed: number; shape: string; opacity: number };
    const snowflakes: Flake[] = [];
    const shapes = ["❄", "✶", "✻", "✼", "✺"];

    const createSnowflakes = () => {
      const total = 140;
      for (let i = 0; i < total; i++) {
        snowflakes.push({
          x: Math.random() * (canvas.width || window.innerWidth),
          y: Math.random() * (canvas.height || window.innerHeight),
          size: Math.random() * 24 + 8,
          speed: Math.random() * 1 + 0.5,
          shape: shapes[Math.floor(Math.random() * shapes.length)],
          opacity: Math.random() * 0.8 + 0.2,
        });
      }
    };

    const step = () => {
      if (!canvasRef.current) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const flake of snowflakes) {
        ctx.globalAlpha = flake.opacity;
        ctx.font = `${flake.size}px Arial`;
        ctx.fillStyle = "white";
        ctx.fillText(flake.shape, flake.x, flake.y);
        flake.y += flake.speed;
        if (flake.y > canvas.height) {
          flake.y = 0;
          flake.x = Math.random() * canvas.width;
        }
      }
      rafRef.current = requestAnimationFrame(step);
    };

    createSnowflakes();
    step();

    return () => {
      window.removeEventListener("resize", setCanvasSize);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      if (canvasRef.current && canvasRef.current.parentNode) {
        canvasRef.current.parentNode.removeChild(canvasRef.current);
      }
      canvasRef.current = null;
    };
  }, []);

  // nothing in the React render tree — canvas is appended to document.body
  return null;
}
