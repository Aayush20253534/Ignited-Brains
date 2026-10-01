import type { Metadata } from "next";
import { ButtonLink, Container, Eyebrow } from "@/components/ui";

export const metadata: Metadata = {
  title: "Privacy & your information",
  description: "Information about contacting Ignited Brains and requesting updates.",
  robots: { index: false, follow: true },
};

export default function InformationPage() {
  return <main className="bg-white">
    <section className="soft-blue-surface border-b border-brand-line py-12 sm:py-16">
      <Container><Eyebrow>Website information</Eyebrow><h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-brand-blue sm:text-5xl">Privacy & your information</h1><p className="mt-5 max-w-2xl text-base leading-7 text-brand-muted">Information about contacting Ignited Brains and requesting updates.</p></Container>
    </section>
    <section className="py-12 sm:py-16"><Container>
      <div className="max-w-3xl space-y-8">
        <article><h2 className="text-xl font-bold text-brand-blue">Information you submit</h2><p className="mt-3 text-base leading-7 text-brand-muted">Contact and application forms ask for the details needed to respond to your enquiry, such as your name, email, phone number, institution and requirements. Please avoid including sensitive personal information in free-text messages.</p></article>
        <article><h2 className="text-xl font-bold text-brand-blue">Enquiries and applications</h2><p className="mt-3 text-base leading-7 text-brand-muted">Submitted enquiries and applications are stored by our service and reviewed through our admin portal so the team can respond and follow up.</p></article>
        <article><h2 className="text-xl font-bold text-brand-blue">Newsletter requests</h2><p className="mt-3 text-base leading-7 text-brand-muted">Requesting updates sends your email address and consent to the team. To stop updates or ask about your information, email info@ignitedbrains.com.</p></article>
        <article><h2 className="text-xl font-bold text-brand-blue">Questions about your data</h2><p className="mt-3 text-base leading-7 text-brand-muted">For the organisation’s full privacy policy, or to request access, correction or deletion of information you submitted, contact the Ignited Brains team.</p></article>
        <div className="flex flex-wrap gap-3 border-t border-brand-line pt-7"><ButtonLink href="/contact" showArrow>Contact the team</ButtonLink><ButtonLink href="mailto:info@ignitedbrains.com" variant="outline">Email us</ButtonLink></div>
      </div>
    </Container></section>
  </main>;
}
