"use client";

import { FormEvent, useState } from "react";

import { Button } from "@/components/ui";

const fieldClass =
  "mt-1.5 min-h-11 w-full rounded-lg border border-brand-line bg-white px-3.5 text-sm text-brand-ink outline-none transition placeholder:text-brand-muted/55 focus:border-brand-blue/40 focus:ring-2 focus:ring-brand-blue/10 lg:min-h-9 lg:px-3";

type SubmissionState =
  | { status: "idle"; message: "" }
  | { status: "submitting"; message: "" }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

const apiBaseUrl = (process.env.NEXT_PUBLIC_API_URL?.trim() || "http://localhost:5000")
  .replace(/\/+$/, "");

export function ContactForm() {
  const [submission, setSubmission] = useState<SubmissionState>({
    status: "idle",
    message: "",
  });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    setSubmission({ status: "submitting", message: "" });

    try {
      const response = await fetch(`${apiBaseUrl}/api/v1/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        cache: "no-store",
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          organization: formData.get("organization"),
          subject: formData.get("subject"),
          message: formData.get("message"),
        }),
      });

      const payload = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          payload?.error ||
            payload?.message ||
            "We could not submit your enquiry. Please try again.",
        );
      }

      form.reset();
      setSubmission({
        status: "success",
        message: payload?.message || "Your enquiry has been submitted successfully.",
      });
    } catch (error) {
      setSubmission({
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : "We could not submit your enquiry. Please try again.",
      });
    }
  }

  const submitting = submission.status === "submitting";

  return (
    <form
      onSubmit={handleSubmit}
      className="relative z-30 rounded-3xl border border-brand-line bg-white p-5 shadow-[0_24px_70px_rgba(24,53,103,.15)] sm:p-7 lg:-ml-5 lg:p-4"
    >
      <h2 className="text-2xl font-black tracking-[-0.035em] text-brand-blue">
        Start a Conversation
      </h2>
      <p className="mt-1 text-sm text-brand-muted">
        Fill in the details and we’ll get back to you soon.
      </p>
      <p className="mt-2 text-xs text-brand-muted">
        <span className="text-brand-orange">*</span> Required fields
      </p>

      <div className="mt-4 grid gap-3 lg:mt-3 lg:grid-cols-2 lg:gap-2">
        <label className="text-xs font-extrabold text-brand-blue">
          Full Name <span className="text-brand-orange">*</span>
          <input
            className={fieldClass}
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={120}
            placeholder="Enter your full name"
            disabled={submitting}
          />
        </label>

        <label className="text-xs font-extrabold text-brand-blue">
          Email Address <span className="text-brand-orange">*</span>
          <input
            className={fieldClass}
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={254}
            placeholder="Enter your email"
            disabled={submitting}
          />
        </label>

        <label className="text-xs font-extrabold text-brand-blue">
          Phone Number
          <input
            className={fieldClass}
            name="phone"
            type="tel"
            autoComplete="tel"
            maxLength={32}
            placeholder="Enter your phone number"
            disabled={submitting}
          />
        </label>

        <label className="text-xs font-extrabold text-brand-blue">
          Organization / Institution
          <input
            className={fieldClass}
            name="organization"
            type="text"
            autoComplete="organization"
            maxLength={180}
            placeholder="Enter your organization or institution"
            disabled={submitting}
          />
        </label>

        <label className="text-xs font-extrabold text-brand-blue lg:col-span-2">
          Subject
          <input
            className={fieldClass}
            name="subject"
            type="text"
            maxLength={180}
            placeholder="What would you like to discuss?"
            disabled={submitting}
          />
        </label>

        <label className="text-xs font-extrabold text-brand-blue lg:col-span-2">
          Message <span className="text-brand-orange">*</span>
          <textarea
            className={`${fieldClass} min-h-24 resize-y py-3 lg:min-h-16 lg:py-2`}
            name="message"
            required
            maxLength={5000}
            placeholder="Tell us about your requirements..."
            disabled={submitting}
          />
        </label>
      </div>

      {submission.status === "success" ? (
        <p
          className="mt-3 rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-sm font-semibold text-green-800"
          role="status"
          aria-live="polite"
        >
          {submission.message}
        </p>
      ) : null}

      {submission.status === "error" ? (
        <p
          className="mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-700"
          role="alert"
          aria-live="assertive"
        >
          {submission.message}
        </p>
      ) : null}

      <Button
        type="submit"
        size="lg"
        showArrow={!submitting}
        className="mt-3 w-full lg:min-h-11 lg:px-4 lg:text-sm"
        disabled={submitting}
      >
        {submitting ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
}
