import type { Metadata } from "next";
import Image from "next/image";

import { AboutMotion } from "@/components/about/about-motion";
import { ContactForm } from "@/components/contact/contact-form";
import { ContactFormLink, ContactVideo } from "@/components/contact/contact-experience";
import { Blueprint, ClosingScene, Journey } from "@/components/engagement/page-elements";
import { HomeIcon } from "@/components/home/home-icon";
import { SocialIcon } from "@/components/layout/social-icon";
import { ButtonLink, Container } from "@/components/ui";
import { contactFaqs, contactHeroBenefits, contactProcess, partnerTypes } from "@/data/contact";
import { pageAssetSlots } from "@/lib/assets";
import { siteConfig } from "@/lib/site";
import styles from "@/components/engagement/engagement.module.css";

export const metadata: Metadata = {
  title: "Partner With Us",
  description: "Partner with Ignited Brains to create future-ready learning environments, labs and hands-on student experiences.",
  alternates: { canonical: "/contact" },
};

function ContactIcon({ name }: { name: "mail" | "phone" | "pin" }) {
  return <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
    {name === "mail" ? <><path d="M3 5.5h14v9H3v-9Z" /><path d="m3.8 6.2 6.2 4.4 6.2-4.4" /></> : name === "phone" ? <path d="M6.2 3.2 8 6.8 6.4 8c.8 2.4 2.5 4.1 4.9 4.9l1.2-1.6 3.6 1.8-.5 2.8c-.2.8-.9 1.3-1.7 1.2C7.7 16.4 3.6 12.3 2.9 6.1c-.1-.8.4-1.5 1.2-1.7l2.1-.5Z" /> : <><path d="M10 17s5-4.7 5-9a5 5 0 1 0-10 0c0 4.3 5 9 5 9Z" /><circle cx="10" cy="8" r="1.7" /></>}
  </svg>;
}

