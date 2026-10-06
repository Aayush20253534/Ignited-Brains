"use client";
import { useEffect, useState } from "react";
import { PortalIcon } from "@/components/ui/portal-icon";
import { AdminDialog, Badge, LoadState, PaginationBar } from "./admin-primitives";
import { APPLICATION_STATUSES, CONTACT_STATUSES, dateLabel, emptyPagination, errorMessage, humanize, type AdminApi, type ApiList, type Application, type Contact, type Selection } from "./admin-types";
import styles from "./admin-dashboard.module.css";

export function SubmissionManager({ kind, api, refresh, lockedType = "", onOpen }: { kind: "contacts" | "applications"; api: AdminApi; refresh: number; lockedType?: "" | "STUDENT" | "ORGANIZATION"; onOpen: (selection: Selection) => void }) {
  const contact = kind === "contacts";
  const [filters, setFilters] = useState({ query: "", type: lockedType, status: "", dateFrom: "", dateTo: "", sort: "newest", page: 1 });
  const params = new URLSearchParams({ page: String(filters.page), limit: "10", sort: filters.sort });
  for (const field of ["query", "type", "status", "dateFrom", "dateTo"] as const) if (filters[field].trim()) params.set(field, filters[field].trim());
  const request = params.toString();
  const key = `${kind}:${request}:${refresh}`;
  const [result, setResult] = useState<{ key: string; list: ApiList<Contact | Application>; error: string }>({ key: "", list: { data: [], pagination: emptyPagination }, error: "" });
  const [retry, setRetry] = useState(0);
  const busy = key !== result.key;
  useEffect(() => {
    const controller = new AbortController();
    const timer = setTimeout(() => {
      void api<ApiList<Contact | Application>>(`/api/v1/admin/${kind}?${request}`, { signal: controller.signal })
        .then(list => { if (!controller.signal.aborted) { setResult({ key, list, error: "" }); if (list.pagination.totalPages && filters.page > list.pagination.totalPages) setFilters(previous => ({ ...previous, page: list.pagination.totalPages })); } })
        .catch(error => { if (!controller.signal.aborted) setResult({ key, list: { data: [], pagination: emptyPagination }, error: errorMessage(error) }); });
    }, 250);
    return () => { clearTimeout(timer); controller.abort(); };
  }, [api, kind, request, key, retry, filters.page]);
  function change(field: keyof typeof filters, value: string) { setFilters(previous => ({ ...previous, [field]: value, page: 1 })); }
  const statuses = contact ? CONTACT_STATUSES : APPLICATION_STATUSES;
  return <section aria-label={contact ? "Contact enquiry records" : "Application records"}>
    <div className={styles.filterBar}>
      <label className={styles.search}><span>Search {contact ? "enquiries" : "applications"}</span><PortalIcon name="search" /><input type="search" value={filters.query} maxLength={200} placeholder={contact ? "Name, email, organisation or message…" : "Name, email, institution or location…"} onChange={event => change("query", event.target.value)} /></label>
      <label><span>Status</span><select aria-label="Status" value={filters.status} onChange={event => change("status", event.target.value)}><option value="">All statuses</option>{statuses.map(status => <option key={status} value={status}>{humanize(status)}</option>)}</select></label>
      {(!lockedType || contact) && <label><span>Type</span><select aria-label="Type" value={filters.type} onChange={event => change("type", event.target.value)}><option value="">All types</option><option value={contact ? "INDIVIDUAL" : "STUDENT"}>{contact ? "Individual" : "Student"}</option><option value="ORGANIZATION">Organisation</option></select></label>}
      <label><span>From date (IST)</span><input type="date" value={filters.dateFrom} max={filters.dateTo || undefined} onChange={event => change("dateFrom", event.target.value)} /></label>
      <label><span>To date (IST)</span><input type="date" value={filters.dateTo} min={filters.dateFrom || undefined} onChange={event => change("dateTo", event.target.value)} /></label>
      <label><span>Order</span><select aria-label="Order" value={filters.sort} onChange={event => change("sort", event.target.value)}><option value="newest">Newest first</option><option value="oldest">Oldest first</option></select></label>
      <button type="button" className={styles.secondary} onClick={() => setFilters({ query: "", type: lockedType, status: "", dateFrom: "", dateTo: "", sort: "newest", page: 1 })}>Reset</button>
    </div>
    <div className={styles.panel} aria-busy={busy}>
      {busy || result.error || !result.list.data.length ? <LoadState busy={busy} error={result.error} empty="No submissions match these filters." onRetry={() => setRetry(value => value + 1)} /> : <div className={styles.tableWrap}><table className={styles.table}>
        <caption className="sr-only">{contact ? "Contact enquiries" : lockedType === "STUDENT" ? "Student applications" : lockedType === "ORGANIZATION" ? "Organization applications" : "Student and organisation applications"}</caption>
        <thead><tr><th scope="col">{contact ? "Contact details" : "Applicant details"}</th><th scope="col">Type</th><th scope="col">{contact ? "Enquiry" : "Location / institution"}</th><th scope="col">Submitted</th>{contact && <th scope="col">Notification</th>}<th scope="col">Status</th><th scope="col">Actions</th></tr></thead>
        <tbody>{result.list.data.map(record => {
          const entry = record as Contact & Application;
          return <tr key={entry.id}><td><div className={styles.personCell}><span className={styles.avatar}>{entry.name.slice(0, 1).toUpperCase()}</span><div><strong>{entry.name}</strong><p>{entry.email}</p><p>{contact ? entry.organization || "Individual enquiry" : String(entry.details.institutionName || entry.details.organizationName || "")}</p></div></div></td>
            <td><span className={`${styles.badge} ${contact ? styles.blue : entry.applicant_type === "STUDENT" ? styles.purple : styles.green}`}>{contact ? entry.organization?.trim() ? "Organisation" : "Individual" : entry.applicant_type === "STUDENT" ? "Student" : "Organisation"}</span></td>
            <td className={styles.messageCell}>{contact ? <><strong>{entry.subject || "General enquiry"}</strong><p>{entry.message}</p></> : <><strong>{[entry.city, entry.state].filter(Boolean).join(", ") || "—"}</strong><p>{String(entry.details.interestArea || entry.details.organizationType || "")}</p></>}</td>
            <td><time dateTime={entry.created_at}>{dateLabel(entry.created_at)}</time><p>{new Intl.DateTimeFormat("en-IN", { timeStyle: "short", timeZone: "Asia/Kolkata" }).format(new Date(entry.created_at))} IST</p></td>
            {contact && <td><Badge value={entry.notification_status} /></td>}<td><Badge value={entry.status} /></td><td><button type="button" className={styles.iconButton} aria-label={`View ${entry.name}`} onClick={() => onOpen({ kind, id: entry.id })}><PortalIcon name="eye" /></button></td></tr>;
        })}</tbody></table></div>}
      {!busy && !result.error && <PaginationBar value={result.list.pagination} noun={contact ? "enquiries" : lockedType === "STUDENT" ? "student applications" : lockedType === "ORGANIZATION" ? "organization applications" : "applications"} onPage={page => setFilters(previous => ({ ...previous, page }))} />}
    </div>
  </section>;
}

