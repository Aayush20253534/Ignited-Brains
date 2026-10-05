import Link from "next/link";
import { HomeIcon } from "@/components/home/home-icon";
import { Activities, LabEarth, LabHero, LearningJourney, PhotoFrame, Skills, SolutionPage, TopicPanel } from "@/components/solutions/learning-space";
import { spaceActivities, spaceLab, spaceTopics } from "@/data/lab-programmes";
import { solutionMetadata } from "@/lib/solution-metadata";
import styles from "@/components/solutions/solutions.module.css";

export const metadata = solutionMetadata(spaceLab);

export default function SpaceLabPage() {
  return <SolutionPage><LabHero lab={spaceLab} /><LearningJourney steps={spaceLab.journey} description="A step-by-step journey from wondering about space to investigating it." />
    <div className={`${styles.container} ${styles.spaceLayout}`} data-motion-section>
      <TopicPanel title="Inside the Space Lab" description="Real equipment, physical exhibits and hands-on experiences." topics={spaceTopics} />
      <Activities items={spaceActivities} />
      <section className={styles.actionSection} aria-labelledby="space-action-title"><h2 id="space-action-title">See it in action</h2><PhotoFrame src="/media-v2/field/lab-conversation.webp" alt="Visitors and the Ignited Brains team discussing physical space-science models inside the lab" title="A closer look at Curiosity Corner" caption="From our real lab archive. Open the photograph to explore the complete scene." /><details className={styles.filmDisclosure}><summary>Watch our introduction film <span aria-hidden="true">▶</span></summary><video controls playsInline preload="none" src="/media/homeimg.mp4" aria-label="Ignited Brains animated introduction film" /><p>Our animated introduction film. The photographs on this page document the real learning space.</p></details><Link href="/media" className={styles.textLink}>View the complete media archive <span aria-hidden="true">→</span></Link></section>
    </div>
    <div className={`${styles.container} ${styles.projectsAndSkills}`} data-motion-section>
      <section className={styles.spaceProjects} data-reveal><div className={styles.panelHeading}><h2>Student Projects</h2><p>Models, missions and real student engineering.</p></div><div className={styles.spaceProjectGrid}><article><HomeIcon name="space" /><h3>Model Rocket Design</h3><p>Students design and launch model rockets to understand aerodynamics.</p><Link href="/projects">Explore the programme <span aria-hidden="true">→</span></Link></article><PhotoFrame src="/learning-spaces/space-rover-project.webp" alt="The engineering team explaining a hand-built red rover to visitors at a public project demonstration" title="Mars Rover Prototype" caption="A student-built rover to investigate mobility and simulated terrain." /><article><HomeIcon name="share" /><h3>Satellite Communication Model</h3><p>Explore how satellites help us stay connected through models and mission challenges.</p><Link href="/contact">Discuss a school project <span aria-hidden="true">→</span></Link></article></div></section>
      <Skills compact items={["Scientific Curiosity", "Research Mindset", "Analytical Thinking", "Problem Solving", "Creativity & Innovation", "Collaboration"]} description="Scientific thinking, technical knowledge and the confidence to share a discovery." />
    </div><LabEarth lab={spaceLab} /></SolutionPage>;
}
