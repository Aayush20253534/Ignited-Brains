import { NextRequest } from "next/server";

export const runtime = "nodejs";

type Context = { params: Promise<{ path: string[] }> };

const allowed = new Map<string, Set<string>>([
  ["contact", new Set(["POST"])],
  ["applications", new Set(["POST"])],
  ["admin/auth/login", new Set(["POST"])],
  ["admin/auth/me", new Set(["GET"])],
  ["admin/dashboard/summary", new Set(["GET"])],
  ["admin/contacts", new Set(["GET"])],
  ["admin/applications", new Set(["GET"])],
]);

function permitted(path: string, method: string) {
  if (allowed.get(path)?.has(method)) return true;
  return /^admin\/(contacts|applications)\/[0-9a-f-]{36}$/.test(path)
    ? method === "GET"
    : /^admin\/(contacts|applications)\/[0-9a-f-]{36}\/status$/.test(path) && method === "PATCH";
}

async function forward(request: NextRequest, { params }: Context) {
  const { path } = await params;
  const route = path.join("/");
  if (!permitted(route, request.method)) {
    return Response.json({ error: "Route not found" }, { status: 404 });
  }

  const origin = process.env.API_ORIGIN?.trim() ||
    (process.env.NODE_ENV === "production" ? "" : "http://localhost:5000");
  let base: URL;
  try {
    base = new URL(origin);
    if (!(["http:", "https:"].includes(base.protocol)) || base.username || base.password ||
      base.pathname !== "/" || base.search || base.hash) throw new Error("Invalid API_ORIGIN");
  } catch {
    return Response.json({ error: "The API is not configured." }, { status: 503 });
  }

  const target = new URL(`/api/v1/${route}${request.nextUrl.search}`, base);
  const headers = new Headers({ Accept: "application/json" });
  const authorization = request.headers.get("authorization");
  if (authorization) headers.set("Authorization", authorization);
  if (request.method !== "GET") headers.set("Content-Type", "application/json");

  try {
    const body = request.method === "GET" ? undefined : await request.text();
    if (body && Buffer.byteLength(body, "utf8") > 64 * 1024) {
      return Response.json({ error: "Request body is too large." }, { status: 413 });
    }

    const upstream = await fetch(target, {
      method: request.method,
      headers,
      body,
      cache: "no-store",
      redirect: "manual",
      signal: AbortSignal.timeout(15000),
    });
    if (!upstream.headers.get("content-type")?.includes("application/json")) {
      return Response.json({ error: "The API returned an unexpected response." }, { status: 502 });
    }

    const responseHeaders = new Headers({
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    });
    for (const name of ["retry-after", "x-request-id"]) {
      const value = upstream.headers.get(name);
      if (value) responseHeaders.set(name, value);
    }
    return new Response(await upstream.text(), { status: upstream.status, headers: responseHeaders });
  } catch {
    return Response.json({ error: "The API is temporarily unavailable. Please try again." }, { status: 502 });
  }
}

export const GET = forward;
export const POST = forward;
export const PATCH = forward;
