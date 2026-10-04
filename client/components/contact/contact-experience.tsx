"use client";

import { useEffect, useRef } from "react";
import { ButtonLink } from "@/components/ui";
import { pageAssetSlots } from "@/lib/assets";
import styles from "@/components/engagement/engagement.module.css";

export function ContactFormLink() {
  return (
    <ButtonLink href="#contact-form" size="lg" showArrow className={styles.pill} onClick={(event) => {
      const panel = document.getElementById("contact-form");
      const input = panel?.querySelector<HTMLInputElement>('input[name="name"]');
      if (!panel || !input) return;
      event.preventDefault();
      window.history.replaceState(null, "", "#contact-form");
      panel.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "start" });
      input.focus({ preventScroll: true });
    }}>Start a Conversation</ButtonLink>
  );
}

/** Keep the existing footage still for reduced motion, hidden tabs and offscreen sections. */
export function ContactVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    const update = () => {
      if (visible && !reduced.matches && !document.hidden) void video.play().catch(() => {});
      else video.pause();
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update(); }, { threshold: 0.15 });
    observer.observe(video);
    reduced.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);
    return () => {
      observer.disconnect();
      reduced.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", update);
      video.pause();
    };
  }, []);
  return <video ref={ref} src="/media/homeimg.mp4" poster={pageAssetSlots.home.build} muted loop playsInline preload="none" aria-label="Student building a robotics project" className={styles.faqVideo} />;
}
