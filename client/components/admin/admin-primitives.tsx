"use client";
import { type ReactNode, useEffect, useId, useRef } from "react";
import { PortalIcon, type PortalIconName } from "@/components/ui/portal-icon";
import type { Pagination } from "@/lib/blog";
import { humanize } from "./admin-types";
import styles from "./admin-dashboard.module.css";

export function AdminDialog({ title, onClose, busy = false, compact = false, children }: { title: string; onClose: () => void; busy?: boolean; compact?: boolean; children: ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null);
  const label = useId();
  useEffect(() => {
    const dialog = ref.current;
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    dialog?.showModal();
    return () => { dialog?.close(); if (previous?.isConnected) previous.focus({ preventScroll: true }); };
  }, []);
  return <dialog ref={ref} aria-labelledby={label} className={compact ? styles.confirmDialog : styles.drawer} onCancel={event => { event.preventDefault(); if (!busy) onClose(); }} onClick={event => {
    if (event.target === ref.current && !busy) { const box = ref.current.getBoundingClientRect(); if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) onClose(); }
  }}><div className={styles.dialogHeader}><h2 id={label}>{title}</h2><button type="button" className={styles.iconButton} aria-label={`Close ${title}`} onClick={onClose} disabled={busy}><PortalIcon name="close" /></button></div>{children}</dialog>;
}
export function Badge({ value }: { value: string | null | undefined }) {
  const color = ["PUBLISHED", "APPROVED", "RESOLVED", "SENT"].includes(value || "") ? "green" : ["DRAFT", "IN_REVIEW", "IN_PROGRESS", "PENDING"].includes(value || "") ? "amber" : ["FAILED", "REJECTED"].includes(value || "") ? "red" : value === "NEW" ? "blue" : value === "CONTACTED" ? "purple" : "gray";
  return <span className={`${styles.badge} ${styles[color]}`}><i aria-hidden="true" />{humanize(value)}</span>;
}
export function StatCard({ label, value, helper, icon, accent = "orange", points, onClick }: { label: string; value: number | undefined; helper: string; icon: PortalIconName; accent?: "orange" | "blue" | "purple" | "green"; points?: number[]; onClick?: () => void }) {
  const maximum = Math.max(1, ...(points || []));
  const graph = points?.map((value, index) => `${index * 10},${27 - value / maximum * 22}`).join(" ");
  const content = <><span className={`${styles.statIcon} ${styles[accent]}`}><PortalIcon name={icon} /></span><div className={styles.statText}><p>{label}</p><strong>{value === undefined ? "—" : value.toLocaleString("en-IN")}</strong><span>{helper}</span></div>{graph && <svg className={`${styles.sparkline} ${styles[accent]}`} viewBox="0 0 60 30" fill="none" role="img" aria-label={`${label}: daily activity over the last seven days: ${points?.join(", ")}`}><polyline points={graph} stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg>}{onClick && <span className={styles.statArrow} aria-hidden="true">↗</span>}</>;
  return onClick ? <button type="button" className={styles.statCard} onClick={onClick}>{content}</button> : <article className={styles.statCard}>{content}</article>;
}
export function PaginationBar({ value, onPage, busy = false, noun = "records" }: { value: Pagination; onPage: (page: number) => void; busy?: boolean; noun?: string }) {
  const start = value.total ? (value.page - 1) * value.limit + 1 : 0;
  const pages = Array.from({ length: Math.min(5, value.totalPages) }, (_, index) => Math.max(1, Math.min(value.page - 2, value.totalPages - 4)) + index);
  return <div className={styles.pagination}><p>Showing {start}–{Math.min(value.page * value.limit, value.total)} of {value.total} {noun}</p><nav aria-label={`${noun} pages`}><button type="button" disabled={busy || value.page <= 1} onClick={() => onPage(value.page - 1)} aria-label="Previous page">‹</button>{pages.map(page => <button type="button" key={page} disabled={busy} aria-current={page === value.page ? "page" : undefined} onClick={() => onPage(page)}>{page}</button>)}<button type="button" disabled={busy || value.page >= value.totalPages} onClick={() => onPage(value.page + 1)} aria-label="Next page">›</button></nav></div>;
}
export function LoadState({ busy, error, empty, onRetry }: { busy?: boolean; error?: string; empty?: string; onRetry?: () => void }) {
  return <div className={styles.loadState} role={error ? "alert" : "status"}>{busy ? <><span className={styles.spinner} />Loading records…</> : error ? <><p>{error}</p>{onRetry && <button type="button" className={styles.secondary} onClick={onRetry}>Try again</button>}</> : <><PortalIcon name="document" /><p>{empty || "No records match these filters."}</p></>}</div>;
}
