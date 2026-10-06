"use client";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { BrandLogo } from "@/components/layout/brand-logo";
import { PortalIcon, type PortalIconName } from "@/components/ui/portal-icon";
import { Badge, LoadState, StatCard } from "./admin-primitives";
import { dateLabel, errorMessage, type AdminApi, type AdminTab, type AdminUser, type ApiList, type Application, type Contact, type Selection, type Summary } from "./admin-types";
import { SubmissionDrawer, SubmissionManager } from "./submission-manager";
const BlogManager = dynamic(() => import("./blog-manager").then(module => module.BlogManager), { loading: () => <LoadState busy /> });
import styles from "./admin-dashboard.module.css";

const mobileQuery = "(max-width: 959px)";
const subscribeMobile = (notify: () => void) => { const query = window.matchMedia(mobileQuery); query.addEventListener("change", notify); return () => query.removeEventListener("change", notify); };
const mobileSnapshot = () => window.matchMedia(mobileQuery).matches;
const desktopSnapshot = () => false;
const items: { id: AdminTab; label: string; icon: PortalIconName }[] = [{ id: "overview", label: "Overview", icon: "overview" }, { id: "contacts", label: "Contact Enquiries", icon: "email" }, { id: "applications", label: "Applications", icon: "document" }, { id: "blogs", label: "Blog Management", icon: "book" }];

