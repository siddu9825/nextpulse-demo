import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { INITIAL_PRODUCTS } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import {
  ArrowLeft,
  Star,
  Check,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  Layers,
} from "lucide-react";

interface ProductPageProps {
  params: {
    id: string;
  };
}

// Next.js Dynamic Metadata generation for social SEO tags
export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const product = INITIAL_PRODUCTS.find((p) => p.id === params.id);

  if (!product) {
    return {
      title: "Product Not Found — NextPulse",
    };
  }

  return {
    title: `${product.title} — NextPulse Product Details`,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: [product.image],
    },
  };
}

// Pre-render available products for fast SSG
export async function generateStaticParams() {
  return INITIAL_PRODUCTS.map((product) => ({
    id: product.id,
  }));
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const product = INITIAL_PRODUCTS.find((p) => p.id === params.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="space-y-8">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center justify-between">
        <Link
          href="/products"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Catalog
        </Link>

        <span className="text-xs font-mono text-slate-400">
          Route: /products/[id] &rarr; /products/{params.id}
        </span>
      </div>

      {/* Main Detail Grid */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-2">
        {/* Product Image */}
        <div className="relative min-h-[350px] lg:min-h-[500px] bg-slate-100 overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-slate-800 shadow-sm border border-slate-200/50">
              {product.category}
            </span>
            {product.inStock ? (
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500 text-white shadow-sm">
                In Stock & Ready to Ship
              </span>
            ) : (
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-rose-600 text-white shadow-sm">
                Backordered
              </span>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="p-8 sm:p-10 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-amber-500 font-bold text-sm">
                <Star className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                <span>{product.rating.toFixed(2)}</span>
                <span className="text-xs text-slate-400 font-normal ml-1">
                  (Verified Reviews)
                </span>
              </div>
              <span className="font-mono text-xs text-slate-400">ID: {product.id}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {product.title}
            </h1>

            <p className="text-sm text-slate-600 leading-relaxed">
              {product.description}
            </p>

            <div className="pt-2">
              <span className="text-xs text-slate-400 uppercase tracking-wider block font-semibold">
                Price
              </span>
              <span className="text-3xl font-extrabold text-slate-900">
                {formatCurrency(product.price)}
              </span>
            </div>

            {/* Feature Highlights */}
            <div className="pt-4 border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5">
                Key Features
              </h4>
              <ul className="space-y-2">
                {product.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs text-slate-600">
                    <span className="w-4 h-4 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3" />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Technical Specs Table */}
            <div className="pt-4 border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5">
                Technical Specifications
              </h4>
              <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/60 divide-y divide-slate-200/50 text-xs">
                {Object.entries(product.specs).map(([key, val]) => (
                  <div key={key} className="py-1.5 flex justify-between gap-4">
                    <span className="text-slate-500 font-medium">{key}</span>
                    <span className="text-slate-800 font-semibold">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-6 mt-6 border-t border-slate-100 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <button
                className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm shadow-md transition-colors"
                onClick={undefined}
              >
                Add to Cart
              </button>
              <Link
                href="/products"
                className="w-full py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs sm:text-sm text-center transition-colors"
              >
                Browse Others
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-2 text-[10px] text-slate-500 text-center pt-2">
              <span className="flex items-center justify-center gap-1">
                <Truck className="w-3 h-3 text-indigo-600" /> Free Shipping
              </span>
              <span className="flex items-center justify-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-600" /> 2-Yr Warranty
              </span>
              <span className="flex items-center justify-center gap-1">
                <RotateCcw className="w-3 h-3 text-sky-600" /> 30-Day Returns
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Behind the scenes banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center shrink-0">
          <Sparkles className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-slate-900">
            How Next.js renders this dynamic page:
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            1. The dynamic parameter <code className="bg-slate-100 px-1 py-0.5 rounded text-indigo-600">params.id</code> is parsed from the URL folder name <code className="bg-slate-100 px-1 py-0.5 rounded font-mono">[id]</code>.
            <br />
            2. The async function <code className="bg-slate-100 px-1 py-0.5 rounded text-indigo-600">generateMetadata()</code> executes on the server to dynamically inject the exact document title and OpenGraph metadata into the HTML header.
            <br />
            3. Optional <code className="bg-slate-100 px-1 py-0.5 rounded text-indigo-600">generateStaticParams()</code> pre-renders these routes at build time (SSG) for lightning fast TTFB.
          </p>
        </div>
      </div>
    </div>
  );
}
