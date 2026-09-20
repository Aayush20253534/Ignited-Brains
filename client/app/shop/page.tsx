import type { Metadata } from "next";

import { ButtonLink, Container, Eyebrow } from "@/components/ui";

export const metadata: Metadata = {
  title: "Shop",
  description: "Ignited Brains Shop is coming soon.",
  alternates: { canonical: "/shop" },
};

export default function ShopPage() {
  return (
    <main className="overflow-hidden bg-white">
      <section className="dark-space-surface relative min-h-[68vh] border-b border-white/10 py-20 sm:py-24 lg:py-28">
        <Container className="relative flex min-h-[48vh] items-center justify-center">
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow className="text-brand-orange">Ignited Brains Shop</Eyebrow>
            <h1 className="mt-5 text-balance text-5xl font-black leading-[0.95] tracking-[-0.055em] text-white sm:text-6xl lg:text-7xl">
              Coming Soon
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/70 sm:text-lg">
              We are preparing a dedicated shop for learning kits, innovation resources and hands-on educational products.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <ButtonLink href="/" size="lg" showArrow>Back to Home</ButtonLink>
              <ButtonLink href="/contact" variant="outline" size="lg" className="!bg-transparent">Contact Us</ButtonLink>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
