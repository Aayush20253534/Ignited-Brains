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
      <span className="relative grid h-11 w-11 place-items-center overflow-hidden rounded-md sm:h-12 sm:w-12">
        <Image
          src="/media/logo.png"
          alt=""
          width={48}
          height={48}
          className="h-full w-full object-contain"
        />
      </span>

      <span className={cn("leading-none", textColor)}>
        <span className="block text-[1.35rem] font-black tracking-[-0.045em] sm:text-[1.5rem]">
          ignited
        </span>
        <span className="mt-0.5 inline-flex items-end gap-1.5">
          <span className="rounded-[3px] bg-brand-orange px-1.5 py-0.5 text-[0.67rem] font-black tracking-[0.08em] text-white sm:text-[0.72rem]">
            BRAINS
          </span>
        </span>
      </span>
    </Link>
  );
}
