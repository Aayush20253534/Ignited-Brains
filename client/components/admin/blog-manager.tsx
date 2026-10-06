"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { PortalIcon } from "@/components/ui/portal-icon";
import { formatBlogDate, imageIsUpload, type AdminBlogList, type BlogPost, type BlogPostSummary } from "@/lib/blog";
import { AdminDialog, Badge, LoadState, PaginationBar, StatCard } from "./admin-primitives";
import { emptyPagination, errorMessage, type AdminApi, type Summary } from "./admin-types";
import { BlogEditor } from "./blog-editor";
import styles from "./admin-dashboard.module.css";

export function BlogManager({ api, refresh, summary, onChanged }: { api: AdminApi; refresh: number; summary?: Summary["blogs"]; onChanged: (message: string) => void }) {
  const [filters, setFilters] = useState({ query: "", status: "", category: "", page: 1 });
  const params = new URLSearchParams({ page: String(filters.page), limit: "5" });
  for (const key of ["query", "status", "category"] as const) if (filters[key].trim()) params.set(key, filters[key].trim());
  const request = params.toString(), key = `${request}:${refresh}`;
  const [result, setResult] = useState<{ key: string; list: AdminBlogList; error: string }>({ key: "", list: { data: [], categories: [], pagination: emptyPagination }, error: "" });
  const [retry, setRetry] = useState(0);
  const [editor, setEditor] = useState<{ id?: string; preview: boolean } | null>(null);
  const [removing, setRemoving] = useState<BlogPostSummary | null>(null);
  const [archiveBusy, setArchiveBusy] = useState(false);
  const [archiveError, setArchiveError] = useState("");
  const pending = useRef(false);
  const busy = result.key !== key;
  useEffect(() => {
    const controller = new AbortController();
    const timer = setTimeout(() => {
      void api<AdminBlogList>(`/api/v1/admin/blogs?${request}`, { signal: controller.signal })
        .then(list => { if (!controller.signal.aborted) { setResult({ key, list, error: "" }); if (list.pagination.totalPages && filters.page > list.pagination.totalPages) setFilters(previous => ({ ...previous, page: list.pagination.totalPages })); } })
        .catch(error => { if (!controller.signal.aborted) setResult(previous => ({ ...previous, key, error: errorMessage(error) })); });
    }, 250);
    return () => { clearTimeout(timer); controller.abort(); };
  }, [api, request, key, retry, filters.page]);
  function change(field: "query" | "status" | "category", value: string) { setFilters(previous => ({ ...previous, [field]: value, page: 1 })); }
  async function archive() {
    if (!removing || pending.current) return;
    pending.current = true; setArchiveBusy(true); setArchiveError("");
    try { await api(`/api/v1/admin/blogs/${removing.id}/archive`, { method: "POST", body: JSON.stringify({ version: removing.version }) }); setRemoving(null); onChanged("Blog archived. Its record and analytics are retained."); }
    catch (error) { setArchiveError(errorMessage(error)); } finally { pending.current = false; setArchiveBusy(false); }
  }
  function saved(post: BlogPost) { setEditor(null); onChanged(post.status === "PUBLISHED" ? "Blog saved and published." : "Blog saved as a draft."); }
  return <section aria-label="Blog management records">
    <div className={`${styles.statGrid} ${styles.blogStats}`}><StatCard label="Total blogs" value={summary?.total} helper={summary ? `${summary.archived} archived` : "Loading blogs"} icon="document" /><StatCard label="Published" value={summary?.published} helper="Visible on your website" icon="check" accent="green" /><StatCard label="Drafts" value={summary?.drafts} helper="Ready to keep working on" icon="clock" accent="purple" /><StatCard label="Article views" value={summary?.views} helper="Articles opened by visitors" icon="eye" accent="blue" /><StatCard label="Impressions" value={summary?.impressions} helper="Cards seen by visitors" icon="chart" accent="green" /></div>
    <div className={styles.filterBar}><label className={styles.search}><span>Search blogs</span><PortalIcon name="search" /><input type="search" value={filters.query} maxLength={200} placeholder="Search by title, content or tags…" onChange={event => change("query", event.target.value)} /></label><label><span>Publication status</span><select aria-label="Publication status" value={filters.status} onChange={event => change("status", event.target.value)}><option value="">All statuses</option><option value="PUBLISHED">Published</option><option value="DRAFT">Draft</option><option value="ARCHIVED">Archived</option></select></label><label><span>Category</span><select aria-label="Category" value={filters.category} onChange={event => change("category", event.target.value)}><option value="">All categories</option>{result.list.categories.map(category => <option value={category} key={category}>{category}</option>)}</select></label><button type="button" className={styles.primary} onClick={() => setEditor({ preview: false })}><PortalIcon name="plus" />Add New Blog</button></div>
    <div className={styles.panel} aria-busy={busy}>
      {busy || result.error || !result.list.data.length ? <LoadState busy={busy} error={result.error} empty="No blogs match these filters. Create a blog or try another search." onRetry={() => setRetry(value => value + 1)} /> : <div className={styles.tableWrap}><table className={styles.table}><caption className="sr-only">All database-backed blogs, including migrated articles</caption><thead><tr><th scope="col">Blog details</th><th scope="col">Category</th><th scope="col">Status</th><th scope="col">Impressions</th><th scope="col">Views</th><th scope="col">Published on</th><th scope="col">Actions</th></tr></thead><tbody>{result.list.data.map(post => <tr key={post.id}>
        <td><div className={styles.blogCell}><span className={styles.blogThumbnail}>{post.image ? <Image src={post.image} alt="" fill sizes="66px" unoptimized={imageIsUpload(post.image)} /> : <PortalIcon name="image" />}</span><div><strong>{post.title}</strong><p>{post.excerpt || "Draft in progress"}</p></div></div></td><td><span className={`${styles.badge} ${styles.blue}`}>{post.category || "Uncategorised"}</span></td><td><Badge value={post.status} /></td><td className={styles.metric}>{post.impressions.toLocaleString("en-IN")}</td><td className={styles.metric}>{post.views.toLocaleString("en-IN")}</td><td>{formatBlogDate(post.publishedAt)}</td><td><div className={styles.rowActions}><button type="button" className={styles.iconButton} aria-label={`${post.status === "ARCHIVED" ? "Restore" : "Edit"} ${post.title}`} onClick={() => setEditor({ id: post.id, preview: false })}><PortalIcon name="edit" /></button>{post.status !== "ARCHIVED" && <button type="button" className={`${styles.iconButton} ${styles.removeButton}`} aria-label={`Remove ${post.title}`} onClick={() => { setArchiveError(""); setRemoving(post); }}><PortalIcon name="archive" /></button>}<button type="button" className={styles.iconButton} aria-label={`Preview ${post.title}`} onClick={() => setEditor({ id: post.id, preview: true })}><PortalIcon name="eye" /></button></div></td>
      </tr>)}</tbody></table></div>}
      {!busy && !result.error && <PaginationBar value={result.list.pagination} noun="blogs" onPage={page => setFilters(previous => ({ ...previous, page }))} />}
    </div><p className={styles.sectionNote}>Impressions count cards at least 50% visible for one second. Views count article opens. Each is counted once per anonymous browser session per day, including visits from related articles.</p>
    {editor && <BlogEditor key={editor.id || "new"} id={editor.id} previewInitially={editor.preview} categories={result.list.categories} api={api} onClose={() => setEditor(null)} onSaved={saved} />}
    {removing && <AdminDialog compact title="Remove Blog?" busy={archiveBusy} onClose={() => setRemoving(null)}><div className={styles.dialogBody}><p>Remove <strong>“{removing.title}”</strong>?</p><p>This article will no longer be visible on the public website. Its record, content and analytics will be retained. You can restore it from Archived blogs.</p>{archiveError && <p className={styles.error} role="alert">{archiveError}</p>}</div><div className={styles.dialogFooter}><button type="button" className={styles.secondary} onClick={() => setRemoving(null)} disabled={archiveBusy}>Cancel</button><button type="button" className={styles.danger} onClick={() => void archive()} disabled={archiveBusy}>{archiveBusy ? "Removing…" : "Remove Blog"}</button></div></AdminDialog>}
  </section>;
}
