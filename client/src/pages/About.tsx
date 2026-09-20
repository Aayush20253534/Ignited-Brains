import { motion } from 'framer-motion';
import {
  ArrowRight,
  Telescope,
  Lightbulb,
  Settings,
  FlaskConical,
  Cpu,
  Users,
  Rocket,
  Target,
  Eye,
  GraduationCap,
  Building2,
  Sun,
  Sparkles,
} from 'lucide-react';
import CTABanner from '../components/CTABanner';
import { Reveal } from '../lib/motion';

const processSteps = [
  { icon: '?', title: 'Question', sub: 'Why?' },
  { icon: '☉', title: 'Curiosity', sub: 'Explore' },
  { icon: '⚗', title: 'Experiment', sub: 'Try' },
  { icon: '✦', title: 'Discovery', sub: 'Learn' },
  { icon: '✧', title: 'Creation', sub: 'Build' },
  { icon: '🚀', title: 'Innovation', sub: 'Impact' },
];

const values = [
  {
    n: '01',
    icon: Telescope,
    title: 'Curiosity',
    desc: 'Every discovery starts with a question.',
    cta: 'Stay Curious',
  },
  {
    n: '02',
    icon: Lightbulb,
    title: 'Creativity',
    desc: 'Every idea deserves a chance to become real.',
    cta: 'Create Without Limits',
  },
  {
    n: '03',
    icon: Settings,
    title: 'Innovation',
    desc: 'Every learner can contribute to the future.',
    cta: 'Innovate Together',
  },
];

const storyTimeline = [
  {
    title: 'The Idea',
    desc: 'A simple belief in the power of hands-on learning.',
  },
  {
    title: 'First Steps',
    desc: 'Building initial labs and learning experiences.',
  },
  {
    title: 'Growing Impact',
    desc: 'Working with more schools and institutions.',
  },
  {
    title: 'A Bigger Vision',
    desc: 'Igniting curiosity and innovation at scale.',
  },
  {
    title: 'The Journey Continues',
    desc: 'Building a brighter, innovation-driven India.',
  },
];

const differentiators = [
  {
    icon: FlaskConical,
    title: 'Hands-on Learning',
    desc: 'Learn by doing, not just reading.',
  },
  {
    icon: Cpu,
    title: 'Future-ready Technology',
    desc: 'Modern tools for tomorrow\'s challenges.',
  },
  {
    icon: Users,
    title: 'Real-world Problem Solving',
    desc: 'Turn ideas into meaningful solutions.',
  },
  {
    icon: Rocket,
    title: 'Student-led Exploration',
    desc: 'Empowering students to take the lead.',
  },
];

