"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import styles from "./media.module.css";

export function MediaMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const page = root.current;
    if (!page || !("IntersectionObserver" in window)) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sections = [...page.querySelectorAll<HTMLElement>("[data-media-section]")];
    const reveals = [...page.querySelectorAll<HTMLElement>("[data-reveal]")];
    const visible = new Set<Element>();
    page.dataset.mediaReady = "true";
    const update = () => {
      const still = reduced.matches || document.hidden || page.dataset.paused === "true";
      sections.forEach(section => { section.dataset.active = String(visible.has(section) && !still); });
      if (still) reveals.forEach(node => { node.dataset.seen = "true"; });
    };
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) visible.add(entry.target);
        else visible.delete(entry.target);
      });
      update();
    }, { threshold: .04 });
    const entrance = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        (entry.target as HTMLElement).dataset.seen = "true";
        entrance.unobserve(entry.target);
      });
    }, { threshold: .08 });
    sections.forEach(section => observer.observe(section));
    reveals.forEach(node => entrance.observe(node));
    const focus = (event: FocusEvent) => {
      const reveal = (event.target as HTMLElement).closest<HTMLElement>("[data-reveal]");
      if (reveal) { reveal.dataset.seen = "true"; entrance.unobserve(reveal); }
    };
    page.addEventListener("focusin", focus);
    page.addEventListener("media-motion-change", update);
    document.addEventListener("visibilitychange", update);
    reduced.addEventListener("change", update);
    update();
    return () => {
      observer.disconnect(); entrance.disconnect();
      page.removeEventListener("focusin", focus);
      page.removeEventListener("media-motion-change", update);
      document.removeEventListener("visibilitychange", update);
      reduced.removeEventListener("change", update);
      delete page.dataset.mediaReady;
    };
  }, []);

  useEffect(() => {
    root.current?.dispatchEvent(new Event("media-motion-change"));
  }, [paused]);

  return <div ref={root} className={styles.root} data-paused={paused}>
    {children}
    <button type="button" className={styles.motionControl} aria-pressed={paused} onClick={() => setPaused(value => !value)}>
      <span aria-hidden="true">{paused ? "↻" : "Ⅱ"}</span>{paused ? "Resume motion" : "Pause motion"}
    </button>
  </div>;
}
