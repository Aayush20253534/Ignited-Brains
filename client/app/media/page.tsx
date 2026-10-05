import type { Metadata } from "next";
import { EarthCta } from "@/components/layout/earth-cta";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";

import { MediaBrowser } from "@/components/media-feed/media-browser";
import { MediaLightbox } from "@/components/media-feed/media-lightbox";
import { MediaMoments } from "@/components/media-feed/media-moments";
import { MediaMotion } from "@/components/media-feed/media-motion";
import { MediaPhoto } from "@/components/media-feed/media-photo";
import { archiveEvents, fieldPhotoIds, pressCoverage, visualStories } from "@/data/media-archive";
import { mediaArticles } from "@/data/media";
import styles from "@/components/media-feed/media.module.css";

export const metadata: Metadata = {
  title: "Media & Insights",
  description: "Stories, student projects and real moments from Ignited Brains labs, hands-on learning, innovation and school experiences.",
  alternates: { canonical: "/media" },
};

const Arrow = () => <span aria-hidden="true">↗</span>;

export default function MediaPage() {
  return <MediaLightbox><MediaMotion><main className={styles.page}>
    <section className={styles.hero} data-media-section aria-labelledby="media-hero-title">
      <div className={styles.heroArt}>
        <Image src="/media-v2/hero-editorial.webp" alt="Concept illustration of students assembling a rover, surrounded by visions of space exploration" fill preload quality={90} sizes="100vw" />
        <div className={styles.heroMask} />
        <Image src="/media-v2/hero-editorial-overlay.svg" alt="" fill className={styles.heroOverlay} aria-hidden="true" />
        <div className={styles.editorialLabels} aria-hidden="true"><span>ROBOTICS</span><span>SPACE</span><span>DISCOVERY</span></div>
        <p className={styles.illustrationNote}>Concept illustration</p>
      </div>
      <div className={`${styles.container} ${styles.heroInner}`}>
        <div className={styles.heroCopy} data-reveal>
          <p className={styles.eyebrow}>Media &amp; Stories</p>
          <h1 id="media-hero-title">See curiosity<br /><em>in motion.</em></h1>
          <p className={styles.heroDescription}>Stories, experiments and moments from classrooms where students are building, testing and discovering what they can do.</p>
          <div className={styles.actions}><a href="#stories" className={styles.primaryButton}>Explore Stories <Arrow /></a><a href="#visual-stories" className={styles.outlineButton}>See the Moments <Arrow /></a></div>
          <nav className={styles.editorialNav} aria-label="Explore the Media journal"><a href="#stories">Stories</a><a href="#visual-stories">Visual stories</a><a href="#field-notes">Field notes</a><a href="#ideas">Ideas</a></nav>
        </div>
      </div>
    </section>

    <section className={styles.learning} data-media-section aria-labelledby="learning-title">
      <div className={`${styles.container} ${styles.editorialRow}`}>
        <div className={styles.sectionIntro} data-reveal><p className={styles.eyebrow}>This is Ignited Brains</p><h2 id="learning-title">This is what<br /><em>learning looks like.</em></h2><p>Real classrooms. Real experiments. Real possibilities.</p></div>
        <div className={styles.learningStrip} data-reveal>
          <MediaPhoto id="learning" sizes="(max-width: 767px) 55vw, 25vw" />
          <MediaPhoto id="lab" sizes="(max-width: 767px) 45vw, 20vw" />
          <MediaPhoto id="vr" sizes="(max-width: 767px) 55vw, 25vw" />
          <MediaPhoto id="robotics" sizes="(max-width: 767px) 45vw, 20vw" />
        </div>
        <ol className={styles.learningSteps} aria-label="The learning process">{["Ask", "Experiment", "Build", "Test", "Discover"].map((step, index) => <li key={step} style={{ "--step": index } as CSSProperties}><span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>{step}</li>)}</ol>
      </div>
    </section>

    <section id="stories" className={styles.featured} data-media-section aria-labelledby="featured-title">
      <div className={`${styles.container} ${styles.featuredGrid}`}>
        <div className={styles.featuredCopy} data-reveal>
          <p className={styles.eyebrow}>Featured story / Student learning</p>
          <h2 id="featured-title">Inside a STEM Lab.<br /><em>Beyond the textbook.</em></h2>
          <p>{mediaArticles[1].description}</p>
          <a href="#ideas" className={styles.textLink}>Explore the insights <Arrow /></a>
          <div className={styles.featuredTags}><span>Curiosity</span><span>Experimentation</span><span>Shared discovery</span></div>
        </div>
        <figure className={styles.featuredVisual} data-reveal>
          <MediaPhoto id="learning" sizes="(max-width: 900px) 95vw, 62vw" />
          <figcaption><span>FROM THE LAB</span> A closer look, together.</figcaption>
        </figure>
      </div>
    </section>

    <section id="ideas" className={styles.insights} data-media-section aria-labelledby="insights-title">
      <div className={`${styles.container} ${styles.editorialRow}`}>
        <div className={styles.sectionIntro} data-reveal><p className={styles.eyebrow}>Stories &amp; Insights</p><h2 id="insights-title">Ideas worth<br /><em>sharing.</em></h2><p>Perspectives, experiences and lessons from hands-on education.</p><span className={styles.editorialIndex}>01 — 03 / THE JOURNAL</span></div>
        <div data-reveal><MediaBrowser /></div>
      </div>
    </section>

    <section id="visual-stories" className={styles.visualStories} data-media-section aria-labelledby="visual-title">
      <div className={`${styles.container} ${styles.editorialRow}`}>
        <div className={styles.sectionIntro} data-reveal><p className={styles.eyebrow}>Visual Stories</p><h2 id="visual-title">Some stories are<br /><em>better seen.</em></h2><p>Look closer at real moments from the lab and the exhibition floor.</p><span className={styles.editorialIndex}>OPEN A PHOTOGRAPH TO EXPLORE</span></div>
        <div className={styles.visualGrid} data-reveal>{visualStories.map((story, index) => <figure key={story.photo} className={index === 0 ? styles.visualLead : styles.visualSupporting}>
          <MediaPhoto id={story.photo} sizes={index === 0 ? "(max-width: 767px) 90vw, 43vw" : "(max-width: 767px) 44vw, 22vw"} />
          <figcaption><p className={styles.micro}>{story.label}</p><h3>{story.title}</h3><span>Visual story <span aria-hidden="true">/</span> Photography</span></figcaption>
        </figure>)}</div>
      </div>
    </section>

    <section className={styles.timeline} data-media-section aria-labelledby="moments-title">
      <div className={`${styles.container} ${styles.editorialRow}`}>
        <div className={styles.sectionIntro} data-reveal><p className={styles.eyebrow}>In six moments</p><h2 id="moments-title">A lot can happen<br />when students start <em>exploring.</em></h2></div>
        <div className={styles.momentsWrap} data-reveal><MediaMoments /></div>
      </div>
    </section>

    <section id="field-notes" className={styles.field} data-media-section aria-labelledby="field-title">
      <div className={`${styles.container} ${styles.editorialRow}`}>
        <div className={styles.sectionIntro} data-reveal><p className={styles.eyebrow}>From the Field</p><h2 id="field-title">Real moments.<br /><em>A closer look.</em></h2><p>Snapshots from the labs, learning spaces and people of Ignited Brains.</p><span className={styles.editorialIndex}>THE PHOTO JOURNAL</span></div>
        <div className={styles.fieldGrid}>{fieldPhotoIds.map((id, index) => <figure key={id} data-reveal style={{ "--delay": `${index * 70}ms` } as CSSProperties}><MediaPhoto id={id} caption sizes="(max-width: 767px) 46vw, (max-width: 1100px) 32vw, 360px" /></figure>)}</div>
      </div>
    </section>

    <section className={styles.students} data-media-section aria-labelledby="students-title">
      <div className={`${styles.container} ${styles.editorialRow}`}>
        <div className={styles.sectionIntro} data-reveal><p className={styles.eyebrow}>Through Their Eyes</p><h2 id="students-title">What does discovery<br /><em>feel like?</em></h2></div>
        <div className={styles.studentComposition} data-reveal>
          <MediaPhoto id="learning" className={styles.studentPortrait} sizes="(max-width: 767px) 45vw, 24vw" />
          <div className={styles.studentNote}><span className={styles.noteMark} aria-hidden="true">↗</span><p>Students gather around a computer in the AI &amp; Robotics Lab.</p><span>LEARNING TOGETHER</span><div className={styles.noteLine} aria-hidden="true" /></div>
          <MediaPhoto id="team" className={styles.studentTeam} sizes="(max-width: 767px) 90vw, 32vw" />
        </div>
      </div>
    </section>

    {archiveEvents.length > 0 && <section className={styles.events} data-media-section aria-labelledby="events-title">
      <div className={`${styles.container} ${styles.editorialRow}`}>
        <div className={styles.sectionIntro} data-reveal><p className={styles.eyebrow}>What&apos;s Happening</p><h2 id="events-title">From the<br /><em>community.</em></h2><p>New spaces for hands-on learning.</p></div>
        <div>{archiveEvents.map(event => <article key={event.title} className={styles.event} data-reveal><MediaPhoto id={event.photo} sizes="(max-width: 767px) 90vw, 36vw" /><div><p className={styles.micro}>{event.date} / Lab opening</p><h3>{event.title}</h3><p>{event.description}</p><span className={styles.eventLocation}>{event.location}</span></div></article>)}</div>
      </div>
    </section>}

    {pressCoverage.length > 0 && <section className={styles.press} data-media-section aria-labelledby="press-title">
      <div className={`${styles.container} ${styles.editorialRow}`}>
        <div className={styles.sectionIntro} data-reveal><p className={styles.eyebrow}>Press &amp; Media</p><h2 id="press-title">In the<br /><em>news.</em></h2></div>
        <div>{pressCoverage.map(item => <article key={item.title} className={styles.pressStory} data-reveal><div className={styles.clipping}><MediaPhoto id={item.photo} sizes="(max-width: 767px) 90vw, 40vw" /></div><div><p className={styles.publication}>{item.publication}</p><p className={styles.micro}>{item.date}</p><h3>{item.title}</h3><button type="button" data-photo={item.photo} className={styles.textLink} aria-haspopup="dialog">Read the press clipping <Arrow /></button></div></article>)}</div>
      </div>
    </section>}

    <section className={styles.manifesto} data-media-section aria-labelledby="manifesto-title">
      <Image src="/media-v2/students/exhibition-team.webp" alt="Students and adults together at the Curiosity Corner exhibition" fill sizes="100vw" />
      <div className={styles.manifestoShade} />
      <div className={styles.container} data-reveal><p className={styles.eyebrow}>The story continues</p><h2 id="manifesto-title">Curiosity makes<br /><em>good stories.</em></h2><p>The best ones begin when students start discovering for themselves.</p></div>
    </section>

    <EarthCta eyebrow="Keep Exploring" title={<>The next story<br />is already <em>being built.</em></>} description={<>Discover the projects, spaces and experiences behind Ignited Brains.</>} actions={<><Link href="/projects" className={styles.primaryButton}>Explore Projects <Arrow /></Link><Link href="/contact" className={styles.outlineButton}>Partner With Us <Arrow /></Link></>} />
  </main></MediaMotion></MediaLightbox>;
}
