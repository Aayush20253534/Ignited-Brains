import Image from "next/image";
import type { ReactNode } from "react";

import styles from "./engagement.module.css";

export type PageIconName = "kit" | "innovation" | "science" | "mail" | "phone" | "pin";

/** Small interface symbols drawn for these pages; illustrations are separate assets. */
export function PageIcon({ name }: { name: PageIconName }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {name === "kit" && <><path d="m5 10 11-6 11 6v13l-11 6-11-6V10Z" /><path d="m5 10 11 6 11-6M16 16v13M10.5 7 22 13v5" /></>}
      {name === "innovation" && <><path d="M12 20 8 16C13 6 19 3 28 4c1 9-2 15-12 20l-4-4Z" /><circle cx="21" cy="11" r="3" /><path d="m9 14-5 2-1 6 7-2M18 23l-2 6-6 1 2-8M7 25l-4 4" /></>}
      {name === "science" && <><ellipse cx="16" cy="16" rx="14" ry="5.5" /><ellipse cx="16" cy="16" rx="14" ry="5.5" transform="rotate(60 16 16)" /><ellipse cx="16" cy="16" rx="14" ry="5.5" transform="rotate(120 16 16)" /><circle cx="16" cy="16" r="2" fill="currentColor" stroke="none" /></>}
      {name === "mail" && <><rect x="4" y="7" width="24" height="18" rx="3" /><path d="m5 9 11 9L27 9M5 24l8-8M27 24l-8-8" /></>}
      {name === "phone" && <path d="m10 4 4 7-4 3c2 4 4 6 8 8l3-4 7 4-1 5c-.2 1-1 2-3 1C12 26 6 20 4 8c-.5-2 0-3 1-3l5-1Z" />}
      {name === "pin" && <><path d="M26 13c0 8-10 16-10 16S6 21 6 13a10 10 0 1 1 20 0Z" /><circle cx="16" cy="13" r="3.5" /></>}
    </svg>
  );
}

export function Status() {
  return <span className={styles.status}><span aria-hidden="true" />Coming Soon</span>;
}

export function SceneHero({ image, alt, label, title, children, variant = "shop" }: {
  image: string;
  alt: string;
  label: string;
  title: ReactNode;
  children: ReactNode;
  variant?: "shop" | "contact";
}) {
  return (
    <section className={`${styles.hero} ${variant === "contact" ? styles.contactHero : ""}`} aria-labelledby={`${variant}-title`}>
      <div className={styles.heroImage}>
        <Image src={image} alt={alt} fill preload sizes="100vw" className={styles.cover} />
      </div>
      <div className={styles.container}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow} data-reveal>{label}</p>
          <h1 id={`${variant}-title`} className={styles.heroTitle} data-reveal data-delay="1">{title}</h1>
          {children}
        </div>
      </div>
    </section>
  );
}
