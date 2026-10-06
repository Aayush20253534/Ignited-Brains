import Image from "next/image";
import type { MediaPhotoAsset } from "@/lib/media-page";
import { isManagedMediaImage } from "@/lib/media-page";
import styles from "./media.module.css";

export function MediaPhoto({
  photo,
  className = "",
  caption = false,
  sizes = "(max-width: 767px) 90vw, 50vw",
  id,
}: {
  photo: MediaPhotoAsset;
  className?: string;
  caption?: boolean;
  sizes?: string;
  id?: string;
}) {
  const key = id || `photo:${photo.src}:${photo.caption}`;
  return <button
    type="button"
    data-photo={key}
    data-photo-src={photo.src}
    data-photo-alt={photo.alt}
    data-photo-caption={photo.caption}
    data-photo-width={photo.width}
    data-photo-height={photo.height}
    className={`${styles.photo} ${className}`}
    aria-label={`Open photograph: ${photo.caption || photo.alt || "Ignited Brains photograph"}`}
    aria-haspopup="dialog"
  >
    <Image
      src={photo.src}
      alt={photo.alt}
      fill
      sizes={sizes}
      unoptimized={isManagedMediaImage(photo.src)}
      style={{ objectPosition: photo.position || "center" }}
    />
    {caption && <span className={styles.photoCaption}>{photo.caption || photo.alt}</span>}
    <span className={styles.expand} aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M9 4H4v5m11-5h5v5M4 15v5h5m11-5v5h-5" stroke="currentColor" strokeWidth="1.5" /></svg></span>
  </button>;
}
