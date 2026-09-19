import { ArrowRight } from "lucide-react";
import Link from "next/link";

const timeline = [
  { title: "The Idea", text: "A simple belief in the power of hands-on learning." },
  { title: "First Steps", text: "Building initial labs and learning experiences." },
  { title: "Growing Impact", text: "Reaching out to more schools and institutions." },
  { title: "A Bigger Vision", text: "Igniting curiosity and innovation at scale." },
  { title: "The Journey Continues", text: "Building a brighter, innovation-driven India." },
];

export function OurStory() {
  return (
    <section className="our-story section-light">
      <div className="container our-story-inner">
        <div className="our-story-left">
          <p className="section-eyebrow">Our Story</p>
          <h2 className="section-title section-title-lg">
            A movement for <span className="accent-text">young innovators.</span>
          </h2>
          <p className="section-description">
            Ignited Brains began with a simple belief — that every student has the potential to create real things, if given the right environment, the right tools and the right inspiration.
          </p>
          <p className="section-description">
            What started as an idea is now a growing movement to bring hands-on, future-ready learning spaces into schools across India.
          </p>
          <Link href="/about" className="button button-primary inline-flex">Our Journey <ArrowRight /></Link>
        </div>
        <div className="our-story-right">
          <div className="our-story-image-wrap">
            <div className="our-story-image">
              <span className="our-story-image-gradient" />
            </div>
            <span className="our-story-handwritten">
              <b>Ideas</b>
              <small>Students</small>
              <i>Impact</i>
            </span>
          </div>
          <ol className="story-timeline">
            {timeline.map(({ title, text }, i) => (
              <li key={title} className="timeline-step">
                <span className="timeline-dot" />
                <div>
                  <h4>{title}</h4>
                  <p>{text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