export function AdminDashboard({ admin, api, onLogout }: { admin: AdminUser; api: AdminApi; onLogout: () => void }) {
  const [tab, setTab] = useState<AdminTab>("overview");
  const [applicationType, setApplicationType] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [notice, setNotice] = useState("");
  const [selection, setSelection] = useState<Selection | null>(null);
  const [result, setResult] = useState<{ version: number; data: Summary | null; error: string }>({ version: -1, data: null, error: "" });
  const mobile = useSyncExternalStore(subscribeMobile, mobileSnapshot, desktopSnapshot);
  const sidebar = useRef<HTMLElement>(null);
  const title = useRef<HTMLHeadingElement>(null);
  const refreshing = result.version !== refresh;
  const summary = result.data;
  const changed = useCallback((message: string) => { setNotice(message); setRefresh(value => value + 1); }, []);
  useEffect(() => {
    const controller = new AbortController();
    void api<Summary>("/api/v1/admin/dashboard/summary", { signal: controller.signal })
      .then(data => { if (!controller.signal.aborted) setResult({ version: refresh, data, error: "" }); })
      .catch(error => { if (!controller.signal.aborted) setResult(previous => ({ ...previous, version: refresh, error: errorMessage(error) })); });
    return () => controller.abort();
  }, [api, refresh]);
  useEffect(() => {
    if (!mobileOpen || !mobile) return;
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const first = sidebar.current?.querySelector<HTMLElement>("a,button"); first?.focus();
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
      if (event.key !== "Tab") return;
      const elements = [...(sidebar.current?.querySelectorAll<HTMLElement>("a,button") || [])].filter(element => element.getClientRects().length);
      const last = elements.at(-1);
      if (event.shiftKey && document.activeElement === elements[0]) { event.preventDefault(); last?.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); elements[0]?.focus(); }
    };
    document.addEventListener("keydown", handleKey);
    return () => { document.removeEventListener("keydown", handleKey); if (previous?.isConnected) previous.focus({ preventScroll: true }); };
  }, [mobileOpen, mobile]);
  function navigate(next: AdminTab, type = "") { setApplicationType(type); setTab(next); setMobileOpen(false); setNotice(""); requestAnimationFrame(() => title.current?.focus({ preventScroll: true })); }
  const heading = tab === "overview" ? ["Dashboard", "Overview"] : tab === "contacts" ? ["Contact", "Enquiries"] : tab === "applications" ? ["", "Applications"] : ["Blog", "Management"];
  const description = tab === "overview" ? "A live view of Ignited Brains submissions and activity." : tab === "contacts" ? "Review and manage incoming partnership enquiries." : tab === "applications" ? "Track student and organisation applications." : "Create, edit and manage your website blogs.";
  const counts = { overview: undefined, contacts: summary?.contacts.new, applications: summary?.applications.new, blogs: summary?.blogs.drafts };
  return <div className={styles.shell}>
    {mobile && mobileOpen && <button type="button" aria-label="Close admin navigation" className={styles.mobileBackdrop} onClick={() => setMobileOpen(false)} />}
    <aside ref={sidebar} className={`${styles.sidebar} ${mobileOpen ? styles.sidebarOpen : ""}`} inert={mobile && !mobileOpen} aria-label="Admin navigation">
      <div className={styles.sidebarBrand}><BrandLogo inverted /><p>Transforming Education<br />Through Innovation</p><button type="button" className={styles.sidebarClose} aria-label="Close navigation" onClick={() => setMobileOpen(false)}><PortalIcon name="close" /></button></div>
      <nav className={styles.sidebarNav} aria-label="Admin sections"><p>ADMIN PORTAL</p>{items.map(item => <button type="button" key={item.id} aria-current={tab === item.id ? "page" : undefined} onClick={() => navigate(item.id)}><PortalIcon name={item.icon} /><span>{item.label}</span>{counts[item.id] !== undefined && <span className={styles.navCount} aria-label={`${counts[item.id]} ${item.id === "blogs" ? "draft blogs" : "new records"}`}>{counts[item.id]}</span>}</button>)}</nav>
      <div className={styles.sidebarArt} aria-hidden="true"><Image src="/projects-v2/final-earth.webp" alt="" fill sizes="264px" /><p>Ideas today.<br />Brighter<br />tomorrows.</p></div>
      <div className={styles.profile}><div className={styles.identity}><span className={styles.avatar}>{admin.name.slice(0, 1).toUpperCase()}</span><div><strong title={admin.name}>{admin.name}</strong><p title={admin.email}>{admin.email}</p></div></div><button type="button" className={styles.signOut} onClick={onLogout}><PortalIcon name="logout" />Sign out</button></div>
    </aside>
    <div className={styles.workspace} inert={mobile && mobileOpen}>
      <header className={`${styles.header} ${tab === "overview" ? styles.banner : ""}`}>
        {tab === "overview" && <Image src="/blog/space-lab-models.webp" alt="" fill preload sizes="(max-width: 959px) 100vw, 80vw" />}
        <div className={styles.headerCopy}>{tab === "overview" && <p className={styles.eyebrow}>ADMINISTRATION PORTAL</p>}<h1 ref={title} tabIndex={-1}>{heading[0]}{heading[0] && " "}<span>{heading[1]}</span></h1><p>{description}</p></div>
        <div className={styles.headerActions}><button type="button" className={styles.menuButton} aria-label="Open admin navigation" aria-expanded={mobileOpen} onClick={() => setMobileOpen(true)}><PortalIcon name="menu" /></button><button type="button" className={styles.refresh} aria-label="Refresh admin data" disabled={refreshing} onClick={() => { setNotice(""); setRefresh(value => value + 1); }}><PortalIcon name="refresh" /><span>{refreshing ? "Refreshing…" : "Refresh"}</span></button></div>
      </header>
      <main className={styles.content}>
        {result.error && <div className={styles.error} role="alert"><p>{result.error}</p><button type="button" onClick={() => setRefresh(value => value + 1)}>Retry</button></div>}
        {notice && <div className={styles.notice} role="status"><p>{notice}</p><button type="button" onClick={() => setNotice("")} aria-label="Dismiss confirmation">Dismiss</button></div>}
        {tab !== "blogs" && <div className={styles.statGrid}>
          {tab === "contacts" ? <><StatCard label="Total enquiries" value={summary?.contacts.total} helper="All contact submissions" icon="email" /><StatCard label="New enquiries" value={summary?.contacts.new} helper="Awaiting a first response" icon="clock" accent="blue" /><StatCard label="Organisations" value={summary?.contacts.organizations} helper="Institutional enquiries" icon="institution" accent="green" /><StatCard label="Individuals" value={summary?.contacts.individuals} helper="Individual enquiries" icon="person" accent="purple" /></> : <>
            <StatCard label={tab === "overview" ? "Contact enquiries" : "Total applications"} value={tab === "overview" ? summary?.contacts.total : summary?.applications.total} helper={tab === "overview" ? summary ? `${summary.contacts.recent} in the last 7 days` : "Loading activity" : "All submitted applications"} icon={tab === "overview" ? "email" : "document"} points={tab === "overview" ? summary?.activity.map(day => day.contacts) : undefined} onClick={tab === "overview" ? () => navigate("contacts") : undefined} />
            <StatCard label={tab === "overview" ? "Applications" : "Awaiting review"} value={tab === "overview" ? summary?.applications.total : summary?.applications.awaiting} helper={summary ? `${summary.applications.awaiting} awaiting review` : "Loading activity"} icon="document" accent="blue" points={tab === "overview" ? summary?.activity.map(day => day.applications) : undefined} onClick={tab === "overview" ? () => navigate("applications") : undefined} />
            <StatCard label="Student applications" value={summary?.applications.students} helper={summary ? `${summary.applications.recent_students} in the last 7 days` : "Loading activity"} icon="person" accent="purple" points={tab === "overview" ? summary?.activity.map(day => day.students) : undefined} onClick={tab === "overview" ? () => navigate("applications", "STUDENT") : undefined} />
            <StatCard label="Organisation applications" value={summary?.applications.organizations} helper={summary ? `${summary.applications.recent_organizations} in the last 7 days` : "Loading activity"} icon="institution" accent="green" points={tab === "overview" ? summary?.activity.map(day => day.organizations) : undefined} onClick={tab === "overview" ? () => navigate("applications", "ORGANIZATION") : undefined} />
          </>}
        </div>}
        {tab === "overview" && <><div className={styles.recentGrid}><RecentRecords kind="contacts" api={api} refresh={refresh} onOpen={setSelection} onViewAll={() => navigate("contacts")} /><RecentRecords kind="applications" api={api} refresh={refresh} onOpen={setSelection} onViewAll={() => navigate("applications")} /></div><section className={`${styles.panel} ${styles.quickActions}`}><div className={styles.panelHeader}><PortalIcon name="chart" /><div><h2>Quick Actions</h2><p>Common tasks to keep enquiries, applications and stories moving.</p></div></div><div className={styles.quickGrid}><button type="button" className={styles.orange} onClick={() => navigate("contacts")}><PortalIcon name="email" />View Contact Enquiries <span aria-hidden="true">→</span></button><button type="button" className={styles.blue} onClick={() => navigate("applications")}><PortalIcon name="document" />View All Applications <span aria-hidden="true">→</span></button><button type="button" className={styles.purple} onClick={() => navigate("applications", "STUDENT")}><PortalIcon name="person" />Student Applications <span aria-hidden="true">→</span></button><button type="button" className={styles.green} onClick={() => navigate("blogs")}><PortalIcon name="book" />Manage Blogs <span aria-hidden="true">→</span></button></div></section></>}
        {(tab === "contacts" || tab === "applications") && <SubmissionManager key={`${tab}:${applicationType}`} kind={tab} api={api} refresh={refresh} defaultType={tab === "applications" ? applicationType : ""} onOpen={setSelection} />}
        {tab === "blogs" && <BlogManager api={api} refresh={refresh} summary={summary?.blogs} onChanged={changed} />}
      </main>
    </div>
    {selection && <SubmissionDrawer key={`${selection.kind}:${selection.id}`} selection={selection} api={api} onClose={() => setSelection(null)} onChanged={changed} />}
  </div>;
}

