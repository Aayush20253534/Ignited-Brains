import {
  ArrowRight,
  Play,
  CheckCircle2,
  Search,
  Filter,
  Award,
  Bot,
  Rocket,
  Leaf,
  Sun,
} from 'lucide-react';
import CTABanner from '../components/CTABanner';
import { Reveal } from '../lib/motion';

const categories = ['All', 'Robotics', 'Space', 'AI', 'Renewable Energy', 'Science Park'];

const projects = [
  {
    title: 'Autonomous Mars Rover',
    category: 'Robotics',
    tagline: 'Featured Project',
    desc: 'A student-built autonomous rover that navigates rocky terrains, collects environmental data and transmits it back to Earth.',
    img: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=mars%20rover%20robot%20on%20rocky%20red%20desert%20terrain%20dramatic%20lighting&image_size=landscape_4_3',
    icon: Bot,
    features: ['AI obstacle avoidance', 'Real-time data transmission', 'Rugged terrain mobility', 'Solar powered system'],
    featured: true,
  },
  {
    title: 'CanSat Satellite Model',
    category: 'Space',
    desc: 'A soda-can sized satellite built by students that performs atmospheric experiments and telemetry during descent.',
    img: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=students%20launching%20CanSat%20mini%20satellite%20rocket%20project%20outdoors&image_size=landscape_4_3',
    icon: Rocket,
  },
  {
    title: 'Smart Farm Irrigation',
    category: 'AI',
    desc: 'An IoT and AI-based irrigation system that uses soil moisture and weather to water crops intelligently.',
    img: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=smart%20farm%20irrigation%20system%20solar%20powered%20IoT%20sensors%20in%20green%20field&image_size=landscape_4_3',
    icon: Leaf,
  },
  {
    title: 'Solar Powered Classroom',
    category: 'Renewable Energy',
    desc: 'Student-designed mini solar grid that powers lab equipment and teaches clean energy engineering.',
    img: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=students%20installing%20mini%20solar%20panels%20on%20school%20rooftop%20renewable%20energy%20project&image_size=landscape_4_3',
    icon: Sun,
  },
  {
    title: 'Line-Following Robot',
    category: 'Robotics',
    desc: 'A precision robot that follows complex paths and competes in inter-school challenges.',
    img: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=line%20following%20arduino%20robot%20on%20white%20track%20with%20students%20in%20background&image_size=landscape_4_3',
    icon: Bot,
  },
  {
    title: 'Water Rocket Championship',
    category: 'Space',
    desc: 'Students engineer pressure rockets and optimize aerodynamics for maximum altitude.',
    img: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=students%20launching%20water%20bottle%20rocket%20in%20school%20competition&image_size=landscape_4_3',
    icon: Rocket,
  },
];

export default function Projects() {
  return (
    <div className="overflow-hidden">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-orange-50" />
        <div className="container-page relative py-20 text-center sm:py-28">
          <Reveal>
            <p className="eyebrow">Our Projects</p>
            <h1 className="mx-auto mt-4 max-w-4xl font-display text-4xl font-extrabold leading-[1.05] text-slate-900 sm:text-5xl lg:text-6xl">
              Ideas turned into
              <br />
              <span className="text-brand-orange italic">real inventions.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
              Explore the remarkable projects created by students inside Ignited Brains labs across India.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mx-auto mt-12 flex max-w-xl items-stretch overflow-hidden rounded-full border border-slate-200 bg-white shadow-lg">
              <span className="flex items-center pl-5 text-slate-400">
                <Search className="h-4 w-4" />
              </span>
              <input
                type="text"
                placeholder="Search projects, themes or schools..."
                className="flex-1 bg-transparent px-4 py-4 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
              />
              <button className="mr-2 flex items-center gap-1.5 rounded-full bg-brand-orange px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-orangeLight">
                <Filter className="h-4 w-4" /> Filter
              </button>
            </div>

            <div className="mx-auto mt-6 flex max-w-3xl flex-wrap items-center justify-center gap-2">
              {categories.map((c, i) => (
                <button
                  key={c}
                  className={`rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
                    i === 0
                      ? 'bg-brand-orange text-white shadow-lg shadow-brand-orange/20'
                      : 'bg-white text-slate-700 border border-slate-200 hover:border-brand-orange/40 hover:text-brand-orange'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* FEATURED */}
      {(() => {
        const p = projects[0];
        return (
          <section className="relative py-16">
            <div className="container-page">
              <Reveal>
                <div className="overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white shadow-xl">
                  <div className="grid gap-0 lg:grid-cols-2">
                    <div className="relative aspect-video lg:aspect-auto">
                      <img src={p.img} alt={p.title} className="h-full w-full object-cover" />
                      <button aria-label="Play" className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-brand-orange shadow-2xl transition-transform hover:scale-110">
                        <Play className="ml-0.5 h-6 w-6 fill-current" />
                      </button>
                      <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full bg-brand-orange px-3 py-1.5 text-xs font-bold text-white shadow-lg">
                        <Award className="h-3.5 w-3.5" />
                        {p.tagline}
                      </div>
                    </div>
                    <div className="flex flex-col justify-center p-8 sm:p-12">
                      <span className="chip w-fit">
                        <p.icon className="h-3.5 w-3.5 text-brand-orange" />
                        {p.category}
                      </span>
                      <h2 className="mt-4 font-display text-3xl font-extrabold text-slate-900 sm:text-4xl">
                        {p.title}
                      </h2>
                      <p className="mt-3 text-base leading-relaxed text-slate-600">{p.desc}</p>
                      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                        {p.features?.map((f) => (
                          <li key={f} className="flex items-start gap-2 text-sm font-medium text-slate-700">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" />
                            {f}
                          </li>
                        ))}
                      </ul>
                      <a href="/contact" className="btn-primary mt-8 w-fit">
                        View Project Details <ArrowRight className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </section>
        );
      })()}

      {/* GRID */}
      <section className="relative py-16 sm:py-20">
        <div className="container-page">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.slice(1).map((p, i) => (
              <Reveal key={p.title} delay={0.05 * i}>
                <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white transition-all hover:-translate-y-1 hover:border-brand-orange/40 hover:shadow-2xl hover:shadow-brand-orange/10">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img src={p.img} alt={p.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-[11px] font-bold text-slate-700 backdrop-blur">
                      <p.icon className="h-3.5 w-3.5 text-brand-orange" />
                      {p.category}
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col gap-3 p-6">
                    <h3 className="font-display text-xl font-bold text-slate-900">{p.title}</h3>
                    <p className="text-sm leading-relaxed text-slate-600">{p.desc}</p>
                    <a href="/contact" className="mt-auto inline-flex items-center gap-1.5 text-sm font-bold text-brand-orange transition-all hover:gap-2.5">
                      Learn More <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        title="Got an idea? Let's build it together."
        description="Every Ignited Brains lab is a place where the next big invention starts with a single question."
        cta="Partner With Us"
        href="/contact"
      />
    </div>
  );
}
