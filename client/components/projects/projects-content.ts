import { featuredProjectBullets, projectCards } from "@/data/projects";

export type ProjectDetail = {
  id: string;
  title: string;
  category: string;
  location: string;
  description: string;
  image: string;
  alt: string;
  features?: string[];
};

const artwork: Record<string, { id: string; image: string; alt: string }> = {
  "Autonomous Rover Project": { id: "autonomous-rover", image: "rover-showcase", alt: "Engineering illustration of an educational rover on a simulated rocky test course" },
  "Model Rocket Program": { id: "model-rocket", image: "rocket-showcase", alt: "Illustration of an educational model rocket launching from a test platform" },
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
  image: "/projects-v2/featured-rover.webp",
  alt: "Engineering concept visualization of a student Mars rover with sensors and a camera mast",
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
  { image: "gallery-space", caption: "Exploring the skies", alt: "Editorial illustration of students exploring astronomy with a telescope and planetary display" },
  { image: "gallery-robotics", caption: "Building solutions", alt: "Editorial illustration of student hands connecting rover electronics" },
  { image: "gallery-build", caption: "Learning together", alt: "Editorial illustration of a student team building an engineering prototype" },
  { image: "gallery-science", caption: "Science through play", alt: "Editorial illustration of students exploring an interactive planetary exhibit" },
  { image: "gallery-testing", caption: "Testing ideas", alt: "Editorial illustration of students testing a rover on a ramp" },
];
