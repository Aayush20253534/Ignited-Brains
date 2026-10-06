export function apiOrigin() {
  const origin = process.env.API_ORIGIN?.trim() || (process.env.NODE_ENV === "production" ? "" : "http://localhost:5000");
  const base = new URL(origin);
  if (!["http:", "https:"].includes(base.protocol) || base.username || base.password || base.pathname !== "/" || base.search || base.hash) throw new Error("Invalid API_ORIGIN");
  return base;
}
