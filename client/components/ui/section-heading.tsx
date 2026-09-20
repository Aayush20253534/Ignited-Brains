import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/cn";

type SectionHeadingProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  "title"
> & {
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  maxWidth?: "sm" | "md" | "lg" | "none";
};

const maxWidthClasses = {
  sm: "max-w-xl",
  md: "max-w-2xl",
  lg: "max-w-4xl",
  none: "max-w-none",
} as const;

export function SectionHeading({
  title,
  description,
  align = "left",
  maxWidth = "lg",
  className,
  ...props
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        maxWidthClasses[maxWidth],
        align === "center" && "mx-auto text-center",
        className,
      )}
      {...props}
    >
      <h2 className="section-heading text-balance">{title}</h2>
      {description ? (
        <div className="body-copy mt-5 max-w-3xl">{description}</div>
      ) : null}
    </div>
  );
}
