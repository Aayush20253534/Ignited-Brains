"use client";

import { useEffect, useId, useRef, useState, type CSSProperties, type ReactNode } from "react";

/** Two identical groups travel one group-width right, so the reset is seamless. */
export function ContinuousRow({
  children,
  label,
  variant,
  duration = 24,
  className = "",
  phoneSlides,
}: {
  phoneSlides?: string[];
  children: ReactNode;
  label: string;
  variant: "transformation" | "solutions" | "learning-cycle" | "idea" | "values" | "differences";
  duration?: number;
  className?: string;
}) {
  const [paused, setPaused] = useState(false);
  const duplicateRef = useRef<HTMLDivElement>(null);
  const id = useId();
  const viewportRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!phoneSlides || !viewport) return;
    const phone = window.matchMedia("(max-width: 767px)");
    const cards = Array.from(viewport.querySelectorAll<HTMLElement>("[data-marquee-original] > .home-marquee-item"));
    let frame = 0;
    const update = () => {
      frame = 0;
      if (!phone.matches) return;
      const left = viewport.getBoundingClientRect().left;
      let closest = 0;
      cards.forEach((card, index) => {
        if (Math.abs(card.getBoundingClientRect().left - left) < Math.abs(cards[closest].getBoundingClientRect().left - left)) closest = index;
      });
      cards.forEach((card, index) => { card.dataset.phoneActive = String(index === closest); });
      setActiveSlide(closest);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    viewport.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    update();
    return () => {
      cancelAnimationFrame(frame);
      viewport.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cards.forEach((card) => { delete card.dataset.phoneActive; });
    };
  }, [phoneSlides]);

  function goToSlide(index: number) {
    const viewport = viewportRef.current;
    const card = viewport?.querySelectorAll<HTMLElement>("[data-marquee-original] > .home-marquee-item")[index];
    if (!viewport || !card) return;
    viewport.scrollTo({
      left: viewport.scrollLeft + card.getBoundingClientRect().left - viewport.getBoundingClientRect().left,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  }

  useEffect(() => {
    // The visual copy keeps pointer links working, with only one set of tab stops.
    duplicateRef.current?.querySelectorAll<HTMLElement>("a, button, [tabindex]")
      .forEach((item) => { item.tabIndex = -1; });
  }, [children]);

  return (
    <div
      className={`home-marquee home-marquee--${variant} ${className}`}
      data-paused={paused}
      data-phone-swipe={phoneSlides ? true : undefined}
      style={{ "--marquee-duration": `${duration}s` } as CSSProperties}
    >
      <div className="home-marquee-controls mb-2 flex justify-end">
        <button
          type="button"
          aria-controls={id}
          aria-label={`${paused ? "Resume" : "Pause"} ${label.toLowerCase()} motion`}
          aria-pressed={paused}
          onClick={() => setPaused((value) => !value)}
          className="focus-ring rounded-full px-3 py-1.5 text-xs font-semibold text-brand-muted hover:bg-brand-sky hover:text-brand-blue"
        >
          {paused ? "Resume motion" : "Pause motion"}
        </button>
      </div>
      <div
        ref={viewportRef}
        id={id}
        className="home-marquee-viewport"
        role="region"
        aria-label={label}
        onMouseDown={(event) => {
          // Pointer links keep their position; only keyboard focus switches to the static row.
          if (window.matchMedia("(min-width: 1024px)").matches && event.button === 0 && (event.target as HTMLElement).closest("a")) event.preventDefault();
        }}
        onFocus={(event) => {
          // Focus removes the loop transform; scroll after that layout change.
          if (window.matchMedia("(min-width: 1024px)").matches) {
            event.target.scrollIntoView({ block: "nearest", inline: "nearest", behavior: "instant" });
          }
        }}
        onBlur={(event) => {
          if (window.matchMedia("(min-width: 1024px)").matches && !event.currentTarget.contains(event.relatedTarget)) event.currentTarget.scrollLeft = 0;
        }}
      >
        <div className="home-marquee-track">
          <div ref={duplicateRef} className="home-marquee-group" data-marquee-copy aria-hidden="true">
            {children}
          </div>
          <div className="home-marquee-group" data-marquee-original>
            {children}
          </div>
        </div>
      </div>
      {phoneSlides ? (
        <div className="phone-slide-navigation">
          <div className="phone-slide-dots" aria-label={`${label} cards`}>
            {phoneSlides.map((title, index) => (
              <button key={title} type="button" className="focus-ring" aria-controls={id}
                aria-label={`Show ${title}`} aria-current={activeSlide === index ? "step" : undefined}
                onClick={() => goToSlide(index)}><span /></button>
            ))}
          </div>
          <p aria-live="polite" aria-atomic="true">{activeSlide + 1} / {phoneSlides.length} · {phoneSlides[activeSlide]}</p>
          {variant === "transformation" ? <div className="phone-stage-progress" aria-hidden="true"><span style={{ width: `${((activeSlide + 1) / phoneSlides.length) * 100}%` }} /></div> : null}
        </div>
      ) : null}
    </div>
  );
}
