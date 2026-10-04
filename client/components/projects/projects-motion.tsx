"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function ProjectsMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const page = root.current;
    if (!page || !("IntersectionObserver" in window)) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sections = Array.from(page.querySelectorAll<HTMLElement>("[data-motion-section]"));
    const reveals = Array.from(page.querySelectorAll<HTMLElement>("[data-reveal]"));
    const visible = new Set<Element>();
    const timers = new Map<HTMLElement, ReturnType<typeof setInterval>>();
    const finishCounters = () => {
      timers.forEach((timer, node) => { clearInterval(timer); node.textContent = node.dataset.count || ""; });
      timers.clear();
    };
    const count = (node: HTMLElement) => {
      if (node.dataset.counted) return;
      node.dataset.counted = "true";
      if (reduced.matches) return;
      const target = Number.parseInt(node.dataset.count || "0", 10);
      const start = performance.now();
      const suffix = node.dataset.count?.replace(/[\d,]/g, "") || "";
      const timer = setInterval(() => {
        const progress = Math.min((performance.now() - start) / 1150, 1);
        node.textContent = `${Math.round(target * (1 - Math.pow(1 - progress, 3)))}${suffix}`;
        if (progress === 1) { clearInterval(timer); timers.delete(node); }
      }, 45);
      timers.set(node, timer);
    };
    const update = () => {
      const still = reduced.matches || document.hidden;
      sections.forEach(section => {
        const playing = visible.has(section) && !still;
        section.dataset.active = String(playing);
        section.querySelectorAll<HTMLPictureElement>("[data-network-picture]").forEach(picture => {
          const source = picture.querySelector("source[data-network-source]");
          const image = picture.querySelector("img");
          const src = playing ? picture.dataset.motion : picture.dataset.poster;
          if (src && source?.getAttribute("srcset") !== src) source?.setAttribute("srcset", src);
          if (src && image?.getAttribute("src") !== src) image?.setAttribute("src", src);
        });
      });
      if (still) {
        finishCounters();
        reveals.forEach(node => { node.dataset.seen = "true"; });
      }
    };
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const node = entry.target as HTMLElement;
        if (entry.isIntersecting) {
          visible.add(node);
          node.dataset.entered = "true";
          node.querySelectorAll<HTMLElement>("[data-count]").forEach(count);
        } else visible.delete(node);
      });
      update();
    }, { threshold: .04 });
    const entrances = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { (entry.target as HTMLElement).dataset.seen = "true"; entrances.unobserve(entry.target); }
    }), { threshold: .08 });
    sections.forEach(section => observer.observe(section));
    reveals.forEach(node => entrances.observe(node));
    const focus = (event: FocusEvent) => {
      const element = (event.target as HTMLElement).closest<HTMLElement>("[data-reveal]");
      if (element) { element.dataset.seen = "true"; entrances.unobserve(element); }
    };
    page.dataset.projectsReady = "true";
    page.addEventListener("focusin", focus);
    reduced.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);
    update();
    return () => {
      observer.disconnect(); entrances.disconnect(); finishCounters();
      page.removeEventListener("focusin", focus);
      reduced.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", update);
      delete page.dataset.projectsReady;
    };
  }, []);

  return <div ref={root}>{children}</div>;
}
