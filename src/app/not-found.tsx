import Link from "next/link";
import { Compass, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="max-w-md mx-auto my-16 p-8 bg-white border border-slate-200 rounded-2xl shadow-sm text-center">
      <div className="w-12 h-12 mx-auto rounded-full bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center mb-4">
        <Compass className="w-6 h-6" />
      </div>
      <h2 className="text-2xl font-bold text-slate-900">404 - Page Not Found</h2>
      <p className="mt-2 text-xs text-slate-600 leading-relaxed">
        The route or dynamic segment you requested does not exist in this Next.js App Router demo.
      </p>
      <div className="mt-6 flex justify-center">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Return to Overview
        </Link>
      </div>
    </div>
  );
}
