import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { HomeIcon } from "@/components/home/home-icon";
import { EarthCta } from "@/components/layout/earth-cta";
import { LearningJourney, SolutionPage } from "@/components/solutions/learning-space";
import { ButtonLink } from "@/components/ui";
import { learningCycle } from "@/data/home";
import { projectImpact } from "@/data/projects";
import { solutionHeroPrinciples, solutionShowcase } from "@/data/solutions";
import styles from "@/components/solutions/solutions.module.css";

const description = "Explore Ignited Brains Space Labs, STEM Labs, AI & Robotics Labs and Science Parks designed for hands-on, future-ready learning.";
export const metadata: Metadata = {
  title: "Solutions", description, alternates: { canonical: "/solutions" },
  openGraph: { title: "Learning spaces built for tomorrow | Ignited Brains", description, url: "/solutions", type: "website", images: [{ url: "/learning-spaces/ecosystem-lab.webp", alt: "The Ignited Brains Curiosity Corner lab" }] },
  twitter: { card: "summary_large_image", title: "Learning spaces built for tomorrow | Ignited Brains", description, images: ["/learning-spaces/ecosystem-lab.webp"] },
};

const comparison = [
  { label: "Key focus", values: ["Astronomy & space science", "Science & engineering", "Robotics, coding & AI", "Interactive physical science"] },
  { label: "Age / classes", values: ["Typically classes 6–12", "Typically classes 6–12", "Typically classes 6–12", "Across age groups"] },
  { label: "Environment", values: ["Indoor observation & model lab", "Indoor experimentation lab", "Indoor hardware & software lab", "Outdoor exploration space"] },
  { label: "Student outcomes", values: ["Scientific curiosity & research", "Experimentation & design thinking", "Logical thinking & technical skills", "Experiential understanding & inquiry"] },
];
const focus = ["Astronomy · Rocketry · Space Exploration", "Science · Engineering · Mathematics", "Robotics · Artificial Intelligence · Automation", "Exploration · Interaction · Outdoor Learning"];

export default function SolutionsPage() {
  return <SolutionPage>
    <section className={styles.overviewHero} aria-labelledby="solutions-title" data-motion-section>
      <div className={styles.ecosystem}><Image src="/learning-spaces/ecosystem-lab.webp" alt="Visitors exploring a real Ignited Brains learning space with space, STEM and robotics exhibits" fill preload sizes="(max-width: 700px) 100vw, 65vw" /><div className={styles.ecosystemDetail}><Image src="/media/build.webp" alt="An educator explaining the lunar lander and physical engineering models at Curiosity Corner" fill sizes="(max-width: 700px) 38vw, 20vw" /></div><span className={styles.ecosystemLabel}>Space · STEM · Robotics · Outdoor discovery</span></div>
      <div className={`${styles.container} ${styles.overviewHeroInner}`}><div className={styles.overviewCopy}>
        <p className={styles.eyebrow} data-reveal>Our Solutions</p><h1 id="solutions-title" data-reveal>Learning spaces<br /><em>built for tomorrow.</em></h1>
        <p className={styles.heroDescription} data-reveal>From space science to robotics, we create environments where students explore, experiment, build and solve real-world problems.</p>
        <div className={styles.actions} data-reveal><ButtonLink href="#solutions" showArrow>Explore Solutions</ButtonLink><ButtonLink href="/contact" variant="outline">Partner With Us</ButtonLink></div>
        <ul className={styles.principles} data-reveal>{solutionHeroPrinciples.map(item => <li key={item.title}><HomeIcon name={item.icon} /><span>{item.title}</span></li>)}</ul>
      </div></div>
    </section>

    <section id="solutions" className={`${styles.container} ${styles.spacesSection}`} aria-labelledby="spaces-title" data-motion-section>
      <div className={styles.sectionHeading} data-reveal><div><p className={styles.eyebrow}>Explore</p><h2 id="spaces-title">Choose your learning space</h2><p>Four environments. One shared purpose — future-ready students.</p></div><Link href="/contact" className={styles.textLink}>Find your school’s fit <span aria-hidden="true">→</span></Link></div>
      <div className={styles.spaceCards}>{solutionShowcase.map((space, i) => <Link key={space.slug} href={space.href} className={styles.spaceCard} data-reveal style={{ transitionDelay: `${i * 70}ms` }}><Image src={space.image} alt={space.imageAlt} fill sizes="(max-width: 700px) 92vw, (max-width: 1100px) 44vw, 24vw" /><span className={styles.cardShade} /><span className={styles.cardIndex}>{space.index}</span><div className={styles.spaceCardCopy}><h3>{space.kicker}</h3><p>{space.description}</p><span className={styles.cardFocus}><HomeIcon name={space.icon} />{focus[i]}</span>{space.slug === "science-park" && <span className={styles.cardConcept}>Illustrative programme concept</span>}</div><span className={styles.cardArrow} aria-hidden="true">→</span></Link>)}</div>
    </section>

    <LearningJourney title="Our learning cycle" steps={learningCycle.map(step => ({ title: step.title, description: step.description.replace("\n", ". ") + ".", icon: step.icon }))} description="A simple, powerful cycle that turns curiosity into real-world skills." />

    <section className={`${styles.container} ${styles.comparisonSection}`} aria-labelledby="compare-title" data-reveal>
      <div className={styles.sectionIntro}><p className={styles.eyebrow}>Compare</p><h2 id="compare-title">Which solution is right for your school?</h2><p>Choose one space or a combination. Activities and complexity are adapted to your students.</p></div>
      <div className={styles.comparisonWrap} role="region" aria-label="Compare four learning spaces" tabIndex={0}><table className={styles.comparison}><caption className={styles.srOnly}>Learning-space focus, typical age, environment and student outcomes</caption><thead><tr><th scope="col">Compare</th>{solutionShowcase.map(space => <th scope="col" key={space.slug}><Link href={space.href}>{space.kicker}</Link></th>)}</tr></thead><tbody>{comparison.map(row => <tr key={row.label}><th scope="row">{row.label}</th>{row.values.map((value, i) => <td key={i}>{value}</td>)}</tr>)}</tbody></table></div>
    </section>

    <section className={`${styles.container} ${styles.impactSection}`} aria-labelledby="solutions-impact" data-motion-section><div className={styles.sectionIntro} data-reveal><p className={styles.eyebrow}>Real impact</p><h2 id="solutions-impact">Curious minds.<br />Brighter tomorrows.</h2><p>Join schools across India creating meaningful, hands-on learning experiences.</p></div><div className={styles.impactMetrics}>{projectImpact.map(metric => <div key={metric.label} data-reveal><HomeIcon name={metric.icon} /><div><strong data-count={metric.value} aria-hidden="true">{metric.value}</strong><span className={styles.srOnly}>{metric.value}</span><p>{metric.label}</p></div></div>)}</div><blockquote className={styles.principalQuote} data-reveal><p>“Ignited Brains turns curiosity into real opportunities.”</p><footer>— School Principal</footer></blockquote></section>

    <EarthCta eyebrow="Our Solutions" title="Let’s build innovation in your school." description="Discover how Ignited Brains can create a future-ready learning environment for your students." actions={<ButtonLink href="/contact" showArrow>Partner With Us</ButtonLink>} />
  </SolutionPage>;
}
