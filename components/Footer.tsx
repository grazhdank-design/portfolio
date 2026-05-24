export default function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-white/5">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#3a3d52] font-mono">
        <span>© {new Date().getFullYear()} Kirill</span>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-indigo-400/70">
          <span className="text-base leading-none">✦</span>
          <span>Built with Claude Code</span>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://linkedin.com/in/kirill-grazhdankin"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-400 transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="mailto:grazhdank@gmail.com"
            className="hover:text-indigo-400 transition-colors"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
