import Image from "next/image";
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
      <span className="relative grid h-10 w-10 place-items-center overflow-hidden rounded-md sm:h-11 sm:w-11">
        <Image
          src="/media/logo.png"
          alt=""
          width={44}
          height={44}
          className="h-full w-full object-contain"
        />
      </span>

      <span className={cn("leading-none", textColor)}>
        <span className="block text-[1.2rem] font-black tracking-[-0.045em] sm:text-[1.35rem]">
          ignited
        </span>
        <span className="mt-0.5 inline-flex items-end gap-1.5">
          <span className="rounded-[3px] bg-brand-orange px-1.5 py-0.5 text-[0.62rem] font-black tracking-[0.08em] text-white sm:text-[0.67rem]">
            BRAINS
          </span>
        </span>
      </span>
    </Link>
  );
}
