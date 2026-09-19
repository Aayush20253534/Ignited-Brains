import { ArrowRight, Telescope, Lightbulb, Cog } from "lucide-react";
import Link from "next/link";

const values = [
  {
    icon: Telescope,
    number: "01",
    title: "Curiosity",
    text: "Every discovery starts with a question.",
    linkText: "Stay Curious",
    href: "/about",
  },
  {
    icon: Lightbulb,
    number: "02",
    title: "Creativity",
    text: "Every idea deserves a chance to become real.",
    linkText: "Create Without Limits",
    href: "/about",
  },
  {
    icon: Cog,
    number: "03",
    title: "Innovation",
    text: "Every learner can contribute to the future.",
    linkText: "Innovate Together",
    href: "/about",
  },
];

export function OurValues() {
  return (
    <section className="our-values section-light">
      <div className="container our-values-inner">
        <div className="our-values-header">
          <div>
            <p className="section-eyebrow">Our Values</p>
            <h2 className="section-title section-title-lg">
              Curiosity. <span className="accent-text">Creativity.</span> Innovation.
            </h2>
          </div>
          <p className="our-values-tagline">Three beliefs that drive everything we do.</p>
        </div>
        <div className="values-grid">
          {values.map(({ icon: Icon, number, title, text, linkText, href }) => (
            <article key={title} className="value-card">
              <span className="value-number">{number}</span>
              <div className="value-icon">
                <Icon />
              </div>
              <h3 className="value-title">{title}</h3>
              <p className="value-text">{text}</p>
              <Link href={href} className="value-link">
                {linkText} <ArrowRight />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
