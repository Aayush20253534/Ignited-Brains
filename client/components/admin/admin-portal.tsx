"use client";

import {
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

import { BrandLogo } from "@/components/layout/brand-logo";
import { AdminLogin, AdminSessionEnding, AdminSignedOut } from "./admin-auth-screens";
import { cn } from "@/lib/cn";

const TOKEN_KEY = "ignited-brains-admin-token";

const subscribeToHydration = () => () => {};
const clientHydrated = () => true;
const serverHydrated = () => false;

function readStoredToken() {
  try {
    return sessionStorage.getItem(TOKEN_KEY) || "";
  } catch {
    return "";
  }
}

const CONTACT_STATUSES = ["NEW", "IN_PROGRESS", "RESOLVED", "ARCHIVED"] as const;
const APPLICATION_STATUSES = [
  "NEW",
  "IN_REVIEW",
  "CONTACTED",
  "APPROVED",
  "REJECTED",
  "ARCHIVED",
] as const;
const APPLICATION_TYPES = ["STUDENT", "ORGANIZATION"] as const;

type ContactStatus = (typeof CONTACT_STATUSES)[number];
type ApplicationStatus = (typeof APPLICATION_STATUSES)[number];
type ApplicationType = (typeof APPLICATION_TYPES)[number];
type AdminTab = "overview" | "contacts" | "applications";

type AdminUser = {
  id: string;
  name: string;
  email: string;
};

type DashboardSummary = {
  contacts: {
    total: number;
    new: number;
  };
  applications: {
    total: number;
    new: number;
    students: number;
    organizations: number;
  };
};

type ContactSubmission = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  organization: string | null;
  subject: string | null;
  message: string;
  status: ContactStatus;
  notification_status: string | null;
  created_at: string;
  updated_at: string;
};

type ApplicationSubmission = {
  id: string;
  applicant_type: ApplicationType;
  name: string;
  email: string;
  phone: string;
  city: string | null;
  state: string | null;
  message: string | null;
  details: Record<string, unknown> | null;
  status: ApplicationStatus;
  notification_status: string | null;
  created_at: string;
  updated_at: string;
};

type Pagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

type ApiList<T> = {
  data: T[];
  pagination: Pagination;
};

type SelectedRecord =
  | { kind: "contact"; record: ContactSubmission }
  | { kind: "application"; record: ApplicationSubmission };

type ApiErrorPayload = {
  error?: string;
  message?: string;
};

class AdminSessionExpiredError extends Error {}

const emptyPagination: Pagination = {
  page: 1,
  limit: 20,
  total: 0,
  totalPages: 1,
};

function iconPath(name: string) {
  const icons: Record<string, ReactNode> = {
    overview: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </>
    ),
    contacts: (
      <>
        <path d="M4 5.5h16v13H4z" />
        <path d="m5 7 7 5 7-5" />
      </>
    ),
    applications: (
      <>
        <path d="M7 4h10v17H7z" />
        <path d="M9.5 8h5M9.5 12h5M9.5 16h3" />
        <path d="M9 2h6v4H9z" />
      </>
    ),
    search: <circle cx="11" cy="11" r="6.5" />,
    refresh: (
      <>
        <path d="M20 7v5h-5" />
        <path d="M18.2 17.2A8 8 0 1 1 19 7" />
      </>
    ),
    logout: (
      <>
        <path d="M10 4H5v16h5" />
        <path d="m15 8 4 4-4 4M19 12H9" />
      </>
    ),
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    close: <path d="m6 6 12 12M18 6 6 18" />,
    eye: (
      <>
        <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
        <circle cx="12" cy="12" r="2.5" />
      </>
    ),
    arrow: <path d="m9 6 6 6-6 6" />,
  };

  return icons[name] ?? null;
}

function AdminIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {iconPath(name)}
    </svg>
  );
}

