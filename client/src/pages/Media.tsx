import { ArrowRight, Play, Newspaper, Video, BookOpen, Award, Calendar } from 'lucide-react';
import CTABanner from '../components/CTABanner';
import { Reveal } from '../lib/motion';

const tabs = ['All', 'News', 'Videos', 'Blogs', 'Awards'];

const news = [
  {
    title: 'Ignited Brains Partners with 50+ Schools Across Uttar Pradesh',
    category: 'News',
    date: 'Sept 10, 2026',
    readTime: '3 min read',
    img: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=group%20photo%20of%20happy%20students%20with%20STEM%20lab%20inauguration%20ceremony%20in%20school&image_size=landscape_4_3',
  },
  {
    title: 'Student Team from Prayagraj Wins National Robotics Championship',
    category: 'Awards',
    date: 'Aug 28, 2026',
    readTime: '4 min read',
    img: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=student%20team%20receiving%20trophy%20at%20national%20robotics%20competition%20celebrating%20win&image_size=landscape_4_3',
  },
  {
    title: 'New AI & Robotics Lab Opens at Delhi Public School',
    category: 'News',
    date: 'Aug 15, 2026',
    readTime: '2 min read',
    img: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=modern%20AI%20and%20robotics%20lab%20opening%20ceremony%20students%20exploring%20robots&image_size=landscape_4_3',
  },
];

const videos = [
  {
    title: 'Inside the Ignited Brains Space Lab — Full Tour',
    duration: '05:32',
    img: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=space%20lab%20classroom%20with%20telescopes%20rocket%20models%20and%20planetarium%20dome&image_size=landscape_16_9',
  },
  {
    title: 'Mars Rover Project: Behind The Scenes',
    duration: '08:14',
    img: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=students%20working%20on%20mars%20rover%20prototype%20in%20workshop%20documentary&image_size=landscape_16_9',
  },
  {
    title: 'Teacher Training Program Highlights',
    duration: '03:47',
    img: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=teachers%20learning%20STEM%20education%20training%20workshop%20in%20progress&image_size=landscape_16_9',
  },
  {
    title: 'Science Park Inauguration at Bareilly',
    duration: '04:20',
    img: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=outdoor%20science%20park%20inauguration%20event%20with%20children%20and%20dignitaries&image_size=landscape_16_9',
  },
];

const blogs = [
  {
    title: 'Why Hands-On Learning Matters More Than Ever',
    category: 'Blogs',
    date: 'Aug 20, 2026',
    readTime: '6 min read',
    desc: 'Explore the science behind why doing, making and experimenting creates deeper learning than textbooks alone.',
  },
  {
    title: 'From Curiosity To Career: Preparing Students For Tomorrow',
    category: 'Blogs',
    date: 'Aug 05, 2026',
    readTime: '5 min read',
    desc: 'How Ignited Brains labs are equipping the next generation for jobs that don\'t even exist yet.',
  },
  {
    title: 'The Role of AI in Classrooms: A Guide For Schools',
    category: 'Blogs',
    date: 'Jul 22, 2026',
    readTime: '7 min read',
    desc: 'Everything school leaders need to know about introducing AI education responsibly and effectively.',
  },
];

const iconMap: Record<string, typeof Newspaper> = {
  News: Newspaper,
  Awards: Award,
  Blogs: BookOpen,
  Videos: Video,
};

