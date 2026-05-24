"use client";

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="px-4 py-1.5 rounded-full border border-white/10 text-white/30 hover:text-white/60 hover:border-white/20 transition-all font-mono text-xs"
    >
      Print / Save PDF
    </button>
  );
}
