import {
  ArrowRight,
  Rocket,
  FlaskConical,
  Bot,
  Trees,
  Play,
  CheckCircle2,
} from 'lucide-react';
import CTABanner from '../components/CTABanner';
import SectionHeading from '../components/SectionHeading';
import { Reveal } from '../lib/motion';

const labs = [
  {
    id: 'space-lab',
    title: 'Space Lab',
    tagline: 'Reach for the stars.',
    desc: 'Rocket and satellite models, telescopes and hands-on space science experiences that let students touch the cosmos.',
    features: [
      'Rocket design & propulsion kits',
      'Satellite model assembly',
      'Astronomical observation stations',
      'Space mission simulations',
      'Planetarium experiences',
    ],
    icon: Rocket,
    img: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=students%20working%20with%20rocket%20models%20telescopes%20and%20space%20equipment%20in%20modern%20space%20lab&image_size=landscape_16_9',
    color: 'from-indigo-500/20 via-blue-500/20 to-sky-500/20',
  },
  {
    id: 'stem-lab',
    title: 'STEM Lab',
    tagline: 'Where theory meets making.',
    desc: 'Experiment, engineer and solve real problems through science, technology, engineering and maths.',
    features: [
      'Modular electronics & circuits',
      '3D design & prototyping',
      'Physics & chemistry discovery kits',
      'Engineering challenge stations',
      'Mathematics in action exhibits',
    ],
    icon: FlaskConical,
    img: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=students%20in%20STEM%20lab%20with%20beakers%20microscopes%20and%20engineering%20kits%20exploring%20science&image_size=landscape_16_9',
    color: 'from-emerald-500/20 via-teal-500/20 to-cyan-500/20',
  },
  {
    id: 'ai-lab',
    title: 'AI & Robotics Lab',
    tagline: 'Build what comes next.',
    desc: 'Robots, coding, AI projects and 3D printing for the next generation of innovators.',
    features: [
      'Programmable robotics kits',
      'AI & machine learning playground',
      '3D printers & design stations',
      'Coding & computational thinking',
      'Drone technology exploration',
    ],
    icon: Bot,
    img: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=students%20programming%20humanoid%20robot%20with%20laptop%203D%20printer%20AI%20lab&image_size=landscape_16_9',
    color: 'from-violet-500/20 via-purple-500/20 to-fuchsia-500/20',
  },
  {
    id: 'science-park',
    title: 'Science Park',
    tagline: 'Learning that moves outside.',
    desc: 'Interactive outdoor exhibits where science is learned through play, exploration and wonder.',
    features: [
      'Interactive physics playground',
      'Solar energy exhibits',
      'Ecology & biodiversity zones',
      'Water & fluid dynamics stations',
      'Sound & light discovery areas',
    ],
    icon: Trees,
    img: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=happy%20children%20playing%20at%20outdoor%20science%20park%20with%20interactive%20exhibits%20sunny%20day&image_size=landscape_16_9',
    color: 'from-lime-500/20 via-green-500/20 to-emerald-500/20',
  },
];

export default function Solutions() {
  return (
    <div className="overflow-hidden">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-indigo-50" />
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="container-page relative py-20 text-center sm:py-28">
          <Reveal>
            <p className="eyebrow">Our Solutions</p>
            <h1 className="mx-auto mt-4 max-w-4xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Where curiosity becomes
              <br />
              <span className="text-brand-orange italic">tangible.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
              Four immersive learning environments designed to transform schools into launchpads for creativity, innovation and real-world problem-solving.
            </p>
          </Reveal>
        </div>
      </section>

      {labs.map((lab, i) => (
        <section
          key={lab.id}
          id={lab.id}
          className={`relative py-20 sm:py-28 ${i % 2 === 1 ? 'bg-slate-50' : ''}`}
        >
          <div className="container-page">
            <div className={`grid items-center gap-10 lg:grid-cols-2 ${i % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''}`}>
              <Reveal>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-orange/10 text-brand-orange">
                    <lab.icon className="h-6 w-6" />
                  </div>
                  <span className="eyebrow">{lab.tagline}</span>
                </div>
                <h2 className="mt-4 font-display text-3xl font-extrabold leading-[1.1] text-slate-900 sm:text-4xl lg:text-5xl">
                  {lab.title}
                </h2>
                <p className="mt-4 max-w-lg text-base leading-relaxed text-slate-600 sm:text-lg">
                  {lab.desc}
                </p>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {lab.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm font-medium text-slate-700">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a href="/contact" className="btn-primary">
                    Get This Lab <ArrowRight className="h-4 w-4" />
                  </a>
                  <button className="btn-outline">
                    <Play className="h-4 w-4 text-brand-orange" />
                    Watch Demo
                  </button>
                </div>
              </Reveal>

              <Reveal delay={0.15}>
                <div className={`relative mx-auto w-full max-w-2xl rounded-[2.5rem] p-1 bg-gradient-to-br ${lab.color}`}>
                  <div className="relative aspect-video overflow-hidden rounded-[2.2rem] border-4 border-white shadow-2xl">
                    <img src={lab.img} alt={lab.title} className="h-full w-full object-cover" />
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      ))}

      <CTABanner
        title="Ready to transform your school?"
        description="Let's create a space where students don't just learn about the future. They build it."
        cta="Partner With Us"
        href="/contact"
      />
    </div>
  );
}
