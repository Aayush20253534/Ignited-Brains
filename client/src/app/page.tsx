import Link from "next/link";
import { ArrowRight, CirclePlay, Lightbulb, Handshake, BookOpenCheck, FlaskConical, UsersRound, Trophy, Telescope, PencilRuler, Cpu, ClipboardCheck, ChartNoAxesCombined, Presentation, Phone, Mail, MapPin, Check } from "lucide-react";
import { Youtube, Instagram, Linkedin, Twitter } from "@/components/home/social-icons";
import { Header } from "@/components/home/header";
import { Artwork } from "@/components/home/artwork";
import { InfoDialog, Newsletter, ProjectGallery, SolutionsSection } from "@/components/home/interactions";
import { SolarSystemAnimation } from "@/components/home/solar-system-animation";

const values = [
  { title: "Curiosity", subtitle: "Ask Better Questions", icon: Handshake },
  { title: "Creativity", subtitle: "Turn Ideas into Reality", icon: UsersRound },
  { title: "Innovation", subtitle: "Build a Brighter Tomorrow", icon: BookOpenCheck },
];
const journey = [
  { title: "Traditional Classroom", caption: "Learn theory", region: [251, 543, 51, 66] as const },
  { title: "Question", caption: 'Ask "Why?"', region: [318, 541, 62, 69] as const },
  { title: "Experiment", caption: "Explore Possibilities", region: [397, 541, 65, 69] as const },
  { title: "Build", caption: "Create Solutions", region: [481, 541, 65, 69] as const },
  { title: "Discover", caption: "Make an impact", region: [566, 541, 63, 69] as const },
];
const learning = [
  { title: "Observe", lines: ["Look closely", "Ask questions"], icon: Telescope },
  { title: "Think", lines: ["Understand", "Imagine"], icon: Lightbulb },
  { title: "Design", lines: ["Plan ideas", "Model solutions"], icon: PencilRuler },
  { title: "Build", lines: ["Create", "Collaborate"], icon: Cpu },
  { title: "Test", lines: ["Try, measure", "Learn"], icon: ClipboardCheck },
  { title: "Improve", lines: ["Iterate", "Solve"], icon: ChartNoAxesCombined },
  { title: "Share", lines: ["Present", "Inspire"], icon: Presentation },
];