export default function Media() {
  return (
    <div className="overflow-hidden">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-violet-50" />
        <div className="container-page relative py-20 text-center sm:py-28">
          <Reveal>
            <p className="eyebrow">Media</p>
            <h1 className="mx-auto mt-4 max-w-4xl font-display text-4xl font-extrabold leading-[1.05] text-slate-900 sm:text-5xl lg:text-6xl">
              Stories, videos &
              <br />
              <span className="text-brand-orange italic">big ideas.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
              News, behind-the-scenes, student stories and expert perspectives from the world of Ignited Brains.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mx-auto mt-10 flex max-w-2xl flex-wrap items-center justify-center gap-2">
              {tabs.map((t, i) => (
                <button
                  key={t}
                  className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
                    i === 0
                      ? 'bg-brand-orange text-white shadow-lg shadow-brand-orange/20'
                      : 'bg-white text-slate-700 border border-slate-200 hover:border-brand-orange/40 hover:text-brand-orange'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* FEATURED NEWS */}
      <section className="py-16">
        <div className="container-page">
          <Reveal>
            <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr]">
              {(() => {
                const f = news[0];
                const Icon = iconMap[f.category];
                return (
                  <article className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg transition-all hover:shadow-xl">
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <img src={f.img} alt={f.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-slate-700 backdrop-blur">
                        {Icon && <Icon className="h-3.5 w-3.5 text-brand-orange" />}
                        {f.category}
                      </div>
                    </div>
                    <div className="p-8">
                      <div className="flex items-center gap-3 text-xs font-medium text-slate-500">
                        <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />{f.date}</span>
                        <span>•</span>
                        <span>{f.readTime}</span>
                      </div>
                      <h2 className="mt-3 font-display text-2xl font-bold leading-snug text-slate-900 group-hover:text-brand-orange sm:text-3xl">
                        {f.title}
                      </h2>
                      <a href="#" className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-brand-orange transition-all hover:gap-2.5">
                        Read Article <ArrowRight className="h-4 w-4" />
                      </a>
                    </div>
                  </article>
                );
              })()}

              <div className="space-y-4">
                {news.slice(1).map((a) => {
                  const Icon = iconMap[a.category];
                  return (
                    <article key={a.title} className="group flex gap-4 overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 transition-all hover:border-brand-orange/40 hover:shadow-lg">
                      <div className="relative aspect-square w-28 shrink-0 overflow-hidden rounded-xl sm:w-36">
                        <img src={a.img} alt={a.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      </div>
                      <div className="flex min-w-0 flex-1 flex-col justify-between">
                        <div>
                          <span className="chip w-fit mb-2">
                            {Icon && <Icon className="h-3 w-3 text-brand-orange" />}
                            {a.category}
                          </span>
                          <h3 className="line-clamp-3 font-display text-base font-bold text-slate-900 group-hover:text-brand-orange">
                            {a.title}
                          </h3>
                        </div>
                        <div className="mt-2 flex items-center gap-2 text-[11px] font-medium text-slate-500">
                          <span>{a.date}</span>
                          <span>•</span>
                          <span>{a.readTime}</span>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* VIDEOS */}
      <section className="relative bg-slate-50 py-20 sm:py-24">
        <div className="container-page">
          <div className="flex items-end justify-between">
            <h2 className="font-display text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Latest <span className="text-brand-orange italic">Videos</span>
            </h2>
            <a href="#" className="btn-ghost hidden sm:inline-flex">
              View all <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {videos.map((v, i) => (
              <Reveal key={v.title} delay={0.05 * i}>
                <article className="group cursor-pointer overflow-hidden rounded-3xl border border-slate-200 bg-white transition-all hover:-translate-y-1 hover:shadow-xl">
                  <div className="relative aspect-video overflow-hidden">
                    <img src={v.img} alt={v.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent" />
                    <button className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-brand-orange shadow-2xl transition-transform hover:scale-110">
                      <Play className="ml-0.5 h-5 w-5 fill-current" />
                    </button>
                    <span className="absolute bottom-3 right-3 rounded-full bg-slate-900/80 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur">
                      {v.duration}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-base font-bold leading-snug text-slate-900 group-hover:text-brand-orange">
                      {v.title}
                    </h3>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* BLOGS */}
      <section className="relative py-20 sm:py-24">
        <div className="container-page">
          <div className="flex items-end justify-between">
            <h2 className="font-display text-3xl font-extrabold text-slate-900 sm:text-4xl">
              From the <span className="text-brand-orange italic">Blog</span>
            </h2>
            <a href="#" className="btn-ghost hidden sm:inline-flex">
              Read all <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {blogs.map((b, i) => (
              <Reveal key={b.title} delay={0.05 * i}>
                <article className="card flex h-full flex-col">
                  <span className="chip w-fit">
                    <BookOpen className="h-3 w-3 text-brand-orange" />
                    {b.category}
                  </span>
                  <h3 className="mt-4 font-display text-xl font-bold leading-snug text-slate-900 hover:text-brand-orange transition-colors">
                    {b.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{b.desc}</p>
                  <div className="mt-auto flex items-center justify-between pt-5">
                    <span className="text-[11px] font-medium text-slate-500">{b.date} · {b.readTime}</span>
                    <a href="#" className="text-sm font-bold text-brand-orange inline-flex items-center gap-1 hover:gap-2 transition-all">
                      Read <ArrowRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        title="Have a story idea or media enquiry?"
        description="We'd love to hear from journalists, creators and storytellers who share our passion for education."
        cta="Contact Media Team"
        href="/contact"
      />
    </div>
  );
}
