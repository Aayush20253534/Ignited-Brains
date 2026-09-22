export type AssetFamily =
  | "brand"
  | "common"
  | "home"
  | "about"
  | "solutions"
  | "space-lab"
  | "schools"
  | "projects"
  | "media"
  | "contact"
  | "icons"
  | "decorative";

export type AssetSlot = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export const commonAssets = {
  indiaFlag: {
    src: "/icons/india-flag.svg",
    alt: "India flag",
    width: 30,
    height: 20,
  },
  playIcon: {
    src: "/icons/play.svg",
    alt: "",
    width: 48,
    height: 48,
  },
  arrowRight: {
    src: "/icons/arrow-right.svg",
    alt: "",
    width: 20,
    height: 20,
  },
  starField: {
    src: "/decorative/space-stars.svg",
    alt: "",
    width: 1600,
    height: 900,
  },
  orbitRings: {
    src: "/decorative/orbit-rings.svg",
    alt: "",
    width: 900,
    height: 900,
  },
  blueprintGrid: {
    src: "/decorative/blueprint-grid.svg",
    alt: "",
    width: 1200,
    height: 800,
  },
  orangeSpark: {
    src: "/decorative/orange-spark.svg",
    alt: "",
    width: 240,
    height: 120,
  },
} satisfies Record<string, AssetSlot>;

export const pageAssetSlots = {
  home: {
    hero: "/media/hero.mp4",
    classroom: "/media/cls.png",
    question: "/media/q.png",
    experiment: "/media/exp.jpeg",
    build: "/media/buil.jpeg",
    discover: "/home/hero-robotics.webp",
    solutionSpaceLab: "/media/space.jpeg",
    solutionStemLab: "/media/stem.jpeg",
    solutionAiRobotics: "/media/ai.jpeg",
    solutionSciencePark: "/media/park.png",
    storyVideo: "/home/story-video.webp",
    impactStudent: "/media/build.jpeg",
    marsRover: "/media/car.jpeg",
    marsThumbOne: "/home/mars-thumb-01.webp",
    marsThumbTwo: "/home/mars-thumb-02.webp",
    marsThumbThree: "/home/mars-thumb-03.webp",
    indiaImpact: "/media/home.png",
  },
  about: {
    hero: "/media/about.png",
    story: "/media/img.jpeg",
    mission: "/about/mission-astronaut.webp",
    vision: "/media/space.jpeg",
    indiaImpact: "/media/about hero.png",
    ctaEarth: "/about/cta-earth.webp",
  },
  solutions: {
    hero: "/media/solution.png",
    spaceLab: "/media/space.jpeg",
    stemLab: "/media/stem.jpeg",
    aiRobotics: "/media/ai.jpeg",
    sciencePark: "/media/park.png",
    astronaut: "/media/v.png",
  },
  spaceLab: {
    hero: "/space-lab/hero-telescope.webp",
    galleryMain: "/space-lab/gallery-main.webp",
    telescope: "/space-lab/telescope-observation.webp",
    satellite: "/space-lab/satellite-models.webp",
    lunar: "/space-lab/lunar-simulation.webp",
    planetary: "/space-lab/planetary-models.webp",
    astronaut: "/media/v.jpeg",
    video: "/space-lab/video-space-experience.webp",
    rocketProject: "/media/v.png",
    marsProject: "/space-lab/project-mars-rover.webp",
    satelliteProject: "/space-lab/project-satellite.webp",
  },
  schools: {
    hero: "/schools/hero-campus-robotics.webp",
    spaceInfrastructure: "/schools/space-infrastructure.webp",
    labEquipment: "/schools/lab-equipment.webp",
    learningModels: "/schools/learning-models.webp",
    robotics: "/schools/technology-robotics.webp",
    scienceExhibits: "/schools/science-exhibits.webp",
    learningExperience: "/schools/learning-experience.webp",
    testimonial: "/schools/testimonial-student.webp",
    ctaStudent: "/schools/cta-student.webp",
  },
  projects: {
    hero: "/media/project-hero.png",
    rocket: "/media/v.png",
    rover: "/media/car.jpeg",
    sciencePark: "/media/park.png",
    featured: "/media/mars-robo.jpeg",
    testimonialAnanya: "/projects/testimonial-ananya.webp",
    testimonialRaghav: "/projects/testimonial-raghav.webp",
    testimonialPriya: "/projects/testimonial-priya.webp",
    gallerySpace: "/media/space.png",
    galleryBuild: "/projects/gallery-build.webp",
    galleryTeam: "/media/field-build.webp",
    galleryPark: "/projects/gallery-park.webp",
  },
  media: {
    hero: "/media/media-hero.png",
    featured: "/media/mars-robo.jpeg",
    articleHandsOn: "/media/article-hands-on.webp",
    articleStem: "/media/article-stem.webp",
    articleSciencePark: "/media/article-science-park.webp",
    videoSpace: "/media/video-space-lab.webp",
    videoRover: "/media/video-rover.webp",
    videoPark: "/media/video-science-park.webp",
    fieldSpace: "/media/field-space.webp",
    fieldBuild: "/media/field-build.webp",
    fieldLearning: "/media/field-learning.webp",
    fieldPark: "/media/field-park.webp",
    newsletterEarth: "/media/newsletter-earth.webp",
  },
  contact: {
    hero: "/contact/hero-student-rocket.webp",
    indiaCoverage: "/media/about.png",
    faqVisual: "/contact/faq-robotics.webp",
  },
} as const;

export function publicAsset(path: string) {
  if (!path.startsWith("/")) {
    throw new Error(`Public asset paths must begin with "/": ${path}`);
  }

  return path;
}
