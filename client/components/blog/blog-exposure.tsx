"use client";
import { type ReactNode, useEffect, useRef } from "react";

let memoryVisitor = "";
function visitor() {
  try {
    const key = "ib-blog-visitor";
    const saved = sessionStorage.getItem(key);
    if (saved) return saved;
    const id = crypto.randomUUID(); sessionStorage.setItem(key, id); return id;
  } catch { return memoryVisitor ||= crypto.randomUUID(); }
}

export function BlogExposure({ id, kind = "IMPRESSION", source = "LISTING", children, className }: { id: string; kind?: "IMPRESSION" | "VIEW"; source?: "LISTING" | "RELATED" | "ARTICLE"; children?: ReactNode; className?: string }) {
  const target = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = target.current;
    if (!element) return;
    const key = `ib-blog-event:${id}:${kind}:${new Date().toISOString().slice(0, 10)}`;
    try { if (sessionStorage.getItem(key)) return; } catch { /* Tracking also works without browser storage. */ }
    let completed = false, pending = false, inView = kind === "VIEW";
    let timer: ReturnType<typeof setTimeout> | undefined;
    const controller = new AbortController();
    function cancel() { if (timer) clearTimeout(timer); timer = undefined; }
    async function record() {
      if (completed || pending || !inView || document.visibilityState !== "visible") return;
      pending = true;
      try {
        const result = await fetch("/api/v1/blog-events", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ blogId: id, visitorId: visitor(), kind, source }), cache: "no-store", signal: controller.signal });
        if (result.ok) { completed = true; try { sessionStorage.setItem(key, "1"); } catch { /* Server deduplication still applies. */ } }
      } catch { /* Analytics must never interrupt reading. */ } finally { pending = false; }
    }
    function schedule() {
      cancel(); if (!completed && inView && document.visibilityState === "visible") timer = setTimeout(() => void record(), 1000);
    }
    const observer = kind === "IMPRESSION" && typeof IntersectionObserver !== "undefined" ? new IntersectionObserver(entries => {
      inView = entries[0].isIntersecting && entries[0].intersectionRatio >= 0.5; schedule();
    }, { threshold: [0, 0.5] }) : null;
    observer?.observe(element);
    document.addEventListener("visibilitychange", schedule);
    schedule();
    return () => { cancel(); observer?.disconnect(); controller.abort(); document.removeEventListener("visibilitychange", schedule); };
  }, [id, kind, source]);
  return <div ref={target} className={className}>{children}</div>;
}
