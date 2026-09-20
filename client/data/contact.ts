import type { HomeIconName } from "@/components/home/home-icon";

export const contactHeroBenefits: Array<{ title: string; icon: HomeIconName }> = [
  { title: "Innovative Learning Spaces", icon: "innovation" },
  { title: "Student-Centric Experiences", icon: "students" },
  { title: "A Brighter Tomorrow", icon: "creativity" },
];

export const partnerTypes: Array<{ title: string; description: string; icon: HomeIconName }> = [
  { title: "Schools", description: "K-12 schools looking to add innovation spaces.", icon: "school" },
  { title: "Educational Institutions", description: "Colleges and academic institutions.", icon: "school" },
  { title: "Government Programs", description: "Education initiatives and public sector projects.", icon: "projects" },
  { title: "CSR / Education Initiatives", description: "Organisations supporting education and skill development.", icon: "share" },
];

export const contactProcess: Array<{ step: string; title: string; description: string; icon: HomeIconName }> = [
  { step: "01", title: "We Receive Your Inquiry", description: "You share your requirements with us.", icon: "projects" },
  { step: "02", title: "We Understand Your Needs", description: "We discuss your goals, space and context.", icon: "students" },
  { step: "03", title: "We Suggest the Right Solution", description: "We recommend the most suitable learning spaces.", icon: "think" },
  { step: "04", title: "We Plan the Next Step", description: "Together we define the way forward.", icon: "share" },
];

export const contactFaqs = [
  {
    question: "What types of institutions do you work with?",
    answer: "We work with K-12 schools, colleges, educational institutions, government programs and CSR-led education initiatives.",
  },
  {
    question: "How long does it take to set up a lab?",
    answer: "Timelines depend on the solution, space and level of customisation. After understanding your requirements, our team shares a clear implementation plan and schedule.",
  },
  {
    question: "Can the solutions be customised for our school?",
    answer: "Yes. Ignited Brains designs learning environments around your available space, student needs, goals and the learning outcomes you want to create.",
  },
];

export const interestedInOptions = [
  "Space Lab",
  "STEM Lab",
  "AI & Robotics Lab",
  "Science Park",
  "Learning Experiences",
  "Other / Not Sure Yet",
];
