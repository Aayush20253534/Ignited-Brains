import type { HomeIconName } from "@/components/home/home-icon";

export const aboutPrinciples: Array<{
  title: string;
  description: string;
  icon: HomeIconName;
}> = [
  { title: "Curiosity", description: "Ask Better Questions", icon: "curiosity" },
  { title: "Creativity", description: "Turn Ideas into Reality", icon: "creativity" },
  { title: "Innovation", description: "Build a Brighter Tomorrow", icon: "innovation" },
];

export const discoveryJourney: Array<{
  title: string;
  caption: string;
  icon: HomeIconName;
}> = [
  { title: "Question", caption: "Why?", icon: "curiosity" },
  { title: "Curiosity", caption: "Explore", icon: "observe" },
  { title: "Experiment", caption: "Try", icon: "test" },
  { title: "Discovery", caption: "Learn", icon: "think" },
  { title: "Creation", caption: "Build", icon: "build" },
  { title: "Innovation", caption: "Impact", icon: "innovation" },
];

export const aboutValues: Array<{
  index: string;
  title: string;
  description: string;
  action: string;
  icon: HomeIconName;
}> = [
  {
    index: "01",
    title: "Curiosity",
    description: "Every discovery starts with a question.",
    action: "Stay Curious",
    icon: "curiosity",
  },
  {
    index: "02",
    title: "Creativity",
    description: "Every idea deserves a chance to become real.",
    action: "Create Without Limits",
    icon: "creativity",
  },
  {
    index: "03",
    title: "Innovation",
    description: "Every learner can contribute to the future.",
    action: "Innovate Together",
    icon: "innovation",
  },
];

export const storyMilestones = [
  { title: "The Idea", description: "A simple belief in the power of hands-on learning." },
  { title: "First Steps", description: "Building initial labs and learning experiences." },
  { title: "Growing Impact", description: "Working with more schools and institutions." },
  { title: "A Bigger Vision", description: "Igniting curiosity and innovation at scale." },
  { title: "The Journey Continues", description: "Building a brighter, innovation-driven India." },
];

export const differentiators: Array<{
  title: string;
  description: string;
  icon: HomeIconName;
}> = [
  {
    title: "Hands-on Learning",
    description: "Learn by doing, not just reading.",
    icon: "stem",
  },
  {
    title: "Future-ready Technology",
    description: "Modern tools for tomorrow's challenges.",
    icon: "robotics",
  },
  {
    title: "Real-world Problem Solving",
    description: "Turn ideas into meaningful solutions.",
    icon: "students",
  },
  {
    title: "Student-led Exploration",
    description: "Empowering students to take the lead.",
    icon: "space",
  },
];

export const indiaCommitments: Array<{
  title: string;
  icon: HomeIconName;
}> = [
  { title: "More Opportunities", icon: "innovation" },
  { title: "Stronger Schools", icon: "school" },
  { title: "Brighter Communities", icon: "students" },
  { title: "A More Innovative India", icon: "space" },
];
