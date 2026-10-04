"use client";

import Image from "next/image";
import Link from "next/link";
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
  const titleId = useId();
  useEffect(() => {
    const element = dialog.current;
    return () => { if (element?.open) document.body.style.overflow = previousOverflow.current; };
  }, []);

  return <>
    <button ref={trigger} type="button" className={className} aria-label={`View details: ${project.title}`} aria-haspopup="dialog" onClick={() => {
      previousOverflow.current = document.body.style.overflow;
      dialog.current?.showModal();
      document.body.style.overflow = "hidden";
      dialog.current?.querySelector<HTMLButtonElement>("[data-close]")?.focus();
    }}>{children}</button>
    <dialog ref={dialog} className={styles.projectDialog} aria-labelledby={titleId} onClose={() => {
      document.body.style.overflow = previousOverflow.current;
      trigger.current?.focus();
    }} onClick={event => { if (event.target === dialog.current) dialog.current?.close(); }} onKeyDown={event => {
      if (event.key !== "Tab") return;
      const controls = event.currentTarget.querySelectorAll<HTMLElement>("button:not([disabled]), a[href]");
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    }}>
      <div className={styles.dialogInner}>
        <button type="button" data-close className={styles.dialogClose} aria-label="Close project details" onClick={() => dialog.current?.close()}>×</button>
        <div className={styles.dialogImage}><Image src={project.image} alt={project.alt} fill sizes="(max-width: 767px) 94vw, 900px" /></div>
        <div className={styles.dialogCopy}>
          <p className={styles.eyebrow}>{project.category}</p>
          <h2 id={titleId}>{project.title}</h2>
          <p className={styles.location}>{project.location}</p>
          <p>{project.description}</p>
          {project.features && <ul>{project.features.map(feature => <li key={feature}>{feature}</li>)}</ul>}
          <p className={styles.imageNote}>Concept illustration of the project.</p>
          <Link href="/contact" className={styles.primaryButton} onClick={() => dialog.current?.close()}>Discuss a School Project <span aria-hidden="true">→</span></Link>
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
          <Image src={project.image} alt={project.alt} fill sizes="(max-width: 767px) 90vw, (max-width: 1100px) 48vw, 650px" />
          <span className={styles.projectGridLines} aria-hidden="true" />
        </div>
        <div className={styles.projectCopy}>
          <p className={styles.category}>{project.category}</p>
          <h3>{project.title}</h3>
          <p className={styles.projectDescription}>{project.description}</p>
          <ProjectDetailsButton project={project} className={styles.projectArrow}><span aria-hidden="true">↗</span></ProjectDetailsButton>
        </div>
      </article>)}
    </div>
  </div>;
}
