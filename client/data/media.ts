export const mediaCategories = [
  "All",
  "Articles",
  "Videos",
  "School Activities",
  "Student Projects",
] as const;

export type MediaCategory = (typeof mediaCategories)[number];

export type MediaArticle = {
  title: string;
  description: string;
  category: Exclude<MediaCategory, "All">;
  date: string;
  readTime: string;
  image: string;
  video?: string;
  body?: string[];
};

export const mediaArticles: MediaArticle[] = [
  {
    title: "Why Hands-on Learning Matters in Today’s Education",
    description: "Exploring how experiential learning builds curiosity, creativity and problem solving skills.",
    category: "Articles",
    date: "Sep 15, 2026",
    readTime: "Overview",
    image: "/media/article-hands-on.webp",
  },
  {
    title: "Inside a STEM Lab: What Students Really Learn",
    description: "A look at the real skills, mindset and confidence students develop through experimentation.",
    category: "Student Projects",
    date: "Sep 10, 2026",
    readTime: "Overview",
    image: "/media/article-stem.webp",
  },
  {
    title: "Science Parks: Making Learning a Hands-on Experience",
    description: "How interactive exhibits turn complex concepts into fun, memorable experiences for students.",
    category: "School Activities",
    date: "Aug 28, 2026",
    readTime: "Overview",
    image: "/media/article-science-park.webp",
  },
];

export const mediaVideos: MediaArticle[] = [
  {
    title: "A vision for innovation spaces",
    description: "A short visual introduction to learning environments that encourage students to explore and build.",
    category: "Videos", date: "", readTime: "Short film",
    image: "/home/hero-robotics.webp", video: "/media/hero.mp4",
  },
  {
    title: "Learning through making",
    description: "A visual introduction to our approach to hands-on science and robotics learning.",
    category: "Videos", date: "", readTime: "Short film",
    image: "/home/story-video.webp", video: "/media/homeimg.mp4",
  },
];

export const mediaStories = [...mediaArticles, ...mediaVideos];

export const fieldStories = [
  { title: "Exploring the universe", image: "/media/field-space.webp" },
  { title: "Building together", image: "/media/field-build.webp" },
  { title: "Learning by doing", image: "/media/field-learning.webp" },
  { title: "Science for everyone", image: "/media/field-park.webp" },
];
