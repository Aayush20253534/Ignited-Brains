import Image from "next/image";

import { cn } from "@/lib/cn";

type DecorativeImageProps = {
  src: string;
  width: number;
  height: number;
  className?: string;
};

export function DecorativeImage({
  src,
  width,
  height,
  className,
}: DecorativeImageProps) {
  return (
    <Image
      src={src}
      alt=""
      aria-hidden="true"
      width={width}
      height={height}
      className={cn("pointer-events-none select-none", className)}
    />
  );
}
