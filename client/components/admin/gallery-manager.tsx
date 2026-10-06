"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { PortalIcon } from "@/components/ui/portal-icon";
import { AdminDialog, Badge, LoadState, PaginationBar, StatCard } from "./admin-primitives";
import { emptyPagination, errorMessage, type AdminApi, type Summary } from "./admin-types";
import styles from "./admin-dashboard.module.css";

type GalleryStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";
type GalleryItem = {
  id: string;
  mediaId: string;
  image: string;
  width: number;
  height: number;
  title: string;
  caption: string;
  altText: string;
  category: string;
  location: string | null;
  eventDate: string | null;
  displayOrder: number;
  isFeatured: boolean;
  status: GalleryStatus;
  version: number;
  archivedAt: string | null;
  createdAt: string;
  updatedAt: string;
};
type GalleryList = {
  data: GalleryItem[];
  categories: string[];
  pagination: typeof emptyPagination;
};
type UploadResult = { mediaId: string; url: string; width: number; height: number; bytes: number };

const defaultCategories = ["Space Lab", "STEM Lab", "AI & Robotics", "Science Park", "Students", "Events", "Workshops", "Exhibitions", "Community", "Other"];

export function GalleryManager({
  api,
  refresh,
  summary,
  onChanged,
}: {
  api: AdminApi;
  refresh: number;
  summary?: Summary["gallery"];
  onChanged: (message: string) => void;
}) {
  const [filters, setFilters] = useState({ query: "", status: "", category: "", page: 1 });
  const params = new URLSearchParams({ page: String(filters.page), limit: "12", sort: "order" });
  for (const key of ["query", "status", "category"] as const) if (filters[key].trim()) params.set(key, filters[key].trim());
  const request = params.toString();
  const key = request + ":" + refresh;
  const [result, setResult] = useState<{ key: string; list: GalleryList; error: string }>({
    key: "",
    list: { data: [], categories: [], pagination: emptyPagination },
    error: "",
  });
  const [retry, setRetry] = useState(0);
  const [editor, setEditor] = useState<GalleryItem | null | "new">(null);
  const [removing, setRemoving] = useState<GalleryItem | null>(null);
  const [actionBusy, setActionBusy] = useState(false);
  const [actionError, setActionError] = useState("");
  const busy = result.key !== key;

  useEffect(() => {
    const controller = new AbortController();
    const timer = setTimeout(() => {
      void api<GalleryList>(`/api/v1/admin/gallery?${request}`, { signal: controller.signal })
        .then(list => {
          if (controller.signal.aborted) return;
          setResult({ key, list, error: "" });
          if (list.pagination.totalPages && filters.page > list.pagination.totalPages) {
            setFilters(previous => ({ ...previous, page: list.pagination.totalPages }));
          }
        })
        .catch(error => {
          if (!controller.signal.aborted) setResult(previous => ({ ...previous, key, error: errorMessage(error) }));
        });
    }, 220);
    return () => { clearTimeout(timer); controller.abort(); };
  }, [api, request, key, retry, filters.page]);

  function change(field: "query" | "status" | "category", value: string) {
    setFilters(previous => ({ ...previous, [field]: value, page: 1 }));
  }

  async function archiveOrRestore() {
    if (!removing || actionBusy) return;
    setActionBusy(true);
    setActionError("");
    const restoring = removing.status === "ARCHIVED";
    try {
      await api(`/api/v1/admin/gallery/${removing.id}/${restoring ? "restore" : "archive"}`, {
        method: "POST",
        body: JSON.stringify({ version: removing.version }),
      });
      setRemoving(null);
      onChanged(restoring ? "Gallery image restored as a draft." : "Gallery image archived and removed from the public Media page.");
    } catch (error) {
      setActionError(errorMessage(error));
    } finally {
      setActionBusy(false);
    }
  }

  const categories = [...new Set([...defaultCategories, ...result.list.categories])].sort((a, b) => a.localeCompare(b));

  return <section aria-label="Gallery management">
    <div className={`${styles.statGrid} ${styles.galleryStats}`}>
      <StatCard label="Total photos" value={summary?.total} helper={summary ? `${summary.archived} archived` : "Loading gallery"} icon="image" />
      <StatCard label="Published" value={summary?.published} helper="Visible in the Media photo journal" icon="eye" accent="green" />
      <StatCard label="Drafts" value={summary?.drafts} helper="Not visible publicly" icon="clock" accent="purple" />
      <StatCard label="Featured" value={summary?.featured} helper="Highlighted published photos" icon="check" accent="blue" />
    </div>

    <div className={styles.filterBar}>
      <label className={styles.search}>
        <span>Search gallery</span>
        <PortalIcon name="search" />
        <input type="search" value={filters.query} maxLength={200} placeholder="Title, caption, category or location…" onChange={event => change("query", event.target.value)} />
      </label>
      <label>
        <span>Status</span>
        <select aria-label="Gallery status" value={filters.status} onChange={event => change("status", event.target.value)}>
          <option value="">All statuses</option>
          <option value="PUBLISHED">Published</option>
          <option value="DRAFT">Draft</option>
          <option value="ARCHIVED">Archived</option>
        </select>
      </label>
      <label>
        <span>Category</span>
        <select aria-label="Gallery category" value={filters.category} onChange={event => change("category", event.target.value)}>
          <option value="">All categories</option>
          {result.list.categories.map(category => <option key={category} value={category}>{category}</option>)}
        </select>
      </label>
      <button type="button" className={styles.primary} onClick={() => setEditor("new")}><PortalIcon name="plus" />Add Photo</button>
    </div>

    <div className={styles.galleryPanel} aria-busy={busy}>
      {busy || result.error || !result.list.data.length ? (
        <LoadState busy={busy} error={result.error} empty="No gallery photos match these filters. Add a photograph to start the Media photo journal." onRetry={() => setRetry(value => value + 1)} />
      ) : (
        <div className={styles.galleryGrid}>
          {result.list.data.map(item => <article key={item.id} className={styles.galleryCard}>
            <button type="button" className={styles.galleryCardImage} onClick={() => setEditor(item)} aria-label={`Edit ${item.title}`}>
              <Image src={item.image} alt={item.altText || ""} fill sizes="(max-width: 639px) 92vw, (max-width: 1100px) 42vw, 260px" unoptimized />
              {item.isFeatured && <span className={styles.featuredFlag}>Featured</span>}
              <span className={styles.galleryOrder}>#{item.displayOrder}</span>
            </button>
            <div className={styles.galleryCardBody}>
              <div className={styles.galleryCardHeading}>
                <div><strong>{item.title}</strong><p>{item.category}{item.location ? ` · ${item.location}` : ""}</p></div>
                <Badge value={item.status} />
              </div>
              <p className={styles.galleryCaption}>{item.caption || item.altText}</p>
              <div className={styles.galleryCardActions}>
                <button type="button" className={styles.secondary} onClick={() => setEditor(item)}><PortalIcon name="edit" />Edit</button>
                <a className={styles.secondary} href={item.image} target="_blank" rel="noopener noreferrer"><PortalIcon name="eye" />Preview</a>
                <button type="button" className={item.status === "ARCHIVED" ? styles.secondary : styles.dangerGhost} onClick={() => { setActionError(""); setRemoving(item); }}>
                  <PortalIcon name={item.status === "ARCHIVED" ? "refresh" : "archive"} />{item.status === "ARCHIVED" ? "Restore" : "Archive"}
                </button>
              </div>
            </div>
          </article>)}
        </div>
      )}
      {!busy && !result.error && <PaginationBar value={result.list.pagination} noun="photos" onPage={page => setFilters(previous => ({ ...previous, page }))} />}
    </div>

    <p className={styles.sectionNote}>Published photos appear in the Media page Photo Journal. Lower display-order numbers appear first. Archived photos stay stored but disappear publicly.</p>

    {editor && <GalleryEditor
      key={editor === "new" ? "new" : editor.id}
      initial={editor === "new" ? null : editor}
      categories={categories}
      api={api}
      onClose={() => setEditor(null)}
      onSaved={(message) => { setEditor(null); onChanged(message); }}
    />}

    {removing && <AdminDialog compact title={removing.status === "ARCHIVED" ? "Restore Photo?" : "Archive Photo?"} busy={actionBusy} onClose={() => setRemoving(null)}>
      <div className={styles.dialogBody}>
        <p>{removing.status === "ARCHIVED" ? "Restore" : "Archive"} <strong>“{removing.title}”</strong>?</p>
        <p>{removing.status === "ARCHIVED" ? "It will return as a draft so you can review it before publishing." : "It will disappear from the public Media page, but the image and metadata will be retained."}</p>
        {actionError && <p className={styles.error} role="alert">{actionError}</p>}
      </div>
      <div className={styles.dialogFooter}>
        <button type="button" className={styles.secondary} onClick={() => setRemoving(null)} disabled={actionBusy}>Cancel</button>
        <button type="button" className={removing.status === "ARCHIVED" ? styles.primary : styles.danger} onClick={() => void archiveOrRestore()} disabled={actionBusy}>
          {actionBusy ? "Saving…" : removing.status === "ARCHIVED" ? "Restore Photo" : "Archive Photo"}
        </button>
      </div>
    </AdminDialog>}
  </section>;
}

