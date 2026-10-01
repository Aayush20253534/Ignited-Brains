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
    image: "/media/space.jpeg",
    imageAlt: "Student observing space models through a telescope in a space lab",
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
    image: "/media/stem.jpeg",
    imageAlt: "Students building an engineering structure in a STEM lab",
    href: "/solutions#stem-lab",
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
    image: "/media/ai.jpeg",
    imageAlt: "Student programming a robot in an AI and robotics lab",
    href: "/solutions#ai-robotics-lab",
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
    image: "/media/park.png",
    imageAlt: "Students exploring an outdoor interactive science park",
    href: "/solutions#science-park",
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
  { label: "Space Lab", icon: "space" as HomeIconName, href: "/solutions/space-lab" },
  { label: "STEM Lab", icon: "stem" as HomeIconName, href: "/solutions#stem-lab" },
  { label: "AI & Robotics Lab", icon: "robotics" as HomeIconName, href: "/solutions#ai-robotics-lab" },
  { label: "Science Park", icon: "park" as HomeIconName, href: "/solutions#science-park" },
];
