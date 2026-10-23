export interface Product {
  id: string;
  title: string;
  description: string;
  category: "Electronics" | "Design" | "Developer Tools" | "Productivity";
  price: number;
  rating: number;
  inStock: boolean;
  image: string;
  features: string[];
  specs: Record<string, string>;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  status: "todo" | "in-progress" | "completed";
  createdAt: string;
  tag: string;
}

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: "prod-1",
    title: "Apex Next.js Pro Kit",
    description: "Production-ready enterprise Next.js starter template equipped with Tailwind, TypeScript, Auth, and Prisma.",
    category: "Developer Tools",
    price: 79,
    rating: 4.9,
    inStock: true,
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=60",
    features: [
      "App Router Architecture",
      "Full Type-Safety with Zod & TypeScript",
      "Tailwind CSS v3 + Radix UI Primitives",
      "SEO & OpenGraph Meta generator",
    ],
    specs: {
      "Framework": "Next.js 14 App Router",
      "Styling": "Tailwind CSS",
      "Language": "TypeScript 5+",
      "License": "Commercial / MIT",
    },
  },
  {
    id: "prod-2",
    title: "CloudMatrix API Gateway",
    description: "Ultra-low latency edge microservices proxy with built-in rate-limiting, geo-routing, and telemetry.",
    category: "Developer Tools",
    price: 149,
    rating: 4.8,
    inStock: true,
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=60",
    features: [
      "Edge runtime compatibility",
      "Up to 100k requests/second",
      "Integrated Prometheus metrics",
      "JWT & API Key authentication",
    ],
    specs: {
      "Runtime": "Edge / Node.js",
      "Latency": "< 12ms global p99",
      "Protocol": "HTTP/2 & HTTP/3",
      "Logging": "OpenTelemetry native",
    },
  },
  {
    id: "prod-3",
    title: "Nova Mechanical Keyboard",
    description: "Custom hot-swappable 75% wireless mechanical keyboard tuned for high-velocity software engineering.",
    category: "Electronics",
    price: 189,
    rating: 4.95,
    inStock: true,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=60",
    features: [
      "Custom Gateron Oil King linear switches",
      "CNC Anodized Aluminum chassis",
      "Tri-mode: 2.4GHz wireless, Bluetooth 5.2, USB-C",
      "4000mAh battery (up to 200 hours)",
    ],
    specs: {
      "Form Factor": "75% ANSI layout",
      "Connectivity": "Wireless & Wired",
      "Battery": "4000 mAh Li-ion",
      "Weight": "1.2 kg",
    },
  },
  {
    id: "prod-4",
    title: "Minimalist Focus Desk Mat",
    description: "Ultra-smooth waterproof desk pad crafted from vegan leather and non-slip natural cork base.",
    category: "Productivity",
    price: 34,
    rating: 4.7,
    inStock: true,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&auto=format&fit=crop&q=60",
    features: [
      "Spill-proof hydrophobic coating",
      "Eco-friendly recycled materials",
      "Precision laser tracking surface",
      "Stitched anti-fray borders",
    ],
    specs: {
      "Dimensions": "900 x 400 x 3 mm",
      "Material": "PU Leather + Cork",
      "Colors": "Midnight Black, Slate Gray",
      "Care": "Damp cloth wipeable",
    },
  },
  {
    id: "prod-5",
    title: "Prism UI Design Tokens",
    description: "Comprehensive multi-brand design system with Figma files, CSS tokens, and Tailwind theme extensions.",
    category: "Design",
    price: 59,
    rating: 4.85,
    inStock: false,
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=60",
    features: [
      "240+ Figma autolayout components",
      "Dark & Light mode token sets",
      "WCAG 2.1 AA accessible contrast",
      "Export directly to Tailwind config",
    ],
    specs: {
      "Compatibility": "Figma + React + Tailwind",
      "Version": "2.4.0",
      "Icons": "Over 800 SVG vector icons",
      "Updates": "Free lifetime updates",
    },
  },
  {
    id: "prod-6",
    title: "ErgoLift Smart Stand",
    description: "Aerospace-grade motorized standing desk riser with memory presets and wireless charging cradle.",
    category: "Productivity",
    price: 299,
    rating: 4.6,
    inStock: true,
    image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&auto=format&fit=crop&q=60",
    features: [
      "Silent dual-motor mechanism (< 45dB)",
      "4 programmable memory height presets",
      "Built-in 15W Qi fast wireless charger",
      "Supports dual 32-inch monitors up to 25kg",
    ],
    specs: {
      "Lift Range": "120mm to 500mm",
      "Max Capacity": "25 kg (55 lbs)",
      "Top Shelf": "880 x 415 mm",
      "Warranty": "5-year limited",
    },
  },
];

export const INITIAL_TASKS: Task[] = [
  {
    id: "task-101",
    title: "Audit App Router layout caching",
    description: "Verify that nested layout.tsx avoids unneeded re-rendering on client-side route transitions.",
    priority: "high",
    status: "completed",
    createdAt: "2026-10-18",
    tag: "Performance",
  },
  {
    id: "task-102",
    title: "Implement Next.js Dynamic Metadata",
    description: "Export dynamic generateMetadata() async function inside [id]/page.tsx for social OpenGraph tags.",
    priority: "medium",
    status: "in-progress",
    createdAt: "2026-10-19",
    tag: "SEO",
  },
  {
    id: "task-103",
    title: "Add Server Actions optimistic mutation",
    description: "Use React useOptimistic hook to instantly show updated task state before server responds.",
    priority: "high",
    status: "in-progress",
    createdAt: "2026-10-20",
    tag: "React 18",
  },
  {
    id: "task-104",
    title: "Configure Route Handler rate limiter",
    description: "Set up token bucket rate limiting on /api/stats endpoint using standard Web API Response headers.",
    priority: "low",
    status: "todo",
    createdAt: "2026-10-21",
    tag: "Security",
  },
  {
    id: "task-105",
    title: "Audit Web Vitals and Largest Contentful Paint",
    description: "Ensure Next.js Image component uses priority attribute on above-the-fold hero assets.",
    priority: "medium",
    status: "todo",
    createdAt: "2026-10-21",
    tag: "LCP",
  },
];
