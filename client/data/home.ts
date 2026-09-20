import type { HomeIconName } from "@/components/home/home-icon";
import { pageAssetSlots } from "@/lib/assets";

export const homePrinciples: Array<{
  icon: HomeIconName;
  title: string;
  description: string;
}> = [
  { icon: "curiosity", title: "Curiosity", description: "Ask Better Questions" },
  { icon: "creativity", title: "Creativity", description: "Turn Ideas into Reality" },
  { icon: "innovation", title: "Innovation", description: "Build a Brighter Tomorrow" },
];

export const impactWords = [
  { number: "01", title: "Curiosity", description: "Ask. Explore. Wonder." },
  { number: "02", title: "Creativity", description: "Imagine. Design. Build." },
  { number: "03", title: "Innovation", description: "Solve. Impact. Lead." },
];

export const transformationSteps = [
  {
    label: "Traditional Classroom",
    caption: "Learn Theory",
    image: pageAssetSlots.home.classroom,
  },
  { label: "Question", caption: 'Ask "Why?"', image: pageAssetSlots.home.question },
  { label: "Experiment", caption: "Explore Possibilities", image: pageAssetSlots.home.experiment },
  { label: "Build", caption: "Create Solutions", image: pageAssetSlots.home.build },
  { label: "Discover", caption: "Make an Impact", image: pageAssetSlots.home.discover },
];

export const homeSolutions: Array<{
  title: string;
  description: string;
  image: string;
  icon: HomeIconName;
  href: string;
}> = [
  {
    title: "Space Lab",
    description: "Rocket and satellite models, telescopes and hands-on space science experiences.",
    image: pageAssetSlots.home.solutionSpaceLab,
    icon: "space",
    href: "/solutions/space-lab",
  },
  {
    title: "STEM Lab",
    description: "Experiment, engineer and solve real problems through science, technology, engineering and maths.",
    image: pageAssetSlots.home.solutionStemLab,
    icon: "stem",
    href: "/solutions#stem-lab",
  },
  {
    title: "AI & Robotics Lab",
    description: "Robots, coding, AI projects and 3D printing for the next generation of innovators.",
    image: pageAssetSlots.home.solutionAiRobotics,
    icon: "robotics",
    href: "/solutions#ai-robotics-lab",
  },
  {
    title: "Science Park",
    description: "Interactive exhibits where science is learned through play and exploration.",
    image: pageAssetSlots.home.solutionSciencePark,
    icon: "park",
    href: "/solutions#science-park",
  },
];

export const learningCycle: Array<{
  step: string;
  title: string;
  description: string;
  icon: HomeIconName;
}> = [
  { step: "01", title: "Observe", description: "Look closely\nAsk questions", icon: "observe" },
  { step: "02", title: "Think", description: "Understand\nImagine", icon: "think" },
  { step: "03", title: "Design", description: "Plan ideas\nModel solutions", icon: "design" },
  { step: "04", title: "Build", description: "Create\nCollaborate", icon: "build" },
  { step: "05", title: "Test", description: "Try, measure\nLearn", icon: "test" },
  { step: "06", title: "Improve", description: "Iterate\nSolve", icon: "improve" },
  { step: "07", title: "Share", description: "Present\nInspire", icon: "share" },
];

export const impactStats: Array<{
  value: string;
  label: string;
  icon: HomeIconName;
}> = [
  { value: "XX+", label: "Schools Enabled", icon: "school" },
  { value: "XX+", label: "Labs Created", icon: "lab" },
  { value: "XX+", label: "Students Engaged", icon: "students" },
  { value: "XX+", label: "Projects Built", icon: "projects" },
];
