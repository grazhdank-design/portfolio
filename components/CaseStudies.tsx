"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { cases } from "@/lib/cases";

/* ─── SVG Illustrations ─────────────────────────────────────── */

function CardIllustration() {
  return (
    <svg viewBox="0 0 260 180" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="cg1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
      </defs>
      <ellipse cx="130" cy="90" rx="110" ry="66" fill="rgba(99,102,241,0.07)" />
      <rect x="20" y="28" width="220" height="130" rx="14" fill="url(#cg1)" opacity="0.88" />
      <rect x="20" y="28" width="220" height="48" rx="14" fill="rgba(255,255,255,0.06)" />
      <rect x="20" y="65" width="220" height="11" fill="rgba(255,255,255,0.06)" />
      <rect x="36" y="64" width="36" height="26" rx="4" fill="#f59e0b" opacity="0.82" />
      <line x1="36" y1="72" x2="72" y2="72" stroke="#92400e" strokeWidth="0.7" opacity="0.55" />
      <line x1="36" y1="80" x2="72" y2="80" stroke="#92400e" strokeWidth="0.7" opacity="0.55" />
      <line x1="48" y1="64" x2="48" y2="90" stroke="#92400e" strokeWidth="0.7" opacity="0.55" />
      <line x1="60" y1="64" x2="60" y2="90" stroke="#92400e" strokeWidth="0.7" opacity="0.55" />
      <path d="M82 68 Q90 77 82 86" stroke="rgba(255,255,255,0.42)" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M87 63 Q99 77 87 91" stroke="rgba(255,255,255,0.22)" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <text x="36" y="130" fill="rgba(255,255,255,0.35)" fontSize="9" fontFamily="monospace" letterSpacing="3">•••• •••• •••• 2024</text>
      <circle cx="217" cy="50" r="14" fill="rgba(255,255,255,0.07)" />
      <text x="211" y="55" fill="rgba(255,255,255,0.55)" fontSize="12" fontFamily="monospace">₿</text>
      <rect x="20" y="28" width="220" height="130" rx="14" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
    </svg>
  );
}

function RampIllustration() {
  return (
    <svg viewBox="0 0 260 180" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="rg1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#0d9488" />
        </linearGradient>
      </defs>
      <ellipse cx="130" cy="90" rx="110" ry="62" fill="rgba(16,185,129,0.05)" />
      <circle cx="55" cy="90" r="37" fill="rgba(16,185,129,0.08)" stroke="rgba(16,185,129,0.22)" strokeWidth="1" />
      <circle cx="55" cy="90" r="24" fill="rgba(16,185,129,0.12)" stroke="rgba(16,185,129,0.32)" strokeWidth="1" />
      <text x="46" y="96" fill="rgba(16,185,129,0.88)" fontSize="18" fontFamily="monospace" fontWeight="bold">₿</text>
      <rect x="163" y="54" width="72" height="72" rx="10" fill="rgba(16,185,129,0.08)" stroke="rgba(16,185,129,0.22)" strokeWidth="1" />
      <line x1="175" y1="74" x2="225" y2="74" stroke="rgba(16,185,129,0.18)" strokeWidth="1" />
      <line x1="175" y1="90" x2="225" y2="90" stroke="rgba(16,185,129,0.18)" strokeWidth="1" />
      <line x1="175" y1="106" x2="210" y2="106" stroke="rgba(16,185,129,0.18)" strokeWidth="1" />
      <text x="192" y="97" fill="rgba(16,185,129,0.88)" fontSize="20" fontFamily="monospace" fontWeight="bold">$</text>
      <line x1="102" y1="80" x2="152" y2="80" stroke="url(#rg1)" strokeWidth="1.8" strokeLinecap="round" />
      <polyline points="144,74 152,80 144,86" fill="none" stroke="url(#rg1)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="102" y1="100" x2="152" y2="100" stroke="url(#rg1)" strokeWidth="1.8" strokeLinecap="round" />
      <polyline points="110,94 102,100 110,106" fill="none" stroke="url(#rg1)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function WalletIllustration() {
  const pts: [number, number][] = [[28, 140], [62, 124], [95, 114], [124, 100], [152, 84], [188, 64]];
  return (
    <svg viewBox="0 0 260 180" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="wg1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#e11d48" />
        </linearGradient>
        <clipPath id="wc2">
          <rect x="16" y="42" width="192" height="116" rx="12" />
        </clipPath>
      </defs>
      <ellipse cx="122" cy="96" rx="110" ry="62" fill="rgba(249,115,22,0.05)" />
      <rect x="16" y="42" width="192" height="116" rx="12" fill="rgba(249,115,22,0.08)" stroke="rgba(249,115,22,0.22)" strokeWidth="1" />
      <rect x="16" y="42" width="192" height="36" rx="12" fill="rgba(249,115,22,0.13)" stroke="rgba(249,115,22,0.22)" strokeWidth="1" />
      <rect x="16" y="66" width="192" height="12" fill="rgba(249,115,22,0.13)" />
      <g clipPath="url(#wc2)">
        <path d={`M${pts.map(([x, y]) => `${x},${y}`).join(" L")} L${pts[pts.length-1][0]},158 L${pts[0][0]},158 Z`} fill="url(#wg1)" opacity="0.07" />
        <polyline points={pts.map(([x, y]) => `${x},${y}`).join(" ")} fill="none" stroke="url(#wg1)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.88" />
        {pts.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="3" fill="url(#wg1)" opacity="0.9" />)}
      </g>
      <circle cx="232" cy="96" r="19" fill="rgba(249,115,22,0.1)" stroke="rgba(249,115,22,0.28)" strokeWidth="1" />
      <text x="224" y="102" fill="rgba(249,115,22,0.7)" fontSize="14" fontFamily="monospace">◈</text>
      <text x="152" y="64" fill="rgba(249,115,22,0.65)" fontSize="11" fontFamily="monospace" fontWeight="bold">+40%</text>
    </svg>
  );
}

const illustrations = [
  <img key="card" src="/cases/crypto-card.jpg" alt="Crypto card" className="object-cover rounded-2xl w-full h-full" />,
  <RampIllustration key="ramp" />,
  <img key="wallet" src="/cases/wallet.jpg" alt="Custodial wallet" className="object-cover rounded-2xl w-full h-full" />,
];

/* ─── Scroll reveal hook ─────────────────────────────────────── */

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0, rootMargin: "0px 0px -80px 0px" }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

