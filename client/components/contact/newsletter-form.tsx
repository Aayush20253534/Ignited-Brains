"use client";

import Link from "next/link";
import { useId, useState, type FormEvent } from "react";
import { Button } from "@/components/ui";

export function NewsletterForm() {
  const id = useId();
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<{ error: boolean; message: string } | null>(null);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const email = new FormData(form).get("email");
    setBusy(true);
    setResult(null);
    try {
      // Requests use the existing persistent enquiries service and appear in admin.
      const response = await fetch("/api/v1/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "Newsletter subscriber", email, subject: "Newsletter subscription request", message: "I consent to receive Ignited Brains program and newsletter updates at this email address. I can request removal by emailing info@ignitedbrains.com." }),
      });
      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        throw new Error(payload?.error || "Unable to send your request. Please try again.");
      }
      setResult({ error: false, message: "Subscription request received. Our team will arrange your updates." });
      form.reset();
    } catch (error) {
      setResult({ error: true, message: error instanceof Error ? error.message : "Please try again." });
    } finally { setBusy(false); }
  }
  return <div className="mt-5 max-w-xl">
    <form onSubmit={submit} className="flex flex-col gap-2 rounded-xl bg-white p-2 sm:flex-row">
      <label htmlFor={id} className="sr-only">Email address for newsletter updates</label>
      <input id={id} name="email" type="email" autoComplete="email" required maxLength={254} disabled={busy}
        placeholder="Your email address" className="focus-ring min-h-11 min-w-0 flex-1 rounded-lg px-3 text-base text-brand-ink placeholder:text-brand-muted" />
      <Button type="submit" disabled={busy}>{busy ? "Sending…" : "Request updates"}</Button>
    </form>
    <p className="mt-2 text-xs leading-5 text-white/70">By requesting updates, you agree to receive emails from Ignited Brains. Email us to stop updates. <Link href="/privacy" className="underline underline-offset-2">Privacy information</Link></p>
    {result ? <p className={`mt-3 rounded-lg px-3 py-2 text-sm ${result.error ? "bg-red-50 text-red-800" : "bg-green-50 text-green-800"}`} role={result.error ? "alert" : "status"}>{result.message}</p> : null}
  </div>;
}
