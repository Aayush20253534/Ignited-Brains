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
        className={cn("object-cover", imageClassName)}
        style={{ objectPosition }}
      />
      {overlayClassName ? (
        <span
          aria-hidden="true"
          className={cn("pointer-events-none absolute inset-0", overlayClassName)}
        />
      ) : null}
    </div>
  );
}
