import Image from "next/image";
import { archivePhotos, type ArchivePhotoId } from "@/data/media-archive";
import styles from "./media.module.css";

export function MediaPhoto({ id, className = "", caption = false, sizes = "(max-width: 767px) 90vw, 50vw" }: {
  id: ArchivePhotoId;
  className?: string;
  caption?: boolean;
  sizes?: string;
}) {
  const photo = archivePhotos[id];
  return <button type="button" data-photo={id} className={`${styles.photo} ${className}`} aria-label={`Open photograph: ${photo.caption}`} aria-haspopup="dialog">
    <Image src={photo.src} alt={photo.alt} fill sizes={sizes} style={{ objectPosition: "position" in photo ? photo.position : "center" }} />
    {caption && <span className={styles.photoCaption}>{photo.caption}</span>}
    <span className={styles.expand} aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M9 4H4v5m11-5h5v5M4 15v5h5m11-5v5h-5" stroke="currentColor" strokeWidth="1.5" /></svg></span>
  </button>;
}
