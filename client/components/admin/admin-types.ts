import type { Pagination } from "@/lib/blog";
export type AdminUser = { id: string; name: string; email: string };
export type AdminApi = <T>(path: string, options?: RequestInit) => Promise<T>;
export type AdminTab = "overview" | "contacts" | "student-applications" | "organization-applications" | "blogs" | "gallery";
export const CONTACT_STATUSES = ["NEW", "IN_PROGRESS", "RESOLVED", "ARCHIVED"] as const;
export const APPLICATION_STATUSES = ["NEW", "IN_REVIEW", "CONTACTED", "APPROVED", "REJECTED", "ARCHIVED"] as const;
export type Contact = {
  id: string; name: string; email: string; phone: string | null; organization: string | null;
  subject: string | null; message: string; status: string; notification_status: string | null;
  notification_error?: string | null; notification_id?: string | null; created_at: string; updated_at: string;
};
export type Application = {
  id: string; applicant_type: "STUDENT" | "ORGANIZATION"; name: string; email: string; phone: string;
  city: string | null; state: string | null; message: string | null; details: Record<string, unknown>;
  status: string; notification_status: string | null; notification_error?: string | null;
  notification_id?: string | null; created_at: string; updated_at: string;
};
export type ApiList<T> = { data: T[]; pagination: Pagination };
export type Selection = { kind: "contacts" | "applications"; id: string };
export type Summary = {
  contacts: { total: number; new: number; organizations: number; individuals: number; recent: number };
  applications: { total: number; new: number; students: number; organizations: number; awaiting: number; recent: number; recent_students: number; recent_organizations: number };
  blogs: { total: number; published: number; drafts: number; archived: number; views: number; impressions: number };
  gallery: { total: number; published: number; drafts: number; archived: number; featured: number };
  activity: { date: string; contacts: number; applications: number; students: number; organizations: number }[];
};
export function humanize(value: string | null | undefined) {
  return value ? value.replace(/([a-z])([A-Z])/g, "$1 $2").replaceAll("_", " ").toLowerCase().replace(/\b\w/g, letter => letter.toUpperCase()) : "—";
}
export function dateLabel(value: string, time = false) {
  return new Intl.DateTimeFormat("en-IN", { dateStyle: "medium", ...(time ? { timeStyle: "short" as const } : {}), timeZone: "Asia/Kolkata" }).format(new Date(value));
}
export function errorMessage(error: unknown) { return error instanceof Error ? error.message : "Unable to complete this request. Please try again."; }
export const emptyPagination: Pagination = { page: 1, limit: 10, total: 0, totalPages: 0 };