export default function HomePage() {
  return <div className="home-page">
    <Header />
    <main id="main-content">
      <section className="hero">
        <SolarSystemAnimation />
        <div className="container hero-inner">
          <div className="hero-copy">
            <p className="eyebrow">Transforming education through innovation</p>
            <h1>The future<br />isn’t found<br />in books.<br />It is <span>created.</span></h1>
            <p className="hero-description">Hands-on Space, STEM, AI &amp; Robotics Labs and Science Parks that transform schools into environments where students discover, build and innovate.</p>
            <div className="button-row"><Link href="/solutions" className="button button-primary">Explore Our Solutions <ArrowRight /></Link><InfoDialog title="The Ignited Brains story" kind="story" className="button button-secondary"><CirclePlay /> Watch Our Story</InfoDialog></div>
          </div>
          <div className="hero-values">{values.map(({ title, subtitle, icon: Icon }) => <div className="hero-value" key={title}><Icon /><div><strong>{title}</strong><span>{subtitle}</span></div></div>)}</div>
        </div>
      </section>

      <section className="curiosity section-light">
        <div className="container curiosity-grid">
          <div><p className="eyebrow">A better tomorrow starts with a question</p><h2>Education should<br />ignite curiosity.</h2><p>Every discovery starts with a simple question.</p><Link href="/about" className="button button-outline">Learn More About Us <ArrowRight /></Link></div>
          <div className="why-art" aria-label="Why? Why not?"><span>WHY?</span><i /><strong>WHY <em>NOT?</em></strong></div>
          <ol className="principles">{["Curiosity|Ask. Explore. Wonder.", "Creativity|Imagine. Design. Build.", "Innovation|Solve. Impact. Lead."].map((item, index) => <li key={item}><span className="principle-number">0{index + 1}</span><div><h3>{item.split("|")[0]}</h3><p>{item.split("|")[1]}</p></div></li>)}</ol>
        </div>
      </section>

      <section className="approach section-light" id="our-approach">
        <div className="container approach-grid">
          <div><p className="eyebrow orange">From classrooms to real-world impact</p><h2>More than theory.<br />A hands-on future.</h2><p>We turn traditional classrooms into innovation spaces where students experiment, build and solve real-world problems.</p><a href="#learning-system" className="button button-primary">Our Approach <ArrowRight /></a></div>
          <div className="journey">{journey.map(({ title, caption, region }, index) => <div className="journey-item" key={title}><Artwork region={region} alt={title} /><div><h3>{title}</h3><p>{caption}</p></div>{index !== journey.length - 1 && <span className="journey-arrow"><ArrowRight /></span>}</div>)}</div>
        </div>
      </section>

      <SolutionsSection />

      <section className="learning-section section-light" id="learning-system">
        <div className="container">
          <div className="section-heading-row"><div><p className="eyebrow">The Ignited Brains learning system</p><h2>From curiosity to creation.</h2></div><p>A continuous cycle of learning, doing and improving.</p></div>
          <ol className="learning-steps">{learning.map(({ title, lines, icon: Icon }, index) => <li key={title}><div className="learning-icon"><Icon /></div><span className="step-number">0{index + 1}</span><h3>{title}</h3><p>{lines[0]}<br />{lines[1]}</p>{index < 6 && <ArrowRight className="step-arrow" />}</li>)}</ol>
        </div>
      </section>

      <section className="story-section" id="our-story">
        <Artwork region={[0, 1228, 300, 30]} className="story-earth" />
        <div className="container story-grid"><div className="story-copy"><p className="eyebrow">See it. Feel it. Believe it.</p><h2>Don’t just teach science.<br />Let students experience it.</h2><p>Watch how Ignited Brains is transforming schools through hands-on learning.</p><InfoDialog kind="story" title="The Ignited Brains story" className="button button-primary">Play Our Story <ArrowRight /></InfoDialog></div><InfoDialog kind="story" title="The Ignited Brains story" className="story-preview"><Artwork region={[313, 1098, 317, 144]} alt="Play our story: a student watching a rocket launch" /></InfoDialog></div>
      </section>

      <section className="impact-section">
        <Artwork region={[344, 1260, 323, 151]} className="impact-art" alt="Students imagining a future of discovery" />
        <div className="container impact-content"><p className="eyebrow">Real impact. Brighter tomorrows.</p><h2>Building future-ready learners.</h2><div className="impact-stats">{[{ title: "Schools Enabled", icon: BookOpenCheck }, { title: "Labs Created", icon: FlaskConical }, { title: "Students Engaged", icon: UsersRound }, { title: "Projects Built", icon: Trophy }].map(({ title, icon: Icon }) => <div className="stat-card" key={title}><Icon /><strong>XX+</strong><span>{title}</span></div>)}</div></div>
      </section>

      <section className="project-section section-light" id="projects">
        <div className="container project-grid"><div><p className="eyebrow orange">Featured project</p><h2>Autonomous Mars Rover</h2><p>A student-built autonomous rover that navigates rocky terrains, collects environmental data and transmits it back to Earth.</p><ul className="project-features">{["AI based obstacle avoidance", "Real-time data transmission", "Rugged terrain mobility", "Solar powered system"].map((text) => <li key={text}><Check />{text}</li>)}</ul><InfoDialog kind="project" title="Autonomous Mars Rover" className="button button-primary">View Project Details <ArrowRight /></InfoDialog></div><ProjectGallery /></div>
      </section>

      <section className="india-section section-light">
        <div className="container india-grid"><div><p className="eyebrow">For a brighter India</p><h2>Building future,<br />one curious mind at a time.</h2><p>Our mission is to bring hands-on, future-ready learning spaces into every school and ignite curiosity, creativity and innovation in every student.</p><a href="#contact" className="button button-primary">Be Part of the Journey <ArrowRight /></a></div><Artwork region={[274, 1571, 194, 149]} className="india-art" alt="Map of India connected by glowing points of innovation" /><div className="india-quote"><blockquote>“A more innovative India<br />begins in our classrooms.”</blockquote><p><span className="india-flag" aria-label="India" role="img" /> Together for a brighter tomorrow.</p></div></div>
      </section>

      <section className="partnership-banner">
        <Artwork region={[0, 1730, 206, 96]} className="partnership-earth" />
        <div className="container partnership-inner"><div><h2>Ready to transform your school?</h2><p>Let’s create a space where students don’t just learn about the future.<br />They build it.</p></div><a href="#contact" className="button button-primary">Partner With Us <ArrowRight /></a></div>
      </section>
    </main>

    <footer className="site-footer" id="contact">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand"><Link href="/" aria-label="Ignited Brains home"><Artwork region={[29, 1848, 94, 46]} alt="Ignited Brains" /></Link><p>Empowering young innovators to create, innovate and make a lasting impact through technology.</p><div className="social-icons" aria-label="Social channels"><span title="YouTube"><Youtube /></span><span title="Instagram"><Instagram /></span><span title="LinkedIn"><Linkedin /></span><span title="Twitter"><Twitter /></span></div></div>
          <div><h3>Quick Links</h3><ul>{[["Home", "/"], ["About Us", "/about"], ["Solutions", "/solutions"], ["How It Works", "/#learning-system"], ["Projects", "/#projects"], ["Media", "/#our-story"], ["Contact", "/#contact"]].map(([title, href]) => <li key={title}><Link href={href}>{title}</Link></li>)}</ul></div>
          <div><h3>Our Solutions</h3><ul>{["Space Lab", "STEM Lab", "AI & Robotics Lab", "Science Park"].map((title) => <li key={title}><Link href="/solutions">{title}</Link></li>)}</ul></div>
          <div className="footer-contact"><h3>Contact Us</h3><a href="tel:+919454488061"><Phone /> +91 94544 88061</a><a href="mailto:info@ignitedbrains.com"><Mail /> info@ignitedbrains.com</a><p><MapPin /> Prayagraj, Uttar Pradesh, India</p></div>
          <div><h3>Newsletter</h3><p>Stay updated with our latest programs and innovations.</p><Newsletter /></div>
        </div>
        <div className="footer-bottom"><p>© 2026 Ignited Brains. All Rights Reserved.</p><div><InfoDialog title="Privacy Policy" kind="privacy">Privacy Policy</InfoDialog><span>|</span><InfoDialog title="Terms & Conditions" kind="terms">Terms &amp; Conditions</InfoDialog></div></div>
        <p className="footer-tagline">Transforming Education Through Innovation.</p>
      </div>
      <Artwork region={[0, 2007, 265, 41]} className="footer-earth" />
    </footer>
  </div>;
}


