"use client";

import { useEffect, useRef } from "react";

/** Keep the published count in server markup and animate once on phone or desktop entry. */
export function ImpactCount({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || !("IntersectionObserver" in window)) return;
    const desktop = window.matchMedia("(min-width: 1024px)");
    const phone = window.matchMedia("(max-width: 767px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const target = Number.parseInt(value, 10);
    if (!Number.isFinite(target)) return;
    const suffix = value.replace(/^\d+/, "");
    let frame = 0;
    let started = false;
    let start: number | undefined;

    const finish = () => {
      cancelAnimationFrame(frame);
      node.textContent = value;
    };
    const tick = (now: number) => {
      start ??= now;
      const progress = Math.min((now - start) / (phone.matches ? 1000 : 1400), 1);
      node.textContent = `${Math.round(target * (1 - (1 - progress) ** 3))}${suffix}`;
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    const observer = new IntersectionObserver((entries) => {
      if (started || !(desktop.matches || phone.matches) || reduced.matches || !entries.some((entry) => entry.isIntersecting)) return;
      started = true;
      observer.disconnect();
      node.textContent = `0${suffix}`;
      frame = requestAnimationFrame(tick);
    }, { threshold: 0.6 });
    const onPreferenceChange = () => {
      if (!(desktop.matches || phone.matches) || reduced.matches) finish();
    };
    observer.observe(node);
    phone.addEventListener("change", onPreferenceChange);
    desktop.addEventListener("change", onPreferenceChange);
    reduced.addEventListener("change", onPreferenceChange);
    return () => {
      observer.disconnect();
      finish();
      phone.removeEventListener("change", onPreferenceChange);
      desktop.removeEventListener("change", onPreferenceChange);
      reduced.removeEventListener("change", onPreferenceChange);
    };
  }, [value]);

  return <span aria-label={value}><span ref={ref} aria-hidden="true">{value}</span></span>;
}
