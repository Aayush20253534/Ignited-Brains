import type { Metadata } from "next";
import { ButtonLink, Container, Eyebrow } from "@/components/ui";

export const metadata: Metadata = {
  title: "Website & programme information",
  description: "Useful information before you enquire about a programme or learning space.",
  robots: { index: false, follow: true },
};

export default function InformationPage() {
  return <main className="bg-white">
    <section className="soft-blue-surface border-b border-brand-line py-12 sm:py-16">
      <Container><Eyebrow>Website information</Eyebrow><h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-brand-blue sm:text-5xl">Website & programme information</h1><p className="mt-5 max-w-2xl text-base leading-7 text-brand-muted">Useful information before you enquire about a programme or learning space.</p></Container>
    </section>
    <section className="py-12 sm:py-16"><Container>
      <div className="max-w-3xl space-y-8">
        <article><h2 className="text-xl font-bold text-brand-blue">Using this website</h2><p className="mt-3 text-base leading-7 text-brand-muted">This website introduces Ignited Brains learning spaces, projects and programmes. Use the contact form to discuss the offering that interests you.</p></article>
        <article><h2 className="text-xl font-bold text-brand-blue">Programme enquiries</h2><p className="mt-3 text-base leading-7 text-brand-muted">Sending an enquiry or application requests a conversation with the team. Programme scope, pricing, timelines and applicable terms are confirmed directly with Ignited Brains.</p></article>
        <article><h2 className="text-xl font-bold text-brand-blue">Shop availability</h2><p className="mt-3 text-base leading-7 text-brand-muted">The shop is being prepared. Products cannot currently be purchased through this website. Contact the team for information about learning kits and resources.</p></article>
        <article><h2 className="text-xl font-bold text-brand-blue">Applicable terms</h2><p className="mt-3 text-base leading-7 text-brand-muted">For the organisation’s current terms and conditions, including the terms for a particular programme or purchase, contact the Ignited Brains team before proceeding.</p></article>
        <div className="flex flex-wrap gap-3 border-t border-brand-line pt-7"><ButtonLink href="/contact" showArrow>Contact the team</ButtonLink><ButtonLink href="mailto:info@ignitedbrains.com" variant="outline">Email us</ButtonLink></div>
      </div>
    </Container></section>
  </main>;
}
