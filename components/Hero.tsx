"use client";

import { useEffect, useRef } from "react";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles: { x: number; y: number; vx: number; vy: number; r: number; a: number }[] = [];
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.5 + 0.5,
        a: Math.random() * 0.5 + 0.1,
      });
    }

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99, 102, 241, ${p.a})`;
        ctx.fill();
      });

      particles.forEach((a, i) => {
        particles.slice(i + 1).forEach((b) => {
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 100) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(99, 102, 241, ${0.08 * (1 - d / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* animated background */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.08)_0%,transparent_70%)]" />

      {/* grid lines */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(99,102,241,1) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/5 text-indigo-400 text-xs font-mono tracking-widest mb-8 uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
          Available for new projects
        </div>

        <h1 className="text-7xl md:text-9xl font-bold tracking-tight mb-4">
          <span className="bg-gradient-to-r from-white via-indigo-100 to-indigo-300 bg-clip-text text-transparent">
            Kirill
          </span>
        </h1>

        <p className="text-lg md:text-xl font-mono text-indigo-400/80 tracking-widest mb-6 uppercase">
          Head of Product · Fintech & Crypto
        </p>

        <p className="text-[#8b8fa8] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12">
          9+ years building crypto &amp; fintech products.{" "}
          <span className="text-indigo-300">From zero to revenue</span> — fast.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#case-studies"
            className="px-8 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-medium hover:from-indigo-500 hover:to-violet-500 transition-all duration-200 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40"
          >
            View Case Studies
          </a>
          <a
            href="#contact"
            className="px-8 py-3 rounded-full border border-white/10 text-[#a0a4b8] hover:border-indigo-500/50 hover:text-white transition-all duration-200"
          >
            Get in Touch
          </a>
        </div>
      </div>

      {/* scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#3a3d52]">
        <span className="text-xs font-mono tracking-widest uppercase">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-indigo-500/50 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
