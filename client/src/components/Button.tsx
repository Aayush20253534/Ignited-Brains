import { ArrowRight, Play, ArrowUpRight } from 'lucide-react';

type Variant = 'primary' | 'outline' | 'ghost' | 'dark';
type Size = 'sm' | 'md' | 'lg';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  href?: string;
  icon?: 'arrow' | 'play' | 'external' | 'none';
  children: React.ReactNode;
}

const variants: Record<Variant, string> = {
  primary:
    'bg-brand-orange text-white shadow-lg shadow-brand-orange/20 hover:bg-brand-orangeLight hover:shadow-brand-orange/30',
  outline:
    'border border-slate-300 bg-white text-slate-900 hover:border-brand-orange hover:text-brand-orange',
  ghost:
    'bg-transparent text-slate-700 hover:bg-slate-100',
  dark:
    'bg-slate-900 text-white hover:bg-slate-800',
};

const sizes: Record<Size, string> = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-6 py-3 text-sm',
  lg: 'px-7 py-4 text-base',
};

const iconMap = {
  arrow: ArrowRight,
  play: Play,
  external: ArrowUpRight,
  none: null,
};

export default function Button({
  variant = 'primary',
  size = 'md',
  href,
  icon = 'arrow',
  children,
  className = '',
  ...rest
}: Props) {
  const Icon = iconMap[icon];
  const classes = `inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all active:scale-[0.98] ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
        {Icon && <Icon className="h-4 w-4" />}
      </a>
    );
  }

  return (
    <button className={classes} {...rest}>
      {children}
      {Icon && <Icon className="h-4 w-4" />}
    </button>
  );
}
