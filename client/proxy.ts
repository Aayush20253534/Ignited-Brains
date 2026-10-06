import { NextResponse, type NextRequest } from "next/server";
import { apiOrigin } from "@/lib/api-origin";

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export async function proxy(request: NextRequest) {
  const slug = request.nextUrl.pathname.slice("/blog/".length);
  if (!slugPattern.test(slug)) return NextResponse.next();

  try {
    const response = await fetch(new URL(`/api/v1/blog-resolve/${encodeURIComponent(slug)}`, apiOrigin()), {
      headers: { Accept: "application/json" },
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) return NextResponse.next();
    const result = await response.json() as { data?: { slug?: unknown } };
    const canonical = result.data?.slug;
    if (typeof canonical === "string" && slugPattern.test(canonical) && canonical !== slug) {
      const target = request.nextUrl.clone();
      target.pathname = `/blog/${canonical}`;
      return NextResponse.redirect(target, 308);
    }
  } catch {
    // The page owns its normal unavailable state if the API cannot be reached.
  }
  return NextResponse.next();
}

export const config = { matcher: "/blog/:slug" };
