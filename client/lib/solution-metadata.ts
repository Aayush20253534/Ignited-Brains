import type { Metadata } from "next";
import type { LabProgramme } from "@/data/lab-programmes";
import { siteConfig } from "./site";

export function solutionMetadata(lab: LabProgramme): Metadata {
  const path = `/solutions/${lab.slug}`;
  return {
    title: lab.name, description: lab.description, alternates: { canonical: path },
    openGraph: { title: `${lab.name} | ${siteConfig.name}`, description: lab.description, url: path, siteName: siteConfig.name, locale: siteConfig.locale, type: "website", images: [{ url: lab.hero, alt: lab.heroAlt }] },
    twitter: { card: "summary_large_image", title: `${lab.name} | ${siteConfig.name}`, description: lab.description, images: [lab.hero] },
  };
}
