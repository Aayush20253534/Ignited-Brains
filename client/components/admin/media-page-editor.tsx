"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { PortalIcon } from "@/components/ui/portal-icon";
import { defaultMediaPageContent, isManagedMediaImage, type MediaPageContent, type MediaPageRecord, type MediaPhotoAsset } from "@/lib/media-page";
import { errorMessage, type AdminApi } from "./admin-types";
import { LoadState } from "./admin-primitives";
import styles from "./admin-dashboard.module.css";

type Path = (string | number)[];
type UploadResult = { mediaId: string; url: string; width: number; height: number; bytes: number };
type JsonObject = Record<string, unknown>;

const sectionNames: Record<keyof MediaPageContent, string> = {
  hero: "Hero",
  learning: "Learning Strip",
  featured: "Featured Story",
  insights: "Stories & Insights",
  visualStories: "Visual Stories",
  moments: "Six Moments",
  field: "From the Field",
  photoJournal: "Photo Journal",
  students: "Through Their Eyes",
  events: "Events",
  press: "Press",
  manifesto: "Manifesto",
  earthCta: "Earth CTA",
};

function humanize(value: string) {
  return value.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/^./, char => char.toUpperCase());
}
function keyOf(path: Path) { return path.map(String).join("."); }
function getAt(root: unknown, path: Path): unknown {
  let current = root as unknown;
  for (const segment of path) current = (current as Record<string | number, unknown>)[segment];
  return current;
}
function setAt(root: MediaPageContent, path: Path, value: unknown): MediaPageContent {
  const clone = structuredClone(root);
  let current: Record<string | number, unknown> = clone as unknown as Record<string | number, unknown>;
  for (let index = 0; index < path.length - 1; index += 1) {
    current = current[path[index]] as Record<string | number, unknown>;
  }
  current[path[path.length - 1]] = value;
  return clone;
}
function isPhoto(value: unknown): value is MediaPhotoAsset {
  return Boolean(value && typeof value === "object" && !Array.isArray(value) && "src" in value && "alt" in value && "width" in value && "height" in value);
}
function emptyPhoto(): MediaPhotoAsset {
  return { src: "", alt: "", caption: "", width: 1600, height: 1000, position: "center" };
}
function blankClone(value: unknown): unknown {
  if (isPhoto(value)) return emptyPhoto();
  if (Array.isArray(value)) return [];
  if (value === null) return null;
  if (typeof value === "string") return "";
  if (typeof value === "number") return 0;
  if (typeof value === "boolean") return false;
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, child]) => [key, blankClone(child)]));
  }
  return value;
}
function isLongField(key: string) {
  return ["heading","description","caption","note","alt","title"].includes(key);
}

