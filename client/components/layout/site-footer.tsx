import Link from "next/link";
import type { ReactNode } from "react";

import { BrandLogo } from "@/components/layout/brand-logo";
import { SocialIcon, type SocialNetwork } from "@/components/layout/social-icon";
import { ArrowIcon, Container } from "@/components/ui";
import { footerQuickLinks, footerSolutions } from "@/data/navigation";

const socialLinks: Array<{ label: string; network: SocialNetwork }> = [
  { label: "LinkedIn", network: "linkedin" },
  { label: "Instagram", network: "instagram" },
  { label: "YouTube", network: "youtube" },
  { label: "Facebook", network: "facebook" },
];

function FooterHeading({ children }: { children: ReactNode }) {
  return <h2 className="text-sm font-extrabold text-brand-orange">{children}</h2>;
}

function MailIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" aria-hidden="true">
      <path d="M3 5.5h14v9H3v-9Z" stroke="currentColor" strokeWidth="1.5" />
      <path d="m3.8 6.2 6.2 4.4 6.2-4.4" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" aria-hidden="true">
      <path d="M6.2 3.2 8 6.8 6.4 8c.8 2.4 2.5 4.1 4.9 4.9l1.2-1.6 3.6 1.8-.5 2.8c-.2.8-.9 1.3-1.7 1.2C7.7 16.4 3.6 12.3 2.9 6.1c-.1-.8.4-1.5 1.2-1.7l2.1-.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" aria-hidden="true">
      <path d="M10 17s5-4.7 5-9a5 5 0 1 0-10 0c0 4.3 5 9 5 9Z" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="10" cy="8" r="1.7" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-[#031a3a] text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(circle at 86% 24%, rgba(37,111,255,.38), transparent 24rem), radial-gradient(circle at 10% 105%, rgba(0,101,230,.24), transparent 28rem)",
        }}
      />

      <Container wide className="relative grid gap-x-8 gap-y-11 py-14 sm:grid-cols-2 sm:py-16 md:grid-cols-3 lg:grid-cols-[1.3fr_0.75fr_0.9fr_1.15fr_1.25fr] lg:gap-10 lg:py-20">
        <div className="max-w-xs sm:col-span-2 md:col-span-1">
          <BrandLogo inverted />
          <p className="mt-5 text-sm leading-6 text-white/65">
            Transforming education through innovation, hands-on learning and future-ready experiences.
          </p>
          <div className="mt-6 flex flex-wrap gap-2.5">
            {socialLinks.map((social) => (
              <span
                key={social.label}
                aria-label={`${social.label} profile link pending`}
                title={`${social.label} profile link pending`}
                className="grid h-9 w-9 place-items-center rounded-full border border-white/20 text-white/55"
              >
                <SocialIcon network={social.network} className="h-[18px] w-[18px]" />
              </span>
            ))}
          </div>
        </div>

        <div>
          <FooterHeading>Quick Links</FooterHeading>
          <ul className="mt-5 space-y-2.5">
            {footerQuickLinks.map((item) => (
              <li key={item.href}>
                <Link className="text-sm text-white/65 transition hover:text-white" href={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <FooterHeading>Our Solutions</FooterHeading>
          <ul className="mt-5 space-y-2.5">
            {footerSolutions.map((item) => (
              <li key={item.href}>
                <Link className="text-sm text-white/65 transition hover:text-white" href={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <FooterHeading>Contact Us</FooterHeading>
          <ul className="mt-5 space-y-4 text-sm text-white/65">
            <li className="flex gap-3">
              <PhoneIcon />
              <a className="transition hover:text-white" href="tel:+919454488061">
                +91 94544 88061
              </a>
            </li>
            <li className="flex gap-3">
              <MailIcon />
              <a className="transition hover:text-white" href="mailto:info@ignitedbrains.com">
                info@ignitedbrains.com
              </a>
            </li>
            <li className="flex gap-3">
              <PinIcon />
              <span>Prayagraj, Uttar Pradesh, India</span>
            </li>
          </ul>
        </div>

        <div className="sm:col-span-2 md:col-span-1">
          <FooterHeading>Newsletter</FooterHeading>
          <p className="mt-5 max-w-xs text-sm leading-6 text-white/65">
            Stay updated with our latest programs and innovations.
          </p>
          <form action="/contact" className="mt-5 flex max-w-md rounded-xl border border-white/15 bg-white/[0.04] p-1.5">
            <label htmlFor="footer-email" className="sr-only">
              Email address
            </label>
            <input
              id="footer-email"
              name="email"
              type="email"
              required
              placeholder="Enter your email"
              className="min-w-0 flex-1 bg-transparent px-3 text-sm text-white outline-none placeholder:text-white/35"
            />
            <button
              type="submit"
              aria-label="Subscribe"
              className="focus-ring grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-brand-orange text-white transition hover:bg-brand-orange-dark"
            >
              <ArrowIcon className="h-5 w-5" />
            </button>
          </form>
        </div>
      </Container>

      <div className="relative border-t border-white/10">
        <Container wide className="flex flex-col gap-4 py-6 text-xs text-white/50 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Ignited Brains. All Rights Reserved.</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link href="/privacy" className="transition hover:text-white">
              Privacy Policy
            </Link>
            <span aria-hidden="true">|</span>
            <Link href="/terms" className="transition hover:text-white">
              Terms &amp; Conditions
            </Link>
          </div>
          <div className="flex items-center gap-3 text-right">
            <span className="font-semibold italic tracking-wide text-white/70">A Brighter Tomorrow</span>
            <span aria-label="India" role="img" className="text-base">
              🇮🇳
            </span>
          </div>
        </Container>
      </div>
    </footer>
  );
}
