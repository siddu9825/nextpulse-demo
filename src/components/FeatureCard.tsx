import Link from "next/link";
import { LucideIcon, ArrowRight } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  tag: string;
  href: string;
  icon: LucideIcon;
  badgeColor?: string;
  highlights: string[];
}

export function FeatureCard({
  title,
  description,
  tag,
  href,
  icon: Icon,
  badgeColor = "text-indigo-700 bg-indigo-50 border-indigo-200",
  highlights,
}: FeatureCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
            <Icon className="w-6 h-6" />
          </div>
          <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${badgeColor}`}>
            {tag}
          </span>
        </div>

        <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
          {title}
        </h3>
        <p className="mt-2 text-sm text-slate-600 leading-relaxed">
          {description}
        </p>

        <ul className="mt-4 space-y-1.5 border-t border-slate-100 pt-4">
          {highlights.map((h, i) => (
            <li key={i} className="text-xs text-slate-500 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              {h}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-100">
        <Link
          href={href}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-700 group-hover:translate-x-1 transition-transform"
        >
          Explore Demo <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
