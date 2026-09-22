import type { HomeIconName } from "@/components/home/home-icon";

export const projectImpact = [
  { value: "XX+", label: "Schools Enabled", icon: "school" as HomeIconName },
  { value: "XX+", label: "Labs Created", icon: "lab" as HomeIconName },
  { value: "XX+", label: "Students Engaged", icon: "students" as HomeIconName },
  { value: "XX+", label: "Projects Built", icon: "projects" as HomeIconName },
];

export const projectCategories = [
  "All",
  "Space Lab",
  "STEM Lab",
  "AI & Robotics",
  "Science Park",
  "Student Projects",
  "Events",
] as const;

export type ProjectCategory = (typeof projectCategories)[number];

export type ProjectCard = {
  title: string;
  category: Exclude<ProjectCategory, "All">;
  location: string;
  description: string;
  image: string;
};

export const projectCards: ProjectCard[] = [
  {
    title: "Model Rocket Program",
    category: "Space Lab",
    location: "Prayagraj, Uttar Pradesh",
    description: "Students designed and launched model rockets to understand aerodynamics and space science.",
    image: "/media/space.jpeg",
  },
  {
    title: "Autonomous Rover Project",
    category: "AI & Robotics",
    location: "Varanasi, Uttar Pradesh",
    description: "Students built and programmed an autonomous rover to navigate obstacles.",
    image: "/media/car.jpeg",
  },
  {
    title: "Interactive Solar System Park",
    category: "Science Park",
    location: "Lucknow, Uttar Pradesh",
    description: "An outdoor science park with hands-on exhibits to make science fun and engaging.",
    image: "/media/solar-park.png",
  },
];

export const featuredProjectBullets = [
  "Hands-on engineering and coding experience",
  "Real-time data transmission",
  "Built by high school students with mentor support",
];

export const projectTestimonials = [
  {
    quote: "I never thought I could build a working robot. Now I want to become an engineer!",
    name: "Ananya Sharma",
    role: "Class 10 Student",
    image: "/media/ananya.png",
  },
  {
    quote: "The Space Lab made science real for me. It’s not just a subject anymore.",
    name: "Raghav Singh",
    role: "Class 9 Student",
    image: "/media/raghav.png",
  },
  {
    quote: "Ignited Brains has brought a new energy to our school. Students are more curious, confident and creative.",
    name: "Priya Verma",
    role: "Science Teacher",
    image: "/media/mam.png",
  },
];

export const projectGallery = [
  { label: "Exploring the skies", image: "/media/tele.jpeg" },
  { label: "Building solutions", image: "/media/media-hero.png" },
  { label: "Learning together", image: "/media/project-hero.png" },
  { label: "Science through play", image: "/media/solution.png" },
];

export const projectImpactBenefits: Array<{ label: string; icon: HomeIconName }> = [
  { label: "More Opportunities", icon: "students" },
  { label: "Stronger Schools", icon: "school" },
  { label: "Innovative Students", icon: "innovation" },
  { label: "Brighter Communities", icon: "share" },
];
