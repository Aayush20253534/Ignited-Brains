"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  type ChangeEvent,
  type FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";

import type { ApplicantType } from "@/components/layout/application-choices";
import { PortalIcon, type PortalIconName } from "@/components/ui/portal-icon";
import { cn } from "@/lib/cn";
import {
  type ApplicationField,
  type ApplicationValues,
  buildApplicationPayload,
  displayValue,
  initialValues,
  organizationSolutions,
  organizationSteps,
  studentSteps,
  validateStep,
} from "./application-data";
import styles from "./application-wizard.module.css";

function Field({
  field,
  value,
  error,
  prefix,
  disabled,
  onChange,
}: {
  field: ApplicationField;
  value: string | string[];
  error?: string;
  prefix: string;
  disabled: boolean;
  onChange: (value: string | string[]) => void;
}) {
  const id = `${prefix}-${field.name}`;
  const description =
    [field.hint ? `${id}-hint` : "", error ? `${id}-error` : ""]
      .filter(Boolean)
      .join(" ") || undefined;
  const label = (
    <>
      {field.label}
      {field.required ? <span className={styles.required}> *</span> : null}
    </>
  );
  if (field.kind === "solutions") {
    return (
      <fieldset
        className={styles.fullField}
        disabled={disabled}
        aria-describedby={description}
        aria-invalid={Boolean(error)}
      >
        <legend className={styles.label}>{label}</legend>
        <p className={styles.hint}>Select one or more solutions.</p>
        <div className={styles.solutions}>
          {organizationSolutions.map(([key, title]) => (
            <label
              key={key}
              className={styles.solution}
              data-selected={Array.isArray(value) && value.includes(key)}
            >
              <input
                type="checkbox"
                name={field.name}
                value={key}
                checked={Array.isArray(value) && value.includes(key)}
                aria-describedby={error ? `${id}-error` : undefined}
                aria-invalid={Boolean(error)}
                onChange={(event) => {
                  const current = Array.isArray(value) ? value : [];
                  onChange(
                    event.target.checked
                      ? [...current, key]
                      : current.filter((item) => item !== key),
                  );
                }}
              />
              <PortalIcon
                name={
                  key === "TEACHER_TRAINING"
                    ? "graduation"
                    : key === "WORKSHOP_TRAINING"
                      ? "people"
                      : "idea"
                }
              />
              <span>{title}</span>
            </label>
          ))}
        </div>
        {error ? (
          <p id={`${id}-error`} className={styles.fieldError}>
            {error}
          </p>
        ) : null}
      </fieldset>
    );
  }
  const common = {
    id,
    name: field.name,
    value: typeof value === "string" ? value : "",
    disabled,
    required: field.required,
    autoComplete: field.autoComplete,
    "aria-invalid": Boolean(error),
    "aria-describedby": description,
    onChange: (
      event: ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ) => onChange(event.target.value),
  };
  return (
    <div className={field.full ? styles.fullField : styles.field}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <div className={styles.inputWrap} data-invalid={Boolean(error)}>
        <span className={styles.fieldIcon}>
          <PortalIcon name={field.icon} />
        </span>
        {field.kind === "textarea" ? (
          <textarea
            {...common}
            placeholder={field.placeholder}
            maxLength={field.maxLength}
            rows={field.name === "institutionAddress" ? 3 : 6}
          />
        ) : field.kind === "select" ? (
          <select {...common}>
            {field.required ? (
              <option value="" disabled>
                {field.placeholder}
              </option>
            ) : null}
            {field.options?.map(([key, title]) => (
              <option key={key} value={key}>
                {title}
              </option>
            ))}
          </select>
        ) : (
          <input
            {...common}
            type={field.kind || "text"}
            placeholder={field.placeholder}
            maxLength={field.kind === "number" ? undefined : field.maxLength}
            min={field.kind === "number" ? 1 : undefined}
            max={field.kind === "number" ? 1_000_000 : undefined}
            step={field.kind === "number" ? 1 : undefined}
            inputMode={
              field.kind === "number"
                ? "numeric"
                : field.kind === "tel"
                  ? "tel"
                  : field.kind === "email"
                    ? "email"
                    : undefined
            }
          />
        )}
      </div>
      {field.hint ? (
        <p id={`${id}-hint`} className={styles.hint}>
          {field.hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} className={styles.fieldError}>
          {error}
        </p>
      ) : null}
    </div>
  );
}

function HelpCard() {
  return (
    <div className={styles.help}>
      <span className={styles.helpIcon}>
        <PortalIcon name="support" />
      </span>
      <div>
        <h3>Need Help?</h3>
        <p>Our team is here to assist you at every step of the application.</p>
        <Link href="/contact" target="_blank" rel="noopener noreferrer">
          Contact Us <PortalIcon name="arrow" />
          <span className="sr-only"> (opens in a new tab)</span>
        </Link>
      </div>
    </div>
  );
}

