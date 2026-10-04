"use client";

import { useEffect, useRef } from "react";

/** Enhance only Home on phones; server content stays readable without JavaScript. */
export function PhoneHomeMotion() {
  const marker = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const home = marker.current?.closest<HTMLElement>(".home-page");
    if (!home || !("IntersectionObserver" in window)) return;
    const phone = window.matchMedia("(max-width: 767px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const footer = document.querySelector<HTMLElement>(".site-footer");
    const videos = Array.from(home.querySelectorAll<HTMLVideoElement>("video"));
    const seen = new WeakSet<HTMLElement>();
    let dispose: (() => void) | undefined;

    const setup = () => {
      const wasEnhanced = Boolean(dispose);
      dispose?.();
      dispose = undefined;
      if (!phone.matches) {
        if (wasEnhanced) videos.forEach((video) => { void video.play().catch(() => {}); });
        return;
      }
      home.dataset.phoneHome = "true";
      if (footer) footer.dataset.phoneHome = "true";
      const targets: HTMLElement[] = [];
      const add = (selector: string, stagger = false) => {
        home.querySelectorAll<HTMLElement>(selector).forEach((node, index) => {
          node.dataset.phoneReveal = "true";
          node.style.setProperty("--phone-delay", `${stagger ? (index % 7) * 80 : 0}ms`);
          targets.push(node);
        });
      };
      add(".home-hero-copy > p:first-child, .home-hero-copy > h1");
      add(".home-hero-description, .home-hero-actions", true);
      add(".home-hero-principles > div", true);
      add(".home-page > section:not(:first-child) > div > div > h2, .home-question-card");
      add(".home-impact-words > div, .home-impact-stats > div, .home-rover-features > div", true);
      add(".home-marquee:not([data-phone-swipe]) [data-marquee-original] > .home-marquee-item", true);
      add("[data-phone-swipe]");
      add("#our-story > div > *, .home-impact-photo, .home-rover-photo, .home-india-section > div:last-child > *, .home-school-cta > div");
      footer?.querySelectorAll<HTMLElement>(".site-footer-grid > div").forEach((node) => {
        node.dataset.phoneReveal = "true";
        targets.push(node);
      });
      home.querySelector<HTMLElement>("#our-story > div > a")?.style.setProperty("--phone-delay", "160ms");
      const reveal = (node: HTMLElement) => {
        node.dataset.phoneSeen = "true";
        seen.add(node);
      };
      const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          reveal(entry.target as HTMLElement);
          observer.unobserve(entry.target);
        }
      }), { threshold: 0.12 });
      targets.forEach((node) => {
        if (seen.has(node) || reduced.matches || node.getBoundingClientRect().top < innerHeight) reveal(node);
        else observer.observe(node);
      });
      const visibleTargets = Array.from(home.querySelectorAll<HTMLElement>(".home-marquee[data-phone-swipe], .home-rover-photo, .home-school-cta, .home-india-visual"));
      const visibility = new IntersectionObserver((entries) => entries.forEach((entry) => {
        (entry.target as HTMLElement).dataset.phoneVisible = String(entry.isIntersecting);
      }), { threshold: 0.15 });
      visibleTargets.forEach((node) => visibility.observe(node));
      const videoObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
        const video = entry.target as HTMLVideoElement;
        if (entry.isIntersecting && !document.hidden && !reduced.matches) void video.play().catch(() => {});
        else video.pause();
      }), { threshold: 0.15 });
      videos.forEach((video) => videoObserver.observe(video));
      const onVisibility = () => {
        videos.forEach((video) => {
          const box = video.getBoundingClientRect();
          if (!document.hidden && !reduced.matches && box.bottom > 0 && box.top < innerHeight) void video.play().catch(() => {});
          else video.pause();
        });
      };
      const timeline = home.querySelector<HTMLElement>('[data-home-motion="learning-cycle"] [data-marquee-original]');
      const steps = Array.from(timeline?.querySelectorAll<HTMLElement>(".home-marquee-item") ?? []);
      let frame = 0;
      const updateTimeline = () => {
        frame = 0;
        const bounds = timeline?.getBoundingClientRect();
        if (!bounds || bounds.bottom < 0 || bounds.top > innerHeight) return;
        steps.forEach((step) => {
          const box = step.getBoundingClientRect();
          const progress = Math.max(0, Math.min(1, (innerHeight * 0.65 - box.top - 64) / Math.max(1, box.height - 64)));
          step.style.setProperty("--cycle-fill", String(progress));
          step.dataset.phoneCurrent = String(box.top < innerHeight * 0.65 && box.bottom >= innerHeight * 0.65);
        });
      };
      const onScroll = () => { if (!frame) frame = requestAnimationFrame(updateTimeline); };
      const onFocus = (event: FocusEvent) => {
        const target = (event.target as HTMLElement).closest<HTMLElement>("[data-phone-reveal]");
        if (target) reveal(target);
      };
      home.addEventListener("focusin", onFocus);
      footer?.addEventListener("focusin", onFocus);
      window.addEventListener("scroll", onScroll, { passive: true });
      document.addEventListener("visibilitychange", onVisibility);
      updateTimeline();
      dispose = () => {
        observer.disconnect(); visibility.disconnect(); videoObserver.disconnect();
        cancelAnimationFrame(frame);
        window.removeEventListener("scroll", onScroll);
        document.removeEventListener("visibilitychange", onVisibility);
        home.removeEventListener("focusin", onFocus);
        footer?.removeEventListener("focusin", onFocus);
        delete home.dataset.phoneHome;
        if (footer) delete footer.dataset.phoneHome;
        targets.forEach((node) => { delete node.dataset.phoneReveal; delete node.dataset.phoneSeen; node.style.removeProperty("--phone-delay"); });
        visibleTargets.forEach((node) => { delete node.dataset.phoneVisible; });
        steps.forEach((node) => { delete node.dataset.phoneCurrent; node.style.removeProperty("--cycle-fill"); });
        videos.forEach((video) => video.pause());
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
