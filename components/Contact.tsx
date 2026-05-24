"use client";

import { useEffect, useRef, useState } from "react";

const contacts = [
  {
    label: "LinkedIn",
    handle: "kirill-grazhdan",
    href: "https://linkedin.com/in/kirill-grazhdan",
    icon: "in",
    gradient: "from-blue-500 to-blue-700",
  },
  {
    label: "Telegram",
    handle: "@CitizenKi",
    href: "https://t.me/CitizenKi",
    icon: "✈",
    gradient: "from-sky-400 to-cyan-500",
  },
  {
    label: "WhatsApp",
    handle: "+351 927 191 463",
    href: "https://wa.me/351927191463",
    icon: "✆",
    gradient: "from-emerald-500 to-green-600",
  },
  {
    label: "Email",
    handle: "grazhdank@gmail.com",
    href: "mailto:grazhdank@gmail.com",
    icon: "@",
    gradient: "from-indigo-500 to-violet-600",
  },
];

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="contact" className="relative z-20 bg-[#0a0a0f] py-32 px-6 border-t border-white/5">
      <div
        ref={ref}
        className={`max-w-4xl mx-auto transition-all duration-700 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="flex items-center gap-3 mb-5">
          <div className="w-8 h-px bg-indigo-500" />
          <span className="text-indigo-400 font-mono text-sm tracking-widest uppercase">Contact</span>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <h2
              className="font-bold leading-tight mb-5"
              style={{ fontSize: "clamp(28px, 4vw, 48px)" }}
            >
              Let&apos;s build something{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                worth shipping
              </span>
            </h2>
            <p className="text-[#5a5e72] leading-relaxed text-sm mb-6">
              Open to Head of Product roles, consulting, and interesting conversations about
              fintech, crypto, and AI-assisted product development.
            </p>
            <div className="flex items-center gap-2 text-[#3a3d52] text-sm font-mono">
              <span className="text-indigo-500">◈</span>
              Porto, Portugal
            </div>
          </div>

          <div className="space-y-3">
            {contacts.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("mailto") ? undefined : "_blank"}
                rel={c.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                className="group flex items-center gap-4 p-5 rounded-xl border border-white/5 bg-white/[0.02] hover:border-indigo-500/30 hover:bg-white/[0.04] transition-all duration-200"
              >
                <div
                  className={`w-10 h-10 rounded-lg bg-gradient-to-br ${c.gradient} flex items-center justify-center text-white font-bold text-sm shrink-0`}
                >
                  {c.icon}
                </div>
                <div>
                  <div className="font-medium text-white text-sm group-hover:text-indigo-300 transition-colors">
                    {c.label}
                  </div>
                  <div className="text-xs text-[#4a4e62] font-mono mt-0.5">{c.handle}</div>
                </div>
                <div className="ml-auto text-[#2e3145] group-hover:text-indigo-400 transition-colors">
                  →
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
