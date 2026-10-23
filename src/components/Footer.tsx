import Link from "next/link";
import { Sparkles, ArrowUpRight, Code2 } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white/50 backdrop-blur-sm mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-sm">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <p className="font-semibold text-slate-800 text-sm">NextPulse Demo Project</p>
              <p className="text-xs text-slate-500">
                Built with Next.js App Router, React 18, Tailwind CSS & TypeScript
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-600">
            <span className="flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-md text-slate-700">
              <Code2 className="w-3.5 h-3.5 text-indigo-600" /> App Router (RSC)
            </span>
            <span className="bg-slate-100 px-2.5 py-1 rounded-md text-slate-700">
              Server Actions
            </span>
            <span className="bg-slate-100 px-2.5 py-1 rounded-md text-slate-700">
              Dynamic Routes
            </span>
            <span className="bg-slate-100 px-2.5 py-1 rounded-md text-slate-700">
              Route Handlers (API)
            </span>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <p>© 2026 NextPulse Showcase. Designed for pair-programming & Next.js demos.</p>
          <div className="flex items-center gap-4">
            <Link
              href="https://nextjs.org/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-600 flex items-center gap-0.5"
            >
              Next.js Docs <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
