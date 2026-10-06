"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import styles from "./media.module.css";

type LightboxPhoto = {
  key: string;
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
};

function photoFromTrigger(trigger: HTMLButtonElement): LightboxPhoto | null {
  const key = trigger.dataset.photo;
  const src = trigger.dataset.photoSrc;
  if (!key || !src) return null;
  const width = Number(trigger.dataset.photoWidth || 1600);
  const height = Number(trigger.dataset.photoHeight || 1000);
  return {
    key,
    src,
    alt: trigger.dataset.photoAlt || "",
    caption: trigger.dataset.photoCaption || "Ignited Brains photo",
    width: Number.isFinite(width) && width > 0 ? width : 1600,
    height: Number.isFinite(height) && height > 0 ? height : 1000,
  };
}

export function MediaLightbox({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const previousOverflow = useRef("");
  const [selected, setSelected] = useState<LightboxPhoto | null>(null);
  const [sequence, setSequence] = useState<LightboxPhoto[]>([]);
  const titleId = useId();

  useEffect(() => {
    const element = root.current;
    const modal = dialog.current;
    if (!element || !modal) return;
    const open = (event: MouseEvent) => {
      const trigger = (event.target as Element).closest<HTMLButtonElement>("button[data-photo]");
      if (!trigger || modal.open) return;
      const photo = photoFromTrigger(trigger);
      if (!photo) return;
      const seen = new Set<string>();
      const available = [...element.querySelectorAll<HTMLButtonElement>("button[data-photo]")]
        .map(photoFromTrigger)
        .filter((item): item is LightboxPhoto => Boolean(item))
        .filter(item => {
          if (seen.has(item.key)) return false;
          seen.add(item.key);
          return true;
        });
      opener.current = trigger;
      previousOverflow.current = document.body.style.overflow;
      setSequence(available);
      setSelected(photo);
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
    setSelected(current => {
      if (!current || !sequence.length) return current;
      const index = Math.max(0, sequence.findIndex(item => item.key === current.key));
      return sequence[(index + direction + sequence.length) % sequence.length];
    });
  }

  const index = selected ? sequence.findIndex(item => item.key === selected.key) : -1;
  return <div ref={root}>
    {children}
    <dialog ref={dialog} className={styles.lightbox} aria-labelledby={titleId} onClose={() => {
      document.body.style.overflow = previousOverflow.current;
      opener.current?.focus({ preventScroll: true });
      setSelected(null);
      setSequence([]);
    }} onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }} onKeyDown={event => {
      if (event.key === "ArrowLeft") { event.preventDefault(); move(-1); }
      if (event.key === "ArrowRight") { event.preventDefault(); move(1); }
      if (event.key !== "Tab") return;
      const controls = event.currentTarget.querySelectorAll<HTMLElement>("button, a[href]");
      const first = controls[0], last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    }}>
      <div className={styles.lightboxInner}>
        <div className={styles.lightboxToolbar}><span>IGNITED BRAINS / PHOTO JOURNAL</span><button data-close type="button" aria-label="Close photograph" onClick={() => dialog.current?.close()}>×</button></div>
        {selected && <>
          <div className={styles.lightboxImage}><Image key={selected.src} src={selected.src} alt={selected.alt} width={selected.width} height={selected.height} sizes="(max-width: 767px) 94vw, 1100px" quality={90} unoptimized={selected.src.startsWith("/api/v1/media/")} /></div>
          <div className={styles.lightboxCaption}>
            <div><h2 id={titleId}>{selected.caption}</h2><a href={selected.src} target="_blank" rel="noopener noreferrer">Open full-size image <span aria-hidden="true">↗</span><span className={styles.srOnly}> in a new tab</span></a></div>
            <div className={styles.lightboxNavigation}><button type="button" aria-label="Previous photograph" onClick={() => move(-1)}>←</button><span aria-live="polite">{index >= 0 ? index + 1 : 1} / {Math.max(1, sequence.length)}</span><button type="button" aria-label="Next photograph" onClick={() => move(1)}>→</button></div>
          </div>
        </>}
      </div>
    </dialog>
  </div>;
}
