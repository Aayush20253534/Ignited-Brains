"use client";
import Image from "next/image";
import { type FormEvent, useEffect, useRef, useState } from "react";
import { ArticleContent } from "@/components/blog/article-content";
import { PortalIcon } from "@/components/ui/portal-icon";
import { formatBlogDate, imageIsUpload, type BlogForm, type BlogPost } from "@/lib/blog";
import { siteConfig } from "@/lib/site";
import { AdminDialog, Badge, LoadState } from "./admin-primitives";
import { errorMessage, type AdminApi } from "./admin-types";
import styles from "./admin-dashboard.module.css";

const blank: BlogForm = { title: "", slug: "", excerpt: "", content: "", category: "", tags: [], image: "", imageAlt: "", imageCaption: "", author: "Ignited Brains", seoTitle: "", seoDescription: "", status: "DRAFT", publishedAt: null };
function formFrom(post: BlogPost): BlogForm { return { title: post.title, slug: post.slug, excerpt: post.excerpt, content: post.content, category: post.category, tags: post.tags, image: post.image, imageAlt: post.imageAlt, imageCaption: post.imageCaption, author: post.author, seoTitle: post.seoTitle, seoDescription: post.seoDescription, status: post.status === "ARCHIVED" ? "DRAFT" : post.status, publishedAt: post.publishedAt }; }
function slugify(title: string) { return title.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 120).replace(/-$/, ""); }
function localDate(date: string | null) { return date ? new Intl.DateTimeFormat("en-CA", { year: "numeric", month: "2-digit", day: "2-digit", timeZone: "Asia/Kolkata" }).format(new Date(date)) : ""; }

