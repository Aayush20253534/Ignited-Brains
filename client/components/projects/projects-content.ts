import { featuredProjectBullets, projectCards } from "@/data/projects";

export type ProjectDetail = {
  id: string;
  title: string;
  category: string;
  location: string;
  description: string;
  image: string;
  alt: string;
  imageNote?: string;
  features?: string[];
};

const artwork: Record<string, { id: string; image: string; alt: string; imageNote?: string }> = {
  "Autonomous Rover Project": { id: "autonomous-rover", image: "rover-team-demonstration", alt: "The real student engineering team displaying a hand-built red rover outdoors", imageNote: "Actual rover-team photograph from the supplied project archive." },
  "Model Rocket Program": { id: "model-rocket", image: "/blog/space-lab-models.webp", alt: "Actual educational rocket models displayed in the Ignited Brains Space Lab", imageNote: "Real lab exhibit photograph illustrating the rocket programme; not a launch photograph." },
  "Interactive Solar System Park": { id: "solar-system-park", image: "solar-system-concept", alt: "Illustrative outdoor learning concept with students examining a physical solar-system model", imageNote: "Generated programme concept. No verified outdoor Science Park installation photograph was available in the supplied archive." },
};

export const showcaseProjects: ProjectDetail[] = projectCards.map(project => ({
  ...project,
  ...artwork[project.title],
  image: artwork[project.title].image.startsWith("/") ? artwork[project.title].image : `/projects-v2/${artwork[project.title].image}.webp`,
})).sort((a, b) => Number(b.id === "autonomous-rover") - Number(a.id === "autonomous-rover"));

// Existing featured-project facts moved from app/projects/page.tsx without changing them.
export const featuredRover: ProjectDetail = {
  id: "mars-rover",
  title: "Mars Rover Prototype",
  category: "AI & Robotics Lab",
  location: "NIT Mentorship Program",
  description: "A student-built Mars rover designed to navigate rocky terrain, collect environmental data and transmit it back to a base station.",
  features: featuredProjectBullets,
  image: "/projects-v2/rover-team-prototype.webp",
  alt: "The real engineering team presenting its student-built red rover at an outdoor project exhibition",
  imageNote: "Actual prototype photograph from the supplied project archive, taken at a public demonstration.",
};

export const journey = [
  { title: "Question", caption: "What problem can we solve?", icon: "question" },
  { title: "Imagine", caption: "Explore possibilities.", icon: "imagine" },
  { title: "Design", caption: "Turn ideas into plans.", icon: "design" },
  { title: "Build", caption: "Create the prototype.", icon: "build" },
  { title: "Test", caption: "Learn from what fails.", icon: "test" },
  { title: "Improve", caption: "Build it better.", icon: "improve" },
] as const;

export const buildStages = [
  { image: "archive-design", title: "Designing", icon: "design", alt: "An educator presenting ideas at a Curiosity Corner learning event" },
  { image: "archive-building", title: "Building", icon: "build", alt: "An engineering participant displaying a completed hand-built rover at a project exhibition" },
  { image: "archive-programming", title: "Programming", icon: "code", alt: "An instructor beside the AI and Robotics Lab equipment used for programming and physical computing" },
  { image: "archive-testing", title: "Testing", icon: "test", alt: "A real rover and VR equipment being demonstrated at a public project event" },
  { image: "archive-improving", title: "Improving", icon: "improve", alt: "The lab team discussing hands-on learning equipment with visitors" },
] as const;

export const galleryScenes = [
  { image: "gallery-lab-overview", caption: "Spaces for discovery", alt: "The Ignited Brains Curiosity Corner lab with space models and robotics exhibits" },
  { image: "gallery-robotics-exhibits", caption: "Exploring robotics", alt: "Hands-on electronic models displayed at the AI and Robotics Lab" },
  { image: "gallery-space-costumes-isro", caption: "Imagining exploration", alt: "Young visitors in silver astronaut costumes with ISRO patches beside the Curiosity Corner display" },
  { image: "gallery-stem-experiments", caption: "Science through making", alt: "A collection of working science and engineering models at the STEM exhibit" },
  { image: "gallery-community", caption: "Sharing discovery", alt: "Students and the school community gathering at a real Curiosity Corner event" },
];
