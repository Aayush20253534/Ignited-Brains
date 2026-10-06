"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { imageIsUpload, type BlogList } from "@/lib/blog";
import { PostCard, PostMeta } from "./post-card";
import { BlogExposure } from "./blog-exposure";
import styles from "./blog.module.css";

export function BlogBrowser({ initial }: { initial: BlogList }) {
  const [category, setCategory] = useState("");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [refresh, setRefresh] = useState(0);
  const params = new URLSearchParams({ page: String(page), limit: "12" });
  if (category) params.set("category", category);
  if (query.trim()) params.set("query", query.trim());
  const requestKey = params.toString();
  const [result, setResult] = useState({ key: "page=1&limit=12", list: initial, error: "" });
  const loading = result.key !== requestKey;
  useEffect(() => {
    const controller = new AbortController();
    const timer = setTimeout(() => {
      void fetch(`/api/v1/blogs?${requestKey}`, { cache: "no-store", signal: controller.signal })
        .then(async response => { if (!response.ok) throw new Error("Unable to load articles. Please try again."); return response.json() as Promise<BlogList>; })
        .then(list => { if (!controller.signal.aborted) setResult({ key: requestKey, list, error: "" }); })
        .catch(error => { if (!controller.signal.aborted) setResult(previous => ({ ...previous, key: requestKey, error: error instanceof Error ? error.message : "Unable to load articles." })); });
    }, 250);
    return () => { clearTimeout(timer); controller.abort(); };
  }, [requestKey, refresh]);
  const { list, error } = result;
  const browsing = page === 1 && !category && !query.trim();
  const featured = browsing ? list.data[0] : null;
  const visible = featured ? list.data.slice(1) : list.data;
  return <section id="articles" className={styles.browse} aria-labelledby="articles-title">
    <div className={styles.container}>
      <div className={styles.browseHeading}><div><p className={styles.eyebrow}>The learning journal</p><h2 id="articles-title">Ideas to put <em>into practice.</em></h2></div><p>For educators, school leaders and curious learners.</p></div>
      <div className={styles.controls}>
        <div className={styles.filters} role="group" aria-label="Filter articles by topic">
          {["", ...list.categories].map(item => <button type="button" key={item} aria-pressed={category === item} aria-controls="blog-results" onClick={() => { setCategory(item); setPage(1); }}>{item || "All"}</button>)}
        </div>
        <label className={styles.search}><span className={styles.srOnly}>Search articles</span><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="10" cy="10" r="6.5" stroke="currentColor" strokeWidth="1.6" /><path d="m15 15 5 5" stroke="currentColor" strokeWidth="1.6" /></svg><input type="search" placeholder="Find an idea" value={query} maxLength={200} onChange={event => { setQuery(event.target.value); setPage(1); }} /></label>
      </div>
      <div id="blog-results" aria-busy={loading}>
        <p className={styles.srOnly} role="status">{loading ? "Loading articles." : `${list.pagination.total} articles found. Page ${page}.`}</p>
        {error ? <div className={styles.empty} role="alert"><h3>Articles could not be loaded.</h3><p>{error}</p><button type="button" className={styles.primaryButton} onClick={() => setRefresh(value => value + 1)}>Try again</button></div>
          : loading ? <p className={styles.empty}>Loading the journal…</p> : <>
            {featured && <BlogExposure id={featured.id}><article className={styles.featured}>
              <div className={styles.featuredCopy}><p className={styles.featureLabel}>Featured article <span aria-hidden="true">/ 01</span></p><p className={styles.category}>{featured.category}</p><h2><Link href={`/blog/${featured.slug}`}>{featured.title}</Link></h2><p className={styles.featuredExcerpt}>{featured.excerpt}</p><PostMeta post={featured} /><Link href={`/blog/${featured.slug}`} className={styles.primaryButton}>Read the article <span aria-hidden="true">→</span></Link></div>
              <Link href={`/blog/${featured.slug}`} className={styles.featuredImage} aria-label={`Read: ${featured.title}`} tabIndex={-1}><Image src={featured.image} alt={featured.imageAlt} fill preload unoptimized={imageIsUpload(featured.image)} sizes="(max-width: 767px) 90vw, 55vw" /></Link>
            </article></BlogExposure>}
            {!!visible.length && <div className={styles.grid}>{visible.map(post => <PostCard post={post} key={post.id} />)}</div>}
            {!list.data.length && <div className={styles.empty}><h3>{query || category ? "No articles match this search." : "New ideas are on their way."}</h3><p>{query || category ? "Try a broader topic or clear the filters to browse the journal." : "Visit again for new stories from the learning journal."}</p>{(query || category) && <button type="button" className={styles.primaryButton} onClick={() => { setQuery(""); setCategory(""); setPage(1); }}>Clear search and filters</button>}</div>}
          </>}
      </div>
      {list.pagination.totalPages > 1 && <nav className={styles.pagination} aria-label="Article pages"><button type="button" disabled={page <= 1 || loading} onClick={() => setPage(value => value - 1)}>Previous</button><span>Page {page} of {list.pagination.totalPages}</span><button type="button" disabled={page >= list.pagination.totalPages || loading} onClick={() => setPage(value => value + 1)}>Next</button></nav>}
    </div>
  </section>;
}
