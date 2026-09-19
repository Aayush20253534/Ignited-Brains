"use client";

import { useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, X, Send, Rocket, FlaskConical, Bot, Trees } from "lucide-react";
import { Artwork } from "./artwork";

export function InfoDialog({ children, title, kind, className = "" }: {
  children: ReactNode; title: string; kind: "story" | "project" | "privacy" | "terms"; className?: string;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  return <>
    <button className={className} onClick={() => dialog.current?.showModal()}>{children}</button>
    <dialog ref={dialog} className="info-dialog" aria-label={title} onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
      <div className="dialog-content">
        <button className="dialog-close" aria-label="Close dialog" onClick={() => dialog.current?.close()}><X /></button>
        {kind === "story" && <Artwork region={[313, 1098, 317, 144]} alt="Student watching a rocket launch" />}
        {kind === "project" && <Artwork region={[289, 1419, 256, 134]} alt="Autonomous Mars rover on a rocky landscape" />}
        <h2>{title}</h2>
        {kind === "story" ? <><p>Discover how hands-on learning turns curiosity into creation.</p><p className="availability-note">The story video will be available here once it is provided.</p></> :
          kind === "project" ? <><p>A student-built autonomous rover that navigates rocky terrain, collects environmental data, and transmits it back to Earth.</p><ul><li>AI-based obstacle avoidance</li><li>Real-time data transmission</li><li>Rugged terrain mobility</li><li>Solar-powered system</li></ul><a className="button button-primary" href="mailto:info@ignitedbrains.com">Discuss a school project <ArrowRight /></a></> :
          <p>{kind === "privacy" ? "The privacy policy" : "The terms and conditions"} will be published here when supplied by Ignited Brains. For information, contact <a href="mailto:info@ignitedbrains.com">info@ignitedbrains.com</a>.</p>}
      </div>
    </dialog>
  </>;
}

const solutions = [
  { title: "Space Lab", description: "Rocket and satellite models, telescopes and hands-on space science experiences.", region: [37, 715, 140, 90] as const, icon: Rocket },
  { title: "STEM Lab", description: "Experiment, engineer and solve real problems through science, technology, engineering and maths.", region: [189, 715, 139, 90] as const, icon: FlaskConical },
  { title: "AI & Robotics Lab", description: "Robots, coding, AI projects and 3D printing for the next generation of innovators.", region: [340, 715, 140, 90] as const, icon: Bot },
  { title: "Science Park", description: "Interactive exhibits where science is learned through play and exploration.", region: [492, 715, 138, 90] as const, icon: Trees },
];

export function SolutionsSection() {
  const [offset, setOffset] = useState(0);
  const ordered = [...solutions.slice(offset), ...solutions.slice(0, offset)];
  return <section className="solutions-section section-light" id="solutions">
    <div className="container">
      <div className="section-heading-row">
        <div><p className="eyebrow">Our solutions <span className="little-line" /></p><h2>Where curiosity becomes tangible.</h2></div>
        <div className="solution-controls">
          <button className="circle-button" aria-label="Previous solution" onClick={() => setOffset((offset + 3) % 4)}><ArrowLeft /></button>
          <button className="circle-button" aria-label="Next solution" onClick={() => setOffset((offset + 1) % 4)}><ArrowRight /></button>
          <Link href="/solutions" className="button button-outline small-button">View All Solutions <ArrowRight /></Link>
        </div>
      </div>
      <div className="solutions-grid" aria-live="polite">
        {ordered.map(({ title, description, region, icon: Icon }) => <article className="solution-card" key={title}>
          <Artwork region={region} alt={title + " learning environment"} />
          <div className="solution-card-body"><span className="card-icon"><Icon /></span><h3>{title}</h3><p>{description}</p><Link href="/solutions" className="text-link" aria-label={`Explore ${title}`}>Explore <ArrowRight /></Link></div>
        </article>)}
      </div>
    </div>
  </section>;
}

const gallery = [
  { region: [289, 1419, 256, 134] as const, alt: "Autonomous Mars rover exploring rocky terrain" },
  { region: [553, 1419, 76, 43] as const, alt: "Rover under the Martian sky" },
  { region: [553, 1513, 76, 41] as const, alt: "Rocket on a distant planetary landscape" },
];

export function ProjectGallery() {
  const [selected, setSelected] = useState(0);
  return <div className="project-gallery">
    <Artwork region={gallery[selected].region} alt={gallery[selected].alt} className="gallery-main" />
    <div className="gallery-thumbnails">{gallery.map(({ region, alt }, index) =>
      <button key={alt} aria-label={`View image ${index + 1}: ${alt}`} aria-pressed={index === selected} onClick={() => setSelected(index)}><Artwork region={region} alt="" /></button>
    )}</div>
  </div>;
}

export function Newsletter() {
  const [message, setMessage] = useState("");
  return <form className="newsletter-form" onSubmit={(event) => { event.preventDefault(); setMessage("Newsletter signup is coming soon. Please contact info@ignitedbrains.com for updates."); }}>
    <label className="sr-only" htmlFor="newsletter-email">Email address</label>
    <div className="newsletter-input"><input id="newsletter-email" type="email" name="email" required placeholder="Enter your email" autoComplete="email" /><button type="submit" aria-label="Subscribe to the newsletter"><Send /></button></div>
    {message && <p className="newsletter-status" role="status">{message}</p>}
  </form>;
}