export function BlogEditor({ id, previewInitially = false, categories, api, onClose, onSaved }: { id?: string; previewInitially?: boolean; categories: string[]; api: AdminApi; onClose: () => void; onSaved: (post: BlogPost) => void }) {
  const [form, setForm] = useState<BlogForm>(blank);
  const [tags, setTags] = useState("");
  const [assets, setAssets] = useState<string[]>([]);
  const [preview, setPreview] = useState(previewInitially);
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [retry, setRetry] = useState(0);
  const [loaded, setLoaded] = useState(!id);
  const [record, setRecord] = useState<BlogPost | null>(null);
  const signature = useRef(JSON.stringify(blank));
  const slugTouched = useRef(Boolean(id));
  const contentInput = useRef<HTMLTextAreaElement>(null);
  const formElement = useRef<HTMLFormElement>(null);
  const pending = useRef(false);
  const uploadPending = useRef(false);
  useEffect(() => {
    const controller = new AbortController();
    void Promise.all([api<{ data: string[] }>("/api/v1/admin/blog-assets", { signal: controller.signal }), id ? api<{ data: BlogPost }>(`/api/v1/admin/blogs/${id}`, { signal: controller.signal }) : Promise.resolve(null)])
      .then(([images, result]) => {
        if (controller.signal.aborted) return;
        setAssets(images.data); setError("");
        if (result) { setRecord(result.data); const value = formFrom(result.data); setForm(value); setTags(value.tags.join(", ")); signature.current = JSON.stringify(value); }
        setLoaded(true);
      }).catch(error => { if (!controller.signal.aborted) setError(errorMessage(error)); });
    return () => controller.abort();
  }, [api, id, retry]);
  const parsedTags = [...new Set(tags.split(",").map(tag => tag.trim()).filter(Boolean))];
  function close() {
    const dirty = JSON.stringify({ ...form, tags: parsedTags }) !== signature.current;
    if (!busy && !uploading && (!dirty || window.confirm("Discard your unsaved blog changes?"))) onClose();
  }
  function change<K extends keyof BlogForm>(key: K, value: BlogForm[K]) { setForm(previous => ({ ...previous, [key]: value })); }
  function insert(before: string, after = "", placeholder = "text") {
    const input = contentInput.current;
    if (!input) return;
    const start = input.selectionStart, end = input.selectionEnd;
    const selection = form.content.slice(start, end) || placeholder;
    change("content", form.content.slice(0, start) + before + selection + after + form.content.slice(end));
    requestAnimationFrame(() => { input.focus(); input.setSelectionRange(start + before.length, start + before.length + selection.length); });
  }
  async function upload(file: File | undefined) {
    if (!file || uploadPending.current) return;
    setError("");
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type) || file.size > 5 * 1024 * 1024) { setError("Choose a JPG, PNG or WebP image up to 5 MB."); return; }
    uploadPending.current = true; setUploading(true);
    try {
      const result = await api<{ data: { url: string } }>("/api/v1/admin/blog-media", { method: "POST", headers: { "Content-Type": file.type }, body: file });
      change("image", result.data.url);
    } catch (error) { setError(errorMessage(error)); } finally { uploadPending.current = false; setUploading(false); }
  }
  async function save(status: "DRAFT" | "PUBLISHED") {
    if (pending.current || uploading) return;
    setError("");
    const required = status === "PUBLISHED" ? ["title", "slug", "category", "image", "imageAlt", "excerpt", "content"] as const : ["title", "slug"] as const;
    const missing = required.find(field => !form[field].trim());
    if (missing) { setError(`Complete the ${missing === "image" ? "featured image" : missing === "imageAlt" ? "image description" : missing} before saving.`); if (preview) setPreview(false); requestAnimationFrame(() => formElement.current?.querySelector<HTMLElement>(`[name="${missing}"]`)?.focus()); return; }
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(form.slug)) { setError("Use lowercase letters, numbers and single hyphens in the slug."); return; }
    if (parsedTags.length > 20 || parsedTags.some(tag => tag.length > 60)) { setError("Use up to 20 tags, each at most 60 characters."); return; }
    pending.current = true; setBusy(true);
    try {
      const result = await api<{ data: BlogPost }>(id ? `/api/v1/admin/blogs/${id}` : "/api/v1/admin/blogs", { method: id ? "PATCH" : "POST", body: JSON.stringify({ ...form, tags: parsedTags, status, ...(id ? { version: record?.version } : {}) }) });
      onSaved(result.data);
    } catch (error) { setError(errorMessage(error)); } finally { pending.current = false; setBusy(false); }
  }
  function submit(event: FormEvent) { event.preventDefault(); void save(form.status === "PUBLISHED" ? "PUBLISHED" : "DRAFT"); }
  return <AdminDialog title={id ? preview ? "Blog Preview" : record?.status === "ARCHIVED" ? "Restore Blog" : "Edit Blog" : "Add New Blog"} onClose={close} busy={busy || uploading}>
    {!loaded ? <div className={styles.dialogBody}><LoadState busy={!error} error={error} onRetry={() => setRetry(value => value + 1)} /></div> : <form ref={formElement} className={styles.drawerForm} onSubmit={submit} noValidate aria-busy={busy || uploading}>
      <div className={styles.dialogBody}>
        <div className={styles.previewSwitch} role="group" aria-label="Blog editor mode"><button type="button" aria-pressed={!preview} onClick={() => setPreview(false)}>Edit</button><button type="button" aria-pressed={preview} onClick={() => setPreview(true)}>Preview</button></div>
        {error && <p className={styles.error} role="alert">{error}</p>}
        {preview ? <div className={styles.preview}><Badge value={form.status} /><h1>{form.title || "Untitled article"}</h1><p>{form.excerpt}</p><div className={styles.previewDetails}><span>{form.author}</span><span>{form.category}</span><span>{formatBlogDate(form.publishedAt)}</span></div>{form.image && <figure><Image src={form.image} alt={form.imageAlt} width={1200} height={800} sizes="(max-width: 639px) 90vw, 590px" unoptimized={imageIsUpload(form.image)} />{form.imageCaption && <figcaption>{form.imageCaption}</figcaption>}</figure>}<ArticleContent content={form.content} /><p className={styles.sectionNote}>This preview is visible only inside Admin. Drafts are not public.</p>{record?.status === "PUBLISHED" && <a className={styles.secondary} href={`/blog/${record.slug}`} target="_blank" rel="noopener noreferrer">Open published article <span aria-hidden="true">↗</span></a>}</div> : <>
          {record?.status === "ARCHIVED" && <p className={styles.sectionNote}>Saving will restore this article. Its original date and analytics are retained.</p>}
          <label className={styles.field}><span>Blog Title <em>*</em></span><input name="title" value={form.title} maxLength={200} required placeholder="Enter blog title" onChange={event => { const title = event.target.value; setForm(previous => ({ ...previous, title, ...(!slugTouched.current ? { slug: slugify(title) } : {}) })); }} /></label>
          <label className={styles.field}><span>Slug <em>*</em></span><input name="slug" value={form.slug} maxLength={120} required placeholder="blog-url-slug" onChange={event => { slugTouched.current = true; change("slug", event.target.value); }} /><small>{siteConfig.url}/blog/{form.slug || "your-article"}<br />Changing a published slug preserves its old links.</small></label>
          <div className={styles.formGrid}><label className={styles.field}><span>Category <em>*</em></span><input name="category" list="blog-categories" value={form.category} maxLength={100} placeholder="Select or create a category" onChange={event => change("category", event.target.value)} /><datalist id="blog-categories">{categories.map(category => <option key={category} value={category} />)}</datalist></label><label className={styles.field}><span>Author</span><input name="author" value={form.author} maxLength={120} onChange={event => change("author", event.target.value)} /></label></div>
          <div className={styles.field}><span>Featured Image <em>*</em></span>{form.image && <div className={styles.featuredPreview}><Image src={form.image} alt={form.imageAlt || "Featured image preview"} fill sizes="(max-width: 639px) 90vw, 590px" unoptimized={imageIsUpload(form.image)} /></div>}<label className={styles.upload}><PortalIcon name="image" /><span><strong>{uploading ? "Uploading image…" : "Upload featured image"}</strong><small>JPG, PNG or WebP · max 5 MB · at least 100 × 100 px</small></span><input type="file" aria-label="Upload featured image" accept="image/jpeg,image/png,image/webp" disabled={busy || uploading} onChange={event => { void upload(event.target.files?.[0]); event.target.value = ""; }} /></label><select name="image" aria-label="Choose an existing image" value={assets.includes(form.image) ? form.image : ""} onChange={event => { if (event.target.value) change("image", event.target.value); }}><option value="">{form.image && !assets.includes(form.image) ? "Uploaded image selected" : "Or choose an existing website image"}</option>{assets.map(path => <option value={path} key={path}>{path}</option>)}</select></div>
          <label className={styles.field}><span>Image description <em>*</em></span><input name="imageAlt" value={form.imageAlt} maxLength={300} placeholder="Describe what the image shows" onChange={event => change("imageAlt", event.target.value)} /><small>Used by screen readers and when an image cannot load.</small></label>
          <label className={styles.field}><span>Image caption</span><input name="imageCaption" value={form.imageCaption} maxLength={500} onChange={event => change("imageCaption", event.target.value)} /></label>
          <label className={styles.field}><span>Excerpt <em>*</em></span><textarea name="excerpt" value={form.excerpt} maxLength={600} placeholder="Enter a short description…" onChange={event => change("excerpt", event.target.value)} /><small>{form.excerpt.length}/600 characters</small></label>
          <div className={styles.field}><label htmlFor="blog-content">Content <em>*</em></label><div className={styles.toolbar} role="toolbar" aria-label="Content formatting"><button type="button" aria-label="H2: Insert heading" onClick={() => insert("\n\n## ", "\n\n", "Heading")}>H2</button><button type="button" aria-label="Bold text" onClick={() => insert("**", "**")}><b>B</b></button><button type="button" aria-label="Italic text" onClick={() => insert("*", "*")}><i>I</i></button><button type="button" aria-label="Insert link" onClick={() => insert("[", "](https://example.com)", "Link label")}>↗</button><button type="button" aria-label="Insert bulleted list" onClick={() => insert("\n\n- ", "\n", "List item")}>•</button><button type="button" aria-label="1. Insert numbered list" onClick={() => insert("\n\n1. ", "\n", "List item")}>1.</button><button type="button" aria-label="Insert blockquote" onClick={() => insert("\n\n> ", "\n", "Quotation")}>❞</button><button type="button" aria-label="Insert featured image into content" disabled={!form.image} onClick={() => insert("\n\n![", `](${form.image})\n\n`, form.imageAlt || "Image description")}><PortalIcon name="image" /></button></div><textarea ref={contentInput} id="blog-content" name="content" className={styles.contentInput} value={form.content} maxLength={90000} placeholder="Write your blog content here…" onChange={event => change("content", event.target.value)} /><small>Use the formatting tools or Markdown. Preview shows the public article style.</small></div>
          <label className={styles.field}><span>Tags</span><input name="tags" aria-label="Tags" aria-describedby="blog-tags-help" value={tags} maxLength={1200} placeholder="Space, STEM, classroom experiments" onChange={event => setTags(event.target.value)} /><small id="blog-tags-help">Separate tags with commas. Up to 20 tags.</small></label>
          <div className={styles.formGrid}><label className={styles.field}><span>Status</span><select aria-label="Status" name="status" value={form.status} onChange={event => change("status", event.target.value as "DRAFT" | "PUBLISHED")}><option value="DRAFT">Draft</option><option value="PUBLISHED">Published</option></select></label><label className={styles.field}><span>Publication date (IST)</span><input name="publishedAt" type="date" value={localDate(form.publishedAt)} max={localDate(new Date().toISOString())} onChange={event => change("publishedAt", event.target.value ? `${event.target.value}T00:00:00+05:30` : null)} /><small>Blank uses the date of first publication.</small></label></div>
          <details className={styles.seoFields}><summary>SEO settings</summary><label className={styles.field}><span>SEO title</span><input name="seoTitle" value={form.seoTitle} maxLength={200} placeholder="Defaults to the article title" onChange={event => change("seoTitle", event.target.value)} /></label><label className={styles.field}><span>SEO description</span><textarea name="seoDescription" value={form.seoDescription} maxLength={320} placeholder="Defaults to the excerpt" onChange={event => change("seoDescription", event.target.value)} /></label></details>
        </>}
      </div><div className={styles.dialogFooter}><button type="button" className={styles.secondary} onClick={close} disabled={busy || uploading}>Cancel</button><button type="button" className={styles.secondary} onClick={() => void save("DRAFT")} disabled={busy || uploading}>Save Draft</button><button type="submit" className={styles.primary} disabled={busy || uploading}>{busy ? "Saving…" : form.status === "PUBLISHED" && record?.status !== "PUBLISHED" ? "Publish Blog" : "Save Blog"}<PortalIcon name="arrow" /></button></div>
    </form>}
  </AdminDialog>;
}
