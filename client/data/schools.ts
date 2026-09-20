import type { HomeIconName } from "@/components/home/home-icon";

export const schoolHeroBenefits: Array<{
  title: string;
  icon: HomeIconName;
}> = [
  { title: "Future-ready Schools", icon: "school" },
  { title: "Experiential Learning", icon: "students" },
  { title: "Innovation Culture", icon: "innovation" },
  { title: "Student Engagement", icon: "curiosity" },
];

export const schoolApproach: Array<{
  step: string;
  title: string;
  description: string;
  icon: HomeIconName;
}> = [
  { step: "01", title: "Understand", description: "Learn about your goals, space and students.", icon: "curiosity" },
  { step: "02", title: "Design", description: "Create customised solutions.", icon: "design" },
  { step: "03", title: "Build", description: "Set up labs and infrastructure.", icon: "build" },
  { step: "04", title: "Equip", description: "Provide equipment, tools and exhibits.", icon: "projects" },
  { step: "05", title: "Enable", description: "Train educators and prepare resources.", icon: "school" },
  { step: "06", title: "Support", description: "Ongoing guidance and program support.", icon: "students" },
];

export const schoolOfferings = [
  { title: "Space & Infrastructure", description: "Design and setup of labs and learning spaces.", image: "/schools/space-infrastructure.webp", icon: "school" as HomeIconName },
  { title: "Lab Equipment", description: "High-quality, hands-on equipment and models.", image: "/schools/lab-equipment.webp", icon: "stem" as HomeIconName },
  { title: "Interactive Learning Models", description: "Engaging exhibits and educational kits.", image: "/schools/learning-models.webp", icon: "innovation" as HomeIconName },
  { title: "Technology & Robotics", description: "Robotics, AI, electronics, coding and fabrication tools.", image: "/schools/technology-robotics.webp", icon: "robotics" as HomeIconName },
  { title: "Science Exhibits", description: "Indoor and outdoor interactive installations.", image: "/schools/science-exhibits.webp", icon: "park" as HomeIconName },
  { title: "Learning Experiences", description: "Workshops, training and student programs.", image: "/schools/learning-experience.webp", icon: "students" as HomeIconName },
];

export const studentBenefits: Array<{ title: string; caption: string; icon: HomeIconName }> = [
  { title: "Explore", caption: "Ask better questions", icon: "curiosity" },
  { title: "Experiment", caption: "Turn ideas into action", icon: "test" },
  { title: "Build", caption: "Create real solutions", icon: "build" },
  { title: "Collaborate", caption: "Learn and grow together", icon: "students" },
  { title: "Innovate", caption: "Shape a brighter future", icon: "innovation" },
];

export const institutionBenefits: Array<{ title: string; icon: HomeIconName }> = [
  { title: "Future-ready infrastructure", icon: "school" },
  { title: "Experiential learning", icon: "students" },
  { title: "Innovation culture", icon: "innovation" },
  { title: "Higher student engagement", icon: "curiosity" },
  { title: "Scalable programs", icon: "projects" },
];

export const schoolPartners: Array<{
  title: string;
  description: string;
  icon: HomeIconName;
}> = [
  { title: "Schools", description: "K-12 schools looking to add innovation spaces.", icon: "school" },
  { title: "Educational Institutions", description: "Colleges and academic institutions.", icon: "school" },
  { title: "Government Programs", description: "Education initiatives and public sector projects.", icon: "projects" },
  { title: "CSR / Education Initiatives", description: "Organisations supporting education and innovation.", icon: "students" },
];
