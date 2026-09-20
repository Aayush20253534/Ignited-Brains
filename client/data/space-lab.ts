import type { HomeIconName } from "@/components/home/home-icon";

export const spaceExperience: Array<{
  title: string;
  description: string;
  icon: HomeIconName;
}> = [
  { title: "Explore", description: "Celestial models and phenomena", icon: "space" },
  { title: "Observe", description: "Using telescopes and instruments", icon: "observe" },
  { title: "Experiment", description: "Hands-on activities and simulations", icon: "test" },
  { title: "Build", description: "Create models and prototypes", icon: "build" },
  { title: "Collaborate", description: "Work in teams on space projects", icon: "students" },
  { title: "Present", description: "Share ideas and discoveries", icon: "projects" },
];

export const spaceSkills: Array<{
  title: string;
  description: string;
  icon: HomeIconName;
}> = [
  { title: "Scientific Thinking", description: "Understand the universe through evidence.", icon: "stem" },
  { title: "Technical Knowledge", description: "Learn about space systems, missions and technologies.", icon: "build" },
  { title: "Problem Solving", description: "Apply concepts to real-world challenges.", icon: "think" },
  { title: "Creativity", description: "Turn ideas into innovative projects.", icon: "creativity" },
];

export const spaceLearningCycle: Array<{
  step: string;
  title: string;
  caption: string;
  icon: HomeIconName;
}> = [
  { step: "01", title: "Observe", caption: "Look closely. Ask questions.", icon: "observe" },
  { step: "02", title: "Think", caption: "Understand. Imagine.", icon: "think" },
  { step: "03", title: "Design", caption: "Plan and model solutions.", icon: "design" },
  { step: "04", title: "Build", caption: "Create using tools and technology.", icon: "build" },
  { step: "05", title: "Test", caption: "Experiment and evaluate.", icon: "test" },
  { step: "06", title: "Improve", caption: "Iterate and make it better.", icon: "improve" },
  { step: "07", title: "Share", caption: "Present and inspire others.", icon: "share" },
];

export const spaceComponents = [
  { title: "Rocket & Satellite Models", description: "Realistic, hands-on models", image: "/space-lab/gallery-main.webp", icon: "space" as HomeIconName },
  { title: "Telescopes", description: "For celestial observation", image: "/space-lab/telescope-observation.webp", icon: "observe" as HomeIconName },
  { title: "Planetary Models", description: "Explore our solar system", image: "/space-lab/planetary-models.webp", icon: "space" as HomeIconName },
  { title: "Lunar Lander & Rover", description: "Interactive exploration models", image: "/space-lab/lunar-simulation.webp", icon: "robotics" as HomeIconName },
  { title: "Simulation Tools", description: "Virtual space missions", image: "/space-lab/satellite-models.webp", icon: "innovation" as HomeIconName },
  { title: "Learning Resources", description: "Guides, kits and activities", image: "/space-lab/gallery-main.webp", icon: "projects" as HomeIconName },
];

export const spaceProjects = [
  {
    title: "Model Rocket Design",
    description: "Students designed and launched model rockets to understand aerodynamics.",
    image: "/space-lab/project-rocket.webp",
  },
  {
    title: "Mars Rover Prototype",
    description: "A student-built rover to navigate simulated terrain.",
    image: "/space-lab/project-mars-rover.webp",
  },
  {
    title: "Satellite Communication Model",
    description: "Exploring how satellites help us stay connected.",
    image: "/space-lab/project-satellite.webp",
  },
];
