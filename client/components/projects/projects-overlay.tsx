import { readFileSync } from "node:fs";
import { join } from "node:path";

const directory = join(process.cwd(), "public/projects-v2");
const overlays = {
  hero: readFileSync(join(directory, "hero-technical-overlay.svg"), "utf8"),
  rover: readFileSync(join(directory, "featured-rover-overlay.svg"), "utf8"),
  india: readFileSync(join(directory, "india-network-overlay.svg"), "utf8"),
  earth: readFileSync(join(directory, "final-earth-network.svg"), "utf8"),
};

/** Only fixed, repository-owned SVGs are inlined so CSS can control their motion. */
export function ProjectsOverlay({ name, className = "" }: { name: keyof typeof overlays; className?: string }) {
  return <div className={className} aria-hidden="true" dangerouslySetInnerHTML={{ __html: overlays[name] }} />;
}
