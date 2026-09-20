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
    hero: "/home/hero-robotics.webp",
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
    indiaImpact: "/media/india.png",
  },
  about: {
    hero: "/about/hero-robotics.webp",
    story: "/about/story-students.webp",
    mission: "/about/mission-astronaut.webp",
    vision: "/about/vision-student.webp",
    indiaImpact: "/about/india-impact.webp",
    ctaEarth: "/about/cta-earth.webp",
  },
  solutions: {
    hero: "/solutions/hero-robotics.webp",
    spaceLab: "/solutions/space-lab.webp",
    stemLab: "/solutions/stem-lab.webp",
    aiRobotics: "/solutions/ai-robotics-lab.webp",
    sciencePark: "/solutions/science-park.webp",
    astronaut: "/solutions/astronaut-student.webp",
  },
  spaceLab: {
    hero: "/space-lab/hero-telescope.webp",
    galleryMain: "/space-lab/gallery-main.webp",
    telescope: "/space-lab/telescope-observation.webp",
    satellite: "/space-lab/satellite-models.webp",
    lunar: "/space-lab/lunar-simulation.webp",
    planetary: "/space-lab/planetary-models.webp",
    astronaut: "/space-lab/astronaut.webp",
    video: "/space-lab/video-space-experience.webp",
    rocketProject: "/space-lab/project-rocket.webp",
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
    hero: "/projects/hero-students-rover.webp",
    rocket: "/projects/model-rocket.webp",
    rover: "/projects/autonomous-rover.webp",
    sciencePark: "/projects/solar-system-park.webp",
    featured: "/projects/featured-mars-rover.webp",
    testimonialAnanya: "/projects/testimonial-ananya.webp",
    testimonialRaghav: "/projects/testimonial-raghav.webp",
    testimonialPriya: "/projects/testimonial-priya.webp",
    gallerySpace: "/projects/gallery-space.webp",
    galleryBuild: "/projects/gallery-build.webp",
    galleryTeam: "/projects/gallery-team.webp",
    galleryPark: "/projects/gallery-park.webp",
  },
  media: {
    hero: "/media/hero-robotics.webp",
    featured: "/media/featured-rover.webp",
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
    indiaCoverage: "/contact/india-coverage.webp",
    faqVisual: "/contact/faq-robotics.webp",
  },
} as const;

export function publicAsset(path: string) {
  if (!path.startsWith("/")) {
    throw new Error(`Public asset paths must begin with "/": ${path}`);
  }

  return path;
}
