"use client";

import { FormEvent, useState } from "react";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";

import { Button } from "@/components/ui";
import { cn } from "@/lib/cn";

type ApplicantType = "STUDENT" | "ORGANIZATION";

const fieldClass =
  "mt-1.5 min-h-11 w-full rounded-lg border border-brand-line bg-white px-3.5 text-sm text-brand-ink outline-none transition placeholder:text-brand-muted/55 focus:border-brand-blue/40 focus:ring-2 focus:ring-brand-blue/10";

const organizationSolutions = [
  ["SCIENCE_KITS", "Science Kits"],
  ["SCIENCE_PARK", "Science Park"],
  ["SPACE_LAB", "Space Lab"],
  ["STEM_LAB", "STEM Lab"],
  ["WORKSHOP_TRAINING", "Workshops & Training"],
  ["TEACHER_TRAINING", "Teacher Training"],
  ["CUSTOM", "Custom Requirement"],
] as const;

function Label({ children, required = false }: { children: ReactNode; required?: boolean }) {
  return <span className="text-xs font-extrabold text-brand-blue">{children}{required ? <span className="text-brand-orange"> *</span> : null}</span>;
}

export function PartnerApplicationDialog({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const [applicantType, setApplicantType] = useState<ApplicantType | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const close = () => {
    if (!submitting) {
      setOpen(false);
      setApplicantType(null);
      setSubmitted(false);
      setError("");
    }
  };

  const submitApplication = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    const form = new FormData(event.currentTarget);
    const details = applicantType === "STUDENT"
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
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/v1/applications`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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

      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        throw new Error(payload?.error || "We could not submit your application.");
      }

      setSubmitted(true);
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "We could not submit your application.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Button type="button" size="lg" showArrow className={cn(className)} onClick={() => setOpen(true)}>
        Partner With Us
      </Button>

      {open ? createPortal(
        <div className="fixed inset-0 z-[60] grid min-h-full place-items-center overflow-y-auto bg-brand-navy/60 px-4 py-5 sm:px-6" role="dialog" aria-modal="true" aria-labelledby="application-dialog-title">
          <div className="my-auto w-full max-w-2xl rounded-2xl bg-white p-4 shadow-2xl sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[0.68rem] font-extrabold uppercase tracking-[0.16em] text-brand-orange">Partner With Us</p>
                <h2 id="application-dialog-title" className="mt-1.5 text-2xl font-black tracking-[-0.035em] text-brand-blue sm:text-[1.7rem]">Start an application</h2>
              </div>
              <button type="button" onClick={close} className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-brand-line text-xl text-brand-blue transition hover:bg-brand-sky" aria-label="Close application form">&times;</button>
            </div>

            {submitted ? (
              <div className="mt-5 rounded-xl bg-brand-sky p-5 text-center">
                <h3 className="text-xl font-black text-brand-blue">Application submitted</h3>
                <p className="mt-2 text-sm text-brand-muted">Thank you. Our team will get back to you soon.</p>
                <Button type="button" size="md" className="mt-5" onClick={close}>Close</Button>
              </div>
            ) : applicantType === null ? (
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <button type="button" onClick={() => setApplicantType("STUDENT")} className="rounded-xl border border-brand-line p-4 text-left transition hover:border-brand-orange hover:bg-brand-sky sm:p-5">
                  <span className="text-[0.68rem] font-extrabold uppercase tracking-[0.16em] text-brand-orange">Student</span>
                  <span className="mt-1.5 block text-lg font-black text-brand-blue">Apply as a student</span>
                </button>
                <button type="button" onClick={() => setApplicantType("ORGANIZATION")} className="rounded-xl border border-brand-line p-4 text-left transition hover:border-brand-orange hover:bg-brand-sky sm:p-5">
                  <span className="text-[0.68rem] font-extrabold uppercase tracking-[0.16em] text-brand-orange">Organisation</span>
                  <span className="mt-1.5 block text-lg font-black text-brand-blue">Apply for an organisation</span>
                </button>
              </div>
            ) : (
              <form onSubmit={submitApplication} className="mt-6">
                <div className="mb-5 flex items-center justify-between gap-4">
                  <h3 className="text-xl font-black text-brand-blue">{applicantType === "STUDENT" ? "Student application" : "Organisation application"}</h3>
                  <button type="button" onClick={() => setApplicantType(null)} className="text-sm font-extrabold text-brand-orange">Change type</button>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label><Label required>{applicantType === "STUDENT" ? "Full Name" : "Contact Person Name"}</Label><input className={fieldClass} name="name" required /></label>
                  <label><Label required>Email</Label><input className={fieldClass} name="email" type="email" required /></label>
                  <label><Label required>Phone</Label><input className={fieldClass} name="phone" type="tel" required /></label>
                  <label><Label>City</Label><input className={fieldClass} name="city" /></label>
                  <label><Label>State</Label><input className={fieldClass} name="state" /></label>

                  {applicantType === "STUDENT" ? (
                    <>
                      <label><Label required>Institution / School Name</Label><input className={fieldClass} name="institutionName" required /></label>
                      <label><Label required>Education Level</Label><input className={fieldClass} name="educationLevel" required /></label>
                      <label><Label required>Area of Interest</Label><input className={fieldClass} name="interestArea" required /></label>
                      <label className="sm:col-span-2"><Label required>Proposal / What would you like to do?</Label><textarea className={`${fieldClass} min-h-24 py-3`} name="proposalDetails" required /></label>
                      <fieldset className="sm:col-span-2"><legend><Label>Do you want Ignited Brains to set something up at your school/college?</Label></legend><div className="mt-2 flex gap-4 text-sm text-brand-blue"><label><input type="radio" name="wantsInstitutionSetup" value="yes" /> Yes</label><label><input type="radio" name="wantsInstitutionSetup" value="no" defaultChecked /> No</label></div></fieldset>
                      <label><Label>If Yes: What are you interested in?</Label><input className={fieldClass} name="setupInterest" /></label>
                      <label><Label>Institution City</Label><input className={fieldClass} name="institutionCity" /></label>
                      <label className="sm:col-span-2"><Label>Additional Message</Label><textarea className={`${fieldClass} min-h-24 py-3`} name="additionalMessage" /></label>
                    </>
                  ) : (
                    <>
                      <label><Label required>Organization Name</Label><input className={fieldClass} name="organizationName" required /></label>
                      <label><Label required>Organization Type</Label><select className={fieldClass} name="organizationType" required defaultValue=""><option value="" disabled>Select type</option>{["SCHOOL", "COLLEGE", "UNIVERSITY", "GOVERNMENT", "NGO", "COMPANY", "OTHER"].map((type) => <option key={type} value={type}>{type[0] + type.slice(1).toLowerCase()}</option>)}</select></label>
                      <label><Label required>Designation</Label><input className={fieldClass} name="designation" required /></label>
                      <label><Label required>Institution Address</Label><input className={fieldClass} name="institutionAddress" required /></label>
                      <fieldset className="sm:col-span-2"><legend><Label required>Solutions Required</Label></legend><div className="mt-2 grid gap-2 sm:grid-cols-2">{organizationSolutions.map(([value, label]) => <label key={value} className="text-sm text-brand-blue"><input type="checkbox" name="requestedSolutions" value={value} /> {label}</label>)}</div></fieldset>
                      <label className="sm:col-span-2"><Label required>Requirement Details</Label><textarea className={`${fieldClass} min-h-24 py-3`} name="requirementDetails" required /></label>
                      <label><Label>Estimated Number of Students</Label><input className={fieldClass} name="estimatedStudents" type="number" min="1" /></label>
                      <label><Label>Expected Timeline</Label><input className={fieldClass} name="timeline" /></label>
                      <label><Label>Budget Range</Label><input className={fieldClass} name="budgetRange" /></label>
                      <label><Label>Additional Message</Label><textarea className={`${fieldClass} min-h-24 py-3`} name="additionalMessage" /></label>
                    </>
                  )}
                </div>

                {error ? <p className="mt-4 text-sm font-bold text-red-600" role="alert">{error}</p> : null}
                <Button type="submit" size="lg" showArrow className="mt-6 w-full" disabled={submitting}>{submitting ? "Submitting..." : "Submit Application"}</Button>
              </form>
            )}
          </div>
        </div>,
        document.body,
      ) : null}
    </>
  );
}