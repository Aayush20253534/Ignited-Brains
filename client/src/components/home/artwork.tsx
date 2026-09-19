import Image from "next/image";
import type { CSSProperties } from "react";

/** A non-destructive viewport into the supplied reference artwork.
 * Coordinates use the 667 × 2048 design canvas; the source stays unmodified.
 * Replace these viewports with original standalone assets when available.
 */
export function Artwork({ region, alt = "", className = "", priority = false }: {
  region: readonly [number, number, number, number];
  alt?: string;
  className?: string;
  priority?: boolean;
}) {
  const [x, y, width, height] = region;
  const style: CSSProperties = { aspectRatio: `${width} / ${height}` };
  return (
    <div className={`artwork ${className}`} style={style}>
      <Image src="/images/home-reference.png" alt={alt} width={716} height={2197}
        unoptimized priority={priority} draggable={false}
        style={{ width: `${667 / width * 100}%`, maxWidth: "none", height: "auto", left: `${-x / width * 100}%`, top: 0, marginTop: `${-y / width * 100}%` }} />
    </div>
  );
}
