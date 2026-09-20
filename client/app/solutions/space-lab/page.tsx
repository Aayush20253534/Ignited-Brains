import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { HomeIcon } from "@/components/home/home-icon";
import { SiteImage } from "@/components/media";
import { ArrowIcon, ButtonLink, Container, Eyebrow } from "@/components/ui";
import {
  spaceComponents,
  spaceExperience,
  spaceLearningCycle,
  spaceProjects,
  spaceSkills,
} from "@/data/space-lab";
import { pageAssetSlots } from "@/lib/assets";

export const metadata: Metadata = {
  title: "Space Lab",
  description:
    "Explore the Ignited Brains Space Lab, a hands-on environment for astronomy, observation, model building and future-ready space learning.",
  alternates: { canonical: "/solutions/space-lab" },
};

function PlayButton({ small = false }: { small?: boolean }) {
  return (
    <span
      className={small
        ? "grid h-11 w-11 place-items-center rounded-full bg-white text-brand-blue shadow-lg"
        : "grid h-16 w-16 place-items-center rounded-full bg-white/95 text-brand-blue shadow-[0_12px_35px_rgba(0,0,0,.25)]"}
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24" className={small ? "h-5 w-5" : "h-7 w-7"} fill="currentColor">
        <path d="M9 7.4v9.2L17 12 9 7.4Z" />
      </svg>
    </span>
  );
}

