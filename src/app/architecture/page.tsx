import Link from "next/link";
import {
  Cpu,
  Server,
  Monitor,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Code2,
  Zap,
  Lock,
  Package,
} from "lucide-react";

export const metadata = {
  title: "Architecture & RSC Guide — NextPulse Next.js Showcase",
  description: "Comprehensive guide to React Server Components (RSC) and Client Components in Next.js App Router.",
};

export default function ArchitecturePage() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="pb-6 border-b border-slate-200">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-semibold mb-2">
          <Cpu className="w-3.5 h-3.5" /> Next.js Architectural Deep Dive
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          React Server Components vs. Client Components
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-2 max-w-2xl leading-relaxed">
          The Next.js App Router introduces a hybrid mental model where components are rendered on the server by default. Client interactivity is introduced explicitly with the <code className="bg-slate-100 text-purple-700 font-mono px-1 py-0.5 rounded text-xs">&apos;use client&apos;</code> directive.
        </p>
      </div>

      {/* Side-by-Side Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Server Components */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center">
                <Server className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                  Default in App Router
                </span>
                <h3 className="text-xl font-bold text-slate-900">Server Components (RSC)</h3>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed mb-6">
              Render on the server and stream lightweight HTML and serialized JSON to the browser. Their JavaScript dependencies are never downloaded to the client browser.
            </p>

            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
              Best Used For:
            </h4>
            <ul className="space-y-2.5 mb-6 text-xs text-slate-600">
              {[
                "Direct database queries (Prisma, Drizzle, SQL)",
                "Accessing backend resources, file systems & microservices",
                "Keeping sensitive tokens, API keys, and environment variables private",
                "Heavy npm dependencies (Markdown parsers, syntax highlighters) without bloating bundle size",
                "Initial page loads with fast First Contentful Paint (FCP)",
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>

            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
              Cannot Use:
            </h4>
            <ul className="space-y-2 text-xs text-slate-500">
              {[
                "Event listeners (onClick, onChange, onKeyDown)",
                "State and lifecycle hooks (useState, useReducer, useEffect)",
                "Browser-only APIs (window, document, localStorage)",
                "Custom React context providers",
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 font-mono text-xs bg-slate-50 p-3 rounded-xl border border-slate-200">
            <span className="text-slate-400">// Async server component</span>
            <br />
            <span className="text-indigo-600 font-semibold">export default async function</span>{" "}
            <span>Catalog() &#123;</span>
            <br />
            <span className="text-slate-500">&nbsp;&nbsp;const data = await db.products.find();</span>
            <br />
            <span className="text-slate-500">&nbsp;&nbsp;return &lt;List items=&#123;data&#125; /&gt;;</span>
            <br />
            <span>&#125;</span>
          </div>
        </div>

        {/* Client Components */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center">
                <Monitor className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
                  &apos;use client&apos; Directive
                </span>
                <h3 className="text-xl font-bold text-slate-900">Client Components</h3>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed mb-6">
              Prerendered on the server into HTML for SEO, then hydrated on the client browser to enable rich user interaction and real-time state.
            </p>

            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
              Best Used For:
            </h4>
            <ul className="space-y-2.5 mb-6 text-xs text-slate-600">
              {[
                "Interactive user inputs, buttons, sliders, and form submission",
                "State management (useState, useReducer, Zustand, Redux)",
                "Lifecycle effects (useEffect, useLayoutEffect, intervals)",
                "Browser APIs (navigator, geolocation, local storage, canvas)",
                "Custom UI libraries requiring client context",
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>

            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
              Trade-offs:
            </h4>
            <ul className="space-y-2 text-xs text-slate-500">
              {[
                "Adds JavaScript bytes to the client bundle",
                "Cannot directly access secure server secrets or DB credentials",
                "Cannot be an async React component function",
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 font-mono text-xs bg-slate-50 p-3 rounded-xl border border-slate-200">
            <span className="text-amber-600 font-bold">&quot;use client&quot;;</span>
            <br />
            <span className="text-indigo-600 font-semibold">export function</span>{" "}
            <span>Counter() &#123;</span>
            <br />
            <span className="text-slate-500">&nbsp;&nbsp;const [count, setCount] = useState(0);</span>
            <br />
            <span className="text-slate-500">
              &nbsp;&nbsp;return &lt;button onClick=&#123;() =&gt; setCount(count + 1)&#125;&gt;
            </span>
            <br />
            <span>&#125;</span>
          </div>
        </div>
      </div>

      {/* Decision Matrix Table */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm overflow-hidden">
        <h3 className="text-lg font-bold text-slate-900 mb-4">
          Next.js App Router Component Decision Matrix
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
                <th className="py-3 px-4">Requirement / Capability</th>
                <th className="py-3 px-4 text-center">Server Component</th>
                <th className="py-3 px-4 text-center">Client Component</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { task: "Fetch data from database / backend", server: true, client: false },
                { task: "Keep API tokens & secrets safe", server: true, client: false },
                { task: "Reduce client JS bundle size (0kB)", server: true, client: false },
                { task: "Attach onClick / onChange event handlers", server: false, client: true },
                { task: "Manage state with useState()", server: false, client: true },
                { task: "Execute browser useEffect() lifecycle", server: false, client: true },
                { task: "Use localStorage or Geolocation API", server: false, client: true },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4 font-medium text-slate-800">{row.task}</td>
                  <td className="py-3 px-4 text-center">
                    {row.server ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                        Yes (Recommended)
                      </span>
                    ) : (
                      <span className="text-slate-300 font-mono">—</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {row.client ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold">
                        Required
                      </span>
                    ) : (
                      <span className="text-slate-300 font-mono">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
