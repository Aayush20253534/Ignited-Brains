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
  "Autonomous Rover Project": { id: "autonomous-rover", image: "rover-field-demo", alt: "Learners and mentors examining a working student robotics prototype during a lab demonstration", imageNote: "Photograph from the Ignited Brains lab archive." },
  "Model Rocket Program": { id: "model-rocket", image: "rocket-design-workbench", alt: "Students checking the fin alignment of a small cardboard model rocket on a workbench" },
  "Interactive Solar System Park": { id: "solar-system-park", image: "science-park-showcase", alt: "Illustration of students exploring planetary models in an outdoor science park" },
};

export const showcaseProjects: ProjectDetail[] = projectCards.map(project => ({
  ...project,
  ...artwork[project.title],
  image: `/projects-v2/${artwork[project.title].image}.webp`,
})).sort((a, b) => Number(b.id === "autonomous-rover") - Number(a.id === "autonomous-rover"));

// Existing featured-project facts moved from app/projects/page.tsx without changing them.
export const featuredRover: ProjectDetail = {
  id: "mars-rover",
  title: "Mars Rover Prototype",
  category: "AI & Robotics Lab",
  location: "NIT Mentorship Program",
  description: "A student-built Mars rover designed to navigate rocky terrain, collect environmental data and transmit it back to a base station.",
  features: featuredProjectBullets,
  image: "/projects-v2/rover-terrain-test.webp",
  alt: "Student-made red rover with exposed electronics and yellow wheels on a tabletop terrain test course",
  imageNote: "Educational visual based on the student-built rover prototype.",
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
  { image: "build-design", title: "Designing", icon: "design", alt: "Illustration of students planning a rover around engineering sketches" },
  { image: "build-assembly", title: "Building", icon: "build", alt: "Illustration of two students assembling a rover together" },
  { image: "build-programming", title: "Programming", icon: "code", alt: "Illustration of a student programming a rover beside a laptop" },
  { image: "build-testing", title: "Testing", icon: "test", alt: "Illustration of students observing a rover on an obstacle course" },
  { image: "build-improving", title: "Improving", icon: "improve", alt: "Illustration of students adjusting sensors after testing" },
] as const;

export const galleryScenes = [
  { image: "gallery-lab-overview", caption: "Spaces for discovery", alt: "The Ignited Brains Curiosity Corner lab with space models and robotics exhibits" },
  { image: "gallery-robotics-exhibits", caption: "Exploring robotics", alt: "Hands-on electronic models displayed at the AI and Robotics Lab" },
  { image: "gallery-space-costumes", caption: "Imagining exploration", alt: "Young visitors in silver astronaut costumes beside the Curiosity Corner display" },
  { image: "gallery-stem-experiments", caption: "Science through making", alt: "A collection of working science and engineering models at the STEM exhibit" },
  { image: "gallery-testing", caption: "Testing ideas", alt: "Editorial illustration of students testing a rover on a ramp" },
];
