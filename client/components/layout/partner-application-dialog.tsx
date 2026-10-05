"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import type { KeyboardEvent as ReactKeyboardEvent } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { ApplicationChoices } from "./application-choices";
import type { ApplicantType } from "./application-choices";
import styles from "./partner-application-dialog.module.css";

function containDialogFocus(event: ReactKeyboardEvent<HTMLDialogElement>) {
  if (event.key === "Escape") {
    event.stopPropagation();
    return;
  }
  if (event.key !== "Tab") return;
  const controls = Array.from(
    event.currentTarget.querySelectorAll<HTMLElement>(
      'button:not(:disabled), a[href], [tabindex]:not([tabindex="-1"])',
    ),
  ).filter((element) => element.getClientRects().length > 0);
  const first = controls[0];
  const last = controls.at(-1);
  const active = document.activeElement;
  if (!first || !last) event.preventDefault();
  else if (
    event.shiftKey &&
    (active === first || active?.getAttribute("tabindex") === "-1")
  ) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && active === last) {
    event.preventDefault();
    first.focus();
  }
}

export function PartnerApplicationDialog({
  className,
  onNavigate,
}: {
  className?: string;
  onNavigate?: () => void;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const destinationRef = useRef("");
  const dialogId = useId();

  const close = useCallback(() => {
    if (closing) return;
    setClosing(true);
    const duration = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches
      ? 0
      : 220;
    closeTimerRef.current = setTimeout(() => {
      dialogRef.current?.close();
      setOpen(false);
      setClosing(false);
    }, duration);
  }, [closing]);

  useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;
    const previousPadding = document.body.style.paddingRight;
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    if (scrollbarWidth > 0)
      document.body.style.paddingRight = `${parseFloat(getComputedStyle(document.body).paddingRight) + scrollbarWidth}px`;
    document.body.style.overflow = "hidden";
    dialog?.showModal();
    headingRef.current?.focus({ preventScroll: true });
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
      dialog?.close();
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPadding;
      triggerRef.current?.focus({ preventScroll: true });
    };
  }, [open]);

  useEffect(() => {
    if (open || !destinationRef.current) return;
    const destination = destinationRef.current;
    destinationRef.current = "";
    onNavigate?.();
    router.push(destination);
  }, [onNavigate, open, router]);

  function select(type: ApplicantType) {
    if (closing) return;
    destinationRef.current =
      type === "STUDENT" ? "/apply/student" : "/apply/organisation";
    close();
  }

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
              aria-labelledby={`${dialogId}-title`}
              aria-describedby={`${dialogId}-description`}
              onCancel={(event) => {
                event.preventDefault();
                close();
              }}
              onKeyDown={containDialogFocus}
              onMouseDown={(event) => {
                if (event.target === event.currentTarget) close();
              }}
            >
              <div className={cn(styles.shell, styles.choiceShell)}>
                <button
                  type="button"
                  onClick={close}
                  className={styles.close}
                  aria-label="Close application chooser"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="m7 7 10 10M17 7 7 17"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
                <ApplicationChoices
                  titleId={`${dialogId}-title`}
                  descriptionId={`${dialogId}-description`}
                  headingRef={headingRef}
                  scrollRef={scrollRef}
                  onSelect={select}
                />
              </div>
            </dialog>,
            document.body,
          )
        : null}
    </>
  );
}
