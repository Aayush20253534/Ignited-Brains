"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export function GlobalProjectEarth({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (pathname === "/projects" || pathname === "/") return null;

  return (
    <section className="global-project-earth" aria-label="Ignited Brains learning network">
      {children}
    </section>
  );
}
