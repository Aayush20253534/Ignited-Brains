import "server-only";
import { cache } from "react";
import { connection } from "next/server";
import { apiOrigin } from "./api-origin";
import type { BlogList, PublicBlog } from "./blog";
async function read<T>(path: string): Promise<T | null> {
  await connection();
  const response = await fetch(new URL(`/api/v1/${path}`, apiOrigin()), { cache: "no-store", signal: AbortSignal.timeout(15000) });
  if (response.status === 404) return null;
  if (!response.ok) throw new Error("The learning journal is temporarily unavailable.");
  return response.json() as Promise<T>;
}
export const getPublicBlog = cache(async (slug: string) => {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return null;
  return (await read<{ data: PublicBlog }>(`blogs/${encodeURIComponent(slug)}`))?.data || null;
});
export const getPublicBlogs = cache(async (query = "limit=12") => {
  const result = await read<BlogList>(`blogs?${query}`);
  if (!result) throw new Error("The learning journal is temporarily unavailable.");
  return result;
});
export async function getBlogSitemap() {
  const result = await read<{ data: { slug: string; updatedAt: string; image: string }[] }>("blogs/sitemap");
  if (!result) throw new Error("The learning journal is temporarily unavailable.");
  return result.data;
}
