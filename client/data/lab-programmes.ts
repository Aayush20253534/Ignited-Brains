import type { HomeIconName } from "@/components/home/home-icon";

export type Topic = { title: string; description: string; icon: HomeIconName; image?: string; alt?: string };
export type JourneyStep = { title: string; description: string; icon: HomeIconName };
export type LabProgramme = {
  slug: string; name: string; title: string; emphasis: string; description: string;
  hero: string; heroAlt: string; tone: "space" | "stem" | "robotics" | "park";
  proof: string[]; journey: JourneyStep[]; earthTitle: string; earthDescription: string;
};

export const spaceLab: LabProgramme = {
  slug: "space-lab", name: "Space Lab", title: "Bring the universe into the", emphasis: "classroom.", tone: "space",
  description: "A hands-on environment where students explore astronomy, space science and engineering through models, observation and experimentation.",
  hero: "/learning-spaces/space-hero.webp", heroAlt: "Young visitors in astronaut costumes exploring the real Curiosity Corner space-science exhibits",
  proof: ["Astronomy", "Rocketry", "Observation"],
  journey: [
    { title: "Explore", description: "Discover celestial models. Ask a bigger question.", icon: "space" },
    { title: "Understand", description: "Connect observations with the science behind them.", icon: "think" },
    { title: "Build", description: "Create models, experiment and work as a team.", icon: "build" },
    { title: "Observe", description: "Use instruments and evidence to test ideas.", icon: "observe" },
  ],
  earthTitle: "Bring the wonders of space to your school.",
  earthDescription: "Create a space learning environment where students explore, experiment and build.",
};

export const stemLab: LabProgramme = {
  slug: "stem-lab", name: "STEM Lab", title: "Ideas become experiments.", emphasis: "Experiments become understanding.", tone: "stem",
  description: "Science, technology, engineering and mathematics come together through hands-on experimentation, physical models and real-world problem solving.",
  hero: "/learning-spaces/stem-hero.webp", heroAlt: "Students watching a mentor demonstrate a physical prototype and fabrication equipment at an Ignited Brains exhibition",
  proof: ["Science", "Engineering", "Mathematics"],
  journey: [
    { title: "Question", description: "Look closely and identify a problem worth solving.", icon: "curiosity" },
    { title: "Experiment", description: "Predict, try, measure and record what happens.", icon: "test" },
    { title: "Engineer", description: "Design a model and build a working prototype.", icon: "build" },
    { title: "Solve", description: "Use evidence to improve a real-world solution.", icon: "innovation" },
  ],
  earthTitle: "Turn your classroom into a place for experimentation.",
  earthDescription: "Build a STEM Lab where students learn science by actually doing it.",
};

export const roboticsLab: LabProgramme = {
  slug: "ai-robotics-lab", name: "AI & Robotics Lab", title: "Code it. Build it.", emphasis: "Make it think.", tone: "robotics",
  description: "Students program, prototype and build real-world systems using robotics, artificial intelligence, electronics and digital fabrication.",
  hero: "/learning-spaces/robotics-hero.webp", heroAlt: "The actual AI and Robotics Lab with electronic learning kits, a 3D printer and student-scale robotic models",
  proof: ["Robotics", "Artificial Intelligence", "Automation"],
  journey: [
    { title: "Code", description: "Learn programming and express an idea as instructions.", icon: "design" },
    { title: "Prototype", description: "Build, connect and test a physical system.", icon: "build" },
    { title: "Automate", description: "Use sensors, software and control to respond.", icon: "robotics" },
    { title: "Innovate", description: "Refine a useful solution to a real problem.", icon: "innovation" },
  ],
  earthTitle: "Build the innovators who will shape intelligent technology.",
  earthDescription: "Create an AI & Robotics Lab where students learn, build and solve real problems.",
};

