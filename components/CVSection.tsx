"use client";

import { useEffect, useRef, useState } from "react";

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

const experience = [
  {
    company: "EMCD",
    role: "Head of Product",
    period: "Apr 2025 – Present",
    desc: "Scaled unit from 1 to 3 cross-functional teams, owning custodial wallet, crypto card, on/off-ramp, and payments infrastructure. Launched crypto card reaching 10,000+ users and $MM+ in deposit volume. Increased unit revenue 24% YoY. Expanded on/off-ramp with 64 new coins (+27% avg transaction value). Launched phone/email transfers generating 1,400 new active users/month. Increased LTV by 11%, 3-month retention +4%. Prepared company for MiCA/CASP/VASP licensing.",
  },
  {
    company: "SimpleSwap",
    role: "Head of Product",
    period: "Jan 2020 – Apr 2025",
    desc: "Led 4 PMs and 30+ direct/indirect reports across development, DevOps, marketing, analytics, and design. Company reached top 3 in Europe with 1M MAU in 2 years. Increased revenue 40% YoY via new API product with 50+ B2B partners. Achieved 270% annual revenue growth adding 1,200+ coins over 5 years. Increased LTV 50% via loyalty program. Launched 2 mobile apps (iOS/Android) reaching 85K MAU. Implemented KYC/KYT compliance in 3 months.",
  },
  {
    company: "OCTA",
    role: "Senior Product Manager",
    period: "Mar 2019 – Dec 2019",
    desc: "Launched mobile app MVP achieving 70K MAU in 6 months. Improved 30-day retention 12% via 5 UX experiments. Increased revenue 34% YoY via copy trading integration. Grew daily organic traffic 231% via ASO optimization.",
  },
  {
    company: "NoNameLab",
    role: "Product Manager",
    period: "Jun 2016 – Mar 2019",
    desc: "Joined CEO team. Achieved payback within 15 months on $700K investment. Launched website and mobile app in 6 months. Grew from 0 to 4,000 MAU in 9 months via paid acquisition.",
  },
];

const skillGroups = [
  {
    title: "Product",
    items: ["Strategy", "Vision", "Product Roadmap", "Go-to-Market", "SQL", "Data Analytics", "UX Research", "Unit Economics", "JTBD", "CustDev", "Amplitude", "Figma", "Jira", "Miro"],
  },
  {
    title: "Team & Process",
    items: ["Leadership", "OKR", "Scrum", "Kanban", "Agile", "Org Design", "Hiring", "AI Tools"],
  },
];

const certifications = [
  { name: "Certified Scrum Product Owner®", issuer: "Scrum Alliance",    year: "2025" },
  { name: "Oxford Fintech Programme",        issuer: "Oxford University", year: "2024" },
  { name: "SQL for Product Analytics",       issuer: "GoPractice",        year: "2024" },
  { name: "Product Management",              issuer: "ICAgile",           year: "2023" },
  { name: "Certified LeSS Basics",           issuer: "LeSS.works",        year: "2023" },
  { name: "Data-driven PM Simulator",        issuer: "GoPractice",        year: "2021" },
];

function SectionLabel({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <div className="w-8 h-px bg-indigo-500" />
      <span className="text-indigo-400 font-mono text-sm tracking-widest uppercase">{label}</span>
    </div>
  );
}

export default function CVSection() {
  const { ref, visible } = useScrollReveal();

  return (
    <section className="relative z-20 bg-[#0f0f0f] py-32 px-6 border-t border-white/5">
      <div
        ref={ref}
        className={`max-w-4xl mx-auto transition-all duration-700 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
        style={{ willChange: "transform" }}
      >

        {/* ── Experience ── */}
        <SectionLabel label="Experience" />
        <div className="mb-20">
          {experience.map((job, i) => (
            <div key={job.company} className="border-t border-white/8 py-10">
              <div className="flex items-start justify-between mb-2">
                <span className="font-mono text-sm text-white/35 uppercase tracking-widest">
                  {job.period}
                </span>
                <span className="font-mono text-sm text-white/10">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="font-mono text-[13px] text-white/40 uppercase tracking-widest mt-2">
                {job.company}
              </div>
              <h3
                className="font-bold text-white mt-1 mb-4 leading-tight"
                style={{ fontSize: "clamp(20px, 2.5vw, 28px)" }}
              >
                {job.role}
              </h3>
              <p className="text-white/55 leading-relaxed" style={{ fontSize: 15 }}>
                {job.desc}
              </p>
            </div>
          ))}
        </div>

        {/* ── Skills ── */}
        <div className="border-t border-white/5 pt-16 mb-20">
          <SectionLabel label="Skills" />
          <div className="grid sm:grid-cols-2 gap-10">
            {skillGroups.map((group) => (
              <div key={group.title}>
                <div className="font-mono text-xs uppercase text-white/30 tracking-widest mb-4">
                  {group.title}
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 rounded-full border border-white/10 text-white/55 text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Certifications ── */}
        <div className="border-t border-white/5 pt-16">
          <SectionLabel label="Certifications" />
          <div className="grid sm:grid-cols-2 gap-4">
            {certifications.map((cert) => (
              <div key={cert.name} className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                <div className="flex items-start justify-between gap-3 mb-1">
                  <span className="text-sm font-bold text-white leading-snug">{cert.name}</span>
                  <span className="text-xs text-indigo-400 font-mono shrink-0">{cert.year}</span>
                </div>
                <div className="text-xs text-white/35 font-mono">{cert.issuer}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
