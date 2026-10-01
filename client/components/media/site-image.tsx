import Image from "next/image";
import type { CSSProperties } from "react";

import { cn } from "@/lib/cn";

type SiteImageProps = {
  src: string;
  alt: string;
  aspectRatio?: `${number}/${number}` | string;
  sizes?: string;
  priority?: boolean;
  quality?: number;
  className?: string;
  imageClassName?: string;
  overlayClassName?: string;
  objectPosition?: CSSProperties["objectPosition"];
  fit?: "cover" | "contain";
};

export function SiteImage({
  src,
  alt,
  aspectRatio = "16/9",
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  quality = 82,
  className,
  imageClassName,
  overlayClassName,
  objectPosition = "center",
  fit = "cover",
}: SiteImageProps) {
  return (
    <div
      className={cn("relative isolate overflow-hidden bg-[#eef4fb]", className)}
      style={{ aspectRatio }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        quality={quality}
        sizes={sizes}
        className={cn(fit === "cover" ? "object-cover" : "object-contain", imageClassName)}
        style={{ objectPosition }}
      />
      {overlayClassName ? (
        <div
          aria-hidden="true"
          className={cn("pointer-events-none absolute inset-0", overlayClassName)}
        />
      ) : null}
    </div>
  );
}