export function MediaPageEditor({ api, refresh, onChanged }: { api: AdminApi; refresh: number; onChanged: (message: string) => void }) {
  const [record, setRecord] = useState<MediaPageRecord | null>(null);
  const [content, setContent] = useState<MediaPageContent | null>(null);
  const [section, setSection] = useState<keyof MediaPageContent>("hero");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingPath, setUploadingPath] = useState("");
  const [error, setError] = useState("");
  const [dirty, setDirty] = useState(false);
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError("");
    void api<{ data: MediaPageRecord }>("/api/v1/admin/media-page", { signal: controller.signal })
      .then(response => {
        if (controller.signal.aborted) return;
        setRecord(response.data);
        setContent(structuredClone(response.data.content));
        setDirty(false);
      })
      .catch(fetchError => { if (!controller.signal.aborted) setError(errorMessage(fetchError)); })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [api, refresh, retry]);

  function update(path: Path, value: unknown) {
    if (!content) return;
    setContent(setAt(content, path, value));
    setDirty(true);
    setError("");
  }

  async function upload(path: Path, file: File | undefined) {
    if (!file || !content || uploadingPath) return;
    if (!["image/jpeg","image/png","image/webp"].includes(file.type)) { setError("Use a JPG, PNG or WebP image."); return; }
    if (file.size > 5 * 1024 * 1024) { setError("Image must be 5 MB or smaller."); return; }
    const id = keyOf(path);
    setUploadingPath(id);
    setError("");
    try {
      const response = await api<{ data: UploadResult }>("/api/v1/admin/gallery-media", {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: await file.arrayBuffer(),
      });
      const current = getAt(content, path);
      const photo = isPhoto(current) ? current : emptyPhoto();
      update(path, {
        ...photo,
        src: response.data.url,
        width: response.data.width,
        height: response.data.height,
        alt: photo.alt || file.name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " "),
      });
    } catch (uploadError) {
      setError(errorMessage(uploadError));
    } finally {
      setUploadingPath("");
    }
  }

  async function save() {
    if (!content || !record || saving || uploadingPath) return;
    setSaving(true);
    setError("");
    try {
      const response = await api<{ data: MediaPageRecord }>("/api/v1/admin/media-page", {
        method: "PATCH",
        body: JSON.stringify({ content, version: record.version }),
      });
      setRecord(response.data);
      setContent(structuredClone(response.data.content));
      setDirty(false);
      onChanged("Media page content saved. The public Media page now uses this database version.");
    } catch (saveError) {
      setError(errorMessage(saveError));
    } finally {
      setSaving(false);
    }
  }

  function reload() {
    if (!record) return;
    setContent(structuredClone(record.content));
    setDirty(false);
    setError("");
  }

  const activeValue = content?.[section];
  const activeDefault = defaultMediaPageContent[section];

  if (loading) return <div className={styles.mediaCmsPanel}><LoadState busy /></div>;
  if (!content || !record || !activeValue) return <div className={styles.mediaCmsPanel}><LoadState error={error || "Unable to load Media page content."} onRetry={() => setRetry(value => value + 1)} /></div>;

  return <div className={styles.mediaCms}>
    <div className={styles.mediaCmsNotice}>
      <PortalIcon name="edit" />
      <div><strong>Page Content</strong><p>Everything below feeds the existing /media design. Change content, images, order or visibility without changing the layout.</p></div>
      <span>Version {record.version}</span>
    </div>

    <div className={styles.mediaSectionTabs} role="tablist" aria-label="Media page sections">
      {(Object.keys(sectionNames) as (keyof MediaPageContent)[]).map(key => <button key={key} type="button" role="tab" aria-selected={section === key} onClick={() => setSection(key)}>{sectionNames[key]}</button>)}
    </div>

    <div className={styles.mediaCmsPanel}>
      <div className={styles.mediaCmsHeader}>
        <div><p>MEDIA PAGE SECTION</p><h2>{sectionNames[section]}</h2></div>
        <label className={styles.mediaVisibility}><input type="checkbox" checked={activeValue.visible} onChange={event => update([section,"visible"], event.target.checked)} /><span><strong>{activeValue.visible ? "Visible" : "Hidden"}</strong><small>{activeValue.visible ? "Shown on the public Media page" : "Section is hidden publicly"}</small></span></label>
      </div>

      <NodeEditor
        value={activeValue}
        defaultValue={activeDefault}
        path={[section]}
        api={api}
        uploadingPath={uploadingPath}
        update={update}
        upload={upload}
        skipKeys={new Set(["visible"])}
      />

      {error && <p className={styles.error} role="alert">{error}</p>}

      <div className={styles.mediaCmsActions}>
        <p>{dirty ? "You have unsaved Media page changes." : "All Media page changes are saved."}</p>
        <button type="button" className={styles.secondary} onClick={reload} disabled={!dirty || saving || Boolean(uploadingPath)}>Discard changes</button>
        <button type="button" className={styles.primary} onClick={() => void save()} disabled={!dirty || saving || Boolean(uploadingPath)}>{uploadingPath ? "Uploading image…" : saving ? "Saving page…" : "Save Page Changes"}<PortalIcon name="check" /></button>
      </div>
    </div>
  </div>;
}

