import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { AboutMotion } from "@/components/about/about-motion";
import { ContinuousRow } from "@/components/home/continuous-row";
import { HomeIcon } from "@/components/home/home-icon";
import { AnimatedEarth } from "@/components/layout/animated-earth";
import { ArrowIcon, ButtonLink, Container } from "@/components/ui";
import { aboutPrinciples, aboutValues, differentiators, discoveryJourney, indiaCommitments, storyMilestones } from "@/data/about";
import { pageAssetSlots } from "@/lib/assets";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn how Ignited Brains is building hands-on, future-ready learning environments that turn curiosity into creativity and innovation.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main className={`about-page ${styles.page}`}>
      <section className={styles.hero} aria-labelledby="about-heading">
        <Container wide className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow} data-about-enter>About Ignited Brains</p>
            <h1 id="about-heading" data-about-enter data-about-delay="80">
              Education should do more than teach. It should <span>ignite.</span>
            </h1>
            <p className={styles.lead} data-about-enter data-about-delay="160">
              We create future-ready learning environments where students turn curiosity into experiments, ideas into creations and learning into action.
            </p>
            <div className={styles.heroActions} data-about-enter data-about-delay="240">
              <ButtonLink href="#our-story" size="lg" showArrow>Our Story</ButtonLink>
              <ButtonLink href="/solutions" size="lg" variant="outline" showArrow>Explore Our Solutions</ButtonLink>
            </div>
            <div className={styles.principles}>
              {aboutPrinciples.map((item, index) => (
                <div key={item.title} data-about-enter data-about-delay={String(280 + index * 80)}>
                  <span className={styles.roundIcon}><HomeIcon name={item.icon} className="h-5 w-5" /></span>
                  <div><h2>{item.title}</h2><p>{item.description}</p></div>
                </div>
              ))}
            </div>
          </div>
          <div className={`about-hero-art ${styles.heroArt}`} data-about-loop>
            <div className="about-hero-orbit about-hero-orbit--outer" aria-hidden="true"><span /><span /><span /></div>
            <div className="about-hero-orbit about-hero-orbit--inner" aria-hidden="true"><span /><span /><span /></div>
            <div className="about-hero-orbit about-hero-orbit--third" aria-hidden="true"><span /><span /><span /></div>
            <div className="about-hero-sparks" aria-hidden="true"><span /><span /><span /><span /></div>
            <div className="about-hero-illustration absolute inset-3 sm:inset-5">
              <Image src={pageAssetSlots.about.hero} alt="An open book bringing a rocket, robot and science experiments to life" fill preload sizes="(max-width: 767px) 85vw, (max-width: 1023px) 55vw, 46vw" className="object-contain object-center" />
            </div>
          </div>
        </Container>
      </section>

      <section className={`${styles.section} ${styles.idea}`} data-about-section="idea" aria-labelledby="idea-heading">
        <Container wide className={styles.ideaGrid}>
          <div className={styles.copy} data-about-enter>
            <p className={styles.eyebrow}>Our Big Idea</p>
            <h2 id="idea-heading" className={styles.heading}>A question today.<br /><span>A possibility tomorrow.</span></h2>
            <p>Education should inspire students to question, explore, experiment and build real solutions for real-world challenges.</p>
            <ButtonLink href="/solutions" variant="outline" showArrow>Our Philosophy</ButtonLink>
          </div>
          <div className={styles.discovery}>
            <p className={styles.journeyLabel}>From a question to a brighter tomorrow</p>
            <div data-about-loop>
              <ContinuousRow label="Our Big Idea discovery journey" variant="idea" duration={20}>
                {discoveryJourney.map((step, index) => (
                  <div key={step.title} className={`home-marquee-item idea-step ${styles.ideaStep}`}>
                    <span className={styles.stepNumber}>0{index + 1}</span>
                    <span className={`idea-step-icon ${styles.ideaIcon}`}><HomeIcon name={step.icon} className="h-6 w-6" /></span>
                    <h3>{step.title}</h3><p>{step.caption}</p>
                    {index < discoveryJourney.length - 1 ? <span className={`idea-step-connector ${styles.ideaConnector}`} aria-hidden="true"><span /><ArrowIcon className="h-4 w-4" /></span> : null}
                  </div>
                ))}
              </ContinuousRow>
            </div>
          </div>
        </Container>
      </section>

      <section className={styles.section} data-about-section="values" aria-labelledby="values-heading">
        <Container wide>
          <div className={styles.sectionIntro} data-about-enter>
            <div><p className={styles.eyebrow}>Our Values</p><h2 id="values-heading" className={styles.heading}>Curiosity. Creativity.<br className={styles.mobileBreak} /> Innovation.</h2></div>
            <p>The beliefs behind every learning space we create.</p>
          </div>
          <div data-about-loop>
            <ContinuousRow label="Our values" variant="values" duration={26} className={styles.cardRow}>
              {aboutValues.map((value, index) => (
                <div key={value.title} className="home-marquee-item" data-about-card data-about-delay={String(index * 80)}>
                  <article className={styles.valueCard}>
                    <div className={styles.cardTop}><span className={styles.squareIcon}><HomeIcon name={value.icon} className="h-6 w-6" /></span><span className={styles.cardIndex}>{value.index}</span></div>
                    <h3>{value.title}</h3><p>{value.description}</p>
                    <Link href="/contact" className={`focus-ring ${styles.cardLink}`}>{value.action}<ArrowIcon className="h-4 w-4" /></Link>
                  </article>
                </div>
              ))}
            </ContinuousRow>
          </div>
        </Container>
      </section>

      <section id="our-story" className={`${styles.section} ${styles.story}`} aria-labelledby="story-heading">
        <Container wide>
          <div className={styles.storyGrid}>
            <div className={styles.copy} data-about-enter>
              <p className={styles.eyebrow}>Our Story</p>
              <h2 id="story-heading" className={styles.heading}>A movement for<br /><span>young innovators.</span></h2>
              <p>Ignited Brains began with a simple belief: every student has the potential to create real change with the right environment, tools and inspiration.</p>
              <p>What started as an idea is now a growing movement to bring hands-on, future-ready learning spaces into schools across India.</p>
              <ButtonLink href="#journey" variant="outline" showArrow>Our Journey</ButtonLink>
            </div>
            <figure className={styles.storyPhoto} data-about-enter="media" data-about-delay="120">
              <Image src={pageAssetSlots.about.story} alt="Students presenting their projects at the Ignited Brains Curiosity Corner" width={4096} height={3072} sizes="(max-width: 767px) 100vw, 48vw" />
              <figcaption><span className={styles.captionDot} />Ideas. Students. Impact.</figcaption>
            </figure>
          </div>
          <div id="journey" className={styles.timeline} data-about-timeline>
            <div className={styles.timelineHeading} data-about-enter><p className={styles.eyebrow}>The Journey</p><h3>One idea. An ongoing journey.</h3></div>
            <ol>
              {storyMilestones.map((item, index) => (
                <li key={item.title} data-about-milestone data-about-enter data-about-delay={String(index * 80)}>
                  <span className={styles.timelineNode} aria-hidden="true">0{index + 1}</span>
                  <div><h4>{item.title}</h4><p>{item.description}</p></div>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      <section className={`${styles.section} ${styles.differences}`} data-about-section="differences" aria-labelledby="differences-heading">
        <Container wide>
          <div className={styles.sectionIntro} data-about-enter>
            <div><p className={styles.eyebrow}>What Makes Us Different</p><h2 id="differences-heading" className={styles.heading}>More than a lab.<br /><span>A learning revolution.</span></h2></div>
            <p>We create environments where students can explore, experiment and innovate.</p>
          </div>
          <div data-about-loop>
            <ContinuousRow label="What makes us different" variant="differences" duration={26} className={styles.cardRow}>
              {differentiators.map((item, index) => (
                <div key={item.title} className="home-marquee-item" data-about-card data-about-delay={String(index * 80)}>
                  <article className={styles.differenceCard}><span className={styles.squareIcon}><HomeIcon name={item.icon} className="h-6 w-6" /></span><h3>{item.title}</h3><p>{item.description}</p></article>
                </div>
              ))}
            </ContinuousRow>
          </div>
        </Container>
      </section>

      <section className={`${styles.section} ${styles.purpose}`} aria-label="Our mission and vision">
        <Container wide className={styles.purposeGrid}>
          <article className={`${styles.purposeCard} ${styles.mission}`} data-about-enter>
            <div className={styles.purposeCopy}><p className={styles.eyebrow}>Our Mission</p><h2>Bring hands-on, future-ready labs into every school.</h2><p>Ignite curiosity, creativity and innovation in every student.</p><span className={styles.accentLine} /></div>
            <div className={styles.purposeImage}><Image src={pageAssetSlots.about.mission} alt="Astronaut exploring space with Earth in view" fill sizes="(max-width: 767px) 100vw, 48vw" className="object-cover" /></div>
          </article>
          <article className={`${styles.purposeCard} ${styles.vision}`} data-about-enter data-about-delay="100">
            <div className={styles.purposeCopy}><p className={styles.eyebrow}>Our Vision</p><h2>A generation that creates with science.</h2><p>Indian students who build the nation&apos;s future through exploration and innovation.</p><span className={styles.accentLine} /></div>
            <div className={styles.purposeImage}><Image src="/media/buil.jpeg" alt="Students and an educator exploring technology together in an AI and robotics lab" fill sizes="(max-width: 767px) 100vw, 48vw" className="object-cover" /></div>
          </article>
        </Container>
      </section>

      <section className={`${styles.section} ${styles.india}`} aria-labelledby="india-heading">
        <Container wide className={styles.indiaGrid}>
          <div className={styles.copy}>
            <div data-about-enter><p className={styles.eyebrow}>Our Commitment To India</p><h2 id="india-heading" className={`${styles.heading} ${styles.drawHeading}`}>Building India&apos;s future<br /><span>through curious minds.</span></h2><p>Every school, in every corner of India, should have the opportunity to nurture innovators, problem solvers and change makers.</p></div>
            <div className={styles.commitments}>
              {indiaCommitments.map((item, index) => (<div key={item.title} data-about-enter data-about-delay={String(index * 80)}><span className={styles.roundIcon}><HomeIcon name={item.icon} className="h-5 w-5" /></span><h3>{item.title}</h3></div>))}
            </div>
            <ButtonLink href="/contact" showArrow data-about-enter>Be Part of the Change</ButtonLink>
          </div>
          <figure className={styles.indiaMap} data-about-enter="media">
            <div className={styles.mapStage} data-about-loop>
              <Image src="/about/india-learning-network.webp" alt="Illustrated network of learning connections across India" width={1448} height={1086} sizes="(max-width: 1023px) 100vw, 52vw" />
              <span className={styles.mapTwinkles} aria-hidden="true"><i /><i /><i /><i /></span>
            </div>
            <figcaption><Image src="/icons/india-flag.svg" alt="" width={30} height={20} />Together for a brighter tomorrow.</figcaption>
          </figure>
        </Container>
      </section>

      <section className={styles.cta} aria-labelledby="cta-heading">
        <Container wide className={styles.ctaGrid}>
          <div className={styles.ctaEarth} data-about-loop aria-hidden="true"><AnimatedEarth className="h-auto w-full" /></div>
          <div data-about-enter><p className={styles.eyebrow}>Let&apos;s Build What&apos;s Next</p><h2 id="cta-heading">Let&apos;s build the future together.</h2><p>Partner with Ignited Brains and put curiosity, creativity and innovation at the heart of education.</p></div>
          <ButtonLink href="/contact" size="lg" showArrow className={styles.ctaButton} data-about-enter>Partner With Us</ButtonLink>
        </Container>
      </section>
      <AboutMotion />
    </main>
  );
}
