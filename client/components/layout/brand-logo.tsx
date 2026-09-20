import Link from "next/link";

import { cn } from "@/lib/cn";

interface BrandLogoProps {
  className?: string;
  compact?: boolean;
  inverted?: boolean;
}

export function BrandLogo({
  className,
  compact = false,
  inverted = false,
}: BrandLogoProps) {
  const textColor = inverted ? "text-white" : "text-brand-blue";

  return (
    <Link
      href="/"
      className={cn(
        "focus-ring inline-flex shrink-0 items-center gap-2 rounded-md",
        className,
      )}
      aria-label="Ignited Brains home"
    >
      <span className="relative grid h-11 w-11 place-items-center sm:h-12 sm:w-12">
        <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden="true">
          <path
            d="m8 19 24-10 24 10-24 10L8 19Z"
            fill="currentColor"
            className={inverted ? "text-white" : "text-brand-blue"}
          />
          <path
            d="M18 24v12c7 5 21 5 28 0V24l-14 6-14-6Z"
            fill="currentColor"
            className="text-brand-orange"
          />
          <path
            d="M55 21v13"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            className={inverted ? "text-white" : "text-brand-blue"}
          />
          <circle cx="55" cy="37" r="2.5" fill="currentColor" className="text-brand-orange" />
        </svg>
      </span>

      <span className={cn("leading-none", textColor)}>
        <span className="block text-[1.35rem] font-black tracking-[-0.045em] sm:text-[1.5rem]">
          ignited
        </span>
        <span className="mt-0.5 inline-flex items-end gap-1.5">
          <span className="rounded-[3px] bg-brand-orange px-1.5 py-0.5 text-[0.67rem] font-black tracking-[0.08em] text-white sm:text-[0.72rem]">
            BRAINS
          </span>
          {!compact ? (
            <span
              className={cn(
                "pb-0.5 text-[0.48rem] font-extrabold tracking-[0.08em]",
                inverted ? "text-white/65" : "text-brand-blue/50",
              )}
            >
              .COM
            </span>
          ) : null}
        </span>
      </span>
    </Link>
  );
}
