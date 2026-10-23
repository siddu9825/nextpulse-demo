"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Next.js Error Boundary caught an exception:", error);
  }, [error]);

  return (
    <div className="max-w-lg mx-auto my-12 p-8 bg-white border border-rose-200 rounded-2xl shadow-sm text-center">
      <div className="w-12 h-12 mx-auto rounded-full bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center mb-4">
        <AlertTriangle className="w-6 h-6" />
      </div>
      <h2 className="text-xl font-bold text-slate-900">Something went wrong!</h2>
      <p className="mt-2 text-xs text-slate-500 font-mono bg-slate-50 p-2.5 rounded-lg border border-slate-200 break-words">
        {error.message || "An unexpected error occurred."}
      </p>
      <div className="mt-6 flex justify-center gap-3">
        <button
          onClick={() => reset()}
          className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Try Again
        </button>
      </div>
    </div>
  );
}
