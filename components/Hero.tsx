"use client";

import { useEffect, useRef, useState } from "react";

const FIRST = "Kirill".split("");
const LAST = "Grazhdan".split("");

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const noiseCanvasRef = useRef<HTMLCanvasElement>(null);
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
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        r: Math.random() * 1.2 + 0.3,
        a: Math.random() * 0.22 + 0.04,
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
        ctx.fillStyle = `rgba(155, 158, 180, ${p.a})`;
        ctx.fill();
      });
      particles.forEach((a, i) => {
        particles.slice(i + 1).forEach((b) => {
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 130) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(155, 158, 180, ${0.04 * (1 - d / 130)})`;
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

  useEffect(() => {
    const canvas = noiseCanvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    let raf: number;
    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      const imageData = ctx.createImageData(w, h);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const v = Math.random() * 255 | 0;
        data[i] = v;
        data[i + 1] = v;
        data[i + 2] = v;
        data[i + 3] = 255;
      }
      ctx.putImageData(imageData, 0, 0);
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section className="sticky top-0 z-10 bg-[#0f0f0f] min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 relative">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <canvas ref={noiseCanvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1, opacity: 0.04 }} />

      {/* subtle neutral radial */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_50%,rgba(130,130,150,0.04)_0%,transparent_70%)]" />

      {/* grid */}
      <div
        className="absolute inset-0 opacity-[0.018]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(180,180,200,1) 1px, transparent 1px), linear-gradient(90deg, rgba(180,180,200,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* floating icons — gray + blur */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        {[
          { s: "₿",  top: "12%",    left: "7%",    op: 0.12, fs: "34px", anim: "float-a 12s ease-in-out infinite", delay: "0s" },
          { s: "Ξ",  top: "22%",    right: "9%",   op: 0.09, fs: "26px", anim: "float-b 15s ease-in-out infinite", delay: "2s" },
          { s: "◈",  top: "64%",    left: "5%",    op: 0.11, fs: "22px", anim: "float-c 10s ease-in-out infinite", delay: "1s" },
          { s: "$",  bottom: "18%", right: "7%",   op: 0.10, fs: "38px", anim: "float-d 13s ease-in-out infinite", delay: "3s" },
          { s: "✦",  top: "7%",     right: "22%",  op: 0.10, fs: "18px", anim: "float-e 9s ease-in-out infinite",  delay: "0.5s" },
          { s: "▲",  bottom: "28%", left: "13%",   op: 0.08, fs: "20px", anim: "float-f 14s ease-in-out infinite", delay: "1.5s" },
          { s: "⌨",  top: "43%",    right: "15%",  op: 0.07, fs: "24px", anim: "float-a 11s ease-in-out infinite", delay: "4s" },
          { s: "∞",  top: "76%",    left: "27%",   op: 0.09, fs: "30px", anim: "float-b 16s ease-in-out infinite", delay: "2.5s" },
          { s: "⊕",  bottom: "13%", right: "27%",  op: 0.08, fs: "26px", anim: "float-e 12s ease-in-out infinite", delay: "0.8s" },
        ].map((icon, i) => (
          <span
            key={i}
            className="absolute font-mono text-white"
            style={{
              top: icon.top,
              bottom: (icon as { bottom?: string }).bottom,
              left: icon.left,
              right: (icon as { right?: string }).right,
              opacity: icon.op,
              fontSize: icon.fs,
              filter: "blur(1.8px)",
              animation: icon.anim,
              animationDelay: icon.delay,
            }}
          >
            {icon.s}
          </span>
        ))}
      </div>

      {/* content */}
      <div className="relative z-10 text-center w-full max-w-6xl mx-auto">
        {/* badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] text-white/40 text-xs font-mono tracking-widest mb-10 uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-white/30 animate-pulse" />
          Available for new projects
        </div>

        {/* first name */}
        <h1
          className="font-bold tracking-tight leading-none flex justify-center"
          style={{ fontSize: "clamp(70px, 15vw, 210px)" }}
          aria-label="Kirill Grazhdan"
        >
          {FIRST.map((letter, i) => (
            <span
              key={`f${i}`}
              className="inline-block bg-gradient-to-br from-white via-gray-100 to-gray-300 bg-clip-text text-transparent"
              style={
                mounted
                  ? { animation: `letterReveal 1.2s cubic-bezier(0.16,1,0.3,1) both`, animationDelay: `${i * 80}ms` }
                  : { opacity: 0 }
              }
            >
              {letter}
            </span>
          ))}
        </h1>

        {/* last name */}
        <h1
          className="font-bold tracking-tight leading-none flex justify-center mb-8"
          style={{ fontSize: "clamp(46px, 10vw, 138px)" }}
          aria-hidden="true"
        >
          {LAST.map((letter, i) => (
            <span
              key={`l${i}`}
              className="inline-block bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500 bg-clip-text text-transparent"
              style={
                mounted
                  ? { animation: `letterReveal 1.2s cubic-bezier(0.16,1,0.3,1) both`, animationDelay: `${(FIRST.length * 80) + i * 60}ms` }
                  : { opacity: 0 }
              }
            >
              {letter}
            </span>
          ))}
        </h1>

        {/* title */}
        <p
          className="font-mono text-white/30 tracking-[0.25em] uppercase mb-5"
          style={{ fontSize: "clamp(10px, 1.1vw, 14px)" }}
        >
          Head of Product / Product Owner · Fintech & Crypto
        </p>

        {/* tagline */}
        <p
          className="text-white/25 max-w-xl mx-auto leading-relaxed mb-14"
          style={{ fontSize: "clamp(14px, 1.5vw, 17px)" }}
        >
          9+ years building crypto &amp; fintech products.{" "}
          <span className="text-white/45">From zero to revenue</span> — fast.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#case-studies"
            className="px-8 py-3 rounded-full bg-white/[0.08] border border-white/10 text-white/70 font-medium hover:bg-white/[0.12] hover:text-white hover:border-white/20 transition-all duration-300"
          >
            View Case Studies
          </a>
          <a
            href="#contact"
            className="px-8 py-3 rounded-full border border-white/8 text-white/30 hover:border-white/15 hover:text-white/60 transition-all duration-300"
          >
            Get in Touch
          </a>
        </div>
      </div>

      {/* scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/15">
        <span className="text-xs font-mono tracking-widest uppercase">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-white/20 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
