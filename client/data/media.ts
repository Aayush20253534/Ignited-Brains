export const mediaCategories = [
  "All",
  "Articles",
  "Videos",
  "School Activities",
  "Student Projects",
  "Events",
  "Announcements",
] as const;

export type MediaCategory = (typeof mediaCategories)[number];

export type MediaArticle = {
  title: string;
  description: string;
  category: Exclude<MediaCategory, "All">;
  date: string;
  readTime: string;
  image: string;
};

export const mediaArticles: MediaArticle[] = [
  {
    title: "Why Hands-on Learning Matters in Today’s Education",
    description: "Exploring how experiential learning builds curiosity, creativity and problem solving skills.",
    category: "Articles",
    date: "Sep 15, 2026",
    readTime: "5 min read",
    image: "/media/article-hands-on.webp",
  },
  {
    title: "Inside a STEM Lab: What Students Really Learn",
    description: "A look at the real skills, mindset and confidence students develop through experimentation.",
    category: "Student Projects",
    date: "Sep 10, 2026",
    readTime: "4 min read",
    image: "/media/article-stem.webp",
  },
  {
    title: "Science Parks: Making Learning a Hands-on Experience",
    description: "How interactive exhibits turn complex concepts into fun, memorable experiences for students.",
    category: "School Activities",
    date: "Aug 28, 2026",
    readTime: "5 min read",
    image: "/media/article-science-park.webp",
  },
];

export const mediaVideos = [
  {
    title: "A Day at the Space Lab",
    description: "Explore, experiment and dream beyond the classroom.",
    duration: "02:45",
    image: "/media/video-space-lab.webp",
  },
  {
    title: "Students Build an Autonomous Rover",
    description: "From idea to prototype — powered by curiosity.",
    duration: "02:12",
    image: "/media/video-rover.webp",
  },
  {
    title: "Science Park in Action",
    description: "Learning through play, movement and exploration.",
    duration: "01:56",
    image: "/media/video-science-park.webp",
  },
];

export const fieldStories = [
  { title: "Exploring the universe", image: "/media/field-space.webp" },
  { title: "Building together", image: "/media/field-build.webp" },
  { title: "Learning by doing", image: "/media/field-learning.webp" },
  { title: "Science for everyone", image: "/media/field-park.webp" },
];
