import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

interface StatCardProps {
  value: ReactNode;
  label: ReactNode;
  icon?: ReactNode;
  className?: string;
}

export function StatCard({ value, label, icon, className }: StatCardProps) {
  return (
    <div
      className={cn(
        "flex min-h-36 items-center gap-4 rounded-[var(--radius-md)] border border-brand-line bg-white p-5 shadow-card sm:p-6",
        className,
      )}
    >
      {icon ? <div className="shrink-0 text-brand-orange">{icon}</div> : null}
      <div>
        <div className="text-3xl font-extrabold tracking-[-0.04em] text-brand-blue sm:text-4xl">
          {value}
        </div>
        <div className="mt-1 text-sm font-semibold leading-5 text-brand-muted sm:text-base">
          {label}
        </div>
      </div>
    </div>
  );
}
