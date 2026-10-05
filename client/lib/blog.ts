import type { BlogPost } from "@/data/blog";

export type BlogPostSummary = Pick<BlogPost, "slug" | "title" | "excerpt" | "category" | "date" | "image" | "alt"> & { readTime: number };

export function blogReadTime(post: BlogPost) {
  const text = [post.introduction, post.takeaway, ...post.sections.flatMap(section => [section.title, ...section.paragraphs, ...(section.steps ?? [])])].join(" ");
  return Math.max(1, Math.ceil(text.trim().split(/\s+/).length / 210));
}

export function blogSummary(post: BlogPost): BlogPostSummary {
  return { slug: post.slug, title: post.title, excerpt: post.excerpt, category: post.category, date: post.date, image: post.image, alt: post.alt, readTime: blogReadTime(post) };
}

export function formatBlogDate(date: string) {
  return new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${date}T00:00:00Z`));
}
