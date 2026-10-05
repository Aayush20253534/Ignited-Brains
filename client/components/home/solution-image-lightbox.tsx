"use client";

import Image from "next/image";
import { useEffect, useId, useRef, type ReactNode } from "react";

export function SolutionImageLightbox({
  src,
  title,
  alt,
  className = "",
  children,
}: {
  src: string;
  title: string;
  alt?: string;
  className?: string;
  children: ReactNode;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const overflowRef = useRef("");
  const lockedRef = useRef(false);
  const titleId = useId();
  function restorePage() {
    if (!lockedRef.current) return;
    lockedRef.current = false;
    if (document.body.style.overflow === "hidden") document.body.style.overflow = overflowRef.current;
    triggerRef.current?.focus({ preventScroll: true });
  }
  function closeImage() {
    dialogRef.current?.close();
    restorePage();
  }
  useEffect(() => {
    return () => {
      if (lockedRef.current && document.body.style.overflow === "hidden") document.body.style.overflow = overflowRef.current;
    };
  }, []);

  return (
    <>
      <button
        type="button"
        ref={triggerRef}
        className={`solution-image-trigger ${className}`}
        onClick={() => {
          if (!dialogRef.current || dialogRef.current.open) return;
          overflowRef.current = document.body.style.overflow;
          dialogRef.current.showModal();
          // Request the full-resolution image when the viewer opens, even if its trigger is below the fold.
          const image = dialogRef.current.querySelector("img");
          if (image) image.loading = "eager";
          lockedRef.current = true;
          document.body.style.overflow = "hidden";
          dialogRef.current.querySelector<HTMLButtonElement>("button")?.focus();
        }}
        aria-haspopup="dialog"
        aria-label={`Open full image for ${title}`}
      >
        {children}
      </button>
      <dialog ref={dialogRef} className="solution-image-dialog" aria-labelledby={titleId} onClose={(event) => {
        if (!event.currentTarget.open) restorePage();
      }} onCancel={(event) => {
        event.preventDefault();
        closeImage();
      }} onKeyDown={(event) => {
        if (event.key === "Tab") {
          event.preventDefault();
          event.currentTarget.querySelector<HTMLButtonElement>("button")?.focus();
        }
      }} onClick={(event) => {
        if (event.target === event.currentTarget) closeImage();
      }}>
        <div className="solution-image-dialog__panel">
          <button type="button" className="solution-image-dialog__close" onClick={closeImage} aria-label="Close full image">×</button>
          <div className="solution-image-dialog__media">
            <Image src={src} alt={alt ?? `${title} learning space`} fill sizes="95vw" unoptimized={src.endsWith(".webp")} style={{ objectFit: "contain" }} />
          </div>
          <p id={titleId}>{title}</p>
        </div>
      </dialog>
    </>
  );
}
