"use client";

import { useEffect, useRef, useState } from "react";

const NAME = "Kirill".split("");

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.2 + 0.4,
        a: Math.random() * 0.35 + 0.05,
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
          if (d < 120) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(99, 102, 241, ${0.06 * (1 - d / 120)})`;
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
    <section className="sticky top-0 z-10 bg-[#0a0a0f] relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(99,102,241,0.06)_0%,transparent_70%)]" />
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(99,102,241,1) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* floating decorative icons */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        {[
          { s: "₿",  top: "12%",  left: "7%",   op: 0.10, fs: "34px", anim: "float-a 12s ease-in-out infinite", delay: "0s" },
          { s: "Ξ",  top: "22%",  right: "9%",  op: 0.08, fs: "26px", anim: "float-b 15s ease-in-out infinite", delay: "2s" },
          { s: "◈",  top: "64%",  left: "5%",   op: 0.11, fs: "22px", anim: "float-c 10s ease-in-out infinite", delay: "1s" },
          { s: "$",  bottom: "18%", right: "7%", op: 0.09, fs: "38px", anim: "float-d 13s ease-in-out infinite", delay: "3s" },
          { s: "✦",  top: "7%",   right: "22%", op: 0.10, fs: "18px", anim: "float-e 9s ease-in-out infinite",  delay: "0.5s" },
          { s: "▲",  bottom: "28%", left: "13%", op: 0.08, fs: "20px", anim: "float-f 14s ease-in-out infinite", delay: "1.5s" },
          { s: "⌨",  top: "43%",  right: "15%", op: 0.07, fs: "24px", anim: "float-a 11s ease-in-out infinite", delay: "4s" },
          { s: "∞",  top: "76%",  left: "27%",  op: 0.09, fs: "30px", anim: "float-b 16s ease-in-out infinite", delay: "2.5s" },
          { s: "⊕",  bottom: "13%", right: "27%", op: 0.08, fs: "26px", anim: "float-e 12s ease-in-out infinite", delay: "0.8s" },
        ].map((icon, i) => (
          <span
            key={i}
            className="absolute font-mono text-indigo-400"
            style={{
              top: icon.top,
              bottom: (icon as {bottom?: string}).bottom,
              left: icon.left,
              right: (icon as {right?: string}).right,
              opacity: icon.op,
              fontSize: icon.fs,
              animation: icon.anim,
              animationDelay: icon.delay,
            }}
          >
            {icon.s}
          </span>
        ))}
      </div>

      <div className="relative z-10 text-center w-full max-w-6xl mx-auto">
        {/* badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/5 text-indigo-400 text-xs font-mono tracking-widest mb-12 uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
          Available for new projects
        </div>

        {/* massive name */}
        <h1
          className="font-bold tracking-tight leading-none mb-8 flex justify-center"
          style={{ fontSize: "clamp(80px, 18vw, 260px)" }}
          aria-label="Kirill"
        >
          {NAME.map((letter, i) => (
            <span
              key={i}
              className="inline-block bg-gradient-to-br from-white via-indigo-100 to-indigo-300 bg-clip-text text-transparent"
              style={
                mounted
                  ? {
                      animation: `letterReveal 0.7s cubic-bezier(0.16,1,0.3,1) both`,
                      animationDelay: `${i * 55}ms`,
                    }
                  : { opacity: 0 }
              }
            >
              {letter}
            </span>
          ))}
        </h1>

        {/* title */}
        <p
          className="font-mono text-indigo-400/70 tracking-[0.2em] uppercase mb-6"
          style={{ fontSize: "clamp(10px, 1.2vw, 14px)" }}
        >
          Head of Product / Product Owner · Fintech & Crypto
        </p>

        {/* tagline */}
        <p
          className="text-[#6b7082] max-w-xl mx-auto leading-relaxed mb-14"
          style={{ fontSize: "clamp(15px, 1.6vw, 18px)" }}
        >
          9+ years building crypto &amp; fintech products.{" "}
          <span className="text-indigo-300">From zero to revenue</span> — fast.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#case-studies"
            className="px-8 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-medium hover:from-indigo-500 hover:to-violet-500 transition-all duration-300 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/35"
          >
            View Case Studies
          </a>
          <a
            href="#contact"
            className="px-8 py-3 rounded-full border border-white/10 text-[#8b8fa8] hover:border-indigo-500/40 hover:text-white transition-all duration-300"
          >
            Get in Touch
          </a>
        </div>
      </div>

      {/* scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#2a2d3e]">
        <span className="text-xs font-mono tracking-widest uppercase">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-indigo-500/40 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
