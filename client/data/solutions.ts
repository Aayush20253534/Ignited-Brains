import type { HomeIconName } from "@/components/home/home-icon";

export const solutionHeroPrinciples: Array<{
  title: string;
  description: string;
  icon: HomeIconName;
}> = [
  { title: "Future-ready Infrastructure", description: "Spaces made for tomorrow", icon: "school" },
  { title: "Hands-on Learning", description: "Learn by doing", icon: "students" },
  { title: "Real-world Problem Solving", description: "Ideas into action", icon: "think" },
  { title: "Inspiring the Next Generation", description: "Curiosity with purpose", icon: "innovation" },
];

export const solutionShowcase = [
  {
    index: "01",
    slug: "space-lab",
    kicker: "Space Lab",
    title: "Space science students can touch.",
    description:
      "A hands-on environment where students explore space science through models, observation and experimentation.",
    image: "/learning-spaces/space-exhibits-isro.webp",
    imageAlt: "Young visitors wearing astronaut costumes with ISRO patches inside the Space Lab",
    href: "/solutions/space-lab",
    action: "Explore Space Lab",
    icon: "space" as HomeIconName,
    bullets: ["Rocket & satellite models", "Telescopes & celestial observation", "Real space science experiences"],
    imageFirst: false,
  },
  {
    index: "02",
    slug: "stem-lab",
    kicker: "STEM Lab",
    title: "Observe. Think. Design. Build.",
    description:
      "A hands-on environment where students learn STEM through experimentation, engineering and problem solving.",
    image: "/blog/stem-learning-wall.webp",
    imageAlt: "Real STEM experiments and physical models at the Curiosity Corner learning wall",
    href: "/solutions/stem-lab",
    action: "Explore STEM Lab",
    icon: "stem" as HomeIconName,
    bullets: ["Science experiments", "Engineering models", "Mathematics in action", "Electronics and mechanics"],
    imageFirst: true,
  },
  {
    index: "03",
    slug: "ai-robotics-lab",
    kicker: "AI & Robotics Lab",
    title: "Code it. Build it. Make it move.",
    description:
      "Students program, prototype and build real-world systems using robotics, coding, AI and digital fabrication.",
    image: "/learning-spaces/robotics-card.webp",
    imageAlt: "Students and educators demonstrating physical robotics projects at an Ignited Brains event",
    href: "/solutions/ai-robotics-lab",
    action: "Explore AI & Robotics",
    icon: "robotics" as HomeIconName,
    bullets: ["Robotics & automation", "Coding & AI projects", "3D printing & prototyping", "Real-world applications"],
    imageFirst: false,
  },
  {
    index: "04",
    slug: "science-park",
    kicker: "Science Park",
    title: "Where science becomes play.",
    description:
      "Interactive science spaces where students discover scientific concepts through movement, experimentation and exploration.",
    image: "/learning-spaces/park-sound-concept.webp",
    imageAlt: "Illustrative Science Park concept with students exploring sound dishes and a pendulum",
    href: "/solutions/science-park",
    action: "Explore Science Park",
    icon: "park" as HomeIconName,
    bullets: ["Interactive exhibits", "Physical science models", "Outdoor learning spaces", "Fun, hands-on learning"],
    imageFirst: true,
  },
];

export const solutionLearningCycle: Array<{
  step: string;
  title: string;
  icon: HomeIconName;
}> = [
  { step: "01", title: "Observe", icon: "observe" },
  { step: "02", title: "Think", icon: "think" },
  { step: "03", title: "Design", icon: "design" },
  { step: "04", title: "Build", icon: "build" },
  { step: "05", title: "Test", icon: "test" },
  { step: "06", title: "Improve", icon: "improve" },
  { step: "07", title: "Share", icon: "share" },
];

export const solutionTabs = [
  { label: "Space Lab", icon: "space" as HomeIconName, href: "/solutions/space-lab", image: solutionShowcase[0].image, imageAlt: "Space Lab with rocket and satellite exhibits", caption: "Explore the universe" },
  { label: "STEM Lab", icon: "stem" as HomeIconName, href: "/solutions/stem-lab", image: solutionShowcase[1].image, imageAlt: "STEM Lab with science and engineering models", caption: "Experiment and engineer" },
  { label: "AI & Robotics Lab", icon: "robotics" as HomeIconName, href: "/solutions/ai-robotics-lab", image: solutionShowcase[2].image, imageAlt: "AI and Robotics Lab with coding and automation exhibits", caption: "Code, build and automate" },
  { label: "Science Park", icon: "park" as HomeIconName, href: "/solutions/science-park", image: solutionShowcase[3].image, imageAlt: "Science Park entrance and outdoor learning exhibits", caption: "Discover through play" },
];
