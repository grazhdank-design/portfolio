export default function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-white/5">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#2e3145] font-mono">
        <div className="flex items-center gap-3">
          <span>© {new Date().getFullYear()} Kirill</span>
          <span className="text-[#1e2030]">·</span>
          <span className="flex items-center gap-1.5">
            <span className="text-indigo-500/60">◈</span>
            Porto, Portugal
          </span>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/15 bg-indigo-500/5 text-indigo-400/60">
          <span className="text-sm leading-none">✦</span>
          <span>Built with Claude Code</span>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://linkedin.com/in/kirill-grazhdan"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-400 transition-colors"
          >
            LinkedIn
          </a>
          <a href="https://t.me/CitizenKi" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition-colors">
            Telegram
          </a>
          <a href="mailto:grazhdank@gmail.com" className="hover:text-indigo-400 transition-colors">
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
