import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { ProjectBrowser, ProjectDetailsButton } from "@/components/projects/project-browser";
import { buildStages, featuredRover, galleryScenes, journey } from "@/components/projects/projects-content";
import { ProjectsIcon, type ProjectsIconName } from "@/components/projects/projects-icon";
import { ProjectsMotion } from "@/components/projects/projects-motion";
import { ProjectsOverlay } from "@/components/projects/projects-overlay";
import { projectImpact, projectImpactBenefits, projectTestimonials } from "@/data/projects";
import styles from "@/components/projects/projects.module.css";

export const metadata: Metadata = {
  title: "Projects",
  description: "Explore Ignited Brains school projects, student builds, space labs, robotics experiences and science parks across India.",
  alternates: { canonical: "/projects" },
};

const impactIcons: ProjectsIconName[] = ["school", "lab", "students", "rocket"];
const benefitIcons: ProjectsIconName[] = ["students", "school", "rocket", "community"];

export default function ProjectsPage() {
  return (
    <ProjectsMotion>
      <main className={styles.page}>
        <section className={styles.hero} aria-labelledby="projects-title" data-motion-section>
          <div className={styles.heroScene}>
            <Image src="/projects-v2/hero-projects.webp" alt="Concept illustration of Indian students assembling an educational rover in a robotics lab" fill preload sizes="(max-width: 767px) 900px, 100vw" />
            <ProjectsOverlay name="hero" className={styles.heroOverlay} />
            <div className={styles.heroLabels} aria-hidden="true">
              <span>AI Vision</span><span>Sensors</span><span>Student Built</span><span>Real-world Testing</span>
            </div>
          </div>
          <div className={styles.container}>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow} data-reveal>Our Projects</p>
              <h1 id="projects-title" data-reveal>Where curiosity<br />becomes something<br />you can <em>build.</em></h1>
              <p className={styles.heroLead} data-reveal>From rockets and autonomous rovers to interactive science experiences, students turn questions into working ideas through hands-on exploration.</p>
              <div className={styles.actions} data-reveal>
                <a href="#project-showcase" className={styles.primaryButton}>Explore Projects <span aria-hidden="true">→</span></a>
                <a href="#project-impact" className={styles.outlineButton}>See Our Impact <span aria-hidden="true">↓</span></a>
              </div>
              <p className={styles.categoryLine} data-reveal>Space <i /> STEM <i /> AI &amp; Robotics <i /> Science</p>
            </div>
          </div>
          <div className={styles.impactRail}>
            <div className={styles.container}>
              <div className={styles.railLine} aria-hidden="true" />
              {projectImpact.map((metric, i) => <div key={metric.label} className={styles.railMetric}>
                <span className={styles.railNode} aria-hidden="true" style={{ animationDelay: `${i * .22}s` }} />
                <ProjectsIcon name={impactIcons[i]} />
                <div><strong data-count={metric.value} aria-hidden="true">{metric.value}</strong><span className={styles.srOnly}>{metric.value}</span><p>{metric.label}</p></div>
              </div>)}
            </div>
          </div>
        </section>

        <section id="project-showcase" className={styles.showcase} aria-labelledby="showcase-title" data-motion-section>
          <div className={styles.container}><ProjectBrowser /><p className={styles.sectionNote}>Project concept imagery. Programme details reflect our work.</p></div>
        </section>

        <section id="featured-project" className={styles.featured} aria-labelledby="rover-title" data-motion-section>
          <div className={styles.featuredScene}>
            <Image src="/projects-v2/featured-rover.webp" alt={featuredRover.alt} fill sizes="(max-width: 767px) 900px, 100vw" />
            <ProjectsOverlay name="rover" className={styles.roverOverlay} />
            <div className={styles.scanner} data-ambient aria-hidden="true" />
            <div className={styles.roverLabels} aria-hidden="true"><span>AI / Camera</span><span>Sensors</span><span>Controller</span><span>Terrain Mobility</span><span>Power System</span><span><i /> Live Data</span></div>
          </div>
          <div className={styles.container}>
            <div className={styles.featuredCopy} data-reveal>
              <p className={styles.eyebrow}>Featured Project / 01</p>
              <h2 id="rover-title" className={styles.title}>Building a rover<br />for <em>another world.</em></h2>
              <p className={styles.featuredName}>{featuredRover.title}</p>
              <p className={styles.featuredLead}>Student-built engineering. Rocky terrain.<br />Real-time data.</p>
              <ProjectDetailsButton project={featuredRover} className={styles.primaryButton}>View Project Details <span aria-hidden="true">→</span></ProjectDetailsButton>
            </div>
            <dl className={styles.roverFacts}>
              <div><dt>The Challenge</dt><dd>Navigate rocky terrain</dd></div>
              <div><dt>The Build</dt><dd>Environmental data + transmission</dd></div>
              <div><dt>The Learning</dt><dd>Hands-on engineering + coding</dd></div>
            </dl>
          </div>
        </section>

        <section className={styles.creation} aria-labelledby="journey-title" data-motion-section>
          <div className={styles.container}>
            <div className={styles.journeyHeader} data-reveal><p className={styles.eyebrow}>How Ideas Become Projects</p><h2 id="journey-title" className={styles.title}>It starts with a question.<br />It ends with <em>something real.</em></h2></div>
            <ol className={styles.journey} aria-label="Project creation journey">
              {journey.map((stage, i) => <li key={stage.title} data-reveal style={{ transitionDelay: `${i * 70}ms` }}><span className={styles.journeyIcon}><ProjectsIcon name={stage.icon} /></span><span className={styles.stageNumber}>0{i + 1}</span><h3>{stage.title}</h3><p>{stage.caption}</p></li>)}
            </ol>
            <div className={styles.buildSection}>
              <div className={styles.buildCopy} data-reveal><p className={styles.eyebrow}>Inside the Build</p><h2 className={styles.title}>The learning<br />happens in<br /><em>the build.</em></h2><p>Design. Assemble. Program.<br />Test an idea. Make it better.</p></div>
              <div className={styles.buildMosaic}>
                {buildStages.map((stage, i) => <figure key={stage.image} className={styles.buildTile} data-reveal style={{ transitionDelay: `${i * 60}ms` }}><Image src={`/projects-v2/${stage.image}.webp`} alt={stage.alt} fill sizes="(max-width: 767px) 90vw, (max-width: 1100px) 32vw, 460px" /><figcaption><ProjectsIcon name={stage.icon} /><span>{stage.title}</span></figcaption></figure>)}
              </div>
            </div>
          </div>
        </section>

        <section className={styles.voices} aria-labelledby="voices-title" data-motion-section>
          <div className={styles.container}>
            <div className={styles.voicesHeading} data-reveal><p className={styles.eyebrow}>Student Voices</p><h2 id="voices-title" className={styles.title}>Real experiences.<br />Lasting <em>impact.</em></h2></div>
            <div className={styles.voicesGrid}>
              <figure className={styles.studentMosaic} data-reveal>
                <div><Image src="/projects-v2/student-featured.webp" alt="Anonymous editorial illustration of a student beside a completed robotics project" fill sizes="(max-width: 767px) 60vw, 340px" /></div>
                <div><Image src="/projects-v2/student-secondary-01.webp" alt="Anonymous editorial illustration of a student experimenting with a sensor" fill sizes="(max-width: 767px) 30vw, 200px" /></div>
                <div><Image src="/projects-v2/student-secondary-02.webp" alt="Anonymous editorial illustration of students collaborating in a lab" fill sizes="(max-width: 767px) 30vw, 200px" /></div>
                <figcaption>Editorial student illustrations; not portraits of the quoted contributors.</figcaption>
              </figure>
              <div className={styles.quotes}>
                {projectTestimonials.map((quote, i) => <blockquote key={quote.name} data-reveal style={{ transitionDelay: `${i * 80}ms` }}><span aria-hidden="true">“</span><p>{quote.quote}</p><footer><strong>{quote.name}</strong><span>{quote.role}</span></footer></blockquote>)}
              </div>
            </div>
          </div>
        </section>

        <section className={styles.gallerySection} aria-labelledby="gallery-title" data-motion-section>
          <div className={styles.container}>
            <div className={styles.galleryHeader} data-reveal><div><p className={styles.eyebrow}>A Closer Look</p><h2 id="gallery-title" className={styles.title}>Curiosity, <em>in motion.</em></h2></div><p>Space. Robotics. Science.<br />A world to explore through making.</p></div>
            <div className={styles.gallery}>
              {galleryScenes.map((scene, i) => <figure key={scene.image} data-reveal style={{ transitionDelay: `${i * 65}ms` }}><Image src={`/projects-v2/${scene.image}.webp`} alt={scene.alt} fill sizes="(max-width: 767px) 90vw, (max-width: 1100px) 50vw, 640px" /><figcaption>{scene.caption}<span aria-hidden="true" /></figcaption></figure>)}
            </div>
          </div>
        </section>

        <section id="project-impact" className={styles.indiaSection} aria-labelledby="impact-title" data-motion-section>
          <div className={styles.container}>
            <div className={styles.indiaGrid}>
              <div className={styles.indiaCopy} data-reveal><p className={styles.eyebrow}>Projects Across India</p><h2 id="impact-title" className={styles.title}>Projects across classrooms.<br />Impact across <em>India.</em></h2><p>Bringing hands-on learning to schools and institutions across the country.</p></div>
              <figure className={styles.indiaVisual}>
                <picture data-network-picture data-motion="/projects-v2/projects-india-network.webp" data-poster="/projects-v2/projects-india-poster.webp">
                  <source media="(prefers-reduced-motion: reduce)" srcSet="/projects-v2/projects-india-poster.webp" />
                  <source data-network-source srcSet="/projects-v2/projects-india-poster.webp" />
                  <Image src="/projects-v2/projects-india-poster.webp" alt="Illustrated map of India with a conceptual learning network" width={680} height={720} unoptimized sizes="(max-width: 767px) 90vw, 40vw" />
                </picture>
                <ProjectsOverlay name="india" className={styles.indiaOverlay} />
                <figcaption>Conceptual learning network</figcaption>
              </figure>
              <div className={styles.indiaMetrics}>{projectImpact.map((metric, i) => <div key={metric.label} data-reveal><ProjectsIcon name={impactIcons[i]} /><div><strong>{metric.value}</strong><p>{metric.label}</p></div></div>)}</div>
            </div>
            <ul className={styles.impactBenefits}>{projectImpactBenefits.map((item, i) => <li key={item.label}><ProjectsIcon name={benefitIcons[i]} /><span>{item.label}</span></li>)}</ul>
          </div>
        </section>

        <section className={styles.finalScene} aria-labelledby="next-project-title" data-motion-section>
          <Image src="/projects-v2/final-earth.webp" alt="" fill sizes="(max-width: 767px) 1200px, 100vw" />
          <ProjectsOverlay name="earth" className={styles.earthOverlay} />
          <div className={`${styles.container} ${styles.finalGrid}`}>
            <div data-reveal><p className={styles.eyebrow}>Build the Next Project</p><h2 id="next-project-title" className={styles.title}>What will your<br />students <em>create?</em></h2><p>Bring hands-on Space, STEM, AI and Robotics experiences to your school.</p></div>
            <div className={styles.actions} data-reveal><Link href="/contact" className={styles.primaryButton}>Partner With Us <span aria-hidden="true">→</span></Link><Link href="/solutions" className={styles.outlineButton}>Explore Solutions <span aria-hidden="true">↗</span></Link></div>
          </div>
        </section>
      </main>
    </ProjectsMotion>
  );
}
