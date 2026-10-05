"use client";

import {
  FormEvent,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import type { KeyboardEvent as ReactKeyboardEvent, ReactNode } from "react";
import { createPortal } from "react-dom";

import { Button } from "@/components/ui";
import { cn } from "@/lib/cn";

import { ApplicationChoices, ApplicationIcon } from "./application-choices";
import type { ApplicantType } from "./application-choices";
import styles from "./partner-application-dialog.module.css";

const fieldClass =
  "mt-1.5 min-h-11 w-full rounded-xl border border-brand-line bg-white px-3.5 text-sm text-brand-ink outline-none transition placeholder:text-brand-muted/45 hover:border-brand-blue/20 focus:border-brand-blue/45 focus:ring-4 focus:ring-brand-blue/[0.08] disabled:cursor-not-allowed disabled:bg-brand-mist disabled:opacity-70";

const textareaClass = `${fieldClass} min-h-24 resize-y py-3 leading-6`;

const organizationSolutions = [
  ["SCIENCE_KITS", "Science Kits"],
  ["SCIENCE_PARK", "Science Park"],
  ["SPACE_LAB", "Space Lab"],
  ["STEM_LAB", "STEM Lab"],
  ["WORKSHOP_TRAINING", "Workshops & Training"],
  ["TEACHER_TRAINING", "Teacher Training"],
  ["CUSTOM", "Custom Requirement"],
] as const;

function Label({
  children,
  required = false,
}: {
  children: ReactNode;
  required?: boolean;
}) {
  return (
    <span className="text-[0.72rem] font-extrabold text-brand-blue">
      {children}
      {required ? <span className="text-brand-orange"> *</span> : null}
    </span>
  );
}

function SectionHeading({
  step,
  title,
  description,
}: {
  step: string;
  title: string;
  description: string;
}) {
  return (
    <div className="sm:col-span-2">
      <div className="flex items-center gap-3">
        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand-blue text-[0.68rem] font-black text-white">
          {step}
        </span>
        <div>
          <h4 className="text-sm font-black text-brand-blue">{title}</h4>
          <p className="mt-0.5 text-xs leading-5 text-brand-muted">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

function StudentIcon() {
  return <ApplicationIcon name="student" className="h-6 w-6" />;
}

function OrganisationIcon() {
  return <ApplicationIcon name="organisation" className="h-6 w-6" />;
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <path
        d="M7 7l10 10M17 7 7 17"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function containDialogFocus(event: ReactKeyboardEvent<HTMLDialogElement>) {
  if (event.key === "Escape") {
    // Preserve the underlying mobile menu so its application trigger can regain focus.
    event.stopPropagation();
    return;
  }
  if (event.key !== "Tab") return;

  const controls = Array.from(
    event.currentTarget.querySelectorAll<HTMLElement>(
      'button:not(:disabled), a[href], input:not(:disabled):not([type="hidden"]), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])',
    ),
  ).filter((element) => element.getClientRects().length > 0);
  const first = controls[0];
  const last = controls.at(-1);
  const active = document.activeElement;

  if (!first || !last) {
    event.preventDefault();
  } else if (event.shiftKey && (active === first || active?.getAttribute("tabindex") === "-1")) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && active === last) {
    event.preventDefault();
    first.focus();
  }
}

export function PartnerApplicationDialog({
  className,
}: {
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [applicantType, setApplicantType] = useState<ApplicantType | null>(
    null,
  );
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dialogId = useId();
  const titleId = `${dialogId}-title`;
  const descriptionId = `${dialogId}-description`;
  const choosing = applicantType === null && !submitted;

  const close = useCallback(() => {
    if (submitting || closing) return;

    setClosing(true);
    const duration = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches
      ? 0
      : 220;
    closeTimerRef.current = setTimeout(() => {
      dialogRef.current?.close();
      setOpen(false);
      setClosing(false);
      setApplicantType(null);
      setSubmitted(false);
      setError("");
    }, duration);
  }, [closing, submitting]);

  useEffect(() => {
    if (!open) return;

    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;
    const previousPadding = document.body.style.paddingRight;
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${parseFloat(getComputedStyle(document.body).paddingRight) + scrollbarWidth}px`;
    }
    document.body.style.overflow = "hidden";
    dialog?.showModal();

    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
      dialog?.close();
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPadding;
      triggerRef.current?.focus({ preventScroll: true });
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    headingRef.current?.focus({ preventScroll: true });
    scrollRef.current?.scrollTo({ top: 0 });
  }, [applicantType, open, submitted]);

  useEffect(() => {
    if (submitting) headingRef.current?.focus({ preventScroll: true });
  }, [submitting]);

  const submitApplication = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    const formElement = event.currentTarget;
    const form = new FormData(formElement);

    if (
      applicantType === "ORGANIZATION" &&
      form.getAll("requestedSolutions").length === 0
    ) {
      setError("Select at least one solution required by your organisation.");
      return;
    }

    setSubmitting(true);

    const details =
      applicantType === "STUDENT"
        ? {
            institutionName: form.get("institutionName"),
            educationLevel: form.get("educationLevel"),
            interestArea: form.get("interestArea"),
            proposalDetails: form.get("proposalDetails"),
            wantsInstitutionSetup: form.get("wantsInstitutionSetup") === "yes",
            setupInterest: form.get("setupInterest"),
            institutionCity: form.get("institutionCity"),
          }
        : {
            organizationName: form.get("organizationName"),
            organizationType: form.get("organizationType"),
            designation: form.get("designation"),
            institutionAddress: form.get("institutionAddress"),
            requestedSolutions: form.getAll("requestedSolutions"),
            requirementDetails: form.get("requirementDetails"),
            estimatedStudents: form.get("estimatedStudents"),
            timeline: form.get("timeline"),
            budgetRange: form.get("budgetRange"),
          };

    try {
      const response = await fetch("/api/v1/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        cache: "no-store",
        body: JSON.stringify({
          applicantType,
          name: form.get("name"),
          email: form.get("email"),
          phone: form.get("phone"),
          city: form.get("city"),
          state: form.get("state"),
          message: form.get("additionalMessage"),
          details,
        }),
      });

      const payload = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          payload?.error ||
            payload?.message ||
            "We could not submit your application.",
        );
      }

      formElement.reset();
      setSubmitted(true);
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "We could not submit your application.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Button
        type="button"
        size="lg"
        showArrow
        className={cn(className)}
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={(event) => {
          triggerRef.current = event.currentTarget;
          setOpen(true);
        }}
      >
        Partner With Us
      </Button>

      {open
        ? createPortal(
            <dialog
              ref={dialogRef}
              className={styles.dialog}
              data-closing={closing}
              aria-modal="true"
              aria-labelledby={titleId}
              aria-describedby={descriptionId}
              onCancel={(event) => {
                event.preventDefault();
                close();
              }}
              onKeyDown={containDialogFocus}
              onMouseDown={(event) => {
                if (event.target === event.currentTarget) close();
              }}
            >
              <div className={cn(styles.shell, choosing && styles.choiceShell)}>
                <button
                  type="button"
                  onClick={close}
                  className={styles.close}
                  aria-label="Close application form"
                  disabled={submitting}
                >
                  <CloseIcon />
                </button>
                {choosing ? (
                  <ApplicationChoices
                    titleId={titleId}
                    descriptionId={descriptionId}
                    headingRef={headingRef}
                    scrollRef={scrollRef}
                    onSelect={setApplicantType}
                  />
                ) : (
                  <>
                    <div className={styles.formHeader}>
                      <div>
                        <p className="text-[0.68rem] font-black uppercase tracking-[0.16em] text-brand-orange">
                          Partner With Us
                        </p>
                        <h2
                          id={titleId}
                          ref={headingRef}
                          tabIndex={-1}
                          className="mt-1 text-xl font-black tracking-[-0.03em] text-brand-blue sm:text-2xl"
                        >
                          {applicantType === "STUDENT"
                            ? "Student application"
                            : "Organisation application"}
                        </h2>
                        <p
                          id={descriptionId}
                          className="mt-1 max-w-xl text-[0.82rem] leading-5 text-brand-muted"
                        >
                          Complete the details below. Required fields are marked
                          with an asterisk.
                        </p>
                      </div>
                    </div>

                    <div ref={scrollRef} className={styles.formBody}>
                      {submitted ? (
                        <div className="mx-auto max-w-lg py-8 text-center sm:py-12">
                          <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-emerald-50 text-emerald-700">
                            <svg
                              viewBox="0 0 24 24"
                              className="h-7 w-7"
                              fill="none"
                              aria-hidden="true"
                            >
                              <path
                                d="m6.5 12.5 3.4 3.4 7.6-8"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                          <h3 className="mt-5 text-2xl font-black tracking-[-0.03em] text-brand-blue">
                            Application submitted
                          </h3>
                          <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-brand-muted">
                            Your application has been received. Our team will
                            review it and get back to you.
                          </p>
                          <Button
                            type="button"
                            size="md"
                            className="mt-6 px-6"
                            onClick={close}
                          >
                            Done
                          </Button>
                        </div>
                      ) : (
                        <form
                          onSubmit={submitApplication}
                          aria-busy={submitting}
                        >
                          <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-brand-line bg-brand-mist px-4 py-2.5">
                            <div className="flex items-center gap-3">
                              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white text-brand-blue shadow-sm">
                                {applicantType === "STUDENT" ? (
                                  <StudentIcon />
                                ) : (
                                  <OrganisationIcon />
                                )}
                              </span>
                              <div>
                                <p className="text-xs font-black uppercase tracking-[0.12em] text-brand-orange">
                                  {applicantType === "STUDENT"
                                    ? "Student"
                                    : "Organisation"}
                                </p>
                                <p className="text-sm font-bold text-brand-blue">
                                  {applicantType === "STUDENT"
                                    ? "Individual student application"
                                    : "Institutional partnership application"}
                                </p>
                              </div>
                            </div>
                            <button
                              type="button"
                              disabled={submitting}
                              onClick={() => {
                                setApplicantType(null);
                                setError("");
                              }}
                              className="focus-ring min-h-11 rounded-lg px-2.5 py-2 text-xs font-extrabold text-brand-blue transition hover:bg-white hover:text-brand-orange disabled:opacity-50"
                            >
                              Change type
                            </button>
                          </div>

                          <div className="grid gap-x-4 gap-y-3.5 sm:grid-cols-2">
                            <SectionHeading
                              step="1"
                              title="Contact details"
                              description="Tell us who we should contact about this application."
                            />

                            <label>
                              <Label required>
                                {applicantType === "STUDENT"
                                  ? "Full Name"
                                  : "Contact Person Name"}
                              </Label>
                              <input
                                className={fieldClass}
                                name="name"
                                autoComplete="name"
                                placeholder={
                                  applicantType === "STUDENT"
                                    ? "Enter your full name"
                                    : "Enter contact person's name"
                                }
                                required
                                disabled={submitting}
                              />
                            </label>

                            <label>
                              <Label required>Email Address</Label>
                              <input
                                className={fieldClass}
                                name="email"
                                type="email"
                                autoComplete="email"
                                placeholder="name@example.com"
                                required
                                disabled={submitting}
                              />
                            </label>

                            <label>
                              <Label required>Phone Number</Label>
                              <input
                                className={fieldClass}
                                name="phone"
                                type="tel"
                                autoComplete="tel"
                                placeholder="+91 98765 43210"
                                required
                                disabled={submitting}
                              />
                            </label>

                            <label>
                              <Label>City</Label>
                              <input
                                className={fieldClass}
                                name="city"
                                autoComplete="address-level2"
                                placeholder="City"
                                disabled={submitting}
                              />
                            </label>

                            <label>
                              <Label>State</Label>
                              <input
                                className={fieldClass}
                                name="state"
                                autoComplete="address-level1"
                                placeholder="State"
                                disabled={submitting}
                              />
                            </label>

                            {applicantType === "STUDENT" ? (
                              <>
                                <SectionHeading
                                  step="2"
                                  title="Student & institution details"
                                  description="Help us understand your academic context and what you want to build."
                                />

                                <label>
                                  <Label required>
                                    Institution / School Name
                                  </Label>
                                  <input
                                    className={fieldClass}
                                    name="institutionName"
                                    placeholder="Your school or college"
                                    required
                                    disabled={submitting}
                                  />
                                </label>

                                <label>
                                  <Label required>Education Level</Label>
                                  <input
                                    className={fieldClass}
                                    name="educationLevel"
                                    placeholder="e.g. Class 11, B.Tech 2nd Year"
                                    required
                                    disabled={submitting}
                                  />
                                </label>

                                <label>
                                  <Label required>Area of Interest</Label>
                                  <input
                                    className={fieldClass}
                                    name="interestArea"
                                    placeholder="e.g. Robotics, Space, STEM"
                                    required
                                    disabled={submitting}
                                  />
                                </label>

                                <label>
                                  <Label>Institution City</Label>
                                  <input
                                    className={fieldClass}
                                    name="institutionCity"
                                    placeholder="Institution city"
                                    disabled={submitting}
                                  />
                                </label>

                                <label className="sm:col-span-2">
                                  <Label required>
                                    Proposal / What would you like to do?
                                  </Label>
                                  <textarea
                                    className={textareaClass}
                                    name="proposalDetails"
                                    placeholder="Describe your idea, project, requirement or learning goal."
                                    required
                                    disabled={submitting}
                                  />
                                </label>

                                <fieldset className="sm:col-span-2">
                                  <legend>
                                    <Label>
                                      Do you want Ignited Brains to set
                                      something up at your school or college?
                                    </Label>
                                  </legend>
                                  <div className="mt-2 grid grid-cols-2 gap-3">
                                    {[
                                      ["yes", "Yes"],
                                      ["no", "No"],
                                    ].map(([value, label]) => (
                                      <label
                                        key={value}
                                        className="flex min-h-11 cursor-pointer items-center gap-3 rounded-xl border border-brand-line bg-white px-3.5 text-sm font-bold text-brand-blue transition hover:border-brand-blue/25 hover:bg-brand-sky"
                                      >
                                        <input
                                          type="radio"
                                          name="wantsInstitutionSetup"
                                          value={value}
                                          defaultChecked={value === "no"}
                                          disabled={submitting}
                                          className="h-4 w-4 accent-[var(--brand-orange)]"
                                        />
                                        {label}
                                      </label>
                                    ))}
                                  </div>
                                </fieldset>

                                <label className="sm:col-span-2">
                                  <Label>
                                    If yes, what are you interested in?
                                  </Label>
                                  <input
                                    className={fieldClass}
                                    name="setupInterest"
                                    placeholder="e.g. Robotics lab, Space lab, workshop"
                                    disabled={submitting}
                                  />
                                </label>

                                <label className="sm:col-span-2">
                                  <Label>Additional Message</Label>
                                  <textarea
                                    className={textareaClass}
                                    name="additionalMessage"
                                    placeholder="Anything else our team should know?"
                                    disabled={submitting}
                                  />
                                </label>
                              </>
                            ) : (
                              <>
                                <SectionHeading
                                  step="2"
                                  title="Organisation details"
                                  description="Tell us about your institution and the solutions you are looking for."
                                />

                                <label>
                                  <Label required>Organisation Name</Label>
                                  <input
                                    className={fieldClass}
                                    name="organizationName"
                                    autoComplete="organization"
                                    placeholder="Organisation or institution name"
                                    required
                                    disabled={submitting}
                                  />
                                </label>

                                <label>
                                  <Label required>Organisation Type</Label>
                                  <select
                                    className={fieldClass}
                                    name="organizationType"
                                    required
                                    defaultValue=""
                                    disabled={submitting}
                                  >
                                    <option value="" disabled>
                                      Select organisation type
                                    </option>
                                    {[
                                      "SCHOOL",
                                      "COLLEGE",
                                      "UNIVERSITY",
                                      "GOVERNMENT",
                                      "NGO",
                                      "COMPANY",
                                      "OTHER",
                                    ].map((type) => (
                                      <option key={type} value={type}>
                                        {type[0] + type.slice(1).toLowerCase()}
                                      </option>
                                    ))}
                                  </select>
                                </label>

                                <label>
                                  <Label required>Designation</Label>
                                  <input
                                    className={fieldClass}
                                    name="designation"
                                    placeholder="e.g. Principal, Director, Coordinator"
                                    required
                                    disabled={submitting}
                                  />
                                </label>

                                <label>
                                  <Label required>Institution Address</Label>
                                  <input
                                    className={fieldClass}
                                    name="institutionAddress"
                                    autoComplete="street-address"
                                    placeholder="Full institution address"
                                    required
                                    disabled={submitting}
                                  />
                                </label>

                                <fieldset className="sm:col-span-2">
                                  <legend>
                                    <Label required>Solutions Required</Label>
                                  </legend>
                                  <p className="mt-1 text-xs text-brand-muted">
                                    Select one or more solutions.
                                  </p>
                                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                                    {organizationSolutions.map(
                                      ([value, label]) => (
                                        <label
                                          key={value}
                                          className="flex min-h-11 cursor-pointer items-center gap-3 rounded-xl border border-brand-line bg-white px-3.5 text-sm font-semibold text-brand-blue transition hover:border-brand-blue/25 hover:bg-brand-sky"
                                        >
                                          <input
                                            type="checkbox"
                                            name="requestedSolutions"
                                            value={value}
                                            disabled={submitting}
                                            className="h-4 w-4 rounded accent-[var(--brand-orange)]"
                                          />
                                          {label}
                                        </label>
                                      ),
                                    )}
                                  </div>
                                </fieldset>

                                <label className="sm:col-span-2">
                                  <Label required>Requirement Details</Label>
                                  <textarea
                                    className={textareaClass}
                                    name="requirementDetails"
                                    placeholder="Describe what you want to set up, improve or discuss with our team."
                                    required
                                    disabled={submitting}
                                  />
                                </label>

                                <SectionHeading
                                  step="3"
                                  title="Planning details"
                                  description="Optional information that helps us prepare a more relevant response."
                                />

                                <label>
                                  <Label>Estimated Number of Students</Label>
                                  <input
                                    className={fieldClass}
                                    name="estimatedStudents"
                                    type="number"
                                    min="1"
                                    inputMode="numeric"
                                    placeholder="e.g. 500"
                                    disabled={submitting}
                                  />
                                </label>

                                <label>
                                  <Label>Expected Timeline</Label>
                                  <input
                                    className={fieldClass}
                                    name="timeline"
                                    placeholder="e.g. Within 3 months"
                                    disabled={submitting}
                                  />
                                </label>

                                <label>
                                  <Label>Budget Range</Label>
                                  <input
                                    className={fieldClass}
                                    name="budgetRange"
                                    placeholder="Optional"
                                    disabled={submitting}
                                  />
                                </label>

                                <label>
                                  <Label>Additional Message</Label>
                                  <textarea
                                    className={textareaClass}
                                    name="additionalMessage"
                                    placeholder="Anything else our team should know?"
                                    disabled={submitting}
                                  />
                                </label>
                              </>
                            )}
                          </div>

                          {error ? (
                            <p
                              className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700"
                              role="alert"
                            >
                              {error}
                            </p>
                          ) : null}

                          <div className="mt-5 flex flex-col-reverse gap-3 border-t border-brand-line/70 pt-4 sm:flex-row sm:items-center sm:justify-between">
                            <p className="text-xs leading-5 text-brand-muted">
                              By submitting, you agree to be contacted about
                              this application.
                            </p>
                            <Button
                              type="submit"
                              size="lg"
                              showArrow={!submitting}
                              className="w-full min-w-[190px] sm:w-auto"
                              disabled={submitting}
                            >
                              {submitting
                                ? "Submitting..."
                                : "Submit Application"}
                            </Button>
                          </div>
                        </form>
                      )}
                    </div>
                  </>
                )}
              </div>
            </dialog>,
            document.body,
          )
        : null}
    </>
  );
}
