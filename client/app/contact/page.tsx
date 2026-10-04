import type { Metadata } from "next";
import Image from "next/image";

import { AboutMotion } from "@/components/about/about-motion";
import { ContactForm } from "@/components/contact/contact-form";
import { ContactFormLink } from "@/components/contact/contact-experience";
import { PageIcon, SceneHero } from "@/components/engagement/page-elements";
import { contactFaqs, contactProcess, partnerTypes } from "@/data/contact";
import { siteConfig } from "@/lib/site";
import styles from "@/components/engagement/engagement.module.css";

export const metadata: Metadata = {
  title: "Partner With Us",
  description: "Partner with Ignited Brains to create future-ready learning environments, labs and hands-on student experiences.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const { email, phone, city, region, country } = siteConfig.contact;

  return (
    <AboutMotion>
      <main className={styles.page}>
        <SceneHero
          variant="contact"
          image="/contact/design/hero.webp"
          alt="A student and a small robot looking at Earth through an orbital observation window"
          label="Contact Us"
          title={<>Let’s Build<br />Brighter <em>Tomorrows.</em></>}
        >
          <p className={styles.heroLead} data-reveal data-delay="2">Have a question, a partnership idea or want to bring Ignited Brains to your school? We’d love to hear from you.</p>
          <div className={styles.heroAction} data-reveal data-delay="3"><ContactFormLink /></div>
        </SceneHero>

        <section className={styles.contactBody} aria-label="Contact Ignited Brains">
          <div className={styles.container}>
            <ul className={styles.contactTiles}>
              <li data-reveal>
                <span className={styles.contactIcon}><PageIcon name="mail" /></span>
                <div><h2>Email Us</h2><a href={`mailto:${email}`}>{email}</a><p>Start a conversation with our team.</p></div>
              </li>
              <li data-reveal data-delay="1">
                <span className={styles.contactIcon}><PageIcon name="phone" /></span>
                <div><h2>Call Us</h2><a href={`tel:${phone.replace(/\s/g, "")}`}>{phone}</a><p>Let’s discuss your learning goals.</p></div>
              </li>
              <li data-reveal data-delay="2">
                <span className={styles.contactIcon}><PageIcon name="pin" /></span>
                <div><h2>Find Us</h2><p className={styles.address}>{city}, {region}, {country}</p><p>Connected by a shared curiosity.</p></div>
              </li>
            </ul>

            <div className={styles.conversationGrid}>
              <div id="contact-form" className={styles.formPanel} tabIndex={-1} data-reveal>
                <p className={styles.eyebrow}>Send Us a Message</p>
                <ContactForm embedded />
              </div>
              <aside className={styles.campusCard} data-reveal data-delay="1" aria-labelledby="collaborate-title">
                <Image
                  src="/contact/design/observatory.webp"
                  alt="Concept illustration of a future-ready learning campus with an observatory at sunset"
                  fill
                  sizes="(max-width: 767px) 92vw, (max-width: 1400px) 42vw, 520px"
                  className={styles.cover}
                />
                <div className={styles.campusCopy}>
                  <h2 id="collaborate-title">Let’s Collaborate<br />for a <em>Brighter<br />Tomorrow.</em></h2>
                  <p>Whether you are a school, institution or education initiative, let’s create learning spaces that inspire curious minds.</p>
                </div>
              </aside>
            </div>

            <details className={styles.partnershipDetails}>
              <summary>Partnership options &amp; next steps<span aria-hidden="true">+</span></summary>
              <div className={styles.partnershipContent}>
                <h2>Who can partner with us?</h2>
                <div className={styles.partnerGrid}>
                  {partnerTypes.map(partner => <article key={partner.title}><h3>{partner.title}</h3><p>{partner.description}</p></article>)}
                </div>
                <h2>What happens next?</h2>
                <ol className={styles.processGrid}>
                  {contactProcess.map(step => <li key={step.step}><span>{step.step}</span><h3>{step.title}</h3><p>{step.description}</p></li>)}
                </ol>
              </div>
            </details>

            <div className={styles.faqGrid}>
              <div data-reveal>
                <p className={styles.eyebrow}>FAQ</p>
                <h2 className={styles.faqTitle}>Frequently Asked <em>Questions</em></h2>
                <p className={styles.copy}>Quick answers before we begin.</p>
              </div>
              <div className={styles.faqList} data-reveal data-delay="1">
                {contactFaqs.map(faq => <details key={faq.question} className={styles.faq}><summary>{faq.question}<span aria-hidden="true">+</span></summary><p>{faq.answer}</p></details>)}
              </div>
            </div>
          </div>
        </section>
      </main>
    </AboutMotion>
  );
}
