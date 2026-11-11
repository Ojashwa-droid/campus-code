import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  title: string;
  description: string;
  tag?: string;
  scoreBadge?: string;
  scoreType?: "high" | "med" | "low";
  icon?: ReactNode;
  children?: ReactNode;
  className?: string;
}

export function FeatureCard({
  title,
  description,
  tag,
  scoreBadge,
  scoreType = "high",
  icon,
  children,
  className,
}: FeatureCardProps) {
  const getBadgeStyle = () => {
    switch (scoreType) {
      case "high":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "med":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "low":
        return "bg-rose-500/10 text-rose-400 border-rose-500/20";
      default:
        return "bg-zinc-800 text-zinc-300 border-white/10";
    }
  };

  return (
    <div
      className={cn(
        "group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-zinc-950 p-6 backdrop-blur-md transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-white/20 hover:shadow-[0_8px_30px_rgb(0,0,0,0.6)]",
        className
      )}
    >
      <div>
        <div className="mb-4 flex items-center justify-between">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-zinc-900 text-zinc-400 transition-colors group-hover:border-white/20 group-hover:text-white">
            {icon}
          </div>
          <div className="flex items-center gap-2">
            {scoreBadge && (
              <span className={cn("rounded-md border px-2 py-0.5 font-mono-accent text-[11px] font-semibold", getBadgeStyle())}>
                {scoreBadge}
              </span>
            )}
            {tag && (
              <span className="rounded-md border border-white/5 bg-zinc-900 px-2 py-0.5 font-mono-accent text-[10px] uppercase tracking-wider text-zinc-500">
                {tag}
              </span>
            )}
          </div>
        </div>

        <h3 className="mb-1.5 text-sm font-semibold tracking-tight text-white transition-colors group-hover:text-white">
          {title}
        </h3>
        <p className="font-sans text-xs leading-relaxed text-zinc-400">{description}</p>
      </div>

      {children && <div className="mt-4 border-t border-white/5 pt-3">{children}</div>}
    </div>
  );
}