export default function ContactPage() {
  const { email, phone, city, region, country } = siteConfig.contact;
  return <AboutMotion><main className={styles.page}>
    <section className={styles.contactHero} aria-labelledby="contact-title">
      <Container wide className={styles.contactHeroGrid}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow} data-reveal>Partner With Us</p>
          <h1 id="contact-title" className={styles.heroTitle} data-reveal data-delay="1">Let’s build<br />the future<br /><em>together.</em></h1>
          <p className={styles.lead} data-reveal data-delay="2">Tell us about your school, institution or learning initiative. We’ll get in touch to discuss how Ignited Brains can help you create hands-on learning spaces for curious minds.</p>
          <div className={styles.actions} data-reveal data-delay="3"><ContactFormLink /></div>
          <div className={styles.trust} data-reveal data-delay="4">{contactHeroBenefits.map(item => <div key={item.title}><HomeIcon name={item.icon} /><span>{item.title}</span></div>)}</div>
        </div>
        <div className={styles.contactArt}><Blueprint /><div className={styles.educatorImage}><Image src={pageAssetSlots.contact.hero} alt="An educator and student collaborating on a robotics project in a science lab" fill priority sizes="(max-width: 767px) 90vw, 44vw" className={styles.cover} /></div><span className={styles.imageCaption}><HomeIcon name="build" />Learning begins with doing.</span></div>
      </Container>
    </section>

    <section className={styles.formSection} aria-label="Contact Ignited Brains">
      <Container wide className={styles.formGrid}>
        <div id="contact-form" className={styles.formPanel} tabIndex={-1} data-reveal><ContactForm embedded /></div>
        <div className={styles.contactDetails} data-reveal data-delay="1"><p className={styles.eyebrow}>Get in Touch</p><h2 className={styles.title}>Every idea starts<br />with a <em>conversation.</em></h2><p className={styles.copy}>We’d love to hear from you.</p>
          <ul className={styles.contactList}>
            <li><span><ContactIcon name="mail" /></span><div><p>Email</p><a href={`mailto:${email}`}>{email}</a></div></li>
            <li><span><ContactIcon name="phone" /></span><div><p>Phone</p><a href={`tel:${phone.replace(/\s/g, "")}`}>{phone}</a></div></li>
            <li><span><ContactIcon name="pin" /></span><div><p>Location</p><p className={styles.address}>{city}, {region}, {country}</p></div></li>
          </ul>
          <div className={styles.socials}>{(["linkedin", "instagram", "youtube"] as const).map(network => <span key={network} role="img" aria-label={`${network} profile link pending`} title={`${network} profile link pending`}><SocialIcon network={network} /></span>)}</div>
        </div>
      </Container>
    </section>

    <section className={`${styles.section} ${styles.partnerSection}`} aria-labelledby="partners-title">
      <Container wide><div className={styles.sectionHead} data-reveal><div><p className={styles.eyebrow}>Who Can Partner With Us</p><h2 id="partners-title" className={styles.title}>Different partners.<br /><em>One shared future.</em></h2></div><span className={styles.sectionMark} aria-hidden="true">01 — Connect</span></div>
        <div className={styles.partnerGrid}>{partnerTypes.map((partner, index) => <article key={partner.title} data-reveal data-delay={index}><span className={styles.partnerNumber}>0{index + 1}</span><HomeIcon name={partner.icon} /><h3>{partner.title}</h3><p>{partner.description}</p></article>)}</div>
      </Container>
    </section>

    <section className={`${styles.section} ${styles.processSection} ${styles.dark}`} aria-labelledby="process-title">
      <Container wide><div className={styles.sectionHead} data-reveal><div><p className={styles.eyebrow}>What Happens Next</p><h2 id="process-title" className={styles.title}>From conversation<br />to <em>transformation.</em></h2></div><span className={styles.sectionMark} aria-hidden="true">02 — Create</span></div><Journey items={contactProcess} label="Our partnership process" /></Container>
    </section>

    <section className={styles.section} aria-labelledby="india-title">
      <Container wide className={styles.coverageGrid}><div data-reveal><p className={styles.eyebrow}>Connected by Curiosity</p><h2 id="india-title" className={styles.title}>A stronger India<br />through <em>curious minds.</em></h2><p className={styles.copy}>We work with schools and institutions across India to bring hands-on learning spaces to more students.</p><div className={styles.actions}><ContactFormLink /></div></div>
        <div className={styles.indiaFrame} data-reveal data-delay="1">
          <picture><source media="(prefers-reduced-motion: reduce)" srcSet="/media/home.png" /><Image src={pageAssetSlots.contact.indiaCoverage} alt="Ignited Brains school network across India" width={1821} height={864} unoptimized sizes="(max-width: 767px) 100vw, 55vw" /></picture>
          <span className={styles.mapNode} aria-hidden="true" /><span className={styles.mapNode} aria-hidden="true" /><span className={styles.mapNode} aria-hidden="true" />
        </div>
      </Container>
    </section>

    <section className={`${styles.section} ${styles.pale}`} aria-labelledby="faqs-title">
      <Container wide><div data-reveal><p className={styles.eyebrow}>Questions Before We Begin?</p><h2 id="faqs-title" className={styles.title}>Frequently Asked <em>Questions</em></h2></div>
        <div className={styles.faqGrid}><div className={styles.faqList} data-reveal>{contactFaqs.map(faq => <details key={faq.question} className={styles.faq}><summary>{faq.question}<span aria-hidden="true">+</span></summary><div className={styles.faqAnswer}><p>{faq.answer}</p></div></details>)}</div><figure className={styles.videoPanel} data-reveal data-delay="1"><ContactVideo /><figcaption><HomeIcon name="robotics" /><span>Curiosity. Creativity. Innovation.</span></figcaption></figure></div>
      </Container>
    </section>

    <ClosingScene eyebrow="Let’s Build Together" title={<>Ready to create<br /><em>what’s next?</em></>} actions={<><ContactFormLink /><ButtonLink href="/projects" size="lg" variant="outline" className={styles.pill} showArrow>Explore Our Projects</ButtonLink></>}>Let’s create learning environments where students don’t just study the future. They build it.</ClosingScene>
  </main></AboutMotion>;
}
