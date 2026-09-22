import type { Metadata } from "next";
import Image from "next/image";

import { HomeIcon } from "@/components/home/home-icon";
import { SiteImage } from "@/components/media";
import { ProjectBrowser } from "@/components/projects/project-browser";
import { ArrowIcon, ButtonLink, Container, Eyebrow } from "@/components/ui";
import {
  featuredProjectBullets,
  projectGallery,
  projectImpact,
  projectImpactBenefits,
  projectTestimonials,
} from "@/data/projects";
import { pageAssetSlots } from "@/lib/assets";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore Ignited Brains school projects, student builds, space labs, robotics experiences and science parks across India.",
  alternates: { canonical: "/projects" },
};

function PlayButton({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-sm font-extrabold text-white">
      <span className="grid h-10 w-10 place-items-center rounded-full bg-white text-brand-blue shadow-lg" aria-hidden="true">
        <svg viewBox="0 0 24 24" className="h-4 w-4 translate-x-[1px]" fill="currentColor">
          <path d="m8.5 6.5 9 5.5-9 5.5v-11Z" />
        </svg>
      </span>
      {label}
    </span>
  );
}

export default function ProjectsPage() {
  return (
    <main className="overflow-hidden bg-white">
      <section className="relative border-b border-brand-line/70 bg-white">
        <Container wide className="grid min-h-[560px] items-center gap-8 py-10 lg:grid-cols-[0.78fr_1.22fr] lg:py-0">
          <div className="relative z-10 py-4 lg:py-12">
            <p className="text-xs font-black uppercase tracking-[0.14em] text-brand-blue/55">Our Impact &amp; Projects</p>
            <h1 className="mt-5 max-w-[650px] text-balance text-[clamp(3.2rem,5.7vw,5.8rem)] font-black leading-[0.92] tracking-[-0.055em] text-brand-blue">
              See curiosity <span className="text-brand-orange">in action.</span>
            </h1>
            <p className="mt-5 max-w-[600px] text-base font-medium leading-7 text-brand-ink/75">
              Explore the schools, learning spaces and student experiences shaped through hands-on innovation. From space models to real-world prototypes, these are stories of curiosity turning into impact.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <ButtonLink href="/solutions" size="lg" showArrow>Explore Our Solutions</ButtonLink>
              <ButtonLink href="#featured-project" size="lg" variant="outline">Watch Video</ButtonLink>
            </div>
            <p className="mt-8 text-xs font-bold text-brand-muted">
              <span className="text-brand-orange">—</span> Real Schools <span className="px-2 text-brand-orange">+</span> Real Experiences <span className="px-2 text-brand-orange">+</span> Real Possibilities
            </p>
          </div>

          <div className="relative min-h-[400px] self-stretch lg:min-h-[560px]">
            <div className="absolute inset-y-0 left-[-6%] -right-4 overflow-hidden rounded-bl-[5rem] sm:-right-14 lg:left-[-12%] lg:-right-20">
              <Image
                src={pageAssetSlots.projects.hero}
                alt="Students collaborating on a robotics rover project"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 62vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white via-white/5 to-transparent lg:from-white/55 lg:via-transparent" />
            </div>
          </div>
        </Container>

        <Container wide className="relative z-10 grid grid-cols-2 gap-4 border-t border-brand-line/80 bg-white py-5 lg:grid-cols-4 lg:gap-6 lg:py-6">
          {projectImpact.map((item) => (
            <div key={item.label} className="flex items-center gap-4 lg:justify-center">
              <HomeIcon name={item.icon} className="h-9 w-9 shrink-0 text-brand-orange" />
              <div>
                <p className="text-3xl font-black tracking-[-0.04em] text-brand-blue sm:text-4xl">{item.value}</p>
                <p className="text-xs font-extrabold text-brand-blue sm:text-sm">{item.label}</p>
              </div>
            </div>
          ))}
        </Container>
      </section>

      <section className="bg-white py-12 sm:py-14 lg:py-16">
        <Container wide>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <Eyebrow>Explore Our Projects</Eyebrow>
              <h2 className="mt-3 text-4xl font-black tracking-[-0.045em] text-brand-blue sm:text-5xl">Real stories. Real impact.</h2>
            </div>
            <p className="max-w-lg text-sm leading-6 text-brand-muted lg:text-right">Every project is a step towards a more curious, creative and innovative generation.</p>
          </div>
          <div className="mt-7">
            <ProjectBrowser />
          </div>
        </Container>
      </section>

      <section id="featured-project" className="soft-blue-surface border-y border-brand-line/70 py-12 sm:py-14 lg:py-16">
        <Container wide className="grid items-center gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14">
          <div className="relative overflow-hidden rounded-3xl shadow-card">
            <SiteImage
              src={pageAssetSlots.projects.featured}
              alt="Mars rover prototype in a simulated planetary landscape"
              aspectRatio="16/10"
              sizes="(max-width: 1024px) 100vw, 52vw"
              className="rounded-3xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/55 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5"><PlayButton label="Watch Video" /></div>
          </div>

          <div className="relative">
            <p className="text-xs font-extrabold uppercase tracking-[0.15em] text-brand-orange">Featured Project</p>
            <h2 className="mt-3 text-4xl font-black tracking-[-0.045em] text-brand-blue sm:text-5xl">Mars Rover Prototype</h2>
            <p className="mt-1 text-sm font-extrabold text-brand-blue">AI &amp; Robotics Lab <span className="px-2 text-brand-orange">|</span> NIT Mentorship Program</p>
            <p className="mt-5 max-w-xl text-base leading-7 text-brand-muted">A student-built Mars rover designed to navigate rocky terrain, collect environmental data and transmit it back to a base station.</p>
            <ul className="mt-6 space-y-4">
              {featuredProjectBullets.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm font-semibold text-brand-blue">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-orange-50 text-brand-orange"><HomeIcon name="innovation" className="h-4 w-4" /></span>
                  {item}
                </li>
              ))}
            </ul>
            <ButtonLink href="/contact" className="mt-7" showArrow>View Full Project</ButtonLink>
            <span className="pointer-events-none absolute -right-2 -top-10 text-[7rem] font-black leading-none text-brand-blue/[0.045] sm:text-[10rem]">01</span>
          </div>
        </Container>
      </section>

      <section className="bg-white py-12 sm:py-14 lg:py-16">
        <Container wide>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <Eyebrow>Student Voices</Eyebrow>
              <h2 className="mt-3 text-4xl font-black tracking-[-0.045em] text-brand-blue sm:text-5xl">From curiosity to confidence.</h2>
            </div>
            <p className="text-sm text-brand-muted">Real experiences from students, teachers and school leaders.</p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {projectTestimonials.map((testimonial) => (
              <article key={testimonial.name} className="rounded-2xl border border-brand-line bg-white p-6 shadow-card">
                <div className="flex gap-5">
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border-4 border-brand-mist">
                    <Image src={testimonial.image} alt={testimonial.name} fill sizes="80px" className="object-cover" />
                  </div>
                  <div>
                    <p className="text-sm font-medium leading-6 text-brand-ink/80"><span className="mr-1 text-xl font-black text-brand-orange">“</span>{testimonial.quote}</p>
                    <p className="mt-4 text-sm font-black text-brand-blue">{testimonial.name}</p>
                    <p className="text-xs text-brand-muted">{testimonial.role}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="soft-blue-surface border-y border-brand-line/70 py-12 sm:py-14 lg:py-16">
        <Container wide>
          <div className="flex items-end justify-between gap-4">
            <div>
              <Eyebrow>Glimpses From Our Projects</Eyebrow>
            </div>
            <a href="#project-impact" className="focus-ring inline-flex items-center gap-2 text-sm font-extrabold text-brand-orange">View Gallery <ArrowIcon className="h-4 w-4" /></a>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {projectGallery.map((item) => (
              <article key={item.label} className="overflow-hidden rounded-2xl border border-brand-line bg-white shadow-card">
                <SiteImage src={item.image} alt={item.label} aspectRatio="16/9" className="rounded-none" sizes="(max-width: 768px) 50vw, 25vw" />
                <p className="px-4 py-3 text-xs font-extrabold text-brand-blue">{item.label}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section id="project-impact" className="relative bg-white py-12 sm:py-14 lg:py-16">
        <Container wide className="grid items-center gap-8 lg:grid-cols-[0.78fr_1fr_0.72fr] lg:gap-12">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.15em] text-brand-blue/55">Our Growing Impact</p>
            <h2 className="mt-3 text-balance text-4xl font-black tracking-[-0.045em] text-brand-blue sm:text-5xl">More curious minds. A brighter India.</h2>
            <p className="mt-4 max-w-md text-sm leading-6 text-brand-muted">We are working with schools across India to make hands-on learning accessible to every student.</p>
            <ButtonLink href="/contact" className="mt-6" showArrow>Partner With Us</ButtonLink>
          </div>

          <div className="relative mx-auto w-full max-w-[520px]">
            <Image src={pageAssetSlots.home.indiaImpact} alt="Ignited Brains impact network across India" width={640} height={436} className="h-auto w-full object-contain" />
          </div>

          <ul className="space-y-4">
            {projectImpactBenefits.map((item) => (
              <li key={item.label} className="flex items-center gap-3 text-sm font-extrabold text-brand-blue">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-orange-50 text-brand-orange"><HomeIcon name={item.icon} className="h-5 w-5" /></span>
                {item.label}
              </li>
            ))}
            <li className="pt-4 text-2xl font-semibold italic leading-tight text-brand-blue">Together for a brighter tomorrow. <span className="ml-2 text-base">🇮🇳</span></li>
          </ul>
        </Container>
      </section>

      <section className="dark-space-surface border-y border-white/10">
        <div className="absolute inset-0 opacity-45" aria-hidden="true">
          <Image src={pageAssetSlots.about.ctaEarth} alt="" fill sizes="100vw" className="object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#031632] via-[#031632]/80 to-[#031632]/25" />
        </div>
        <Container wide className="relative flex flex-col gap-8 py-12 sm:py-14 lg:flex-row lg:items-center lg:justify-between lg:py-16">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-white/60">Be a Part of the Change</p>
            <h2 className="mt-3 max-w-2xl text-balance text-4xl font-black tracking-[-0.045em] text-white sm:text-5xl">Let’s create more stories of innovation.</h2>
            <p className="mt-4 max-w-xl text-sm leading-6 text-white/70">Partner with Ignited Brains and bring hands-on learning to more schools across India.</p>
          </div>
          <ButtonLink href="/contact" size="lg" showArrow className="self-start lg:self-auto">Partner With Us</ButtonLink>
        </Container>
      </section>
    </main>
  );
}
