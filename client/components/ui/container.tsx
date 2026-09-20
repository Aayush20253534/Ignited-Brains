import type { HTMLAttributes } from "react";

import { cn } from "@/lib/cn";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  wide?: boolean;
}

export function Container({ wide = false, className, ...props }: ContainerProps) {
  return (
    <div
      className={cn(wide ? "container-wide" : "container-shell", className)}
      {...props}
    />
  );
}