export const sciencePark: LabProgramme = {
  slug: "science-park", name: "Science Park", title: "Where science becomes something", emphasis: "students can experience.", tone: "park",
  description: "An outdoor learning environment where large, interactive installations make scientific concepts tangible through movement, experimentation and exploration.",
  hero: "/learning-spaces/park-outdoor-concept.webp", heroAlt: "Illustrative Science Park concept showing students investigating a mechanical wheel and lever in a school courtyard",
  proof: ["Interactive Installations", "Outdoor Learning", "Across Age Groups"],
  journey: [
    { title: "Move", description: "Walk, interact with physical exhibits and explore.", icon: "park" },
    { title: "Observe", description: "Notice what changes when you take an action.", icon: "observe" },
    { title: "Discover", description: "Ask questions, find patterns and try again.", icon: "curiosity" },
    { title: "Understand", description: "Connect an experience to a scientific principle.", icon: "think" },
  ],
  earthTitle: "Turn open space into a place of discovery.",
  earthDescription: "Create a Science Park where students can explore, experience and fall in love with science.",
};

export const spaceTopics: Topic[] = [
  { title: "Telescopes", description: "Learn how instruments extend observation.", icon: "observe", image: "/learning-spaces/space-telescope.webp", alt: "A telescope beside rocket models and a lunar display in the actual Space Lab" },
  { title: "Rocket Models", description: "Explore shape, stability and aerodynamics.", icon: "space", image: "/learning-spaces/space-card.webp", alt: "Educational rocket models displayed at Curiosity Corner" },
  { title: "Satellite Models", description: "Model orbits, communication and mission design.", icon: "design" },
  { title: "Planetary Systems", description: "Investigate scale, rotation and revolution.", icon: "space" },
  { title: "Space Science Exhibits", description: "Make exploration tangible through physical exhibits.", icon: "innovation", image: "/learning-spaces/space-costume-visit.webp", alt: "A young visitor in an astronaut costume beside real planetary exhibits" },
  { title: "Interactive Simulations", description: "Use visual resources to investigate the universe.", icon: "projects", image: "/learning-spaces/space-simulation.webp", alt: "The Galaxy Explorer interactive display installed in Curiosity Corner" },
];

export const spaceActivities: Topic[] = [
  { title: "Observe celestial objects", description: "Practise instrument use, keep an observation log and compare what you see.", icon: "observe" },
  { title: "Build model rockets", description: "Plan fins and balance, test safely with mentor guidance and review the design.", icon: "build" },
  { title: "Study planetary systems", description: "Use physical models to reason about orbits, scale and day–night cycles.", icon: "space" },
  { title: "Work on satellite projects", description: "Explore how a model mission gathers information and communicates it.", icon: "design" },
  { title: "Analyse space images and data", description: "Look for patterns, ask what the evidence supports and explain your reasoning.", icon: "think" },
  { title: "Take on a space-science challenge", description: "Build in teams, test an idea and present what you discovered.", icon: "share" },
];

export const stemTopics: Topic[] = [
  { title: "Science in Action", description: "Predict, measure and explain physical phenomena.", icon: "test", image: "/learning-spaces/stem-physics.webp", alt: "Real physics, mechanics and science models on the STEM Lab workbench" },
  { title: "Engineering & Mechanics", description: "Investigate forces, structures and mechanisms.", icon: "build" },
  { title: "Electronics", description: "Connect circuits, sensors and simple control systems.", icon: "robotics" },
  { title: "Mathematics", description: "Make numbers, geometry and measurement physical.", icon: "stem", image: "/learning-spaces/stem-design.webp", alt: "Physical geometry and science models displayed at the STEM learning wall" },
  { title: "Design Challenges", description: "Work within constraints, test and improve.", icon: "design" },
  { title: "Student Prototypes", description: "Turn an idea into something that can be tested.", icon: "projects" },
];

