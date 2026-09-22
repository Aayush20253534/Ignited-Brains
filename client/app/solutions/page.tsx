import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { HomeIcon } from "@/components/home/home-icon";
import { SiteImage } from "@/components/media";
import { ArrowIcon, ButtonLink, Container, Eyebrow } from "@/components/ui";
import {
  solutionHeroPrinciples,
  solutionLearningCycle,
  solutionShowcase,
  solutionTabs,
} from "@/data/solutions";
import { pageAssetSlots } from "@/lib/assets";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Explore Ignited Brains Space Labs, STEM Labs, AI & Robotics Labs and Science Parks designed for hands-on, future-ready learning.",
  alternates: { canonical: "/solutions" },
};

function Bullet({ children }: { children: string }) {
  return (
    <li className="flex items-start gap-2.5 text-sm font-semibold leading-6 text-brand-ink/75">
      <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full border border-brand-orange/30 bg-orange-50 text-[0.66rem] font-black text-brand-orange">
        ✓
      </span>
      <span>{children}</span>
    </li>
  );
}

export default function SolutionsPage() {
  return (
    <main className="overflow-hidden bg-white">
      <section className="relative border-b border-brand-line/70 bg-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_32%,rgba(38,123,255,.15),transparent_31rem)]" />
        <Container wide className="relative grid min-h-[560px] items-center gap-8 py-10 lg:grid-cols-[0.78fr_1.22fr] lg:py-0">
          <div className="relative z-10 py-6 lg:py-12">
            <Eyebrow>Our Solutions</Eyebrow>
            <h1 className="mt-5 max-w-[650px] text-balance text-[clamp(3.1rem,5.4vw,5.5rem)] font-black leading-[0.94] tracking-[-0.055em] text-brand-blue">
              From classrooms to <span className="text-brand-orange">innovation spaces.</span>
            </h1>
            <p className="mt-6 max-w-[590px] text-[1rem] font-medium leading-7 text-brand-ink/75">
              We design and build hands-on learning environments that make science tangible, technology accessible and innovation part of everyday school life.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <ButtonLink href="#solutions" size="lg" showArrow>
                Explore Our Solutions
              </ButtonLink>
              <ButtonLink href="/media" size="lg" variant="outline" showArrow>
                Watch Video
              </ButtonLink>
            </div>

            <div className="mt-9 grid max-w-3xl grid-cols-2 gap-x-5 gap-y-4 border-t border-brand-line/80 pt-6 sm:grid-cols-4">
              {solutionHeroPrinciples.map((item) => (
                <div key={item.title} className="flex items-center gap-2.5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-orange-50 text-brand-orange">
                    <HomeIcon name={item.icon} className="h-6 w-6" />
                  </span>
                  <div>
                    <p className="text-[0.72rem] font-extrabold leading-4 text-brand-blue">{item.title}</p>
                    <p className="mt-0.5 hidden text-[0.62rem] leading-4 text-brand-muted xl:block">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative min-h-[390px] self-stretch lg:min-h-[560px]">
            <div className="absolute inset-y-0 left-[-7%] -right-4 overflow-hidden rounded-bl-[5rem] sm:-right-14 lg:left-[-13%] lg:-right-20">
              <Image
                src={pageAssetSlots.solutions.hero}
                alt="Student building a robotics project inside a future-ready learning environment"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white via-white/5 to-transparent lg:from-white/55 lg:via-transparent" />
            </div>
          </div>
        </Container>
      </section>

      <section id="solutions" className="scroll-mt-24 bg-white py-8 sm:py-10 lg:py-12">
        <Container wide className="space-y-5">
          {solutionShowcase.map((solution) => (
            <article
              key={solution.kicker}
              id={solution.slug}
              className="scroll-mt-28 relative overflow-hidden rounded-[1.7rem] border border-brand-line bg-white shadow-[0_16px_48px_rgba(21,57,112,.08)]"
            >
              <div className="grid min-h-[360px] lg:grid-cols-2">
                <div className={solution.imageFirst ? "relative min-h-[300px] lg:order-1" : "relative min-h-[300px] lg:order-2"}>
                  <Image
                    src={solution.image}
                    alt={solution.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className={solution.imageFirst ? "absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white/20" : "absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-white/20"} />
                  <span className="pointer-events-none absolute bottom-3 right-5 text-[6rem] font-black leading-none text-white/20 lg:text-[8rem]">
                    {solution.index}
                  </span>
                </div>

                <div className={solution.imageFirst ? "relative flex flex-col justify-center p-7 sm:p-9 lg:order-2 lg:p-12" : "relative flex flex-col justify-center p-7 sm:p-9 lg:order-1 lg:p-12"}>
                  <span className="absolute left-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-brand-blue text-sm font-black text-white sm:left-6 sm:top-6">
                    {solution.index}
                  </span>
                  <div className="pl-0 pt-9 sm:pl-2">
                    <p className="text-xs font-black uppercase tracking-[0.15em] text-brand-blue/55">{solution.kicker}</p>
                    <h2 className="mt-2 max-w-xl text-balance text-3xl font-black leading-[1.02] tracking-[-0.04em] text-brand-blue sm:text-4xl lg:text-[2.65rem]">
                      {solution.title}
                    </h2>
                    <p className="mt-4 max-w-xl text-sm leading-6 text-brand-muted sm:text-base sm:leading-7">
                      {solution.description}
                    </p>
                    <ul className="mt-5 grid gap-x-6 gap-y-2 sm:grid-cols-2">
                      {solution.bullets.map((item) => <Bullet key={item}>{item}</Bullet>)}
                    </ul>
                    <ButtonLink href={solution.href} showArrow className="mt-6">
                      {solution.action}
                    </ButtonLink>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </Container>
      </section>

      <section className="soft-blue-surface border-y border-brand-line/70 py-14 sm:py-16 lg:py-20">
        <Container wide className="grid items-center gap-10 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.15em] text-brand-blue/55">The Ignited Brains Learning System</p>
            <h2 className="mt-4 max-w-lg text-balance text-4xl font-black leading-[1.02] tracking-[-0.045em] text-brand-blue sm:text-5xl">
              Built around how students actually learn.
            </h2>
            <p className="mt-4 max-w-lg text-base leading-7 text-brand-muted">
              A continuous cycle of curiosity, exploration, creation and improvement.
            </p>
            <ButtonLink href="/about" showArrow className="mt-7">
              Learn More
            </ButtonLink>
          </div>

          <div className="relative mx-auto w-full max-w-3xl py-3">
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[330px] w-[330px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-orange/25 sm:h-[390px] sm:w-[390px]" />
            <div className="relative grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
              {solutionLearningCycle.map((item) => (
                <div key={item.title} className="flex flex-col items-center text-center">
                  <span className="grid h-16 w-16 place-items-center rounded-full border border-brand-line bg-white text-brand-blue shadow-card">
                    <HomeIcon name={item.icon} className="h-7 w-7" />
                  </span>
                  <p className="mt-2 text-[0.62rem] font-black text-brand-orange">{item.step}</p>
                  <p className="text-sm font-black text-brand-blue">{item.title}</p>
                </div>
              ))}
            </div>
            <div className="mx-auto mt-8 grid h-32 w-32 place-items-center rounded-full border border-brand-orange/30 bg-white text-center shadow-card sm:h-40 sm:w-40">
              <p className="text-sm font-black uppercase leading-5 tracking-[0.08em] text-brand-blue">
                Create<br />a brighter<br />tomorrow
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-white py-14 sm:py-16 lg:py-20">
        <Container wide>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.15em] text-brand-blue/55">Find the right solution</p>
              <h2 className="mt-3 text-balance text-3xl font-black tracking-[-0.04em] text-brand-blue sm:text-4xl">Choose a solution to explore</h2>
              <p className="mt-2 text-sm text-brand-muted">Each learning space is designed to spark curiosity and build future-ready skills.</p>
            </div>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_0.9fr] lg:items-stretch">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {solutionTabs.map((item, index) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={index === 0
                    ? "focus-ring flex min-h-32 flex-col items-center justify-center rounded-2xl border border-brand-line bg-white p-4 text-center text-brand-blue shadow-card transition hover:-translate-y-1 hover:border-brand-blue/30"
                    : "focus-ring flex min-h-32 flex-col items-center justify-center rounded-2xl border border-brand-line bg-white p-4 text-center text-brand-blue shadow-card transition hover:-translate-y-1 hover:border-brand-blue/30"}
                >
                  <HomeIcon name={item.icon} className="h-8 w-8" />
                  <span className="mt-3 text-sm font-black">{item.label}</span>
                </Link>
              ))}
            </div>

            <article className="grid overflow-hidden rounded-2xl border border-brand-line bg-white shadow-card sm:grid-cols-[0.82fr_1.18fr]">
              <SiteImage
                src={pageAssetSlots.spaceLab.astronaut}
                alt="Student imagining future possibilities through science"
                aspectRatio="1/1"
                sizes="(max-width: 640px) 100vw, 24vw"
                className="min-h-48 rounded-none"
                imageClassName="object-cover"
              />
              <div className="flex flex-col justify-center p-6">
                <h3 className="text-2xl font-black tracking-[-0.035em] text-brand-blue">Space Lab</h3>
                <p className="mt-2 text-sm leading-6 text-brand-muted">Inspiring the next generation of space explorers through hands-on learning.</p>
                <ul className="mt-4 grid grid-cols-2 gap-2 text-xs font-bold text-brand-blue/75">
                  <li>✦ Models</li><li>✦ Experiments</li><li>✦ Observation</li><li>✦ Exploration</li>
                </ul>
                <ButtonLink href="/solutions/space-lab" showArrow className="mt-5 self-start">Explore Space Lab</ButtonLink>
              </div>
            </article>
          </div>
        </Container>
      </section>

      <section className="dark-space-surface border-y border-white/10 py-10 sm:py-12">
        <Container wide className="grid items-center gap-7 lg:grid-cols-[1fr_1.15fr]">
          <div className="grid items-center gap-5 sm:grid-cols-[180px_1fr]">
            <div className="relative aspect-square overflow-hidden rounded-full border border-white/15 bg-white/5">
              <Image src={pageAssetSlots.spaceLab.astronaut} alt="Student inspired by space exploration" fill sizes="180px" className="object-cover" />
            </div>
            <blockquote>
              <p className="text-balance text-2xl font-bold leading-tight text-white sm:text-3xl">“Ignited Brains turns curiosity into real opportunities.”</p>
              <footer className="mt-4 text-sm font-semibold text-white/65">— School Principal</footer>
            </blockquote>
          </div>
          <div className="border-t border-white/15 pt-7 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
            <p className="text-3xl font-black tracking-[-0.04em] text-white">Curious Minds.<br />Brighter Tomorrows.</p>
            <p className="mt-3 max-w-md text-sm leading-6 text-white/65">Join schools across India creating meaningful, hands-on learning experiences.</p>
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-[#041b3f] py-12 sm:py-14 lg:py-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_55%_120%,rgba(40,118,255,.5),transparent_35rem)]" />
        <Container wide className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-balance text-3xl font-black tracking-[-0.04em] text-white sm:text-4xl">Let&apos;s build innovation in your school.</h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-white/65">Discover how Ignited Brains can create a future-ready learning environment for your students.</p>
          </div>
          <ButtonLink href="/schools" size="lg" showArrow>Discuss Your School</ButtonLink>
        </Container>
      </section>
    </main>
  );
}
