"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { BlogPostSummary } from "@/lib/blog";
import { PostCard, PostMeta } from "./post-card";
import styles from "./blog.module.css";

export function BlogBrowser({ posts }: { posts: BlogPostSummary[] }) {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const categories = ["All", ...new Set(posts.map(post => post.category))];
  const normalized = query.trim().toLowerCase();
  const browsing = category === "All" && !normalized;
  const featured = posts[0];
  const visible = posts.filter((post, index) =>
    (!browsing || index !== 0) &&
    (category === "All" || post.category === category) &&
    (!normalized || `${post.title} ${post.excerpt} ${post.category}`.toLowerCase().includes(normalized)),
  );

  return <section id="articles" className={styles.browse} aria-labelledby="articles-title">
    <div className={styles.container}>
      <div className={styles.browseHeading}><div><p className={styles.eyebrow}>The learning journal</p><h2 id="articles-title">Ideas to put <em>into practice.</em></h2></div><p>For educators, school leaders and curious learners.</p></div>
      <div className={styles.controls}>
        <div className={styles.filters} role="group" aria-label="Filter articles by topic">
          {categories.map(item => <button type="button" key={item} aria-pressed={category === item} aria-controls="blog-results" onClick={() => setCategory(item)}>{item}</button>)}
        </div>
        <label className={styles.search}>
          <span className={styles.srOnly}>Search articles</span>
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="10" cy="10" r="6.5" stroke="currentColor" strokeWidth="1.6" /><path d="m15 15 5 5" stroke="currentColor" strokeWidth="1.6" /></svg>
          <input type="search" placeholder="Find an idea" value={query} onChange={event => setQuery(event.target.value)} />
        </label>
      </div>
      <div id="blog-results">
        <p className={styles.srOnly} role="status">{visible.length + (browsing ? 1 : 0)} articles shown.</p>
        {browsing && featured && <article className={styles.featured}>
          <div className={styles.featuredCopy}>
            <p className={styles.featureLabel}>Featured article <span aria-hidden="true">/ 01</span></p>
            <p className={styles.category}>{featured.category}</p>
            <h2><Link href={`/blog/${featured.slug}`}>{featured.title}</Link></h2>
            <p className={styles.featuredExcerpt}>{featured.excerpt}</p>
            <PostMeta post={featured} />
            <Link href={`/blog/${featured.slug}`} className={styles.primaryButton}>Read the article <span aria-hidden="true">→</span></Link>
          </div>
          <Link href={`/blog/${featured.slug}`} className={styles.featuredImage} aria-label={`Read: ${featured.title}`} tabIndex={-1}>
            <Image src={featured.image} alt={featured.alt} fill preload sizes="(max-width: 767px) 90vw, 55vw" />
          </Link>
        </article>}
        {!!visible.length && <div className={styles.grid}>{visible.map(post => <PostCard post={post} key={post.slug} />)}</div>}
        {!visible.length && <div className={styles.empty}>
          <h3>No articles match this search.</h3><p>Try a broader topic or clear the filters to browse the journal.</p>
          <button type="button" className={styles.primaryButton} onClick={() => { setQuery(""); setCategory("All"); }}>Clear search and filters <span aria-hidden="true">↗</span></button>
        </div>}
      </div>
    </div>
  </section>;
}
