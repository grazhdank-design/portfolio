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
}

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
      "Mining users accumulated crypto but had no way to spend it in real life. This created tens of millions in monthly fiat outflow leaving the platform — users had to cash out externally.",
    signal:
      "A simple 'coming soon' landing page generated 4,000 signups from existing users and 1,700 from new users — strong demand signal before writing a line of product code.",
    solution:
      "Implemented full KYC flow. Rejected paid acquisition channels (CAC was $110+). Focused on CRM-driven activation (21% activation rate) and a referral program with 2.8:1 LTV/CAC ratio.",
    result:
      "10,000+ active users within 5 months, $MM+ in transaction volume, 60% payback period. Built a durable growth engine without burning budget on paid channels.",
    lesson:
      "Outsourcing compliance means outsourcing control over your activation funnel. The partner's KYC flow directly determined our conversion rate — something we learned the hard way.",
    accentFrom: "from-indigo-500",
    accentTo: "to-violet-600",
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
      "SimpleSwap ran on a single revenue stream while all top competitors offered fiat on/off-ramp. Without fiat access, we were losing users at the top of the funnel.",
    signal:
      "34% of users were already using external P2P services discovered from our platform — they wanted fiat access and were finding it elsewhere.",
    solution:
      "Instead of building own infrastructure (months of licensing, compliance, banking), integrated Mercuryo as a white-label widget. No KYC, no licenses, launched in weeks.",
    result:
      "$4.2M+ monthly volume reached. ROI achieved in 3 months. Proved the market fit before considering whether to build in-house.",
    lesson:
      "Speed of validation beats control over UX at early stage. We could always own the experience later — but we needed to know if users would convert first.",
    accentFrom: "from-emerald-500",
    accentTo: "to-teal-600",
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
      "Active base was growing but slower than potential — users held crypto in the wallet without converting to monetized products. Churn left without revenue conversion.",
    signal:
      "1,400 new active users/month were coming through phone and email transfers — an organic acquisition channel we weren't fully leveraging.",
    solution:
      "Cross-activation strategy via CRM — redirected wallet users into card, on/off-ramp, and Coinhold earn product. Launched referral program with $ payout per new user activation. Expanded ramp with new coins and pairs. Took ownership of ecosystem liquidity.",
    result:
      "MAU grew from 30K to 42K (+40%), 400K total users in one year, LTV +11%, 3-month retention +4%, 1,400 new active users/month via phone and email transfers.",
    lesson:
      "Retention without monetization is just cost. Cross-product activation via CRM outperformed any paid channel we tested.",
    accentFrom: "from-orange-500",
    accentTo: "to-rose-600",
  },
];

function useScrollReveal(threshold = 0.1) {
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

function CaseCard({ c, index }: { c: Case; index: number }) {
  const [open, setOpen] = useState(false);
  const { ref, visible } = useScrollReveal(0.08);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div
        className={`rounded-2xl border transition-all duration-300 overflow-hidden hover:scale-[1.015] ${
          open
            ? "border-indigo-500/30 bg-white/[0.04]"
            : "border-white/5 bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.03]"
        }`}
        style={{ transformOrigin: "center" }}
      >
        <button
          onClick={() => setOpen(!open)}
          className="w-full text-left p-7 md:p-10"
        >
          <div className="flex items-start justify-between gap-4 mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <span
                  className={`text-xs font-mono px-2.5 py-0.5 rounded-full bg-gradient-to-r ${c.accentFrom} ${c.accentTo} text-white`}
                >
                  {c.company}
                </span>
                <span className="text-xs text-[#2e3145] font-mono">{c.tag}</span>
              </div>
              <h3
                className="font-bold text-white leading-tight mb-2"
                style={{ fontSize: "clamp(20px, 2.5vw, 30px)" }}
              >
                {c.title}
              </h3>
              <p className="text-[#4a4e62] text-sm">{c.subtitle}</p>
            </div>
            <div
              className={`w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-[#4a4e62] shrink-0 transition-all duration-300 ${
                open ? "rotate-45 border-indigo-500/40 text-indigo-400" : ""
              }`}
            >
              +
            </div>
          </div>

          {/* metrics — subtle */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {c.metrics.map((m) => (
              <div key={m.label} className="py-3 border-t border-white/5">
                <div
                  className={`text-lg font-semibold bg-gradient-to-r ${c.accentFrom} ${c.accentTo} bg-clip-text text-transparent`}
                >
                  {m.value}
                </div>
                <div className="text-[10px] text-[#3a3d52] font-mono mt-0.5 uppercase tracking-wider">{m.label}</div>
              </div>
            ))}
          </div>
        </button>

        {open && (
          <div className="px-7 md:px-10 pb-10 border-t border-white/5">
            <div className="pt-8 grid md:grid-cols-2 gap-8">
              {[
                { label: "Problem", body: c.problem },
                { label: "Signal", body: c.signal },
                { label: "Solution", body: c.solution },
                { label: "Result", body: c.result },
              ].map((block) => (
                <div key={block.label}>
                  <div
                    className={`text-[10px] font-mono tracking-widest uppercase mb-3 bg-gradient-to-r ${c.accentFrom} ${c.accentTo} bg-clip-text text-transparent`}
                  >
                    {block.label}
                  </div>
                  <p className="text-[#7a7e94] text-sm leading-relaxed">{block.body}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 p-5 rounded-xl border border-white/5 bg-white/[0.02]">
              <div
                className={`text-[10px] font-mono tracking-widest uppercase mb-3 bg-gradient-to-r ${c.accentFrom} ${c.accentTo} bg-clip-text text-transparent`}
              >
                Lesson
              </div>
              <p className="text-[#8b8fa8] text-sm leading-relaxed italic">&ldquo;{c.lesson}&rdquo;</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function CaseStudies() {
  const { ref, visible } = useScrollReveal(0.1);

  return (
    <section id="case-studies" className="py-32 px-6 border-t border-white/5">
      <div className="max-w-4xl mx-auto">
        <div
          ref={ref}
          className={`transition-all duration-700 mb-16 ${
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
            className="font-bold mb-4"
            style={{ fontSize: "clamp(28px, 4vw, 48px)" }}
          >
            Products shipped,{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
              lessons learned
            </span>
          </h2>
          <p className="text-[#3a3d52] text-sm font-mono">
            Click any card to expand the full case.
          </p>
        </div>

        <div className="space-y-5">
          {cases.map((c, i) => (
            <CaseCard key={c.id} c={c} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
