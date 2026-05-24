"use client";

import { useEffect, useRef, useState } from "react";

const FIRST = "Kirill".split("");
const LAST = "Grazhdan".split("");

const rings = [
  {
    radius: 280,
    duration: 30,
    coins: [
      { symbol: "₿", size: 155, symSize: 56 },
      { symbol: "Ξ", size: 160, symSize: 58 },
      { symbol: "₮", size: 145, symSize: 52 },
      { symbol: "⬡", size: 170, symSize: 62 },
      { symbol: "◎", size: 150, symSize: 54 },
    ],
  },
  {
    radius: 420,
    duration: 45,
    coins: [
      { symbol: "$", size: 165, symSize: 60 },
      { symbol: "₳", size: 140, symSize: 50 },
      { symbol: "Ð", size: 180, symSize: 65 },
      { symbol: "⬡", size: 155, symSize: 56 },
      { symbol: "◈", size: 160, symSize: 58 },
    ],
  },
  {
    radius: 580,
    duration: 62,
    coins: [
      { symbol: "▲", size: 170, symSize: 62 },
      { symbol: "●", size: 155, symSize: 56 },
      { symbol: "⬡", size: 145, symSize: 52 },
      { symbol: "◈", size: 160, symSize: 58 },
      { symbol: "✕", size: 150, symSize: 54 },
    ],
  },
];

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
    const block = 2;
    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      for (let y = 0; y < h; y += block) {
        for (let x = 0; x < w; x += block) {
          const v = Math.random() * 255 | 0;
          ctx.fillStyle = `rgb(${v},${v},${v})`;
          ctx.fillRect(x, y, block, block);
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section className="sticky top-0 z-10 bg-[#0f0f0f] min-h-screen flex flex-col items-center justify-center px-6 relative" style={{ overflow: "visible" }}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <canvas ref={noiseCanvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1, opacity: 0.018, mixBlendMode: "screen" }} />

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

      {/* orbital coin rings — arm rotates, coin counter-rotates */}
      <div
        aria-hidden="true"
        className="absolute pointer-events-none select-none"
        style={{ top: "50%", left: "50%", opacity: 0.7 }}
      >
        {rings.map((ring, ri) =>
          ring.coins.map((coin, ci) => {
            const delay = -(ring.duration * ci) / ring.coins.length;
            return (
              <div
                key={`${ri}-${ci}`}
                className="absolute"
                style={{
                  width: 0,
                  height: 0,
                  animation: `orbitArm ${ring.duration}s linear infinite`,
                  animationDelay: `${delay}s`,
                }}
              >
                <div
                  className="absolute flex items-center justify-center rounded-full"
                  style={{
                    width:           coin.size,
                    height:          coin.size,
                    left:            ring.radius,
                    top:             -coin.size / 2,
                    background:      "rgba(255,255,255,0.04)",
                    border:          "1px solid rgba(255,255,255,0.08)",
                    filter:          "blur(6px)",
                    animation:       `counterOrbit ${ring.duration}s linear infinite`,
                    animationDelay:  `${delay}s`,
                  }}
                >
                  <span
                    className="font-mono"
                    style={{ color: "rgba(255,255,255,0.25)", fontSize: coin.symSize }}
                  >
                    {coin.symbol}
                  </span>
                </div>
              </div>
            );
          })
        )}
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
