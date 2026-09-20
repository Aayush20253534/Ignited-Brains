import {
  ArrowRight,
  Eye,
  Brain,
  PenTool,
  Hammer,
  Gauge,
  RefreshCw,
  Share2,
  ClipboardList,
  Users,
  Wrench,
  GraduationCap,
  BarChart3,
} from 'lucide-react';
import CTABanner from '../components/CTABanner';
import SectionHeading from '../components/SectionHeading';
import { Reveal } from '../lib/motion';

const phases = [
  {
    n: '01',
    icon: ClipboardList,
    title: 'Discovery & Audit',
    desc: 'We understand your school\'s vision, space and goals to design the right learning environment.',
  },
  {
    n: '02',
    icon: Users,
    title: 'Custom Design',
    desc: 'Our experts craft a bespoke lab and curriculum aligned with your student body and aspirations.',
  },
  {
    n: '03',
    icon: Wrench,
    title: 'Setup & Installation',
    desc: 'End-to-end installation of equipment, furniture and technology with zero disruption to school.',
  },
  {
    n: '04',
    icon: GraduationCap,
    title: 'Teacher Training',
    desc: 'Comprehensive training programs empower educators to confidently guide students through the labs.',
  },
  {
    n: '05',
    icon: BarChart3,
    title: 'Curriculum & Support',
    desc: 'Ongoing lesson plans, project guides, evaluations and remote support ensure long-term impact.',
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

export default function HowItWorks() {
  return (
    <div className="overflow-hidden">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-white to-orange-50" />
        <div className="container-page relative py-20 text-center sm:py-28">
          <Reveal>
            <p className="eyebrow">How It Works</p>
            <h1 className="mx-auto mt-4 max-w-4xl font-display text-4xl font-extrabold leading-[1.05] text-slate-900 sm:text-5xl lg:text-6xl">
              A clear path from
              <br />
              <span className="text-brand-orange italic">curiosity to creation.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
              From first conversation to fully-functioning innovation lab — here's how we partner with schools to transform learning.
            </p>
          </Reveal>
        </div>
      </section>

      {/* PARTNERSHIP PHASES */}
      <section className="relative py-20 sm:py-28">
        <div className="container-page">
          <SectionHeading
            eyebrow="Our Partnership Process"
            title={<>From first call to <span className="text-brand-orange">lasting impact.</span></>}
            description="Five carefully designed phases ensure every school gets a tailor-made, sustainable innovation program."
            align="center"
          />

          <div className="relative mt-16">
            <div className="absolute left-1/2 top-0 hidden h-full w-0.5 -translate-x-1/2 bg-gradient-to-b from-brand-orange/30 via-brand-orange/60 to-brand-orange/30 lg:block" />
            <div className="space-y-10 lg:space-y-16">
              {phases.map((p, i) => (
                <Reveal key={p.title} delay={0.08 * i}>
                  <div className={`relative flex flex-col gap-6 lg:flex-row lg:items-center ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                    <div className="flex-1" />
                    <div className="absolute left-1/2 top-10 hidden h-14 w-14 -translate-x-1/2 items-center justify-center rounded-full bg-white ring-4 ring-brand-orange/30 shadow-lg lg:flex">
                      <p.icon className="h-6 w-6 text-brand-orange" />
                    </div>
                    <div className="flex-1">
                      <div className={`card relative p-8 ${i % 2 === 0 ? 'lg:mr-12' : 'lg:ml-12'}`}>
                        <span className="font-display text-5xl font-black text-brand-orange/15">{p.n}</span>
                        <h3 className="mt-2 font-display text-xl font-bold text-slate-900">
                          {p.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-slate-600">{p.desc}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* LEARNING CYCLE */}
      <section className="relative overflow-hidden bg-slate-50 py-20 sm:py-28">
        <div className="container-page">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <Reveal>
              <p className="eyebrow">Inside The Lab</p>
              <h2 className="mt-3 font-display text-3xl font-extrabold leading-[1.1] text-slate-900 sm:text-4xl lg:text-5xl max-w-2xl">
                The Ignited Brains
                <br />
                <span className="text-brand-orange italic">Learning System.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="max-w-sm text-sm text-slate-600">
                A continuous cycle of learning, doing and improving — used across every lab and every project.
              </p>
            </Reveal>
          </div>

          <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
            {learningCycle.map((step, i) => (
              <Reveal key={step.n} delay={0.05 * i}>
                <div className="card flex flex-col items-center text-center">
                  <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-orange/10 text-brand-orange transition-transform hover:scale-110">
                    <step.Icon className="h-7 w-7" />
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
      </section>

      <CTABanner
        title="Want to bring this to your school?"
        description="Let's design an innovation program tailored to your students, teachers and community."
        cta="Start A Conversation"
        href="/contact"
      />
    </div>
  );
}
