import { FlaskConical, Bot, Target, Rocket } from "lucide-react";

const features = [
  {
    icon: FlaskConical,
    title: "Hands-on Learning",
    text: "Learn by doing, not just reading.",
  },
  {
    icon: Bot,
    title: "Future-ready Technology",
    text: "Modern tools for tomorrow's challenges.",
  },
  {
    icon: Target,
    title: "Real-world Problem Solving",
    text: "Turn ideas into meaningful solutions.",
  },
  {
    icon: Rocket,
    title: "Student-led Exploration",
    text: "Empowering students to take the lead.",
  },
];

export function WhatMakesUsDifferent() {
  return (
    <section className="what-makes-different section-light">
      <div className="container what-makes-different-inner">
        <div className="what-makes-different-header">
          <div>
            <p className="section-eyebrow">What Makes Us Different</p>
            <h2 className="section-title section-title-lg">
              More than a lab. <span className="accent-text">A learning revolution.</span>
            </h2>
          </div>
          <p className="what-makes-different-tagline">
            We don't just set up equipment. We create environments where students can explore, experiment and innovate.
          </p>
        </div>
        <div className="different-grid">
          {features.map(({ icon: Icon, title, text }) => (
            <article key={title} className="different-card">
              <div className="different-icon">
                <Icon />
              </div>
              <h3 className="different-title">{title}</h3>
              <p className="different-text">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
