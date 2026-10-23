export default function Loading() {
  return (
    <div className="w-full py-16 flex flex-col items-center justify-center space-y-4">
      <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
        Streaming Next.js Server Components...
      </p>
    </div>
  );
}
