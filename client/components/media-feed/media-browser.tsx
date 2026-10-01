"use client";

import { useMemo, useState } from "react";

import { SiteImage } from "@/components/media";
import { ArrowIcon } from "@/components/ui";
import {
  mediaArticles,
  mediaCategories,
  type MediaCategory,
} from "@/data/media";
import { cn } from "@/lib/cn";

function SearchIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" aria-hidden="true">
      <circle cx="8.5" cy="8.5" r="5" stroke="currentColor" strokeWidth="1.5" />
      <path d="m12.2 12.2 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function MediaBrowser() {
  const [category, setCategory] = useState<MediaCategory>("All");
  const [query, setQuery] = useState("");

  const visibleArticles = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return mediaArticles.filter((article) => {
      const categoryMatches = category === "All" || article.category === category;
      const queryMatches =
        !normalized ||
        article.title.toLowerCase().includes(normalized) ||
        article.description.toLowerCase().includes(normalized);
      return categoryMatches && queryMatches;
    });
  }, [category, query]);

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="mobile-scroll-row flex snap-x snap-mandatory gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible sm:pb-0" role="group" aria-label="Filter media by category">
          {mediaCategories.map((item) => {
            const active = item === category;
            return (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={cn(
                  "focus-ring min-h-10 shrink-0 snap-start rounded-full border px-4 text-xs font-extrabold transition",
                  active
                    ? "border-brand-blue bg-brand-blue text-white"
                    : "border-brand-line bg-white text-brand-blue hover:border-brand-blue/30 hover:bg-brand-sky",
                )}
                aria-pressed={active}
              >
                {item}
              </button>
            );
          })}
        </div>

        <label className="flex min-h-11 w-full items-center gap-2 rounded-full border border-brand-line bg-white px-4 text-brand-muted shadow-sm lg:w-[250px]">
          <SearchIcon />
          <span className="sr-only">Search stories</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            type="search"
            placeholder="Search articles, videos..."
            className="min-w-0 flex-1 bg-transparent text-sm text-brand-ink outline-none placeholder:text-brand-muted/65"
          />
        </label>
      </div>

      <div className="mt-9 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-brand-orange">Latest Articles</p>
          <h2 className="mt-2 text-3xl font-black tracking-[-0.04em] text-brand-blue sm:text-4xl">Insights for a brighter tomorrow.</h2>
        </div>
        <a href="#latest-videos" className="focus-ring hidden items-center gap-2 text-sm font-extrabold text-brand-orange sm:inline-flex">
          View All Articles <ArrowIcon className="h-4 w-4" />
        </a>
      </div>

      {visibleArticles.length ? (
        <div key={`${category}-${query}`} className="mt-7 grid gap-5 motion-safe:animate-[fadeIn_.28s_ease-out] md:grid-cols-2 lg:grid-cols-3">
          {visibleArticles.map((article) => (
            <article key={article.title} className="card-lift overflow-hidden rounded-2xl border border-brand-line bg-white shadow-card">
              <div className="relative">
                <SiteImage src={article.image} alt={article.title} aspectRatio="16/9" className="rounded-none" sizes="(max-width: 768px) 100vw, 33vw" />
                <span className="absolute bottom-3 left-3 rounded-full bg-white px-3 py-1 text-[0.62rem] font-black uppercase tracking-wide text-brand-blue shadow-sm">
                  {article.category === "Articles" ? "Article" : article.category}
                </span>
              </div>
              <div className="p-5 sm:p-6">
                <h3 className="text-xl font-black leading-tight tracking-[-0.03em] text-brand-blue">{article.title}</h3>
                <p className="mt-3 text-sm leading-6 text-brand-muted">{article.description}</p>
                <div className="mt-5 flex items-end justify-between gap-4">
                  <p className="text-xs font-semibold text-brand-muted">{article.date} <span className="px-1.5">•</span> {article.readTime}</p>
                  <span aria-label={`Article detail for ${article.title} is not published yet`} title="Article detail coming soon" className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-brand-blue/20 text-brand-blue/55">
                    <ArrowIcon className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="mt-7 rounded-2xl border border-dashed border-brand-line bg-brand-mist px-6 py-12 text-center text-sm text-brand-muted">
          No published stories match this filter yet.
        </div>
      )}
    </div>
  );
}
