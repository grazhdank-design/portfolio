"use client";

import { useEffect, useState } from "react";

const sections = [
  { id: "hero",         label: "Hero"       },
  { id: "about",        label: "About"      },
  { id: "case-studies", label: "Cases"      },
  { id: "experience",   label: "Experience" },
  { id: "contact",      label: "Contact"    },
];

export default function ScrollNav() {
  const [active, setActive] = useState("hero");
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const elements = sections
      .map(s => document.getElementById(s.id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );

    elements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-center">
      <div className="relative flex flex-col items-center" style={{ height: 128 }}>
        {/* line */}
        <div className="absolute inset-x-1/2 -translate-x-1/2 w-px h-full bg-white/10" />

        {/* dots */}
        {sections.map((section, i) => (
          <button
            key={section.id}
            onClick={() => scrollTo(section.id)}
            onMouseEnter={() => setHovered(section.id)}
            onMouseLeave={() => setHovered(null)}
            className="absolute flex items-center group"
            style={{ top: `${(i / (sections.length - 1)) * 100}%`, transform: "translateY(-50%)" }}
            aria-label={section.label}
          >
            <div
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                active === section.id
                  ? "bg-white/80 scale-125"
                  : "bg-white/20 hover:bg-white/50"
              }`}
            />
            {/* tooltip */}
            <span
              className={`absolute left-4 font-mono text-xs text-white/60 whitespace-nowrap transition-all duration-200 ${
                hovered === section.id ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-1 pointer-events-none"
              }`}
            >
              {section.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
