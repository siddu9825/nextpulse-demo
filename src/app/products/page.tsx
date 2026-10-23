import { INITIAL_PRODUCTS } from "@/lib/data";
import { ProductList } from "@/components/ProductList";
import { ShoppingBag, Sparkles } from "lucide-react";

export const metadata = {
  title: "Catalog (SSR) — NextPulse Next.js Showcase",
  description: "Dynamic server-rendered catalog featuring React Server Components and client-side filtering.",
};

export default async function ProductsPage() {
  // Simulating Server-Side data fetching delay (e.g. database query)
  await new Promise((res) => setTimeout(res, 50));
  const products = INITIAL_PRODUCTS;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Server-Side Rendered (SSR)
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <ShoppingBag className="w-7 h-7 text-indigo-600" /> Dynamic Product Catalog
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
            This page is rendered on the server with Next.js App Router, then hydrates an interactive client-side filter and search bar with zero layout shift.
          </p>
        </div>
      </div>

      {/* Main product list client component */}
      <ProductList initialProducts={products} />
    </div>
  );
}
