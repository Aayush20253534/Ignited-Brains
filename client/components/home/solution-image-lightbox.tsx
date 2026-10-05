"use client";

import Image from "next/image";
import { useRef } from "react";

export function SolutionImageLightbox({
  src,
  title,
  children,
}: {
  src: string;
  title: string;
  children: React.ReactNode;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button
        type="button"
        className="solution-image-trigger"
        onClick={() => dialogRef.current?.showModal()}
        aria-label={`Open full image for ${title}`}
      >
        {children}
      </button>
      <dialog ref={dialogRef} className="solution-image-dialog" onClick={(event) => {
        if (event.target === event.currentTarget) event.currentTarget.close();
      }}>
        <div className="solution-image-dialog__panel">
          <button type="button" className="solution-image-dialog__close" onClick={() => dialogRef.current?.close()} aria-label="Close full image">×</button>
          <div className="solution-image-dialog__media">
            <Image src={src} alt={`${title} learning space`} fill sizes="95vw" className="object-contain" />
          </div>
          <p>{title}</p>
        </div>
      </dialog>
    </>
  );
}