export default function SpaceLabPage() {
  return (
    <main className="overflow-hidden bg-white">
      <section className="relative border-b border-brand-line/70 bg-white">
        <Container wide className="grid min-h-[560px] items-center gap-8 py-9 lg:grid-cols-[0.75fr_1.25fr] lg:py-0">
          <div className="relative z-10 py-5 lg:py-12">
            <p className="mb-6 text-xs font-bold text-brand-muted">
              <Link href="/" className="hover:text-brand-blue">Home</Link>
              <span className="px-2">›</span>
              <Link href="/solutions" className="hover:text-brand-blue">Solutions</Link>
              <span className="px-2">›</span>
              <span>Space Lab</span>
            </p>
            <Eyebrow>Space Lab</Eyebrow>
            <h1 className="mt-5 max-w-[620px] text-balance text-[clamp(3.15rem,5.2vw,5.45rem)] font-black leading-[0.94] tracking-[-0.055em] text-brand-blue">
              Space science students can <span className="text-brand-orange">touch.</span>
            </h1>
            <p className="mt-5 max-w-xl text-base font-medium leading-7 text-brand-ink/75">
              A hands-on environment where students explore space science through models, observation and experimentation.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <ButtonLink href="/contact" size="lg" showArrow>Discuss This Solution</ButtonLink>
              <ButtonLink href="/projects" size="lg" variant="outline" showArrow>View Projects</ButtonLink>
            </div>
            <div className="mt-8 grid grid-cols-1 gap-3 border-t border-brand-line/80 pt-6 sm:grid-cols-3">
              {[
                ["Real Space Learning", "Not just theory", "space"],
                ["Hands-on Models", "Explore and experiment", "build"],
                ["Future-ready Skills", "For tomorrow's innovators", "innovation"],
              ].map(([title, caption, icon]) => (
                <div key={title} className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-orange-50 text-brand-orange">
                    <HomeIcon name={icon as Parameters<typeof HomeIcon>[0]["name"]} className="h-6 w-6" />
                  </span>
                  <div>
                    <p className="text-xs font-extrabold text-brand-blue">{title}</p>
                    <p className="mt-0.5 text-[0.66rem] font-semibold text-brand-muted">{caption}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative min-h-[390px] self-stretch lg:min-h-[560px]">
            <div className="absolute inset-y-0 left-[-8%] -right-5 overflow-hidden rounded-bl-[5rem] sm:-right-14 lg:left-[-15%] lg:-right-20">
              <Image
                src={pageAssetSlots.spaceLab.hero}
                alt="Student using a telescope in an immersive Space Lab"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 62vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white via-white/5 to-transparent lg:from-white/55 lg:via-transparent" />
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-white py-12 sm:py-14 lg:py-16">
        <Container wide>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <Eyebrow>What Students Experience</Eyebrow>
              <h2 className="mt-3 text-4xl font-black tracking-[-0.045em] text-brand-blue sm:text-5xl">Learning becomes real.</h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-brand-muted lg:text-right">
              Students don&apos;t just read about space. They explore it, observe it, experiment with it and build it. The Space Lab brings the wonders of the universe into their hands.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
            {spaceExperience.map((item, index) => (
              <article key={item.title} className="card-lift rounded-2xl border border-brand-line bg-white p-5 shadow-card">
                <span className={index === 3 ? "grid h-11 w-11 place-items-center rounded-full bg-orange-50 text-brand-orange" : "grid h-11 w-11 place-items-center rounded-full bg-brand-sky text-brand-blue"}>
                  <HomeIcon name={item.icon} className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-base font-black text-brand-blue">{item.title}</h3>
                <p className="mt-2 text-xs leading-5 text-brand-muted">{item.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="soft-blue-surface border-y border-brand-line/70 py-12 sm:py-14 lg:py-16">
        <Container wide>
          <div className="flex items-end justify-between gap-4">
            <div>
              <Eyebrow>Inside the Space Lab</Eyebrow>
              <h2 className="mt-3 text-4xl font-black tracking-[-0.045em] text-brand-blue sm:text-5xl">A closer look at the experience.</h2>
            </div>
            <div className="hidden gap-2 sm:flex" aria-hidden="true">
              <span className="grid h-11 w-11 place-items-center rounded-full border border-brand-line bg-white text-brand-blue">←</span>
              <span className="grid h-11 w-11 place-items-center rounded-full border border-brand-line bg-white text-brand-blue">→</span>
            </div>
          </div>

          <div className="mt-8 grid gap-3 lg:grid-cols-[1.12fr_0.88fr]">
            <figure className="overflow-hidden rounded-2xl border border-brand-line bg-white shadow-card">
              <SiteImage
                src={pageAssetSlots.spaceLab.galleryMain}
                alt="Interactive Space Lab with rockets, rover and planetary models"
                aspectRatio="16/10"
                sizes="(max-width: 1024px) 100vw, 56vw"
                className="rounded-none"
              />
              <figcaption className="px-4 py-3 text-xs font-semibold text-brand-blue">Interactive space lab with rocket, rover and planetary models</figcaption>
            </figure>

            <div className="grid grid-cols-2 gap-3">
              {[
                [pageAssetSlots.spaceLab.telescope, "Telescope observation setup"],
                [pageAssetSlots.spaceLab.satellite, "Satellite and spacecraft models"],
                [pageAssetSlots.spaceLab.lunar, "Lunar surface simulation"],
                [pageAssetSlots.spaceLab.planetary, "Planetary exploration models"],
              ].map(([src, caption]) => (
                <figure key={caption} className="overflow-hidden rounded-2xl border border-brand-line bg-white shadow-card">
                  <SiteImage src={src} alt={caption} aspectRatio="4/3" sizes="(max-width: 1024px) 50vw, 22vw" className="rounded-none" />
                  <figcaption className="px-3 py-2 text-[0.7rem] font-semibold leading-4 text-brand-blue">{caption}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="dark-space-surface border-y border-white/10 py-12 sm:py-14 lg:py-16">
        <Container wide className="relative grid gap-8 lg:grid-cols-[1fr_0.45fr] lg:items-end">
          <div>
            <Eyebrow>What Students Learn</Eyebrow>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.045em] text-white sm:text-5xl">Skills for a bigger tomorrow.</h2>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {spaceSkills.map((skill) => (
                <article key={skill.title} className="rounded-2xl border border-white/20 bg-white/[0.04] p-5 backdrop-bl-sm">
                  <HomeIcon name={skill.icon} className="h-8 w-8 text-brand-orange" />
                  <h3 className="mt-5 text-base font-black text-white">{skill.title}</h3>
                  <p className="mt-2 text-xs leading-5 text-white/65">{skill.description}</p>
                </article>
              ))}
            </div>
          </div>
          <div className="relative mx-auto aspect-[1.18/1] w-full max-w-sm overflow-hidden rounded-t-[8rem] border border-white/10 bg-white/5">
            <Image src={pageAssetSlots.spaceLab.astronaut} alt="Astronaut illustration representing curiosity and exploration" fill sizes="360px" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#041b3f] via-transparent to-transparent" />
          </div>
        </Container>
      </section>

      <section className="bg-white py-12 sm:py-14 lg:py-16">
        <Container wide>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <Eyebrow>Learning Through Action</Eyebrow>
              <h2 className="mt-3 text-4xl font-black tracking-[-0.045em] text-brand-blue sm:text-5xl">The innovation journey.</h2>
            </div>
            <p className="text-sm font-semibold text-brand-muted">A continuous cycle of learning, doing and improving.</p>
          </div>
          <div className="mt-9 grid grid-cols-2 gap-5 sm:grid-cols-4 lg:grid-cols-7">
            {spaceLearningCycle.map((item, index) => (
              <div key={item.title} className="relative text-center">
                <span className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-brand-line bg-white text-brand-orange shadow-card">
                  <HomeIcon name={item.icon} className="h-7 w-7" />
                </span>
                {index < spaceLearningCycle.length - 1 ? (
                  <span className="absolute left-[calc(50%+2rem)] right-[calc(-50%+2rem)] top-8 hidden h-px bg-brand-line lg:block" aria-hidden="true" />
                ) : null}
                <p className="mt-3 text-[0.62rem] font-black text-brand-orange">{item.step}</p>
                <h3 className="text-sm font-black text-brand-blue">{item.title}</h3>
                <p className="mt-1 text-xs leading-5 text-brand-muted">{item.caption}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="soft-blue-surface border-y border-brand-line/70 py-12 sm:py-14 lg:py-16">
        <Container wide>
          <Eyebrow>Key Components</Eyebrow>
          <h2 className="mt-3 text-4xl font-black tracking-[-0.045em] text-brand-blue sm:text-5xl">World-class learning infrastructure.</h2>
          <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
            {spaceComponents.map((item) => (
              <article key={item.title} className="card-lift overflow-hidden rounded-2xl border border-brand-line bg-white shadow-card">
                <SiteImage src={item.image} alt={item.title} aspectRatio="4/3" sizes="(max-width: 768px) 50vw, 17vw" className="rounded-none" />
                <div className="p-4">
                  <HomeIcon name={item.icon} className="h-6 w-6 text-brand-orange" />
                  <h3 className="mt-3 text-sm font-black leading-5 text-brand-blue">{item.title}</h3>
                  <p className="mt-1 text-[0.68rem] leading-4 text-brand-muted">{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="dark-space-surface py-12 sm:py-14 lg:py-16">
        <Container wide className="grid items-center gap-8 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <Eyebrow>See It in Action</Eyebrow>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.045em] text-white sm:text-5xl">Experience the excitement.</h2>
            <p className="mt-4 max-w-md text-base leading-7 text-white/65">Watch how students explore, experiment and bring space science to life at Ignited Brains.</p>
            <ButtonLink href="/media" size="lg" showArrow className="mt-7">Play Video</ButtonLink>
          </div>
          <Link href="/media" className="group focus-ring relative overflow-hidden rounded-2xl border border-white/20 bg-white/5 shadow-[0_22px_70px_rgba(0,0,0,.25)]">
            <SiteImage
              src={pageAssetSlots.spaceLab.video}
              alt="Space exploration learning video preview"
              aspectRatio="16/6.2"
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="rounded-none"
              imageClassName="transition duration-500 group-hover:scale-[1.025]"
              overlayClassName="bg-gradient-to-r from-[#031632]/20 via-transparent to-[#031632]/15"
            />
            <span className="absolute inset-0 grid place-items-center"><PlayButton /></span>
          </Link>
        </Container>
      </section>

      <section className="bg-white py-12 sm:py-14 lg:py-16">
        <Container wide>
          <div className="flex items-end justify-between gap-4">
            <div>
              <Eyebrow>Student Projects</Eyebrow>
              <h2 className="mt-3 text-4xl font-black tracking-[-0.045em] text-brand-blue sm:text-5xl">Young minds. Real ideas.</h2>
            </div>
            <div className="hidden gap-2 sm:flex" aria-hidden="true">
              <span className="grid h-11 w-11 place-items-center rounded-full border border-brand-line text-brand-blue">←</span>
              <span className="grid h-11 w-11 place-items-center rounded-full border border-brand-line text-brand-blue">→</span>
            </div>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {spaceProjects.map((project) => (
              <article key={project.title} className="card-lift overflow-hidden rounded-2xl border border-brand-line bg-white shadow-card">
                <SiteImage src={project.image} alt={project.title} aspectRatio="16/8" sizes="(max-width: 768px) 100vw, 33vw" className="rounded-none" />
                <div className="flex items-end justify-between gap-4 p-5">
                  <div>
                    <h3 className="text-lg font-black text-brand-blue">{project.title}</h3>
                    <p className="mt-2 text-xs leading-5 text-brand-muted">{project.description}</p>
                  </div>
                  <Link href="/projects" className="focus-ring grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-orange text-white"><ArrowIcon className="h-4 w-4" /></Link>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-[#052650] py-10 sm:py-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_120%,rgba(35,112,255,.5),transparent_26rem)]" />
        <Container wide className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-balance text-3xl font-black tracking-[-0.04em] text-white sm:text-4xl">Bring the wonders of space to your school.</h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-white/65">Let&apos;s create a Space Lab that inspires the next generation of explorers, innovators and problem solvers.</p>
          </div>
          <ButtonLink href="/contact" size="lg" showArrow>Start a Conversation</ButtonLink>
        </Container>
      </section>
    </main>
  );
}
