"use client";

import { useState, useEffect, useRef } from "react";

interface Case {
  id: number;
  company: string;
  title: string;
  subtitle: string;
  tag: string;
  metrics: { value: string; label: string }[];
  problem: string;
  signal: string;
  solution: string;
  result: string;
  lesson: string;
  accentFrom: string;
  accentTo: string;
  illustration: React.ReactNode;
}

/* ─── SVG Illustrations ─────────────────────────────────────── */

function CardIllustration() {
  return (
    <svg viewBox="0 0 200 140" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="cg1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
      </defs>
      <ellipse cx="100" cy="70" rx="88" ry="52" fill="rgba(99,102,241,0.07)" />
      {/* card body */}
      <rect x="15" y="22" width="170" height="100" rx="11" fill="url(#cg1)" opacity="0.88" />
      {/* shine strip */}
      <rect x="15" y="22" width="170" height="38" rx="11" fill="rgba(255,255,255,0.06)" />
      <rect x="15" y="50" width="170" height="10" fill="rgba(255,255,255,0.06)" />
      {/* chip */}
      <rect x="28" y="50" width="28" height="20" rx="3" fill="#f59e0b" opacity="0.82" />
      <line x1="28" y1="57" x2="56" y2="57" stroke="#92400e" strokeWidth="0.6" opacity="0.55" />
      <line x1="28" y1="63" x2="56" y2="63" stroke="#92400e" strokeWidth="0.6" opacity="0.55" />
      <line x1="38" y1="50" x2="38" y2="70" stroke="#92400e" strokeWidth="0.6" opacity="0.55" />
      <line x1="46" y1="50" x2="46" y2="70" stroke="#92400e" strokeWidth="0.6" opacity="0.55" />
      {/* contactless */}
      <path d="M66 54 Q72 60 66 66" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M70 50 Q79 60 70 70" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* number */}
      <text x="28" y="100" fill="rgba(255,255,255,0.38)" fontSize="7" fontFamily="monospace" letterSpacing="2.5">•••• •••• •••• 2024</text>
      {/* crypto badge */}
      <circle cx="165" cy="40" r="11" fill="rgba(255,255,255,0.07)" />
      <text x="160" y="44" fill="rgba(255,255,255,0.55)" fontSize="10" fontFamily="monospace">₿</text>
      {/* border */}
      <rect x="15" y="22" width="170" height="100" rx="11" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
    </svg>
  );
}

