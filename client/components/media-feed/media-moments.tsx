"use client";

import { useRef, useState, type CSSProperties } from "react";
import { learningMoments } from "@/data/media-archive";
import { MediaPhoto } from "./media-photo";
import styles from "./media.module.css";

export function MediaMoments() {
  const track = useRef<HTMLDivElement>(null);
  const frame = useRef(0);
  const [active, setActive] = useState(0);

  function move(direction: number) {
    const next = Math.max(0, Math.min(learningMoments.length - 1, active + direction));
    setActive(next);
    const item = track.current?.children[next] as HTMLElement | undefined;
    if (item && track.current) {
      track.current.scrollTo({ left: item.offsetLeft - (track.current.clientWidth - item.clientWidth) / 2, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
    }
  }

  return <div className={styles.moments} style={{ "--moment-progress": (active + 1) / learningMoments.length } as CSSProperties}>
    <div ref={track} className={styles.momentTrack} onScroll={() => {
      cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        const element = track.current;
        if (!element || element.scrollWidth <= element.clientWidth + 1) return;
        const center = element.scrollLeft + element.clientWidth / 2;
        const children = [...element.children] as HTMLElement[];
        const distances = children.map(item => Math.abs(item.offsetLeft + item.clientWidth / 2 - center));
        setActive(distances.indexOf(Math.min(...distances)));
      });
    }}>
      {learningMoments.map((moment, index) => <div key={moment.photo} className={styles.moment} data-current={active === index} onFocus={() => setActive(index)}>
        <MediaPhoto id={moment.photo} className={styles.momentPhoto} sizes="(max-width: 767px) 60vw, 180px" />
        <p className={styles.momentNumber}>MOMENT {String(index + 1).padStart(2, "0")}</p>
        <h3>{moment.title}</h3>
      </div>)}
    </div>
    <div className={styles.sequenceFooter}>
      <div className={styles.sequenceLine} aria-hidden="true"><span /></div>
      <div className={styles.sequenceControls}>
        <button type="button" aria-label="Previous moment" disabled={active === 0} onClick={() => move(-1)}>←</button>
        <span aria-live="polite">{String(active + 1).padStart(2, "0")} / 06</span>
        <button type="button" aria-label="Next moment" disabled={active === learningMoments.length - 1} onClick={() => move(1)}>→</button>
      </div>
    </div>
  </div>;
}
