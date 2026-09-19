import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function AboutCTA() {
  return (
    <section className="about-cta">
      <div className="about-cta-bg" />
      <div className="container about-cta-inner">
        <h2 className="about-cta-title">Let's build the future together.</h2>
        <p className="about-cta-text">
          Partner with Ignited Brains and be a part of a movement that puts curiosity, creativity and innovation at the heart of education.
        </p>
        <Link href="/#contact" className="button button-primary button-lg inline-flex">Partner With Us <ArrowRight /></Link>
      </div>
    </section>
  );
}