function RampIllustration() {
  return (
    <svg viewBox="0 0 200 140" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="rg1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#0d9488" />
        </linearGradient>
      </defs>
      <ellipse cx="100" cy="70" rx="88" ry="48" fill="rgba(16,185,129,0.05)" />
      {/* crypto coin */}
      <circle cx="42" cy="70" r="29" fill="rgba(16,185,129,0.08)" stroke="rgba(16,185,129,0.25)" strokeWidth="1" />
      <circle cx="42" cy="70" r="19" fill="rgba(16,185,129,0.12)" stroke="rgba(16,185,129,0.35)" strokeWidth="1" />
      <text x="35" y="75" fill="rgba(16,185,129,0.85)" fontSize="14" fontFamily="monospace" fontWeight="bold">₿</text>
      {/* fiat block */}
      <rect x="128" y="43" width="56" height="56" rx="8" fill="rgba(16,185,129,0.08)" stroke="rgba(16,185,129,0.25)" strokeWidth="1" />
      <line x1="138" y1="60" x2="174" y2="60" stroke="rgba(16,185,129,0.18)" strokeWidth="1" />
      <line x1="138" y1="71" x2="174" y2="71" stroke="rgba(16,185,129,0.18)" strokeWidth="1" />
      <line x1="138" y1="82" x2="164" y2="82" stroke="rgba(16,185,129,0.18)" strokeWidth="1" />
      <text x="149" y="76" fill="rgba(16,185,129,0.85)" fontSize="16" fontFamily="monospace" fontWeight="bold">$</text>
      {/* double arrows */}
      <line x1="80" y1="62" x2="118" y2="62" stroke="url(#rg1)" strokeWidth="1.5" strokeLinecap="round" />
      <polyline points="112,57 118,62 112,67" fill="none" stroke="url(#rg1)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="80" y1="78" x2="118" y2="78" stroke="url(#rg1)" strokeWidth="1.5" strokeLinecap="round" />
      <polyline points="86,73 80,78 86,83" fill="none" stroke="url(#rg1)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function WalletIllustration() {
  const pts: [number, number][] = [[22, 108], [50, 96], [75, 88], [98, 78], [120, 65], [148, 50]];
  return (
    <svg viewBox="0 0 200 140" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="wg1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#e11d48" />
        </linearGradient>
        <clipPath id="wc">
          <rect x="12" y="33" width="150" height="90" rx="10" />
        </clipPath>
      </defs>
      <ellipse cx="95" cy="75" rx="88" ry="50" fill="rgba(249,115,22,0.05)" />
      {/* wallet body */}
      <rect x="12" y="33" width="150" height="90" rx="10" fill="rgba(249,115,22,0.08)" stroke="rgba(249,115,22,0.22)" strokeWidth="1" />
      {/* flap */}
      <rect x="12" y="33" width="150" height="28" rx="10" fill="rgba(249,115,22,0.13)" stroke="rgba(249,115,22,0.22)" strokeWidth="1" />
      <rect x="12" y="51" width="150" height="10" fill="rgba(249,115,22,0.13)" />
      {/* chart inside */}
      <g clipPath="url(#wc)">
        <path
          d={`M${pts.map(([x, y]) => `${x},${y}`).join(" L")} L${pts[pts.length - 1][0]},123 L${pts[0][0]},123 Z`}
          fill="url(#wg1)"
          opacity="0.07"
        />
        <polyline
          points={pts.map(([x, y]) => `${x},${y}`).join(" ")}
          fill="none"
          stroke="url(#wg1)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.85"
        />
        {pts.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="2.5" fill="url(#wg1)" opacity="0.9" />
        ))}
      </g>
      {/* coin pocket */}
      <circle cx="180" cy="75" r="15" fill="rgba(249,115,22,0.1)" stroke="rgba(249,115,22,0.28)" strokeWidth="1" />
      <text x="173" y="80" fill="rgba(249,115,22,0.7)" fontSize="12" fontFamily="monospace">◈</text>
      {/* +40% badge */}
      <text x="118" y="50" fill="rgba(249,115,22,0.65)" fontSize="9" fontFamily="monospace" fontWeight="bold">+40%</text>
    </svg>
  );
}

/* ─── Data ───────────────────────────────────────────────────── */

