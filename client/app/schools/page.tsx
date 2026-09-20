import type { Metadata } from "next";
import Image from "next/image";

import { HomeIcon } from "@/components/home/home-icon";
import { SiteImage } from "@/components/media";
import { Button, ButtonLink, Container, Eyebrow } from "@/components/ui";
import {
  institutionBenefits,
  schoolApproach,
  schoolHeroBenefits,
  schoolOfferings,
  schoolPartners,
  studentBenefits,
} from "@/data/schools";
import { pageAssetSlots } from "@/lib/assets";

export const metadata: Metadata = {
  title: "For Schools & Institutions",
  description:
    "Transform your school with future-ready labs, learning environments, science exhibits and hands-on innovation programs from Ignited Brains.",
  alternates: { canonical: "/schools" },
};

export default function SchoolsPage() {
  return (
    <main className="overflow-hidden bg-white">
      <section className="relative border-b border-brand-line/70 bg-white">
        <Container wide className="grid min-h-[560px] items-center gap-8 py-10 lg:grid-cols-[0.78fr_1.22fr] lg:py-0">
          <div className="relative z-10 py-5 lg:py-12">
            <p className="text-xs font-black uppercase tracking-[0.14em] text-brand-blue/55">For Schools & Institutions</p>
            <h1 className="mt-5 max-w-[670px] text-balance text-[clamp(3rem,5.25vw,5.45rem)] font-black leading-[0.94] tracking-[-0.055em] text-brand-blue">
              Transform your school into a <span className="text-brand-orange">future-ready</span> learning environment.
            </h1>
            <p className="mt-5 max-w-[620px] text-base font-medium leading-7 text-brand-ink/75">
              Ignited Brains works with schools and institutions to design, build and enable hands-on learning spaces that ignite curiosity, creativity and innovation in every student.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <ButtonLink href="#consultation" size="lg" showArrow>Discuss Your School</ButtonLink>
              <ButtonLink href="/solutions" size="lg" variant="outline" showArrow>Explore Our Solutions</ButtonLink>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-4 border-t border-brand-line/80 pt-6 sm:grid-cols-4">
              {schoolHeroBenefits.map((item) => (
                <div key={item.title} className="flex items-center gap-2.5">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-orange-50 text-brand-orange"><HomeIcon name={item.icon} className="h-6 w-6" /></span>
                  <p className="text-[0.72rem] font-extrabold leading-4 text-brand-blue">{item.title}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative min-h-[390px] self-stretch lg:min-h-[560px]">
            <div className="absolute inset-y-0 left-[-8%] -right-4 overflow-hidden rounded-bl-[5rem] sm:-right-14 lg:left-[-14%] lg:-right-20">
              <Image
                src={pageAssetSlots.schools.hero}
                alt="Students building a robotics project outside a modern school campus"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 62vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white via-white/5 to-transparent lg:from-white/58 lg:via-transparent" />
            </div>
          </div>
        </Container>
      </section>

      <section className="soft-blue-surface border-b border-brand-line/70 py-12 sm:py-14 lg:py-16">
        <Container wide>
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.15em] text-brand-blue/55">Our Approach</p>
              <h2 className="mt-3 text-4xl font-black tracking-[-0.045em] text-brand-blue sm:text-5xl">From vision to a learning reality.</h2>
            </div>
            <p className="max-w-lg text-sm leading-6 text-brand-muted lg:text-right">A collaborative and end-to-end approach to create meaningful innovation spaces in your school.</p>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
            {schoolApproach.map((item, index) => (
              <article key={item.title} className="relative rounded-2xl border border-brand-line bg-white p-5 shadow-card">
                {index < schoolApproach.length - 1 ? <span className="absolute -right-2 top-1/2 z-10 hidden text-brand-orange lg:block">→</span> : null}
                <span className="grid h-11 w-11 place-items-center rounded-full bg-brand-sky text-brand-blue"><HomeIcon name={item.icon} className="h-6 w-6" /></span>
                <p className="mt-4 text-[0.65rem] font-black text-brand-orange">{item.step}</p>
                <h3 className="mt-1 text-base font-black text-brand-blue">{item.title}</h3>
                <p className="mt-2 text-xs leading-5 text-brand-muted">{item.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-12 sm:py-14 lg:py-16">
        <Container wide>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <Eyebrow>What We Provide</Eyebrow>
              <h2 className="mt-3 text-balance text-4xl font-black tracking-[-0.045em] text-brand-blue sm:text-5xl">Complete learning environments for tomorrow.</h2>
            </div>
            <ButtonLink href="/solutions" variant="ghost" showArrow>Discover How We Help</ButtonLink>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
            {schoolOfferings.map((item) => (
              <article key={item.title} className="card-lift overflow-hidden rounded-2xl border border-brand-line bg-white shadow-card">
                <SiteImage src={item.image} alt={item.title} aspectRatio="4/5" sizes="(max-width: 768px) 50vw, 17vw" className="rounded-none" />
                <div className="relative p-4 pt-5">
                  <span className="absolute -top-6 left-4 grid h-11 w-11 place-items-center rounded-full border-4 border-white bg-orange-50 text-brand-orange"><HomeIcon name={item.icon} className="h-5 w-5" /></span>
                  <h3 className="mt-2 text-sm font-black leading-5 text-brand-blue">{item.title}</h3>
                  <p className="mt-2 text-[0.7rem] leading-5 text-brand-muted">{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-brand-line/70 bg-white">
        <Container wide className="grid lg:grid-cols-2">
          <div className="relative min-h-[330px] overflow-hidden lg:min-h-[380px]">
            <Image src={pageAssetSlots.schools.testimonial} alt="Student inspired by hands-on learning" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10" />
          </div>
          <div className="flex items-center p-8 sm:p-10 lg:p-14">
            <blockquote className="max-w-xl">
              <span className="text-5xl font-black text-brand-orange">“</span>
              <p className="-mt-3 text-balance text-2xl font-semibold leading-relaxed text-brand-blue sm:text-3xl">
                This lab has completely changed how our students learn. They are more curious, more confident and more excited about science.
              </p>
              <footer className="mt-6 text-sm font-black text-brand-blue">School Principal<br /><span className="font-medium text-brand-muted">Partner School</span></footer>
            </blockquote>
          </div>
        </Container>
      </section>

      <section className="bg-white py-12 sm:py-14 lg:py-16">
        <Container wide className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.15em] text-brand-blue/55">For Students</p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-brand-blue sm:text-4xl">Designed to unlock potential.</h2>
            <p className="mt-2 text-sm text-brand-muted">Hands-on spaces where students can explore, experiment and innovate.</p>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-5">
              {studentBenefits.map((item) => (
                <article key={item.title} className="rounded-2xl border border-brand-line bg-white p-4 text-center shadow-card">
                  <HomeIcon name={item.icon} className="mx-auto h-7 w-7 text-brand-blue" />
                  <h3 className="mt-3 text-sm font-black text-brand-blue">{item.title}</h3>
                  <p className="mt-1 text-[0.65rem] leading-4 text-brand-muted">{item.caption}</p>
                </article>
              ))}
            </div>
          </div>
          <div className="lg:border-l lg:border-brand-line lg:pl-12">
            <p className="text-xs font-extrabold uppercase tracking-[0.15em] text-brand-blue/55">For Institutions</p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-brand-blue sm:text-4xl">Built for lasting impact.</h2>
            <p className="mt-2 text-sm text-brand-muted">Future-ready environments that strengthen your school&apos;s vision.</p>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-5">
              {institutionBenefits.map((item) => (
                <article key={item.title} className="rounded-2xl border border-brand-line bg-white p-4 text-center shadow-card">
                  <HomeIcon name={item.icon} className="mx-auto h-7 w-7 text-brand-blue" />
                  <h3 className="mt-3 text-[0.72rem] font-black leading-4 text-brand-blue">{item.title}</h3>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="soft-blue-surface border-y border-brand-line/70 py-12 sm:py-14 lg:py-16">
        <Container wide>
          <p className="text-xs font-extrabold uppercase tracking-[0.15em] text-brand-blue/55">Who We Work With</p>
          <h2 className="mt-3 text-4xl font-black tracking-[-0.045em] text-brand-blue sm:text-5xl">Building partnerships for a brighter tomorrow.</h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-brand-muted">We collaborate with various educational and institutional partners to bring hands-on learning to more students.</p>
          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {schoolPartners.map((partner) => (
              <article key={partner.title} className="flex gap-4 rounded-2xl border border-brand-line bg-white p-5 shadow-card">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand-sky text-brand-blue"><HomeIcon name={partner.icon} className="h-7 w-7" /></span>
                <div><h3 className="text-sm font-black text-brand-blue">{partner.title}</h3><p className="mt-1 text-xs leading-5 text-brand-muted">{partner.description}</p></div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="dark-space-surface border-y border-white/10 py-0">
        <Container wide className="grid min-h-[330px] items-center gap-8 py-10 lg:grid-cols-[0.72fr_1.28fr] lg:py-0">
          <div className="relative z-10">
            <p className="text-xs font-black uppercase tracking-[0.15em] text-white/55">From Classrooms to Communities</p>
            <h2 className="mt-4 max-w-xl text-balance text-4xl font-black leading-[1.02] tracking-[-0.045em] text-white sm:text-5xl">Give students more than a classroom.</h2>
            <p className="mt-4 max-w-lg text-base leading-7 text-white/65">Let&apos;s create spaces where curiosity turns into real skills, and ideas turn into impact.</p>
            <ButtonLink href="/projects" size="lg" showArrow className="mt-7">Watch Our Impact</ButtonLink>
          </div>
          <div className="relative min-h-[280px] self-stretch lg:min-h-[330px]">
            <div className="absolute inset-0 overflow-hidden">
              <Image src={pageAssetSlots.schools.ctaStudent} alt="Student holding a satellite model against a future-focused learning backdrop" fill sizes="(max-width: 1024px) 100vw, 60vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#041b3f] via-[#041b3f]/25 to-transparent" />
            </div>
          </div>
        </Container>
      </section>

      <section id="consultation" className="scroll-mt-24 bg-white py-12 sm:py-14 lg:py-16">
        <Container wide>
          <p className="text-xs font-extrabold uppercase tracking-[0.15em] text-brand-blue/55">Ready to get started?</p>
          <h2 className="mt-3 text-4xl font-black tracking-[-0.045em] text-brand-blue sm:text-5xl">Let&apos;s build something students remember.</h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-brand-muted">Share a few details and our team will get in touch to discuss the right solution for your school.</p>
          <form className="mt-7 grid gap-4 rounded-2xl border border-brand-line bg-white p-5 shadow-card sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1fr_auto] lg:items-end" aria-label="School consultation request">
            {[
              ["name", "Your Name", "Enter your name", "text"],
              ["school", "School / Organisation", "Enter school name", "text"],
              ["phone", "Phone Number", "Enter phone number", "tel"],
              ["location", "City / State", "Enter location", "text"],
            ].map(([id, label, placeholder, type]) => (
              <label key={id} htmlFor={id} className="block text-xs font-bold text-brand-blue">
                {label}
                <input id={id} name={id} type={type} placeholder={placeholder} className="focus-ring mt-2 min-h-12 w-full rounded-xl border border-brand-line bg-white px-4 text-sm font-medium text-brand-ink placeholder:text-brand-muted/60" />
              </label>
            ))}
            <Button type="submit" size="lg" showArrow className="w-full lg:w-auto">Request a Consultation</Button>
          </form>
          <p className="mt-2 text-[0.68rem] font-medium text-brand-muted">No obligation. Just a conversation about possibilities.</p>
        </Container>
      </section>
    </main>
  );
}
