import Image from "next/image";

import styles from "./home-question-scene.module.css";

/** A light, image-led counterpart to the cinematic Home sections. */
export function HomeQuestionScene() {
  return (
    <div className={`home-question-card ${styles.scene}`}>
      <div className={styles.blueprint} aria-hidden="true" />

      <span className={styles.whyLarge} aria-hidden="true">WHY?</span>
      <span className={styles.whySmall} aria-hidden="true">WHY?</span>
      <span className={styles.whyBottom} aria-hidden="true">WHY?</span>

      <div className={styles.studentPhoto}>
        <Image
          src="/home/question-discovery.webp"
          alt="A student raises his hand to ask a question in a science classroom"
          fill
          sizes="(max-width: 640px) 78vw, (max-width: 1024px) 52vw, 430px"
          className={styles.studentImage}
        />
      </div>

      <svg className={styles.sketches} viewBox="0 0 680 360" fill="none" aria-hidden="true" focusable="false">
        <g stroke="#7ca6d7" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <g className={styles.atom} transform="translate(438 55)">
            <ellipse rx="27" ry="10" transform="rotate(28)" />
            <ellipse rx="27" ry="10" transform="rotate(-28)" />
            <ellipse rx="27" ry="10" transform="rotate(90)" />
            <circle r="4" fill="#8ab5e0" stroke="none" />
          </g>
          <g className={styles.rocket} transform="translate(596 56) rotate(26)">
            <path d="M0 30C0 17 5 6 14 0c9 6 14 17 14 30l-14 10L0 30Z" />
            <path d="M0 26-8 36v9L0 41m28-15 8 10v9l-8-4M10 40v10m8-10v10" />
            <circle cx="14" cy="21" r="5" />
            <path d="M9 51c0 6 5 10 5 10s5-4 5-10" />
          </g>
          <g className={styles.planet} transform="translate(603 286)">
            <circle r="26" />
            <ellipse rx="48" ry="15" transform="rotate(-25)" />
            <path d="M-14-21c11 11 15 26 11 45m15-45c-6 11-5 27 2 41" opacity=".65" />
          </g>
          <path d="M367 321c28-32 47-30 77-8 24 18 47 18 70 2" strokeDasharray="4 7" />
          <path d="M503 123c8-7 17-7 25 0m-12-12v24" opacity=".55" />
          <circle cx="516" cy="123" r="24" strokeDasharray="2 8" opacity=".6" />
          <path d="M638 177l10 0m-5-5v10M401 108l8 0m-4-4v8M556 330l8 0m-4-4v8" opacity=".6" />
          <path d="M322 62c40-23 74-15 95 13m-2-9 2 9-9-2" strokeDasharray="3 7" opacity=".6" />
        </g>
      </svg>

      <span className={styles.whyNot} aria-hidden="true">
        WHY <span className="phone-draw-underline">NOT?</span>
      </span>
    </div>
  );
}