export default function About() {
  return (
    <div className="overflow-hidden">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-white to-orange-50" />
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="absolute -top-24 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-gradient-to-br from-sky-200/40 via-transparent to-brand-orange/20 blur-3xl" />

        <div className="container-page relative grid items-center gap-12 py-16 lg:grid-cols-2 lg:gap-8 lg:py-24">
          <Reveal>
            <p className="eyebrow">About Ignited Brains</p>
            <h1 className="mt-4 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Education<br />
              should<span className="italic text-slate-900/80"> do more</span><br />
              than teach.<br />
              It should <span className="text-brand-orange italic">ignite.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
              Ignited Brains creates future-ready learning environments where curiosity becomes experimentation, creativity becomes creation and innovation becomes action.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#story" className="btn-primary">
                Our Story <ArrowRight className="h-4 w-4" />
              </a>
              <a href="/solutions" className="btn-outline">
                <Eye className="h-4 w-4 text-brand-orange" />
                Explore Our Solutions
              </a>
            </div>
            <div className="mt-10 grid max-w-lg grid-cols-3 gap-3">
              {[
                { icon: '💡', title: 'Curiosity', sub: 'Ask Better Questions' },
                { icon: '🎨', title: 'Creativity', sub: 'Turn Ideas into Reality' },
                { icon: '🧩', title: 'Innovation', sub: 'Build a Brighter Tomorrow' },
              ].map((b) => (
                <div key={b.title} className="rounded-2xl border border-slate-200 bg-white/80 p-3 backdrop-blur">
                  <div className="text-2xl">{b.icon}</div>
                  <p className="mt-1.5 text-sm font-bold text-slate-900">{b.title}</p>
                  <p className="mt-0.5 text-[11px] font-medium text-slate-500">{b.sub}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="relative mx-auto w-full max-w-xl">
              <div className="absolute -inset-4 -z-10 rounded-[3rem] bg-gradient-to-tr from-sky-400/20 via-transparent to-brand-orange/20 blur-2xl" />
              <motion.div
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] border-4 border-white shadow-2xl shadow-slate-900/10"
              >
                <img
                  src="https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=young%20indian%20girl%20student%20wearing%20safety%20goggles%20building%20robotics%20car%20in%20modern%20STEM%20innovation%20lab%2C%20concentrated%20happy%20expression%2C%20other%20students%20in%20background%2C%20warm%20natural%20lighting&image_size=portrait_4_3"
                  alt="Student innovating"
                  className="h-full w-full object-cover"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="absolute left-4 top-8 max-w-[180px]" style={{ fontFamily: 'cursive' }}
              >
                <p className="text-2xl font-bold leading-snug text-slate-800 drop-shadow">
                  Young Minds
                  <br />
                  <span className="text-brand-orange">Bigger</span>
                  <br />
                  <span className="italic text-slate-700">Tomorrows</span>
                </p>
                <svg className="mt-1" width="100" height="14" viewBox="0 0 100 14" fill="none">
                  <path d="M2 7 Q 30 -4 60 7 T 98 7" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </motion.div>

              <div className="absolute -right-2 bottom-20 max-w-[220px] rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-2xl backdrop-blur">
                <div className="flex gap-2">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-orange/10 text-brand-orange">
                    <Lightbulb className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Explore</p>
                    <p className="text-xs font-semibold text-slate-900">"Every discovery<br />starts with a curious<br />mind."</p>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {['EXPLORE', 'BUILD', 'LEARN', 'INNOVATE', 'IGNITE'].map((t, i) => (
                    <span key={t} className={`rounded-full px-2 py-0.5 text-[9px] font-bold tracking-wider ${i === 4 ? 'bg-brand-orange text-white' : 'bg-slate-100 text-slate-600'}`}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* OUR BIG IDEA */}
      <section className="relative py-20 sm:py-28">
        <div className="container-page grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div className="relative">
              <div className="absolute -left-8 -top-16 opacity-10">
                <svg width="240" height="240" viewBox="0 0 200 200" fill="none">
                  <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="100" cy="100" r="50" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <p className="eyebrow">Our Big Idea</p>
              <h2 className="mt-4 font-display text-3xl font-extrabold leading-[1.1] tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                The future isn't found
                <br />
                in books. It is
                <br />
                <span className="text-brand-orange">created.</span>
              </h2>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-slate-600 sm:text-lg">
                We believe education should move beyond passive learning and inspire students to question, explore, experiment and build real solutions for real-world challenges.
              </p>
              <a href="#values" className="btn-outline mt-8">
                Our Philosophy <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 text-right mb-6">
                From A Question To A Brighter Tomorrow
              </p>
              <div className="relative grid grid-cols-3 gap-4 sm:grid-cols-6">
                {processSteps.map((s, i) => (
                  <div key={s.title} className="relative flex flex-col items-center text-center">
                    {i < processSteps.length - 1 && (
                      <div className="absolute left-full top-10 hidden h-[2px] w-full -translate-y-1/2 bg-gradient-to-r from-brand-orange/60 to-slate-200 sm:block" />
                    )}
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-slate-200 bg-white text-2xl font-black text-brand-orange shadow-sm transition-all hover:border-brand-orange hover:shadow-md sm:h-[72px] sm:w-[72px]">
                      {s.icon}
                    </div>
                    <p className="mt-3 text-sm font-bold text-slate-900">{s.title}</p>
                    <p className="mt-0.5 text-[11px] font-medium text-slate-500">{s.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* VALUES */}
      <section id="values" className="relative overflow-hidden bg-slate-50 py-20 sm:py-28">
        <div className="container-page">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <Reveal>
              <p className="eyebrow">Our Values</p>
              <h2 className="mt-3 font-display text-3xl font-extrabold leading-[1.1] text-slate-900 sm:text-4xl lg:text-5xl max-w-3xl">
                <span className="text-slate-900">Curiosity.</span>{' '}
                <span className="text-slate-900">Creativity.</span>{' '}
                <span className="text-brand-orange">Innovation.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="max-w-xs text-sm text-slate-600">
                Three beliefs that drive everything we do.
              </p>
            </Reveal>
          </div>

          <div className="relative mt-12">
            <div className="pointer-events-none absolute inset-0 flex items-start justify-center">
              <svg className="w-full max-w-5xl opacity-20" viewBox="0 0 900 300" fill="none">
                <circle cx="150" cy="150" r="110" stroke="#FF6B00" strokeWidth="2" strokeDasharray="4 6"/>
                <circle cx="450" cy="150" r="110" stroke="#FF6B00" strokeWidth="2" strokeDasharray="4 6"/>
                <circle cx="750" cy="150" r="110" stroke="#FF6B00" strokeWidth="2" strokeDasharray="4 6"/>
              </svg>
            </div>

            <div className="relative grid gap-6 md:grid-cols-3">
              {values.map((v, i) => (
                <Reveal key={v.title} delay={0.08 * i}>
                  <article className="card relative h-full overflow-hidden">
                    <span className="absolute right-5 top-4 font-display text-5xl font-black text-slate-100">
                      {v.n}
                    </span>
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-orange/10 text-brand-orange transition-transform group-hover:scale-110">
                      <v.icon className="h-8 w-8" />
                    </div>
                    <h3 className="mt-6 font-display text-2xl font-extrabold text-slate-900">
                      {v.title}
                    </h3>
                    <p className="mt-2 text-base leading-relaxed text-slate-600">{v.desc}</p>
                    <a href="/solutions" className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-brand-orange transition-all hover:gap-2.5">
                      {v.cta} <ArrowRight className="h-4 w-4" />
                    </a>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STORY */}
      <section id="story" className="relative py-20 sm:py-28">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_1fr_1.1fr] lg:items-start">
          <Reveal>
            <p className="eyebrow">Our Story</p>
            <h2 className="mt-4 font-display text-3xl font-extrabold leading-[1.1] text-slate-900 sm:text-4xl lg:text-5xl">
              A movement for<br />
              <span className="text-brand-orange italic">young innovators.</span>
            </h2>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-slate-600">
              <p>
                Ignited Brains began with a simple belief — that every student has the potential to create real change, if given the right environment, the right tools and the right inspiration.
              </p>
              <p>
                What started as an idea is now a growing movement to bring hands-on, future-ready learning spaces into schools across India.
              </p>
            </div>
            <a href="/contact" className="btn-primary mt-8">
              Our Journey <ArrowRight className="h-4 w-4" />
            </a>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative mt-6">
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-slate-200 shadow-xl">
                    <img
                      src="https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=three%20indian%20students%20working%20together%20on%20robotics%20drone%20project%20in%20lab%20happy%20collaborating&image_size=landscape_4_3"
                      alt="Students collaborating"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
                <div className="col-span-2 translate-x-6 -translate-y-6">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border-4 border-white shadow-2xl">
                    <img
                      src="https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=portrait%20of%20two%20indian%20girls%20and%20one%20boy%20student%20in%20STEM%20lab%20learning%20together%20warm&image_size=landscape_4_3"
                      alt="Students in lab"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 max-w-[180px] rotate-[-4deg]" style={{ fontFamily: 'cursive' }}>
                <p className="text-xl font-bold leading-snug text-slate-800">
                  Ideas
                  <br />
                  <span className="text-brand-orange">Students</span>
                  <br />
                  <span className="italic">Impact</span>
                </p>
                <svg className="mt-1" width="100" height="14" viewBox="0 0 100 14" fill="none">
                  <path d="M2 7 Q 50 -6 98 7" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <ol className="relative mt-6 space-y-6 border-l-2 border-slate-200 pl-8">
              {storyTimeline.map((step, i) => (
                <li key={step.title} className="relative">
                  <span className={`absolute -left-[41px] top-1 flex h-5 w-5 items-center justify-center rounded-full ring-4 ring-white ${i === 0 ? 'bg-brand-orange' : 'bg-white border-2 border-slate-300'}`}>
                    <span className={`${i === 0 ? 'h-1.5 w-1.5 rounded-full bg-white' : 'h-1.5 w-1.5 rounded-full bg-brand-orange'}`} />
                  </span>
                  <h4 className="font-display text-base font-bold text-slate-900">{step.title}</h4>
                  <p className="mt-0.5 text-sm text-slate-600">{step.desc}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* DIFFERENTIATORS */}
      <section className="relative overflow-hidden py-20 sm:py-28">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-50/40 via-white" />
        <div className="container-page relative">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <Reveal>
              <p className="eyebrow">What Makes Us Different</p>
              <h2 className="mt-3 font-display text-3xl font-extrabold leading-[1.1] text-slate-900 sm:text-4xl lg:text-5xl max-w-3xl">
                More than a lab.
                <br />
                <span className="text-brand-orange">A learning revolution.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="max-w-xs text-sm text-slate-600">
                We don't just set up equipment. We create environments where students can explore, experiment and innovate.
              </p>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {differentiators.map((d, i) => (
              <Reveal key={d.title} delay={0.05 * i}>
                <div className="card">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-orange/10 text-brand-orange">
                    <d.icon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-bold text-slate-900">{d.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{d.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* MISSION / VISION */}
      <section className="relative overflow-hidden">
        <div className="container-page grid gap-0 lg:grid-cols-2">
          <Reveal>
            <div className="relative overflow-hidden rounded-tl-[2.5rem] rounded-bl-[2.5rem] bg-[linear-gradient(135deg,#0A1628_0%,#132238_100%)] p-10 text-white sm:p-14 lg:rounded-r-none lg:rounded-l-[2.5rem]">
              <div className="absolute inset-0 opacity-30" style={{
                backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(255,107,0,0.3), transparent 45%)'
              }} />
              <div className="relative">
                <div className="flex items-center gap-3">
                  <Target className="h-6 w-6 text-brand-orange" />
                  <p className="eyebrow text-orange-300">Our Mission</p>
                </div>
                <h2 className="mt-5 font-display text-2xl font-bold leading-snug sm:text-3xl">
                  To bring hands-on, future-ready
                  <br />labs into every school and ignite
                  <br />curiosity, creativity and innovation
                  <br />in every student.
                </h2>
                <div className="mt-6 h-1 w-16 rounded-full bg-brand-orange" />
              </div>
              <div className="relative mt-10">
                <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-white/10">
                  <img
                    src="https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=astronaut%20looking%20at%20planet%20earth%20from%20space%20stunning%20view%20dark%20background&image_size=landscape_16_9"
                    alt="Mission"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute left-4 top-4 max-w-[180px]" style={{ fontFamily: 'cursive' }}>
                    <p className="text-xl font-bold italic text-white drop-shadow">
                      Education Today
                      <br />
                      <span className="text-brand-orangeLight">A Better</span>
                      <br />
                      <span className="text-white/80">Tomorrow</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="relative overflow-hidden rounded-tr-[2.5rem] rounded-br-[2.5rem] bg-gradient-to-br from-orange-50 via-sky-50 to-white p-10 sm:p-14 lg:rounded-l-none lg:rounded-r-[2.5rem]">
              <div className="relative h-full">
                <div className="flex items-center gap-3">
                  <Eye className="h-6 w-6 text-brand-orange" />
                  <p className="eyebrow">Our Vision</p>
                </div>
                <h2 className="mt-5 font-display text-2xl font-bold leading-snug text-slate-900 sm:text-3xl">
                  A generation of Indian students
                  <br />who don't just learn science
                  <br />but create with it, and build
                  <br />the nation's future.
                </h2>
                <div className="mt-6 h-1 w-16 rounded-full bg-brand-orange" />

                <div className="relative mt-10">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-white shadow-xl">
                    <img
                      src="https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=back%20view%20silhouette%20of%20young%20indian%20man%20student%20standing%20on%20rooftop%20overlooking%20city%20of%20India%20at%20sunrise%20golden%20hour%20inspiring&image_size=landscape_16_9"
                      alt="Vision"
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute right-4 top-4 max-w-[180px] text-right" style={{ fontFamily: 'cursive' }}>
                      <p className="text-xl font-bold text-white drop-shadow-lg">
                        India's
                        <br />
                        <span className="text-brand-orangeLight">Innovators</span>
                        <br />
                        <span className="italic text-white/80">Start Here</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* COMMITMENT TO INDIA */}
      <section className="relative overflow-hidden py-20 sm:py-28">
        <div className="container-page grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <p className="eyebrow">Our Commitment To India</p>
            <h2 className="mt-4 font-display text-3xl font-extrabold leading-[1.1] text-slate-900 sm:text-4xl lg:text-5xl max-w-xl">
              Building India's future
              <br />
              through <span className="text-brand-orange italic">curious minds.</span>
            </h2>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-slate-600 sm:text-lg">
              We envision a nation where every school, in every corner of India, has the opportunity to nurture innovators, problem solvers and change makers.
            </p>
            <a href="/contact" className="btn-primary mt-8">
              Be Part of the Change <ArrowRight className="h-4 w-4" />
            </a>

            <ul className="mt-10 space-y-4">
              {[
                { icon: Sparkles, title: 'More Opportunities', desc: '' },
                { icon: Building2, title: 'Stronger Schools', desc: '' },
                { icon: Sun, title: 'Brighter Communities', desc: '' },
                { icon: GraduationCap, title: 'A More Innovative India', desc: '' },
              ].map((i) => (
                <li key={i.title} className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-orange/10 text-brand-orange">
                    <i.icon className="h-4 w-4" />
                  </span>
                  <span className="font-semibold text-slate-800">{i.title}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="relative mx-auto w-full max-w-xl">
              <div className="absolute inset-0 flex items-center justify-center opacity-40">
                <div className="h-[520px] w-[520px] rounded-full bg-gradient-to-tr from-slate-100 via-transparent to-sky-100 blur-xl" />
              </div>
              <div className="relative flex items-center justify-center">
                <img
                  src="https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=illustrated%20map%20of%20India%20with%20glowing%20network%20nodes%20connecting%20innovation%20hubs%20on%20white%20background%20with%20faint%20taj%20mahal%20and%20gateway%20of%20india%20silhouettes&image_size=square_hd"
                  alt="India map"
                  className="h-[420px] w-full object-contain drop-shadow-xl sm:h-[500px]"
                />
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
        title="Let's build the future together."
        description="Partner with Ignited Brains and be part of a movement that puts curiosity, creativity and innovation at the heart of education."
        cta="Partner With Us"
        href="/contact"
      />
    </div>
  );
}
