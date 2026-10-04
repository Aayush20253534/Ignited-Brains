"use client";

import { useEffect, useRef } from "react";

/** One-time entrances for static Home sections. Existing rolling rows own their motion. */
export function DesktopHomeMotion() {
  const marker = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const home = marker.current?.closest<HTMLElement>(".home-page");
    if (!home || !("IntersectionObserver" in window)) return;
    const desktop = window.matchMedia("(min-width: 1024px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const seen = new WeakSet<HTMLElement>();
    let dispose: (() => void) | undefined;

    const setup = () => {
      dispose?.();
      dispose = undefined;
      if (!desktop.matches || reduced.matches) return;
      const targets = new Set<HTMLElement>();
      const add = (selector: string, direction = "up", stagger = 0, delay = 0) => {
        home.querySelectorAll<HTMLElement>(selector).forEach((node, index) => {
          node.dataset.desktopReveal = direction;
          node.style.setProperty("--desktop-delay", `${delay + index * stagger}ms`);
          targets.add(node);
        });
      };
      add(".home-hero-copy > :not(.home-hero-principles)", "up", 55);
      add(".home-hero-principles > div", "up", 70, 300);
      add('[data-home-desktop="question"] > div > div:first-child', "left");
      add(".home-question-card", "up");
      add(".home-impact-words > div", "up", 90);
      add('[data-home-motion="transformation"] .home-marquee', "up");
      add('[data-home-motion="solutions"] .home-marquee', "up");
      add(".home-story-copy", "left");
      add(".home-story-preview", "media");
      add('[data-home-desktop="impact"] > div > div:first-child > p, [data-home-desktop="impact"] h2', "up", 80);
      add(".home-impact-stats > div", "up", 70);
      add(".home-impact-photo", "media");
      add('[data-home-desktop="project"] > div > div:first-child > p, [data-home-desktop="project"] h2, [data-home-desktop="project"] > div > div:first-child > a', "up", 65);
      add(".home-rover-features > div", "left", 90);
      add(".home-rover-photo", "media");
      add(".home-india-section > div:last-child > div:first-child", "left");
      add(".home-school-cta > div > div:nth-child(2), .home-school-cta > div > div:nth-child(2) > a", "up");

      const reveal = (node: HTMLElement) => {
        // Previously viewed elements remain still after resizing or a preference change.
        node.dataset.desktopSeen = seen.has(node) ? "settled" : "enter";
        seen.add(node);
      };
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          reveal(entry.target as HTMLElement);
          observer.unobserve(entry.target);
        });
      }, { threshold: 0.16 });
      home.dataset.desktopHome = "true";
      targets.forEach((node) => {
        const box = node.getBoundingClientRect();
        if (seen.has(node) || (box.top < innerHeight && box.bottom > 0)) reveal(node);
        else observer.observe(node);
      });
      const onFocus = (event: FocusEvent) => {
        const node = (event.target as HTMLElement).closest<HTMLElement>("[data-desktop-reveal]");
        if (node && !node.dataset.desktopSeen) {
          node.dataset.desktopSeen = "settled";
          seen.add(node);
          observer.unobserve(node);
        }
      };
      home.addEventListener("focusin", onFocus);
      dispose = () => {
        observer.disconnect();
        home.removeEventListener("focusin", onFocus);
        delete home.dataset.desktopHome;
        targets.forEach((node) => {
          delete node.dataset.desktopReveal;
          delete node.dataset.desktopSeen;
          node.style.removeProperty("--desktop-delay");
        });
      };
    };
    setup();
    desktop.addEventListener("change", setup);
    reduced.addEventListener("change", setup);
    return () => {
      dispose?.();
      desktop.removeEventListener("change", setup);
      reduced.removeEventListener("change", setup);
    };
  }, []);

  useEffect(() => {
    const home = marker.current?.closest<HTMLElement>(".home-page");
    const videos = Array.from(home?.querySelectorAll<HTMLVideoElement>(".home-hero-visual video, .home-story-preview video") ?? []);
    if (!videos.length || !("IntersectionObserver" in window)) return;
    const notPhone = window.matchMedia("(min-width: 768px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const visible = new Map(videos.map((video) => [video, true]));
    const update = () => {
      // The phone controller owns playback below this breakpoint.
      if (!notPhone.matches) return;
      videos.forEach((video) => {
        if (visible.get(video) && !document.hidden && !reduced.matches) void video.play().catch(() => {});
        else video.pause();
      });
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => visible.set(entry.target as HTMLVideoElement, entry.isIntersecting));
      update();
    }, { threshold: 0.1 });
    videos.forEach((video) => observer.observe(video));
    notPhone.addEventListener("change", update);
    reduced.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);
    update();
    return () => {
      observer.disconnect();
      notPhone.removeEventListener("change", update);
      reduced.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", update);
      videos.forEach((video) => video.pause());
    };
  }, []);

  return <span ref={marker} hidden aria-hidden="true" />;
}
