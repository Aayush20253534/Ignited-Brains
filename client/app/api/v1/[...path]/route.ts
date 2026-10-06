import { NextRequest } from "next/server";
import { apiOrigin } from "@/lib/api-origin";

export const runtime = "nodejs";
type Context = { params: Promise<{ path: string[] }> };
const allowed = new Map<string, Set<string>>([
  ["contact", new Set(["POST"])], ["applications", new Set(["POST"])],
  ["admin/auth/login", new Set(["POST"])], ["admin/auth/verify-otp", new Set(["POST"])],
  ["admin/auth/otp/resend", new Set(["POST"])], ["admin/auth/me", new Set(["GET"])],
  ["admin/auth/logout", new Set(["POST"])], ["admin/dashboard/summary", new Set(["GET"])],
  ["admin/contacts", new Set(["GET"])], ["admin/applications", new Set(["GET"])],
  ["blogs", new Set(["GET"])], ["blogs/sitemap", new Set(["GET"])],
  ["blog-events", new Set(["POST"])], ["admin/blogs", new Set(["GET", "POST"])],
  ["admin/blog-assets", new Set(["GET"])], ["admin/blog-media", new Set(["POST"])],
]);
function permitted(path: string, method: string) {
  if (allowed.get(path)?.has(method)) return true;
  if (/^blogs\/[a-z0-9]+(?:-[a-z0-9]+)*$/.test(path) || /^media\/[0-9a-f-]{36}$/.test(path)) return method === "GET";
  if (/^admin\/blogs\/[0-9a-f-]{36}$/.test(path)) return ["GET", "PATCH"].includes(method);
  if (/^admin\/blogs\/[0-9a-f-]{36}\/archive$/.test(path)) return method === "POST";
  return /^admin\/(contacts|applications)\/[0-9a-f-]{36}$/.test(path) ? method === "GET"
    : /^admin\/(contacts|applications)\/[0-9a-f-]{36}\/status$/.test(path) && method === "PATCH";
}
async function forward(request: NextRequest, { params }: Context) {
  const { path } = await params;
  const route = path.join("/");
  if (!permitted(route, request.method)) return Response.json({ error: "Route not found" }, { status: 404 });
  let base: URL;
  try { base = apiOrigin(); } catch { return Response.json({ error: "The API is not configured." }, { status: 503 }); }
  const target = new URL(`/api/v1/${route}${request.nextUrl.search}`, base);
  const media = route.startsWith("media/");
  const upload = route === "admin/blog-media";
  const headers = new Headers({ Accept: media ? "image/webp" : "application/json" });
  for (const name of ["authorization", "if-none-match", "user-agent"]) {
    const value = request.headers.get(name); if (value) headers.set(name, value);
  }
  if (request.method !== "GET") headers.set("Content-Type", upload ? request.headers.get("content-type") || "application/octet-stream" : "application/json");
  try {
    let body: Uint8Array | undefined;
    if (request.method !== "GET" && request.body) {
      const limit = upload ? 5 * 1024 * 1024 : 512 * 1024;
      const reader = request.body.getReader();
      const chunks: Uint8Array[] = []; let length = 0;
      while (true) {
        const chunk = await reader.read(); if (chunk.done) break;
        length += chunk.value.byteLength;
        if (length > limit) { await reader.cancel(); return Response.json({ error: "Request body is too large." }, { status: 413 }); }
        chunks.push(chunk.value);
      }
      body = new Uint8Array(length); let offset = 0;
      for (const chunk of chunks) { body.set(chunk, offset); offset += chunk.length; }
    }
    const upstream = await fetch(target, { method: request.method, headers, body: body as BodyInit | undefined, cache: "no-store", redirect: "manual", signal: AbortSignal.timeout(15000) });
    const contentType = upstream.headers.get("content-type") || "";
    if (upstream.status !== 304 && !contentType.includes("application/json") && !(media && contentType.startsWith("image/webp"))) return Response.json({ error: "The API returned an unexpected response." }, { status: 502 });
    const responseHeaders = new Headers({ "Cache-Control": media && (upstream.ok || upstream.status === 304) ? upstream.headers.get("cache-control") || "no-store" : "no-store", "X-Content-Type-Options": "nosniff" });
    for (const name of ["content-type", "etag", "retry-after", "x-request-id"]) {
      const value = upstream.headers.get(name); if (value) responseHeaders.set(name, value);
    }
    return new Response(upstream.status === 304 ? null : await upstream.arrayBuffer(), { status: upstream.status, headers: responseHeaders });
  } catch { return Response.json({ error: "The API is temporarily unavailable. Please try again." }, { status: 502 }); }
}
export const GET = forward;
export const POST = forward;
export const PATCH = forward;
