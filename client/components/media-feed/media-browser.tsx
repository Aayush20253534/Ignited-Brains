"use client";

import Image from "next/image";
import { useState } from "react";
import { mediaArticles, type MediaCategory } from "@/data/media";
import { archivePhotos, articlePhotography, type ArchivePhoto } from "@/data/media-archive";
import styles from "./media.module.css";

const categories: MediaCategory[] = ["All", ...new Set(mediaArticles.map(article => article.category))];

export function MediaBrowser() {
  const [category, setCategory] = useState<MediaCategory>("All");
  const [query, setQuery] = useState("");
  const normalized = query.trim().toLowerCase();
  const visible = mediaArticles.filter(article =>
    (category === "All" || category === article.category) &&
    (!normalized || `${article.title} ${article.description}`.toLowerCase().includes(normalized)),
  );

  return <div className={styles.browser}>
    <div className={styles.browseControls}>
      <div className={styles.filters} role="group" aria-label="Filter stories by category">
        {categories.map(item => <button key={item} type="button" aria-pressed={category === item} aria-controls="media-article-list" onClick={() => setCategory(item)}>{item}</button>)}
      </div>
      <label className={styles.search}>
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" strokeWidth="1.5" /><path d="m16 16 4 4" stroke="currentColor" strokeWidth="1.5" /></svg>
        <span className={styles.srOnly}>Search stories</span>
        <input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Find a story" />
      </label>
    </div>
    <p className={styles.srOnly} aria-live="polite">{visible.length} {visible.length === 1 ? "story" : "stories"} shown.</p>
    <div id="media-article-list" className={`${styles.articleGrid} ${visible.length < 3 ? styles.filteredArticles : ""}`}>
      {visible.map(article => {
        const photoId = articlePhotography[article.title];
        const photo: ArchivePhoto | null = photoId ? archivePhotos[photoId] : null;
        return <article key={article.title} className={`${styles.article} ${article === mediaArticles[0] ? styles.leadArticle : ""} ${!photo ? styles.textArticle : ""}`}>
          {photo && <div className={styles.articleImage}><Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 767px) 90vw, (max-width: 1100px) 45vw, 520px" style={{ objectPosition: photo.position }} /></div>}
          <div className={styles.articleCopy}>
            <p className={styles.micro}>{article.category}</p>
            <h3>{article.title}</h3>
            <p className={styles.articleDescription}>{article.description}</p>
            <p className={styles.articleMeta}>{article.date}<span aria-hidden="true"> / </span><span>Editorial summary</span></p>
          </div>
        </article>;
      })}
    </div>
    {!visible.length && <div className={styles.emptyState}>
      <p>No stories match this search.</p>
      <button type="button" onClick={() => { setQuery(""); setCategory("All"); }}>Clear search and filters <span aria-hidden="true">↗</span></button>
    </div>}
  </div>;
}
