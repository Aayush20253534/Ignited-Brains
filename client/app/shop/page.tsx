import type { Metadata } from "next";

import { AboutArtwork } from "@/components/about/about-artwork";
import { AboutMotion } from "@/components/about/about-motion";
import { Blueprint, ClosingScene, Journey, LearningImage, Status } from "@/components/engagement/page-elements";
import { HomeIcon, type HomeIconName } from "@/components/home/home-icon";
import { ButtonLink, Container } from "@/components/ui";
import { projectCards } from "@/data/projects";
import styles from "@/components/engagement/engagement.module.css";

export const metadata: Metadata = {
  title: "Shop",
  description: "Ignited Brains Shop is coming soon.",
  alternates: { canonical: "/shop" },
};

// These are the three areas announced by the original Shop page, not a product catalogue.
const previews = [
  { title: "Learning Kits", description: "Take curiosity beyond the classroom.", image: "/media/buil.jpeg", alt: "Students building an electronics project", icon: "build" as HomeIconName },
  { title: "Innovation Resources", description: "Make room for questions and new ideas.", image: "/media/tele.jpeg", alt: "Hands-on exploration with a telescope", icon: "space" as HomeIconName },
  { title: "Hands-on Educational Products", description: "Explore through making and experimenting.", image: "/media/exp.jpeg", alt: "Students working on a science experiment", icon: "stem" as HomeIconName },
];
const experience = [
  { step: "01", title: "Unbox", description: "Discover the components.", icon: "observe" as HomeIconName },
  { step: "02", title: "Build", description: "Bring the system together.", icon: "build" as HomeIconName },
  { step: "03", title: "Experiment", description: "Test ideas in the real world.", icon: "test" as HomeIconName },
  { step: "04", title: "Create", description: "Turn learning into something new.", icon: "innovation" as HomeIconName },
];
const audiences = [
  { title: "Students", description: "Explore beyond textbooks.", image: "/media/img.jpeg", alt: "Students exploring hands-on science" },
  { title: "Schools", description: "Bring hands-on learning into classrooms.", image: "/contact/partnership-learning.webp", alt: "An educator and student working on a robotics project" },
  { title: "Young Makers", description: "Turn ideas into working projects.", image: "/media/media-hero.png", alt: "A young maker assembling an educational rover" },
];
const rover = projectCards.find((project) => project.title === "Autonomous Rover Project")!;

