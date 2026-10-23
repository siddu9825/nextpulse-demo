import { NextResponse } from "next/server";
import { INITIAL_PRODUCTS, INITIAL_TASKS } from "@/lib/data";

export async function GET() {
  const uptimeSeconds = Math.floor(process.uptime ? process.uptime() : 120);

  const payload = {
    status: "healthy",
    framework: "Next.js 14 App Router",
    runtime: process.env.NEXT_RUNTIME || "nodejs",
    nodeVersion: process.version,
    timestamp: new Date().toISOString(),
    metrics: {
      totalProducts: INITIAL_PRODUCTS.length,
      inStockCount: INITIAL_PRODUCTS.filter((p) => p.inStock).length,
      totalTasks: INITIAL_TASKS.length,
      completedTasks: INITIAL_TASKS.filter((t) => t.status === "completed").length,
      serverUptimeSeconds: uptimeSeconds,
      averageProductRating: 4.82,
    },
    featuresSupported: [
      "React Server Components (RSC)",
      "Server Actions",
      "Route Handlers (REST)",
      "Dynamic Route Segments ([id])",
      "Streaming with Suspense",
    ],
  };

  return NextResponse.json(payload, {
    status: 200,
    headers: {
      "Cache-Control": "public, s-maxage=10, stale-while-revalidate=59",
      "X-Powered-By": "Next.js App Router",
    },
  });
}