function formatDate(value: string) {
  try {
    return new Intl.DateTimeFormat("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(value));
  } catch {
    return value;
  }
}

function humanize(value: string | null | undefined) {
  if (!value) return "—";
  return value
    .toLowerCase()
    .replaceAll("_", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function statusClass(status: string) {
  switch (status) {
    case "NEW":
      return "border-blue-200 bg-blue-50 text-blue-700";
    case "IN_PROGRESS":
    case "IN_REVIEW":
      return "border-amber-200 bg-amber-50 text-amber-700";
    case "CONTACTED":
      return "border-violet-200 bg-violet-50 text-violet-700";
    case "APPROVED":
    case "RESOLVED":
      return "border-emerald-200 bg-emerald-50 text-emerald-700";
    case "REJECTED":
      return "border-red-200 bg-red-50 text-red-700";
    default:
      return "border-slate-200 bg-slate-50 text-slate-600";
  }
}

function notificationClass(status: string | null) {
  const normalized = String(status || "").toUpperCase();
  if (["SENT", "DELIVERED", "SUCCESS"].includes(normalized)) {
    return "bg-emerald-500";
  }
  if (["FAILED", "ERROR"].includes(normalized)) {
    return "bg-red-500";
  }
  return "bg-slate-300";
}

function StatCard({
  label,
  value,
  helper,
  icon,
  accent = "blue",
}: {
  label: string;
  value: number;
  helper: string;
  icon: string;
  accent?: "blue" | "orange" | "violet" | "green";
}) {
  const accents = {
    blue: "bg-blue-50 text-brand-blue",
    orange: "bg-orange-50 text-brand-orange",
    violet: "bg-violet-50 text-violet-700",
    green: "bg-emerald-50 text-emerald-700",
  };

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_12px_30px_rgba(15,39,78,.06)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-slate-400">
            {label}
          </p>
          <p className="mt-3 text-3xl font-black tracking-[-0.04em] text-brand-ink">
            {value.toLocaleString("en-IN")}
          </p>
          <p className="mt-1 text-xs font-medium text-slate-500">{helper}</p>
        </div>
        <span
          className={cn(
            "grid h-11 w-11 shrink-0 place-items-center rounded-xl",
            accents[accent],
          )}
        >
          <AdminIcon name={icon} className="h-5 w-5" />
        </span>
      </div>
    </article>
  );
}

async function parseResponse<T>(response: Response): Promise<T> {
  const body = (await response.json().catch(() => ({}))) as ApiErrorPayload & T;

  if (!response.ok) {
    throw new Error(
      body.error || body.message || `Request failed (${response.status})`,
    );
  }

  return body as T;
}


function Sidebar({
  tab,
  admin,
  mobileOpen,
  onTabChange,
  onClose,
  onLogout,
}: {
  tab: AdminTab;
  admin: AdminUser;
  mobileOpen: boolean;
  onTabChange: (tab: AdminTab) => void;
  onClose: () => void;
  onLogout: () => void;
}) {
  const items: Array<{ id: AdminTab; label: string; icon: string }> = [
    { id: "overview", label: "Overview", icon: "overview" },
    { id: "contacts", label: "Contact Enquiries", icon: "contacts" },
    { id: "applications", label: "Applications", icon: "applications" },
  ];

  return (
    <>
      {mobileOpen ? (
        <button
          type="button"
          aria-label="Close admin navigation"
          className="fixed inset-0 z-[130] bg-slate-950/45 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      ) : null}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-[140] flex w-[270px] flex-col bg-[#031a3a] text-white shadow-2xl transition-transform duration-200 lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-20 items-center justify-between border-b border-white/10 px-6">
          <BrandLogo inverted />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation"
            className="grid h-9 w-9 place-items-center rounded-lg text-white/60 transition hover:bg-white/10 hover:text-white lg:hidden"
          >
            <AdminIcon name="close" className="h-5 w-5" />
          </button>
        </div>

        <div className="px-4 py-6">
          <p className="px-3 text-[0.65rem] font-black uppercase tracking-[0.16em] text-white/35">
            Workspace
          </p>
          <nav className="mt-3 space-y-1" aria-label="Admin navigation">
            {items.map((item) => {
              const active = tab === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    onTabChange(item.id);
                    onClose();
                  }}
                  className={cn(
                    "flex min-h-11 w-full items-center gap-3 rounded-xl px-3.5 text-left text-sm font-extrabold transition",
                    active
                      ? "bg-brand-orange text-white shadow-[0_10px_24px_rgba(255,90,20,.2)]"
                      : "text-white/65 hover:bg-white/[0.07] hover:text-white",
                  )}
                >
                  <AdminIcon name={item.icon} className="h-[18px] w-[18px]" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto border-t border-white/10 p-4">
          <div className="rounded-2xl bg-white/[0.06] p-3.5">
            <p className="truncate text-sm font-black text-white">{admin.name}</p>
            <p className="mt-1 truncate text-xs text-white/45">{admin.email}</p>
            <button
              type="button"
              onClick={onLogout}
              className="mt-4 flex min-h-11 w-full items-center justify-center gap-2 rounded-lg border border-white/10 text-xs font-extrabold text-white/65 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
            >
              <AdminIcon name="logout" className="h-4 w-4" />
              Sign out
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

function Toolbar({
  title,
  description,
  mobileMenu,
  refreshing,
  onRefresh,
}: {
  title: string;
  description: string;
  mobileMenu: () => void;
  refreshing: boolean;
  onRefresh: () => void;
}) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <div className="flex min-h-[76px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={mobileMenu}
            aria-label="Open admin navigation"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-slate-200 bg-white text-brand-blue lg:hidden"
          >
            <AdminIcon name="menu" className="h-5 w-5" />
          </button>
          <div className="min-w-0">
            <h1 className="truncate text-xl font-black tracking-[-0.03em] text-brand-ink sm:text-2xl">
              {title}
            </h1>
            <p className="mt-0.5 hidden text-xs text-slate-500 sm:block">
              {description}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onRefresh}
          aria-label="Refresh admin data"
          disabled={refreshing}
          className="flex h-10 shrink-0 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 text-xs font-extrabold text-brand-blue transition hover:bg-slate-50 disabled:opacity-50"
        >
          <AdminIcon
            name="refresh"
            className={cn("h-4 w-4", refreshing && "animate-spin")}
          />
          <span className="hidden sm:inline">Refresh</span>
        </button>
      </div>
    </header>
  );
}

function FilterBar({
  query,
  setQuery,
  status,
  setStatus,
  statusOptions,
  type,
  setType,
}: {
  query: string;
  setQuery: (value: string) => void;
  status: string;
  setStatus: (value: string) => void;
  statusOptions: readonly string[];
  type?: string;
  setType?: (value: string) => void;
}) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-[0_8px_24px_rgba(15,39,78,.04)] md:flex-row md:items-center">
      <label className="relative min-w-0 flex-1">
        <span className="sr-only">Search</span>
        <AdminIcon
          name="search"
          className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
        />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search name, email or organisation…"
          className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-brand-ink outline-none transition placeholder:text-slate-400 focus:border-brand-blue/40 focus:bg-white focus:ring-4 focus:ring-brand-blue/10"
        />
      </label>

      {setType ? (
        <select
          aria-label="Applicant type"
          value={type}
          onChange={(event) => setType(event.target.value)}
          className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm font-bold text-brand-blue outline-none focus:border-brand-blue/40"
        >
          <option value="">All applicant types</option>
          {APPLICATION_TYPES.map((option) => (
            <option key={option} value={option}>
              {humanize(option)}
            </option>
          ))}
        </select>
      ) : null}

      <select
        aria-label="Status filter"
        value={status}
        onChange={(event) => setStatus(event.target.value)}
        className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm font-bold text-brand-blue outline-none focus:border-brand-blue/40"
      >
        <option value="">All statuses</option>
        {statusOptions.map((option) => (
          <option key={option} value={option}>
            {humanize(option)}
          </option>
        ))}
      </select>
    </div>
  );
}

function EmptyState({ label }: { label: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
      <p className="text-sm font-black text-brand-blue">No {label} found.</p>
      <p className="mt-2 text-xs text-slate-500">
        Try changing the filters or refreshing the data.
      </p>
    </div>
  );
}

function PaginationBar({
  pagination,
  onPage,
}: {
  pagination: Pagination;
  onPage: (page: number) => void;
}) {
  if (pagination.totalPages <= 1) return null;

  return (
    <div className="mt-4 flex flex-col gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs sm:flex-row sm:items-center sm:justify-between">
      <p className="font-semibold text-slate-500">
        Page {pagination.page} of {pagination.totalPages} ·{" "}
        {pagination.total.toLocaleString("en-IN")} total
      </p>
      <div className="flex gap-2">
        <button
          type="button"
          disabled={pagination.page <= 1}
          onClick={() => onPage(pagination.page - 1)}
          className="h-9 rounded-lg border border-slate-200 px-3 font-extrabold text-brand-blue disabled:cursor-not-allowed disabled:opacity-40"
        >
          Previous
        </button>
        <button
          type="button"
          disabled={pagination.page >= pagination.totalPages}
          onClick={() => onPage(pagination.page + 1)}
          className="h-9 rounded-lg border border-slate-200 px-3 font-extrabold text-brand-blue disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}

function DetailDrawer({
  selected,
  busy,
  onClose,
  onStatusChange,
}: {
  selected: SelectedRecord | null;
  busy: boolean;
  onClose: () => void;
  onStatusChange: (status: ContactStatus | ApplicationStatus) => void;
}) {
  const drawerRef = useRef<HTMLElement>(null);
  const selectedId = selected?.record.id;
  useEffect(() => {
    if (!selectedId) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    drawerRef.current?.focus();
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") { event.preventDefault(); onClose(); return; }
      if (event.key !== "Tab") return;
      const controls = Array.from(drawerRef.current?.querySelectorAll<HTMLElement>('button:not(:disabled), select:not(:disabled), a[href]') || []);
      const first = controls[0]; const last = controls.at(-1);
      if (event.shiftKey && (document.activeElement === first || document.activeElement === drawerRef.current)) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    }
    window.addEventListener("keydown", handleKey);
    return () => { window.removeEventListener("keydown", handleKey); previousFocus?.focus({ preventScroll: true }); };
  }, [onClose, selectedId]);
  if (!selected) return null;

  const record = selected.record;
  const isContact = selected.kind === "contact";
  const statuses = isContact ? CONTACT_STATUSES : APPLICATION_STATUSES;

  return (
    <>
      <button
        type="button"
        className="fixed inset-0 z-[150] bg-slate-950/35 backdrop-blur-[2px]"
        aria-label="Close details"
        tabIndex={-1}
        aria-hidden="true"
        onClick={onClose}
      />
      <aside ref={drawerRef} role="dialog" aria-modal="true" aria-labelledby="admin-detail-title" tabIndex={-1} className="fixed inset-y-0 right-0 z-[160] w-full max-w-xl overflow-y-auto border-l border-slate-200 bg-white shadow-2xl outline-none">
        <div className="sticky top-0 z-10 flex min-h-[72px] items-center justify-between border-b border-slate-200 bg-white/95 px-5 backdrop-blur sm:px-6">
          <div>
            <p className="text-[0.65rem] font-black uppercase tracking-[0.14em] text-brand-orange">
              {isContact ? "Contact enquiry" : "Application"}
            </p>
            <h2 id="admin-detail-title" className="mt-1 text-xl font-black text-brand-ink">{record.name}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close details"
            className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 text-slate-500 transition hover:bg-slate-50 hover:text-brand-blue"
          >
            <AdminIcon name="close" className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-6 p-5 sm:p-6">
          <section className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-extrabold text-slate-500">
                  Current status
                </p>
                <span
                  className={cn(
                    "mt-2 inline-flex rounded-full border px-2.5 py-1 text-[0.68rem] font-black",
                    statusClass(record.status),
                  )}
                >
                  {humanize(record.status)}
                </span>
              </div>
              <select
                aria-label="Update status"
                value={record.status}
                disabled={busy}
                onChange={(event) =>
                  onStatusChange(
                    event.target.value as ContactStatus | ApplicationStatus,
                  )
                }
                className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-xs font-extrabold text-brand-blue outline-none disabled:opacity-50"
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {humanize(status)}
                  </option>
                ))}
              </select>
            </div>
          </section>

          <section>
            <h3 className="text-xs font-black uppercase tracking-[0.12em] text-slate-400">
              Contact details
            </h3>
            <dl className="mt-3 grid gap-3 sm:grid-cols-2">
              <DetailItem label="Email" value={record.email} />
              <DetailItem label="Phone" value={record.phone} />
              {isContact ? (
                <>
                  <DetailItem
                    label="Organisation"
                    value={(record as ContactSubmission).organization}
                  />
                  <DetailItem
                    label="Subject"
                    value={(record as ContactSubmission).subject}
                  />
                </>
              ) : (
                <>
                  <DetailItem
                    label="Applicant type"
                    value={humanize(
                      (record as ApplicationSubmission).applicant_type,
                    )}
                  />
                  <DetailItem
                    label="Location"
                    value={[
                      (record as ApplicationSubmission).city,
                      (record as ApplicationSubmission).state,
                    ]
                      .filter(Boolean)
                      .join(", ")}
                  />
                </>
              )}
              <DetailItem label="Submitted" value={formatDate(record.created_at)} />
              <DetailItem
                label="Notification"
                value={humanize(record.notification_status)}
              />
            </dl>
          </section>

          <section>
            <h3 className="text-xs font-black uppercase tracking-[0.12em] text-slate-400">
              Message
            </h3>
            <div className="mt-3 whitespace-pre-wrap rounded-2xl border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-600">
              {record.message || "No message provided."}
            </div>
          </section>

          {!isContact ? (
            <section>
              <h3 className="text-xs font-black uppercase tracking-[0.12em] text-slate-400">
                Application details
              </h3>
              <dl className="mt-3 grid gap-3 sm:grid-cols-2">
                {Object.entries(
                  (record as ApplicationSubmission).details || {},
                ).map(([key, value]) => (
                  <DetailItem
                    key={key}
                    label={humanize(key)}
                    value={
                      Array.isArray(value)
                        ? value.map(String).join(", ")
                        : value == null
                          ? "—"
                          : typeof value === "object"
                            ? JSON.stringify(value)
                            : String(value)
                    }
                  />
                ))}
              </dl>
            </section>
          ) : null}

          <p className="break-all text-[0.68rem] text-slate-400">
            ID: {record.id}
          </p>
        </div>
      </aside>
    </>
  );
}

