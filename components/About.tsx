"use client";

import { useEffect, useRef, useState } from "react";

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="about" className="py-24 px-6">
      <div
        ref={ref}
        className={`max-w-4xl mx-auto transition-all duration-700 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="flex items-center gap-3 mb-12">
          <div className="w-8 h-px bg-indigo-500" />
          <span className="text-indigo-400 font-mono text-sm tracking-widest uppercase">About</span>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Building products{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                people actually use
              </span>
            </h2>
          </div>

          <div className="space-y-4 text-[#8b8fa8] leading-relaxed text-base">
            <p>
              I&apos;m a Head of Product with 9+ years in crypto and fintech, 5 years in executive
              roles. I&apos;ve launched 5 MVPs, scaled products to 1M+ MAU, grown revenue up to 300%
              YoY, and hired 90+ people across 9 product teams.
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

        {/* stat strip */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: "1M+", label: "MAU scaled" },
            { value: "300%", label: "Revenue growth YoY" },
            { value: "$4.2M+", label: "Monthly fiat ramp volume" },
            { value: "90+", label: "People hired" },
          ].map((s) => (
            <div
              key={s.label}
              className="p-4 rounded-xl border border-white/5 bg-white/[0.02] text-center"
            >
              <div className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                {s.value}
              </div>
              <div className="text-xs text-[#5a5e72] mt-1 font-mono">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
