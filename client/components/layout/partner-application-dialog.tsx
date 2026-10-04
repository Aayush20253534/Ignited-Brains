"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";

import { ArrowIcon, Button } from "@/components/ui";
import { cn } from "@/lib/cn";

type ApplicantType = "STUDENT" | "ORGANIZATION";

const fieldClass =
  "mt-1.5 min-h-11 w-full rounded-xl border border-brand-line bg-white px-3.5 text-sm text-brand-ink outline-none transition placeholder:text-brand-muted/45 hover:border-brand-blue/20 focus:border-brand-blue/45 focus:ring-4 focus:ring-brand-blue/[0.08] disabled:cursor-not-allowed disabled:bg-brand-mist disabled:opacity-70";

const textareaClass =
  `${fieldClass} min-h-24 resize-y py-3 leading-6`;

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
          <p className="mt-0.5 text-xs leading-5 text-brand-muted">{description}</p>
        </div>
      </div>
    </div>
  );
}

function StudentIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
      <path
        d="M3 9.25 12 5l9 4.25L12 13.5 3 9.25Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M7 11.2v4.1c2.9 2 7.1 2 10 0v-4.1M21 9.5V15"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function OrganisationIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
      <path
        d="M5 20V7.5L12 4l7 3.5V20M3 20h18M8 10h2m4 0h2m-8 4h2m4 0h2m-5 6v-3h2v3"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
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

function ChoiceCard({
  icon,
  eyebrow,
  title,
  description,
  onClick,
}: {
  icon: ReactNode;
  eyebrow: string;
  title: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group focus-ring relative flex min-h-[126px] flex-col rounded-xl border border-brand-line bg-white p-4 text-left shadow-[0_10px_28px_rgba(24,53,103,.05)] transition duration-200 hover:-translate-y-0.5 hover:border-brand-blue/25 hover:shadow-[0_14px_34px_rgba(24,53,103,.09)] sm:p-4.5"
    >
      <div className="flex w-full items-start justify-between gap-4">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-sky text-brand-blue transition group-hover:bg-brand-blue group-hover:text-white">
          {icon}
        </span>
        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-brand-line text-brand-blue transition group-hover:border-brand-orange group-hover:bg-brand-orange group-hover:text-white">
          <ArrowIcon className="h-4 w-4" />
        </span>
      </div>
      <span className="mt-3.5 text-[0.64rem] font-black uppercase tracking-[0.16em] text-brand-orange">
        {eyebrow}
      </span>
      <span className="mt-1 block text-lg font-black tracking-[-0.025em] text-brand-blue">
        {title}
      </span>
      <span className="mt-1.5 block max-w-sm text-[0.82rem] leading-5 text-brand-muted">
        {description}
      </span>
    </button>
  );
}

export function PartnerApplicationDialog({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const [applicantType, setApplicantType] = useState<ApplicantType | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const close = useCallback(() => {
    if (!submitting) {
      setOpen(false);
      setApplicantType(null);
      setSubmitted(false);
      setError("");
    }
  }, [submitting]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [close, open]);

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
        onClick={() => setOpen(true)}
      >
        Partner With Us
      </Button>

      {open
        ? createPortal(
            <div
              className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-brand-navy/65 px-3 py-4 backdrop-blur-[2px] sm:px-6 sm:py-6"
              role="dialog"
              aria-modal="true"
              aria-labelledby="application-dialog-title"
              onMouseDown={(event) => {
                if (event.target === event.currentTarget) close();
              }}
            >
              <div className="my-auto flex max-h-[min(88dvh,760px)] w-full max-w-2xl flex-col overflow-hidden rounded-[1.25rem] border border-white/70 bg-white shadow-[0_28px_80px_rgba(4,27,63,.26)] sm:rounded-[1.5rem]">
                <div className="flex shrink-0 items-start justify-between gap-4 border-b border-brand-line/70 px-5 py-4 sm:px-6 sm:py-4.5">
                  <div>
                    <p className="text-[0.68rem] font-black uppercase tracking-[0.16em] text-brand-orange">
                      Partner With Us
                    </p>
                    <h2
                      id="application-dialog-title"
                      className="mt-1 text-xl font-black tracking-[-0.03em] text-brand-blue sm:text-2xl"
                    >
                      {applicantType === null
                        ? "Start an application"
                        : applicantType === "STUDENT"
                          ? "Student application"
                          : "Organisation application"}
                    </h2>
                    <p className="mt-1 max-w-xl text-[0.82rem] leading-5 text-brand-muted">
                      {applicantType === null
                        ? "Choose the application type that best matches you."
                        : "Complete the details below. Required fields are marked with an asterisk."}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={close}
                    className="focus-ring grid h-9 w-9 shrink-0 place-items-center rounded-full border border-brand-line bg-white text-brand-blue shadow-sm transition hover:border-brand-blue/25 hover:bg-brand-sky"
                    aria-label="Close application form"
                  >
                    <CloseIcon />
                  </button>
                </div>

                <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4 sm:px-6 sm:py-5">
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
                        Your application has been received. Our team will review it and get back to you.
                      </p>
                      <Button type="button" size="md" className="mt-6 px-6" onClick={close}>
                        Done
                      </Button>
                    </div>
                  ) : applicantType === null ? (
                    <div className="grid gap-3 sm:grid-cols-2">
                      <ChoiceCard
                        icon={<StudentIcon />}
                        eyebrow="Student"
                        title="Apply as a student"
                        description="For students with a project idea, learning interest or proposal for their institution."
                        onClick={() => setApplicantType("STUDENT")}
                      />
                      <ChoiceCard
                        icon={<OrganisationIcon />}
                        eyebrow="Organisation"
                        title="Apply for an organisation"
                        description="For schools, colleges, companies, NGOs and institutions looking for learning solutions."
                        onClick={() => setApplicantType("ORGANIZATION")}
                      />
                    </div>
                  ) : (
                    <form onSubmit={submitApplication}>
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
                              {applicantType === "STUDENT" ? "Student" : "Organisation"}
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
                          onClick={() => {
                            setApplicantType(null);
                            setError("");
                          }}
                          className="focus-ring rounded-lg px-2.5 py-2 text-xs font-extrabold text-brand-blue transition hover:bg-white hover:text-brand-orange"
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
                              <Label required>Institution / School Name</Label>
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
                              <Label required>Proposal / What would you like to do?</Label>
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
                                  Do you want Ignited Brains to set something up at your school or college?
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
                              <Label>If yes, what are you interested in?</Label>
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
                                {organizationSolutions.map(([value, label]) => (
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
                                ))}
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
                          By submitting, you agree to be contacted about this application.
                        </p>
                        <Button
                          type="submit"
                          size="lg"
                          showArrow={!submitting}
                          className="w-full min-w-[190px] sm:w-auto"
                          disabled={submitting}
                        >
                          {submitting ? "Submitting..." : "Submit Application"}
                        </Button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
