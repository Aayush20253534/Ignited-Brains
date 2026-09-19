import { ArrowRight, Sparkles, GraduationCap, Heart, Zap } from "lucide-react";
import Link from "next/link";

const impacts = [
  { icon: Sparkles, title: "More Opportunities", text: "For every student" },
  { icon: GraduationCap, title: "Stronger Schools", text: "And stronger educators" },
  { icon: Heart, title: "Brighter Communities", text: "In every corner of India" },
  { icon: Zap, title: "A More Innovative India", text: "Built by young minds" },
];

export function IndiaCommitment() {
  return (
    <section className="india-commitment section-light">
      <div className="container india-commitment-inner">
        <div className="india-left">
          <p className="section-eyebrow">Our Commitment To India</p>
          <h2 className="section-title section-title-lg">
            Building India's future through <span className="accent-text">curious minds.</span>
          </h2>
          <p className="section-description">
            We envision a nation where every school, in every corner of India, has the opportunity to nurture inventors, problem solvers and change makers.
          </p>
          <Link href="/#contact" className="button button-primary inline-flex">Be Part of the Change <ArrowRight /></Link>
        </div>
        <div className="india-right">
          <div className="india-map-wrap">
          <span className="india-monuments" />
          <span className="india-map-art">
            <span className="india-map-dot dot-1" />
            <span className="india-map-dot dot-2" />
            <span className="india-map-dot dot-3" />
            <span className="india-map-dot dot-4" />
            <span className="india-map-dot dot-5" />
            <span className="india-map-network" />
          </span>
        </div>
          <ul className="india-impacts">
            {impacts.map(({ icon: Icon, title, text }) => (
              <li key={title} className="india-impact">
                <span className="impact-icon"><Icon /></span>
                <div>
                  <h4>{title}</h4>
                  <p>{text}</p>
                </div>
              </li>
            ))}
          </ul>
          <span className="india-tagline">
            <svg viewBox="0 0 36 24" aria-hidden="true"><rect width="36" height="24" rx="2" fill="#FF9933" /><rect y="8" width="36" height="8" fill="#ffffff" /><rect y="16" width="36" height="8" fill="#138808" /><circle cx="18" cy="12" r="2.8" fill="#000080" /></svg>
            Together for a brighter tomorrow.
          </span>
        </div>
      </div>
    </section>
  );
}
