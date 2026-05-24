import type { Metadata } from "next";
import Link from "next/link";
import PrintButton from "@/components/PrintButton";

export const metadata: Metadata = {
  title: "Resume — Kirill Grazhdan",
  description: "Head of Product / Product Owner — Fintech & Crypto. 9+ years.",
};

const experience = [
  {
    company: "EMCD",
    role: "Head of Product",
    period: "Apr 2025 — Present",
    location: "Remote",
    accentFrom: "from-indigo-500",
    accentTo: "to-violet-600",
    highlights: [
      "Launched crypto debit card end-to-end: 10,000+ active users, $MM+ transaction volume in 5 months",
      "Grew custodial wallet MAU from 30,000 to 42,000 (+40%), 400,000 total users, LTV +11%",
      "Built CRM cross-activation strategy across card, fiat ramp, and Coinhold earn product",
      "Ran referral program achieving LTV/CAC 2.8:1; rejected paid acquisition at $110+ CAC",
      "Managed 3–5 engineering teams and 4 products simultaneously",
    ],
  },
  {
    company: "SimpleSwap",
    role: "Head of Product / Product Manager",
    period: "Jan 2020 — Apr 2025 · 5 yrs 3 mo",
    location: "Remote",
    accentFrom: "from-emerald-500",
    accentTo: "to-teal-600",
    highlights: [
      "Built fiat on/off-ramp via Mercuryo integration: $4.2M+ monthly volume, ROI in 3 months",
      "Launched non-custodial browser extension wallet, reached 2,000 users, made deliberate decision to shut down based on data",
      "Scaled platform to 1M+ MAU, 300% revenue growth YoY at peak",
      "Hired 90+ people across 9 product teams over tenure",
      "Managed full product lifecycle across exchange, wallet, and fiat products",
    ],
  },
];

const skills = [
  { group: "Product", items: ["Product Strategy & Roadmapping", "Go-to-Market", "KPI & OKR Framework", "A/B Testing & Experimentation", "User Research"] },
  { group: "Growth", items: ["CRM Activation", "Referral Program Design", "LTV/CAC Modeling", "Funnel Optimization", "Cross-product Activation"] },
  { group: "Domain", items: ["Fintech Products", "Crypto & DeFi", "Fiat On/Off-Ramp", "KYC / Compliance Strategy", "Payments & Cards"] },
  { group: "Leadership", items: ["Team Building (90+ hires)", "9 Product Teams", "Executive Stakeholder Management", "AI-Assisted Development"] },
];

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-[#e8eaf0]">
      {/* nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between border-b border-white/5 bg-[#0a0a0f]/80 backdrop-blur-sm print:hidden">
        <Link
          href="/"
          className="text-white/30 hover:text-white/70 transition-colors font-mono text-sm"
        >
          ← Portfolio
        </Link>
        <PrintButton />
      </nav>

      <div className="pt-28 pb-20 px-6 max-w-3xl mx-auto">

        {/* header */}
        <div className="mb-14 pb-10 border-b border-white/5">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Kirill Grazhdan</h1>
          <p className="text-indigo-400 font-mono text-sm tracking-widest uppercase mb-5">
            Head of Product / Product Owner · Fintech & Crypto
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#5a5e72] font-mono">
            <span>Porto, Portugal</span>
            <a href="mailto:grazhdank@gmail.com" className="hover:text-indigo-400 transition-colors">grazhdank@gmail.com</a>
            <a href="https://linkedin.com/in/kirill-grazhdan" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition-colors">linkedin.com/in/kirill-grazhdan</a>
            <a href="https://t.me/CitizenKi" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition-colors">t.me/CitizenKi</a>
          </div>
        </div>

        {/* summary */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-6 h-px bg-indigo-500" />
            <h2 className="text-xs font-mono tracking-widest uppercase text-indigo-400">Summary</h2>
          </div>
          <p className="text-[#7a7e94] leading-relaxed">
            Head of Product with 9+ years in crypto and fintech, 5 years in executive roles. Built and shipped 5 MVPs,
            scaled products to 1M+ MAU, grew revenue up to 300% YoY, and hired 90+ people across 9 product teams.
            Experience spans crypto card programs, fiat on/off-ramp integrations, exchange products, custodial wallets,
            and earn products. Currently at EMCD. Based in Porto, Portugal. Builds with AI tools.
          </p>
        </section>

        {/* experience */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-6 h-px bg-indigo-500" />
            <h2 className="text-xs font-mono tracking-widest uppercase text-indigo-400">Experience</h2>
          </div>

          <div className="space-y-12">
            {experience.map((job) => (
              <div key={job.company}>
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className={`text-xs font-mono px-2 py-0.5 rounded-full bg-gradient-to-r ${job.accentFrom} ${job.accentTo} text-white`}>
                        {job.company}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-white">{job.role}</h3>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-sm text-[#4a4e62] font-mono">{job.period}</div>
                    <div className="text-xs text-[#2e3145] font-mono">{job.location}</div>
                  </div>
                </div>
                <ul className="space-y-2.5">
                  {job.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-[#7a7e94] leading-relaxed">
                      <span className={`mt-1.5 w-1 h-1 rounded-full bg-gradient-to-r ${job.accentFrom} ${job.accentTo} shrink-0`} />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* key metrics */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-6 h-px bg-indigo-500" />
            <h2 className="text-xs font-mono tracking-widest uppercase text-indigo-400">Key Metrics</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: "1M+", label: "MAU scaled" },
              { value: "300%", label: "Revenue growth YoY" },
              { value: "$4.2M+", label: "Monthly fiat volume" },
              { value: "90+", label: "People hired" },
              { value: "5", label: "MVPs launched" },
              { value: "9", label: "Product teams" },
              { value: "10K+", label: "Card users" },
              { value: "3mo", label: "Fiat ramp ROI" },
            ].map((m) => (
              <div key={m.label} className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                <div className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                  {m.value}
                </div>
                <div className="text-[10px] text-[#3a3d52] font-mono mt-1 uppercase tracking-wider">{m.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* skills */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-6 h-px bg-indigo-500" />
            <h2 className="text-xs font-mono tracking-widest uppercase text-indigo-400">Skills</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {skills.map((group) => (
              <div key={group.group}>
                <div className="text-[10px] font-mono text-[#3a3d52] tracking-widest uppercase mb-2.5">{group.group}</div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span key={item} className="text-xs px-2.5 py-1 rounded-full border border-white/5 bg-white/[0.02] text-[#7a7e94]">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* contact footer */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="text-xs text-[#2e3145] font-mono">
            Portfolio: <a href="https://kirill-grazhdan-portfolio.netlify.app" className="text-indigo-400/60 hover:text-indigo-400 transition-colors">kirill-grazhdan-portfolio.netlify.app</a>
          </div>
          <div className="flex items-center gap-2 text-xs text-indigo-400/40 font-mono">
            <span>✦</span>
            <span>Built with Claude Code</span>
          </div>
        </div>
      </div>

      <style>{`
        @media print {
          body { background: white !important; color: #111 !important; }
          .print\\:hidden { display: none !important; }
        }
      `}</style>
    </div>
  );
}