function PartnerSupport() {
  const benefits: [PortalIconName, string][] = [
    ["settings", "Customised Implementation"],
    ["book", "Curriculum Support"],
    ["graduation", "Teacher Training"],
    ["shield", "Ongoing Engagement"],
    ["people", "Long-term Partnership"],
  ];
  return (
    <aside className={styles.partnerSupport} aria-label="Partnership support">
      <div className={styles.partnerCard}>
        <div className={styles.partnerHeading}>
          <PortalIcon name="institution" />
          <h3>Why Partner With Ignited Brains?</h3>
        </div>
        <p>
          We help schools, colleges and institutions create engaging, hands-on
          learning environments in space, STEM, AI, robotics and experiential
          science.
        </p>
        <ul>
          {benefits.map(([icon, title]) => (
            <li key={title}>
              <PortalIcon name={icon} />
              {title}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.questions}>
        <PortalIcon name="idea" />
        <h3>Have Questions?</h3>
        <p>
          Not sure which solution is right for your institution? Our team can
          help you choose the best fit.
        </p>
        <Link href="/contact" target="_blank" rel="noopener noreferrer">
          Talk to Our Team <PortalIcon name="arrow" />
          <span className="sr-only"> (opens in a new tab)</span>
        </Link>
      </div>
    </aside>
  );
}

export function ApplicationWizard({
  applicantType,
}: {
  applicantType: ApplicantType;
}) {
  const student = applicantType === "STUDENT";
  const steps = student ? studentSteps : organizationSteps;
  const prefix = student ? "student" : "organisation";
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [furthest, setFurthest] = useState(0);
  const [values, setValues] = useState<ApplicationValues>(() =>
    initialValues(steps),
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [requestError, setRequestError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [receipt, setReceipt] = useState("");
  const headingRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const stepsRef = useRef<HTMLOListElement>(null);
  const pendingRef = useRef(false);
  const controllerRef = useRef<AbortController | null>(null);
  const firstRender = useRef(true);
  const current = steps[step];
  const reviewing = step === steps.length - 1;
  const benefits: [PortalIconName, string][] = student
    ? [
        ["graduation", "Learn from experts"],
        ["idea", "Work on real projects"],
        ["people", "Get opportunities"],
      ]
    : [
        ["institution", "Customised solutions"],
        ["settings", "End-to-end support"],
        ["people", "Long-term partnership"],
      ];

  useEffect(() => () => controllerRef.current?.abort(), []);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const list = stepsRef.current;
    const activeStep = list?.querySelector<HTMLElement>(
      '[aria-current="step"]',
    );
    if (list && activeStep) {
      const listBounds = list.getBoundingClientRect();
      const stepBounds = activeStep.getBoundingClientRect();
      if (
        stepBounds.left < listBounds.left ||
        stepBounds.right > listBounds.right
      )
        list.scrollBy({
          left: stepBounds.left - listBounds.left - 12,
          behavior: "instant",
        });
    }
    headingRef.current?.focus({ preventScroll: true });
    headingRef.current?.scrollIntoView({ block: "start", behavior: "instant" });
  }, [step, receipt]);

  function changeValue(name: string, value: string | string[]) {
    setValues((previous) => ({ ...previous, [name]: value }));
    if (errors[name])
      setErrors((previous) => {
        const next = { ...previous };
        delete next[name];
        return next;
      });
    setRequestError("");
  }

  function showErrors(nextErrors: Record<string, string>, invalidStep = step) {
    setErrors(nextErrors);
    setStep(invalidStep);
    requestAnimationFrame(() => {
      const name = Object.keys(nextErrors)[0];
      formRef.current?.querySelector<HTMLElement>(`[name="${name}"]`)?.focus();
    });
  }

  function goTo(nextStep: number) {
    if (pendingRef.current || nextStep > furthest) return;
    if (nextStep > step) {
      const nextErrors = validateStep(current, values);
      if (Object.keys(nextErrors).length) {
        showErrors(nextErrors);
        return;
      }
    }
    setErrors({});
    setRequestError("");
    setStep(nextStep);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pendingRef.current) return;
    setRequestError("");
    if (!reviewing) {
      const nextErrors = validateStep(current, values);
      if (Object.keys(nextErrors).length) {
        showErrors(nextErrors);
        return;
      }
      setErrors({});
      setFurthest(Math.max(furthest, step + 1));
      setStep(step + 1);
      return;
    }
    for (let index = 0; index < steps.length - 1; index++) {
      const nextErrors = validateStep(steps[index], values);
      if (Object.keys(nextErrors).length) {
        showErrors(nextErrors, index);
        return;
      }
    }
    pendingRef.current = true;
    setSubmitting(true);
    const controller = new AbortController();
    controllerRef.current = controller;
    try {
      const response = await fetch("/api/v1/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        cache: "no-store",
        signal: controller.signal,
        body: JSON.stringify(buildApplicationPayload(applicantType, values)),
      });
      const payload = await response.json().catch(() => null);
      if (!response.ok)
        throw new Error(
          payload?.error ||
            payload?.message ||
            "We could not submit your application. Please try again.",
        );
      if (!payload?.id)
        throw new Error(
          "The server returned an unexpected response. Please contact our team before submitting again.",
        );
      if (controller.signal.aborted) return;
      setReceipt(payload.id);
      setValues(initialValues(steps));
      setErrors({});
    } catch (error) {
      if (!controller.signal.aborted)
        setRequestError(
          error instanceof Error
            ? error.message
            : "We could not submit your application. Please try again.",
        );
    } finally {
      pendingRef.current = false;
      if (!controller.signal.aborted) setSubmitting(false);
    }
  }

  return (
    <main className={styles.page}>
      <section className={styles.hero} aria-labelledby={`${prefix}-title`}>
        <Image
          src={
            student
              ? "/applications/student-hero.webp"
              : "/applications/organisation-hero.webp"
          }
          alt=""
          fill
          preload
          sizes="100vw"
          className={styles.heroImage}
        />
        <div className={styles.heroShade} />
        <div className={styles.heroContent}>
          <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
            <Link href="/">Home</Link>
            <span aria-hidden="true">›</span>
            <span>Partner With Us</span>
            <span aria-hidden="true">›</span>
            <span aria-current="page">
              {student ? "Student" : "Organisation"} Application
            </span>
          </nav>
          <p className={styles.eyebrow}>
            {student ? "Student" : "Organisation"} Application
          </p>
          <h1 id={`${prefix}-title`}>
            {student ? (
              <>
                Turn your ideas
                <br />
                into <span>real opportunities.</span>
              </>
            ) : (
              <>
                Build a future-ready
                <br />
                <span>learning environment.</span>
              </>
            )}
          </h1>
          <p className={styles.heroCopy}>
            {student
              ? "Apply as a student and become part of a community that explores, creates and builds a better tomorrow."
              : "Partner with Ignited Brains to bring space, STEM, AI, robotics and experiential science learning to your institution."}
          </p>
          <ul className={styles.heroBenefits}>
            {benefits.map(([icon, text]) => (
              <li key={text}>
                <PortalIcon name={icon} />
                {text}
              </li>
            ))}
          </ul>
          <p className={styles.handwritten} aria-hidden="true">
            {student ? (
              <>
                Ideas today.
                <br />
                Brighter tomorrows.
              </>
            ) : (
              <>
                Let’s create
                <br />
                brighter futures
                <br />
                together.
              </>
            )}
          </p>
        </div>
      </section>
      <div className={cn(styles.workspace, !student && styles.organisation)}>
        {receipt ? (
          <section
            className={styles.success}
            aria-labelledby={`${prefix}-success`}
          >
            <span className={styles.successIcon}>
              <PortalIcon name="check" />
            </span>
            <p className={styles.eyebrow}>Application received</p>
            <h2 id={`${prefix}-success`} ref={headingRef} tabIndex={-1}>
              Thank you for taking the first step.
            </h2>
            <p>
              Your {student ? "student" : "organisation"} application has
              reached our team. We’ll review your details and get back to you.
            </p>
            <p className={styles.receipt}>
              Your reference: <strong>{receipt}</strong>
            </p>
            <Link href="/" className={styles.primary}>
              Go to Homepage <PortalIcon name="arrow" />
            </Link>
          </section>
        ) : (
          <>
            <aside className={styles.stepsPanel}>
              <nav aria-label="Application steps">
                <ol ref={stepsRef} className={styles.steps}>
                  {steps.map((item, index) => (
                    <li key={item.title}>
                      <button
                        type="button"
                        aria-current={index === step ? "step" : undefined}
                        disabled={index > furthest || submitting}
                        onClick={() => goTo(index)}
                        className={styles.step}
                        data-active={index === step}
                        data-complete={index < furthest && index !== step}
                      >
                        <span className={styles.stepNumber}>
                          {index < furthest && index !== step ? (
                            <>
                              <PortalIcon name="check" />
                              <span className="sr-only">
                                Step {index + 1}, completed
                              </span>
                            </>
                          ) : (
                            index + 1
                          )}
                        </span>
                        <span>
                          <strong>{item.title}</strong>
                          <span className={styles.stepSubtitle}>
                            {item.subtitle}
                          </span>
                        </span>
                      </button>
                    </li>
                  ))}
                </ol>
              </nav>
              <HelpCard />
            </aside>
            <section
              className={styles.formCard}
              aria-labelledby={`${prefix}-step-title`}
            >
              <div className={styles.formHeading}>
                <div>
                  <p className={styles.eyebrow} aria-live="polite">
                    Step {step + 1} of {steps.length}
                  </p>
                  <h2
                    id={`${prefix}-step-title`}
                    ref={headingRef}
                    tabIndex={-1}
                  >
                    {current.title}
                  </h2>
                  <p>{current.description}</p>
                </div>
                <p className={styles.requiredNote}>
                  All fields marked with <span>*</span> are required
                </p>
              </div>
              <form
                ref={formRef}
                noValidate
                onSubmit={handleSubmit}
                aria-busy={submitting}
              >
                {reviewing ? (
                  <div className={styles.review}>
                    {steps.slice(0, -1).map((item, index) => (
                      <section key={item.title} className={styles.reviewGroup}>
                        <div>
                          <h3>{item.title}</h3>
                          <button
                            type="button"
                            onClick={() => goTo(index)}
                            disabled={submitting}
                            aria-label={`Edit ${item.title}`}
                          >
                            Edit <PortalIcon name="back" />
                          </button>
                        </div>
                        <dl>
                          {item.fields.map((field) => (
                            <div key={field.name}>
                              <dt>{field.label}</dt>
                              <dd>{displayValue(field, values[field.name])}</dd>
                            </div>
                          ))}
                        </dl>
                      </section>
                    ))}
                    <p className={styles.consent}>
                      By submitting, you agree to be contacted about this
                      application.
                    </p>
                  </div>
                ) : (
                  <div className={styles.fields}>
                    {current.fields.map((field) => (
                      <Field
                        key={field.name}
                        field={field}
                        value={values[field.name] ?? ""}
                        error={errors[field.name]}
                        prefix={prefix}
                        disabled={submitting}
                        onChange={(value) => changeValue(field.name, value)}
                      />
                    ))}
                    {!student && step === 2 ? (
                      <div className={styles.profile}>
                        <PortalIcon name="institution" />
                        <div>
                          <strong>
                            {String(
                              values.organizationName || "Your institution",
                            )}
                          </strong>
                          <p>{String(values.institutionAddress || "")}</p>
                          <p>
                            We’ll tailor our recommendations to your learning
                            community.
                          </p>
                        </div>
                      </div>
                    ) : null}
                    {student && step === 2 ? (
                      <div className={styles.interestIdeas}>
                        <p>A few ideas to get you started</p>
                        <div>
                          {[
                            "Astronomy & space science",
                            "STEM & innovation",
                            "AI & robotics",
                            "Experiential science",
                          ].map((idea) => (
                            <button
                              key={idea}
                              type="button"
                              onClick={() => changeValue("interestArea", idea)}
                            >
                              <PortalIcon name="idea" />
                              {idea}
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </div>
                )}
                {Object.keys(errors).length ? (
                  <p role="alert" className={styles.errorSummary}>
                    Please check the highlighted fields before continuing.
                  </p>
                ) : null}
                {requestError ? (
                  <p role="alert" className={styles.errorSummary}>
                    {requestError}
                  </p>
                ) : null}
                <div className={styles.actions}>
                  <div>
                    {step > 0 ? (
                      <button
                        type="button"
                        className={styles.secondary}
                        onClick={() => goTo(step - 1)}
                        disabled={submitting}
                      >
                        <PortalIcon name="back" />
                        Back
                      </button>
                    ) : null}
                    <button
                      type="button"
                      className={styles.cancel}
                      disabled={submitting}
                      onClick={() => router.push("/")}
                    >
                      Cancel
                    </button>
                  </div>
                  <button
                    type="submit"
                    className={styles.primary}
                    disabled={submitting}
                  >
                    {submitting
                      ? "Submitting…"
                      : reviewing
                        ? "Submit Application"
                        : "Save & Continue"}
                    <PortalIcon name={reviewing ? "check" : "arrow"} />
                  </button>
                </div>
                {!reviewing ? (
                  <p className={styles.localSave}>
                    Your answers stay with you as you move between steps. Your
                    application is sent when you select Submit Application.
                  </p>
                ) : null}
              </form>
            </section>
            {!student ? <PartnerSupport /> : null}
          </>
        )}
      </div>
    </main>
  );
}
