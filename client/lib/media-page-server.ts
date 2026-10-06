import { apiOrigin } from "@/lib/api-origin";
import { defaultMediaPageContent, type MediaPageRecord } from "@/lib/media-page";

export async function getMediaPageRecord(): Promise<MediaPageRecord> {
  try {
    const response = await fetch(new URL("/api/v1/media-page", apiOrigin()), {
      headers: { Accept: "application/json" },
      cache: "no-store",
      signal: AbortSignal.timeout(7000),
    });
    if (!response.ok) throw new Error("Media page API unavailable");
    const payload = await response.json() as { data?: MediaPageRecord };
    if (!payload.data?.content) throw new Error("Invalid Media page response");
    return payload.data;
  } catch {
    return { content: defaultMediaPageContent, version: 0 };
  }
}
