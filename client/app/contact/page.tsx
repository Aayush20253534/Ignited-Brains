import type { Metadata } from "next";
import Image from "next/image";

import { HomeIcon } from "@/components/home/home-icon";
import { SocialIcon } from "@/components/layout/social-icon";
import { ArrowIcon, Button, Container, Eyebrow } from "@/components/ui";
import {
  contactFaqs,
  contactHeroBenefits,
  contactProcess,
  partnerTypes,
} from "@/data/contact";
import { pageAssetSlots } from "@/lib/assets";

export const metadata: Metadata = {
  title: "Partner With Us",
  description:
    "Partner with Ignited Brains to create future-ready learning environments, labs and hands-on student experiences.",
  alternates: { canonical: "/contact" },
};

const fieldClass =
  "mt-1.5 min-h-11 w-full rounded-lg border border-brand-line bg-white px-3.5 text-sm text-brand-ink outline-none transition placeholder:text-brand-muted/55 focus:border-brand-blue/40 focus:ring-2 focus:ring-brand-blue/10 lg:min-h-9 lg:px-3";

function MailIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" aria-hidden="true">
      <path d="M3 5.5h14v9H3v-9Z" stroke="currentColor" strokeWidth="1.5" />
      <path d="m3.8 6.2 6.2 4.4 6.2-4.4" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" aria-hidden="true">
      <path d="M6.2 3.2 8 6.8 6.4 8c.8 2.4 2.5 4.1 4.9 4.9l1.2-1.6 3.6 1.8-.5 2.8c-.2.8-.9 1.3-1.7 1.2C7.7 16.4 3.6 12.3 2.9 6.1c-.1-.8.4-1.5 1.2-1.7l2.1-.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" aria-hidden="true">
      <path d="M10 17s5-4.7 5-9a5 5 0 1 0-10 0c0 4.3 5 9 5 9Z" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="10" cy="8" r="1.7" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export default function ContactPage() {
  return (
    <main className="overflow-hidden bg-white">
      <section className="relative border-b border-brand-line/70 bg-white">
        <Container wide className="grid items-center gap-7 py-10 lg:min-h-[calc(100vh-5.5rem)] lg:grid-cols-[0.78fr_0.82fr_0.9fr] lg:gap-0 lg:py-8">
          <div className="relative z-20 py-4 lg:pr-8">
            <Eyebrow>Partner With Us</Eyebrow>
            <h1 className="mt-5 max-w-[560px] text-balance text-[clamp(3.2rem,5.4vw,5.65rem)] font-black leading-[0.92] tracking-[-0.055em] text-brand-blue">
              Let’s build the future <span className="text-brand-orange">together.</span>
            </h1>
            <p className="mt-5 max-w-[530px] text-base font-medium leading-7 text-brand-ink/75">
              Tell us about your school, institution or learning initiative. We’ll get in touch to discuss how Ignited Brains can help you create hands-on learning spaces for curious minds.
            </p>
            <div className="mt-9 grid grid-cols-3 gap-3 border-t border-brand-line/75 pt-6">
              {contactHeroBenefits.map((item) => (
                <div key={item.title} className="flex items-center gap-2.5">
                  <HomeIcon name={item.icon} className="h-7 w-7 shrink-0 text-brand-orange" />
                  <p className="text-[0.68rem] font-black leading-4 text-brand-blue sm:text-xs">{item.title}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-0 min-h-[390px] overflow-hidden rounded-3xl lg:min-h-[calc(100vh-6.5rem)] lg:rounded-none lg:rounded-bl-[5rem]">
            <Image
              src={pageAssetSlots.contact.hero}
              alt="Student looking toward a model rocket in an innovation lab"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 34vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white/50 via-transparent to-transparent lg:from-white/25" />
          </div>

          <form
            action="/contact"
            method="get"
            className="relative z-30 rounded-3xl border border-brand-line bg-white p-5 shadow-[0_24px_70px_rgba(24,53,103,.15)] sm:p-7 lg:-ml-5 lg:p-4"
          >
            <h2 className="text-2xl font-black tracking-[-0.035em] text-brand-blue">Start a Conversation</h2>
            <p className="mt-1 text-sm text-brand-muted">Fill in the details and we’ll get back to you soon.</p>
            <p className="mt-2 text-xs text-brand-muted"><span className="text-brand-orange">*</span> Required fields</p>

            <div className="mt-4 grid gap-3 lg:mt-3 lg:grid-cols-2 lg:gap-2">
              <label className="text-xs font-extrabold text-brand-blue">
                Full Name <span className="text-brand-orange">*</span>
                <input className={fieldClass} name="name" type="text" required placeholder="Enter your full name" />
              </label>
              <label className="text-xs font-extrabold text-brand-blue">
                Email Address <span className="text-brand-orange">*</span>
                <input className={fieldClass} name="email" type="email" required placeholder="Enter your email" />
              </label>
              <label className="text-xs font-extrabold text-brand-blue">
                Phone Number
                <input className={fieldClass} name="phone" type="tel" placeholder="Enter your phone number" />
              </label>
              <label className="text-xs font-extrabold text-brand-blue">
                Organization / Institution
                <input className={fieldClass} name="organization" type="text" placeholder="Enter your organization or institution" />
              </label>
              <label className="text-xs font-extrabold text-brand-blue lg:col-span-2">
                Subject
                <input className={fieldClass} name="subject" type="text" placeholder="What would you like to discuss?" />
              </label>
              <label className="text-xs font-extrabold text-brand-blue lg:col-span-2">
                Message <span className="text-brand-orange">*</span>
                <textarea className={`${fieldClass} min-h-24 resize-y py-3 lg:min-h-16 lg:py-2`} name="message" required placeholder="Tell us about your requirements..." />
              </label>
            </div>

            <Button type="submit" size="lg" showArrow className="mt-3 w-full lg:min-h-11 lg:px-4 lg:text-sm">Submit</Button>
          </form>
        </Container>
      </section>

      <section className="bg-white py-12 sm:py-14 lg:py-16">
        <Container wide>
          <Eyebrow>Who Can Partner With Us</Eyebrow>
          <h2 className="mt-3 max-w-3xl text-balance text-4xl font-black tracking-[-0.045em] text-brand-blue sm:text-5xl">Let’s create opportunities for more learners.</h2>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {partnerTypes.map((partner) => (
              <article key={partner.title} className="card-lift min-h-[210px] rounded-2xl border border-brand-line bg-white p-6 shadow-card">
                <HomeIcon name={partner.icon} className="h-10 w-10 text-brand-orange" />
                <h3 className="mt-5 text-lg font-black leading-tight text-brand-blue">{partner.title}</h3>
                <p className="mt-3 text-sm leading-6 text-brand-muted">{partner.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="soft-blue-surface border-y border-brand-line/70 py-12 sm:py-14 lg:py-16">
        <Container wide>
          <Eyebrow>What Happens Next</Eyebrow>
          <h2 className="mt-3 text-4xl font-black tracking-[-0.045em] text-brand-blue sm:text-5xl">A simple and clear process.</h2>

          <div className="mt-8 grid grid-cols-2 gap-5 lg:grid-cols-4 lg:gap-8">
            {contactProcess.map((item, index) => (
              <article key={item.step} className="relative pr-3">
                {index < contactProcess.length - 1 ? <span className="absolute -right-3 top-7 hidden text-2xl text-brand-orange lg:block">→</span> : null}
                <span className="grid h-14 w-14 place-items-center rounded-full border border-brand-line bg-white text-brand-orange shadow-card"><HomeIcon name={item.icon} className="h-7 w-7" /></span>
                <p className="mt-4 text-[0.68rem] font-black text-brand-orange">{item.step}</p>
                <h3 className="mt-1 text-base font-black leading-tight text-brand-blue sm:text-lg">{item.title}</h3>
                <p className="mt-2 text-xs leading-5 text-brand-muted sm:text-sm">{item.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-12 sm:py-14 lg:py-16">
        <Container wide className="grid gap-8 lg:grid-cols-[0.58fr_1.42fr] lg:items-stretch">
          <div>
            <h2 className="text-4xl font-black tracking-[-0.045em] text-brand-blue">Get in Touch</h2>
            <p className="mt-2 text-base text-brand-muted">We’d love to hear from you.</p>
            <ul className="mt-6 space-y-4">
              <li className="flex gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-brand-orange text-white"><MailIcon /></span>
                <div><p className="text-xs text-brand-muted">Email</p><a href="mailto:info@ignitedbrains.com" className="text-sm font-black text-brand-blue">info@ignitedbrains.com</a></div>
              </li>
              <li className="flex gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-brand-orange text-white"><PhoneIcon /></span>
                <div><p className="text-xs text-brand-muted">Phone</p><a href="tel:+919454488061" className="text-sm font-black text-brand-blue">+91 94544 88061</a></div>
              </li>
              <li className="flex gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-brand-orange text-white"><PinIcon /></span>
                <div><p className="text-xs text-brand-muted">Location</p><p className="text-sm font-black text-brand-blue">Prayagraj, Uttar Pradesh, India</p></div>
              </li>
            </ul>
            <div className="mt-5 flex gap-2">
              {["linkedin", "instagram", "youtube"].map((network) => (
                <span key={network} aria-label={`${network} profile link pending`} title={`${network} profile link pending`} className="grid h-9 w-9 place-items-center rounded-full bg-brand-blue/85 text-white">
                  <SocialIcon network={network as "linkedin" | "instagram" | "youtube"} className="h-4 w-4" />
                </span>
              ))}
            </div>
          </div>

          <div className="grid overflow-hidden rounded-3xl border border-brand-line bg-brand-mist shadow-card md:grid-cols-[1.1fr_0.9fr]">
            <div className="relative min-h-[260px] sm:min-h-[320px]">
              <Image src={pageAssetSlots.contact.indiaCoverage} alt="Ignited Brains school network across India" fill sizes="(max-width: 768px) 100vw, 45vw" className="object-cover object-center" />
            </div>
            <div className="flex items-center p-7 sm:p-9">
              <div>
                <h3 className="text-3xl font-black tracking-[-0.04em] text-brand-blue">A stronger India through curious minds.</h3>
                <p className="mt-4 text-sm leading-6 text-brand-muted">We work with schools and institutions across India to bring hands-on learning spaces to more students.</p>
                <span className="mt-5 block h-0.5 w-8 bg-brand-orange" />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="soft-blue-surface border-t border-brand-line/70 py-12 sm:py-14 lg:py-16">
        <Container wide>
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-4xl font-black tracking-[-0.045em] text-brand-blue">Frequently Asked Questions</h2>
              <p className="mt-2 text-sm text-brand-muted">Quick answers to common questions.</p>
            </div>
            <a href="mailto:info@ignitedbrains.com" className="focus-ring hidden items-center gap-2 text-sm font-extrabold text-brand-orange sm:inline-flex">View All FAQs <ArrowIcon className="h-4 w-4" /></a>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1.22fr_0.78fr] lg:items-stretch">
            <div className="space-y-3">
              {contactFaqs.map((faq) => (
                <details key={faq.question} className="group rounded-xl border border-brand-line bg-white shadow-sm">
                  <summary className="focus-ring flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-5 text-sm font-black text-brand-blue [&::-webkit-details-marker]:hidden">
                    {faq.question}
                    <span className="text-2xl font-light text-brand-blue transition group-open:rotate-45">+</span>
                  </summary>
                  <p className="border-t border-brand-line/70 px-5 py-4 text-sm leading-6 text-brand-muted">{faq.answer}</p>
                </details>
              ))}
            </div>
            <div className="overflow-hidden rounded-2xl border border-brand-line bg-white shadow-card">
              <video
                src="/media/homeimg.mp4"
                poster={pageAssetSlots.home.storyVideo}
                autoPlay
                muted
                loop
                playsInline
                aria-label="Student building a robotics project"
                className="aspect-[16/6.5] h-full w-full object-cover"
              />
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
