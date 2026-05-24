"use client";

import { useEffect, useRef, useState } from "react";

export default function Contact() {
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
    <section id="contact" className="py-24 px-6 border-t border-white/5">
      <div
        ref={ref}
        className={`max-w-4xl mx-auto transition-all duration-700 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-px bg-indigo-500" />
          <span className="text-indigo-400 font-mono text-sm tracking-widest uppercase">Contact</span>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Let&apos;s build something{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                worth shipping
              </span>
            </h2>
            <p className="text-[#5a5e72] leading-relaxed text-sm">
              Open to PM roles, consulting, and interesting conversations about
              fintech, crypto, and AI-assisted product development.
            </p>
          </div>

          <div className="space-y-4">
            <a
              href="https://linkedin.com/in/kirill-grazhdankin"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 p-5 rounded-xl border border-white/5 bg-white/[0.02] hover:border-indigo-500/40 hover:bg-white/[0.04] transition-all duration-200"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold text-sm shrink-0">
                in
              </div>
              <div>
                <div className="font-medium text-white text-sm group-hover:text-indigo-300 transition-colors">
                  LinkedIn
                </div>
                <div className="text-xs text-[#5a5e72] font-mono">linkedin.com/in/kirill-grazhdankin</div>
              </div>
              <div className="ml-auto text-[#3a3d52] group-hover:text-indigo-400 transition-colors">→</div>
            </a>

            <a
              href="mailto:grazhdank@gmail.com"
              className="group flex items-center gap-4 p-5 rounded-xl border border-white/5 bg-white/[0.02] hover:border-indigo-500/40 hover:bg-white/[0.04] transition-all duration-200"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-sm shrink-0">
                @
              </div>
              <div>
                <div className="font-medium text-white text-sm group-hover:text-indigo-300 transition-colors">
                  Email
                </div>
                <div className="text-xs text-[#5a5e72] font-mono">grazhdank@gmail.com</div>
              </div>
              <div className="ml-auto text-[#3a3d52] group-hover:text-indigo-400 transition-colors">→</div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
