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

export function FeatureCard({ title, description, tag, scoreBadge, scoreType = "high", icon, children, className }: FeatureCardProps) {
  const scoreClass = scoreType === "high" ? "cc-ok" : scoreType === "med" ? "cc-recruiter" : "cc-warning";
  return <article className={cn("cc-panel flex flex-col justify-between p-6", className)}>
    <div>
      <div className="flex items-start justify-between gap-4"><span className="cc-instrument">{icon}</span><div className="flex gap-2 text-right">{scoreBadge && <span className={`cc-label ${scoreClass}`}>{scoreBadge}</span>}{tag && <span className="cc-label">{tag}</span>}</div></div>
      <h3 className="cc-title mt-6">{title}</h3><p className="cc-copy mt-3">{description}</p>
    </div>
    {children && <div className="mt-6 border-t border-[var(--color-rule)] pt-4">{children}</div>}
  </article>;
}
