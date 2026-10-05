export type BlogSection = {
  id: string;
  title: string;
  paragraphs: string[];
  steps?: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
  alt: string;
  imageCaption: string;
  introduction: string;
  sections: BlogSection[];
  takeaway: string;
  resources: { label: string; href: string }[];
};

// Original editorial guides, published together on 5 October 2026.
// Photographs illustrate the subject; these are not reports of invented events.
export const blogPosts: BlogPost[] = [
  {
    slug: "designing-a-hands-on-science-lesson",
    title: "From watching to doing: designing a hands-on science lesson",
    excerpt: "A practical way to turn a familiar classroom concept into a question students can investigate, test and explain.",
    category: "Hands-on Learning",
    date: "2026-10-05",
    image: "/blog/hands-on-bridge.webp",
    alt: "Three students measuring how a handmade wooden bridge responds to a small suspended load",
    imageCaption: "Educational visual: a simple bridge becomes a question students can test.",
    introduction: "A demonstration can make a concept visible. An investigation gives students responsibility for finding out what happens. The difference is often a small change in the question: instead of showing a strong bridge, ask what makes one bridge stronger than another. A useful hands-on lesson makes room for a prediction, a fair comparison and an explanation that refers to evidence.",
    sections: [
      {
        id: "start-with-one-question",
        title: "Start with one question students can test",
        paragraphs: [
          "Choose a concept already connected to the class syllabus. For a lesson on structures, ask: how does folding paper change the load it can support? Give every group the same paper, the same gap between supports and the same small test weights. The materials can be inexpensive; the thinking should be deliberate.",
          "Write down what students should be able to explain afterwards. ‘We made a bridge’ describes an activity. ‘We compared two shapes and used observations to explain their behaviour’ describes learning. Keep the question narrow enough that groups can run more than one attempt within the lesson.",
        ],
      },
      {
        id: "make-the-test-fair",
        title: "Make the comparison fair",
        paragraphs: [
          "Before anyone builds, ask each group to predict which design will hold more and why. Agree on what may change and what should stay the same. If one group uses thicker paper, a shorter span and more tape, the result cannot tell you much about folding alone.",
          "Students should add weights in the same place and use the same stopping rule. A small tray beneath the bridge can catch falling pieces. Use light materials at tabletop height and supervise the activity. Repeating a test helps groups notice that a single result may depend on how carefully the setup was made.",
        ],
        steps: [
          "Record the design, prediction and conditions before testing.",
          "Add one small weight at a time using an agreed method.",
          "Record the load supported and what changed in the structure.",
          "Repeat the test, then compare the observations.",
        ],
      },
      {
        id: "protect-time-for-explanation",
        title: "Protect time for explanation",
        paragraphs: [
          "In a 45-minute lesson, a possible rhythm is five minutes for the question, five for predictions, fifteen for building and testing, ten for comparison, and ten for explanation and cleanup. Treat this as a starting plan rather than a rule. Younger learners may need a simpler recording sheet and fewer variables.",
          "Ask groups to separate what they saw from what they think caused it. ‘The folded sheet held six washers’ is an observation. ‘The folds helped the sheet resist bending’ is an explanation to discuss. A design that failed early is still useful if students can describe the failure and propose a change grounded in the test.",
        ],
      },
      {
        id: "check-every-learner",
        title: "Check what every learner understood",
        paragraphs: [
          "Rotate the roles of builder, tester, recorder and explainer. Otherwise, a confident student can do the interesting work while the others watch. Give each learner a short exit prompt: what did your group keep constant, what did the result show, and what would you test next?",
          "Use that response to plan the next lesson. If students confuse a prediction with a result, revisit the distinction. If they explain clearly, offer a new constraint, such as a longer span. The next activity should grow from the evidence of learning, not simply from a desire to build something more complicated.",
        ],
      },
    ],
    takeaway: "A hands-on lesson is complete when students can connect a prediction, a fair test and an explanation—not only display a finished model.",
    resources: [
      { label: "NASA JPL: engineering challenges for middle school", href: "https://www.jpl.nasa.gov/edu/resources/collection/engineering-in-the-classroom/ngss-engineering-middle-school/" },
      { label: "NCERT: school textbooks and curriculum connections", href: "https://ncert.nic.in/textbook.php" },
    ],
  },
  {
    slug: "inside-a-space-lab",
    title: "Inside a Space Lab: start with observation, then build",
    excerpt: "How telescopes, planetary models and simple engineering challenges can become a coherent learning sequence.",
    category: "Space Education",
    date: "2026-10-05",
    image: "/blog/space-lab-models.webp",
    alt: "Space and engineering models displayed inside an Ignited Brains Curiosity Corner lab",
    imageCaption: "From the Ignited Brains archive: models offer a starting point for observation and discussion.",
    introduction: "A Space Lab can inspire students as soon as they enter it. The educational work begins when that excitement becomes a question. Why does the Moon appear to change shape? What can a telescope reveal that our eyes cannot? How would a rover cross uneven ground? A well-planned sequence connects observations, models and design decisions instead of treating every exhibit as a separate attraction.",
    sections: [
      {
        id: "give-observation-a-purpose",
        title: "Give observation a purpose",
        paragraphs: [
          "Begin with a task students can describe in ordinary language. Ask them to sketch the Moon on several evenings when it is visible, noting the date and time. Compare the sketches before introducing a model. A cloudy evening is a missing observation to record, not a reason to invent a result.",
          "For a telescope session, choose a target in advance and practise focusing and handling the equipment in daylight on a distant terrestrial object. Make the viewing question specific: which features can you distinguish, and how does the view differ from an unaided observation? Never point a telescope or binoculars at the Sun without purpose-designed solar equipment and trained supervision.",
        ],
      },
      {
        id: "use-models-with-limits",
        title: "Explain what a model represents—and what it leaves out",
        paragraphs: [
          "A lamp and a ball can help students investigate Moon phases. Ask them to move around the model and describe how the illuminated portion appears from the observer’s position. Then discuss the difference between the model and the real system. The classroom distances and object sizes are convenient, not to scale.",
          "Planetary displays often compress enormous differences in size and distance. Use that limitation as a question rather than hiding it. If the planets were spaced to the same scale as their displayed sizes, would they fit in the room? The aim is to develop a habit of checking what a visual model can legitimately tell us.",
        ],
      },
      {
        id: "link-space-to-engineering",
        title: "Link space science to a manageable engineering challenge",
        paragraphs: [
          "Introduce a mission with one clear objective: a model rover must travel a short course while keeping a small payload secure. Ask students to consider wheel spacing, stability and the surface before they start building. A cardboard or pasta vehicle can reveal these trade-offs without expensive electronics.",
          "NASA JPL’s classroom rover activities provide examples of design, testing and improvement. A school can adapt the level of complexity to its learners. Keep the connection honest: a tabletop vehicle is an engineering model inspired by exploration, not a functioning spacecraft or proof that a design would survive on Mars.",
        ],
      },
      {
        id: "finish-with-a-mission-review",
        title: "Finish with a mission review",
        paragraphs: [
          "Have each group present its objective, design choice, test result and next revision. Ask another group to question one assumption. This makes communication part of the engineering process and gives students a reason to keep useful notes.",
          "Return to the original observation question after the build. Students should be able to explain which part of their work concerned science, which concerned engineering, and where the two connected. A Space Lab becomes more valuable when curiosity carries into the next classroom discussion rather than ending at the lab door.",
        ],
      },
    ],
    takeaway: "Connect the wonder of space to something students can observe, model, test and explain at an appropriate school scale.",
    resources: [
      { label: "NASA JPL: Mission to Mars teaching unit", href: "https://www.jpl.nasa.gov/edu/resources/lesson-plan/mission-to-mars-unit/" },
      { label: "NASA JPL: Planetary Pasta Rovers", href: "https://www.jpl.nasa.gov/edu/resources/lesson-plan/planetary-pasta-rovers/" },
    ],
  },
  {
    slug: "ai-and-robotics-teach-decisions-first",
    title: "AI and Robotics: teach decisions before devices",
    excerpt: "Help students distinguish a programmed rule from a learned pattern, then test how each behaves when conditions change.",
    category: "AI & Robotics",
    date: "2026-10-05",
    image: "/blog/ai-object-sorting.webp",
    alt: "Students testing a small camera and servo gripper with differently coloured geometric objects",
    imageCaption: "Educational visual: object sorting makes the link between sensing, decisions and action tangible.",
    introduction: "A robot moving across a table can look intelligent even when it follows a few fixed instructions. That makes a robotics lab a useful place to ask a precise question: how was the decision made? Students should understand the difference between a rule written by a person and a pattern learned from examples before combining either with a moving machine.",
    sections: [
      {
        id: "begin-with-a-rule",
        title: "Begin with an explicit rule",
        paragraphs: [
          "Use a distance sensor and a simple wheeled robot. Define the rule in plain language: if the measured distance is below a chosen threshold, stop; otherwise, move slowly forward. Students can draw the decision process before translating it into code. The important idea is that the programmer specified the condition.",
          "Test more than the easy case. Try different obstacle positions and surfaces, record the readings, and ask when the rule fails. A sensor reading is a measurement with limitations. A reliable-looking demonstration should not prevent students from investigating those limitations.",
        ],
      },
      {
        id: "compare-with-a-learned-pattern",
        title: "Compare it with a learned pattern",
        paragraphs: [
          "A beginner image classifier offers a contrasting activity. Use ordinary classroom objects, such as a blue block and an orange block, and collect examples of each. A tool such as Google’s Teachable Machine can train an image classification model from examples. Students are choosing and labelling data rather than writing every visual decision as a rule.",
          "Keep some examples separate for testing. If every blue block was photographed on one background and every orange block on another, the model may rely on the background rather than the object. Test both objects against a new background and under different lighting. Ask students what evidence supports their explanation of the errors.",
        ],
      },
      {
        id: "measure-before-connecting",
        title: "Measure before connecting the model to a machine",
        paragraphs: [
          "Build a small test table with the expected class, the predicted class and the conditions. Count correct and incorrect predictions, then inspect the mistakes. A displayed confidence value is a model output; it should not be treated as a guarantee that a prediction is correct.",
          "Only connect a classifier to a physical action after students understand its behaviour. Start with a low-risk output, such as an indicator light. For a moving gripper or vehicle, use a clear stop control, a limited workspace and adult supervision. Give uncertain or unexpected inputs a safe default action.",
        ],
      },
      {
        id: "ask-better-ai-questions",
        title: "Ask better questions about AI",
        paragraphs: [
          "Ask whose examples are represented, what changed between training and testing, and what the model is being asked to infer. Use object images rather than collecting students’ faces or personal information for a first project. The lesson can teach evaluation without making personal data part of the experiment.",
          "For the final explanation, have students compare the two systems: the distance rule and the image classifier. Where did the decision logic come from? What can go wrong? What test would reveal the problem? Understanding those distinctions is a stronger foundation than describing every automated behaviour as AI.",
        ],
      },
    ],
    takeaway: "Students learn more from explaining a decision and testing its limits than from watching an impressive robot complete one prepared demonstration.",
    resources: [
      { label: "Google: Teachable Machine", href: "https://teachablemachine.withgoogle.com/" },
      { label: "NASA JPL: making a self-driving rover", href: "https://www.jpl.nasa.gov/edu/resources/lesson-plan/robotics-making-a-self-driving-rover/" },
    ],
  },
  {
    slug: "a-stem-lab-is-a-routine-not-just-a-room",
    title: "A STEM Lab is a routine, not just a room",
    excerpt: "Timetabling, material care and teacher preparation turn a collection of equipment into a dependable place for learning.",
    category: "STEM Education",
    date: "2026-10-05",
    image: "/blog/stem-learning-wall.webp",
    alt: "Science and engineering models arranged beneath the STEM learning wall at Curiosity Corner",
    imageCaption: "From the Ignited Brains archive: equipment becomes useful through repeated, purposeful lessons.",
    introduction: "A new lab creates possibilities, but a room cannot organise its own learning. Students need regular access, teachers need workable lessons, and materials need to be ready when a class arrives. The most useful starting question is therefore not how much equipment a school can display. It is what a class will investigate next week, and how the school will make that session run well.",
    sections: [
      {
        id: "plan-from-learning-goals",
        title: "Plan from learning goals",
        paragraphs: [
          "Choose a small number of curriculum-linked investigations before designing an ambitious calendar. A circuit lesson might focus on troubleshooting a connection. A structures lesson might compare two designs under the same load. A coding lesson might ask students to explain why a condition produces a particular result.",
          "For every activity, note the target class, prior knowledge, materials, setup time and evidence of learning. This gives teachers a shared plan and makes it easier to adapt an activity for a different age group. Equipment should serve the question, rather than determine it simply because a kit is available.",
        ],
      },
      {
        id: "make-access-predictable",
        title: "Make access predictable",
        paragraphs: [
          "Reserve sessions in the school timetable and allow enough time for setup and cleanup. A single annual exhibition gives some students a stage; regular lessons give a whole class opportunities to practise. Keep a simple usage record so missed sessions and unequal access become visible.",
          "Divide large classes into small working groups and rotate roles. Prepare material trays that contain what each group needs. Provide alternatives when a learner cannot comfortably use a tool or read a small display. Participation should include testing, explaining and recording as well as physically assembling a model.",
        ],
      },
      {
        id: "support-the-teacher",
        title: "Support the teacher before the session",
        paragraphs: [
          "A teacher should try the activity, check the apparatus and identify likely stumbling points before teaching it. A lesson card can include a starting question, one sample setup, troubleshooting notes and questions that invite explanation. It should leave room for student choices instead of scripting every action.",
          "After the lesson, record one thing that worked and one thing to change. Share that note with the next teacher using the activity. This modest habit creates a body of school-specific knowledge that is more useful than repeatedly starting from a generic kit manual.",
        ],
      },
      {
        id: "care-for-materials-and-evidence",
        title: "Care for materials and evidence",
        paragraphs: [
          "Assign responsibility for checking components, charging or replacing approved batteries, and storing tools correctly. Keep damaged items out of circulation until assessed. For electrical activities, choose equipment and supervision suitable for the learners and the school’s procedures.",
          "Alongside the equipment record, keep a small learning record: a student sketch, a test table or an explanation. Review both at the end of a term. A lab can be busy while students remain uncertain about the concept; evidence of understanding helps the school decide what to improve.",
        ],
      },
    ],
    takeaway: "A sustainable STEM Lab combines a clear learning question, dependable access, prepared teachers and materials that are ready to use.",
    resources: [
      { label: "NCERT: curriculum frameworks and school resources", href: "https://ncert.nic.in/" },
      { label: "NCERT: textbooks for connecting lab work to classroom concepts", href: "https://ncert.nic.in/textbook.php" },
    ],
  },
  {
    slug: "what-a-student-rover-can-teach",
    title: "What a student rover can teach beyond robotics",
    excerpt: "Use a working prototype to assess design choices, test evidence, teamwork and the ability to explain a revision.",
    category: "Student Projects",
    date: "2026-10-05",
    image: "/blog/student-project-demonstration.webp",
    alt: "An Ignited Brains team presenting a small engineering prototype at a community demonstration",
    imageCaption: "From the Ignited Brains archive: presenting a prototype is an opportunity to explain the decisions behind it.",
    introduction: "A rover project brings mechanics, electronics and programming onto the same table. It also creates a temptation: judging the project only by whether the vehicle moves. A more useful assessment asks whether students can describe the problem, justify a design decision and use a test result to improve the next version. The finished object is one piece of evidence, not the whole assessment.",
    sections: [
      {
        id: "define-the-mission",
        title: "Define the mission before building",
        paragraphs: [
          "Give the team an objective that can be measured. A school-scale mission might be to carry a small payload over a short marked course without dropping it. Agree on the surface, time limit and allowed materials. The mission makes trade-offs visible: a wider vehicle may be stable but struggle through a narrow passage.",
          "Ask for a sketch and a brief explanation before assembly. Students do not need a perfect technical drawing, but they should show how the wheels, structure, power and sensors relate to the objective. Record who proposed which decisions so the group can revisit them after testing.",
        ],
      },
      {
        id: "keep-an-engineering-notebook",
        title: "Keep an engineering notebook",
        paragraphs: [
          "A useful entry records the question, the change made, the test conditions and the result. Photos or sketches can help, but a gallery of progress pictures is not a substitute for an explanation. If the rover turned unexpectedly, note the observation before deciding whether the cause was a wheel, a connection or the code.",
          "Change one suspected cause at a time where practical. Compare the new trial with the previous one, keeping the course and payload consistent. If several changes were necessary together, acknowledge that the test cannot isolate the effect of each. That honesty is part of sound engineering reasoning.",
        ],
      },
      {
        id: "assess-the-process",
        title: "Assess the process as well as the outcome",
        paragraphs: [
          "Use a short rubric students see in advance. Look for a clear problem statement, a design linked to constraints, recorded test evidence and a justified revision. Assess communication and role-sharing separately so a polished presenter does not mask uneven participation.",
          "Let each learner explain one decision or failure in their own words. A team whose rover stops halfway may still demonstrate careful investigation. A team whose rover succeeds once should be able to show that the result is repeatable and explain which conditions the design has not yet been tested under.",
        ],
        steps: [
          "Problem: can the learner explain the objective and constraints?",
          "Evidence: does the team record comparable tests?",
          "Iteration: is the revision connected to an observed problem?",
          "Communication: can every learner explain a contribution?",
        ],
      },
      {
        id: "make-the-review-useful",
        title: "Make the review useful for the next project",
        paragraphs: [
          "At the final demonstration, ask what the team would improve with one more session and why. Invite peers to ask questions about the tests rather than voting only for the most impressive-looking machine. Keep the discussion specific and grounded in the recorded work.",
          "Save the design notes and test table with the prototype. The next group can begin by reviewing a real unresolved question, such as improving traction or reducing an unreliable connection. That turns an exhibition object into a continuing engineering investigation.",
        ],
      },
    ],
    takeaway: "A strong student project leaves behind an explanation of how the design changed, not only a machine that worked once.",
    resources: [
      { label: "NASA JPL: robotics and a roving science lab", href: "https://www.jpl.nasa.gov/edu/resources/lesson-plan/robotics-creating-a-roving-science-lab/" },
      { label: "NASA JPL: Planetary Pasta Rovers and iteration", href: "https://www.jpl.nasa.gov/edu/resources/lesson-plan/planetary-pasta-rovers/" },
    ],
  },
  {
    slug: "school-innovation-beyond-opening-day",
    title: "Making school innovation work beyond opening day",
    excerpt: "A practical first-term plan for turning a new learning space into a programme students and teachers can keep using.",
    category: "School Innovation",
    date: "2026-10-05",
    image: "/blog/school-community.webp",
    alt: "Students, educators and community visitors gathered for a school learning-space event",
    imageCaption: "From the Ignited Brains archive: a school community gathers around a new learning initiative.",
    introduction: "An opening event introduces a new space to the community. It does not establish the habits that keep that space useful. After the photographs and demonstrations, schools still need lesson time, teacher ownership and a way to notice what students are learning. A practical first-term plan can begin small, with responsibilities that remain clear after the event is over.",
    sections: [
      {
        id: "give-the-programme-an-owner",
        title: "Give the programme an owner and a timetable",
        paragraphs: [
          "Identify a teacher or small teaching team responsible for coordinating access, materials and lesson planning. This role needs time and support, not merely a title. Name a backup so routine work does not stop when one person is unavailable.",
          "Agree which classes will use the space during the first term and how sessions connect to their current topics. Share a realistic timetable with staff. Record cancellations and their causes; a pattern of missed sessions may reveal a planning problem that enthusiasm alone cannot fix.",
        ],
      },
      {
        id: "start-with-a-small-sequence",
        title: "Start with a small sequence of lessons",
        paragraphs: [
          "For the first month, select a few manageable activities rather than trying every kit at once. One sequence could move from observing a simple mechanism, to building a version, to testing one change. Let teachers repeat the sequence with more than one group before adding complexity.",
          "Use the repetition to improve instructions and preparation. Ask which materials were missing, where students needed help and whether the final explanation showed understanding. A stable small programme gives the school a foundation for expansion.",
        ],
      },
      {
        id: "make-participation-visible",
        title: "Make participation visible",
        paragraphs: [
          "Track who gets time to build, test, record and explain. An innovation programme should reach beyond the students who already volunteer for competitions. Rotate responsibilities and give learners more than one way to show what they understand.",
          "Invite student feedback in practical terms: what instruction was unclear, which tool was difficult to use, and what question would they investigate next? Teachers can use those responses to adjust the next session. Avoid treating enjoyment alone as evidence that the learning goal was met.",
        ],
      },
      {
        id: "review-before-expanding",
        title: "Review before expanding",
        paragraphs: [
          "At the end of the term, look at three records together: sessions delivered, materials maintained and examples of student understanding. Ask teachers what can continue with the existing resources. Decide what needs repair, simpler instructions or additional preparation before considering more equipment.",
          "For schools in India, NCERT textbooks and curriculum resources provide a starting point for connecting activities to classroom learning. A school can use that connection while adapting language, grouping and materials to its own learners. The programme becomes sustainable when the next lesson has a clear purpose and a prepared person to lead it.",
        ],
      },
    ],
    takeaway: "The work after an opening event is to establish a repeatable learning programme with time, ownership and evidence of understanding.",
    resources: [
      { label: "NCERT: school curriculum frameworks and resources", href: "https://ncert.nic.in/" },
      { label: "NCERT: textbooks for school-level learning goals", href: "https://ncert.nic.in/textbook.php" },
    ],
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find(post => post.slug === slug);
}
