"use client";

import {
  type FormEvent,
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { BrandLogo } from "@/components/layout/brand-logo";
import { cn } from "@/lib/cn";

const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
).replace(/\/$/, "");

const TOKEN_KEY = "ignited-brains-admin-token";

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

function LoginScreen({
  onAuthenticated,
}: {
  onAuthenticated: (token: string, admin: AdminUser) => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/admin/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await parseResponse<{
        token: string;
        admin: AdminUser;
      }>(response);

      sessionStorage.setItem(TOKEN_KEY, data.token);
      onAuthenticated(data.token, data.admin);
    } catch (loginError) {
      setError(
        loginError instanceof Error
          ? loginError.message
          : "Unable to sign in. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[120] overflow-y-auto bg-[#f5f8fd]">
      <div className="grid min-h-svh lg:grid-cols-[1.1fr_0.9fr]">
        <section className="relative hidden overflow-hidden bg-[#031a3a] p-12 text-white lg:flex lg:flex-col lg:justify-between xl:p-16">
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            aria-hidden="true"
            style={{
              background:
                "radial-gradient(circle at 75% 15%, rgba(54,124,255,.45), transparent 28rem), radial-gradient(circle at 15% 90%, rgba(255,90,20,.2), transparent 28rem)",
            }}
          />
          <div className="relative">
            <BrandLogo inverted />
          </div>

          <div className="relative max-w-2xl">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-brand-orange">
              Administration Portal
            </p>
            <h1 className="mt-5 text-balance text-5xl font-black leading-[0.98] tracking-[-0.05em] xl:text-6xl">
              Keep every enquiry and application moving.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-white/65">
              Review incoming leads, track applicants, update statuses and keep
              the Ignited Brains team aligned from one secure workspace.
            </p>
          </div>

          <p className="relative text-xs text-white/40">
            Restricted access · Ignited Brains internal use
          </p>
        </section>

        <section className="flex min-h-svh items-center justify-center px-5 py-10 sm:px-8">
          <div className="w-full max-w-[440px]">
            <div className="mb-8 lg:hidden">
              <BrandLogo />
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_30px_80px_rgba(15,39,78,.12)] sm:p-8">
              <span className="inline-flex rounded-full bg-orange-50 px-3 py-1 text-[0.68rem] font-black uppercase tracking-[0.13em] text-brand-orange">
                Secure Admin
              </span>
              <h2 className="mt-5 text-3xl font-black tracking-[-0.04em] text-brand-blue">
                Welcome back.
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Sign in with your Ignited Brains administrator credentials.
              </p>

              <form onSubmit={handleSubmit} className="mt-7 space-y-5">
                <label className="block text-xs font-extrabold text-brand-blue">
                  Email address
                  <input
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    type="email"
                    autoComplete="username"
                    required
                    placeholder="admin@ignitedbrains.com"
                    className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-base font-medium text-brand-ink outline-none transition placeholder:text-slate-300 focus:border-brand-blue/50 focus:ring-4 focus:ring-brand-blue/10"
                  />
                </label>

                <label className="block text-xs font-extrabold text-brand-blue">
                  Password
                  <span className="relative mt-2 block">
                    <input
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      required
                      placeholder="Enter your password"
                      className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 pr-12 text-base font-medium text-brand-ink outline-none transition placeholder:text-slate-300 focus:border-brand-blue/50 focus:ring-4 focus:ring-brand-blue/10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((value) => !value)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      className="absolute right-2 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-lg text-slate-400 transition hover:bg-slate-50 hover:text-brand-blue"
                    >
                      <AdminIcon name="eye" className="h-4 w-4" />
                    </button>
                  </span>
                </label>

                {error ? (
                  <div
                    role="alert"
                    className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700"
                  >
                    {error}
                  </div>
                ) : null}

                <button
                  type="submit"
                  disabled={submitting}
                  className="flex h-12 w-full items-center justify-center rounded-xl bg-brand-orange px-5 text-sm font-black text-white shadow-[0_12px_30px_rgba(255,90,20,.25)] transition hover:bg-brand-orange-dark disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? "Signing in…" : "Sign in to Admin"}
                </button>
              </form>
            </div>

            <p className="mt-5 text-center text-xs text-slate-400">
              API: {API_BASE_URL}
            </p>
          </div>
        </section>
      </div>
    </div>
  );
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
              className="mt-4 flex h-9 w-full items-center justify-center gap-2 rounded-lg border border-white/10 text-xs font-extrabold text-white/65 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
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
        onClick={onClose}
      />
      <aside className="fixed inset-y-0 right-0 z-[160] w-full max-w-xl overflow-y-auto border-l border-slate-200 bg-white shadow-2xl">
        <div className="sticky top-0 z-10 flex min-h-[72px] items-center justify-between border-b border-slate-200 bg-white/95 px-5 backdrop-blur sm:px-6">
          <div>
            <p className="text-[0.65rem] font-black uppercase tracking-[0.14em] text-brand-orange">
              {isContact ? "Contact enquiry" : "Application"}
            </p>
            <h2 className="mt-1 text-xl font-black text-brand-ink">{record.name}</h2>
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
  const [token, setToken] = useState("");
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [booting, setBooting] = useState(true);
  const [tab, setTab] = useState<AdminTab>("overview");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState<SelectedRecord | null>(null);
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

  const apiFetch = useCallback(
    async <T,>(path: string, options?: RequestInit): Promise<T> => {
      if (!token) throw new Error("Authentication required");

      const response = await fetch(`${API_BASE_URL}${path}`, {
        ...options,
        headers: {
          ...(options?.body ? { "Content-Type": "application/json" } : {}),
          Authorization: `Bearer ${token}`,
          ...options?.headers,
        },
        cache: "no-store",
      });

      if (response.status === 401) {
        sessionStorage.removeItem(TOKEN_KEY);
        setToken("");
        setAdmin(null);
        throw new Error("Your session has expired. Please sign in again.");
      }

      return parseResponse<T>(response);
    },
    [token],
  );

  const loadSummary = useCallback(async () => {
    if (!token) return;
    const data = await apiFetch<DashboardSummary>("/api/v1/admin/dashboard/summary");
    setSummary(data);
  }, [apiFetch, token]);

  const loadContacts = useCallback(async () => {
    if (!token) return;

    const params = new URLSearchParams({
      page: String(contactPage),
      limit: "20",
    });
    if (contactStatus) params.set("status", contactStatus);
    if (contactQuery.trim()) params.set("query", contactQuery.trim());

    const data = await apiFetch<ApiList<ContactSubmission>>(
      `/api/v1/admin/contacts?${params.toString()}`,
    );
    setContacts(data.data);
    setContactPagination(data.pagination);
  }, [apiFetch, contactPage, contactQuery, contactStatus, token]);

  const loadApplications = useCallback(async () => {
    if (!token) return;

    const params = new URLSearchParams({
      page: String(applicationPage),
      limit: "20",
    });
    if (applicationStatus) params.set("status", applicationStatus);
    if (applicationType) params.set("type", applicationType);
    if (applicationQuery.trim()) params.set("query", applicationQuery.trim());

    const data = await apiFetch<ApiList<ApplicationSubmission>>(
      `/api/v1/admin/applications?${params.toString()}`,
    );
    setApplications(data.data);
    setApplicationPagination(data.pagination);
  }, [
    apiFetch,
    applicationPage,
    applicationQuery,
    applicationStatus,
    applicationType,
    token,
  ]);

  const refreshCurrent = useCallback(async () => {
    if (!token) return;
    setRefreshing(true);
    setError("");

    try {
      if (tab === "overview") {
        await Promise.all([loadSummary(), loadContacts(), loadApplications()]);
      } else if (tab === "contacts") {
        await Promise.all([loadSummary(), loadContacts()]);
      } else {
        await Promise.all([loadSummary(), loadApplications()]);
      }
    } catch (refreshError) {
      setError(
        refreshError instanceof Error
          ? refreshError.message
          : "Unable to load admin data.",
      );
    } finally {
      setRefreshing(false);
    }
  }, [loadApplications, loadContacts, loadSummary, tab, token]);

  useEffect(() => {
    const storedToken = sessionStorage.getItem(TOKEN_KEY);
    if (!storedToken) {
      setBooting(false);
      return;
    }

    let active = true;

    async function restoreSession() {
      try {
        const response = await fetch(`${API_BASE_URL}/api/v1/admin/auth/me`, {
          headers: { Authorization: `Bearer ${storedToken}` },
          cache: "no-store",
        });
        const data = await parseResponse<{ admin: AdminUser }>(response);

        if (!active) return;
        setToken(storedToken);
        setAdmin(data.admin);
      } catch {
        sessionStorage.removeItem(TOKEN_KEY);
      } finally {
        if (active) setBooting(false);
      }
    }

    void restoreSession();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!token || !admin) return;
    void refreshCurrent();
  }, [admin, refreshCurrent, token]);

  useEffect(() => {
    setContactPage(1);
  }, [contactQuery, contactStatus]);

  useEffect(() => {
    setApplicationPage(1);
  }, [applicationQuery, applicationStatus, applicationType]);

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
    setToken(nextToken);
    setAdmin(nextAdmin);
    setBooting(false);
  }

  function handleLogout() {
    sessionStorage.removeItem(TOKEN_KEY);
    setToken("");
    setAdmin(null);
    setSummary(null);
    setContacts([]);
    setApplications([]);
    setSelected(null);
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

      await loadSummary();
    } catch (statusError) {
      setError(
        statusError instanceof Error
          ? statusError.message
          : "Unable to update status.",
      );
    } finally {
      setStatusBusy(false);
    }
  }

  if (booting) {
    return (
      <div className="fixed inset-0 z-[120] grid place-items-center bg-[#f5f8fd]">
        <div className="text-center">
          <span className="mx-auto block h-9 w-9 animate-spin rounded-full border-4 border-brand-blue/15 border-t-brand-orange" />
          <p className="mt-4 text-sm font-bold text-brand-blue">
            Loading admin portal…
          </p>
        </div>
      </div>
    );
  }

  if (!token || !admin) {
    return <LoginScreen onAuthenticated={handleAuthenticated} />;
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
          onRefresh={() => void refreshCurrent()}
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
                  setQuery={setContactQuery}
                  status={contactStatus}
                  setStatus={setContactStatus}
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
                  setQuery={setApplicationQuery}
                  status={applicationStatus}
                  setStatus={setApplicationStatus}
                  statusOptions={APPLICATION_STATUSES}
                  type={applicationType}
                  setType={setApplicationType}
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
        onClose={() => setSelected(null)}
        onStatusChange={(status) => void updateSelectedStatus(status)}
      />
    </div>
  );
}
