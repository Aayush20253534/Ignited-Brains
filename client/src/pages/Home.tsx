import { motion } from 'framer-motion';
import SolarSystem from '../components/SolarSystem';
import {
  ArrowRight,
  Play,
  Beaker,
  Cpu,
  Bot,
  Trees,
  Eye,
  Brain,
  PenTool,
  Hammer,
  Gauge,
  RefreshCw,
  Share2,
  Trophy,
  FlaskConical,
  GraduationCap,
  Sparkles,
  Rocket,
  CheckCircle2,
} from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import CTABanner from '../components/CTABanner';
import { Reveal } from '../lib/motion';

const heroBadges = [
  { label: 'STEM', color: 'bg-sky-500/15 text-sky-600 border-sky-500/30' },
  { label: 'AI', color: 'bg-violet-500/15 text-violet-600 border-violet-500/30' },
  { label: 'ROBOTICS', color: 'bg-emerald-500/15 text-emerald-600 border-emerald-500/30' },
  { label: 'SPACE', color: 'bg-amber-500/15 text-amber-600 border-amber-500/30' },
];

const whySteps = [
  {
    num: '01',
    title: 'Curiosity',
    desc: 'Ask. Explore. Wonder.',
  },
  {
    num: '02',
    title: 'Creativity',
    desc: 'Imagine. Design. Build.',
  },
  {
    num: '03',
    title: 'Innovation',
    desc: 'Solve. Impact. Lead.',
  },
];

const journeySteps = [
  {
    title: 'Traditional Classroom',
    sub: 'Learn Theory',
    img: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=students%20in%20traditional%20classroom%20listening%20to%20teacher%20at%20desk%20with%20books&image_size=square',
  },
  {
    title: 'Question',
    sub: 'Ask "Why?"',
    img: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=curious%20student%20raising%20hand%20asking%20question%20in%20classroom&image_size=square',
  },
  {
    title: 'Experiment',
    sub: 'Explore Possibilities',
    img: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=students%20doing%20hands%20on%20science%20experiment%20in%20laboratory&image_size=square',
  },
  {
    title: 'Build',
    sub: 'Create Solutions',
    img: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=students%20building%20robotics%20project%20working%20together%20teamwork&image_size=square',
  },
  {
    title: 'Discover',
    sub: 'Make an Impact',
    img: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=happy%20students%20presenting%20completed%20innovation%20project%20with%20pride&image_size=square',
  },
];

const solutions = [
  {
    id: 'space-lab',
    title: 'Space Lab',
    desc: 'Rocket and satellite models, telescopes and hands-on space science experiences.',
    img: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=astronaut%20with%20space%20equipment%20telescope%20rocket%20models%20in%20space%20lab%20classroom&image_size=landscape_4_3',
    icon: Rocket,
  },
  {
    id: 'stem-lab',
    title: 'STEM Lab',
    desc: 'Experiment, engineer and solve real problems through science, technology, engineering and maths.',
    img: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=students%20working%20in%20STEM%20lab%20with%20science%20kits%20beakers%20engineering%20parts&image_size=landscape_4_3',
    icon: FlaskConical,
  },
  {
    id: 'ai-lab',
    title: 'AI & Robotics Lab',
    desc: 'Robots, coding, AI projects and 3D printing for the next generation of innovators.',
    img: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=students%20programming%20humanoid%20robot%20and%203D%20printing%20in%20AI%20laboratory&image_size=landscape_4_3',
    icon: Bot,
  },
  {
    id: 'science-park',
    title: 'Science Park',
    desc: 'Interactive exhibits where science is learned through play and exploration.',
    img: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=children%20playing%20learning%20at%20outdoor%20science%20park%20with%20interactive%20exhibits&image_size=landscape_4_3',
    icon: Trees,
  },
];

