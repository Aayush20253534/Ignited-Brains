import { RobotSystem } from "@/components/solutions/exploration";
import { LabEarth, LabHero, LearningJourney, ProjectBriefs, Skills, SolutionPage, TopicPanel } from "@/components/solutions/learning-space";
import { roboticsLab, roboticsProjects, roboticsTopics } from "@/data/lab-programmes";
import { solutionMetadata } from "@/lib/solution-metadata";
import styles from "@/components/solutions/solutions.module.css";

export const metadata = solutionMetadata(roboticsLab);
export default function RoboticsLabPage() {
  return <SolutionPage><LabHero lab={roboticsLab} /><LearningJourney steps={roboticsLab.journey} description="A journey that connects instructions, hardware and useful real-world solutions." /><div className={`${styles.container} ${styles.roboticsLayout}`} data-motion-section><TopicPanel title="What students explore" description="A multidisciplinary lab connecting hardware, software and intelligent systems." topics={roboticsTopics} /><RobotSystem /><ProjectBriefs items={roboticsProjects} dark /></div><div className={`${styles.container} ${styles.skillsSection}`}><Skills items={["Problem Solving", "Logical Thinking", "Creativity & Innovation", "Technical Skills", "Collaboration", "Design Mindset", "Real-world Application"]} description="Understand a system. Debug a problem. Build with purpose." /></div><LabEarth lab={roboticsLab} /></SolutionPage>;
}
