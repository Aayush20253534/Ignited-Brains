import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { HomeIcon, type HomeIconName } from "@/components/home/home-icon";
import { SolutionImageLightbox } from "@/components/home/solution-image-lightbox";
import { EarthCta } from "@/components/layout/earth-cta";
import { ProjectsMotion } from "@/components/projects/projects-motion";
import { ButtonLink } from "@/components/ui";
import type { JourneyStep, LabProgramme, Topic } from "@/data/lab-programmes";
import styles from "./solutions.module.css";

export function SolutionPage({ children }: { children: ReactNode }) {
  return <ProjectsMotion><main className={styles.page}>{children}</main></ProjectsMotion>;
}

export function LabHero({ lab }: { lab: LabProgramme }) {
  return <section className={`${styles.hero} ${styles[lab.tone]}`} aria-labelledby="solution-title" data-motion-section>
    <div className={styles.heroImage}><Image src={lab.hero} alt={lab.heroAlt} fill preload sizes="(max-width: 700px) 100vw, 70vw" /></div>
    <div className={styles.heroShade} />
    <div className={`${styles.container} ${styles.heroInner}`}>
      <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">›</span><Link href="/solutions">Solutions</Link><span aria-hidden="true">›</span><span aria-current="page">{lab.name}</span></nav>
      <div className={styles.heroCopy}>
        <p className={styles.eyebrow} data-reveal>{lab.name}</p>
        <h1 id="solution-title" data-reveal>{lab.title} <em>{lab.emphasis}</em></h1>
        <p className={styles.heroDescription} data-reveal>{lab.description}</p>
        <ul className={styles.proof} data-reveal>{lab.proof.map((item, i) => <li key={item}><HomeIcon name={(["space", "build", "observe"] as HomeIconName[])[i]} /><span>{item}</span></li>)}</ul>
        <div data-reveal><ButtonLink href="/contact" showArrow>Discuss This Solution</ButtonLink></div>
      </div>
      {lab.tone === "park" && <p className={styles.conceptNote}>Illustrative outdoor learning concept</p>}
    </div>
  </section>;
}

export function LearningJourney({ steps, description = "A hands-on journey that turns curiosity into understanding.", title = "Our learning journey" }: { steps: JourneyStep[]; description?: string; title?: string }) {
  return <section className={styles.journeySection} aria-label={title} data-motion-section>
    <div className={`${styles.container} ${styles.journeyInner} ${steps.length > 4 ? styles.cycle : ""}`}>
      <div className={styles.sectionIntro} data-reveal><p className={styles.eyebrow}>{title}</p><h2>{steps.map(s => s.title).join(". ")}.</h2><p>{description}</p></div>
      <ol className={styles.journey}>{steps.map((step, i) => <li key={step.title} data-reveal style={{ transitionDelay: `${i * 60}ms` }}><span className={styles.iconBadge}><HomeIcon name={step.icon} /></span><div><h3>{step.title}</h3><p>{step.description}</p></div>{i < steps.length - 1 && <span className={styles.stepArrow} aria-hidden="true">→</span>}</li>)}</ol>
    </div>
  </section>;
}

export function TopicPanel({ title, description, topics, columns = 3 }: { title: string; description: string; topics: Topic[]; columns?: 2 | 3 }) {
  return <section className={styles.topicPanel} data-reveal>
    <div className={styles.panelHeading}><h2>{title}</h2><p>{description}</p></div>
    <div className={`${styles.topics} ${columns === 2 ? styles.twoColumns : ""}`}>{topics.map(topic => <article className={`${styles.topic} ${topic.image ? styles.photoTopic : ""}`} key={topic.title}>
      {topic.image ? <SolutionImageLightbox src={topic.image} title={topic.title} alt={topic.alt} className={styles.imageTrigger}><Image src={topic.image} alt={topic.alt ?? topic.title} fill sizes="(max-width: 700px) 44vw, (max-width: 1100px) 28vw, 18vw" /><span className={styles.tileShade} /><span className={styles.tileTitle}>{topic.title}<span aria-hidden="true">↗</span></span></SolutionImageLightbox> : <><HomeIcon name={topic.icon} /><h3>{topic.title}</h3><p>{topic.description}</p></>}
    </article>)}</div>
  </section>;
}

export function Activities({ items, title = "What students actually do" }: { items: Topic[]; title?: string }) {
  return <section className={styles.activities} data-reveal><h2>{title}</h2><p>Real learning experiences, beyond theory.</p><ul>{items.map(item => <li key={item.title}><span className={styles.smallBadge}><HomeIcon name={item.icon} /></span><div><h3>{item.title}</h3><p>{item.description}</p></div></li>)}</ul></section>;
}

export function PhotoFrame({ src, alt, title, caption, className = "" }: { src: string; alt: string; title: string; caption?: string; className?: string }) {
  return <figure className={`${styles.photoFrame} ${className}`} data-reveal><div className={styles.photoFrameImage}><SolutionImageLightbox src={src} title={title} alt={alt} className={styles.imageTrigger}><Image src={src} alt={alt} fill sizes="(max-width: 700px) 92vw, 40vw" /><span className={styles.photoExpand} aria-hidden="true">↗</span></SolutionImageLightbox></div><figcaption><strong>{title}</strong>{caption && <p>{caption}</p>}</figcaption></figure>;
}

export function Skills({ items, title = "Skills students develop", description = "Beyond academics: habits that carry into the next challenge.", compact = false }: { items: string[]; title?: string; description?: string; compact?: boolean }) {
  const icons: HomeIconName[] = ["think", "stem", "creativity", "build", "students", "design", "innovation"];
  return <section className={`${styles.skills} ${compact ? styles.compactSkills : ""}`} data-reveal><div className={styles.sectionIntro}><h2>{title}</h2><p>{description}</p></div><ul>{items.map((item, i) => <li key={item}><HomeIcon name={icons[i % icons.length]} /><span>{item}</span></li>)}</ul></section>;
}

export function ProjectBriefs({ items, title = "Student Projects", dark = false }: { items: Topic[]; title?: string; dark?: boolean }) {
  return <section className={`${styles.projectBriefs} ${dark ? styles.darkBriefs : ""}`} data-reveal><div className={styles.panelHeading}><h2>{title}</h2><p>Example challenges, adapted to students’ age and experience.</p></div><div className={styles.briefGrid}>{items.map(item => <article key={item.title}><HomeIcon name={item.icon} /><h3>{item.title}</h3><p>{item.description}</p></article>)}</div><Link href="/projects" className={styles.textLink}>Explore our project archive <span aria-hidden="true">→</span></Link></section>;
}

export function LabEarth({ lab }: { lab: LabProgramme }) {
  return <EarthCta eyebrow={lab.name} title={lab.earthTitle} description={lab.earthDescription} actions={<><ButtonLink href="/contact" showArrow>Partner With Us</ButtonLink><ButtonLink href="/contact" variant="outline" className={styles.earthSecondary}>Get a Call Back</ButtonLink></>} />;
}
