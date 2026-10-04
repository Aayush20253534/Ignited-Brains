"use client";

import { FormEvent, useState } from "react";

import { ArrowIcon } from "@/components/ui";

type NewsletterState =
  | { status: "idle"; message: "" }
  | { status: "submitting"; message: "" }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

export function FooterNewsletter() {
  const [state, setState] = useState<NewsletterState>({
    status: "idle",
    message: "",
  });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const email = String(formData.get("email") || "").trim();

    setState({ status: "submitting", message: "" });

    try {
      const response = await fetch("/api/v1/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        cache: "no-store",
        body: JSON.stringify({
          name: "Newsletter Subscriber",
          email,
          subject: "Newsletter Subscription",
          message:
            "Please add this email address to the Ignited Brains newsletter.",
        }),
      });

      const payload = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          payload?.error ||
            payload?.message ||
            "Subscription failed. Please try again.",
        );
      }

      form.reset();

      if (payload?.alreadySubscribed) {
        setState({
          status: "success",
          message: "Already subscribed.",
        });
        return;
      }

      setState({
        status: "success",
        message: payload?.message || "Subscribed successfully.",
      });
    } catch (error) {
      setState({
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : "Subscription failed. Please try again.",
      });
    }
  }

  const submitting = state.status === "submitting";

  return (
    <div className="mt-5 w-full max-w-md">
      <form
        onSubmit={handleSubmit}
        className="flex w-full rounded-xl border border-white/15 bg-white/[0.04] p-1.5 transition focus-within:border-white/30 focus-within:bg-white/[0.06]"
      >
        <label htmlFor="footer-email" className="sr-only">
          Email address
        </label>
        <input
          id="footer-email"
          name="email"
          type="email"
          required
          maxLength={254}
          autoComplete="email"
          inputMode="email"
          disabled={submitting}
          placeholder="Enter your email"
          className="min-w-0 flex-1 bg-transparent px-3 text-sm text-white outline-none placeholder:text-white/35 disabled:opacity-60"
        />
        <button
          type="submit"
          aria-label={submitting ? "Subscribing" : "Subscribe to newsletter"}
          disabled={submitting}
          className="focus-ring grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-brand-orange text-white transition hover:bg-brand-orange-dark disabled:cursor-wait disabled:opacity-70"
        >
          {submitting ? (
            <span
              className="h-4 w-4 animate-spin rounded-full border-2 border-white/35 border-t-white"
              aria-hidden="true"
            />
          ) : (
            <ArrowIcon className="h-5 w-5" />
          )}
        </button>
      </form>

      {state.status === "success" ? (
        <p
          className="footer-subscribe-success mt-2 text-xs font-semibold text-emerald-300"
          role="status"
          aria-live="polite"
        >
          {state.message}
        </p>
      ) : null}

      {state.status === "error" ? (
        <p
          className="mt-2 text-xs font-semibold text-red-300"
          role="alert"
          aria-live="assertive"
        >
          {state.message}
        </p>
      ) : null}
    </div>
  );
}