export default function ShopPage() {
  return <AboutMotion><main className={styles.page}>
    <section className={`${styles.shopHero} ${styles.dark}`} aria-labelledby="shop-title">
      <Container wide className={styles.shopHeroGrid}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow} data-reveal>Ignited Brains Shop</p>
          <h1 id="shop-title" className={styles.heroTitle} data-reveal data-delay="1">Build.<br />Experiment.<br /><em>Discover.</em></h1>
          <p className={styles.lead} data-reveal data-delay="2">Hands-on learning kits and innovation resources are on their way.</p>
          <div data-reveal data-delay="3"><Status large>Coming Soon</Status><p className={styles.support}>Designed to take curiosity beyond the classroom.</p></div>
          <ButtonLink href="/projects" showArrow size="lg" className={`${styles.pill} ${styles.heroProjectLink}`}>Explore Our Projects</ButtonLink>
        </div>
        <div className={styles.shopArt}>
          <Blueprint />
          <div className={styles.orbit} aria-hidden="true"><i /></div>
          <AboutArtwork name="hero" priority alt="A friendly robot, rocket, globe and science experiments rising from an open book" className={styles.kitArtwork} />
          <span className={`${styles.artLabel} ${styles.artLabelTop}`} aria-hidden="true">Curiosity in motion</span>
          <span className={`${styles.artLabel} ${styles.artLabelBottom}`} aria-hidden="true">Ideas start here</span>
        </div>
        <div className={styles.heroFeatures}>
          {([{ icon: "build", title: "Hands-on Learning" }, { icon: "robotics", title: "STEM & Robotics" }, { icon: "innovation", title: "Built for Young Innovators" }] as { icon: HomeIconName; title: string }[]).map(item => <div key={item.title}><HomeIcon name={item.icon} /><span>{item.title}</span></div>)}
        </div>
      </Container>
    </section>

    <section className={styles.section} aria-labelledby="coming-title">
      <Container wide>
        <div className={styles.sectionHead} data-reveal><div><p className={styles.eyebrow}>What’s Coming</p><h2 id="coming-title" className={styles.title}>Learning you can <em>hold.</em></h2></div><p className={styles.intro}>We are preparing a dedicated shop for learning kits, innovation resources and hands-on educational products.</p></div>
        <div className={styles.previewGrid}>
          {previews.map((item, index) => <article key={item.title} className={styles.preview} data-reveal data-delay={index}>
            <LearningImage src={item.image} alt={item.alt} />
            <div className={styles.previewBody}><div className={styles.previewMeta}><span>0{index + 1}</span><Status /></div><HomeIcon name={item.icon} className={styles.previewIcon} /><h3>{item.title}</h3><p>{item.description}</p></div>
          </article>)}
        </div>
      </Container>
    </section>

    <section className={`${styles.makerSection} ${styles.dark}`} aria-labelledby="maker-title">
      <Container wide className={styles.makerGrid}>
        <div data-reveal><p className={styles.eyebrow}>Designed for Makers</p><h2 id="maker-title" className={styles.title}>From a box of parts<br />to a <em>working idea.</em></h2><p className={styles.copy}>Build, program and experiment. See how that approach comes to life in our student projects.</p>
          <ul className={styles.makerSteps}>{[{ title: "Build", copy: "Assemble real systems.", icon: "build" }, { title: "Program", copy: "Turn logic into movement.", icon: "robotics" }, { title: "Experiment", copy: "Test, improve and create.", icon: "test" }].map(item => <li key={item.title}><HomeIcon name={item.icon as HomeIconName} /><div><h3>{item.title}</h3><p>{item.copy}</p></div></li>)}</ul>
          <Status />
        </div>
        <figure className={styles.roverFigure} data-reveal data-delay="1">
          <div className={styles.roverVisual}><LearningImage src={rover.image} alt="Student-built rover with an electronics controller, sensors and wheels" sizes="(max-width: 767px) 100vw, 55vw" /><Blueprint /><span className={`${styles.roverLabel} ${styles.controller}`}>Controller</span><span className={`${styles.roverLabel} ${styles.sensors}`}>Sensors</span><span className={`${styles.roverLabel} ${styles.mobility}`}>Terrain mobility</span></div>
          <figcaption><span className={styles.eyebrow}>From Our Student Projects</span><h3>{rover.title}</h3><p>{rover.description}</p><ButtonLink href="/projects" variant="outline" className={styles.pill} showArrow>Explore Our Projects</ButtonLink></figcaption>
        </figure>
      </Container>
    </section>

    <section className={`${styles.section} ${styles.pale}`} aria-labelledby="experience-title">
      <Container wide><div data-reveal><p className={styles.eyebrow}>The Experience</p><h2 id="experience-title" className={styles.title}>Open. Build. Learn. <em>Repeat.</em></h2></div><Journey items={experience} label="Hands-on learning journey" /></Container>
    </section>

    <section className={styles.section} aria-labelledby="curious-title">
      <Container wide><div data-reveal><p className={styles.eyebrow}>Built for Curious Minds</p><h2 id="curious-title" className={styles.title}>Made for the minds<br />that keep asking <em>“why?”</em></h2></div>
        <div className={styles.audienceGrid}>{audiences.map((item, index) => <article key={item.title} className={styles.audience} data-reveal data-delay={index}><LearningImage src={item.image} alt={item.alt} /><div><span className={styles.step}>0{index + 1}</span><h3>{item.title}</h3><p>{item.description}</p></div></article>)}</div>
      </Container>
    </section>

    <ClosingScene eyebrow="The Next Chapter" title={<>Something exciting<br />is being <em>built.</em></>} comingSoon actions={<><ButtonLink href="/projects" size="lg" showArrow className={styles.pill}>Explore Our Projects</ButtonLink><ButtonLink href="/contact" size="lg" variant="outline" className={styles.pill}>Contact Us</ButtonLink></>}>The Ignited Brains Shop will bring hands-on learning closer to every curious mind.</ClosingScene>
  </main></AboutMotion>;
}
