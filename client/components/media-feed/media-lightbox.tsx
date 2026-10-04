"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";

import { archivePhotos, type ArchivePhotoId } from "@/data/media-archive";
import styles from "./media.module.css";

const photoIds = Object.keys(archivePhotos) as ArchivePhotoId[];

export function MediaLightbox({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const previousOverflow = useRef("");
  const [selected, setSelected] = useState<ArchivePhotoId | null>(null);
  const titleId = useId();
  const photo = selected ? archivePhotos[selected] : null;

  useEffect(() => {
    const element = root.current;
    const modal = dialog.current;
    if (!element || !modal) return;

    const open = (event: MouseEvent) => {
      const trigger = (event.target as Element).closest<HTMLButtonElement>("button[data-photo]");
      const id = trigger?.dataset.photo as ArchivePhotoId | undefined;
      if (!trigger || !id || !(id in archivePhotos) || modal.open) return;
      opener.current = trigger;
      previousOverflow.current = document.body.style.overflow;
      setSelected(id);
      modal.showModal();
      document.body.style.overflow = "hidden";
      modal.querySelector<HTMLButtonElement>("[data-close]")?.focus();
    };
    element.addEventListener("click", open);
    return () => {
      element.removeEventListener("click", open);
      if (modal.open) document.body.style.overflow = previousOverflow.current;
    };
  }, []);

  function move(direction: number) {
    setSelected(current => photoIds[(photoIds.indexOf(current ?? photoIds[0]) + direction + photoIds.length) % photoIds.length]);
  }

  return <div ref={root}>
    {children}
    <dialog ref={dialog} className={styles.lightbox} aria-labelledby={titleId} onClose={() => {
      document.body.style.overflow = previousOverflow.current;
      opener.current?.focus({ preventScroll: true });
      setSelected(null);
    }} onClick={event => {
      if (event.target === event.currentTarget) dialog.current?.close();
    }} onKeyDown={event => {
      if (event.key === "ArrowLeft") { event.preventDefault(); move(-1); }
      if (event.key === "ArrowRight") { event.preventDefault(); move(1); }
      if (event.key !== "Tab") return;
      const controls = event.currentTarget.querySelectorAll<HTMLElement>("button, a[href]");
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    }}>
      <div className={styles.lightboxInner}>
        <div className={styles.lightboxToolbar}>
          <span>IGNITED BRAINS / PHOTO JOURNAL</span>
          <button data-close type="button" aria-label="Close photograph" onClick={() => dialog.current?.close()}>×</button>
        </div>
        {photo && <>
          <div className={styles.lightboxImage}>
            <Image key={photo.src} src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} sizes="(max-width: 767px) 94vw, 1100px" quality={90} />
          </div>
          <div className={styles.lightboxCaption}>
            <div><h2 id={titleId}>{photo.caption}</h2><a href={photo.src} target="_blank" rel="noopener noreferrer">Open full-size image <span aria-hidden="true">↗</span><span className={styles.srOnly}> in a new tab</span></a></div>
            <div className={styles.lightboxNavigation}>
              <button type="button" aria-label="Previous photograph" onClick={() => move(-1)}>←</button>
              <span aria-live="polite">{photoIds.indexOf(selected!) + 1} / {photoIds.length}</span>
              <button type="button" aria-label="Next photograph" onClick={() => move(1)}>→</button>
            </div>
          </div>
        </>}
      </div>
    </dialog>
  </div>;
}