function NodeEditor({
  value,
  defaultValue,
  path,
  api,
  uploadingPath,
  update,
  upload,
  skipKeys = new Set<string>(),
}: {
  value: unknown;
  defaultValue: unknown;
  path: Path;
  api: AdminApi;
  uploadingPath: string;
  update: (path: Path, value: unknown) => void;
  upload: (path: Path, file: File | undefined) => Promise<void>;
  skipKeys?: Set<string>;
}) {
  if (isPhoto(value)) {
    const clearable = path.includes("articles") && path.at(-1) === "image";
    return <PhotoEditor
      photo={value}
      uploading={uploadingPath === keyOf(path)}
      onChange={(field, next) => update([...path, field], next)}
      onUpload={file => void upload(path, file)}
      onClear={clearable ? () => update(path, null) : undefined}
    />;
  }

  if (value === null) {
    const field = String(path.at(-1) || "");
    if (field === "image") return <div className={styles.mediaNullImage}><p>No image is used for this item.</p><button type="button" className={styles.secondary} onClick={() => update(path, emptyPhoto())}><PortalIcon name="image" />Add image</button></div>;
    return null;
  }

  if (Array.isArray(value)) {
    const defaultArray = Array.isArray(defaultValue) ? defaultValue : [];
    const primitive = value.every(item => typeof item === "string") && defaultArray.every(item => typeof item === "string");
    if (primitive) {
      return <ArrayEditor
        value={value as string[]}
        onChange={next => update(path, next)}
        addLabel="Add item"
      />;
    }
    const template = defaultArray[0] ?? value[0] ?? {};
    return <div className={styles.mediaCollection}>
      {value.map((item, index) => {
        const label = item && typeof item === "object" ? String((item as JsonObject).title || (item as JsonObject).label || (item as JsonObject).publication || `Item ${index + 1}`) : `Item ${index + 1}`;
        return <div className={styles.mediaCollectionItem} key={index}>
          <div className={styles.mediaCollectionHeader}><strong>{label}</strong><div>
            <button type="button" className={styles.iconButton} disabled={index === 0} aria-label="Move item up" onClick={() => {
              const next = [...value]; [next[index - 1], next[index]] = [next[index], next[index - 1]]; update(path, next);
            }}>↑</button>
            <button type="button" className={styles.iconButton} disabled={index === value.length - 1} aria-label="Move item down" onClick={() => {
              const next = [...value]; [next[index], next[index + 1]] = [next[index + 1], next[index]]; update(path, next);
            }}>↓</button>
            <button type="button" className={`${styles.iconButton} ${styles.removeButton}`} aria-label="Remove item" onClick={() => update(path, value.filter((_, itemIndex) => itemIndex !== index))}><PortalIcon name="archive" /></button>
          </div></div>
          <NodeEditor value={item} defaultValue={defaultArray[index] ?? template} path={[...path,index]} api={api} uploadingPath={uploadingPath} update={update} upload={upload} />
        </div>;
      })}
      <button type="button" className={styles.secondary} onClick={() => update(path, [...value, blankClone(template)])}><PortalIcon name="plus" />Add item</button>
    </div>;
  }

  if (value && typeof value === "object") {
    return <div className={styles.mediaObjectGrid}>
      {Object.entries(value).filter(([key]) => !skipKeys.has(key)).map(([key, child]) => {
        const childDefault = defaultValue && typeof defaultValue === "object" && !Array.isArray(defaultValue) ? (defaultValue as JsonObject)[key] : undefined;
        if (child === null && key === "image") {
          return <div className={styles.mediaNestedWide} key={key}><FieldLabel label={humanize(key)} /><NodeEditor value={child} defaultValue={childDefault} path={[...path,key]} api={api} uploadingPath={uploadingPath} update={update} upload={upload} /></div>;
        }
        if (isPhoto(child) || Array.isArray(child) || (child && typeof child === "object")) {
          return <div className={styles.mediaNestedWide} key={key}><FieldLabel label={humanize(key)} /><NodeEditor value={child} defaultValue={childDefault} path={[...path,key]} api={api} uploadingPath={uploadingPath} update={update} upload={upload} /></div>;
        }
        if (typeof child === "boolean") {
          return <label className={styles.galleryCheck} key={key}><input type="checkbox" checked={child} onChange={event => update([...path,key], event.target.checked)} /><span><strong>{humanize(key)}</strong></span></label>;
        }
        if (typeof child === "number") {
          return <label className={styles.field} key={key}><span>{humanize(key)}</span><input type="number" min={0} value={child} onChange={event => update([...path,key], Number(event.target.value || 0))} /></label>;
        }
        if (typeof child === "string") {
          return <label className={`${styles.field} ${isLongField(key) ? styles.mediaNestedWide : ""}`} key={key}><span>{humanize(key)}</span>{isLongField(key) ? <textarea rows={key === "heading" ? 3 : 4} maxLength={6000} value={child} onChange={event => update([...path,key], event.target.value)} /> : <input maxLength={6000} value={child} onChange={event => update([...path,key], event.target.value)} />}{key === "heading" && <small>Use *asterisks* around words that should use the orange accent. New lines are preserved.</small>}</label>;
        }
        return null;
      })}
    </div>;
  }

  return null;
}