/* ─── Case Item ──────────────────────────────────────────────── */

function CaseItem({ index }: { index: number }) {
  const c = cases[index];
  const { ref, visible } = useScrollReveal();
  const [glitch, setGlitch] = useState(false);

  const handleTitleHover = () => {
    if (glitch) return;
    setGlitch(true);
    setTimeout(() => setGlitch(false), 500);
  };

  return (
    <div
      ref={ref}
      className={`border-t border-white/5 py-14 transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${index * 80}ms`, willChange: "transform" }}
    >
      {/* header */}
      <div className="flex items-start gap-6 mb-10">
        <span
          aria-hidden="true"
          className="font-bold tabular-nums leading-none shrink-0 text-white/[0.05]"
          style={{ fontSize: "clamp(44px, 7vw, 90px)", width: "1.5ch" }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="flex-1 min-w-0 pt-1">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span className={`text-xs font-mono px-2.5 py-0.5 rounded-full bg-gradient-to-r ${c.accentFrom} ${c.accentTo} text-white`}>
              {c.company}
            </span>
            <span className="text-[#2e3145] text-xs font-mono">{c.tag}</span>
          </div>
          <h3
            className={`font-bold text-white leading-tight mb-1.5 ${glitch ? "glitch-anim" : ""}`}
            style={{ fontSize: "clamp(20px, 3vw, 36px)" }}
            onMouseEnter={handleTitleHover}
          >
            {c.title}
          </h3>
          <p className="text-[#3a3d52] text-sm">{c.subtitle}</p>
        </div>
      </div>

      {/* metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10 pb-10 border-b border-white/5">
        {c.metrics.map((m) => (
          <div key={m.label}>
            <div
              className={`font-bold bg-gradient-to-r ${c.accentFrom} ${c.accentTo} bg-clip-text text-transparent`}
              style={{ fontSize: "clamp(22px, 3vw, 34px)" }}
            >
              {m.value}
            </div>
            <div className="text-[10px] text-[#2e3145] font-mono mt-1 uppercase tracking-wider">{m.label}</div>
          </div>
        ))}
      </div>

      {/* full-width photo above content (cases 0 & 2) */}
      {index !== 1 && (
        <div className="noise-img-wrap svg-glitch-wrap rounded-xl overflow-hidden mb-10" style={{ height: "280px" }}>
          {illustrations[index]}
        </div>
      )}

      {/* content + right-column SVG (case 1 keeps side layout) */}
      <div className={index === 1 ? "grid md:grid-cols-[1fr_260px] gap-10 items-start" : ""}>
        <div>
          <div className="grid sm:grid-cols-2 gap-7 mb-7">
            {([
              ["Problem", c.problem],
              ["Signal", c.signal],
              ["Solution", c.solution],
              ["Result", c.result],
            ] as [string, string][]).map(([label, body]) => (
              <div key={label}>
                <div className={`text-[10px] font-mono tracking-widest uppercase mb-2.5 bg-gradient-to-r ${c.accentFrom} ${c.accentTo} bg-clip-text text-transparent`}>
                  {label}
                </div>
                <p className="text-[#7a7e94] text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-xl border border-white/5 bg-white/[0.02]">
            <div className={`text-[10px] font-mono tracking-widest uppercase mb-2 bg-gradient-to-r ${c.accentFrom} ${c.accentTo} bg-clip-text text-transparent`}>
              Lesson
            </div>
            <p className="text-[#8b8fa8] text-sm leading-relaxed italic">&ldquo;{c.lesson}&rdquo;</p>
          </div>

          <Link
            href={`/cases/${c.slug}/`}
            className={`inline-flex items-center gap-2 mt-6 text-sm font-mono text-[#3a3d52] hover:text-white transition-colors group`}
          >
            <span>Read full case</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        {/* SVG illustration — fiat ramp side column */}
        {index === 1 && (
          <div className="hidden md:flex items-center justify-center rounded-2xl border border-white/5 bg-white/[0.02] p-5 aspect-square svg-glitch-wrap noise-img-wrap">
            {illustrations[index]}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Section ────────────────────────────────────────────────── */

export default function CaseStudies() {
  const { ref, visible } = useScrollReveal();

  return (
    <section id="case-studies" className="relative z-20 bg-[#0f0f0f] py-32 px-6 border-t border-white/5">
      <div className="max-w-4xl mx-auto">
        <div
          ref={ref}
          className={`transition-all duration-700 mb-4 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{ willChange: "transform" }}
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-px bg-indigo-500" />
            <span className="text-indigo-400 font-mono text-sm tracking-widest uppercase">Case Studies</span>
          </div>
          <h2 className="font-bold" style={{ fontSize: "clamp(28px, 4vw, 48px)" }}>
            Products shipped,{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
              lessons learned
            </span>
          </h2>
        </div>

        <div>
          {cases.map((_, i) => <CaseItem key={i} index={i} />)}
          <div className="border-t border-white/5" />
        </div>
      </div>
    </section>
  );
}
