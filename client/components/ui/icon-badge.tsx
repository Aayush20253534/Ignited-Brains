import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

interface IconBadgeProps {
  children: ReactNode;
  tone?: "blue" | "orange" | "white";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const toneClasses = {
  blue: "border-brand-blue/15 bg-brand-sky text-brand-blue",
  orange: "border-brand-orange/15 bg-orange-50 text-brand-orange",
  white: "border-white/20 bg-white/10 text-white",
} as const;

const sizeClasses = {
  sm: "h-9 w-9",
  md: "h-12 w-12",
  lg: "h-14 w-14",
} as const;

export function IconBadge({
  children,
  tone = "orange",
  size = "md",
  className,
}: IconBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full border",
        toneClasses[tone],
        sizeClasses[size],
        className,
      )}
    >
      {children}
    </span>
  );
}