const learningCycle = [
  { n: '01', title: 'Observe', sub: 'Look closely. Ask questions.', Icon: Eye },
  { n: '02', title: 'Think', sub: 'Understand. Imagine.', Icon: Brain },
  { n: '03', title: 'Design', sub: 'Plan ideas. Model solutions.', Icon: PenTool },
  { n: '04', title: 'Build', sub: 'Create. Collaborate.', Icon: Hammer },
  { n: '05', title: 'Test', sub: 'Try, measure. Learn.', Icon: Gauge },
  { n: '06', title: 'Improve', sub: 'Iterate. Solve.', Icon: RefreshCw },
  { n: '07', title: 'Share', sub: 'Present. Inspire.', Icon: Share2 },
];

const stats = [
  { icon: GraduationCap, value: 'XX+', label: 'Schools Enabled' },
  { icon: Beaker, value: 'XX+', label: 'Labs Created' },
  { icon: Sparkles, value: 'XX+', label: 'Students Engaged' },
  { icon: Trophy, value: 'XX+', label: 'Projects Built' },
];

export default function Home() {
  return (
    <div className="overflow-hidden">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-sky-50" />
        <div className="absolute inset-0 grid-bg opacity-60" />
        <div className="absolute -top-24 right-0 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-brand-orange/20 via-transparent to-sky-500/20 blur-3xl" />

        <div className="container-page relative grid items-stretch gap-12 py-16 lg:grid-cols-2 lg:gap-8 lg:py-24 min-h-[640px] lg:min-h-[720px]">
          <Reveal className="flex flex-col justify-center">
            <p className="eyebrow">Transforming Education Through Innovation</p>
            <h1 className="mt-4 font-display text-4xl font-extrabold leading-[1.02] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl xl:text-7xl">
              THE FUTURE
              <br />
              ISN'T FOUND
              <br />
              IN BOOKS.
              <br />
              IT IS <span className="text-brand-orange">CREATED.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
              Hands-on Space, STEM, AI & Robotics Labs and Science Parks that transform schools into environments where students discover, build and innovate.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="/solutions" className="btn-primary">
                Explore Our Solutions <ArrowRight className="h-4 w-4" />
              </a>
              <a href="/about" className="btn-outline">
                <Play className="h-4 w-4 text-brand-orange" />
                Watch Our Story
              </a>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              {heroBadges.map((b) => (
                <span
                  key={b.label}
                  className={`rounded-full border px-3 py-1 text-xs font-bold tracking-wider ${b.color}`}
                >
                  ◉ {b.label}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.15} className="h-full">
            <motion.div
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              className="h-full"
            >
              <SolarSystem />
            </motion.div>
          </Reveal>
        </div>
      </section>

      {/* WHY / WHY NOT */}
      <section className="relative py-20 sm:py-28">
        <div className="container-page grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <p className="eyebrow">A Better Tomorrow Starts With A Question</p>
            <h2 className="mt-4 font-display text-3xl font-extrabold leading-[1.1] tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Education should<br />ignite <span className="text-brand-orange italic">curiosity.</span>
            </h2>
            <p className="mt-4 text-base text-slate-600 sm:text-lg max-w-lg">
              Every discovery starts with a simple question.
            </p>
            <a href="/about" className="btn-outline mt-8">
              Learn More About Us <ArrowRight className="h-4 w-4" />
            </a>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="relative">
              <div className="flex items-center justify-center gap-4">
                <h3 className="font-display text-[72px] font-black leading-none text-slate-900/10 sm:text-[120px]">
                  WHY?
                </h3>
                <div className="relative">
                  <div className="h-24 w-[2px] bg-gradient-to-b from-slate-300 via-brand-orange to-slate-300 sm:h-40" />
                  <div className="absolute -bottom-2 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full bg-brand-orange ring-4 ring-brand-orange/20" />
                </div>
                <h3 className="font-display text-[72px] font-black leading-none sm:text-[120px]">
                  WHY <span className="text-brand-orange">NOT?</span>
                </h3>
              </div>

              <div className="mt-10 space-y-5">
                {whySteps.map((s, i) => (
                  <motion.div
                    key={s.num}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * i, duration: 0.5 }}
                    className="flex items-start gap-5 rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:border-brand-orange/40 hover:shadow-lg"
                  >
                    <span className="font-display text-2xl font-black text-brand-orange/30">
                      {s.num}
                    </span>
                    <div>
                      <h4 className="font-display text-lg font-bold text-slate-900">{s.title}</h4>
                      <p className="text-sm text-slate-600">{s.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* JOURNEY FROM CLASSROOM TO IMPACT */}
      <section className="relative overflow-hidden bg-slate-50 py-20 sm:py-28">
        <div className="container-page">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <Reveal>
              <p className="eyebrow">From Classrooms To Real-World Impact</p>
              <h2 className="mt-3 font-display text-3xl font-extrabold leading-[1.1] text-slate-900 sm:text-4xl lg:text-5xl max-w-xl">
                More than theory.
                <br />
                <span className="text-brand-orange">A hands-on future.</span>
              </h2>
              <p className="mt-4 max-w-lg text-slate-600">
                We turn traditional classrooms into innovation spaces where students experiment, build and solve real-world problems.
              </p>
              <a href="/how-it-works" className="btn-primary mt-7">
                Our Approach <ArrowRight className="h-4 w-4" />
              </a>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {journeySteps.map((s, i) => (
              <Reveal key={s.title} delay={0.05 * i}>
                <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all hover:-translate-y-1 hover:shadow-xl">
                  <div className="relative aspect-square overflow-hidden">
                    <img src={s.img} alt={s.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <h4 className="font-display text-base font-bold">{s.title}</h4>
                      <p className="text-xs text-white/80">{s.sub}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUTIONS */}
      <section className="relative py-20 sm:py-28" id="solutions">
        <div className="container-page">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <Reveal>
              <p className="eyebrow">Our Solutions</p>
              <SectionHeading
                title={<>Where curiosity becomes <span className="text-brand-orange">tangible.</span></>}
              />
            </Reveal>
            <Reveal delay={0.1}>
              <a href="/solutions" className="btn-outline shrink-0">
                View All Solutions <ArrowRight className="h-4 w-4" />
              </a>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {solutions.map((s, i) => (
              <Reveal key={s.id} delay={0.05 * i}>
                <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white transition-all hover:-translate-y-1 hover:border-brand-orange/40 hover:shadow-2xl hover:shadow-brand-orange/10">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img src={s.img} alt={s.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-white/90 shadow-lg backdrop-blur text-brand-orange">
                      <s.icon className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col gap-4 p-6">
                    <h3 className="font-display text-xl font-bold text-slate-900">{s.title}</h3>
                    <p className="text-sm leading-relaxed text-slate-600">{s.desc}</p>
                    <a href={`/solutions#${s.id}`} className="mt-auto inline-flex items-center gap-1.5 text-sm font-bold text-brand-orange hover:gap-2 transition-all">
                      Explore <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* LEARNING CYCLE */}
      <section className="relative overflow-hidden py-20 sm:py-28">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-50/50 via-white to-white" />
        <div className="container-page relative">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <Reveal>
              <p className="eyebrow">The Ignited Brains Learning System</p>
              <h2 className="mt-3 font-display text-3xl font-extrabold leading-[1.1] text-slate-900 sm:text-4xl lg:text-5xl max-w-2xl">
                From curiosity to <span className="text-brand-orange italic">creation.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="max-w-sm text-sm text-slate-600">
                A continuous cycle of learning, doing and improving.
              </p>
            </Reveal>
          </div>

          <div className="mt-14">
            <div className="relative flex flex-wrap items-start justify-center gap-x-8 gap-y-10">
              {learningCycle.map((step, i) => (
                <Reveal key={step.n} delay={0.05 * i}>
                  <div className="relative flex w-[120px] flex-col items-center text-center sm:w-[140px]">
                    {i < learningCycle.length - 1 && (
                      <div className="absolute left-full top-1/2 hidden h-[2px] w-8 -translate-y-1/2 bg-gradient-to-r from-brand-orange/40 to-brand-orange/10 lg:block" style={{ marginLeft: '-1rem' }} />
                    )}
                    <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border-2 border-slate-200 bg-white shadow-sm transition-all hover:border-brand-orange hover:shadow-lg hover:shadow-brand-orange/20 sm:h-24 sm:w-24">
                      <step.Icon className="h-8 w-8 text-brand-orange sm:h-10 sm:w-10" />
                      <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-brand-orange text-[11px] font-black text-white shadow-lg">
                        {step.n}
                      </span>
                    </div>
                    <h4 className="mt-4 font-display text-base font-bold text-slate-900">{step.title}</h4>
                    <p className="mt-1 text-xs text-slate-600">{step.sub}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* VIDEO / STORY */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#0A1628_0%,#132238_100%)]" />
        <div className="absolute inset-0 opacity-40" style={{
          backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(255,107,0,0.2), transparent 40%), radial-gradient(circle at 80% 70%, rgba(56,189,248,0.15), transparent 40%)'
        }} />
        <div className="container-page relative grid gap-10 py-20 text-white sm:py-28 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <p className="eyebrow text-orange-300">See It. Feel It. Believe It.</p>
            <h2 className="mt-4 font-display text-3xl font-extrabold leading-[1.1] sm:text-4xl lg:text-5xl">
              Don't just teach science.<br />
              <span className="text-brand-orangeLight">Let students experience it.</span>
            </h2>
            <p className="mt-5 max-w-lg text-base text-slate-300 sm:text-lg">
              Watch how Ignited Brains is transforming schools through hands-on learning.
            </p>
            <a href="/about" className="btn-primary mt-8">
              Play Our Story <Play className="h-4 w-4 fill-white" />
            </a>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="relative mx-auto w-full max-w-2xl">
              <div className="relative aspect-video overflow-hidden rounded-3xl border-4 border-white/10 shadow-2xl">
                <img
                  src="https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=back%20view%20of%20indian%20student%20in%20hoodie%20watching%20rocket%20launch%20at%20sunset%20dramatic%20cinematic%20sky%20mountains&image_size=landscape_16_9"
                  alt="Our story thumbnail"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/10" />
                <button
                  aria-label="Play video"
                  className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-brand-orange shadow-2xl transition-transform hover:scale-110"
                >
                  <Play className="ml-1 h-8 w-8 fill-current" />
                </button>
                <div className="absolute bottom-4 right-4 rounded-full bg-slate-900/70 px-3 py-1 text-xs font-bold text-white backdrop-blur">
                  ▶ 02:45
                </div>
                <div className="absolute right-6 top-6 max-w-[180px] text-right" style={{ fontFamily: 'cursive' }}>
                  <p className="text-xl font-bold leading-snug text-white drop-shadow-lg">
                    Ideas
                    <br />
                    <span className="text-brand-orangeLight">Students</span>
                    <br />
                    <span className="text-white/80">Impact</span>
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* STATS */}
      <section className="py-20 sm:py-28">
        <div className="container-page">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <Reveal>
              <p className="eyebrow">Real Impact. Brighter Tomorrows.</p>
              <h2 className="mt-3 font-display text-3xl font-extrabold leading-[1.1] text-slate-900 sm:text-4xl lg:text-5xl max-w-2xl">
                Building <span className="text-brand-orange">future-ready learners.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="hidden h-24 w-24 items-center justify-center overflow-hidden rounded-full border-4 border-slate-200 lg:flex">
                <img
                  src="https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=happy%20indian%20school%20girl%20in%20uniform%20looking%20up%20dreaming%20smiling&image_size=square"
                  alt="Student"
                  className="h-full w-full object-cover"
                />
              </div>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={0.05 * i}>
                <div className="card flex flex-col items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-orange/10 text-brand-orange">
                    <s.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-display text-4xl font-black text-slate-900 sm:text-5xl">{s.value}</p>
                    <p className="mt-1 text-sm font-semibold text-slate-600">{s.label}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PROJECT */}
      <section className="relative overflow-hidden bg-slate-50 py-20 sm:py-28">
        <div className="container-page grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <p className="eyebrow">Featured Project</p>
            <h2 className="mt-3 font-display text-3xl font-extrabold leading-[1.1] text-slate-900 sm:text-4xl lg:text-5xl">
              Autonomous Mars Rover
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
              A student-built autonomous rover that navigates rocky terrains, collects environmental data and transmits it back to Earth.
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                'AI based obstacle avoidance',
                'Real-time data transmission',
                'Rugged terrain mobility',
                'Solar powered system',
              ].map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm font-medium text-slate-700">
                  <CheckCircle2 className="h-4 w-4 text-brand-orange shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <a href="/projects" className="btn-primary mt-8">
              View Project Details <ArrowRight className="h-4 w-4" />
            </a>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="relative aspect-square overflow-hidden rounded-3xl border border-slate-200 sm:col-span-2 sm:row-span-2 sm:aspect-auto">
                <img
                  src="https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=mars%20rover%20robot%20on%20rocky%20red%20desert%20terrain%20exploration%20dramatic%20lighting&image_size=landscape_4_3"
                  alt="Mars Rover"
                  className="h-full w-full object-cover"
                />
                <div className="absolute left-5 top-5 max-w-[160px]" style={{ fontFamily: 'cursive' }}>
                  <p className="text-xl font-bold leading-snug text-white drop-shadow-lg">
                    Exploring<br/>
                    <span className="text-brand-orangeLight">Beyond</span><br/>
                    <span className="text-white/80">Limits</span>
                  </p>
                </div>
              </div>
              <div className="relative aspect-square overflow-hidden rounded-2xl border border-slate-200">
                <img
                  src="https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=mars%20rover%20closeup%20details%20wheels%20and%20sensors&image_size=square"
                  alt="Rover closeup"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-slate-900">
                <button aria-label="Play" className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-orange text-white shadow-xl transition-transform hover:scale-110">
                  <Play className="ml-0.5 h-6 w-6 fill-white" />
                </button>
              </div>
              <div className="relative aspect-square overflow-hidden rounded-2xl border border-slate-200">
                <img
                  src="https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=student%20engineer%20working%20on%20mars%20rover%20prototype%20in%20lab&image_size=square"
                  alt="Student with rover"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* INDIA COMMITMENT */}
      <section className="relative overflow-hidden py-20 sm:py-28">
        <div className="container-page grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <p className="eyebrow">For A Brighter India</p>
            <h2 className="mt-3 font-display text-3xl font-extrabold leading-[1.1] text-slate-900 sm:text-4xl lg:text-5xl">
              Building future,<br />
              one <span className="text-brand-orange italic">curious mind</span> at a time.
            </h2>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-slate-600 sm:text-lg">
              Our mission is to bring hands-on, future-ready learning spaces into every school and ignite curiosity, creativity and innovation in every student.
            </p>
            <a href="/contact" className="btn-primary mt-8">
              Be Part of the Journey <ArrowRight className="h-4 w-4" />
            </a>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="relative mx-auto w-full max-w-xl">
              <img
                src="https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=illustrated%20map%20of%20India%20with%20glowing%20connected%20dots%20network%20nodes%20innovation%20hubs%20on%20white%20background&image_size=square_hd"
                alt="India map"
                className="h-[380px] w-full object-contain drop-shadow-2xl sm:h-[440px]"
              />
              <div className="absolute right-2 top-4 max-w-[220px] text-right" style={{ fontFamily: 'cursive' }}>
                <p className="text-xl font-bold leading-snug italic text-slate-800">
                  "A more innovative India
                  <br />
                  <span className="text-brand-orange">begins in our classrooms.</span>"
                </p>
              </div>
              <div className="absolute bottom-2 right-0 flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 text-xs font-semibold text-slate-700 backdrop-blur shadow-lg">
                <span className="flex items-center gap-1">
                  <span className="inline-block h-2 w-3 rounded-sm bg-[#FF9933]" />
                  <span className="inline-block h-2 w-3 rounded-sm bg-white border border-slate-200" />
                  <span className="inline-block h-2 w-3 rounded-sm bg-[#138808]" />
                </span>
                Together for a brighter tomorrow.
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <CTABanner
        title="Ready to transform your school?"
        description="Let's create a space where students don't just learn about the future. They build it."
        cta="Partner With Us"
        href="/contact"
      />
    </div>
  );
}