function PhotoEditor({ photo, uploading, onChange, onUpload, onClear }: { photo:MediaPhotoAsset; uploading:boolean; onChange:(field:keyof MediaPhotoAsset,value:string|number)=>void; onUpload:(file:File|undefined)=>void; onClear?:()=>void }) {
  return <div className={styles.mediaPhotoEditor}>
    <div className={styles.mediaPhotoPreview}>{photo.src ? <Image src={photo.src} alt={photo.alt || ""} fill sizes="360px" unoptimized={isManagedMediaImage(photo.src)} style={{objectPosition:photo.position||"center"}} /> : <span><PortalIcon name="image" />No image selected</span>}</div>
    <div className={styles.mediaPhotoFields}>
      <label className={styles.upload}><PortalIcon name="image" /><div><strong>{uploading ? "Optimizing image…" : photo.src ? "Replace image" : "Upload image"}</strong><small>JPG, PNG or WebP · max 5 MB</small></div><input type="file" accept="image/jpeg,image/png,image/webp" disabled={uploading} onChange={event => onUpload(event.target.files?.[0])} /></label>
      <label className={styles.field}><span>Alt text</span><textarea rows={3} maxLength={300} value={photo.alt} onChange={event => onChange("alt",event.target.value)} /></label>
      <label className={styles.field}><span>Caption</span><textarea rows={3} maxLength={500} value={photo.caption} onChange={event => onChange("caption",event.target.value)} /></label>
      <label className={styles.field}><span>Image position</span><input maxLength={80} value={photo.position || ""} placeholder="50% 50%" onChange={event => onChange("position",event.target.value)} /></label>
      {onClear && <button type="button" className={styles.secondary} onClick={onClear}>Remove article image</button>}
    </div>
  </div>;
}

function ArrayEditor({ value, onChange, addLabel }: { value:string[]; onChange:(next:string[])=>void; addLabel:string }) {
  return <div className={styles.mediaStringList}>{value.map((item,index)=><div key={index}><input value={item} maxLength={300} onChange={event => { const next=[...value]; next[index]=event.target.value; onChange(next); }} /><button type="button" className={styles.iconButton} disabled={index===0} aria-label="Move up" onClick={() => { const next=[...value]; [next[index-1],next[index]]=[next[index],next[index-1]]; onChange(next); }}>↑</button><button type="button" className={styles.iconButton} disabled={index===value.length-1} aria-label="Move down" onClick={() => { const next=[...value]; [next[index],next[index+1]]=[next[index+1],next[index]]; onChange(next); }}>↓</button><button type="button" className={`${styles.iconButton} ${styles.removeButton}`} aria-label="Remove" onClick={() => onChange(value.filter((_,itemIndex)=>itemIndex!==index))}>×</button></div>)}<button type="button" className={styles.secondary} onClick={() => onChange([...value,""])}><PortalIcon name="plus" />{addLabel}</button></div>;
}

function FieldLabel({ label }: { label:string }) {
  return <p className={styles.mediaFieldLabel}>{label}</p>;
}
