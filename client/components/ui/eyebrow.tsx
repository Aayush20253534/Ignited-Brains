import type { HTMLAttributes } from "react";

import { cn } from "@/lib/cn";

interface EyebrowProps extends HTMLAttributes<HTMLParagraphElement> {
  line?: boolean;
}

export function Eyebrow({ line = true, className, children, ...props }: EyebrowProps) {
  return (
    <p className={cn("eyebrow-text inline-flex items-center gap-3", className)} {...props}>
      {children}
      {line ? (
        <span
          aria-hidden="true"
          className="h-px w-8 bg-brand-orange sm:w-10"
        />
      ) : null}
    </p>
  );
}
