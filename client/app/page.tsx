import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

import { HomeIcon } from "@/components/home/home-icon";
import { SiteImage } from "@/components/media";
import { ArrowIcon, ButtonLink, Container, Eyebrow } from "@/components/ui";
import {
  homePrinciples,
  homeSolutions,
  impactStats,
  impactWords,
  learningCycle,
  transformationSteps,
} from "@/data/home";
import { pageAssetSlots } from "@/lib/assets";

export const metadata: Metadata = {
  title: "Hands-on STEM, Space & Robotics Learning",
  description:
    "Ignited Brains creates hands-on Space, STEM, AI & Robotics Labs and Science Parks that turn curiosity into real-world learning.",
  alternates: { canonical: "/" },
};

function PlayCircle({ className = "" }: { className?: string }) {
  return (
    <span
      className={`grid h-11 w-11 shrink-0 place-items-center rounded-full border border-brand-blue/20 bg-white text-brand-blue shadow-sm ${className}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 20 20" className="ml-0.5 h-4 w-4" fill="currentColor">
        <path d="m7 5 8 5-8 5V5Z" />
      </svg>
    </span>
  );
}

function SmallArrowLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="focus-ring inline-flex items-center gap-2 text-sm font-extrabold text-brand-orange transition hover:gap-3"
    >
      {children}
      <ArrowIcon className="h-4 w-4" />
    </Link>
  );
}

export default function HomePage() {
  return (
    <main className="overflow-hidden bg-white">
      <section className="relative border-b border-brand-line/80 bg-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_28%,rgba(45,125,235,.12),transparent_28rem)]" />
        <Container wide className="relative grid min-h-[610px] items-center gap-6 py-10 sm:gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:gap-10 lg:py-0">
          <div className="relative z-10 py-4 sm:py-6 lg:py-14">
            <p className="text-[0.72rem] font-extrabold uppercase tracking-[0.15em] text-brand-blue/55 sm:text-xs">
              Transforming Education Through Innovation
            </p>
            <h1 className="mt-5 max-w-[760px] text-balance text-[clamp(3.25rem,6vw,6.15rem)] font-black leading-[0.9] tracking-[-0.055em] text-brand-blue">
              The future isn&apos;t found in books. It is <span className="text-brand-orange">created.</span>
            </h1>
            <p className="mt-6 max-w-[610px] text-[0.96rem] font-medium leading-7 text-brand-ink/75 sm:text-[1.05rem]">
              Hands-on Space, STEM, AI &amp; Robotics Labs and Science Parks that transform schools into environments where students discover, build and innovate.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <ButtonLink href="/solutions" size="lg" showArrow>
                Explore Our Solutions
              </ButtonLink>
              <Link
                href="#our-story"
                className="focus-ring inline-flex min-h-14 items-center justify-center gap-3 rounded-full border border-brand-line bg-white px-6 font-bold text-brand-blue transition hover:border-brand-blue/35 hover:bg-brand-sky sm:px-7"
              >
                <PlayCircle className="h-7 w-7 border-0 bg-brand-sky shadow-none [&_svg]:h-3 [&_svg]:w-3" />
                <span>Watch Our Story</span>
              </Link>
            </div>

            <div className="mt-9 grid max-w-2xl grid-cols-1 gap-4 border-t border-brand-line/80 pt-6 sm:grid-cols-3">
              {homePrinciples.map((item) => (
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

          <div className="relative min-h-[290px] w-full self-stretch sm:min-h-[340px] lg:min-h-[610px]">
            <div className="absolute inset-y-0 left-[-10%] -right-4 sm:-right-12 lg:-right-20 overflow-hidden rounded-bl-[3rem] sm:rounded-bl-[4rem] lg:left-[-20%] lg:rounded-bl-[5rem]">
              {pageAssetSlots.home.hero.endsWith(".mp4") ? (
                <video
                  src={pageAssetSlots.home.hero}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="h-full w-full object-cover object-center"
                />
              ) : (
                <Image
                  src={pageAssetSlots.home.hero}
                  alt="Student building a robotics project in an Ignited Brains innovation lab"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover object-center"
                />
              )}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,255,255,0.96) 16%, rgba(255,255,255,0.78) 30%, rgba(255,255,255,0.42) 44%, rgba(255,255,255,0.12) 58%, rgba(255,255,255,0) 78%)",
                }}
              />
            </div>
            <div className="absolute right-6 top-12 hidden max-w-40 rotate-[-4deg] text-right text-2xl font-semibold italic leading-tight text-white drop-shadow-md xl:block">
              Young Minds.<br />Bigger Tomorrows.
              <span className="ml-auto mt-3 block h-0.5 w-12 rotate-[-8deg] bg-brand-orange" />
            </div>
          </div>
        </Container>
      </section>

      <section className="relative bg-white py-14 sm:py-16 lg:py-20">
        <Container wide className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <Eyebrow>A Better Tomorrow Starts With A Question</Eyebrow>
            <h2 className="mt-5 max-w-2xl text-balance text-4xl font-black leading-[1.02] tracking-[-0.045em] text-brand-blue sm:text-5xl">
              Education should <span className="text-brand-orange">ignite curiosity.</span>
            </h2>
            <p className="mt-4 max-w-xl text-base font-medium leading-7 text-brand-muted">
              Every discovery starts with a simple question.
            </p>
            <ButtonLink href="/about" variant="outline" showArrow className="mt-6">
              Learn More About Us
            </ButtonLink>
          </div>

          <div className="grid items-center gap-6 sm:grid-cols-[1fr_0.8fr]">
            <div className="relative min-h-[170px] overflow-hidden rounded-3xl bg-brand-mist p-8 sm:min-h-[210px]">
              <span className="absolute left-6 top-4 text-[clamp(4rem,9vw,8rem)] font-black leading-none tracking-[-0.08em] text-brand-blue/[0.08]">
                WHY?
              </span>
              <p className="relative mt-16 text-center text-[clamp(2.8rem,6vw,5.8rem)] font-black leading-none tracking-[-0.06em] text-brand-blue">
                WHY <span className="text-brand-orange">NOT?</span>
              </p>
            </div>
            <div className="space-y-5">
              {impactWords.map((item) => (
                <div key={item.number} className="grid grid-cols-[3rem_1fr] gap-4">
                  <span className="text-4xl font-black leading-none text-brand-blue/10">{item.number}</span>
                  <div>
                    <h3 className="font-extrabold text-brand-blue">{item.title}</h3>
                    <p className="mt-1 text-sm font-medium text-brand-muted">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="soft-blue-surface border-y border-brand-line/70 py-14 sm:py-16 lg:py-20">
        <Container wide className="grid gap-10 lg:grid-cols-[0.65fr_1.35fr] lg:items-center">
          <div>
            <Eyebrow>From Classrooms To Real-world Impact</Eyebrow>
            <h2 className="mt-5 text-balance text-4xl font-black leading-[1.02] tracking-[-0.045em] text-brand-blue sm:text-5xl">
              More than theory.<br />A hands-on future.
            </h2>
            <p className="mt-5 max-w-lg text-base leading-7 text-brand-muted">
              We turn traditional classrooms into innovation spaces where students experiment, build and solve real-world problems.
            </p>
            <ButtonLink href="/schools" showArrow className="mt-6">
              Our Approach
            </ButtonLink>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
            {transformationSteps.map((step, index) => (
              <div key={`${step.label}-${index}`} className="group relative">
                <div className="overflow-hidden rounded-2xl border border-brand-line bg-white shadow-card">
                  <SiteImage
                    src={step.image}
                    alt=""
                    aspectRatio="4/3"
                    sizes="(max-width: 640px) 50vw, 16vw"
                    imageClassName="transition duration-300 group-hover:scale-[1.03]"
                  />
                  <div className="min-h-20 p-3.5">
                    <p className="text-xs font-extrabold leading-tight text-brand-blue">{step.label}</p>
                    <p className="mt-1 text-[0.68rem] font-medium text-brand-muted">{step.caption}</p>
                  </div>
                </div>
                {index < transformationSteps.length - 1 ? (
                  <span className="absolute -right-[11px] top-[42%] z-10 hidden h-7 w-7 -translate-y-1/2 place-items-center rounded-full border border-brand-line bg-white text-brand-orange shadow-sm sm:grid">
                    <ArrowIcon className="h-4 w-4" />
                  </span>
                ) : null}
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-14 sm:py-16 lg:py-20">
        <Container wide>
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <Eyebrow>Our Solutions</Eyebrow>
              <h2 className="mt-4 text-balance text-4xl font-black leading-none tracking-[-0.045em] text-brand-blue sm:text-5xl">
                Where curiosity becomes tangible.
              </h2>
            </div>
            <ButtonLink href="/solutions" variant="outline" size="sm" showArrow>
              View All Solutions
            </ButtonLink>
          </div>

          <div className="mt-9 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {homeSolutions.map((solution) => (
              <article key={solution.title} className="group overflow-hidden rounded-[1.2rem] border border-brand-line bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-card-hover">
                <div className="relative">
                  <SiteImage
                    src={solution.image}
                    alt={`${solution.title} learning environment`}
                    aspectRatio="16/10"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                    imageClassName="transition duration-500 group-hover:scale-[1.04]"
                  />
                  <span className="absolute -bottom-5 left-5 grid h-11 w-11 place-items-center rounded-full border-4 border-white bg-orange-50 text-brand-orange shadow-sm">
                    <HomeIcon name={solution.icon} className="h-5 w-5" />
                  </span>
                </div>
                <div className="px-5 pb-5 pt-8">
                  <h3 className="text-xl font-black tracking-[-0.025em] text-brand-blue">{solution.title}</h3>
                  <p className="mt-2 min-h-16 text-sm leading-6 text-brand-muted">{solution.description}</p>
                  <div className="mt-4">
                    <SmallArrowLink href={solution.href}>Explore</SmallArrowLink>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="soft-blue-surface border-y border-brand-line/70 py-14 sm:py-16 lg:py-20">
        <Container wide>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.15em] text-brand-blue/55">The Ignited Brains Learning System</p>
              <h2 className="mt-3 text-balance text-4xl font-black leading-none tracking-[-0.045em] text-brand-blue sm:text-5xl">
                From curiosity to creation.
              </h2>
            </div>
            <p className="max-w-md text-sm font-medium leading-6 text-brand-muted">
              A continuous cycle of learning, doing and improving.
            </p>
          </div>

          <div className="mt-10 grid gap-y-7 sm:grid-cols-2 lg:grid-cols-7 lg:gap-0">
            {learningCycle.map((item, index) => (
              <div key={item.step} className="relative px-2 text-center">
                <div className="relative mx-auto grid h-20 w-20 place-items-center rounded-full border border-brand-line bg-white text-brand-orange shadow-sm">
                  <HomeIcon name={item.icon} className="h-8 w-8" />
                </div>
                {index < learningCycle.length - 1 ? (
                  <div className="absolute left-[calc(50%+2.5rem)] right-[calc(-50%+2.5rem)] top-10 hidden items-center lg:flex">
                    <span className="h-px flex-1 bg-brand-line" />
                    <ArrowIcon className="h-4 w-4 text-brand-orange" />
                  </div>
                ) : null}
                <p className="mt-5 text-[0.66rem] font-black text-brand-orange">{item.step}</p>
                <h3 className="mt-1 text-sm font-black text-brand-blue">{item.title}</h3>
                <p className="mt-1 whitespace-pre-line text-xs font-medium leading-5 text-brand-muted">{item.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section id="our-story" className="dark-space-surface border-y border-white/10 py-12 sm:py-14 lg:py-16">
        <Container wide className="relative grid items-center gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:gap-14">
          <div>
            <Eyebrow className="text-brand-orange">See it. Feel it. Believe it.</Eyebrow>
            <h2 className="mt-5 max-w-xl text-balance text-4xl font-black leading-[1.02] tracking-[-0.045em] text-white sm:text-5xl">
              Don&apos;t just teach science. Let students experience it.
            </h2>
            <p className="mt-5 max-w-lg text-base leading-7 text-white/70">
              Watch how Ignited Brains is transforming schools through hands-on learning.
            </p>
            <ButtonLink href="/media" size="lg" showArrow className="mt-7">
              Play Our Story
            </ButtonLink>
          </div>

          <Link href="/media" className="group focus-ring relative overflow-hidden rounded-[1.3rem] border border-white/20 bg-white/5 shadow-[0_22px_70px_rgba(0,0,0,.26)]">
            <video
              src="/media/homeimg.mp4"
              poster={pageAssetSlots.home.storyVideo}
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
            />
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#041b3f]/35 via-transparent to-transparent" />
          </Link>
        </Container>
      </section>

      <section className="bg-white">
        <Container wide className="grid items-stretch lg:grid-cols-[0.95fr_1.05fr]">
          <div className="py-14 pr-0 sm:py-16 lg:pr-12 lg:py-20">
            <p className="text-xs font-extrabold uppercase tracking-[0.15em] text-brand-blue/55">Real Impact. Brighter Tomorrows.</p>
            <h2 className="mt-3 max-w-xl text-balance text-4xl font-black leading-none tracking-[-0.045em] text-brand-blue sm:text-5xl">
              Building future-ready learners.
            </h2>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {impactStats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-brand-line bg-white p-4 shadow-card">
                  <HomeIcon name={stat.icon} className="h-7 w-7 text-brand-orange" />
                  <p className="mt-3 text-3xl font-black tracking-[-0.04em] text-brand-blue">{stat.value}</p>
                  <p className="mt-1 text-xs font-semibold leading-5 text-brand-muted">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative min-h-[330px] overflow-hidden lg:min-h-full">
            <Image
              src={pageAssetSlots.home.impactStudent}
              alt="Student inspired by hands-on science learning"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white/40 via-transparent to-transparent lg:from-white/70" />
          </div>
        </Container>
      </section>

      <section className="soft-blue-surface border-y border-brand-line/70 py-14 sm:py-16 lg:py-20">
        <Container wide className="grid gap-9 lg:grid-cols-[0.76fr_1.24fr] lg:items-center">
          <div>
            <Eyebrow>Featured Project</Eyebrow>
            <h2 className="mt-4 text-4xl font-black leading-none tracking-[-0.045em] text-brand-blue sm:text-5xl">Autonomous Mars Rover</h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-brand-muted">
              A student-built autonomous rover that navigates rocky terrains, collects environmental data and transmits it back to Earth.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {["AI based obstacle avoidance", "Real-time data transmission", "Rugged terrain mobility", "Solar powered system"].map((item) => (
                <div key={item} className="flex items-center gap-2.5 text-sm font-semibold text-brand-blue">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-brand-orange text-[0.65rem] font-black text-white">✓</span>
                  {item}
                </div>
              ))}
            </div>
            <ButtonLink href="/projects" showArrow className="mt-7">
              View Project Details
            </ButtonLink>
          </div>

          <div>
            <SiteImage
              src={pageAssetSlots.home.marsRover}
              alt="Autonomous Mars rover prototype"
              aspectRatio="16/8.4"
              sizes="(max-width: 1024px) 100vw, 48vw"
              className="rounded-[1.25rem] border border-brand-line shadow-card"
            />
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-white py-14 sm:py-16 lg:py-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_54%_50%,rgba(255,108,39,.07),transparent_30rem)]" />
        <Container wide className="relative grid items-center gap-8 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.15em] text-brand-blue/55">For A Brighter India</p>
            <h2 className="mt-3 max-w-xl text-balance text-4xl font-black leading-none tracking-[-0.045em] text-brand-blue sm:text-5xl">
              Building future,<br />one curious mind at a time.
            </h2>
            <p className="mt-5 max-w-lg text-base leading-7 text-brand-muted">
              Our mission is to bring hands-on, future-ready learning spaces into every school and ignite curiosity, creativity and innovation in every student.
            </p>
            <ButtonLink href="/contact" showArrow className="mt-7">
              Be Part of the Journey
            </ButtonLink>
          </div>

          <div className="relative min-h-[300px] overflow-hidden rounded-[2rem] bg-brand-mist sm:min-h-[350px]">
            <Image
              src={pageAssetSlots.home.indiaImpact}
              alt="Ignited Brains vision for innovation across India"
              fill
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover"
              style={{ objectPosition: "center 30%" }}
            />
          </div>
        </Container>
      </section>

      <section className="dark-space-surface border-y border-white/10">
        <Container wide className="relative grid items-center gap-8 py-12 sm:py-14 lg:grid-cols-[1fr_auto] lg:py-16">
          <div className="absolute -bottom-36 -left-20 h-64 w-[45%] rounded-[50%] border-t border-blue-300/20 bg-[radial-gradient(ellipse_at_top,rgba(25,96,202,.65),rgba(4,27,63,.05)_60%)]" aria-hidden="true" />
          <div className="relative lg:pl-[28%]">
            <h2 className="text-balance text-3xl font-black tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl">
              Ready to transform your school?
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/70 sm:text-base">
              Let&apos;s create a space where students don&apos;t just learn about the future. They build it.
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
