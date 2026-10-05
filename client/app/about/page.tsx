import type { Metadata } from "next";
import Image from "next/image";
import { EarthCta } from "@/components/layout/earth-cta";
import type { ReactNode } from "react";
import Link from "next/link";
import { AboutArtwork } from "@/components/about/about-artwork";
import { AboutMotion } from "@/components/about/about-motion";
import { HomeIcon, type HomeIconName } from "@/components/home/home-icon";
import { ArrowIcon } from "@/components/ui";
import { aboutValues, storyMilestones } from "@/data/about";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn how Ignited Brains is building hands-on, future-ready learning environments that turn curiosity into creativity and innovation.",
  alternates: { canonical: "/about" },
};

function Action({ href, children, primary = false }: { href: string; children: ReactNode; primary?: boolean }) {
  return <Link href={href} className={`${styles.button} ${primary ? styles.primary : styles.outline}`}>{children}<ArrowIcon className="h-4 w-4" /></Link>;
}
function Badge({ name, orange = false }: { name: HomeIconName; orange?: boolean }) {
  return <span className={`${styles.badge} ${orange ? styles.orange : ""}`}><HomeIcon name={name} /></span>;
}
function Orbit({ small = false }: { small?: boolean }) {
  return <div className={`${styles.orbitArt} ${small ? styles.smallOrbit : ""}`}>
    <AboutArtwork name="earth" alt="A rotating blue and ivory Earth with moving orbital planets" className={styles.earth} />
    <span className={styles.orbitBadge}><Badge name="school" /></span>
    <span className={styles.orbitBadge}><Badge name="innovation" orange /></span>
    <span className={styles.orbitBadge}><Badge name="creativity" orange /></span>
  </div>;
}
const strengths: { title: string; icon: HomeIconName }[] = [
  { title: "Hands-on Learning", icon: "stem" }, { title: "Real-world Problem Solving", icon: "creativity" },
  { title: "Technology Driven", icon: "robotics" }, { title: "Future Ready Minds", icon: "innovation" },
];
const exploration: { title: string; description: string; icon: HomeIconName }[] = [
  { title: "Explore", description: "Open minds to new possibilities.", icon: "observe" },
  { title: "Experiment", description: "Turn curiosity into hands-on learning.", icon: "test" },
  { title: "Create", description: "Build, prototype and iterate.", icon: "build" },
  { title: "Innovate", description: "Apply ideas to real-world impact.", icon: "innovation" },
];
const approach: { title: string; description: string; icon: HomeIconName }[] = [
  { title: "Hands-on Experiences", description: "Learning by doing, not just observing.", icon: "stem" },
  { title: "Real-world Projects", description: "Solving meaningful problems.", icon: "test" },
  { title: "Guidance & Mentorship", description: "Support from experts and educators.", icon: "innovation" },
];