const cases: Case[] = [
  {
    id: 1,
    company: "EMCD",
    title: "Crypto Card Launch",
    subtitle: "From mining rewards to real-world spending",
    tag: "Payments · KYC · Growth",
    metrics: [
      { value: "10K+", label: "Active users" },
      { value: "$MM+", label: "Transaction volume" },
      { value: "5mo", label: "To reach scale" },
      { value: "60%", label: "Payback period" },
    ],
    problem:
      "Mining users accumulated crypto but had no way to spend it in real life. This created tens of millions in monthly fiat outflow leaving the platform.",
    signal:
      "A 'coming soon' landing generated 4,000 signups from existing users and 1,700 new users — strong demand signal before writing a line of product code.",
    solution:
      "Full KYC flow. Rejected paid channels (CAC $110+). Focused on CRM-driven activation (21% rate) and referral program (LTV/CAC 2.8:1).",
    result:
      "10,000+ active users in 5 months, $MM+ in transaction volume, 60% payback period. Built a durable growth engine without paid budget.",
    lesson:
      "Outsourcing compliance means outsourcing control over your activation funnel. The partner's KYC flow directly determined our conversion rate.",
    accentFrom: "from-indigo-500",
    accentTo: "to-violet-600",
    illustration: <CardIllustration />,
  },
  {
    id: 2,
    company: "SimpleSwap",
    title: "Fiat On/Off-Ramp",
    subtitle: "Revenue diversification via third-party widget",
    tag: "Fiat · Integration · Speed",
    metrics: [
      { value: "$4.2M+", label: "Monthly volume" },
      { value: "3mo", label: "ROI achieved" },
      { value: "34%", label: "Users using P2P already" },
      { value: "0", label: "KYC licenses needed" },
    ],
    problem:
      "Single revenue stream while all top competitors offered fiat on/off-ramp. Without fiat access, we were losing users at the top of the funnel.",
    signal:
      "34% of users were already using external P2P services discovered from our platform — they wanted fiat and were finding it elsewhere.",
    solution:
      "Integrated Mercuryo as a white-label widget instead of building own infrastructure. No KYC, no licenses, launched in weeks.",
    result:
      "$4.2M+ monthly volume. ROI achieved in 3 months. Proved market fit before deciding whether to build in-house.",
    lesson:
      "Speed of validation beats control over UX at early stage. We could always own the experience later — first we needed proof of conversion.",
    accentFrom: "from-emerald-500",
    accentTo: "to-teal-600",
    illustration: <RampIllustration />,
  },
  {
    id: 3,
    company: "EMCD",
    title: "Custodial Wallet Growth",
    subtitle: "Cross-activation and retention at scale",
    tag: "Retention · Cross-activation · Growth",
    metrics: [
      { value: "42K", label: "MAU (from 30K)" },
      { value: "400K", label: "Total users" },
      { value: "+11%", label: "LTV growth" },
      { value: "+40%", label: "MAU growth" },
    ],
    problem:
      "Active base growing but slower than potential — users held crypto in wallet without converting to monetized products. Churn left without revenue conversion.",
    signal:
      "1,400 new active users/month via phone and email transfers — an organic channel we weren't fully leveraging.",
    solution:
      "CRM cross-activation into card, on/off-ramp, and Coinhold earn product. Referral program with $ payout per activation. Expanded ramp with new coins and pairs.",
    result:
      "MAU 30K→42K (+40%), 400K total users, LTV +11%, 3-month retention +4%, 1,400 new active users/month.",
    lesson:
      "Retention without monetization is just cost. Cross-product CRM activation outperformed every paid channel we tested.",
    accentFrom: "from-orange-500",
    accentTo: "to-rose-600",
    illustration: <WalletIllustration />,
  },
];

/* ─── useScrollReveal ────────────────────────────────────────── */

function useScrollReveal(threshold = 0.05) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ─── CaseRow ────────────────────────────────────────────────── */

