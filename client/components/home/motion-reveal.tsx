"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** Reveal each visible batch in reading order; server-rendered content stays visible without JS. */
export function MotionReveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!root || preference.matches || !("IntersectionObserver" in window)) return;

    const items = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal-item]"));
    const observer = new IntersectionObserver((entries) => {
      entries.filter((entry) => entry.isIntersecting)
        .sort((a, b) => items.indexOf(a.target as HTMLElement) - items.indexOf(b.target as HTMLElement))
        .forEach((entry, index) => {
          const item = entry.target as HTMLElement;
          if (item.dataset.revealState !== "pending") return;
          item.style.setProperty("--reveal-delay", `${index * 110}ms`);
          item.dataset.revealState = "entered";
          observer.unobserve(item);
        });
    }, { threshold: 0.08, rootMargin: "0px 0px -24px 0px" });

    items.forEach((item) => {
      item.dataset.revealState = "pending";
      observer.observe(item);
    });

    const showAll = () => {
      observer.disconnect();
      items.forEach((item) => { item.dataset.revealState = "visible"; });
    };
    const onPreferenceChange = () => { if (preference.matches) showAll(); };
    // Keyboard navigation must never leave a focused link hidden during its delay.
    root.addEventListener("focusin", showAll);
    preference.addEventListener("change", onPreferenceChange);
    return () => {
      observer.disconnect();
      root.removeEventListener("focusin", showAll);
      preference.removeEventListener("change", onPreferenceChange);
      items.forEach((item) => {
        delete item.dataset.revealState;
        item.style.removeProperty("--reveal-delay");
      });
    };
  }, []);

  return <div ref={ref} className={`motion-reveal ${className}`}>{children}</div>;
}
