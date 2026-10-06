"use client";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { AdminLogin, AdminSessionEnding, AdminSignedOut } from "./admin-auth-screens";
import { AdminDashboard } from "./admin-dashboard";
import type { AdminTab, AdminUser } from "./admin-types";
const TOKEN_KEY = "ignited-brains-admin-token";
const subscribeToHydration = () => () => {};
const clientHydrated = () => true;
const serverHydrated = () => false;
function readStoredToken() { try { return sessionStorage.getItem(TOKEN_KEY) || ""; } catch { return ""; } }
async function parseResponse<T>(response: Response): Promise<T> {
  const body = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(body.error || body.message || `Request failed (${response.status})`);
  return body as T;
}
export function AdminPortal({ initialTab = "overview" }: { initialTab?: AdminTab }) {
  const hydrated = useSyncExternalStore(subscribeToHydration, clientHydrated, serverHydrated);
  return hydrated ? <AdminWorkspace initialTab={initialTab} /> : <AdminLoading />;
}
function AdminLoading() {
  return <div className="fixed inset-0 z-[120] grid place-items-center bg-[#f5f8fd]" role="status"><div className="text-center"><span className="mx-auto block h-9 w-9 animate-spin rounded-full border-4 border-brand-blue/15 border-t-brand-orange" /><p className="mt-4 text-sm font-bold text-brand-blue">Loading admin portal…</p></div></div>;
}
function AdminWorkspace({ initialTab }: { initialTab: AdminTab }) {
  const [initialToken] = useState(readStoredToken);
  const [token, setToken] = useState(initialToken);
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [booting, setBooting] = useState(Boolean(initialToken));
  const [authScreen, setAuthScreen] = useState<"signin" | "signing-out" | "signed-out" | "logout-error">("signin");
  const [logoutError, setLogoutError] = useState("");
  const [error, setError] = useState("");
  const tokenRef = useRef(initialToken);
  const sessionVersion = useRef(0);
  const activeRequests = useRef(new Set<AbortController>());
  const logoutTokenRef = useRef("");
  const logoutRequestRef = useRef<AbortController | null>(null);
  const clearClientSession = useCallback(() => {
    sessionVersion.current += 1;
    for (const controller of activeRequests.current) controller.abort();
    activeRequests.current.clear(); tokenRef.current = "";
    try { sessionStorage.removeItem(TOKEN_KEY); } catch { /* In-memory sessions still clear. */ }
    setToken(""); setAdmin(null); setBooting(false); setError("");
  }, []);
  useEffect(() => {
    const requests = activeRequests.current;
    return () => { for (const controller of requests) controller.abort(); requests.clear(); logoutRequestRef.current?.abort(); };
  }, []);
  const apiFetch = useCallback(async <T,>(path: string, options?: RequestInit): Promise<T> => {
    if (!token || tokenRef.current !== token) throw new DOMException("Session ended", "AbortError");
    const version = sessionVersion.current;
    const controller = new AbortController(); activeRequests.current.add(controller);
    const signal = options?.signal ? AbortSignal.any([controller.signal, options.signal]) : controller.signal;
    const headers = new Headers(options?.headers);
    headers.set("Authorization", `Bearer ${token}`); headers.set("Accept", "application/json");
    if (options?.body && !headers.has("Content-Type")) headers.set("Content-Type", "application/json");
    try {
      const response = await fetch(path, { ...options, signal, headers, cache: "no-store" });
      if (version !== sessionVersion.current || signal.aborted) throw new DOMException("Session ended", "AbortError");
      if (response.status === 401) { clearClientSession(); setAuthScreen("signin"); setError("Your session has expired. Please sign in again."); throw new DOMException("Session ended", "AbortError"); }
      const data = await parseResponse<T>(response);
      if (version !== sessionVersion.current || signal.aborted) throw new DOMException("Session ended", "AbortError");
      return data;
    } finally { activeRequests.current.delete(controller); }
  }, [token, clearClientSession]);
  useEffect(() => {
    if (!initialToken) return;

    const sessionToken = initialToken;
    let active = true;
    const controller = new AbortController();
    const version = sessionVersion.current;
    const requests = activeRequests.current;
    requests.add(controller);

    async function restoreSession() {
      try {
        if (readStoredToken() !== sessionToken || tokenRef.current !== sessionToken) throw new Error("Session ended");
        const response = await fetch("/api/v1/admin/auth/me", {
          headers: { Authorization: `Bearer ${sessionToken}` },
          cache: "no-store",
          signal: controller.signal,
        });
        const data = await parseResponse<{ admin: AdminUser }>(response);

        if (!active || version !== sessionVersion.current) return;
        setToken(sessionToken);
        setAdmin(data.admin);
      } catch {
        if (!active || version !== sessionVersion.current) return;
        clearClientSession();
      } finally {
        requests.delete(controller);
        if (active && version === sessionVersion.current) setBooting(false);
      }
    }

    void restoreSession();

    return () => {
      active = false;
      controller.abort();
      requests.delete(controller);
    };
  }, [clearClientSession, initialToken]);

  useEffect(() => {
    // A browser history cache must revalidate with the server before showing records.
    function revalidate(event: PageTransitionEvent) {
      if (!event.persisted) return;
      const sessionToken = readStoredToken();
      if (!sessionToken || sessionToken !== tokenRef.current) { clearClientSession(); setAuthScreen("signin"); return; }
      setBooting(true);
      const version = sessionVersion.current;
      const controller = new AbortController();
      activeRequests.current.add(controller);
      void fetch("/api/v1/admin/auth/me", { headers: { Authorization: `Bearer ${sessionToken}` }, cache: "no-store", signal: controller.signal })
        .then(response => parseResponse<{ admin: AdminUser }>(response))
        .then(data => { if (version === sessionVersion.current && !controller.signal.aborted) setAdmin(data.admin); })
        .catch(() => { if (version === sessionVersion.current && !controller.signal.aborted) { clearClientSession(); setAuthScreen("signin"); } })
        .finally(() => { activeRequests.current.delete(controller); if (version === sessionVersion.current) setBooting(false); });
    }
    window.addEventListener("pageshow", revalidate);
    return () => window.removeEventListener("pageshow", revalidate);
  }, [clearClientSession]);

  function handleAuthenticated(nextToken: string, nextAdmin: AdminUser) {
    try { sessionStorage.setItem(TOKEN_KEY, nextToken); } catch { /* The current tab can still use an in-memory session. */ }
    tokenRef.current = nextToken;
    setToken(nextToken);
    setAdmin(nextAdmin);
    setBooting(false);
    setError(""); setAuthScreen("signin"); setLogoutError(""); logoutTokenRef.current = "";
  }

  async function handleLogout() {
    if (logoutRequestRef.current) return;
    const sessionToken = tokenRef.current || logoutTokenRef.current;
    if (!sessionToken) { clearClientSession(); setAuthScreen("signin"); return; }
    logoutTokenRef.current = sessionToken;
    clearClientSession();
    setAuthScreen("signing-out"); setLogoutError("");
    const controller = new AbortController();
    logoutRequestRef.current = controller;
    try {
      const response = await fetch("/api/v1/admin/auth/logout", { method: "POST", headers: { Authorization: `Bearer ${sessionToken}`, Accept: "application/json" }, cache: "no-store", signal: controller.signal, keepalive: true });
      // A 401 means the server has already invalidated or expired this session.
      if (!response.ok && response.status !== 401) await parseResponse(response);
      if (!controller.signal.aborted) { logoutTokenRef.current = ""; setAuthScreen("signed-out"); }
    } catch {
      if (!controller.signal.aborted) { setLogoutError("Your browser session is cleared, but the server could not confirm sign-out. Check your connection and retry to finish ending the session."); setAuthScreen("logout-error"); }
    } finally {
      logoutRequestRef.current = null;
    }
  }


  if (booting) return <AdminLoading />;
  if (authScreen === "signing-out" || authScreen === "logout-error") return <AdminSessionEnding error={logoutError} onRetry={() => void handleLogout()} />;
  if (authScreen === "signed-out") return <AdminSignedOut onSignIn={() => { setError(""); setAuthScreen("signin"); }} />;
  if (!token || !admin) return <AdminLogin onAuthenticated={handleAuthenticated} sessionError={error} />;
  return <AdminDashboard initialTab={initialTab} admin={admin} api={apiFetch} onLogout={() => void handleLogout()} />;
}
