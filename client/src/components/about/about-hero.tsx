import Link from "next/link";
import { ArrowRight, Play, Telescope, Sparkles, Cpu } from "lucide-react";

export function AboutHero() {
  return (
    <section className="about-hero">
      <div className="about-hero-bg">
        <span className="about-hero-gradient" />
        <span className="about-hero-earth" />
      </div>
      <div className="container about-hero-inner">
        <div className="about-hero-copy">
          <p className="section-eyebrow about-eyebrow">About Ignited Brains</p>
          <h1 className="about-hero-title">
            Education should do more than teach. <span className="accent-text">It should ignite.</span>
          </h1>
          <p className="about-hero-description">
            Ignited Brains creates future-ready learning environments where curiosity becomes experimentation, creativity becomes creation, and innovation becomes action.
          </p>
          <div className="about-hero-ctas">
            <Link href="/solutions" className="button button-primary">Our Story <Play /></Link>
            <Link href="/solutions" className="button button-ghost button-icon">Explore Our Solutions <ArrowRight /></Link>
          </div>
          <div className="about-hero-pillars">
            <div className="pillar-card">
              <div className="pillar-icon"><Telescope /></div>
              <div>
                <h4>Curiosity</h4>
                <p>Ask Better Questions</p>
              </div>
            </div>
            <div className="pillar-card">
              <div className="pillar-icon"><Sparkles /></div>
              <div>
                <h4>Creativity</h4>
                <p>Turn Ideas Into Reality</p>
              </div>
            </div>
            <div className="pillar-card">
              <div className="pillar-icon"><Cpu /></div>
              <div>
                <h4>Innovation</h4>
                <p>Build a Brighter Tomorrow</p>
              </div>
            </div>
          </div>
        </div>
        <div className="about-hero-art">
          <div className="about-hero-quote-card">
            <span>"Every discovery starts with a curious mind."</span>
          </div>
        </div>
      </div>
    </section>
  );
}
