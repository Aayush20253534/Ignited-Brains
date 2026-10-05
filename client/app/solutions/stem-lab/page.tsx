import { HomeIcon, type HomeIconName } from "@/components/home/home-icon";
import { Activities, LabEarth, LabHero, LearningJourney, PhotoFrame, ProjectBriefs, Skills, SolutionPage, TopicPanel } from "@/components/solutions/learning-space";
import { stemActivities, stemLab, stemProjects, stemTopics } from "@/data/lab-programmes";
import { solutionMetadata } from "@/lib/solution-metadata";
import styles from "@/components/solutions/solutions.module.css";

export const metadata = solutionMetadata(stemLab);
const engineering: { title: string; description: string; icon: HomeIconName }[] = [
  { title: "Sensors", description: "Choose what to measure, then check whether the reading is useful.", icon: "observe" },
  { title: "Mechanics", description: "Trace how forces, wheels and a chassis create movement.", icon: "build" },
  { title: "Electronics", description: "Follow the power and signal connections through the system.", icon: "robotics" },
  { title: "Design", description: "Ask why each material, dimension and component was chosen.", icon: "design" },
  { title: "Testing", description: "Change one thing, record what happens and improve the prototype.", icon: "test" },
];

export default function StemLabPage() {
  return <SolutionPage><LabHero lab={stemLab} /><LearningJourney steps={stemLab.journey} description="A practical journey that turns a question into evidence and a working idea." />
    <div className={`${styles.container} ${styles.stemLayout}`} data-motion-section><TopicPanel title="Inside the STEM Lab" description="Tools, models and equipment for real experimentation." topics={stemTopics} /><Activities items={stemActivities} /><PhotoFrame src="/media-v2/students/exhibition-team.webp" alt="Students and educators at a Curiosity Corner exhibition with physical science and robotics models" title="Real ideas. Shared with confidence." caption="Students and educators from our exhibition archive. A project becomes more valuable when its makers can explain it." /></div>
    <section className={`${styles.container} ${styles.engineeringSection}`} aria-labelledby="engineering-title" data-motion-section><div className={styles.sectionHeading} data-reveal><div><p className={styles.eyebrow}>Signature engineering project</p><h2 id="engineering-title">One prototype.<br /><em>Five ways to investigate it.</em></h2></div><p>Look beyond the finished object. Understand the decisions that make it work.</p></div><div className={styles.engineeringGrid}><PhotoFrame src="/learning-spaces/stem-engineering-project.webp" alt="A real student rover and electronics prototypes on the demonstration table at an Ignited Brains event" title="Student engineering, in the real world" caption="Authentic project-demonstration photograph from the supplied archive." /><ol className={styles.engineeringCallouts}>{engineering.map((item, i) => <li key={item.title} data-reveal style={{ transitionDelay: `${i * 60}ms` }}><span className={styles.smallBadge}><HomeIcon name={item.icon} /></span><div><h3>{item.title}</h3><p>{item.description}</p></div><span className={styles.calloutNumber}>0{i + 1}</span></li>)}</ol></div></section>
    <div className={`${styles.container} ${styles.projectsAndSkills}`} data-motion-section><ProjectBriefs items={stemProjects} /><Skills compact items={["Problem Solving", "Engineering Thinking", "Collaboration", "Experimentation", "Design Mindset", "Analytical Skills"]} description="Learning to explain a result, refine a design and work through uncertainty." /></div><LabEarth lab={stemLab} /></SolutionPage>;
}
