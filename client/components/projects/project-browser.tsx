"use client";

import { useMemo, useState } from "react";

import { SiteImage } from "@/components/media";
import { ArrowIcon } from "@/components/ui";
import {
  projectCards,
  projectCategories,
  type ProjectCategory,
} from "@/data/projects";
import { cn } from "@/lib/cn";

function PinIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" aria-hidden="true">
      <path d="M10 17s5-4.7 5-9a5 5 0 1 0-10 0c0 4.3 5 9 5 9Z" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="10" cy="8" r="1.7" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function ProjectBrowser() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("All");

  const visibleProjects = useMemo(
    () =>
      activeCategory === "All"
        ? projectCards
        : projectCards.filter((project) => project.category === activeCategory),
    [activeCategory],
  );

  return (
    <div>
      <div className="flex flex-wrap gap-2.5" role="group" aria-label="Filter projects by category">
        {projectCategories.map((category) => {
          const active = category === activeCategory;
          return (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={cn(
                "focus-ring min-h-10 rounded-full border px-5 text-xs font-extrabold transition sm:text-sm",
                active
                  ? "border-brand-blue bg-brand-blue text-white shadow-sm"
                  : "border-brand-line bg-white text-brand-blue hover:border-brand-blue/30 hover:bg-brand-sky",
              )}
              aria-pressed={active}
            >
              {category}
            </button>
          );
        })}
      </div>

      {visibleProjects.length ? (
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {visibleProjects.map((project) => (
            <article key={project.title} className="card-lift overflow-hidden rounded-2xl border border-brand-line bg-white shadow-card">
              <div className="relative">
                <SiteImage
                  src={project.image}
                  alt={project.title}
                  aspectRatio="16/9"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="rounded-none"
                />
                <span className="absolute bottom-3 left-3 rounded-full bg-brand-orange px-3 py-1 text-[0.68rem] font-extrabold text-white shadow-sm">
                  {project.category}
                </span>
              </div>
              <div className="p-5 sm:p-6">
                <h3 className="text-xl font-black tracking-[-0.025em] text-brand-blue">{project.title}</h3>
                <p className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-brand-orange">
                  <PinIcon /> {project.location}
                </p>
                <p className="mt-4 text-sm leading-6 text-brand-muted">{project.description}</p>
                <a
                  href="#featured-project"
                  aria-label={`Explore ${project.title}`}
                  className="focus-ring mt-5 ml-auto grid h-10 w-10 place-items-center rounded-full border border-brand-blue/35 text-brand-blue transition hover:bg-brand-blue hover:text-white"
                >
                  <ArrowIcon className="h-4 w-4" />
                </a>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-2xl border border-dashed border-brand-line bg-brand-mist px-6 py-12 text-center text-sm text-brand-muted">
          More {activeCategory} stories are being prepared for this showcase.
        </div>
      )}
    </div>
  );
}
