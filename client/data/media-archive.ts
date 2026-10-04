export type ArchivePhoto = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  position?: string;
};

// Captions describe the supplied photographs without assigning identities or outcomes.
export const archivePhotos = {
  learning: {
    src: "/media-v2/students/learning-together.webp",
    alt: "Students and an instructor gathered at a computer in the AI and Robotics Lab",
    caption: "Learning together in the AI & Robotics Lab",
    width: 1500, height: 1000, position: "50% 46%",
  },
  lab: {
    src: "/media-v2/stories/curiosity-corner-lab.webp",
    alt: "Curiosity Corner lab with rocket models, a lunar lander display, robotics equipment and stools",
    caption: "Inside Curiosity Corner",
    width: 1500, height: 1000, position: "50% 53%",
  },
  vr: {
    src: "/media-v2/field/vr-demonstration.webp",
    alt: "A visitor trying a VR headset beside students and a table of robotics exhibits",
    caption: "A different perspective, through VR",
    width: 2048, height: 1366, position: "52% 44%",
  },
  robotics: {
    src: "/media-v2/stories/robotics-learning-space.webp",
    alt: "AI and Robotics learning displays alongside a lunar model and hands-on equipment",
    caption: "Space and robotics, side by side",
    width: 1600, height: 1200, position: "46% 45%",
  },
  team: {
    src: "/media-v2/students/exhibition-team.webp",
    alt: "Students and adults standing together at a Curiosity Corner science and robotics exhibition",
    caption: "Together at the science exhibition",
    width: 1600, height: 721, position: "50% 46%",
  },
  conversation: {
    src: "/media-v2/field/lab-conversation.webp",
    alt: "Visitors and the lab team in conversation beside space-science displays",
    caption: "A conversation inside the lab",
    width: 1350, height: 1012, position: "53% 48%",
  },
  welcome: {
    src: "/media-v2/field/curiosity-corner-welcome.webp",
    alt: "A group at Curiosity Corner holding a bouquet in front of a robotics mural",
    caption: "A welcome at Curiosity Corner",
    width: 1266, height: 1000, position: "50% 49%",
  },
  community: {
    src: "/media-v2/field/community-welcome.webp",
    alt: "Two visitors with a bouquet in front of the Curiosity Corner mural",
    caption: "People behind the learning spaces",
    width: 1200, height: 1600, position: "50% 46%",
  },
  presentation: {
    src: "/media-v2/field/lab-opening-presentation.webp",
    alt: "A framed Curiosity Corner Lab display being presented at the inauguration gathering",
    caption: "At the Curiosity Corner Lab opening",
    width: 1350, height: 1012, position: "50% 50%",
  },
  ceremony: {
    src: "/media-v2/field/opening-ceremony.webp",
    alt: "People gathered at the opening ceremony beside a floral arrangement and lectern",
    caption: "A gathering to open a new learning space",
    width: 1350, height: 1012, position: "50% 50%",
  },
  press: {
    src: "/media-v2/press/curiosity-lab-clipping.webp",
    alt: "Supplied Indian Express clipping dated August 17, 2026, reporting the Curiosity Lab launch in Kanjia village",
    caption: "The Indian Express · August 17, 2026 · Supplied press clipping",
    width: 1536, height: 1024,
  },
} satisfies Record<string, ArchivePhoto>;

export type ArchivePhotoId = keyof typeof archivePhotos;

export const articlePhotography: Record<string, ArchivePhotoId> = {
  "Why Hands-on Learning Matters in Today’s Education": "learning",
  "Inside a STEM Lab: What Students Really Learn": "lab",
};

export const visualStories: { photo: ArchivePhotoId; label: string; title: string }[] = [
  { photo: "vr", label: "A NEW PERSPECTIVE", title: "A different way to see." },
  { photo: "learning", label: "IN THE LAB", title: "Curiosity is a shared experience." },
  { photo: "robotics", label: "SPACE & ROBOTICS", title: "A room full of possibilities." },
];

export const learningMoments: { photo: ArchivePhotoId; title: string }[] = [
  { photo: "lab", title: "Step inside." },
  { photo: "learning", title: "Take a closer look." },
  { photo: "robotics", title: "Explore the exhibits." },
  { photo: "vr", title: "See another perspective." },
  { photo: "team", title: "Come together." },
  { photo: "presentation", title: "Make room for curiosity." },
];

export const fieldPhotoIds: ArchivePhotoId[] = ["community", "vr", "lab", "conversation", "welcome", "team"];

// This event and press entry come from the supplied clipping, not the generated mockup.
export const archiveEvents = [{
  title: "Curiosity Lab opens in Kanjia village",
  date: "August 2026",
  location: "Kanjia village, Prayagraj",
  description: "A new space for practical learning in AI, robotics, STEM and space science.",
  photo: "ceremony" as ArchivePhotoId,
}];

export const pressCoverage = [{
  publication: "The Indian Express",
  date: "August 17, 2026",
  title: "Curiosity Lab launched in Kanjia village to spark rural innovation in science and space",
  photo: "press" as ArchivePhotoId,
}];
