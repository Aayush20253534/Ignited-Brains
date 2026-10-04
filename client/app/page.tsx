import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { DesktopHomeMotion } from "@/components/home/desktop-home-motion";
import { PhoneHomeMotion } from "@/components/home/phone-home-motion";
import { HomeQuestionScene } from "@/components/home/home-question-scene";
import { LearningSystem } from "@/components/home/learning-system";
import { HomeStorySection } from "@/components/home/home-story-section";
import { HomeIcon } from "@/components/home/home-icon";
import { ImpactCount } from "@/components/home/impact-count";
import { ContinuousRow } from "@/components/home/continuous-row";
import { AnimatedEarth } from "@/components/layout/animated-earth";
import { SiteImage } from "@/components/media";
import { ArrowIcon, ButtonLink, Container, Eyebrow } from "@/components/ui";
import {
  homePrinciples,
  homeSolutions,
  impactStats,
  impactWords,
  transformationSteps,
} from "@/data/home";
import { pageAssetSlots } from "@/lib/assets";
import heroStyles from "./home-hero.module.css";
import styles from "./home-redesign.module.css";

export const metadata: Metadata = {
  title: "Hands-on STEM, Space & Robotics Learning",
  description:
    "Ignited Brains creates hands-on Space, STEM, AI & Robotics Labs and Science Parks that turn curiosity into real-world learning.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <main className="home-page overflow-hidden bg-white">
      <section className={`home-hero-section relative border-b border-brand-line/80 bg-white ${heroStyles.hero}`}>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_28%,rgba(45,125,235,.12),transparent_28rem)]" />
        <Container wide className="home-hero-shell relative grid items-center gap-7 py-6 lg:grid-cols-2 lg:gap-8 lg:py-6 xl:grid-cols-[1.02fr_0.98fr]">
          <div className="home-hero-copy relative z-10 grid content-center gap-5 py-2 lg:gap-6 lg:py-4">
            <p className="text-[0.72rem] font-extrabold uppercase tracking-[0.15em] text-brand-blue/55 sm:text-xs">
              Transforming Education Through Innovation
            </p>
            <h1 className="max-w-[720px] text-balance text-[clamp(3rem,5vw,5rem)] font-black leading-[1.08] tracking-[-0.04em] text-brand-blue">
              <span className={styles.heroLine}>The future isn&apos;t</span>{" "}
              <span className={styles.heroLine}>found in books.</span>{" "}
              <span className={styles.heroLine}>It is <span className="home-hero-created text-brand-orange">created.</span></span>
            </h1>
            <p className="home-hero-description max-w-[680px] text-base font-medium leading-7 text-brand-ink/75">
              Hands-on Space, STEM, AI &amp; Robotics Labs and Science Parks that transform schools into environments where students discover, build and innovate.
            </p>
            <p className="home-hero-detail hidden max-w-[680px] text-sm leading-6 text-brand-muted xl:block">
              From a first experiment to a working prototype, students learn by doing. Our spaces connect classroom concepts with practical experiences in observation, engineering, coding and teamwork.
            </p>
            <div className="home-hero-learning hidden max-w-[680px] gap-2 border-l-2 border-brand-orange/40 pl-4 lg:grid">
              <p className="text-sm leading-6 text-brand-muted"><strong className="font-extrabold text-brand-blue">Explore.</strong> Discover space and science through models and experiments.</p>
              <p className="text-sm leading-6 text-brand-muted"><strong className="font-extrabold text-brand-blue">Create.</strong> Build robotics and STEM projects with real-world purpose.</p>
              <p className="text-sm leading-6 text-brand-muted"><strong className="font-extrabold text-brand-blue">Collaborate.</strong> Test ideas, learn together and keep improving.</p>
            </div>
            <div className="home-hero-actions flex flex-wrap items-center gap-3">
              <ButtonLink
                href="/solutions"
                size="lg"
                showArrow
                className="min-h-11 w-[16rem] whitespace-nowrap rounded-full px-5 text-[0.9rem] shadow-[0_8px_20px_rgba(255,96,24,.2)] sm:min-h-12 sm:px-5 sm:text-[0.95rem]"
              >
                Explore Our Solutions
              </ButtonLink>
              <Link
                href="#our-story"
                className="focus-ring group inline-flex min-h-11 w-[16rem] whitespace-nowrap items-center justify-center gap-2.5 rounded-full border-2 border-brand-blue/25 bg-white px-5 text-[0.9rem] font-extrabold text-brand-blue shadow-[0_8px_20px_rgba(15,39,78,.1)] transition duration-200 hover:-translate-y-0.5 hover:border-brand-blue/45 hover:bg-brand-sky hover:shadow-[0_10px_24px_rgba(15,39,78,.14)] active:translate-y-0 sm:min-h-12 sm:text-[0.95rem]"
              >
                <svg
                  viewBox="0 0 28 28"
                  className="h-7 w-7 shrink-0 transition group-hover:scale-105"
                  aria-hidden="true"
                >
                  <circle cx="14" cy="14" r="14" fill="#0b3392" />
                  <path d="M11.25 8.9 20 14l-8.75 5.1V8.9Z" fill="#ffffff" />
                </svg>
                <span>Watch Our Story</span>
              </Link>
            </div>

            <div className="home-hero-principles grid max-w-[680px] grid-cols-1 gap-3 border-t border-brand-line/80 pt-4 sm:grid-cols-3 sm:gap-4">
              {homePrinciples.map((item) => (
                <div key={item.title} className="flex items-center gap-2.5">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-orange-50 text-brand-orange">
                    <HomeIcon name={item.icon} className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-extrabold text-brand-blue sm:text-sm">{item.title}</p>
                    <p className="mt-1 text-[0.66rem] font-semibold leading-5 text-brand-muted sm:text-[0.7rem]">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <a href="#curiosity" className={`${styles.scrollCue} focus-ring hidden lg:inline-flex`}>
              <span aria-hidden="true">↓</span> Scroll to explore
            </a>
          </div>

          <div className="home-hero-visual relative aspect-[16/10] w-full max-w-[780px] justify-self-end overflow-hidden rounded-[1.6rem] bg-brand-mist sm:aspect-[16/9] lg:aspect-[16/10] xl:aspect-[16/10]">
            <div className="home-hero-media absolute inset-0 overflow-hidden rounded-[inherit]">
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
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center"
                />
              )}
            </div>
          </div>
        </Container>
      </section>

      <section id="curiosity" data-home-desktop="question" className={`${styles.questionSection} relative bg-white py-14 sm:py-16 lg:py-0`}>
        <Container wide className={`${styles.questionInner} grid items-center gap-10 lg:grid-cols-[0.82fr_1.18fr]`}>
          <div className={styles.questionCopy}>
            <Eyebrow>A Better Tomorrow Starts With A Question</Eyebrow>
            <h2 className="mt-5 max-w-2xl text-balance text-4xl font-black leading-[1.02] tracking-[-0.045em] text-brand-blue sm:text-5xl">
              Education should <span className="text-brand-orange">ignite curiosity.</span>
            </h2>
            <p className="mt-4 max-w-xl text-base font-medium leading-7 text-brand-muted">
              Every great discovery begins with a question. We create environments where students feel empowered to ask “Why?”, explore possibilities and turn curiosity into real-world solutions.
            </p>
            <ButtonLink href="/about" variant="outline" showArrow className={`${styles.questionButton} mt-6`}>
              Learn More About Us
            </ButtonLink>
            <div className="home-impact-words mt-8 grid gap-4 sm:grid-cols-3 lg:hidden">
              {impactWords.map((item) => (
                <div key={item.number} className="grid grid-cols-[2.5rem_1fr] gap-3">
                  <span className="text-3xl font-black leading-none text-brand-blue/10">{item.number}</span>
                  <div>
                    <h3 className="font-extrabold text-brand-blue">{item.title}</h3>
                    <p className="mt-1 text-sm font-medium text-brand-muted">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <HomeQuestionScene />
        </Container>
      </section>

      <section data-home-motion="transformation" className={`${styles.journeySection} soft-blue-surface border-y border-brand-line/70 py-14 sm:py-16 lg:py-20`}>
        <Container wide>
          <div className={styles.sectionIntro}>
            <Eyebrow>The Transformation Journey</Eyebrow>
            <h2 className="mt-4 text-balance text-4xl font-black leading-[1.02] tracking-[-0.045em] text-brand-blue sm:text-5xl">
              From Classrooms to <span className="text-brand-orange">Real-world Impact</span>
            </h2>
            <p className="mt-2 text-base font-medium text-brand-muted">More than theory. A hands-on future.</p>
          </div>

          <ContinuousRow label="Classroom transformation" variant="transformation" phoneSlides={transformationSteps.map((step) => step.label)} duration={20} className={styles.journeyRow}>
            {transformationSteps.map((step, index) => (
              <div key={step.label} className={`${styles.journeyItem} home-marquee-item group relative`}>
                <span className={styles.journeyNumber} aria-label={`Stage ${index + 1}`}>{index + 1}</span>
                <div className={`${styles.journeyCard} overflow-hidden rounded-2xl border border-brand-line bg-white shadow-card`}>
                  <SiteImage
                    src={step.image}
                    alt={step.label === "Question" ? "Student raising a hand to ask about a science demonstration" : `${step.label} learning stage`}
                    aspectRatio="4/3"
                    sizes="(max-width: 767px) 85vw, (max-width: 1023px) 18vw, 18vw"
                    imageClassName="transition duration-500 group-hover:scale-[1.04]"
                  />
                  <div className={`${styles.journeyCaption} min-h-20 p-3.5`}>
                    <h3 className="text-xs font-extrabold leading-tight text-brand-blue">{step.label}</h3>
                    <p className="mt-1 text-[0.68rem] font-medium text-brand-muted">{step.caption}</p>
                  </div>
                </div>
                {index < transformationSteps.length - 1 ? (
                  <span className={`${styles.journeyArrow} absolute -right-[11px] top-[42%] z-10 hidden h-7 w-7 -translate-y-1/2 place-items-center rounded-full border border-brand-line bg-white text-brand-orange shadow-sm sm:grid`} aria-hidden="true">
                    <ArrowIcon className="h-4 w-4" />
                  </span>
                ) : null}
              </div>
            ))}
          </ContinuousRow>
        </Container>
      </section>

      <section data-home-motion="solutions" className={`${styles.solutionsSection} bg-white py-14 sm:py-16 lg:py-20`}>
        <Container wide>
          <div>
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <Eyebrow>Our Solutions</Eyebrow>
                <h2 className="mt-4 text-balance text-4xl font-black leading-none tracking-[-0.045em] text-brand-blue sm:text-5xl">
                  Build the spaces where <span className="text-brand-orange">tomorrow begins.</span>
                </h2>
              </div>
              <Link href="/solutions" className={`${styles.solutionsAll} focus-ring inline-flex items-center gap-2 font-extrabold text-brand-blue`}>
                Explore All Solutions <ArrowIcon className="h-4 w-4 text-brand-orange" />
              </Link>
            </div>

            <ContinuousRow label="Our solutions" variant="solutions" phoneSlides={homeSolutions.map((solution) => solution.title)} duration={28} className={`${styles.solutionsRow} mt-9 lg:mt-7`}>
              {homeSolutions.map((solution) => (
                <div className={`${styles.solutionItem} home-marquee-item`} key={solution.title}>
                  <article className={`${styles.solutionTile} group flex h-full flex-col overflow-hidden rounded-[1.2rem] border border-brand-line bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-card-hover`}>
                    <div className={`${styles.solutionImage} relative`}>
                      <SiteImage
                        src={solution.image}
                        alt={`${solution.title} learning experience`}
                        aspectRatio="16/10"
                        sizes="(max-width: 767px) 85vw, (max-width: 1023px) 45vw, 50vw"
                        imageClassName="transition duration-500 group-hover:scale-[1.04]"
                      />
                    </div>
                    <div className={`${styles.solutionContent} flex flex-1 flex-col px-5 pb-5 pt-8`}>
                      <span data-solution-icon={solution.icon} className={`${styles.solutionIcon} grid h-11 w-11 place-items-center rounded-full border-4 border-white bg-orange-50 text-brand-orange shadow-sm`}>
                        <HomeIcon name={solution.icon} className="h-5 w-5" />
                      </span>
                      <h3 className="text-xl font-black tracking-[-0.025em] text-brand-blue">{solution.title}</h3>
                      <p className="mt-2 min-h-16 text-sm leading-6 text-brand-muted">{solution.description}</p>
                      <div className="mt-auto pt-4">
                        <Link href={solution.href} className={`${styles.solutionLink} focus-ring inline-flex items-center gap-2 font-extrabold text-brand-orange`} aria-label={`Explore ${solution.title}`}>
                          <span>Explore</span><ArrowIcon className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </article>
                </div>
              ))}
            </ContinuousRow>
          </div>
        </Container>
      </section>

      <LearningSystem />

      <HomeStorySection />

      <section data-home-desktop="impact" className={`${styles.impactSection} bg-white py-14 sm:py-16 lg:py-20`}>
        <Container wide className={`${styles.impactInner} grid items-center gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10`}>
          <div className="pr-0 lg:pr-4">
            <Eyebrow>Our Impact</Eyebrow>
            <h2 className="mt-3 max-w-xl text-balance text-4xl font-black leading-none tracking-[-0.045em] text-brand-blue sm:text-5xl">
              Real Impact. <span className="text-brand-orange">Brighter Tomorrows.</span>
            </h2>
            <div className={`${styles.impactStats} home-impact-stats mt-8 grid grid-cols-2 gap-3`}>
              {impactStats.map((stat) => (
                <div key={stat.label} className={`${styles.impactStat} flex items-center gap-4`}>
                  <HomeIcon name={stat.icon} className={`${styles.impactIcon} h-8 w-8 shrink-0 text-brand-blue`} />
                  <div>
                    <p className="text-3xl font-black tracking-[-0.04em] text-brand-blue"><ImpactCount value={stat.value} /></p>
                    <p className="mt-1 text-xs font-semibold leading-5 text-brand-muted">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={`${styles.impactPhoto} home-impact-photo relative min-h-[300px] overflow-hidden rounded-[2rem] border border-brand-line bg-brand-mist shadow-card sm:min-h-[340px] lg:min-h-[370px]`}>
            <Image
              src={pageAssetSlots.home.impactStudent}
              alt="Ignited Brains educator presenting a hands-on space and AI learning lab"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              style={{ objectPosition: "65% 44%" }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-transparent" />
          </div>
        </Container>
      </section>

      <section data-home-desktop="project" className={`${styles.roverSection} border-y border-white/10 py-14 sm:py-16 lg:py-20`}>
        <Container wide className={`${styles.roverInner} grid gap-9 lg:grid-cols-[0.76fr_1.24fr] lg:items-center`}>
          <div>
            <Eyebrow className="text-white/70">Featured Project</Eyebrow>
            <h2 className="mt-4 text-4xl font-black leading-none tracking-[-0.045em] text-white sm:text-5xl">Autonomous <span className="text-brand-orange">Mars Rover</span></h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-white/75">
              A student-built autonomous rover that navigates rocky terrains, collects environmental data and transmits it back to Earth.
            </p>
            <div className={`${styles.roverFeatures} home-rover-features mt-6 grid gap-3 sm:grid-cols-2`}>
              {["AI based obstacle avoidance", "Real-time data transmission", "Rugged terrain mobility", "Solar powered system"].map((item) => (
                <div key={item} className="flex items-center gap-2.5 text-sm font-semibold text-white/90">
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full border border-brand-orange text-[0.65rem] font-black text-brand-orange">✓</span>
                  {item}
                </div>
              ))}
            </div>
            <ButtonLink href="/projects" showArrow className={`${styles.roverButton} mt-7`}>
              View Project Details
            </ButtonLink>
          </div>

          <div className={styles.roverVisual}>
            <SiteImage
              src={pageAssetSlots.home.marsRover}
              alt="Student-built autonomous rover prototype with its sensors and mobility components"
              aspectRatio="16/9"
              sizes="(max-width: 1024px) 100vw, 48vw"
              className="home-rover-photo rounded-[1.25rem] border border-white/20 shadow-card"
              imageClassName="object-contain"
            />
            <span className={`${styles.roverCallout} ${styles.roverCalloutCamera}`} aria-hidden="true">AI / camera</span>
            <span className={`${styles.roverCallout} ${styles.roverCalloutMobility}`} aria-hidden="true">Terrain mobility</span>
            <span className={`${styles.roverCallout} ${styles.roverCalloutData}`} aria-hidden="true">Live data</span>
          </div>
        </Container>
      </section>

      <section data-home-desktop="india" className={`${styles.indiaSection} home-india-section relative overflow-hidden bg-white py-14 sm:py-16 lg:py-20`}>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_54%_50%,rgba(255,108,39,.07),transparent_30rem)]" />
        <Container wide className={`${styles.indiaInner} relative grid items-center gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-3 xl:gap-4`}>
          <div>
            <Eyebrow>Our India Mission</Eyebrow>
            <h2 className="mt-3 max-w-xl text-balance text-4xl font-black leading-none tracking-[-0.045em] text-brand-blue sm:text-5xl">
              For A <span className="text-brand-orange">Brighter India</span>
            </h2>
            <p className="mt-3 text-lg font-semibold text-brand-blue/75">Building the future, one curious mind at a time.</p>
            <p className="mt-5 max-w-[620px] text-base leading-7 text-brand-muted">
              Our mission is to bring hands-on, future-ready learning spaces into every school and ignite curiosity, creativity and innovation in every student.
            </p>
            <ButtonLink
              href="/contact"
              showArrow
              className="mt-7 min-h-11 w-fit rounded-full px-5 text-[0.9rem] shadow-[0_8px_20px_rgba(255,96,24,.18)] sm:min-h-12 sm:px-6 sm:text-[0.95rem]"
            >
              Be Part of the Journey
            </ButtonLink>
          </div>

          <div className={`${styles.indiaVisual} home-india-visual relative aspect-[2/1] w-full overflow-hidden rounded-[1.5rem] bg-white lg:max-w-[680px] lg:justify-self-start xl:max-w-[720px]`}>
            <Image
              src={pageAssetSlots.home.indiaImpact}
              alt="Ignited Brains vision for innovation across India"
              fill
              sizes="(max-width: 1024px) 100vw, 55vw"
              unoptimized
              className="object-contain object-center scale-[1.01]"
            />
          </div>
        </Container>
      </section>

      <section data-home-desktop="cta" className={`${styles.ctaSection} home-school-cta dark-space-surface border-y border-white/10`}>
        <Container wide className={`${styles.ctaInner} relative grid items-center gap-6 py-8 sm:gap-8 sm:py-10 lg:grid-cols-[minmax(0,1fr)_220px] lg:gap-10 lg:py-16`}>
          <div className={`${styles.ctaEarth} pointer-events-none mx-auto w-36 sm:w-44 lg:w-[220px]`} aria-hidden="true">
            <AnimatedEarth className="h-auto w-full drop-shadow-[0_18px_38px_rgba(0,91,255,.34)]" />
          </div>
          <div className={`${styles.ctaCopy} relative text-center sm:text-left`}>
            <h2 className="text-balance text-3xl font-black tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl">
              Ready to transform your school?
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-white/70 sm:mx-0 sm:text-base">
              Let&apos;s create a space where students don&apos;t just learn about the future. They build it.
            </p>
            <ButtonLink href="/contact" size="lg" showArrow className={`${styles.ctaButton} relative mt-6 justify-self-center sm:justify-self-start`}>
              Partner With Us
            </ButtonLink>
          </div>
        </Container>
      </section>
      <PhoneHomeMotion />
      <DesktopHomeMotion />
    </main>
  );
}
