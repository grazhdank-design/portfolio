import Link from "next/link";
import { cases, getCaseBySlug } from "@/lib/cases";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = getCaseBySlug(slug);
  if (!c) return {};
  return {
    title: `${c.title} — Kirill Grazhdan`,
    description: c.subtitle,
  };
}

function Paragraphs({ text }: { text: string }) {
  return (
    <>
      {text.split("\n\n").map((p, i) => (
        <p key={i} className="text-[#7a7e94] leading-relaxed mb-4 last:mb-0" style={{ fontSize: "clamp(14px, 1.3vw, 16px)" }}>
          {p}
        </p>
      ))}
    </>
  );
}

const sections = [
  { key: "context",            label: "Context" },
  { key: "problemFull",        label: "The Problem" },
  { key: "signalFull",         label: "The Signal" },
  { key: "solutionFull",       label: "The Strategic Choice" },
  { key: "implementationFull", label: "Implementation" },
  { key: "resultsFull",        label: "Results" },
  { key: "lessonFull",         label: "The Lesson" },
] as const;

export default async function CasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = getCaseBySlug(slug);
  if (!c) return <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center text-white/30">Case not found</div>;

  const prevCase = c.prevSlug ? getCaseBySlug(c.prevSlug) : null;
  const nextCase = c.nextSlug ? getCaseBySlug(c.nextSlug) : null;

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-[#e8eaf0]">
      {/* nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between border-b border-white/5 bg-[#0a0a0f]/80 backdrop-blur-sm">
        <Link
          href="/#case-studies"
          className="flex items-center gap-2 text-white/30 hover:text-white/70 transition-colors font-mono text-sm"
        >
          ← Portfolio
        </Link>
        <div className="flex items-center gap-2">
          <span className={`text-xs font-mono px-2 py-0.5 rounded-full bg-gradient-to-r ${c.accentFrom} ${c.accentTo} text-white`}>
            {c.company}
          </span>
          <span className="text-white/20 font-mono text-xs hidden sm:block">{c.tag}</span>
        </div>
      </nav>

      {/* hero */}
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          {/* number */}
          <div
            className="font-bold tabular-nums text-white/[0.04] leading-none mb-4 select-none"
            style={{ fontSize: "clamp(80px, 14vw, 180px)" }}
          >
            {String(c.index + 1).padStart(2, "0")}
          </div>

          {/* title */}
          <h1
            className="font-bold leading-tight mb-4"
            style={{ fontSize: "clamp(32px, 5vw, 60px)" }}
          >
            {c.title}
          </h1>
          <p className="text-[#5a5e72] text-lg mb-12">{c.subtitle}</p>

          {/* metrics strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 p-6 rounded-2xl border border-white/5 bg-white/[0.02]">
            {c.metrics.map((m) => (
              <div key={m.label}>
                <div
                  className={`font-bold bg-gradient-to-r ${c.accentFrom} ${c.accentTo} bg-clip-text text-transparent`}
                  style={{ fontSize: "clamp(22px, 3vw, 34px)" }}
                >
                  {m.value}
                </div>
                <div className="text-[10px] text-[#2e3145] font-mono mt-1 uppercase tracking-wider">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* divider */}
      <div className="w-full h-px bg-white/5" />

      {/* narrative sections */}
      <div className="px-6 py-20">
        <div className="max-w-3xl mx-auto space-y-20">
          {sections.map(({ key, label }) => {
            const text = c[key];
            if (!text) return null;
            return (
              <div key={key}>
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-6 h-px bg-gradient-to-r ${c.accentFrom} ${c.accentTo}`} />
                  <span
                    className={`text-xs font-mono tracking-widest uppercase bg-gradient-to-r ${c.accentFrom} ${c.accentTo} bg-clip-text text-transparent`}
                  >
                    {label}
                  </span>
                </div>
                <Paragraphs text={text} />
              </div>
            );
          })}

          {/* key takeaways */}
          <div className="p-7 rounded-2xl border border-white/5 bg-white/[0.02]">
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-6 h-px bg-gradient-to-r ${c.accentFrom} ${c.accentTo}`} />
              <span
                className={`text-xs font-mono tracking-widest uppercase bg-gradient-to-r ${c.accentFrom} ${c.accentTo} bg-clip-text text-transparent`}
              >
                Key Takeaways
              </span>
            </div>
            <ul className="space-y-4">
              {c.keyTakeaways.map((t, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className={`mt-1 text-xs bg-gradient-to-r ${c.accentFrom} ${c.accentTo} bg-clip-text text-transparent font-bold shrink-0`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[#8b8fa8] text-sm leading-relaxed">{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* nav between cases */}
      <div className="px-6 pb-20 border-t border-white/5 pt-12">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-4">
          {prevCase ? (
            <Link
              href={`/cases/${prevCase.slug}/`}
              className="group flex flex-col gap-1 p-5 rounded-xl border border-white/5 bg-white/[0.02] hover:border-white/10 transition-all duration-200 flex-1 max-w-xs"
            >
              <span className="text-[#2e3145] text-xs font-mono">← Previous</span>
              <span className="text-white/70 font-medium text-sm group-hover:text-white transition-colors">
                {prevCase.title}
              </span>
            </Link>
          ) : <div />}

          {nextCase ? (
            <Link
              href={`/cases/${nextCase.slug}/`}
              className="group flex flex-col gap-1 p-5 rounded-xl border border-white/5 bg-white/[0.02] hover:border-white/10 transition-all duration-200 flex-1 max-w-xs text-right ml-auto"
            >
              <span className="text-[#2e3145] text-xs font-mono">Next →</span>
              <span className="text-white/70 font-medium text-sm group-hover:text-white transition-colors">
                {nextCase.title}
              </span>
            </Link>
          ) : <div />}
        </div>
      </div>

      {/* footer */}
      <div className="px-6 py-8 border-t border-white/5 text-center">
        <Link
          href="/"
          className="text-xs font-mono text-white/20 hover:text-white/50 transition-colors tracking-widest uppercase"
        >
          ← Back to Portfolio
        </Link>
      </div>
    </div>
  );
}
