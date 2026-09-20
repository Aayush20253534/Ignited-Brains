"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const REVEAL_SELECTOR =
  "main section, main article, main [data-motion-reveal='true']";

export function SiteMotion() {
  const pathname = usePathname();
  const initialHydrationComplete = useRef(false);

  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    let frameOne = 0;
    let frameTwo = 0;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const setupMotion = () => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const elements = Array.from(
        document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR),
      );

      if (reduceMotion || !("IntersectionObserver" in window)) {
        elements.forEach((element) => {
          element.classList.add("motion-reveal", "is-visible");
        });
        return;
      }

      elements.forEach((element) => {
        element.classList.add("motion-reveal");

        if (element.matches("article")) {
          const parent = element.parentElement;

          if (parent) {
            const siblings = Array.from(parent.children).filter(
              (child): child is HTMLElement =>
                child instanceof HTMLElement && child.matches("article"),
            );

            const index = siblings.indexOf(element);

            if (index >= 0) {
              element.style.setProperty(
                "--motion-delay",
                `${Math.min(index * 65, 260)}ms`,
              );
            }
          }
        }
      });

      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;

            entry.target.classList.add("is-visible");
            observer?.unobserve(entry.target);
          }
        },
        {
          rootMargin: "0px 0px -9% 0px",
          threshold: 0.08,
        },
      );

      elements.forEach((element) => observer?.observe(element));
    };

    const runAfterPaint = () => {
      frameOne = requestAnimationFrame(() => {
        frameTwo = requestAnimationFrame(() => {
          setupMotion();
          initialHydrationComplete.current = true;
        });
      });
    };

    if (!initialHydrationComplete.current) {
      /*
       * On the initial SSR load, wait until the page has fully loaded
       * before mutating server-rendered elements. Next can still be
       * hydrating streamed route segments when a parent effect fires.
       */
      if (document.readyState === "complete") {
        timeoutId = setTimeout(runAfterPaint, 0);
      } else {
        window.addEventListener("load", runAfterPaint, { once: true });
      }
    } else {
      /*
       * Client-side navigation does not involve SSR hydration,
       * so two animation frames are sufficient.
       */
      runAfterPaint();
    }

    return () => {
      window.removeEventListener("load", runAfterPaint);

      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      cancelAnimationFrame(frameOne);
      cancelAnimationFrame(frameTwo);
      observer?.disconnect();
    };
  }, [pathname]);

  return null;
}