function GalleryEditor({
  initial,
  categories,
  api,
  onClose,
  onSaved,
}: {
  initial: GalleryItem | null;
  categories: string[];
  api: AdminApi;
  onClose: () => void;
  onSaved: (message: string) => void;
}) {
  const [form, setForm] = useState({
    mediaId: initial?.mediaId || "",
    image: initial?.image || "",
    width: initial?.width || 0,
    height: initial?.height || 0,
    title: initial?.title || "",
    caption: initial?.caption || "",
    altText: initial?.altText || "",
    category: initial?.category || "Other",
    location: initial?.location || "",
    eventDate: initial?.eventDate ? String(initial.eventDate).slice(0, 10) : "",
    displayOrder: initial?.displayOrder ?? 0,
    isFeatured: initial?.isFeatured || false,
    status: (initial?.status === "ARCHIVED" ? "DRAFT" : initial?.status || "DRAFT") as "DRAFT" | "PUBLISHED",
  });
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const pending = useRef(false);

  function update<K extends keyof typeof form>(key: K, value: typeof form[K]) {
    setForm(previous => ({ ...previous, [key]: value }));
    setError("");
  }

  async function upload(file: File | undefined) {
    if (!file || uploading) return;
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setError("Use a JPG, PNG or WebP image.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be 5 MB or smaller.");
      return;
    }
    setUploading(true);
    setError("");
    try {
      const response = await api<{ data: UploadResult }>("/api/v1/admin/gallery-media", {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: await file.arrayBuffer(),
      });
      setForm(previous => ({
        ...previous,
        mediaId: response.data.mediaId,
        image: response.data.url,
        width: response.data.width,
        height: response.data.height,
        altText: previous.altText || file.name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " "),
      }));
    } catch (uploadError) {
      setError(errorMessage(uploadError));
    } finally {
      setUploading(false);
    }
  }

  async function save() {
    if (pending.current || busy) return;
    if (!form.mediaId) { setError("Upload a photograph first."); return; }
    if (!form.title.trim()) { setError("Add a title."); return; }
    if (form.status === "PUBLISHED" && !form.altText.trim()) { setError("Published photographs need descriptive alt text."); return; }

    pending.current = true;
    setBusy(true);
    setError("");
    try {
      const body = {
        mediaId: form.mediaId,
        title: form.title.trim(),
        caption: form.caption.trim(),
        altText: form.altText.trim(),
        category: form.category.trim() || "Other",
        location: form.location.trim(),
        eventDate: form.eventDate || null,
        displayOrder: Number(form.displayOrder),
        isFeatured: form.isFeatured,
        status: form.status,
        ...(initial ? { version: initial.version } : {}),
      };
      await api(initial ? `/api/v1/admin/gallery/${initial.id}` : "/api/v1/admin/gallery", {
        method: initial ? "PATCH" : "POST",
        body: JSON.stringify(body),
      });
      onSaved(form.status === "PUBLISHED" ? "Gallery photo saved and published." : "Gallery photo saved as a draft.");
    } catch (saveError) {
      setError(errorMessage(saveError));
    } finally {
      pending.current = false;
      setBusy(false);
    }
  }

  return <AdminDialog title={initial ? "Edit Gallery Photo" : "Add Gallery Photo"} busy={busy || uploading} onClose={onClose}>
    <div className={styles.drawerForm}>
      <div className={styles.dialogBody}>
        {form.image ? <div className={styles.galleryEditorPreview}>
          <Image src={form.image} alt={form.altText || ""} fill sizes="600px" unoptimized />
        </div> : null}

        <label className={styles.upload}>
          <PortalIcon name="image" />
          <div><strong>{form.image ? "Replace image" : "Upload photograph"}</strong><small>JPG, PNG or WebP · max 5 MB · optimized automatically</small></div>
          <input type="file" accept="image/jpeg,image/png,image/webp" disabled={busy || uploading} onChange={event => void upload(event.target.files?.[0])} />
        </label>

        <div className={styles.formGrid}>
          <label className={styles.field}><span>Title <em>*</em></span><input value={form.title} maxLength={180} onChange={event => update("title", event.target.value)} placeholder="Space Lab workshop" /></label>
          <label className={styles.field}><span>Category</span><input list="gallery-categories" value={form.category} maxLength={100} onChange={event => update("category", event.target.value)} /><datalist id="gallery-categories">{categories.map(category => <option key={category} value={category} />)}</datalist></label>
          <label className={styles.field}><span>Location</span><input value={form.location} maxLength={180} onChange={event => update("location", event.target.value)} placeholder="Lucknow, Uttar Pradesh" /></label>
          <label className={styles.field}><span>Event date</span><input type="date" value={form.eventDate} onChange={event => update("eventDate", event.target.value)} /></label>
          <label className={styles.field}><span>Display order</span><input type="number" min={0} max={1000000} step={1} value={form.displayOrder} onChange={event => update("displayOrder", Number(event.target.value || 0))} /><small>Lower numbers appear first.</small></label>
          <label className={styles.field}><span>Status</span><select value={form.status} onChange={event => update("status", event.target.value as "DRAFT" | "PUBLISHED")}><option value="DRAFT">Draft</option><option value="PUBLISHED">Published</option></select></label>
        </div>

        <label className={styles.field}><span>Image description / Alt text <em>*</em></span><textarea value={form.altText} maxLength={300} rows={3} onChange={event => update("altText", event.target.value)} placeholder="Describe what is visibly happening in the photograph." /></label>
        <label className={styles.field}><span>Caption</span><textarea value={form.caption} maxLength={500} rows={3} onChange={event => update("caption", event.target.value)} placeholder="Optional public caption shown below the photograph." /></label>
        <label className={styles.galleryCheck}><input type="checkbox" checked={form.isFeatured} onChange={event => update("isFeatured", event.target.checked)} /><span><strong>Featured photo</strong><small>Marks this photograph for highlighted gallery placements.</small></span></label>

        {error && <p className={styles.error} role="alert">{error}</p>}
      </div>
      <div className={styles.dialogFooter}>
        <button type="button" className={styles.secondary} onClick={onClose} disabled={busy || uploading}>Cancel</button>
        <button type="button" className={styles.primary} onClick={() => void save()} disabled={busy || uploading}>{uploading ? "Optimizing image…" : busy ? "Saving…" : "Save Photo"}<PortalIcon name="check" /></button>
      </div>
    </div>
  </AdminDialog>;
}
