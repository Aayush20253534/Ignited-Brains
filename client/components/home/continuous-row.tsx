"use client";

import { useEffect, useId, useRef, useState, type CSSProperties, type ReactNode } from "react";

/** Two identical groups travel one group-width right, so the reset is seamless. */
export function ContinuousRow({
  children,
  label,
  variant,
  duration = 24,
  className = "",
}: {
  children: ReactNode;
  label: string;
  variant: "transformation" | "solutions" | "learning-cycle" | "idea" | "values" | "differences";
  duration?: number;
  className?: string;
}) {
  const [paused, setPaused] = useState(false);
  const duplicateRef = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    // The visual copy keeps pointer links working, with only one set of tab stops.
    duplicateRef.current?.querySelectorAll<HTMLElement>("a, button, [tabindex]")
      .forEach((item) => { item.tabIndex = -1; });
  }, [children]);

  return (
    <div
      className={`home-marquee home-marquee--${variant} ${className}`}
      data-paused={paused}
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
          if (!event.currentTarget.contains(event.relatedTarget)) event.currentTarget.scrollLeft = 0;
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
    </div>
  );
}
