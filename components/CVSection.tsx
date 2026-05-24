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
    desc: "Scaled unit from 1 to 3 cross-functional teams. Launched crypto card (10K users), on/off-ramp ($4.2M+ monthly), phone/email transfers (1,400 new users/month). Full P&L ownership.",
    accent: "from-indigo-500 to-violet-600",
  },
  {
    company: "SimpleSwap",
    role: "Head of Product",
    period: "Jan 2020 – Apr 2025",
    desc: "Led 4 PMs, 30+ reports. Company reached top 3 in Europe, 1M MAU. 270% revenue growth, launched loyalty program, mobile apps, KYC/KYT compliance.",
    accent: "from-emerald-500 to-teal-600",
  },
  {
    company: "OCTA",
    role: "Senior PM",
    period: "Mar 2019 – Dec 2019",
    desc: "Launched mobile app MVP, 70K MAU in 6 months.",
    accent: "from-orange-500 to-amber-500",
  },
  {
    company: "NoNameLab",
    role: "Product Manager",
    period: "Jun 2016 – Mar 2019",
    desc: "0→4K MAU in 9 months, payback in 15 months on $700K investment.",
    accent: "from-sky-500 to-cyan-500",
  },
];

const skills = [
  {
    group: "Product",
    items: ["Strategy", "Roadmap", "GTM", "SQL", "Data Analytics", "UX Research", "Unit Economics", "JTBD", "CustDev"],
  },
  {
    group: "Team & Tools",
    items: ["OKR", "Scrum", "Kanban", "Amplitude", "Jira", "Figma", "Miro", "AI tools"],
  },
];

const certifications = [
  { title: "Certified Scrum Product Owner®", org: "Scrum Alliance",    year: "2025" },
  { title: "Oxford Fintech Programme",        org: "Oxford University", year: "2024" },
  { title: "SQL for Product Analytics",       org: "GoPractice",        year: "2024" },
  { title: "Product Management",              org: "ICAgile",           year: "2023" },
  { title: "Data-driven PM Simulator",        org: "GoPractice",        year: "2021" },
];

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
        <div className="flex items-center gap-3 mb-16">
          <div className="w-8 h-px bg-indigo-500" />
          <span className="text-indigo-400 font-mono text-sm tracking-widest uppercase">Experience</span>
        </div>

        <div className="grid lg:grid-cols-[1fr_220px_220px] gap-12">
          {/* Experience */}
          <div className="space-y-10">
            {experience.map((job) => (
              <div key={job.company}>
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span className={`text-xs font-mono px-2 py-0.5 rounded-full bg-gradient-to-r ${job.accent} text-white`}>
                    {job.company}
                  </span>
                  <span className="text-white/60 text-xs font-semibold">{job.role}</span>
                </div>
                <div className="text-[#2e3145] font-mono text-[10px] mb-2 tracking-wider">{job.period}</div>
                <p className="text-[#7a7e94] text-xs leading-relaxed">{job.desc}</p>
              </div>
            ))}
          </div>

          {/* Skills */}
          <div className="space-y-7">
            {skills.map((group) => (
              <div key={group.group}>
                <div className="text-[10px] font-mono text-[#3a3d52] tracking-widest uppercase mb-3">
                  {group.group}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="text-[11px] px-2 py-0.5 rounded-full border border-white/5 bg-white/[0.02] text-[#7a7e94]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Certifications */}
          <div>
            <div className="text-[10px] font-mono text-[#3a3d52] tracking-widest uppercase mb-4">
              Certifications
            </div>
            <div className="space-y-3">
              {certifications.map((cert) => (
                <div key={cert.title} className="p-3 rounded-lg border border-white/5 bg-white/[0.02]">
                  <div className="text-xs text-white/70 font-medium leading-snug mb-1.5">{cert.title}</div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-[#4a4e62] font-mono">{cert.org}</span>
                    <span className="text-[10px] text-indigo-400/60 font-mono">{cert.year}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
