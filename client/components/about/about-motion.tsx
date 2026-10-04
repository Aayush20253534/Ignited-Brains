"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import styles from "@/app/about/about.module.css";

export function AboutMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const page = root.current;
    if (!page || !("IntersectionObserver" in window)) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const visible = new Set<Element>();
    const sections = Array.from(page.querySelectorAll<HTMLElement>("main > section"));
    const reveals = Array.from(page.querySelectorAll<HTMLElement>("[data-reveal]"));
    page.dataset.motionReady = "true";
    const update = () => {
      const still = reduced.matches || page.dataset.motionPaused === "true" || document.hidden;
      sections.forEach(section => {
        section.dataset.motionVisible = String(visible.has(section) && !still);
        section.querySelectorAll<HTMLPictureElement>("[data-about-art]").forEach(art => {
          const img = art.querySelector("img");
          const playing = visible.has(section) && !still;
          const src = playing ? art.dataset.gif : art.dataset.poster;
          const loop = art.querySelector<HTMLSourceElement>("[data-about-loop]");
          const source = playing ? art.dataset.motion : art.dataset.poster;
          if (loop && source && loop.getAttribute("srcset") !== source) loop.srcset = source;
          if (img && src && img.getAttribute("src") !== src) img.src = src;
        });
      });
      if (still) reveals.forEach(node => { node.dataset.seen = "settled"; });
    };
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          visible.add(entry.target);
          (entry.target as HTMLElement).dataset.motionEntered = "true";
        }
        else visible.delete(entry.target);
      });
      update();
    }, { threshold: .05 });
    sections.forEach(section => observer.observe(section));
    const entrance = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        (entry.target as HTMLElement).dataset.seen = "true";
        entrance.unobserve(entry.target);
      });
    }, { threshold: .12 });
    reveals.forEach(node => entrance.observe(node));
    const focus = (event: FocusEvent) => {
      const node = (event.target as HTMLElement).closest<HTMLElement>("[data-reveal]");
      if (node) { node.dataset.seen = "settled"; entrance.unobserve(node); }
    };
    page.addEventListener("focusin", focus);
    page.addEventListener("about-motion-change", update);
    reduced.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);
    update();
    return () => {
      observer.disconnect(); entrance.disconnect();
      page.removeEventListener("focusin", focus);
      page.removeEventListener("about-motion-change", update);
      reduced.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", update);
      delete page.dataset.motionReady;
    };
  }, []);

  useEffect(() => { root.current?.dispatchEvent(new Event("about-motion-change")); }, [paused]);

  return (
    <div ref={root} className={styles.motionRoot} data-motion-paused={paused}>
      {children}
      <button type="button" className={styles.motionToggle} aria-pressed={paused} onClick={() => setPaused(value => !value)}>
        {paused ? "Resume animation" : "Pause animation"}
      </button>
    </div>
  );
}
