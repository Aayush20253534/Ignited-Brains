import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";

import { EarthCta } from "@/components/layout/earth-cta";
import { GalleryJournal } from "@/components/media-feed/gallery-journal";
import { MediaBrowser } from "@/components/media-feed/media-browser";
import { MediaLightbox } from "@/components/media-feed/media-lightbox";
import { MediaMoments } from "@/components/media-feed/media-moments";
import { MediaMotion } from "@/components/media-feed/media-motion";
import { MediaPhoto } from "@/components/media-feed/media-photo";
import { getMediaPageRecord } from "@/lib/media-page-server";
import { isManagedMediaImage, type MediaPhotoAsset } from "@/lib/media-page";
import styles from "@/components/media-feed/media.module.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Media & Insights",
  description: "Stories, student projects and real moments from Ignited Brains labs, hands-on learning, innovation and school experiences.",
  alternates: { canonical: "/media" },
};

const Arrow = () => <span aria-hidden="true">↗</span>;

function accent(value: string): ReactNode {
  return value.split(/(\*[^*]+\*)/g).filter(Boolean).map((part, index) =>
    part.startsWith("*") && part.endsWith("*") ? <em key={index}>{part.slice(1, -1)}</em> : part,
  );
}
function heading(value: string): ReactNode {
  const lines = value.split("\n");
  return <>{lines.map((line, index) => <span key={index}>{accent(line)}{index < lines.length - 1 && <br />}</span>)}</>;
}
function imageProps(photo: MediaPhotoAsset) {
  return { unoptimized: isManagedMediaImage(photo.src), style: { objectPosition: photo.position || "center" } };
}
function triggerProps(photo: MediaPhotoAsset, key: string) {
  return {
    "data-photo": key,
    "data-photo-src": photo.src,
    "data-photo-alt": photo.alt,
    "data-photo-caption": photo.caption,
    "data-photo-width": photo.width,
    "data-photo-height": photo.height,
  };
}