function RecentRecords({ kind, api, refresh, onOpen, onViewAll }: { kind: "contacts" | "applications"; api: AdminApi; refresh: number; onOpen: (selection: Selection) => void; onViewAll: () => void }) {
  const [result, setResult] = useState<{ version: number; data: (Contact & Partial<Application>)[]; error: string }>({ version: -1, data: [], error: "" });
  const [retry, setRetry] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    void api<ApiList<Contact & Partial<Application>>>(`/api/v1/admin/${kind}?limit=5`, { signal: controller.signal })
      .then(list => { if (!controller.signal.aborted) setResult({ version: refresh, data: list.data, error: "" }); })
      .catch(error => { if (!controller.signal.aborted) setResult({ version: refresh, data: [], error: errorMessage(error) }); });
    return () => controller.abort();
  }, [api, kind, refresh, retry]);
  const contact = kind === "contacts";
  return <section className={styles.panel}><div className={styles.panelHeader}><PortalIcon name={contact ? "email" : "document"} /><div><h2>{contact ? "Recent Enquiries" : "Recent Applications"}</h2><p>{contact ? "Latest contact submissions from the website." : "Latest student and organisation applications."}</p></div><button type="button" onClick={onViewAll} aria-label={`View all ${kind === "contacts" ? "enquiries" : "applications"}`}>View all <span aria-hidden="true">→</span></button></div><div className={styles.recentList}>
    {result.version !== refresh || result.error || !result.data.length ? <LoadState busy={result.version !== refresh} error={result.error} empty={`No ${contact ? "enquiries" : "applications"} yet.`} onRetry={() => setRetry(value => value + 1)} /> : result.data.map(record => <button type="button" className={styles.recentRecord} key={record.id} onClick={() => onOpen({ kind, id: record.id })}><span className={styles.avatar} aria-hidden="true">{record.name.slice(0, 1).toUpperCase()}</span><div><strong>{record.name}</strong><p>{contact ? record.organization || record.email : `${record.applicant_type === "STUDENT" ? "Student" : "Organisation"} · ${[record.city, record.state].filter(Boolean).join(", ") || record.email}`}</p></div><time dateTime={record.created_at}>{dateLabel(record.created_at)}</time><Badge value={record.status} /><PortalIcon name="arrow" /></button>)}
  </div></section>;
}
