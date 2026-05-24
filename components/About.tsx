"use client";

import { useEffect, useRef, useState } from "react";

interface StatItem {
  end: number;
  decimals: number;
  prefix: string;
  suffix: string;
  label: string;
}

const stats: StatItem[] = [
  { end: 1, decimals: 0, prefix: "", suffix: "M+", label: "MAU scaled" },
  { end: 300, decimals: 0, prefix: "", suffix: "%", label: "Revenue growth YoY" },
  { end: 4.2, decimals: 1, prefix: "$", suffix: "M+", label: "Monthly fiat ramp volume" },
  { end: 90, decimals: 0, prefix: "", suffix: "+", label: "People hired" },
];

function CountUp({ end, decimals, prefix, suffix }: Omit<StatItem, "label">) {
  const [val, setVal] = useState(0);
  const [started, setStarted] = useState(false);
  const spanRef = useRef<HTMLSpanElement>(null);
  const reducedRef = useRef(false);

  useEffect(() => {
    reducedRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setStarted(true); },
      { threshold: 0.5 }
    );
    if (spanRef.current) obs.observe(spanRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    if (reducedRef.current) { setVal(end); return; }
    const duration = 1600;
    const t0 = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      const cur = eased * end;
      setVal(decimals > 0 ? Math.round(cur * 10) / 10 : Math.round(cur));
      if (t < 1) requestAnimationFrame(tick);
      else setVal(end);
    };
    requestAnimationFrame(tick);
  }, [started, end, decimals]);

  const display = decimals > 0 ? val.toFixed(decimals) : String(val);

  return (
    <span ref={spanRef}>
      {prefix}{display}{suffix}
    </span>
  );
}

function useScrollReveal(threshold = 0.2) {
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

export default function About() {
  const { ref, visible } = useScrollReveal(0.15);

  return (
    <section
      id="about"
      className="relative z-20 bg-[#0a0a0f] py-32 px-6 rounded-t-[24px]"
      style={{ boxShadow: "0 -12px 60px rgba(0,0,0,0.85)" }}
    >
      <div
        ref={ref}
        className={`max-w-4xl mx-auto transition-all duration-700 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="flex items-center gap-3 mb-16">
          <div className="w-8 h-px bg-indigo-500" />
          <span className="text-indigo-400 font-mono text-sm tracking-widest uppercase">About</span>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <h2
              className="font-bold leading-tight mb-0"
              style={{ fontSize: "clamp(32px, 4vw, 52px)" }}
            >
              Building products{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                people actually use
              </span>
            </h2>
          </div>

          <div className="space-y-5 text-[#7a7e94] leading-relaxed" style={{ fontSize: "clamp(14px, 1.3vw, 16px)" }}>
            <p>
              I&apos;m a Head of Product with 9+ years in crypto and fintech, 5 years in executive
              roles. I&apos;ve launched 5 MVPs, scaled products to 1M+ MAU, grown revenue up to 300%
              YoY, hired 90+ people across 9 product teams, and managed 3–5 engineering teams and 4
              products simultaneously across both companies.
            </p>
            <p>
              At{" "}
              <span className="text-indigo-300 font-medium">EMCD</span> I launched a crypto card
              end-to-end — 10,000+ active users, $MM+ in transaction volume. At{" "}
              <span className="text-indigo-300 font-medium">SimpleSwap</span> I built a fiat
              on/off-ramp that reached $4.2M+ monthly volume. I&apos;ve also shut down a product when
              the signal was clear — and that taught me as much as the wins.
            </p>
            <p>
              I build with data, move fast on validated bets, and say no to the rest. These days
              I use AI tools to ship faster — including{" "}
              <span className="text-indigo-300 font-medium">Claude Code</span> to build this site.
            </p>
          </div>
        </div>

        {/* stat list — large numbers left, label right */}
        <div className="mt-20 border-t border-white/5 divide-y divide-white/5">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="flex items-baseline justify-between py-5 gap-8"
              style={{
                animation: visible ? `fadeUp 0.5s ease-out both` : undefined,
                animationDelay: visible ? `${200 + i * 80}ms` : undefined,
              }}
            >
              <span
                className="font-bold tabular-nums bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent shrink-0"
                style={{ fontSize: "clamp(28px, 4vw, 48px)" }}
              >
                <CountUp end={s.end} decimals={s.decimals} prefix={s.prefix} suffix={s.suffix} />
              </span>
              <span className="text-[#4a4e62] font-mono text-sm text-right">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
