"use client";

import { useEffect, useRef, useState } from "react";

const stack = [
  {
    name: "Claude Code",
    desc: "AI CLI that wrote the code",
    color: "from-orange-500 to-amber-500",
    icon: "⌨",
  },
  {
    name: "Next.js",
    desc: "React framework, static export",
    color: "from-white to-gray-300",
    icon: "▲",
  },
  {
    name: "Tailwind CSS",
    desc: "Utility-first styling",
    color: "from-cyan-400 to-sky-500",
    icon: "◈",
  },
  {
    name: "Netlify",
    desc: "Hosting & deployment",
    color: "from-teal-400 to-emerald-400",
    icon: "◆",
  },
  {
    name: "Claude",
    desc: "AI assistant (claude.ai)",
    color: "from-indigo-400 to-violet-500",
    icon: "✦",
  },
  {
    name: "GitHub",
    desc: "Version control & hosting",
    color: "from-gray-300 to-gray-500",
    icon: "◉",
  },
  {
    name: "Terminal",
    desc: "CLI-first development",
    color: "from-green-400 to-emerald-500",
    icon: "$_",
  },
];

export default function HowBuilt() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.04, rootMargin: "0px 0px -40px 0px" }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="how-built" className="relative z-20 bg-[#0a0a0f] py-24 px-6 border-t border-white/5">
      <div
        ref={ref}
        className={`max-w-4xl mx-auto transition-all duration-700 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-px bg-indigo-500" />
          <span className="text-indigo-400 font-mono text-sm tracking-widest uppercase">Stack</span>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold mb-3">How this site was built</h2>
        <p className="text-[#5a5e72] mb-12 font-mono text-sm">
          Designed and coded with AI — prompt to production in one session.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {stack.map((item, i) => (
            <div
              key={item.name}
              className="group relative p-5 rounded-xl border border-white/5 bg-white/[0.02] hover:border-indigo-500/30 hover:bg-white/[0.04] transition-all duration-200"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-10 h-10 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center text-lg font-bold text-white/90 shrink-0`}
                >
                  {item.icon}
                </div>
                <div>
                  <div className={`font-semibold text-sm bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
                    {item.name}
                  </div>
                  <div className="text-[#5a5e72] text-xs mt-0.5">{item.desc}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 p-4 rounded-xl border border-indigo-500/20 bg-indigo-500/5 flex items-center gap-3 text-sm text-[#8b8fa8]">
          <span className="text-indigo-400 text-base">✦</span>
          <span>
            This site was written entirely by{" "}
            <span className="text-indigo-300 font-medium">Claude Code</span> — an AI CLI that can
            scaffold, code, and iterate on full projects from a single prompt.
          </span>
        </div>
      </div>
    </section>
  );
}
