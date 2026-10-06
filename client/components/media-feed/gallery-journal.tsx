"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import styles from "./media.module.css";

type GalleryItem = {
  id: string;
  image: string;
  width: number;
  height: number;
  title: string;
  caption: string;
  altText: string;
  category: string;
  location: string | null;
  eventDate: string | null;
  isFeatured: boolean;
};

type GalleryResponse = {
  data: GalleryItem[];
  categories: string[];
};

export function GalleryJournal() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [active, setActive] = useState("All");
  const [state, setState] = useState<"loading" | "ready" | "empty">("loading");

  useEffect(() => {
    const controller = new AbortController();
    void fetch("/api/v1/gallery?limit=48", { cache: "no-store", signal: controller.signal, headers: { Accept: "application/json" } })
      .then(async response => {
        if (!response.ok) throw new Error("Gallery unavailable");
        return response.json() as Promise<GalleryResponse>;
      })
      .then(result => {
        if (controller.signal.aborted) return;
        setItems(result.data || []);
        setCategories(result.categories || []);
        setState(result.data?.length ? "ready" : "empty");
      })
      .catch(() => {
        if (!controller.signal.aborted) setState("empty");
      });
    return () => controller.abort();
  }, []);

  const visible = useMemo(
    () => active === "All" ? items : items.filter(item => item.category === active),
    [active, items],
  );

  if (state === "empty") return null;

  return <section id="photo-journal" className={styles.galleryJournal} data-media-section aria-labelledby="photo-journal-title">
    <div className={styles.container}>
      <div className={styles.galleryJournalHeader}>
        <div>
          <p className={styles.eyebrow}>Photo Journal</p>
          <h2 id="photo-journal-title">More moments.<br /><em>Still unfolding.</em></h2>
          <p>New photographs from Ignited Brains learning spaces, workshops, exhibitions and student experiences.</p>
        </div>
        {state === "ready" && categories.length > 1 && <div className={styles.galleryFilters} role="group" aria-label="Filter photo journal by category">
          {["All", ...categories].map(category => <button key={category} type="button" aria-pressed={active === category} onClick={() => setActive(category)}>{category}</button>)}
        </div>}
      </div>

      {state === "loading" ? <div className={styles.galleryLoading} role="status">Loading photo journal…</div> :
        <div className={styles.galleryJournalGrid}>
          {visible.map((item, index) => <figure key={item.id} className={index % 7 === 0 ? styles.galleryJournalLead : undefined}>
            <button
              type="button"
              className={styles.galleryJournalPhoto}
              data-photo={`gallery:${item.id}`}
              data-photo-src={item.image}
              data-photo-alt={item.altText}
              data-photo-caption={item.caption || item.title}
              data-photo-width={item.width}
              data-photo-height={item.height}
              aria-label={`Open photograph: ${item.caption || item.title}`}
              aria-haspopup="dialog"
            >
              <Image src={item.image} alt={item.altText} fill sizes={index % 7 === 0 ? "(max-width: 767px) 92vw, 48vw" : "(max-width: 767px) 46vw, 24vw"} unoptimized />
              <span className={styles.galleryJournalExpand} aria-hidden="true">↗</span>
            </button>
            <figcaption>
              <span>{item.category}{item.location ? ` · ${item.location}` : ""}</span>
              <h3>{item.title}</h3>
              {item.caption && <p>{item.caption}</p>}
            </figcaption>
          </figure>)}
        </div>}
    </div>
  </section>;
}