export const stemActivities: Topic[] = [
  { title: "Conduct a science experiment", description: "Make a prediction, change one variable and record the result.", icon: "test" },
  { title: "Build an engineering model", description: "Compare structures, mechanisms and material choices.", icon: "build" },
  { title: "Work with electronics and sensors", description: "Connect a circuit and understand what each part contributes.", icon: "robotics" },
  { title: "Explore maths through models", description: "Measure, estimate and test a relationship in the physical world.", icon: "stem" },
  { title: "Take part in a design challenge", description: "Plan a solution, prototype it and learn from a failed attempt.", icon: "design" },
  { title: "Collaborate and present", description: "Explain your method, share evidence and use feedback.", icon: "students" },
];

export const roboticsTopics: Topic[] = [
  { title: "Robotics", description: "Movement, mechanisms and control.", icon: "robotics", image: "/learning-spaces/robotics-hardware.webp", alt: "Students and educators inspecting a real hand-built red rover and its electronics at a demonstration" },
  { title: "Programming", description: "Sequences, conditions and debugging.", icon: "design" },
  { title: "Artificial Intelligence", description: "Data, patterns and responsible decisions.", icon: "think" },
  { title: "Sensors & IoT", description: "Measure the world and connect devices.", icon: "observe" },
  { title: "Electronics", description: "Circuits, power and safe connections.", icon: "build" },
  { title: "3D Printing", description: "From a digital design to a physical part.", icon: "projects", image: "/learning-spaces/robotics-fabrication.webp", alt: "A mentor demonstrating fabrication equipment to students at an Ignited Brains exhibition" },
  { title: "Automation", description: "Sense, decide and respond.", icon: "innovation" },
  { title: "Computer Vision", description: "Explore what images can tell a system.", icon: "curiosity" },
  { title: "Smart Systems", description: "Bring hardware and software together.", icon: "lab" },
];

export const roboticsProjects: Topic[] = [
  { title: "Obstacle Avoiding Robot", description: "Use distance readings to decide when to turn.", icon: "robotics" },
  { title: "Line Follower", description: "Read contrast and adjust motor speed.", icon: "observe" },
  { title: "Robotic Arm", description: "Plan controlled movement and a repeatable task.", icon: "build" },
  { title: "Smart Automation", description: "Make a device respond to an input.", icon: "innovation" },
  { title: "Computer Vision Project", description: "Collect examples and test recognition carefully.", icon: "curiosity" },
  { title: "IoT Monitoring", description: "Capture measurements and show useful trends.", icon: "projects" },
];

export const stemProjects: Topic[] = [
  { title: "Bridge Model", description: "Compare spans and test load against material use.", icon: "build" },
  { title: "Wind Turbine", description: "Test blade designs and compare their output.", icon: "innovation" },
  { title: "Smart Irrigation", description: "Use a moisture reading to control water delivery.", icon: "robotics" },
  { title: "Weather Monitoring", description: "Record local conditions and spot patterns.", icon: "observe" },
  { title: "Solar Vehicle", description: "Explore energy, gearing and efficient movement.", icon: "design" },
  { title: "Water Purification", description: "Compare filtration methods and explain their limits.", icon: "test" },
];

export const parkTopics: Topic[] = [
  { title: "Mechanics", description: "Feel how levers, gears and pulleys change force.", icon: "build" },
  { title: "Sound", description: "Listen to vibration, resonance and reflection.", icon: "share" },
  { title: "Optics", description: "Investigate light, reflection and colour.", icon: "observe" },
  { title: "Energy", description: "Follow how energy changes form.", icon: "innovation" },
  { title: "Astronomy", description: "Explore the Sun, planets and the sky.", icon: "space" },
  { title: "Mathematics", description: "Find geometry, proportion and patterns.", icon: "stem" },
  { title: "Motion", description: "Investigate balance, momentum and oscillation.", icon: "test" },
  { title: "Environmental Science", description: "Connect science to water, soil and living systems.", icon: "park" },
];
