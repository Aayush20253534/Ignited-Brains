import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/cn";

type SectionTone = "white" | "soft" | "blue" | "dark";
type SectionSpacing = "default" | "tight" | "none";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  tone?: SectionTone;
  spacing?: SectionSpacing;
  children: ReactNode;
}

const toneClasses: Record<SectionTone, string> = {
  white: "bg-white text-brand-ink",
  soft: "soft-blue-surface text-brand-ink",
  blue: "bg-brand-sky text-brand-ink",
  dark: "dark-space-surface",
};

const spacingClasses: Record<SectionSpacing, string> = {
  default: "section-space",
  tight: "section-space-tight",
  none: "",
};

export function Section({
  tone = "white",
  spacing = "default",
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(toneClasses[tone], spacingClasses[spacing], className)}
      {...props}
    >
      {children}
    </section>
  );
}
