import type { Metadata } from "next";
import { EarthCta } from "@/components/layout/earth-cta";
import Image from "next/image";
import Link from "next/link";

import { AboutMotion } from "@/components/about/about-motion";
import { PageIcon, SceneHero, type PageIconName } from "@/components/engagement/page-elements";
import { ButtonLink } from "@/components/ui";
import styles from "@/components/engagement/engagement.module.css";

export const metadata: Metadata = {
  title: "Shop",
  description: "Ignited Brains Shop is coming soon.",
  alternates: { canonical: "/shop" },
};

// The three areas announced by the repository's original Coming Soon page.
const previews: Array<{ title: string; description: string; icon: PageIconName }> = [
  { title: "Learning Kits", description: "Take curiosity beyond the classroom.", icon: "kit" },
  { title: "Innovation Resources", description: "Make room for questions and new ideas.", icon: "innovation" },
  { title: "Hands-on Educational Products", description: "Explore through making and experimenting.", icon: "science" },
];

export default function ShopPage() {
  return (
    <AboutMotion>
      <main className={styles.page}>
        <SceneHero
          image="/shop/design/hero.webp"
          alt="A friendly robot holding an orange learning bag in front of Earth"
          label="Ignited Brains Shop"
          title={<>Coming <em>Soon</em></>}
        >
          <p className={styles.heroLead} data-reveal data-delay="2">Exciting learning kits, innovation resources and hands-on educational products are on their way.</p>
          <ul className={styles.heroFeatures} data-reveal data-delay="3">
            <li><PageIcon name="kit" /><span>Hands-on<br />Learning</span></li>
            <li><PageIcon name="science" /><span>STEM<br />Exploration</span></li>
            <li><PageIcon name="innovation" /><span>For Curious<br />Minds</span></li>
          </ul>
        </SceneHero>

        <section className={styles.shopPreview} aria-labelledby="preview-title">
          <div className={styles.container}>
            <div className={styles.previewPanel}>
              <div className={styles.previewCopy} data-reveal>
                <p className={styles.eyebrow}>Stay Tuned</p>
                <h2 id="preview-title" className={styles.title}>Something Amazing<br /><em>is in the Works!</em></h2>
                <p className={styles.copy}>We’re preparing a dedicated shop for learning kits, innovation resources and hands-on educational products — bringing learning closer to schools, students and curious minds everywhere.</p>
                <ButtonLink href="/projects" showArrow size="lg" className={styles.primaryAction}>Explore Our Projects</ButtonLink>
              </div>
              <div className={styles.boxArtwork} data-reveal data-delay="1">
                <Image
                  src="/shop/design/learning-box.webp"
                  alt="Concept illustration of a navy learning kit with a rocket, robot, globe and science tools rising from it"
                  width={1254}
                  height={1254}
                  sizes="(max-width: 767px) 92vw, (max-width: 1400px) 48vw, 640px"
                  className={styles.floatingBox}
                />
              </div>
            </div>
            <div className={styles.previewCards}>
              {previews.map((item, index) => (
                <article key={item.title} className={styles.previewCard} data-reveal data-delay={index}>
                  <PageIcon name={item.icon} />
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <EarthCta eyebrow="Be Part of the Journey" title={<>Let’s create<br /><em>brighter tomorrows.</em></>} description={<>Hands-on learning. Limitless curiosity.<br />A new chapter for Ignited Brains.</>} actions={<Link href="/contact" className={styles.textLink}>Connect with us <span aria-hidden="true">↗</span></Link>} />
      </main>
    </AboutMotion>
  );
}
