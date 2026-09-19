import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Atom,
  Bot,
  Boxes,
  CirclePlay,
  FlaskConical,
  Lightbulb,
  Mail,
  MapPin,
  Phone,
  Rocket,
  School,
  Share2,
  Sparkles,
  Telescope,
  TestTube2,
  Wrench,
} from "lucide-react";
import { Header } from "@/components/home/header";
import { Artwork } from "@/components/home/artwork";
import { Instagram, Linkedin, Twitter, Youtube } from "@/components/home/social-icons";
import styles from "./solutions.module.css";

export const metadata: Metadata = {
  title: "Our Solutions | Ignited Brains",
  description:
    "Future-ready Space, STEM, AI & Robotics and Science Park learning environments for schools.",
};

const solutionRows = [
  {
    number: "01",
    eyebrow: "Space Lab",
    title: "Space science students can touch.",
    description:
      "A hands-on environment where students explore space science through models, observation and experimentation.",
    bullets: [
      [Rocket, "Rocket & satellite models"],
      [Telescope, "Telescopes & celestial observation"],
      [Sparkles, "Real space science experiences"],
    ],
    image: "/images/solutions/space-lab.jpg",
    imageAlt: "Student using a telescope beside model rockets",
    cta: "Explore Space Lab",
    imageFirst: false,
  },
  {
    number: "02",
    eyebrow: "STEM Lab",
    title: "Observe. Think. Design. Build.",
    description:
      "A hands-on learning space where students learn STEM through experimentation, engineering and problem solving.",
    bullets: [
      [FlaskConical, "Science experiments"],
      [Boxes, "Engineering models"],
      [Atom, "Mathematics in action"],
      [Wrench, "Electronics and mechanics"],
    ],
    image: "/images/solutions/stem-lab.jpg",
    imageAlt: "Students building a STEM model together",
    cta: "Explore STEM Lab",
    imageFirst: true,
  },
  {
    number: "03",
    eyebrow: "AI & Robotics Lab",
    title: "Code it. Build it. Make it move.",
    description:
      "Students program, prototype and build real-world systems using robotics, coding, AI and digital fabrication.",
    bullets: [
      [Bot, "Robotics & automation"],
      [TestTube2, "Coding & AI projects"],
      [Wrench, "3D printing & prototyping"],
      [Atom, "Real-world applications"],
    ],
    image: "/images/solutions/ai-robotics.jpg",
    imageAlt: "Student working with an educational robot",
    cta: "Explore AI & Robotics",
    imageFirst: false,
  },
  {
    number: "08",
    eyebrow: "Science Park",
    title: "Where science becomes play.",
    description:
      "Interactive science spaces where students discover scientific concepts through movement, experimentation and exploration.",
    bullets: [
      [School, "Interactive exhibits"],
      [Atom, "Physical science models"],
      [Sparkles, "Outdoor learning spaces"],
      [Lightbulb, "Fun, hands-on learning"],
    ],
    image: "/images/solutions/science-park.jpg",
    imageAlt: "Children exploring an outdoor science park",
    cta: "Explore Science Park",
    imageFirst: true,
  },
] as const;

const learningSteps = [
  ["01", "Observe", Telescope],
  ["02", "Think", Lightbulb],
  ["03", "Design", Wrench],
  ["04", "Build", Boxes],
  ["05", "Test", FlaskConical],
  ["06", "Improve", Sparkles],
  ["07", "Share", Share2],
] as const;

const solutionTabs = [
  ["Space Lab", Rocket],
  ["STEM Lab", FlaskConical],
  ["AI & Robotics Lab", Bot],
  ["Science Park", Atom],
] as const;