export default async function MediaPage() {
  const { content } = await getMediaPageRecord();
  const { hero, learning, featured, insights, visualStories, moments, field, photoJournal, students, events, press, manifesto, earthCta } = content;

  return <MediaLightbox><MediaMotion><main className={styles.page}>
    {hero.visible && <section className={styles.hero} data-media-section aria-labelledby="media-hero-title">
      <div className={styles.heroArt}>
        <Image src={hero.image.src} alt={hero.image.alt} fill preload quality={90} sizes="100vw" {...imageProps(hero.image)} />
        <div className={styles.heroMask} />
        {hero.overlayImage.src && <Image src={hero.overlayImage.src} alt={hero.overlayImage.alt} fill className={styles.heroOverlay} aria-hidden={!hero.overlayImage.alt} unoptimized={isManagedMediaImage(hero.overlayImage.src)} style={{ objectPosition: hero.overlayImage.position || "center" }} />}
        {!!hero.labels.length && <div className={styles.editorialLabels} aria-hidden="true">{hero.labels.map((label, index) => <span key={index}>{label}</span>)}</div>}
        {hero.note && <p className={styles.illustrationNote}>{hero.note}</p>}
      </div>
      <div className={`${styles.container} ${styles.heroInner}`}>
        <div className={styles.heroCopy} data-reveal>
          <p className={styles.eyebrow}>{hero.eyebrow}</p>
          <h1 id="media-hero-title">{heading(hero.heading)}</h1>
          <p className={styles.heroDescription}>{hero.description}</p>
          <div className={styles.actions}><a href={hero.primaryCta.href} className={styles.primaryButton}>{hero.primaryCta.label} <Arrow /></a><a href={hero.secondaryCta.href} className={styles.outlineButton}>{hero.secondaryCta.label} <Arrow /></a></div>
          {!!hero.nav.length && <nav className={styles.editorialNav} aria-label="Explore the Media journal">{hero.nav.map((item,index)=><a key={index} href={item.href}>{item.label}</a>)}</nav>}
        </div>
      </div>
    </section>}

    {learning.visible && <section className={styles.learning} data-media-section aria-labelledby="learning-title">
      <div className={`${styles.container} ${styles.editorialRow}`}>
        <div className={styles.sectionIntro} data-reveal><p className={styles.eyebrow}>{learning.eyebrow}</p><h2 id="learning-title">{heading(learning.heading)}</h2><p>{learning.description}</p></div>
        <div className={styles.learningStrip} data-reveal>{learning.photos.map((photo,index)=><MediaPhoto key={index} id={`learning:${index}`} photo={photo} sizes={index % 2 === 0 ? "(max-width: 767px) 55vw, 25vw" : "(max-width: 767px) 45vw, 20vw"} />)}</div>
        {!!learning.steps.length && <ol className={styles.learningSteps} aria-label="The learning process" style={{gridTemplateColumns:`repeat(${Math.max(1,learning.steps.length)},minmax(0,1fr))`}}>{learning.steps.map((step,index)=><li key={index} style={{"--step":index} as CSSProperties}><span aria-hidden="true">{String(index+1).padStart(2,"0")}</span>{step}</li>)}</ol>}
      </div>
    </section>}

    {featured.visible && <section id="stories" className={styles.featured} data-media-section aria-labelledby="featured-title">
      <div className={`${styles.container} ${styles.featuredGrid}`}>
        <div className={styles.featuredCopy} data-reveal>
          <p className={styles.eyebrow}>{featured.eyebrow}</p>
          <h2 id="featured-title">{heading(featured.heading)}</h2>
          <p>{featured.description}</p>
          {featured.link.label && <a href={featured.link.href} className={styles.textLink}>{featured.link.label} <Arrow /></a>}
          {!!featured.tags.length && <div className={styles.featuredTags}>{featured.tags.map((tag,index)=><span key={index}>{tag}</span>)}</div>}
        </div>
        <figure className={styles.featuredVisual} data-reveal>
          <MediaPhoto id="featured" photo={featured.image} sizes="(max-width: 900px) 95vw, 62vw" />
          <figcaption><span>{featured.captionLabel}</span>{featured.caption}</figcaption>
        </figure>
      </div>
    </section>}

    {insights.visible && <section id="ideas" className={styles.insights} data-media-section aria-labelledby="insights-title">
      <div className={`${styles.container} ${styles.editorialRow}`}>
        <div className={styles.sectionIntro} data-reveal><p className={styles.eyebrow}>{insights.eyebrow}</p><h2 id="insights-title">{heading(insights.heading)}</h2><p>{insights.description}</p><span className={styles.editorialIndex}>{insights.indexLabel}</span></div>
        <div data-reveal><MediaBrowser articles={insights.articles} /></div>
      </div>
    </section>}

    {visualStories.visible && visualStories.items.length > 0 && <section id="visual-stories" className={styles.visualStories} data-media-section aria-labelledby="visual-title">
      <div className={`${styles.container} ${styles.editorialRow}`}>
        <div className={styles.sectionIntro} data-reveal><p className={styles.eyebrow}>{visualStories.eyebrow}</p><h2 id="visual-title">{heading(visualStories.heading)}</h2><p>{visualStories.description}</p><span className={styles.editorialIndex}>{visualStories.indexLabel}</span></div>
        <div className={styles.visualGrid} data-reveal>{visualStories.items.map((story,index)=><figure key={index} className={index===0?styles.visualLead:styles.visualSupporting}>
          <MediaPhoto id={`visual:${index}`} photo={story.photo} sizes={index===0?"(max-width: 767px) 90vw, 43vw":"(max-width: 767px) 44vw, 22vw"} />
          <figcaption><p className={styles.micro}>{story.label}</p><h3>{story.title}</h3><span>Visual story <span aria-hidden="true">/</span> Photography</span></figcaption>
        </figure>)}</div>
      </div>
    </section>}

    {moments.visible && moments.items.length > 0 && <section className={styles.timeline} data-media-section aria-labelledby="moments-title">
      <div className={`${styles.container} ${styles.editorialRow}`}>
        <div className={styles.sectionIntro} data-reveal><p className={styles.eyebrow}>{moments.eyebrow}</p><h2 id="moments-title">{heading(moments.heading)}</h2></div>
        <div className={styles.momentsWrap} data-reveal><MediaMoments items={moments.items} /></div>
      </div>
    </section>}

    {field.visible && field.photos.length > 0 && <section id="field-notes" className={styles.field} data-media-section aria-labelledby="field-title">
      <div className={`${styles.container} ${styles.editorialRow}`}>
        <div className={styles.sectionIntro} data-reveal><p className={styles.eyebrow}>{field.eyebrow}</p><h2 id="field-title">{heading(field.heading)}</h2><p>{field.description}</p><span className={styles.editorialIndex}>{field.indexLabel}</span></div>
        <div className={styles.fieldGrid}>{field.photos.map((photo,index)=><figure key={index} data-reveal style={{"--delay":`${index*70}ms`} as CSSProperties}><MediaPhoto id={`field:${index}`} photo={photo} caption sizes="(max-width: 767px) 46vw, (max-width: 1100px) 32vw, 360px" /></figure>)}</div>
      </div>
    </section>}

    <GalleryJournal intro={photoJournal} />

    {students.visible && <section className={styles.students} data-media-section aria-labelledby="students-title">
      <div className={`${styles.container} ${styles.editorialRow}`}>
        <div className={styles.sectionIntro} data-reveal><p className={styles.eyebrow}>{students.eyebrow}</p><h2 id="students-title">{heading(students.heading)}</h2></div>
        <div className={styles.studentComposition} data-reveal>
          <MediaPhoto id="students:portrait" photo={students.portrait} className={styles.studentPortrait} sizes="(max-width: 767px) 45vw, 24vw" />
          <div className={styles.studentNote}><span className={styles.noteMark} aria-hidden="true">↗</span><p>{students.note}</p><span>{students.noteLabel}</span><div className={styles.noteLine} aria-hidden="true" /></div>
          <MediaPhoto id="students:team" photo={students.team} className={styles.studentTeam} sizes="(max-width: 767px) 90vw, 32vw" />
        </div>
      </div>
    </section>}

    {events.visible && events.items.length > 0 && <section className={styles.events} data-media-section aria-labelledby="events-title">
      <div className={`${styles.container} ${styles.editorialRow}`}>
        <div className={styles.sectionIntro} data-reveal><p className={styles.eyebrow}>{events.eyebrow}</p><h2 id="events-title">{heading(events.heading)}</h2><p>{events.description}</p></div>
        <div>{events.items.map((event,index)=><article key={index} className={styles.event} data-reveal><MediaPhoto id={`event:${index}`} photo={event.photo} sizes="(max-width: 767px) 90vw, 36vw" /><div><p className={styles.micro}>{event.date}{event.typeLabel ? ` / ${event.typeLabel}` : ""}</p><h3>{event.title}</h3><p>{event.description}</p><span className={styles.eventLocation}>{event.location}</span></div></article>)}</div>
      </div>
    </section>}

    {press.visible && press.items.length > 0 && <section className={styles.press} data-media-section aria-labelledby="press-title">
      <div className={`${styles.container} ${styles.editorialRow}`}>
        <div className={styles.sectionIntro} data-reveal><p className={styles.eyebrow}>{press.eyebrow}</p><h2 id="press-title">{heading(press.heading)}</h2></div>
        <div>{press.items.map((item,index)=><article key={index} className={styles.pressStory} data-reveal><div className={styles.clipping}><MediaPhoto id={`press:${index}`} photo={item.photo} sizes="(max-width: 767px) 90vw, 40vw" /></div><div><p className={styles.publication}>{item.publication}</p><p className={styles.micro}>{item.date}</p><h3>{item.title}</h3>{item.externalUrl ? <a href={item.externalUrl} target="_blank" rel="noopener noreferrer" className={styles.textLink}>Read coverage <Arrow /></a> : <button type="button" {...triggerProps(item.photo,`press:${index}`)} className={styles.textLink} aria-haspopup="dialog">Read the press clipping <Arrow /></button>}</div></article>)}</div>
      </div>
    </section>}

    {manifesto.visible && <section className={styles.manifesto} data-media-section aria-labelledby="manifesto-title">
      <Image src={manifesto.image.src} alt={manifesto.image.alt} fill sizes="100vw" unoptimized={isManagedMediaImage(manifesto.image.src)} style={{objectPosition:manifesto.image.position||"center"}} />
      <div className={styles.manifestoShade} />
      <div className={styles.container} data-reveal><p className={styles.eyebrow}>{manifesto.eyebrow}</p><h2 id="manifesto-title">{heading(manifesto.heading)}</h2><p>{manifesto.description}</p></div>
    </section>}

    {earthCta.visible && <EarthCta eyebrow={earthCta.eyebrow} title={<>{heading(earthCta.heading)}</>} description={<>{earthCta.description}</>} actions={<><Link href={earthCta.primaryCta.href} className={styles.primaryButton}>{earthCta.primaryCta.label} <Arrow /></Link><Link href={earthCta.secondaryCta.href} className={styles.outlineButton}>{earthCta.secondaryCta.label} <Arrow /></Link></>} />}
  </main></MediaMotion></MediaLightbox>;
}
