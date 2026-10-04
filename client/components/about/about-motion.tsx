"use client";

import { useEffect, useRef } from "react";

/** Progressive enhancement: the server-rendered About page needs no motion to be readable. */
export function AboutMotion() {
  const marker = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const page = marker.current?.closest<HTMLElement>(".about-page");
    if (!page || !("IntersectionObserver" in window)) return;
    const phone = window.matchMedia("(max-width: 767px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const seen = new WeakSet<HTMLElement>();
    const progress = new WeakMap<HTMLElement, number>();
    let dispose: (() => void) | undefined;

    const setup = () => {
      dispose?.();
      const cards = phone.matches
        ? Array.from(page.querySelectorAll<HTMLElement>("[data-marquee-original] [data-about-card]"))
        : [];
      cards.forEach((card) => { card.dataset.aboutEnter = ""; });
      const targets = Array.from(page.querySelectorAll<HTMLElement>("[data-about-enter]"));
      const reveal = (node: HTMLElement, settle = false) => {
        node.dataset.aboutSeen = settle || seen.has(node) ? "settled" : "enter";
        seen.add(node);
      };
      const entrances = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          reveal(entry.target as HTMLElement);
          entrances.unobserve(entry.target);
        });
      }, { threshold: 0.12 });
      targets.forEach((node) => {
        node.style.setProperty("--about-delay", `${node.dataset.aboutDelay ?? 0}ms`);
        if (reduced.matches || seen.has(node)) reveal(node, true);
        else entrances.observe(node);
      });
      if (!reduced.matches) page.dataset.aboutReady = "true";

      const loops = Array.from(page.querySelectorAll<HTMLElement>("[data-about-loop]"));
      const visible = new WeakSet<HTMLElement>();
      const updateLoop = (node: HTMLElement) => {
        node.dataset.loopVisible = String(visible.has(node) && !document.hidden && !reduced.matches);
      };
      const visibility = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          const node = entry.target as HTMLElement;
          if (entry.isIntersecting) visible.add(node);
          else visible.delete(node);
          updateLoop(node);
        });
      }, { threshold: 0.1 });
      loops.forEach((node) => {
        node.dataset.loopVisible = "false";
        visibility.observe(node);
      });
      const onVisibility = () => { loops.forEach(updateLoop); };

      const timeline = page.querySelector<HTMLElement>("[data-about-timeline] ol");
      const milestones = Array.from(timeline?.querySelectorAll<HTMLElement>("[data-about-milestone]") ?? []);
      let frame = 0;
      const updateTimeline = () => {
        frame = 0;
        const bounds = timeline?.getBoundingClientRect();
        if (!bounds || bounds.bottom < 0 || bounds.top > innerHeight) return;
        const horizontal = window.matchMedia("(min-width: 1024px)").matches;
        const total = (innerHeight * 0.8 - bounds.top) / Math.max(1, innerHeight * 0.35);
        milestones.forEach((node, index) => {
          const box = node.getBoundingClientRect();
          const value = reduced.matches ? 1 : horizontal
            ? total * (milestones.length - 1) - index
            : (innerHeight * 0.65 - box.top - 36) / Math.max(1, box.height - 36);
          const fill = Math.max(progress.get(node) ?? 0, Math.max(0, Math.min(1, value)));
          progress.set(node, fill);
          node.style.setProperty("--journey-fill", String(fill));
        });
      };
      const schedule = () => { if (!frame) frame = requestAnimationFrame(updateTimeline); };
      const onFocus = (event: FocusEvent) => {
        const node = (event.target as HTMLElement).closest<HTMLElement>("[data-about-enter]");
        if (node) {
          reveal(node, true);
          entrances.unobserve(node);
        }
      };
      const onAnimationEnd = (event: AnimationEvent) => {
        const node = event.target as HTMLElement;
        if (node.matches("[data-about-enter]") && node.getAnimations().every((animation) => animation.playState === "finished")) {
          // Release completed compositor layers; the once-only reveal stays settled.
          node.dataset.aboutSeen = "settled";
        }
      };
      page.addEventListener("focusin", onFocus);
      page.addEventListener("animationend", onAnimationEnd);
      window.addEventListener("scroll", schedule, { passive: true });
      window.addEventListener("resize", schedule);
      document.addEventListener("visibilitychange", onVisibility);
      updateTimeline();
      dispose = () => {
        entrances.disconnect();
        visibility.disconnect();
        cancelAnimationFrame(frame);
        page.removeEventListener("focusin", onFocus);
        page.removeEventListener("animationend", onAnimationEnd);
        window.removeEventListener("scroll", schedule);
        window.removeEventListener("resize", schedule);
        document.removeEventListener("visibilitychange", onVisibility);
        delete page.dataset.aboutReady;
        targets.forEach((node) => {
          delete node.dataset.aboutSeen;
          node.style.removeProperty("--about-delay");
        });
        cards.forEach((card) => { delete card.dataset.aboutEnter; });
        loops.forEach((node) => { node.dataset.loopVisible = "false"; });
        milestones.forEach((node) => { node.style.removeProperty("--journey-fill"); });
      };
    };
    setup();
    phone.addEventListener("change", setup);
    reduced.addEventListener("change", setup);
    return () => {
      dispose?.();
      phone.removeEventListener("change", setup);
      reduced.removeEventListener("change", setup);
    };
  }, []);

  return <span ref={marker} hidden aria-hidden="true" />;
}
