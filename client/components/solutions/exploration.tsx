"use client";

import Image from "next/image";
import { useId, useState, type CSSProperties } from "react";
import { HomeIcon, type HomeIconName } from "@/components/home/home-icon";
import { SolutionImageLightbox } from "@/components/home/solution-image-lightbox";
import styles from "./solutions.module.css";

const robotParts: { id: string; title: string; short: string; detail: string; icon: HomeIconName }[] = [
  { id: "vision", title: "Camera / Vision", short: "An optional visual input", detail: "A camera can provide images for a vision task. It is an optional extension; this photographed prototype is not being presented as a camera-equipped robot.", icon: "observe" },
  { id: "sensors", title: "Sensors", short: "Measure the world", detail: "Sensors turn a physical quantity into a reading. Students check readings before using them to make a decision.", icon: "curiosity" },
  { id: "processor", title: "Processor", short: "Read, decide, control", detail: "A controller reads inputs, runs the programme and sends commands. Students trace the sequence to understand why a robot behaves as it does.", icon: "think" },
  { id: "motors", title: "Motors", short: "Make a decision move", detail: "Motor drivers supply controlled power. Wheel speed, gearing and the chassis turn software instructions into movement.", icon: "build" },
  { id: "software", title: "AI / Software", short: "Instructions and models", detail: "Start with simple rules, debug them and test their limits. AI projects add data and models where they serve a useful purpose; not every robot needs AI.", icon: "robotics" },
];

export function RobotSystem() {
  const [selected, setSelected] = useState("processor");
  const detailsId = useId();
  const active = robotParts.find(part => part.id === selected)!;
  return <section className={styles.robotSystem} data-motion-section data-reveal><h2>How a robot works</h2><p>Inputs → decisions → movement. Select a component.</p><div className={styles.robotDiagram}>
    <svg className={styles.robotConnectors} viewBox="0 0 480 420" fill="none" aria-hidden="true"><path d="M240 55V122M100 188H160L215 225M370 188H305L255 225M100 320H170L225 250M370 320H300L255 250" stroke="currentColor" strokeWidth="1.5" /><circle cx="240" cy="230" r="65" stroke="currentColor" opacity=".18" /></svg>
    <div className={styles.robotPhoto}><SolutionImageLightbox src="/home/mars-rover-clean.webp" title="Student-built rover prototype" alt="Student-built rover with a red chassis, exposed electronics and yellow wheels" className={styles.imageTrigger}><Image src="/home/mars-rover-clean.webp" alt="Student-built rover with exposed electronics and yellow wheels" fill sizes="(max-width: 700px) 70vw, 24vw" style={{ objectFit: "contain" }} /></SolutionImageLightbox></div>
    {robotParts.map(part => <button key={part.id} type="button" className={`${styles.robotPart} ${styles[part.id]}`} aria-pressed={selected === part.id} aria-controls={detailsId} onClick={() => setSelected(part.id)}><HomeIcon name={part.icon} /><span><strong>{part.title}</strong><small>{part.short}</small></span></button>)}
  </div><p className={styles.diagramCaption}>Real student prototype; connections illustrate system principles.</p><div id={detailsId} className={styles.systemDetail} aria-live="polite"><h3>{active.title}</h3><p>{active.detail}</p></div></section>;
}

const parkZones: { id: string; title: string; short: string; icon: HomeIconName; x: number; y: number; detail: string }[] = [
  { id: "mechanics", title: "Mechanics Zone", short: "Mechanics", icon: "build", x: 24, y: 25, detail: "Change a lever’s position, compare effort and load, then explain the mechanical advantage. Large physical models make forces easier to investigate together." },
  { id: "astronomy", title: "Astronomy Zone", short: "Astronomy", icon: "space", x: 69, y: 15, detail: "Explore planetary motion and shadow patterns. Use scale models to discuss what an exhibit can show accurately and what is simplified." },
  { id: "optics", title: "Optics Zone", short: "Optics", icon: "observe", x: 80, y: 40, detail: "Experiment with reflection, perspective and colour. Students predict a light path before comparing it with what they observe." },
  { id: "energy", title: "Energy Zone", short: "Energy", icon: "innovation", x: 70, y: 65, detail: "Trace energy through a hand-operated mechanism or a solar model. Compare input, useful output and the energy transferred to the surroundings." },
  { id: "sound", title: "Sound Zone", short: "Sound", icon: "share", x: 24, y: 53, detail: "Listen to resonance and reflected sound. Change one part of the setup and connect the difference you hear with vibration and sound waves." },
  { id: "mathematics", title: "Mathematics Zone", short: "Mathematics", icon: "stem", x: 30, y: 81, detail: "Find patterns, measure proportions and build geometric forms. A physical task makes mathematical relationships visible and open to discussion." },
  { id: "environment", title: "Environmental Zone", short: "Environment", icon: "park", x: 72, y: 89, detail: "Observe water, soil, weather and living systems around the school. Record changes and relate a local observation to an environmental question." },
];

export function ParkMap() {
  const [selected, setSelected] = useState("mechanics");
  const detailsId = useId();
  const active = parkZones.find(zone => zone.id === selected)!;
  return <section className={styles.parkMap} data-motion-section data-reveal><h2>Park layout</h2><p>Seven learning zones. Select one to explore.</p><div className={styles.mapCanvas} role="group" aria-label="Explore Science Park learning zones">
    <svg viewBox="0 0 480 470" className={styles.mapDrawing} aria-hidden="true"><path d="M57 43Q232 -2 416 62L451 214Q470 349 389 420Q216 480 64 412Q-2 268 57 43Z" fill="#edf4e7" /><path d="M102 96Q250 16 351 90T361 282Q370 358 224 380T111 284Q37 208 102 96Z" fill="none" stroke="#f8dcae" strokeWidth="23" /><path d="M102 96Q250 16 351 90T361 282Q370 358 224 380T111 284Q37 208 102 96Z" fill="none" stroke="#bc976b" strokeWidth="1" strokeDasharray="3 8" /><path d="M236 137Q299 152 286 216Q285 262 229 269Q174 251 181 200Q179 149 236 137Z" fill="#bfdedf" /><path d="M138 200H345M235 90V378" stroke="#f8dcae" strokeWidth="18" /><circle cx="240" cy="228" r="39" fill="#fffaf1" stroke="#bc976b" /><path d="M229 237V215L247 208L261 228L247 245Z" fill="#ff6a24" /><g fill="#b9d2a5"><circle cx="51" cy="119" r="17" /><circle cx="55" cy="155" r="20" /><circle cx="400" cy="138" r="22" /><circle cx="434" cy="276" r="17" /><circle cx="108" cy="414" r="21" /><circle cx="380" cy="411" r="18" /><circle cx="287" cy="45" r="18" /></g></svg>
    {parkZones.map(zone => <button key={zone.id} type="button" className={styles.zoneButton} style={{ "--zone-x": `${zone.x}%`, "--zone-y": `${zone.y}%` } as CSSProperties} aria-label={zone.title} aria-pressed={selected === zone.id} aria-controls={detailsId} onClick={() => setSelected(zone.id)}><HomeIcon name={zone.icon} /><span>{zone.short}</span></button>)}
  </div><p className={styles.diagramCaption}>Conceptual learning layout, adapted to your school’s available space.</p><div id={detailsId} className={styles.zoneDetail} aria-live="polite"><h3>{active.title}</h3><p>{active.detail}</p></div></section>;
}
