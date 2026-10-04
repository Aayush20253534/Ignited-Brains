"use client";

import { useRef, type MouseEvent } from "react";

import { Container, Eyebrow } from "@/components/ui";
import { pageAssetSlots } from "@/lib/assets";

import styles from "./home-story-section.module.css";

export function HomeStorySection() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const playerRef = useRef<HTMLVideoElement>(null);
  const previewRef = useRef<HTMLVideoElement>(null);
  const openerRef = useRef<HTMLButtonElement>(null);

  function openStory(event: MouseEvent<HTMLButtonElement>) {
    const dialog = dialogRef.current;
    const player = playerRef.current;
    if (!dialog || !player || dialog.open) return;

    openerRef.current = event.currentTarget;
    previewRef.current?.pause();
    dialog.showModal();
    player.currentTime = 0;
    void player.play().catch(() => {
      // Native controls remain available if autoplay is blocked.
    });
  }

  function closeStory() {
    dialogRef.current?.close();
  }

  function handleClosed() {
    playerRef.current?.pause();
    openerRef.current?.focus({ preventScroll: true });

    const preview = previewRef.current;
    if (!preview || document.hidden || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const bounds = preview.getBoundingClientRect();
    if (bounds.bottom > 0 && bounds.top < window.innerHeight) {
      void preview.play().catch(() => {});
    }
  }

  return (
    <section id="our-story" data-home-desktop="story" className={`${styles.section} dark-space-surface border-y border-white/10`}>
      <Container wide className={styles.inner}>
        <button
          type="button"
          onClick={openStory}
          aria-label="Play Our Story video"
          className={`${styles.preview} home-story-preview focus-ring`}
        >
          <video
            ref={previewRef}
            src="/media/homeimg.mp4"
            poster={pageAssetSlots.home.storyVideo}
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
            className={styles.previewVideo}
          />
          <span className={styles.previewShade} aria-hidden="true" />
          <span className={styles.previewPlay} aria-hidden="true">▶</span>
          <span className={styles.previewLabel} aria-hidden="true">Watch our story</span>
        </button>

        <div className={`${styles.copy} home-story-copy`}>
          <Eyebrow className={styles.eyebrow}>See it. Feel it. Believe it.</Eyebrow>
          <h2 className={styles.heading}>
            Don&apos;t just teach science.<br />Let students <span>experience it.</span>
          </h2>
          <p className={styles.description}>
            Watch how Ignited Brains is transforming schools through hands-on learning.
          </p>
          <button type="button" onClick={openStory} className={`${styles.playButton} focus-ring`}>
            <span className={styles.playButtonIcon} aria-hidden="true">▶</span>
            Play Our Story
          </button>
        </div>
      </Container>

      <dialog ref={dialogRef} onClose={handleClosed} aria-labelledby="home-story-dialog-title" className={styles.dialog}>
        <div className={styles.dialogHeader}>
          <h3 id="home-story-dialog-title">Our Story</h3>
          <button type="button" onClick={closeStory} className={`${styles.closeButton} focus-ring`} aria-label="Close story video">
            <span aria-hidden="true">×</span>
            <span>Close</span>
          </button>
        </div>
        <video ref={playerRef} src="/media/homeimg.mp4" poster={pageAssetSlots.home.storyVideo} controls playsInline preload="none" className={styles.player} />
      </dialog>
    </section>
  );
}
