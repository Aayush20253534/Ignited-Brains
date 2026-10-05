"use client";

import Image from "next/image";
import Link from "next/link";
import { SolutionImageLightbox } from "@/components/home/solution-image-lightbox";
import { useEffect, useId, useRef, useState } from "react";

import { showcaseProjects, type ProjectDetail } from "./projects-content";
import styles from "./projects.module.css";

export function ProjectDetailsButton({ project, children, className = "" }: {
  project: ProjectDetail;
  children: React.ReactNode;
  className?: string;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const previousOverflow = useRef("");
  const locked = useRef(false);
  const titleId = useId();
  function restorePage() {
    if (!locked.current) return;
    locked.current = false;
    if (document.body.style.overflow === "hidden") document.body.style.overflow = previousOverflow.current;
    trigger.current?.focus({ preventScroll: true });
  }
  function closeDetails() {
    dialog.current?.close();
    restorePage();
  }
  useEffect(() => {
    return () => {
      if (locked.current && document.body.style.overflow === "hidden") document.body.style.overflow = previousOverflow.current;
    };
  }, []);

  return <>
    <button ref={trigger} type="button" className={className} aria-label={`View details: ${project.title}`} aria-haspopup="dialog" onClick={() => {
      if (!dialog.current || dialog.current.open) return;
      previousOverflow.current = document.body.style.overflow;
      dialog.current.showModal();
      const image = dialog.current.querySelector("img");
      if (image) image.loading = "eager";
      locked.current = true;
      document.body.style.overflow = "hidden";
      dialog.current?.querySelector<HTMLButtonElement>("[data-close]")?.focus();
    }}>{children}</button>
    <dialog ref={dialog} className={styles.projectDialog} aria-labelledby={titleId} onClose={event => {
      if (event.target !== event.currentTarget) return;
      if (!event.currentTarget.open) restorePage();
    }} onCancel={event => {
      if (event.target !== event.currentTarget) return;
      event.preventDefault();
      closeDetails();
    }} onClick={event => { if (event.target === event.currentTarget) closeDetails(); }} onKeyDown={event => {
      if (event.key !== "Tab") return;
      const controls = event.currentTarget.querySelectorAll<HTMLElement>("button:not([disabled]), a[href]");
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    }}>
      <div className={styles.dialogInner}>
        <button type="button" data-close className={styles.dialogClose} aria-label="Close project details" onClick={closeDetails}>×</button>
        <div className={styles.dialogImage}>
          <SolutionImageLightbox src={project.image} title={project.title} alt={project.alt} className={styles.photoTrigger}>
            <Image src={project.image} alt={project.alt} fill sizes="(max-width: 767px) 94vw, 900px" style={{ objectFit: "contain" }} />
            <span className={styles.openFullPhoto}>Open full photo <span aria-hidden="true">↗</span></span>
          </SolutionImageLightbox>
        </div>
        <div className={styles.dialogCopy}>
          <p className={styles.eyebrow}>{project.category}</p>
          <h2 id={titleId}>{project.title}</h2>
          <p className={styles.location}>{project.location}</p>
          <p>{project.description}</p>
          {project.features && <ul>{project.features.map(feature => <li key={feature}>{feature}</li>)}</ul>}
          <p className={styles.imageNote}>{project.imageNote ?? "Educational project visual."}</p>
          <Link href="/contact" className={styles.primaryButton} onClick={closeDetails}>Discuss a School Project <span aria-hidden="true">→</span></Link>
        </div>
      </div>
    </dialog>
  </>;
}

const categories = ["All", ...new Set(showcaseProjects.map(project => project.category))];

export function ProjectBrowser() {
  const [category, setCategory] = useState("All");
  const visible = category === "All" ? showcaseProjects : showcaseProjects.filter(project => project.category === category);

  return <div>
    <div className={styles.showcaseHeader}>
      <div><p className={styles.eyebrow}>Built by Curious Minds</p><h2 id="showcase-title" className={styles.title}>Different questions.<br />Different <em>creations.</em></h2></div>
      <div className={styles.filters} role="group" aria-label="Filter projects by category">
        {categories.map(item => <button key={item} type="button" aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}
      </div>
    </div>
    <p className={styles.srOnly} aria-live="polite">{visible.length} {visible.length === 1 ? "project" : "projects"} shown.</p>
    <div className={`${styles.showcaseGrid} ${category !== "All" ? styles.filteredGrid : ""}`}>
      {visible.map(project => <article key={project.id} className={`${styles.projectCard} ${project.id === "autonomous-rover" ? styles.mainProject : ""}`}>
        <div className={styles.projectImage}>
          <SolutionImageLightbox src={project.image} title={project.title} alt={project.alt} className={styles.photoTrigger}><Image src={project.image} alt={project.alt} fill sizes="(max-width: 767px) 90vw, (max-width: 1100px) 48vw, 650px" style={project.id === "model-rocket" ? { objectFit: "contain" } : undefined} /></SolutionImageLightbox>
          <span className={styles.projectGridLines} aria-hidden="true" />
        </div>
        <div className={styles.projectCopy}>
          <p className={styles.category}>{project.category}</p>
          <h3>{project.title}</h3>
          <p className={styles.projectDescription}>{project.description}</p>
          {project.id === "solar-system-park" && <p className={styles.conceptLabel}>Illustrative programme concept</p>}
          <ProjectDetailsButton project={project} className={styles.projectArrow}><span aria-hidden="true">↗</span></ProjectDetailsButton>
        </div>
      </article>)}
    </div>
  </div>;
}
