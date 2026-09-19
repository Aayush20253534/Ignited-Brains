import { ArrowRight } from 'lucide-react';

export default function CTABanner({
  title,
  description,
  cta = 'Partner With Us',
  href = '/contact',
}: {
  title: string;
  description?: string;
  cta?: string;
  href?: string;
}) {
  return (
    <section className="relative overflow-hidden">
      <div
      className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,107,0,0.15),_transparent_60%),linear-gradient(180deg,#0A1628_0%,#050d1a_100%)]">
        <div
      className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 50%, rgba(255,107,0,0.18) 0%, transparent 40%), radial-gradient(circle at 80% 80%, rgba(56,189,248,0.12) 0%, transparent 40%)',
        }}
        />
      </div>
      <div className="container-page relative flex flex-col items-start items-center gap-6 py-16 text-center lg:flex-row lg:justify-between lg:text-left">
        <div className="max-w-2xl">
          <h3 className="font-display text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
            {title}
          </h3>
          {description && (
            <p className="mt-3 max-w-xl text-slate-300 sm:text-base">
              {description}
            </p>
          )}
        </div>
        <a href={href} className="btn-primary shrink-0 whitespace-nowrap">
          {cta}
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}
