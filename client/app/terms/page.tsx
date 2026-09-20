import type { Metadata } from "next";

import { ButtonLink, Container, Eyebrow } from "@/components/ui";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "The final terms & conditions for Ignited Brains will be published here after legal review.",
  robots: { index: false, follow: true },
};

export default function LegalPlaceholderPage() {
  return (
    <main className="bg-white">
      <section className="soft-blue-surface border-b border-brand-line/70 py-20 sm:py-24 lg:py-28">
        <Container>
          <Eyebrow>Legal</Eyebrow>
          <h1 className="mt-4 text-balance text-4xl font-black tracking-[-0.045em] text-brand-blue sm:text-5xl">Terms & Conditions</h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-brand-muted">The final terms & conditions for Ignited Brains will be published here after legal review.</p>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-brand-muted">
            This placeholder intentionally does not invent legal terms. For current questions, contact the Ignited Brains team directly.
          </p>
          <ButtonLink href="/contact" showArrow className="mt-7">Contact Us</ButtonLink>
        </Container>
      </section>
    </main>
  );
}
