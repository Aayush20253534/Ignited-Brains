"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { ProjectsOverlay } from "@/components/projects/projects-overlay";

export function GlobalProjectEarth() {
  const pathname = usePathname();
  if (pathname === "/projects") return null;

  return (
    <section className="global-project-earth" aria-label="Ignited Brains learning network">
      <Image src="/projects-v2/final-earth.webp" alt="" fill sizes="100vw" />
      <ProjectsOverlay name="earth" className="global-project-earth__network" />
      <div className="global-project-earth__shade" />
    </section>
  );
}
