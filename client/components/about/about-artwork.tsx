import Image from "next/image";

/** A real GIF loop with a still frame for reduced motion and offscreen playback. */
export function AboutArtwork({ name, alt = "", className = "", priority = false }: {
  name: "hero" | "earth" | "story" | "impact";
  alt?: string;
  className?: string;
  priority?: boolean;
}) {
  const base = `/about/design/${name}`;
  return (
    <picture className={className} data-about-art data-gif={`${base}.gif`} data-motion={`${base}-motion.webp`} data-poster={`${base}.webp`}>
      <source media="(prefers-reduced-motion: reduce)" srcSet={`${base}.webp`} />
      <source type="image/webp" data-about-loop srcSet={`${base}-motion.webp`} />
      <Image src={`${base}.gif`} alt={alt} fill unoptimized fetchPriority={priority ? "high" : undefined} loading={priority ? "eager" : "lazy"} sizes="(max-width: 767px) 100vw, 60vw" />
    </picture>
  );
}