export default function SolutionsPage() {
  return (
    <div className={`home-page ${styles.page}`}>
      <Header />

      <main id="main-content">
        <section className={styles.hero}>
          <div className={`container ${styles.heroInner}`}>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>Our Solutions</p>
              <h1>
                From classrooms
                <br />
                to <span>innovation spaces.</span>
              </h1>
              <p className={styles.heroLead}>
                We design and build hands-on learning environments that make science tangible,
                technology accessible and innovation part of everyday school life.
              </p>
              <div className={styles.heroActions}>
                <Link href="#solution-list" className={styles.primaryButton}>
                  Explore Our Solutions <ArrowRight />
                </Link>
                <a href="#learning-system" className={styles.secondaryButton}>
                  <CirclePlay /> Watch Video
                </a>
              </div>
            </div>

            <div className={styles.heroVisual} aria-label="Young student building a robotics project">
              <img src="/images/solutions/hero.jpg" alt="Student building a robotics project in a future-ready lab" />
            </div>
          </div>

          <div className={`container ${styles.heroBenefits}`}>
            <div><Sparkles /><span>Future-ready<br />infrastructure</span></div>
            <div><Wrench /><span>Hands-on<br />learning</span></div>
            <div><Lightbulb /><span>Real-world<br />Problem Solving</span></div>
            <div><Rocket /><span>Inspiring<br />the Next Generation</span></div>
          </div>
        </section>

        <section className={styles.solutionList} id="solution-list">
          <div className={`container ${styles.solutionStack}`}>
            {solutionRows.map((solution) => (
              <article
                key={solution.eyebrow}
                className={`${styles.solutionCard} ${solution.imageFirst ? styles.imageFirst : ""}`}
              >
                <div className={styles.solutionCopy}>
                  <div className={styles.solutionHeadingRow}>
                    <span className={styles.solutionNumber}>{solution.number}</span>
                    <div>
                      <p className={styles.solutionEyebrow}>{solution.eyebrow}</p>
                      <h2>{solution.title}</h2>
                    </div>
                  </div>
                  <p className={styles.solutionDescription}>{solution.description}</p>
                  <ul className={styles.solutionBullets}>
                    {solution.bullets.map(([Icon, label]) => (
                      <li key={label}>
                        <Icon />
                        <span>{label}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/#contact" className={styles.primaryButton}>
                    {solution.cta} <ArrowRight />
                  </Link>
                </div>
                <div className={styles.solutionImage}>
                  <img src={solution.image} alt={solution.imageAlt} />
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.learningSystem} id="learning-system">
          <div className={`container ${styles.learningGrid}`}>
            <div className={styles.learningCopy}>
              <p className={styles.mutedEyebrow}>The Ignited Brains Learning System</p>
              <h2>Built around how<br />students actually learn.</h2>
              <p>
                A continuous cycle of curiosity, exploration, creation and improvement.
              </p>
              <a href="#solution-finder" className={styles.primaryButton}>
                Learn More <ArrowRight />
              </a>
            </div>

            <div className={styles.learningDiagram} aria-label="Ignited Brains learning cycle">
              <div className={styles.orbitOne} />
              <div className={styles.orbitTwo} />
              <div className={styles.centerBadge}>
                <strong>CREATE</strong>
                <span>A BRIGHTER</span>
                <strong>TOMORROW</strong>
              </div>
              {learningSteps.map(([number, label, Icon], index) => (
                <div key={label} className={`${styles.stepNode} ${styles[`step${index + 1}`]}`}>
                  <small>{number}</small>
                  <span><Icon /></span>
                  <b>{label}</b>
                </div>
              ))}
              <span className={styles.diagramNote}>Learning<br />Today,<br /><b>Leading<br />Tomorrow</b></span>
              <Rocket className={styles.diagramRocket} />
            </div>
          </div>
        </section>

        <section className={styles.finder} id="solution-finder">
          <div className={`container ${styles.finderInner}`}>
            <p className={styles.mutedEyebrow}>Find the right solution</p>
            <h2>Choose a solution to explore</h2>
            <p className={styles.finderLead}>
              Each learning space is designed to spark curiosity and build future-ready skills.
            </p>

            <div className={styles.finderGrid}>
              <div className={styles.tabs}>
                {solutionTabs.map(([label, Icon], index) => (
                  <a key={label} href={index === 0 ? "#solution-list" : "#solution-list"} className={index === 0 ? styles.activeTab : ""}>
                    <Icon />
                    <span>{label}</span>
                  </a>
                ))}
              </div>

              <article className={styles.previewCard}>
                <img src="/images/solutions/space-choice.jpg" alt="Student inspired by space exploration" />
                <div>
                  <h3>Space Lab</h3>
                  <p>Inspiring the next generation of space explorers through hands-on learning.</p>
                  <ul>
                    <li>Models</li>
                    <li>Experiments</li>
                    <li>Observation</li>
                    <li>Exploration</li>
                  </ul>
                  <Link href="/#contact" className={styles.primaryButton}>Explore Space Lab <ArrowRight /></Link>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className={styles.testimonial} aria-label="School testimonial">
          <img src="/images/solutions/testimonial.jpg" alt="Student imagining the future of space and science" />
          <div className={`container ${styles.testimonialInner}`}>
            <blockquote>“Ignited Brains turns curiosity<br />into real opportunities.”</blockquote>
            <span>— School Principal</span>
            <div className={styles.testimonialRight}>
              <strong>Curious Minds<br />Brighter Tomorrows</strong>
              <p>Join the movement<br />across schools in India.</p>
            </div>
          </div>
        </section>

        <section className={styles.schoolCta}>
          <img src="/images/solutions/school-cta.jpg" alt="Earth glowing from space" />
          <div className={`container ${styles.schoolCtaInner}`}>
            <div>
              <h2>Let&apos;s build innovation<br />in your school.</h2>
              <p>Discover how Ignited Brains can create a future-ready<br />learning environment for your students.</p>
            </div>
            <a href="#contact" className={styles.primaryButton}>Discuss Your School <ArrowRight /></a>
          </div>
        </section>
      </main>

      <footer className={styles.footer} id="contact">
        <div className={`container ${styles.footerGrid}`}>
          <div className={styles.footerBrand}>
            <Link href="/" aria-label="Ignited Brains home">
              <Artwork region={[29, 1848, 94, 46]} alt="Ignited Brains" />
            </Link>
            <p>Transforming Education<br />Through Innovation.</p>
            <div className={styles.socials}>
              <a href="#" aria-label="YouTube"><Youtube /></a>
              <a href="#" aria-label="Instagram"><Instagram /></a>
              <a href="#" aria-label="LinkedIn"><Linkedin /></a>
              <a href="#" aria-label="Twitter"><Twitter /></a>
            </div>
          </div>

          <div>
            <h3>Quick Links</h3>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/solutions">Solutions</Link></li>
              <li><Link href="/#learning-system">How It Works</Link></li>
              <li><Link href="/#projects">Projects</Link></li>
              <li><Link href="/#our-story">Media</Link></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3>Our Solutions</h3>
            <ul>
              <li><a href="#solution-list">Space Lab</a></li>
              <li><a href="#solution-list">STEM Lab</a></li>
              <li><a href="#solution-list">AI & Robotics Lab</a></li>
              <li><a href="#solution-list">Science Park</a></li>
            </ul>
          </div>

          <div className={styles.contactColumn}>
            <h3>Contact Us</h3>
            <a href="tel:+919454488061"><Phone /> +91 94544 88061</a>
            <a href="mailto:info@ignitedbrains.com"><Mail /> info@ignitedbrains.com</a>
            <p><MapPin /> Prayagraj, Uttar Pradesh, India</p>
          </div>

          <div>
            <h3>Newsletter</h3>
            <p>Stay updated with our latest<br />programs and innovations.</p>
            <form className={styles.newsletter}>
              <input type="email" placeholder="Enter your email" aria-label="Email address" />
              <button type="submit" aria-label="Subscribe"><ArrowRight /></button>
            </form>
          </div>
        </div>

        <div className={`container ${styles.footerBottom}`}>
          <span>© 2026 Ignited Brains. All Rights Reserved.</span>
          <span>Privacy Policy&nbsp;&nbsp;|&nbsp;&nbsp;Terms & Conditions</span>
          <span className={styles.footerScript}>Building future,<br />one curious mind at a time</span>
        </div>
      </footer>
    </div>
  );
}