function CaseRow({ c, index }: { c: Case; index: number }) {
  const [open, setOpen] = useState(false);
  const [glitch, setGlitch] = useState(false);
  const { ref, visible } = useScrollReveal(0.05);

  const handleTitleHover = () => {
    if (glitch) return;
    setGlitch(true);
    setTimeout(() => setGlitch(false), 500);
  };

  return (
    <div
      ref={ref}
      className={`border-t border-white/5 transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* ── Row header ── */}
      <button
        onClick={() => setOpen(!open)}
        className="group w-full flex items-center gap-5 py-8 text-left hover:bg-white/[0.015] transition-colors duration-200 px-1"
      >
        {/* number */}
        <span
          className="font-bold tabular-nums leading-none shrink-0 text-white/[0.05] group-hover:text-white/[0.09] transition-colors duration-300"
          style={{ fontSize: "clamp(36px, 6.5vw, 84px)", width: "1.5ch" }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* title + tag */}
        <div className="flex-1 min-w-0">
          <h3
            className={`font-bold text-white leading-tight ${glitch ? "glitch-anim" : ""}`}
            style={{ fontSize: "clamp(17px, 2.4vw, 30px)" }}
            onMouseEnter={handleTitleHover}
          >
            {c.title}
          </h3>
          <p className="text-[#2e3145] text-xs font-mono mt-1 hidden sm:block">{c.tag}</p>
        </div>

        {/* company + toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <span
            className={`hidden sm:inline text-xs font-mono px-2.5 py-0.5 rounded-full bg-gradient-to-r ${c.accentFrom} ${c.accentTo} text-white`}
          >
            {c.company}
          </span>
          <div
            className={`w-8 h-8 rounded-full border flex items-center justify-center text-sm transition-all duration-300 ${
              open
                ? "rotate-45 border-indigo-500/40 text-indigo-400"
                : "border-white/10 text-[#3a3d52]"
            }`}
          >
            +
          </div>
        </div>
      </button>

      {/* ── Expanded panel ── */}
      {open && (
        <div className="pb-14 px-1 animate-[fadeUp_0.35s_ease-out_both]">
          {/* metrics row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10 pb-8 border-b border-white/5">
            {c.metrics.map((m) => (
              <div key={m.label}>
                <div
                  className={`font-bold bg-gradient-to-r ${c.accentFrom} ${c.accentTo} bg-clip-text text-transparent`}
                  style={{ fontSize: "clamp(22px, 3vw, 32px)" }}
                >
                  {m.value}
                </div>
                <div className="text-[10px] text-[#2e3145] font-mono mt-1 uppercase tracking-wider">
                  {m.label}
                </div>
              </div>
            ))}
          </div>

          {/* content + illustration */}
          <div className="grid md:grid-cols-[1fr_220px] gap-10 items-start">
            {/* text blocks */}
            <div>
              <div className="grid sm:grid-cols-2 gap-7">
                {[
                  { label: "Problem", body: c.problem },
                  { label: "Signal", body: c.signal },
                  { label: "Solution", body: c.solution },
                  { label: "Result", body: c.result },
                ].map((block) => (
                  <div key={block.label}>
                    <div
                      className={`text-[10px] font-mono tracking-widest uppercase mb-2.5 bg-gradient-to-r ${c.accentFrom} ${c.accentTo} bg-clip-text text-transparent`}
                    >
                      {block.label}
                    </div>
                    <p className="text-[#7a7e94] text-sm leading-relaxed">{block.body}</p>
                  </div>
                ))}
              </div>

              {/* lesson */}
              <div className="mt-7 p-5 rounded-xl border border-white/5 bg-white/[0.02]">
                <div
                  className={`text-[10px] font-mono tracking-widest uppercase mb-2 bg-gradient-to-r ${c.accentFrom} ${c.accentTo} bg-clip-text text-transparent`}
                >
                  Lesson
                </div>
                <p className="text-[#8b8fa8] text-sm leading-relaxed italic">
                  &ldquo;{c.lesson}&rdquo;
                </p>
              </div>
            </div>

            {/* SVG illustration */}
            <div className="hidden md:flex items-center justify-center rounded-2xl border border-white/5 bg-white/[0.02] p-5 aspect-square animate-[fadeUp_0.5s_ease-out_0.1s_both]">
              {c.illustration}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Section ────────────────────────────────────────────────── */

export default function CaseStudies() {
  const { ref, visible } = useScrollReveal(0.08);

  return (
    <section id="case-studies" className="py-32 px-6 border-t border-white/5">
      <div className="max-w-4xl mx-auto">
        {/* heading */}
        <div
          ref={ref}
          className={`transition-all duration-700 mb-6 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-px bg-indigo-500" />
            <span className="text-indigo-400 font-mono text-sm tracking-widest uppercase">
              Case Studies
            </span>
          </div>
          <h2
            className="font-bold mb-3"
            style={{ fontSize: "clamp(28px, 4vw, 48px)" }}
          >
            Products shipped,{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
              lessons learned
            </span>
          </h2>
          <p className="text-[#2e3145] text-xs font-mono tracking-wider">
            Click any row to expand the full case.
          </p>
        </div>

        {/* rows */}
        <div>
          {cases.map((c, i) => (
            <CaseRow key={c.id} c={c} index={i} />
          ))}
          {/* bottom border */}
          <div className="border-t border-white/5" />
        </div>
      </div>
    </section>
  );
}
