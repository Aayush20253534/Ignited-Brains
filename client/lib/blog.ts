export type BlogStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";
export type BlogPost = {
  id: string; title: string; slug: string; excerpt: string; content: string; category: string;
  tags: string[]; image: string; imageAlt: string; imageCaption: string; author: string;
  seoTitle: string; seoDescription: string; status: BlogStatus; publishedAt: string | null;
  createdAt: string; updatedAt: string; archivedAt: string | null; views: number; impressions: number;
  version: number; readTime: number;
};
export type BlogPostSummary = Omit<BlogPost, "content">;
export type Pagination = { page: number; limit: number; total: number; totalPages: number };
export type PublicBlog = Omit<BlogPost, "views" | "impressions" | "version" | "archivedAt">;
export type PublicBlogSummary = Omit<PublicBlog, "content">;
export type BlogList = { data: PublicBlogSummary[]; categories: string[]; pagination: Pagination };
export type AdminBlogList = { data: BlogPostSummary[]; categories: string[]; pagination: Pagination };
export type BlogForm = Pick<BlogPost, "title" | "slug" | "excerpt" | "content" | "category" | "tags" | "image" | "imageAlt" | "imageCaption" | "author" | "seoTitle" | "seoDescription" | "status" | "publishedAt">;
export function formatBlogDate(date: string | null) {
  return date ? new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Kolkata" }).format(new Date(date)) : "Unpublished";
}
export function imageIsUpload(src: string) { return src.startsWith("/api/v1/media/"); }
export function articleHeadings(content: string) {
  const seen = new Map<string, number>();
  return content.split("\n").flatMap((line, index) => {
    const match = /^##\s+(.+)$/.exec(line); if (!match) return [];
    const explicit = /\s+\{#([a-zA-Z0-9-]+)\}$/.exec(match[1]);
    const title = match[1].replace(/\s+\{#[^}]+\}$/, "").replace(/\\([\\`*_{}\[\]<>#~])/g, "$1").replace(/[*`]/g, "");
    const base = explicit?.[1] || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "section";
    const count = (seen.get(base) || 0) + 1; seen.set(base, count);
    return [{ id: count === 1 ? base : `${base}-${count}`, title, line: index + 1 }];
  });
}
