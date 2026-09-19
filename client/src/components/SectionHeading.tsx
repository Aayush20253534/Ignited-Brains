interface Props {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: 'left' | 'center';
  titleClassName?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  titleClassName = '',
}: Props) {
  return (
    <div className={`max-w-3xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      {eyebrow && (
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-brand-orange">
          {eyebrow}
        </p>
      )}
      <h2 className={`font-display text-3xl font-extrabold leading-[1.1] tracking-tight text-slate-900 sm:text-4xl lg:text-5xl ${titleClassName}`}>
        {title}
      </h2>
      {description && (
        <p className={`mt-4 text-base leading-relaxed text-slate-600 sm:text-lg ${align === 'center' ? 'mx-auto max-w-2xl' : ''}`}>
          {description}
        </p>
      )}
    </div>
  );
}
