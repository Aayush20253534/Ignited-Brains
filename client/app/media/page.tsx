import { ImageGallery } from "@/components/media/image-gallery";
import { NewsletterForm } from "@/components/contact/newsletter-form";
import type { Metadata } from "next";
import Image from "next/image";

import { HomeIcon } from "@/components/home/home-icon";
import { MediaBrowser } from "@/components/media-feed/media-browser";
import { SiteImage } from "@/components/media";
import { ButtonLink, Container, Eyebrow } from "@/components/ui";
import { fieldStories, mediaVideos } from "@/data/media";
import { pageAssetSlots } from "@/lib/assets";

export const metadata: Metadata = {
  title: "Media & Insights",
  description:
    "Stories, articles, student projects, videos and ideas from Ignited Brains hands-on learning programs.",
  alternates: { canonical: "/media" },
};

export default function MediaPage() {
  return (
    <main className="overflow-hidden bg-white">
      <section className="relative border-b border-brand-line/70 bg-white">
        <Container wide className="page-hero grid min-h-[560px] items-center gap-8 py-10 lg:grid-cols-[0.78fr_1.22fr] lg:py-0">
          <div className="relative z-10 py-4 lg:py-12">
            <Eyebrow>Media &amp; Insights</Eyebrow>
            <h1 className="mt-5 max-w-[650px] text-balance text-[clamp(3.2rem,5.7vw,5.8rem)] font-black leading-[0.92] tracking-[-0.055em] text-brand-blue">
              Ideas. Experiments. <span className="text-brand-orange">Real Impact.</span>
            </h1>
            <p className="mt-5 max-w-[600px] text-base font-medium leading-7 text-brand-ink/75">
              Stories, updates and ideas from the world of hands-on learning, innovation and curious minds.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <ButtonLink href="#stories" size="lg" showArrow>Explore Our Stories</ButtonLink>
              <ButtonLink href="#latest-videos" size="lg" variant="outline">Watch Our Video</ButtonLink>
            </div>
            <div className="mt-8 grid max-w-xl grid-cols-3 gap-3 border-t border-brand-line/80 pt-6">
              {[
                { icon: "projects" as const, title: "Stories", caption: "From Schools" },
                { icon: "think" as const, title: "Ideas", caption: "From Innovators" },
                { icon: "students" as const, title: "Impact", caption: "Across India" },
              ].map((item) => (
                <div key={item.title} className="flex items-center gap-2.5">
                  <HomeIcon name={item.icon} className="h-7 w-7 shrink-0 text-brand-orange" />
                  <div>
                    <p className="text-xs font-black text-brand-blue sm:text-sm">{item.title}</p>
                    <p className="text-[0.62rem] font-medium text-brand-muted sm:text-[0.68rem]">{item.caption}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-visual relative min-h-[400px] self-stretch lg:min-h-[560px]">
            <div className="absolute inset-y-0 left-[-6%] -right-4 overflow-hidden rounded-bl-[5rem] sm:-right-14 lg:left-[-12%] lg:-right-20">
              <Image
                src={pageAssetSlots.media.hero}
                alt="Students and the Ignited Brains team at a science exhibition"
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

      <section id="stories" className="bg-white py-12 sm:py-14 lg:py-16">
        <Container wide className="grid items-center gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:gap-12">
          <div>
            <Eyebrow>Featured Story</Eyebrow>
            <h2 className="mt-3 text-balance text-4xl font-black tracking-[-0.045em] text-brand-blue sm:text-5xl">Turning curiosity into real-world solutions</h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-brand-muted">How a group of Class 9 students built an autonomous rover as part of our AI &amp; Robotics Lab program, exploring navigation, sensors and real-world problem solving.</p>
            <ButtonLink href="/projects#featured-project" className="mt-6" showArrow>Explore the Rover Project</ButtonLink>
          </div>
          <div className="overflow-hidden rounded-3xl shadow-card">
            <SiteImage src={pageAssetSlots.media.featured} alt="Students working on an autonomous rover" aspectRatio="16/8" className="rounded-3xl" sizes="(max-width: 1024px) 100vw, 58vw" />
          </div>
        </Container>
      </section>

      <section id="latest-articles" className="soft-blue-surface border-y border-brand-line/70 py-12 sm:py-14 lg:py-16">
        <Container wide>
          <p className="mb-5 text-xs font-extrabold uppercase tracking-[0.16em] text-brand-orange">Explore Content by Category</p>
          <MediaBrowser />
        </Container>
      </section>

      <section id="latest-videos" className="bg-white py-12 sm:py-14 lg:py-16">
        <Container wide>
          <div className="flex items-end justify-between gap-4">
            <div>
              <Eyebrow>Latest Videos</Eyebrow>
              <h2 className="mt-3 text-4xl font-black tracking-[-0.045em] text-brand-blue sm:text-5xl">Stories that inspire.</h2>
            </div>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {mediaVideos.map((video) => (
              <article key={video.title}>
                <div className="group relative overflow-hidden rounded-2xl border border-brand-line shadow-card">
                  <video src={video.video} poster={video.image} controls playsInline preload="none" aria-label={video.title} className="aspect-video w-full bg-brand-navy" />
                </div>
                <h3 className="mt-4 text-lg font-black tracking-[-0.025em] text-brand-blue">{video.title}</h3>
                <p className="mt-1.5 text-sm leading-6 text-brand-muted">{video.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section id="field-stories" className="soft-blue-surface border-y border-brand-line/70 py-12 sm:py-14 lg:py-16">
        <Container wide>
          <div className="flex items-end justify-between gap-4">
            <div>
              <Eyebrow>Stories From the Field</Eyebrow>
              <h2 className="mt-3 text-4xl font-black tracking-[-0.045em] text-brand-blue sm:text-5xl">Real moments. Real inspiration.</h2>
            </div>
          </div>

          <ImageGallery items={fieldStories.map((story) => ({ image: story.image, label: story.title }))} />
        </Container>
      </section>

      <section className="dark-space-surface border-y border-white/10 text-white">
        <div className="pointer-events-none absolute -right-14 top-1/2 h-64 w-64 -translate-y-1/2 opacity-80 sm:right-0 sm:h-80 sm:w-80 lg:right-8 lg:h-96 lg:w-96" aria-hidden="true">
          <div className="absolute inset-[10%] rounded-full bg-blue-500/20 blur-3xl" />
          <Image src="/decorative/cta-earth.svg" alt="" fill sizes="(max-width: 640px) 256px, (max-width: 1024px) 320px, 384px" className="object-contain drop-shadow-[0_18px_38px_rgba(0,91,255,.28)]" />
        </div>
        <Container wide className="relative py-12 sm:py-14 lg:py-16">
          <div className="max-w-2xl">
            <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-brand-orange">Stay Curious</p>
            <h2 className="mt-3 text-balance text-4xl font-black tracking-[-0.045em] text-white sm:text-5xl">Get the latest stories, updates and innovations in your inbox.</h2>
            <p className="mt-4 text-sm leading-6 text-white/70">Join a growing community of educators, students and innovators.</p>
            <NewsletterForm />
          </div>
        </Container>
      </section>
    </main>
  );
}
