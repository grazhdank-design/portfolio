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
      { value: "$11M+", label: "Transaction volume" },
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
      "10,000+ active users within 5 months, $11M+ in transaction volume, 60% payback period. Built a durable growth engine without burning budget on paid channels.",
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
      { value: "$1.2M", label: "Monthly volume" },
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
      "$1.2M monthly volume reached in 3 months. ROI achieved in 3 months. Proved the market fit before considering whether to build in-house.",
    lesson:
      "Speed of validation beats control over UX at early stage. We could always own the experience later — but we needed to know if users would convert first.",
    accentFrom: "from-emerald-500",
    accentTo: "to-teal-600",
  },
  {
    id: 3,
    company: "SimpleSwap",
    title: "Non-Custodial Wallet Extension",
    subtitle: "A deliberate shutdown — and what it taught me",
    tag: "Wallet · Retention · Decision",
    metrics: [
      { value: "2K", label: "Users in 6 months" },
      { value: "↓", label: "Retention vs core" },
      { value: "0", label: "Network effect" },
      { value: "1", label: "Right call: shut down" },
    ],
    problem:
      "Goal: attract new audience segments and monetize via in-wallet exchange. Built a browser extension wallet targeting crypto-curious users.",
    signal:
      "2,000 users over 6 months — but mostly existing SimpleSwap users, not new audience. Retention was worse than the core product.",
    solution:
      "Ran the experiment fully, measured against hypotheses, then made the decision to shut it down deliberately rather than continuing to invest in a losing bet.",
    result:
      "Shut down. No users lost (they already had better alternatives). Team resources redirected to higher-leverage projects.",
    lesson:
      "Without hardware differentiation or a network effect, a software wallet means competing with MetaMask on their home turf. Recognizing a failed experiment quickly — and killing it cleanly — is itself a product skill.",
    accentFrom: "from-orange-500",
    accentTo: "to-rose-600",
  },
];

function CaseCard({ c, index }: { c: Case; index: number }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      <div
        className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
          open
            ? "border-indigo-500/40 bg-white/[0.04]"
            : "border-white/5 bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.03]"
        }`}
      >
        {/* card header — always visible */}
        <button
          onClick={() => setOpen(!open)}
          className="w-full text-left p-6 md:p-8"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <span
                  className={`text-xs font-mono px-2 py-0.5 rounded-full bg-gradient-to-r ${c.accentFrom} ${c.accentTo} text-white`}
                >
                  {c.company}
                </span>
                <span className="text-xs text-[#3a3d52] font-mono">{c.tag}</span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-1">{c.title}</h3>
              <p className="text-[#5a5e72] text-sm">{c.subtitle}</p>
            </div>
            <div
              className={`w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-[#5a5e72] shrink-0 transition-transform duration-300 ${
                open ? "rotate-45" : ""
              }`}
            >
              +
            </div>
          </div>

          {/* metrics always visible */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
            {c.metrics.map((m) => (
              <div key={m.label} className="p-3 rounded-lg bg-white/[0.03] border border-white/5">
                <div
                  className={`text-xl font-bold bg-gradient-to-r ${c.accentFrom} ${c.accentTo} bg-clip-text text-transparent`}
                >
                  {m.value}
                </div>
                <div className="text-xs text-[#5a5e72] font-mono mt-0.5">{m.label}</div>
              </div>
            ))}
          </div>
        </button>

        {/* expanded content */}
        {open && (
          <div className="px-6 md:px-8 pb-8 border-t border-white/5">
            <div className="pt-6 grid md:grid-cols-2 gap-6">
              {[
                { label: "Problem", body: c.problem },
                { label: "Signal", body: c.signal },
                { label: "Solution", body: c.solution },
                { label: "Result", body: c.result },
              ].map((block) => (
                <div key={block.label}>
                  <div
                    className={`text-xs font-mono tracking-widest uppercase mb-2 bg-gradient-to-r ${c.accentFrom} ${c.accentTo} bg-clip-text text-transparent`}
                  >
                    {block.label}
                  </div>
                  <p className="text-[#8b8fa8] text-sm leading-relaxed">{block.body}</p>
                </div>
              ))}
            </div>

            {/* lesson */}
            <div className="mt-6 p-4 rounded-xl border border-white/5 bg-white/[0.02]">
              <div
                className={`text-xs font-mono tracking-widest uppercase mb-2 bg-gradient-to-r ${c.accentFrom} ${c.accentTo} bg-clip-text text-transparent`}
              >
                Lesson
              </div>
              <p className="text-[#a0a4b8] text-sm leading-relaxed italic">&ldquo;{c.lesson}&rdquo;</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function CaseStudies() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="case-studies" className="py-24 px-6 border-t border-white/5">
      <div className="max-w-4xl mx-auto">
        <div
          ref={ref}
          className={`transition-all duration-700 mb-12 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-indigo-500" />
            <span className="text-indigo-400 font-mono text-sm tracking-widest uppercase">
              Case Studies
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Products shipped,{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
              lessons learned
            </span>
          </h2>
          <p className="text-[#5a5e72] text-sm font-mono">
            Click any card to expand the full case.
          </p>
        </div>

        <div className="space-y-4">
          {cases.map((c, i) => (
            <CaseCard key={c.id} c={c} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
