"use client";

import styles from "@/components/engagement/engagement.module.css";

export function ContactFormLink() {
  return (
    <a href="#contact-form" className={styles.heroLink} onClick={(event) => {
      const panel = document.getElementById("contact-form");
      const input = panel?.querySelector<HTMLInputElement>('input[name="name"]');
      if (!panel || !input) return;
      event.preventDefault();
      window.history.replaceState(null, "", "#contact-form");
      panel.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "start" });
      input.focus({ preventScroll: true });
    }}>Start a Conversation <span aria-hidden="true">→</span></a>
  );
}
