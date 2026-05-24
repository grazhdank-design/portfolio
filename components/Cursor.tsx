"use client";

import { useEffect, useRef } from "react";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const hasMovedRef = useRef(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let x = 0, y = 0, cx = 0, cy = 0;
    let raf: number;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!hasMovedRef.current) {
        hasMovedRef.current = true;
        cx = x;
        cy = y;
        if (dotRef.current) dotRef.current.style.opacity = "1";
      }
    };

    document.addEventListener("mousemove", onMove);

    const tick = () => {
      cx = lerp(cx, x, 0.12);
      cy = lerp(cy, y, 0.12);
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${cx - 5}px, ${cy - 5}px)`;
      }
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      className="fixed top-0 left-0 w-[10px] h-[10px] rounded-full bg-indigo-400 pointer-events-none z-[9999] hidden md:block opacity-0 mix-blend-screen"
      style={{ willChange: "transform", transition: "opacity 0.3s" }}
    />
  );
}