function DetailItem({
  label,
  value,
}: {
  label: string;
  value: string | null | undefined;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3.5">
      <dt className="text-[0.65rem] font-black uppercase tracking-[0.1em] text-slate-400">
        {label}
      </dt>
      <dd className="mt-1.5 break-words text-sm font-bold text-brand-ink">
        {value || "—"}
      </dd>
    </div>
  );
}

export function AdminPortal() {
  // Session storage is client-only; keep the first render consistent with the server.
  const hydrated = useSyncExternalStore(subscribeToHydration, clientHydrated, serverHydrated);
  return hydrated ? <AdminWorkspace /> : <AdminLoading />;
}

function AdminLoading() {
  return (
    <div className="fixed inset-0 z-[120] grid place-items-center bg-[#f5f8fd]">
      <div className="text-center">
        <span className="mx-auto block h-9 w-9 animate-spin rounded-full border-4 border-brand-blue/15 border-t-brand-orange" />
        <p className="mt-4 text-sm font-bold text-brand-blue">Loading admin portal…</p>
      </div>
    </div>
  );
}

function AdminWorkspace() {
  const [initialToken] = useState(readStoredToken);
  const [token, setToken] = useState(initialToken);
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [booting, setBooting] = useState(Boolean(initialToken));
  const [authScreen, setAuthScreen] = useState<"signin" | "signing-out" | "signed-out" | "logout-error">("signin");
  const [logoutError, setLogoutError] = useState("");
  const tokenRef = useRef(initialToken);
  const sessionVersion = useRef(0);
  const activeRequests = useRef(new Set<AbortController>());
  const logoutTokenRef = useRef("");
  const logoutRequestRef = useRef<AbortController | null>(null);
  const [tab, setTab] = useState<AdminTab>("overview");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [refreshVersion, setRefreshVersion] = useState(0);
  const [completedRefresh, setCompletedRefresh] = useState("");
  const [error, setError] = useState("");
  const [selected, setSelected] = useState<SelectedRecord | null>(null);
  const closeDetails = useCallback(() => setSelected(null), []);
  const [statusBusy, setStatusBusy] = useState(false);

  const [summary, setSummary] = useState<DashboardSummary | null>(null);

  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [contactPagination, setContactPagination] =
    useState<Pagination>(emptyPagination);
  const [contactPage, setContactPage] = useState(1);
  const [contactStatus, setContactStatus] = useState("");
  const [contactQuery, setContactQuery] = useState("");

  const [applications, setApplications] = useState<ApplicationSubmission[]>([]);
  const [applicationPagination, setApplicationPagination] =
    useState<Pagination>(emptyPagination);
  const [applicationPage, setApplicationPage] = useState(1);
  const [applicationStatus, setApplicationStatus] = useState("");
  const [applicationType, setApplicationType] = useState("");
  const [applicationQuery, setApplicationQuery] = useState("");

  const refreshKey = JSON.stringify([
    token, tab, contactPage, contactStatus, contactQuery,
    applicationPage, applicationStatus, applicationType, applicationQuery, refreshVersion,
  ]);
  const refreshing = Boolean(token && admin && completedRefresh !== refreshKey);

  const clearClientSession = useCallback(() => {
    sessionVersion.current += 1;
    for (const controller of activeRequests.current) controller.abort();
    activeRequests.current.clear();
    tokenRef.current = "";
    try { sessionStorage.removeItem(TOKEN_KEY); } catch { /* Storage can be unavailable in private browsing. */ }
    setToken(""); setAdmin(null); setBooting(false);
    setSummary(null); setContacts([]); setApplications([]); setSelected(null);
    setContactPagination(emptyPagination); setApplicationPagination(emptyPagination);
    setContactPage(1); setApplicationPage(1);
    setContactStatus(""); setContactQuery(""); setApplicationStatus(""); setApplicationType(""); setApplicationQuery("");
    setTab("overview"); setMobileOpen(false); setStatusBusy(false);
    setCompletedRefresh(""); setRefreshVersion(0); setError("");
  }, []);

  useEffect(() => {
    const requests = activeRequests.current;
    return () => {
      for (const controller of requests) controller.abort();
      requests.clear();
      logoutRequestRef.current?.abort();
    };
  }, []);

  const apiFetch = useCallback(
    async <T,>(path: string, options?: RequestInit): Promise<T> => {
      if (!token || tokenRef.current !== token) throw new DOMException("Session ended", "AbortError");
      const version = sessionVersion.current;
      const controller = new AbortController();
      activeRequests.current.add(controller);
      const signal = options?.signal ? AbortSignal.any([controller.signal, options.signal]) : controller.signal;
      try {
        const response = await fetch(path, {
          ...options, signal,
          headers: {
            ...(options?.body ? { "Content-Type": "application/json" } : {}),
            Authorization: `Bearer ${token}`,
            ...options?.headers,
          },
          cache: "no-store",
        });
        if (version !== sessionVersion.current || signal.aborted) throw new DOMException("Session ended", "AbortError");
        if (response.status === 401) throw new AdminSessionExpiredError("Your session has expired. Please sign in again.");
        const data = await parseResponse<T>(response);
        if (version !== sessionVersion.current || signal.aborted) throw new DOMException("Session ended", "AbortError");
        return data;
      } finally {
        activeRequests.current.delete(controller);
      }
    },
    [token],
  );

  const handleRequestError = useCallback((requestError: unknown, fallback: string) => {
    if (requestError instanceof Error && requestError.name === "AbortError") return;
    if (requestError instanceof AdminSessionExpiredError) {
      clearClientSession();
      setAuthScreen("signin");
    }
    setError(requestError instanceof Error ? requestError.message : fallback);
  }, [clearClientSession]);

  const loadSummary = useCallback((signal?: AbortSignal) =>
    apiFetch<DashboardSummary>("/api/v1/admin/dashboard/summary", { signal }), [apiFetch]);

  const loadContacts = useCallback(async (signal?: AbortSignal) => {
    const params = new URLSearchParams({
      page: String(contactPage),
      limit: "20",
    });
    if (contactStatus) params.set("status", contactStatus);
    if (contactQuery.trim()) params.set("query", contactQuery.trim());

    return apiFetch<ApiList<ContactSubmission>>(
      `/api/v1/admin/contacts?${params.toString()}`,
      { signal },
    );
  }, [apiFetch, contactPage, contactQuery, contactStatus]);

  const loadApplications = useCallback(async (signal?: AbortSignal) => {
    const params = new URLSearchParams({
      page: String(applicationPage),
      limit: "20",
    });
    if (applicationStatus) params.set("status", applicationStatus);
    if (applicationType) params.set("type", applicationType);
    if (applicationQuery.trim()) params.set("query", applicationQuery.trim());

    return apiFetch<ApiList<ApplicationSubmission>>(
      `/api/v1/admin/applications?${params.toString()}`,
      { signal },
    );
  }, [
    apiFetch,
    applicationPage,
    applicationQuery,
    applicationStatus,
    applicationType,
  ]);

  useEffect(() => {
    if (!initialToken) return;

    const sessionToken = initialToken;
    let active = true;
    const controller = new AbortController();
    const version = sessionVersion.current;
    const requests = activeRequests.current;
    requests.add(controller);

    async function restoreSession() {
      try {
        if (readStoredToken() !== sessionToken || tokenRef.current !== sessionToken) throw new Error("Session ended");
        const response = await fetch("/api/v1/admin/auth/me", {
          headers: { Authorization: `Bearer ${sessionToken}` },
          cache: "no-store",
          signal: controller.signal,
        });
        const data = await parseResponse<{ admin: AdminUser }>(response);

        if (!active || version !== sessionVersion.current) return;
        setToken(sessionToken);
        setAdmin(data.admin);
      } catch {
        if (!active || version !== sessionVersion.current) return;
        clearClientSession();
      } finally {
        requests.delete(controller);
        if (active && version === sessionVersion.current) setBooting(false);
      }
    }

    void restoreSession();

    return () => {
      active = false;
      controller.abort();
      requests.delete(controller);
    };
  }, [clearClientSession, initialToken]);

  useEffect(() => {
    // A browser history cache must revalidate with the server before showing records.
    function revalidate(event: PageTransitionEvent) {
      if (!event.persisted) return;
      const sessionToken = readStoredToken();
      if (!sessionToken || sessionToken !== tokenRef.current) { clearClientSession(); setAuthScreen("signin"); return; }
      setBooting(true);
      const version = sessionVersion.current;
      const controller = new AbortController();
      activeRequests.current.add(controller);
      void fetch("/api/v1/admin/auth/me", { headers: { Authorization: `Bearer ${sessionToken}` }, cache: "no-store", signal: controller.signal })
        .then(response => parseResponse<{ admin: AdminUser }>(response))
        .then(data => { if (version === sessionVersion.current && !controller.signal.aborted) setAdmin(data.admin); })
        .catch(() => { if (version === sessionVersion.current && !controller.signal.aborted) { clearClientSession(); setAuthScreen("signin"); } })
        .finally(() => { activeRequests.current.delete(controller); if (version === sessionVersion.current) setBooting(false); });
    }
    window.addEventListener("pageshow", revalidate);
    return () => window.removeEventListener("pageshow", revalidate);
  }, [clearClientSession]);

  useEffect(() => {
    if (!token || !admin) return;
    const controller = new AbortController();
    const { signal } = controller;
    const version = sessionVersion.current;
    void Promise.all([
      loadSummary(signal),
      tab !== "applications" ? loadContacts(signal) : Promise.resolve(null),
      tab !== "contacts" ? loadApplications(signal) : Promise.resolve(null),
    ]).then(([nextSummary, nextContacts, nextApplications]) => {
      if (signal.aborted || version !== sessionVersion.current) return;
      setSummary(nextSummary);
      if (nextContacts) {
        setContacts(nextContacts.data);
        setContactPagination(nextContacts.pagination);
      }
      if (nextApplications) {
        setApplications(nextApplications.data);
        setApplicationPagination(nextApplications.pagination);
      }
      setError("");
    }).catch(refreshError => {
      if (!signal.aborted && version === sessionVersion.current) handleRequestError(refreshError, "Unable to load admin data.");
    }).finally(() => {
      if (!signal.aborted && version === sessionVersion.current) setCompletedRefresh(refreshKey);
    });
    return () => controller.abort();
  }, [admin, handleRequestError, loadApplications, loadContacts, loadSummary, refreshKey, tab, token]);

  const pageMeta = useMemo(() => {
    if (tab === "contacts") {
      return {
        title: "Contact Enquiries",
        description: "Review and manage incoming partnership enquiries.",
      };
    }

    if (tab === "applications") {
      return {
        title: "Applications",
        description: "Track student and organisation applications.",
      };
    }

    return {
      title: "Dashboard Overview",
      description: "A live view of Ignited Brains submissions and activity.",
    };
  }, [tab]);

  function handleAuthenticated(nextToken: string, nextAdmin: AdminUser) {
    try { sessionStorage.setItem(TOKEN_KEY, nextToken); } catch { /* The current tab can still use an in-memory session. */ }
    tokenRef.current = nextToken;
    setToken(nextToken);
    setAdmin(nextAdmin);
    setBooting(false);
    setError(""); setAuthScreen("signin"); setLogoutError(""); logoutTokenRef.current = "";
  }

  async function handleLogout() {
    if (logoutRequestRef.current) return;
    const sessionToken = tokenRef.current || logoutTokenRef.current;
    if (!sessionToken) { clearClientSession(); setAuthScreen("signin"); return; }
    logoutTokenRef.current = sessionToken;
    clearClientSession();
    setAuthScreen("signing-out"); setLogoutError("");
    const controller = new AbortController();
    logoutRequestRef.current = controller;
    try {
      const response = await fetch("/api/v1/admin/auth/logout", { method: "POST", headers: { Authorization: `Bearer ${sessionToken}`, Accept: "application/json" }, cache: "no-store", signal: controller.signal, keepalive: true });
      // A 401 means the server has already invalidated or expired this session.
      if (!response.ok && response.status !== 401) await parseResponse(response);
      if (!controller.signal.aborted) { logoutTokenRef.current = ""; setAuthScreen("signed-out"); }
    } catch {
      if (!controller.signal.aborted) { setLogoutError("Your browser session is cleared, but the server could not confirm sign-out. Check your connection and retry to finish ending the session."); setAuthScreen("logout-error"); }
    } finally {
      logoutRequestRef.current = null;
    }
  }

  async function updateSelectedStatus(
    nextStatus: ContactStatus | ApplicationStatus,
  ) {
    if (!selected) return;

    setStatusBusy(true);
    setError("");

    try {
      const endpoint =
        selected.kind === "contact"
          ? `/api/v1/admin/contacts/${selected.record.id}/status`
          : `/api/v1/admin/applications/${selected.record.id}/status`;

      const data = await apiFetch<{
        data: ContactSubmission | ApplicationSubmission;
      }>(endpoint, {
        method: "PATCH",
        body: JSON.stringify({ status: nextStatus }),
      });

      if (selected.kind === "contact") {
        const updated = data.data as ContactSubmission;
        setContacts((items) =>
          items.map((item) => (item.id === updated.id ? updated : item)),
        );
        setSelected({ kind: "contact", record: updated });
      } else {
        const updated = data.data as ApplicationSubmission;
        setApplications((items) =>
          items.map((item) => (item.id === updated.id ? updated : item)),
        );
        setSelected({ kind: "application", record: updated });
      }

      setSummary(await loadSummary());
    } catch (statusError) {
      handleRequestError(statusError, "Unable to update status.");
    } finally {
      setStatusBusy(false);
    }
  }

  if (booting) {
    return <AdminLoading />;
  }

  if (authScreen === "signing-out" || authScreen === "logout-error") return <AdminSessionEnding error={logoutError} onRetry={() => void handleLogout()} />;
  if (authScreen === "signed-out") return <AdminSignedOut onSignIn={() => { setError(""); setAuthScreen("signin"); }} />;

  if (!token || !admin) {
    return <AdminLogin onAuthenticated={handleAuthenticated} sessionError={error} />;
  }

  return (
    <div className="fixed inset-0 z-[120] overflow-hidden bg-[#f5f8fd] text-brand-ink">
      <Sidebar
        tab={tab}
        admin={admin}
        mobileOpen={mobileOpen}
        onTabChange={setTab}
        onClose={() => setMobileOpen(false)}
        onLogout={handleLogout}
      />

      <div className="flex h-svh min-w-0 flex-col lg:pl-[270px]">
        <Toolbar
          title={pageMeta.title}
          description={pageMeta.description}
          mobileMenu={() => setMobileOpen(true)}
          refreshing={refreshing}
          onRefresh={() => { setError(""); setRefreshVersion(version => version + 1); }}
        />

        <main className="min-h-0 flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-[1500px] p-4 sm:p-6 lg:p-8">
            {error ? (
              <div
                role="alert"
                className="mb-5 flex items-start justify-between gap-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700"
              >
                <span>{error}</span>
                <button
                  type="button"
                  onClick={() => setError("")}
                  className="shrink-0 text-xs font-black"
                >
                  Dismiss
                </button>
              </div>
            ) : null}

            {tab === "overview" ? (
              <section>
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  <StatCard
                    label="Contact enquiries"
                    value={summary?.contacts.total ?? 0}
                    helper={`${summary?.contacts.new ?? 0} new enquiries`}
                    icon="contacts"
                    accent="blue"
                  />
                  <StatCard
                    label="Applications"
                    value={summary?.applications.total ?? 0}
                    helper={`${summary?.applications.new ?? 0} awaiting review`}
                    icon="applications"
                    accent="orange"
                  />
                  <StatCard
                    label="Students"
                    value={summary?.applications.students ?? 0}
                    helper="Student applications"
                    icon="applications"
                    accent="violet"
                  />
                  <StatCard
                    label="Organisations"
                    value={summary?.applications.organizations ?? 0}
                    helper="Institutional applications"
                    icon="overview"
                    accent="green"
                  />
                </div>

                <div className="mt-6 grid gap-6 xl:grid-cols-2">
                  <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_12px_30px_rgba(15,39,78,.05)]">
                    <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                      <div>
                        <h2 className="text-base font-black text-brand-ink">
                          Recent enquiries
                        </h2>
                        <p className="mt-0.5 text-xs text-slate-500">
                          Latest contact submissions
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setTab("contacts")}
                        className="text-xs font-black text-brand-orange"
                      >
                        View all
                      </button>
                    </div>
                    <div className="divide-y divide-slate-100">
                      {contacts.slice(0, 6).map((contact) => (
                        <button
                          key={contact.id}
                          type="button"
                          onClick={() =>
                            setSelected({ kind: "contact", record: contact })
                          }
                          className="flex w-full items-center gap-3 px-5 py-4 text-left transition hover:bg-slate-50"
                        >
                          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-blue-50 text-sm font-black text-brand-blue">
                            {contact.name.slice(0, 1).toUpperCase()}
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-sm font-black text-brand-ink">
                              {contact.name}
                            </span>
                            <span className="mt-0.5 block truncate text-xs text-slate-500">
                              {contact.organization || contact.email}
                            </span>
                          </span>
                          <span
                            className={cn(
                              "hidden rounded-full border px-2 py-1 text-[0.62rem] font-black sm:inline-flex",
                              statusClass(contact.status),
                            )}
                          >
                            {humanize(contact.status)}
                          </span>
                        </button>
                      ))}
                      {!contacts.length ? (
                        <p className="px-5 py-10 text-center text-sm text-slate-400">
                          No enquiries yet.
                        </p>
                      ) : null}
                    </div>
                  </section>

                  <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_12px_30px_rgba(15,39,78,.05)]">
                    <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                      <div>
                        <h2 className="text-base font-black text-brand-ink">
                          Recent applications
                        </h2>
                        <p className="mt-0.5 text-xs text-slate-500">
                          Latest student and organisation applications
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setTab("applications")}
                        className="text-xs font-black text-brand-orange"
                      >
                        View all
                      </button>
                    </div>
                    <div className="divide-y divide-slate-100">
                      {applications.slice(0, 6).map((application) => (
                        <button
                          key={application.id}
                          type="button"
                          onClick={() =>
                            setSelected({
                              kind: "application",
                              record: application,
                            })
                          }
                          className="flex w-full items-center gap-3 px-5 py-4 text-left transition hover:bg-slate-50"
                        >
                          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-orange-50 text-sm font-black text-brand-orange">
                            {application.name.slice(0, 1).toUpperCase()}
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-sm font-black text-brand-ink">
                              {application.name}
                            </span>
                            <span className="mt-0.5 block truncate text-xs text-slate-500">
                              {humanize(application.applicant_type)} ·{" "}
                              {[application.city, application.state]
                                .filter(Boolean)
                                .join(", ") || application.email}
                            </span>
                          </span>
                          <span
                            className={cn(
                              "hidden rounded-full border px-2 py-1 text-[0.62rem] font-black sm:inline-flex",
                              statusClass(application.status),
                            )}
                          >
                            {humanize(application.status)}
                          </span>
                        </button>
                      ))}
                      {!applications.length ? (
                        <p className="px-5 py-10 text-center text-sm text-slate-400">
                          No applications yet.
                        </p>
                      ) : null}
                    </div>
                  </section>
                </div>
              </section>
            ) : null}

            {tab === "contacts" ? (
              <section>
                <FilterBar
                  query={contactQuery}
                  setQuery={query => { setContactQuery(query); setContactPage(1); }}
                  status={contactStatus}
                  setStatus={status => { setContactStatus(status); setContactPage(1); }}
                  statusOptions={CONTACT_STATUSES}
                />

                <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_8px_24px_rgba(15,39,78,.04)]">
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[850px] border-collapse text-left">
                      <thead>
                        <tr className="border-b border-slate-200 bg-slate-50/80 text-[0.65rem] font-black uppercase tracking-[0.1em] text-slate-400">
                          <th className="px-5 py-3.5">Contact</th>
                          <th className="px-5 py-3.5">Organisation</th>
                          <th className="px-5 py-3.5">Submitted</th>
                          <th className="px-5 py-3.5">Notification</th>
                          <th className="px-5 py-3.5">Status</th>
                          <th className="w-16 px-5 py-3.5" />
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {contacts.map((contact) => (
                          <tr
                            key={contact.id}
                            className="text-sm transition hover:bg-slate-50/80"
                          >
                            <td className="px-5 py-4">
                              <p className="font-black text-brand-ink">
                                {contact.name}
                              </p>
                              <p className="mt-1 text-xs text-slate-500">
                                {contact.email}
                              </p>
                            </td>
                            <td className="px-5 py-4 text-sm font-semibold text-slate-600">
                              {contact.organization || "—"}
                            </td>
                            <td className="px-5 py-4 text-xs font-medium text-slate-500">
                              {formatDate(contact.created_at)}
                            </td>
                            <td className="px-5 py-4">
                              <span className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500">
                                <span
                                  className={cn(
                                    "h-2 w-2 rounded-full",
                                    notificationClass(
                                      contact.notification_status,
                                    ),
                                  )}
                                />
                                {humanize(contact.notification_status)}
                              </span>
                            </td>
                            <td className="px-5 py-4">
                              <span
                                className={cn(
                                  "inline-flex rounded-full border px-2.5 py-1 text-[0.65rem] font-black",
                                  statusClass(contact.status),
                                )}
                              >
                                {humanize(contact.status)}
                              </span>
                            </td>
                            <td className="px-5 py-4 text-right">
                              <button
                                type="button"
                                onClick={() =>
                                  setSelected({
                                    kind: "contact",
                                    record: contact,
                                  })
                                }
                                aria-label={`View ${contact.name}`}
                                className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-brand-blue/30 hover:bg-blue-50 hover:text-brand-blue"
                              >
                                <AdminIcon name="arrow" className="h-4 w-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {!contacts.length ? <EmptyState label="contact enquiries" /> : null}
                <PaginationBar
                  pagination={contactPagination}
                  onPage={setContactPage}
                />
              </section>
            ) : null}

            {tab === "applications" ? (
              <section>
                <FilterBar
                  query={applicationQuery}
                  setQuery={query => { setApplicationQuery(query); setApplicationPage(1); }}
                  status={applicationStatus}
                  setStatus={status => { setApplicationStatus(status); setApplicationPage(1); }}
                  statusOptions={APPLICATION_STATUSES}
                  type={applicationType}
                  setType={type => { setApplicationType(type); setApplicationPage(1); }}
                />

                <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_8px_24px_rgba(15,39,78,.04)]">
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[900px] border-collapse text-left">
                      <thead>
                        <tr className="border-b border-slate-200 bg-slate-50/80 text-[0.65rem] font-black uppercase tracking-[0.1em] text-slate-400">
                          <th className="px-5 py-3.5">Applicant</th>
                          <th className="px-5 py-3.5">Type</th>
                          <th className="px-5 py-3.5">Location</th>
                          <th className="px-5 py-3.5">Submitted</th>
                          <th className="px-5 py-3.5">Status</th>
                          <th className="w-16 px-5 py-3.5" />
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {applications.map((application) => (
                          <tr
                            key={application.id}
                            className="text-sm transition hover:bg-slate-50/80"
                          >
                            <td className="px-5 py-4">
                              <p className="font-black text-brand-ink">
                                {application.name}
                              </p>
                              <p className="mt-1 text-xs text-slate-500">
                                {application.email}
                              </p>
                            </td>
                            <td className="px-5 py-4">
                              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[0.65rem] font-black text-slate-600">
                                {humanize(application.applicant_type)}
                              </span>
                            </td>
                            <td className="px-5 py-4 text-sm font-semibold text-slate-600">
                              {[application.city, application.state]
                                .filter(Boolean)
                                .join(", ") || "—"}
                            </td>
                            <td className="px-5 py-4 text-xs font-medium text-slate-500">
                              {formatDate(application.created_at)}
                            </td>
                            <td className="px-5 py-4">
                              <span
                                className={cn(
                                  "inline-flex rounded-full border px-2.5 py-1 text-[0.65rem] font-black",
                                  statusClass(application.status),
                                )}
                              >
                                {humanize(application.status)}
                              </span>
                            </td>
                            <td className="px-5 py-4 text-right">
                              <button
                                type="button"
                                onClick={() =>
                                  setSelected({
                                    kind: "application",
                                    record: application,
                                  })
                                }
                                aria-label={`View ${application.name}`}
                                className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-brand-blue/30 hover:bg-blue-50 hover:text-brand-blue"
                              >
                                <AdminIcon name="arrow" className="h-4 w-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {!applications.length ? <EmptyState label="applications" /> : null}
                <PaginationBar
                  pagination={applicationPagination}
                  onPage={setApplicationPage}
                />
              </section>
            ) : null}
          </div>
        </main>
      </div>

      <DetailDrawer
        selected={selected}
        busy={statusBusy}
        onClose={closeDetails}
        onStatusChange={(status) => void updateSelectedStatus(status)}
      />
    </div>
  );
}