export default function AboutPage() {
  return <AboutMotion><main className={styles.page}>
    <section className={styles.hero} aria-labelledby="about-title">
      <div className={`${styles.container} ${styles.heroGrid}`}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow} data-reveal>About Ignited Brains</p>
          <h1 id="about-title" data-reveal data-delay="1">Education should<br className={styles.desktopBreak} /> do more than teach.<br className={styles.desktopBreak} /> It should <em>ignite.</em></h1>
          <p className={styles.heroDescription} data-reveal data-delay="2">Ignited Brains creates future-ready learning environments where curiosity becomes experimentation, creativity becomes creation and innovation becomes action.</p>
          <div className={styles.heroActions} data-reveal data-delay="3"><Action href="#our-story" primary>Our Story</Action><Action href="/solutions">Explore Our Solutions</Action></div>
          <div className={styles.strengths} data-reveal data-delay="4">{strengths.map((item, i) => <div key={item.title}><Badge name={item.icon} orange={i === 3} /><span>{item.title}</span></div>)}</div>
        </div>
        <div className={styles.heroArt}>
          <div className={styles.heroOrbit} aria-hidden="true"><i /><i /><i /></div>
          <div className={styles.heroOrbitSecond} aria-hidden="true"><i /><i /></div>
          <div className={styles.heroPhoto} data-reveal data-delay="2">
            <Image src="/about/hero-inquiry.webp" alt="Students investigating an optics experiment and sensor circuit together at an innovation workbench" fill preload sizes="(max-width: 767px) 90vw, 46vw" />
          </div>
        </div>
      </div>
    </section>

    <section className={styles.belief} aria-labelledby="belief-title">
      <div className={styles.container}>
        <div className={styles.beliefTop}>
          <div data-reveal><p className={styles.eyebrow}>Our Belief</p><h2 id="belief-title">We don’t teach students what to think.<br /><em>We create environments where they learn how to discover.</em></h2></div>
          <blockquote data-reveal data-delay="1"><span aria-hidden="true">“</span><p>Curiosity leads to questions.<br />Questions lead to experimentation.<br />Experimentation leads to creation.<br />And creation leads to a better tomorrow.</p></blockquote>
        </div>
        <div className={styles.values}>{aboutValues.map((value, index) => <article key={value.title} className={styles.valueCard} data-reveal data-delay={index}>
          <Badge name={value.icon} orange={index !== 1} /><div><h3>{value.title}</h3><p>{index === 0 ? "Ask better questions. Explore beyond the obvious." : index === 1 ? "Build what you imagine. Turn ideas into meaningful solutions." : "Turn ideas into action. Create real-world impact."}</p></div>
        </article>)}</div>
      </div>
    </section>

    <section className={styles.learning} aria-labelledby="learning-title">
      <div className={`${styles.container} ${styles.learningGrid}`}>
        <div data-reveal><p className={styles.eyebrow}>What Ignited Brains Is</p><h2 id="learning-title">Learning becomes powerful when students can touch, build, test <em>and question it.</em></h2></div>
        <div className={styles.learningCopy} data-reveal data-delay="1"><p>Ignited Brains designs and delivers hands-on, inquiry-driven learning experiences that connect real-world problems with creativity, technology and scientific thinking.</p><p>We work with students, educators and institutions to build programs, products and ecosystems that make learning active, meaningful and future-ready.</p><Action href="#our-story">Know More About Us</Action></div>
        <div className={styles.exploration}><Orbit small /><div className={styles.explorationList}>{exploration.map((item, index) => <div key={item.title} data-reveal data-delay={index}><Badge name={item.icon} orange={index === 1} /><div><h3>{item.title}</h3><p>{item.description}</p></div></div>)}</div></div>
      </div>
    </section>

    <section id="our-story" className={`${styles.story} ${styles.dark}`} aria-labelledby="story-title">
      <AboutArtwork name="story" className={styles.backdrop} />
      <div className={`${styles.container} ${styles.storyGrid}`}>
        <div className={styles.storyCopy} data-reveal><p className={styles.eyebrow}>Our Story</p><h2 id="story-title">A journey driven<br />by curiosity and<br />a belief in <em>young minds.</em></h2><p>Ignited Brains began with a simple belief — every student has the potential to create real change, given the right environment, tools and inspiration. What started as an idea is a growing movement to bring hands-on learning spaces into schools across India.</p><Action href="#journey">Our Full Story</Action></div>
        <ol id="journey" className={styles.timeline} aria-label="Our journey">{storyMilestones.map((item, index) => <li key={item.title} data-reveal data-delay={index}><Badge name={(["creativity", "students", "projects", "space", "innovation"] as HomeIconName[])[index]} orange={index % 2 === 1} /><h3>{item.title}</h3><p>{item.description}</p></li>)}</ol>
      </div>
    </section>

    <section className={styles.purpose} aria-labelledby="mission-title">
      <div className={`${styles.container} ${styles.purposeGrid}`}>
        <div data-reveal><p className={styles.eyebrow}>Our Purpose</p><div className={styles.purposeTitle}><span>01</span><h2 id="mission-title">Our Mission</h2></div><p className={styles.purposeText}>To create engaging, hands-on learning experiences that make students curious, confident and future-ready.</p></div>
        <Orbit />
        <div data-reveal data-delay="1"><div className={styles.purposeTitle}><span>02</span><h2>Our Vision</h2></div><p className={styles.purposeText}>To build a generation of thinkers, creators and problem solvers who use science to shape a better tomorrow and build India’s future.</p></div>
      </div>
    </section>

    <section className={styles.approach} aria-labelledby="approach-title">
      <div className={`${styles.container} ${styles.approachGrid}`}>
        <div data-reveal><p className={styles.eyebrow}>Our Approach</p><h2 id="approach-title">From curiosity<br />to <em>real-world impact.</em></h2><p>We combine experiential learning, technology and mentorship to create programs that go beyond textbooks and prepare students for the challenges of tomorrow.</p><Action href="/solutions">Explore Our Approach</Action></div>
        <div className={styles.approachCards}>{approach.map((item, index) => <article key={item.title} data-reveal data-delay={index}><Badge name={item.icon} orange={index === 1} /><h3>{item.title}</h3><p>{item.description}</p></article>)}</div>
      </div>
    </section>

    <section className={`${styles.impact} ${styles.dark}`} aria-labelledby="impact-title">
      <AboutArtwork name="impact" className={styles.backdrop} />
      <div className={styles.container}>
        <div className={styles.impactCopy} data-reveal><p className={styles.eyebrow}>Our Impact</p><h2 id="impact-title">Empowering<br />the next generation<br />of <em>innovators.</em></h2><p>Through our programs, initiatives and community, we help students discover their potential and turn ideas into impactful solutions.</p><Action href="/projects">See Our Work</Action></div>
        <span className={styles.impactNote}>Small Learners<br />Big Ideas</span>
        <div className={styles.impactLabels}>{[{icon:"students",title:"Students Engaged"},{icon:"observe",title:"Learning Programs"},{icon:"school",title:"Communities Built"},{icon:"build",title:"Ideas Turned Into Action"}].map((item,index)=><div key={item.title} data-reveal data-delay={index}><Badge name={item.icon as HomeIconName}/><span>{item.title}</span></div>)}</div>
      </div>
    </section>

    <EarthCta eyebrow="Let’s Build Together" title={<>The future belongs to curious minds.</>} description={<>Partner with us to create impactful learning experiences for students and communities.</>} actions={<Action href="/contact" primary>Partner With Us</Action>} />
  </main></AboutMotion>;
}
