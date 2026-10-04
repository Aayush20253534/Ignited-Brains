import Image from "next/image";
import type { ReactNode } from "react";

import { AboutArtwork } from "@/components/about/about-artwork";
import { HomeIcon, type HomeIconName } from "@/components/home/home-icon";
import { Container } from "@/components/ui";
import styles from "./engagement.module.css";

export function Blueprint() {
  return (
    <svg className={styles.blueprint} viewBox="0 0 600 600" fill="none" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1">
        <ellipse cx="300" cy="300" rx="260" ry="170" transform="rotate(-28 300 300)" />
        <path d="M40 360h90l55-55h115l80-80h180M80 145h115l55 55h95M355 470h100v-85h90" />
        <path d="M55 65h30m-15-15v30M525 90h30m-15-15v30M75 500h30m-15-15v30M500 530h30m-15-15v30" />
        <circle cx="300" cy="300" r="230" strokeDasharray="2 15" />
      </g>
      <g className={styles.nodes} fill="currentColor">
        <circle cx="185" cy="305" r="4" /><circle cx="380" cy="225" r="4" />
        <circle cx="455" cy="385" r="4" /><circle cx="195" cy="145" r="4" />
      </g>
    </svg>
  );
}

export function Status({ large = false, children = "Coming Soon" }: { large?: boolean; children?: ReactNode }) {
  return <span className={`${styles.status} ${large ? styles.statusLarge : ""}`}><span aria-hidden="true" />{children}</span>;
}

export function Journey({ items, label }: {
  items: Array<{ step: string; title: string; description: string; icon: HomeIconName }>;
  label: string;
}) {
  return (
    <ol className={styles.journey} aria-label={label}>
      {items.map((item, index) => (
        <li key={item.step} data-reveal data-delay={index}>
          <span className={styles.journeyIcon}><HomeIcon name={item.icon} /></span>
          <div><span className={styles.step}>{item.step}</span><h3>{item.title}</h3><p>{item.description}</p></div>
        </li>
      ))}
    </ol>
  );
}

export function ClosingScene({ eyebrow, title, children, actions, comingSoon = false }: {
  eyebrow: string;
  title: ReactNode;
  children: ReactNode;
  actions: ReactNode;
  comingSoon?: boolean;
}) {
  return (
    <section className={`${styles.closing} ${styles.dark}`} aria-label={eyebrow}>
      <Container wide className={styles.closingGrid}>
        <div className={styles.closingCopy} data-reveal>
          <p className={styles.eyebrow}>{eyebrow}</p>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.copy}>{children}</p>
          {comingSoon && <Status large />}
          <div className={styles.actions}>{actions}</div>
        </div>
        <div className={styles.closingEarth} aria-hidden="true">
          <AboutArtwork name="earth" className={styles.earthPicture} />
          <Blueprint />
        </div>
      </Container>
    </section>
  );
}

export function LearningImage({ src, alt, className = "", sizes = "(max-width: 767px) 100vw, 33vw" }: {
  src: string; alt: string; className?: string; sizes?: string;
}) {
  return <div className={`${styles.learningImage} ${className}`}><Image src={src} alt={alt} fill sizes={sizes} className={styles.cover} /></div>;
}
