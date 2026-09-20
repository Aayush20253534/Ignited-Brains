import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { HomeIcon } from "@/components/home/home-icon";
import { ArrowIcon, ButtonLink, Container, Eyebrow } from "@/components/ui";
import {
  aboutPrinciples,
  aboutValues,
  differentiators,
  discoveryJourney,
  indiaCommitments,
  storyMilestones,
} from "@/data/about";
import { pageAssetSlots } from "@/lib/assets";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn how Ignited Brains is building hands-on, future-ready learning environments that turn curiosity into creativity and innovation.",
  alternates: { canonical: "/about" },
};

function ProcessArrow() {
  return (
    <span className="hidden h-px flex-1 bg-gradient-to-r from-brand-line via-brand-orange/40 to-brand-line md:block" aria-hidden="true">
      <ArrowIcon className="ml-auto -mt-2 h-4 w-4 translate-x-1/2 text-brand-orange" />
    </span>
  );
}

export default function AboutPage() {
  return (
    <main className="overflow-hidden bg-white">
      <section className="relative border-b border-brand-line/70 bg-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_34%,rgba(36,117,238,.14),transparent_31rem)]" />
        <Container wide className="relative grid min-h-[590px] items-center gap-10 py-10 lg:grid-cols-[0.82fr_1.18fr] lg:py-0">
          <div className="relative z-10 py-6 lg:py-14">
            <p className="text-[0.72rem] font-extrabold uppercase tracking-[0.16em] text-brand-blue/55 sm:text-xs">
              About Ignited Brains
            </p>
            <h1 className="mt-5 max-w-[680px] text-balance text-[clamp(3.2rem,5.7vw,5.85rem)] font-black leading-[0.94] tracking-[-0.055em] text-brand-blue">
              Education should do more than teach. It should <span className="text-brand-orange">ignite.</span>
            </h1>
            <p className="mt-6 max-w-[610px] text-[0.98rem] font-medium leading-7 text-brand-ink/75 sm:text-[1.04rem]">
              Ignited Brains creates future-ready learning environments where curiosity becomes experimentation, creativity becomes creation and innovation becomes action.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <ButtonLink href="#our-story" size="lg" showArrow>
                Our Story
              </ButtonLink>
              <ButtonLink href="/solutions" size="lg" variant="outline" showArrow>
                Explore Our Solutions
              </ButtonLink>
            </div>

            <div className="mt-9 grid max-w-2xl grid-cols-1 gap-4 border-t border-brand-line/80 pt-6 sm:grid-cols-3">
              {aboutPrinciples.map((item) => (
                <div key={item.title} className="flex items-center gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-orange-50 text-brand-orange">
                    <HomeIcon name={item.icon} className="h-6 w-6" />
                  </span>
                  <div>
                    <p className="text-sm font-extrabold text-brand-blue">{item.title}</p>
                    <p className="mt-0.5 text-[0.7rem] font-semibold text-brand-muted">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative min-h-[390px] self-stretch lg:min-h-[590px]">
            <div className="absolute inset-y-0 left-[-8%] -right-4 overflow-hidden rounded-bl-[5rem] sm:-right-16 lg:left-[-15%] lg:-right-20">
              <Image
                src={pageAssetSlots.about.hero}
                alt="Student building a robotics project in an Ignited Brains learning environment"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white via-white/10 to-transparent lg:from-white/75 lg:via-transparent" />
            </div>
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-b from-[#f8fbff] to-white py-14 sm:py-16 lg:py-20">
        <div className="pointer-events-none absolute left-[18%] top-8 h-64 w-64 rounded-full bg-blue-100/50 blur-3xl" />
        <Container wide className="relative grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.15em] text-brand-blue/55">Our Big Idea</p>
            <h2 className="mt-4 max-w-xl text-balance text-4xl font-black leading-[1.02] tracking-[-0.045em] text-brand-blue sm:text-5xl">
              The future isn&apos;t found in books. It is <span className="text-brand-orange">created.</span>
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-brand-muted">
              We believe education should move beyond passive learning and inspire students to question, explore, experiment and build real solutions for real-world challenges.
            </p>
            <ButtonLink href="/solutions" variant="outline" showArrow className="mt-6">
              Our Philosophy
            </ButtonLink>
          </div>

          <div>
            <p className="mb-7 text-center text-xs font-extrabold uppercase tracking-[0.15em] text-brand-blue/55">
              From a question to a brighter tomorrow
            </p>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:flex md:items-start md:gap-2">
              {discoveryJourney.map((step, index) => (
                <div key={step.title} className="contents">
                  <div className="flex min-w-0 flex-1 flex-col items-center text-center">
                    <span className="grid h-16 w-16 place-items-center rounded-full border border-brand-line bg-white text-brand-blue shadow-card">
                      <HomeIcon name={step.icon} className="h-7 w-7" />
                    </span>
                    <p className="mt-3 text-sm font-extrabold text-brand-blue">{step.title}</p>
                    <p className="mt-0.5 text-xs font-semibold text-brand-muted">{step.caption}</p>
                  </div>
                  {index < discoveryJourney.length - 1 ? <ProcessArrow /> : null}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="relative border-y border-brand-line/70 bg-white py-14 sm:py-16 lg:py-20">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-orange/10" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-orange/10" />
        <Container wide className="relative">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.15em] text-brand-blue/55">Our Values</p>
              <h2 className="mt-3 text-balance text-4xl font-black leading-none tracking-[-0.045em] text-brand-blue sm:text-5xl">
                Curiosity. Creativity. Innovation.
              </h2>
            </div>
            <p className="max-w-sm text-sm font-medium leading-6 text-brand-muted sm:text-right">
              The beliefs that drive everything we do.
            </p>
          </div>

          <div className="mt-9 grid gap-5 md:grid-cols-3">
            {aboutValues.map((value) => (
              <article key={value.title} className="card-lift relative rounded-2xl border border-brand-line bg-white p-6 shadow-card sm:p-7">
                <span className="absolute right-6 top-6 text-2xl font-black text-brand-blue/10">{value.index}</span>
                <HomeIcon name={value.icon} className="h-11 w-11 text-brand-orange" />
                <h3 className="mt-6 text-2xl font-black tracking-[-0.03em] text-brand-blue">{value.title}</h3>
                <p className="mt-3 max-w-sm text-base leading-7 text-brand-muted">{value.description}</p>
                <Link href="/contact" className="focus-ring mt-6 inline-flex items-center gap-2 text-sm font-extrabold text-brand-orange transition hover:gap-3">
                  {value.action}
                  <ArrowIcon className="h-4 w-4" />
                </Link>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section id="our-story" className="bg-white py-14 sm:py-16 lg:py-20 scroll-mt-24">
        <Container wide>
          <div className="grid gap-8 lg:grid-cols-[0.78fr_0.84fr_0.88fr] lg:items-center">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.15em] text-brand-blue/55">Our Story</p>
              <h2 className="mt-4 text-balance text-4xl font-black leading-[1.02] tracking-[-0.045em] text-brand-blue sm:text-5xl">
                A movement for young innovators.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-brand-muted">
                Ignited Brains began with a simple belief that every student has the potential to create real change, if given the right environment, the right tools and the right inspiration.
              </p>
              <p className="mt-3 max-w-xl text-base leading-7 text-brand-muted">
                What started as an idea is now a growing movement to bring hands-on, future-ready learning spaces into schools across India.
              </p>
              <ButtonLink href="#journey" variant="secondary" showArrow className="mt-7">
                Our Journey
              </ButtonLink>
            </div>

            <div className="relative mx-auto w-full max-w-md">
              <div className="relative aspect-[1.08/1] overflow-hidden rounded-2xl border border-brand-line bg-brand-mist shadow-card">
                <Image
                  src={pageAssetSlots.about.story}
                  alt="Students collaborating on an Ignited Brains project"
                  fill
                  sizes="(max-width: 1024px) 90vw, 32vw"
                  className="object-cover"
                />
              </div>
              <p className="mt-3 rotate-[-4deg] text-center text-xl font-semibold italic text-brand-blue">
                Ideas · Students · Impact
              </p>
            </div>

            <ol id="journey" className="relative ml-3 border-l-2 border-brand-orange/45 pl-7 scroll-mt-28">
              {storyMilestones.map((item, index) => (
                <li key={item.title} className={index === storyMilestones.length - 1 ? "relative" : "relative pb-6"}>
                  <span className="absolute -left-[2.22rem] top-1.5 h-3 w-3 rounded-full border-[3px] border-white bg-brand-orange ring-2 ring-brand-orange" />
                  <h3 className="text-sm font-extrabold text-brand-blue">{item.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-brand-muted">{item.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      <section className="soft-blue-surface border-y border-brand-line/70 py-14 sm:py-16 lg:py-20">
        <Container wide>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.15em] text-brand-blue/55">What Makes Us Different</p>
              <h2 className="mt-3 text-balance text-4xl font-black leading-none tracking-[-0.045em] text-brand-blue sm:text-5xl">
                More than a lab. A learning revolution.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-brand-muted sm:text-right">
              We don&apos;t just build equipment. We create environments where students can explore, experiment and innovate.
            </p>
          </div>

          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {differentiators.map((item) => (
              <article key={item.title} className="card-lift rounded-2xl border border-brand-line bg-white p-6 shadow-card">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-orange-50 text-brand-orange">
                  <HomeIcon name={item.icon} className="h-7 w-7" />
                </span>
                <h3 className="mt-5 text-lg font-black tracking-[-0.02em] text-brand-blue">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-brand-muted">{item.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="grid lg:grid-cols-2">
        <article className="relative isolate min-h-[440px] overflow-hidden bg-[#073173] text-white sm:min-h-[500px]">
          <Image
            src={pageAssetSlots.about.mission}
            alt="Astronaut looking toward Earth"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="-z-20 object-cover object-bottom"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#082e6f] via-[#082e6f]/90 to-[#041b3f]/35" />
          <div className="mx-auto flex h-full max-w-[770px] flex-col px-[var(--page-gutter)] py-12 sm:py-14 lg:min-h-[500px] lg:py-16">
            <p className="text-xs font-extrabold uppercase tracking-[0.17em] text-white/70">Our Mission</p>
            <h2 className="mt-5 max-w-xl text-balance text-3xl font-bold leading-[1.14] tracking-[-0.035em] text-white sm:text-4xl">
              To bring hands-on, future-ready labs into every school and ignite curiosity, creativity and innovation in every student.
            </h2>
            <span className="mt-7 h-0.5 w-12 bg-brand-orange" />
          </div>
        </article>

        <article className="relative isolate min-h-[440px] overflow-hidden bg-[#fffaf5] sm:min-h-[500px]">
          <Image
            src={pageAssetSlots.about.vision}
            alt="Student looking toward a future city"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="-z-20 object-cover object-bottom"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-white/95 to-white/10" />
          <div className="mx-auto flex h-full max-w-[770px] flex-col px-[var(--page-gutter)] py-12 sm:py-14 lg:min-h-[500px] lg:py-16">
            <p className="text-xs font-extrabold uppercase tracking-[0.17em] text-brand-blue/55">Our Vision</p>
            <h2 className="mt-5 max-w-xl text-balance text-3xl font-bold leading-[1.14] tracking-[-0.035em] text-brand-ink sm:text-4xl">
              A generation of Indian students who don&apos;t just learn science but <span className="font-black text-brand-blue">create with it</span>, and build the nation&apos;s future.
            </h2>
            <span className="mt-7 h-0.5 w-12 bg-brand-orange" />
          </div>
        </article>
      </section>

      <section className="relative overflow-hidden bg-white py-14 sm:py-16 lg:py-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_53%_48%,rgba(255,102,30,.08),transparent_29rem)]" />
        <Container wide className="relative grid gap-9 lg:grid-cols-[0.72fr_0.95fr_0.6fr] lg:items-center">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.15em] text-brand-blue/55">Our Commitment To India</p>
            <h2 className="mt-4 max-w-xl text-balance text-4xl font-black leading-none tracking-[-0.045em] text-brand-blue sm:text-5xl">
              Building India&apos;s future through curious minds.
            </h2>
            <p className="mt-5 max-w-lg text-base leading-7 text-brand-muted">
              We envision a nation where every school, in every corner of India, has the opportunity to nurture innovators, problem solvers and change makers.
            </p>
            <ButtonLink href="/contact" showArrow className="mt-7">
              Be Part of the Change
            </ButtonLink>
          </div>

          <div className="relative min-h-[330px] overflow-hidden rounded-[2rem] sm:min-h-[390px]">
            <Image
              src={pageAssetSlots.about.indiaImpact}
              alt="India represented as a connected network of learning opportunities"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-contain"
            />
          </div>

          <div className="grid gap-5">
            {indiaCommitments.map((item) => (
              <div key={item.title} className="flex items-center gap-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-orange-50 text-brand-orange">
                  <HomeIcon name={item.icon} className="h-5 w-5" />
                </span>
                <p className="text-sm font-extrabold text-brand-blue">{item.title}</p>
              </div>
            ))}
            <div className="mt-2 flex items-center gap-3 border-t border-brand-line pt-5">
              <Image src="/icons/india-flag.svg" alt="India flag" width={30} height={20} />
              <p className="text-sm font-semibold text-brand-muted">Together for a brighter tomorrow.</p>
            </div>
          </div>
        </Container>
      </section>

      <section className="dark-space-surface border-y border-white/10">
        <Container wide className="relative grid min-h-[190px] items-center gap-8 py-11 sm:py-13 lg:grid-cols-[0.72fr_1.28fr_auto] lg:py-14">
          <div className="absolute inset-y-0 left-0 hidden w-[31%] overflow-hidden lg:block">
            <Image
              src={pageAssetSlots.about.ctaEarth}
              alt=""
              fill
              sizes="31vw"
              className="object-cover object-left"
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#05244f]/10 to-[#05244f]" />
          </div>
          <div className="hidden lg:block" />
          <div className="relative">
            <h2 className="text-balance text-3xl font-black tracking-[-0.04em] text-white sm:text-4xl">
              Let&apos;s build the future together.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/70 sm:text-base">
              Partner with Ignited Brains and be part of a movement that puts curiosity, creativity and innovation at the heart of education.
            </p>
          </div>
          <ButtonLink href="/contact" size="lg" showArrow className="relative justify-self-start lg:justify-self-end">
            Partner With Us
          </ButtonLink>
        </Container>
      </section>
    </main>
  );
}
