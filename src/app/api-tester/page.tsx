import { ApiConsole } from "@/components/ApiConsole";
import { Terminal, Sparkles } from "lucide-react";

export const metadata = {
  title: "API Console — NextPulse Next.js Showcase",
  description: "Test and inspect Next.js App Router Web API Route Handlers in real-time.",
};

export default function ApiTesterPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Next.js Route Handlers (app/api/**/route.ts)
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Terminal className="w-7 h-7 text-amber-600" /> Route Handlers Console
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
            Execute live GET and POST requests against this app&apos;s Next.js Route Handlers. Inspect HTTP status codes, latency, response headers, and serialized JSON payloads.
          </p>
        </div>
      </div>

      <ApiConsole />
    </div>
  );
}
