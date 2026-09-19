import { ArrowRight, Lightbulb, Brain, FlaskConical, Compass, Zap, Rocket } from "lucide-react";
import Link from "next/link";

const steps = [
  { icon: Lightbulb, title: "Question", sub: "Why?" },
  { icon: Brain, title: "Curiosity", sub: "Explore" },
  { icon: FlaskConical, title: "Experiment", sub: "Try" },
  { icon: Compass, title: "Discovery", sub: "Learn" },
  { icon: Zap, title: "Creation", sub: "Build" },
  { icon: Rocket, title: "Innovation", sub: "Impact" },
];

export function OurIdea() {
  return (
    <section className="our-idea section-light">
      <div className="container our-idea-inner">
        <div className="our-idea-left">
          <p className="section-eyebrow">Our Idea</p>
          <h2 className="section-title section-title-lg">
            The future isn't found in books. <span className="accent-text">It is created.</span>
          </h2>
          <p className="section-description">
            We believe education should move beyond passive learning and inspire students to question, explore, experiment and build real solutions for real-world challenges.
          </p>
          <Link href="/about" className="link-with-arrow button button-ghost button-icon inline-flex">Our Philosophy <ArrowRight /></Link>
        </div>
        <div className="our-idea-right">
          <p className="our-idea-right-title">From a question to a brighter tomorrow</p>
          <div className="idea-steps">
            {steps.map(({ icon: Icon, title, sub }, idx) => (
              <div key={title} className={`idea-step ${idx === steps.length - 1 ? "idea-step-final" : ""}`}>
                <span className="idea-step-icon">
                  <Icon />
                </span>
                <h4>{title}</h4>
                <p>{sub}</p>
                {idx < steps.length - 1 && <span className="idea-step-arrow">→</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
