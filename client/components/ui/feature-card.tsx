import type { ReactNode } from "react";

import { Card } from "@/components/ui/card";
import { IconBadge } from "@/components/ui/icon-badge";
import { cn } from "@/lib/cn";

interface FeatureCardProps {
  icon: ReactNode;
  title: ReactNode;
  description: ReactNode;
  index?: string;
  className?: string;
}

export function FeatureCard({
  icon,
  title,
  description,
  index,
  className,
}: FeatureCardProps) {
  return (
    <Card interactive className={cn("relative h-full overflow-hidden p-6 sm:p-7", className)}>
      {index ? (
        <div className="absolute right-5 top-5 text-sm font-extrabold tracking-[0.08em] text-brand-blue/25">
          {index}
        </div>
      ) : null}
      <IconBadge>{icon}</IconBadge>
      <h3 className="mt-6 text-xl font-extrabold tracking-[-0.025em] text-brand-blue sm:text-2xl">
        {title}
      </h3>
      <div className="mt-3 text-[0.95rem] leading-7 text-brand-muted">{description}</div>
    </Card>
  );
}
