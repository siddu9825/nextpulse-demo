import Link from "next/link";
import { MetricCard } from "@/components/MetricCard";
import { FeatureCard } from "@/components/FeatureCard";
import { INITIAL_PRODUCTS, INITIAL_TASKS } from "@/lib/data";
import {
  Server,
  Layers,
  Cpu,
  Zap,
  ShoppingBag,
  CheckSquare,
  Terminal,
  FileCode,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Box,
} from "lucide-react";

export default function HomePage() {
  const inStockCount = INITIAL_PRODUCTS.filter((p) => p.inStock).length;
  const completedTasks = INITIAL_TASKS.filter((t) => t.status === "completed").length;

  return (
    <div className="space-y-12">
      {/* Hero Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-8 sm:p-12 shadow-xl border border-slate-800">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
            <span>Next.js 14+ App Router Demo Architecture</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Modern Full-Stack Power with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-300 to-indigo-200">
              Next.js & React 18
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
            A production-ready demo application showcasing React Server Components (RSC), Dynamic Routes (`/products/[id]`), Server Actions (`&apos;use server&apos;`), Web API Route Handlers, and Tailwind CSS.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.02]"
            >
              Explore Products (SSR) <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/tasks"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border border-slate-700 font-semibold text-xs sm:text-sm transition-all"
            >
              Try Server Actions <CheckSquare className="w-4 h-4" />
            </Link>

            <div className="font-mono text-xs bg-slate-950/80 text-emerald-400 px-3 py-2 rounded-xl border border-slate-800 flex items-center gap-2">
              <span className="text-slate-500">$</span> npm run dev
            </div>
          </div>
        </div>

        {/* Ambient background glow */}
        <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
      </section>

      {/* KPI Metrics */}
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="React Server Components"
            value="Zero-Bundle"
            subtitle="Executed on server"
            icon={Server}
            badge="RSC"
          />
          <MetricCard
            title="Live Catalog (SSR)"
            value={`${inStockCount} / ${INITIAL_PRODUCTS.length}`}
            subtitle="In stock & available"
            change="+12% this week"
            icon={ShoppingBag}
            badge="Dynamic"
          />
          <MetricCard
            title="Server Actions Hub"
            value={`${completedTasks} / ${INITIAL_TASKS.length}`}
            subtitle="Tasks verified & done"
            change="Zero client API layer"
            icon={Zap}
            badge="Direct RPC"
          />
          <MetricCard
            title="Route Handlers"
            value="3 Endpoints"
            subtitle="Web API standards"
            icon={Terminal}
            badge="Edge / Node"
          />
        </div>
      </section>

      {/* Interactive Core Capabilities Showcase */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Explore Next.js Core Features
          </h2>
          <p className="text-xs text-slate-500">
            Click into each module below to observe real-world Next.js architectural patterns in action.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard
            title="Dynamic Catalog (SSR)"
            description="Server-rendered product catalog with dynamic routes (/products/[id]), search parameters, and dynamic metadata generation."
            tag="App Router"
            href="/products"
            icon={ShoppingBag}
            highlights={[
              "Async Server Components",
              "Dynamic Segment [id]",
              "Client-side search & filtering",
            ]}
          />

          <FeatureCard
            title="Server Actions Hub"
            description="Perform mutations directly against backend state with 'use server' functions, optimistic UI, and automatic page revalidation."
            tag="Mutations"
            href="/tasks"
            icon={CheckSquare}
            badgeColor="text-emerald-700 bg-emerald-50 border-emerald-200"
            highlights={[
              "Zero manual API endpoints",
              "React useTransition pending state",
              "revalidatePath('/tasks') cache purge",
            ]}
          />

          <FeatureCard
            title="Route Handlers Console"
            description="Modern replacement for API Routes built on standard Request and Response Web APIs with streaming and custom headers."
            tag="REST API"
            href="/api-tester"
            icon={Terminal}
            badgeColor="text-amber-700 bg-amber-50 border-amber-200"
            highlights={[
              "NextResponse.json serialization",
              "Query string parsing",
              "Live request & latency inspector",
            ]}
          />

          <FeatureCard
            title="RSC Architecture"
            description="Understand when to keep components on the server vs when to opt into client components with 'use client'."
            tag="Deep Dive"
            href="/architecture"
            icon={Cpu}
            badgeColor="text-purple-700 bg-purple-50 border-purple-200"
            highlights={[
              "Server vs Client boundaries",
              "Bundle size reduction",
              "Interleaving best practices",
            ]}
          />
        </div>
      </section>

      {/* Quick Architecture Comparison */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div>
            <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">
              Project Blueprint
            </span>
            <h3 className="text-xl font-bold text-slate-900 mt-1">
              Next.js 14 App Router Directory Tree
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Built using the standard Next.js directory layout with modular routes and server actions.
            </p>
          </div>

          <Link
            href="/architecture"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
          >
            Learn RSC Patterns <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-950 text-slate-200 p-5 rounded-2xl font-mono text-xs overflow-x-auto border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 pb-3 mb-3 border-b border-slate-800">
              <span className="flex items-center gap-2">
                <FileCode className="w-4 h-4 text-indigo-400" /> Directory Structure
              </span>
              <span className="text-[10px] text-emerald-400">App Router</span>
            </div>
            <pre className="text-slate-300 leading-relaxed">{`src/
├── app/
│   ├── layout.tsx         # Root Layout with Navbar & Footer
│   ├── page.tsx           # Overview Dashboard (Server Component)
│   ├── loading.tsx        # Streaming Suspense fallback
│   ├── error.tsx          # Client Error Boundary
│   ├── not-found.tsx      # Global 404 handler
│   ├── products/
│   │   ├── page.tsx       # Async SSR Catalog
│   │   └── [id]/page.tsx  # Dynamic route + generateMetadata()
│   ├── tasks/page.tsx     # Server Actions Kanban
│   ├── api-tester/page.tsx# Interactive API Console
│   ├── architecture/page.tsx
│   ├── actions/
│   │   └── tasks.ts       # 'use server' mutation functions
│   └── api/
│       ├── stats/route.ts # Web API Route Handler
│       ├── products/route.ts
│       └── tasks/route.ts
└── components/            # Reusable UI Blocks`}</pre>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-900">
              Key Next.js Features Included in this Demo:
            </h4>

            <div className="space-y-2.5">
              {[
                {
                  title: "React Server Components (RSC)",
                  desc: "Components in app/ are server-rendered by default, shipping 0kB JavaScript for static data.",
                },
                {
                  title: "Dynamic Route Segments ([id])",
                  desc: "Generate custom views with async params and dynamic SEO metadata using generateMetadata().",
                },
                {
                  title: "Server Actions with 'use server'",
                  desc: "Direct remote procedure calls with automatic revalidatePath cache invalidation.",
                },
                {
                  title: "Route Handlers (REST API)",
                  desc: "Handle GET/POST with Web API Request/Response objects and streaming support.",
                },
                {
                  title: "Tailwind CSS & Mobile Responsive",
                  desc: "Modern utilities with dark-friendly accents, clean typography, and responsive menus.",
                },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-semibold text-slate-800">{item.title}</span>
                    <p className="text-[11px] text-slate-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <div className="p-3.5 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-indigo-900">
                  Ready to test? Start the development server:
                </span>
                <code className="text-xs font-mono font-bold text-indigo-700 bg-white px-2.5 py-1 rounded-md border border-indigo-200">
                  npm run dev
                </code>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