function detailValue(value: unknown): string {
  if (value === null || value === undefined || value === "") return "—";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (Array.isArray(value)) return value.map(item => typeof item === "string" ? humanize(item) : detailValue(item)).join(", ");
  if (typeof value === "object") return JSON.stringify(value, null, 2);
  return String(value);
}
export function SubmissionDrawer({ selection, api, onClose, onChanged }: { selection: Selection; api: AdminApi; onClose: () => void; onChanged: (message: string) => void }) {
  const [record, setRecord] = useState<(Contact & Partial<Application>) | null>(null);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [retry, setRetry] = useState(0);
  const contact = selection.kind === "contacts";
  useEffect(() => {
    const controller = new AbortController();
    void api<{ data: Contact & Partial<Application> }>(`/api/v1/admin/${selection.kind}/${selection.id}`, { signal: controller.signal })
      .then(({ data }) => { if (!controller.signal.aborted) { setRecord(data); setStatus(data.status); setError(""); } })
      .catch(error => { if (!controller.signal.aborted) setError(errorMessage(error)); });
    return () => controller.abort();
  }, [api, selection.kind, selection.id, retry]);
  async function save() {
    if (busy || !record) return;
    setBusy(true); setError("");
    try {
      const { data } = await api<{ data: Contact & Partial<Application> }>(`/api/v1/admin/${selection.kind}/${selection.id}/status`, { method: "PATCH", body: JSON.stringify({ status }) });
      setRecord(data); onChanged("Submission status updated.");
    } catch (error) { setError(errorMessage(error)); } finally { setBusy(false); }
  }
  return <AdminDialog title={contact ? "Contact enquiry" : "Application details"} onClose={onClose} busy={busy}>
    <div className={styles.dialogBody}>
      {record ? <><div className={styles.recordTitle}><span className={styles.avatar}>{record.name.slice(0, 1)}</span><div><h3>{record.name}</h3><p>{contact ? record.organization || "Individual enquiry" : record.applicant_type === "STUDENT" ? "Student application" : "Organisation application"}</p></div></div><Badge value={record.status} />
        <dl className={styles.detailGrid}><div><dt>Email</dt><dd><a href={`mailto:${record.email}`}>{record.email}</a></dd></div><div><dt>Phone</dt><dd>{record.phone ? <a href={`tel:${record.phone.replace(/[^+\d]/g, "")}`}>{record.phone}</a> : "—"}</dd></div>
          {contact ? <><div><dt>Organisation</dt><dd>{record.organization || "—"}</dd></div><div><dt>Subject</dt><dd>{record.subject || "—"}</dd></div></> : <><div><dt>City</dt><dd>{record.city || "—"}</dd></div><div><dt>State</dt><dd>{record.state || "—"}</dd></div></>}
          <div className={styles.wide}><dt>Message</dt><dd>{record.message || "No additional message."}</dd></div></dl>
        {!contact && <><h3 className={styles.detailSection}>Submitted application details</h3><dl className={styles.detailGrid}>{Object.entries(record.details || {}).map(([key, value]) => <div key={key} className={String(value).length > 100 || Array.isArray(value) ? styles.wide : undefined}><dt>{humanize(key)}</dt><dd>{detailValue(value)}</dd></div>)}</dl></>}
        <h3 className={styles.detailSection}>Submission history</h3><dl className={styles.detailGrid}><div><dt>Submitted</dt><dd>{dateLabel(record.created_at, true)} IST</dd></div><div><dt>Last updated</dt><dd>{dateLabel(record.updated_at, true)} IST</dd></div><div><dt>Email notification</dt><dd>{humanize(record.notification_status)}</dd></div>{record.notification_error && <div className={styles.wide}><dt>Notification error</dt><dd>{record.notification_error}</dd></div>}</dl>
        <label className={styles.field}><span>Update status</span><select aria-label="Update status" value={status} disabled={busy} onChange={event => setStatus(event.target.value)}>{(contact ? CONTACT_STATUSES : APPLICATION_STATUSES).map(value => <option key={value} value={value}>{humanize(value)}</option>)}</select></label><p className={styles.idLabel}>Record ID: {record.id}</p>
      </> : <LoadState busy={!error} error={error} onRetry={() => setRetry(value => value + 1)} />}
      {record && error && <p className={styles.error} role="alert">{error}</p>}
    </div><div className={styles.dialogFooter}><button type="button" className={styles.secondary} onClick={onClose} disabled={busy}>Close</button><button type="button" className={styles.primary} disabled={busy || !record || status === record.status} onClick={() => void save()}>{busy ? "Saving…" : "Save Status"}<PortalIcon name="check" /></button></div>
  </AdminDialog>;
}
