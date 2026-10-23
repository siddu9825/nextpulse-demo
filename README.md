# NextPulse — Next.js 14 App Router Demo Project

A complete, production-ready demo application built with **Next.js 14 App Router**, **React 18**, **Tailwind CSS**, and **TypeScript**.

---

## 🚀 Quick Start

To run the development server:

```bash
cd /Users/siddusiddharth/.gemini/antigravity/scratch/nextjs-demo-showcase
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to explore the demo.

---

## 🌟 What This Demo Showcases

### 1. React Server Components (RSC) vs. Client Components
- **Zero Client Bundle Size**: Server components render on the server without shipping JavaScript dependencies to the client.
- **Client Hydration**: Client components marked with `'use client'` provide interactive filters, search bars, modals, and event handling.
- **Dedicated Guide**: Check `/architecture` for a visual comparison and decision matrix.

### 2. Dynamic Routing & SSG (`/products` & `/products/[id]`)
- **Server-Side Data Fetching**: Fast initial HTML render for SEO.
- **Dynamic Segments**: Uses `[id]` parameter parsing with fallback 404 handling.
- **Dynamic Metadata**: Generates OpenGraph and page metadata dynamically using `generateMetadata()`.
- **Static Site Generation**: Pre-renders known paths via `generateStaticParams()`.

### 3. Next.js Server Actions (`/tasks`)
- **Direct Server Mutations**: Mutate data directly from React components without creating dedicated REST API boilerplate (`src/app/actions/tasks.ts`).
- **Cache Revalidation**: Updates cached views on the fly with `revalidatePath('/tasks')`.
- **Optimistic UI**: Instant user feedback using React transitions.

### 4. Route Handlers & Interactive API Console (`/api-tester`)
- Built on standard Web API `Request` and `Response` objects.
- Endpoints:
  - `GET /api/stats` — Server telemetry, uptime, and system metrics.
  - `GET /api/products` — URL search parameter query filter.
  - `POST /api/products` — JSON payload validation and mutation.
  - `GET /api/tasks` — Serialized task collection.
- Includes a live in-browser API console to send requests, measure latency, and inspect response headers and JSON.

### 5. Modern Styling & Responsive UI
- **Tailwind CSS v3**: Clean utility-first design with responsive breakpoints for mobile, tablet, and desktop.
- **Lucide React**: Modern iconography throughout navigation, KPI cards, and badges.

---

## 📁 Directory Structure

```text
nextjs-demo-showcase/
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Root layout with responsive Navbar & Footer
│   │   ├── page.tsx           # Overview dashboard with KPI metrics
│   │   ├── loading.tsx        # Suspense streaming fallback loader
│   │   ├── error.tsx          # Client-side Error Boundary
│   │   ├── not-found.tsx      # Custom 404 page
│   │   ├── globals.css        # Tailwind styles & theme variables
│   │   ├── products/
│   │   │   ├── page.tsx       # Async SSR product catalog
│   │   │   └── [id]/page.tsx  # Dynamic route + generateMetadata()
│   │   ├── tasks/
│   │   │   └── page.tsx       # Server Actions Kanban board
│   │   ├── api-tester/
│   │   │   └── page.tsx       # Interactive API playground
│   │   ├── architecture/
│   │   │   └── page.tsx       # RSC vs Client deep dive & decision matrix
│   │   ├── actions/
│   │   │   └── tasks.ts       # 'use server' mutation functions
│   │   └── api/
│   │       ├── stats/route.ts
│   │       ├── products/route.ts
│   │       └── tasks/route.ts
│   ├── components/            # Navbar, Footer, MetricCard, FeatureCard, ProductList, TaskBoard, ApiConsole
│   └── lib/                   # Sample data, type definitions, and utils
├── tailwind.config.ts         # Tailwind design tokens
├── tsconfig.json              # Strict TypeScript config with @/* path aliases
├── next.config.mjs            # Next.js configuration
└── package.json
```

---

## 🛠 Available Scripts

- `npm run dev` — Starts the local Next.js development server on port 3000.
- `npm run build` — Builds the production bundle with static page generation and typechecking.
- `npm run start` — Runs the compiled production server.
- `npm run lint` — Lints files using Next.js ESLint rules.
