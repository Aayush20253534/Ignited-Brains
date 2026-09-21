import Link from "next/link";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

import { cn } from "@/lib/cn";
import { ArrowIcon } from "@/components/ui/arrow-icon";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface SharedButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  showArrow?: boolean;
  children: ReactNode;
  className?: string;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "border-brand-orange bg-brand-orange text-white shadow-cta hover:border-brand-orange-dark hover:bg-brand-orange-dark",
  secondary:
    "border-brand-blue bg-brand-blue text-white hover:border-brand-navy hover:bg-brand-navy",
  outline:
    "border-brand-line bg-white text-brand-blue hover:border-brand-blue/35 hover:bg-brand-sky",
  ghost:
    "border-transparent bg-transparent text-brand-blue hover:bg-brand-sky",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "min-h-9 px-3.5 text-[0.82rem]",
  md: "min-h-10 px-4 text-sm sm:px-5",
  lg: "min-h-11 px-5 text-[0.95rem] sm:px-6",
};

function buttonClassName({
  variant = "primary",
  size = "md",
  className,
}: Pick<SharedButtonProps, "variant" | "size" | "className">) {
  return cn(
    "group focus-ring inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border font-bold leading-none transition duration-200 ease-out active:scale-[0.985] disabled:pointer-events-none disabled:opacity-50",
    variantClasses[variant],
    sizeClasses[size],
    className,
  );
}

interface ButtonProps
  extends SharedButtonProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> {}

export function Button({
  variant = "primary",
  size = "md",
  showArrow = false,
  className,
  children,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonClassName({ variant, size, className })}
      {...props}
    >
      {children}
      {showArrow ? <ArrowIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" /> : null}
    </button>
  );
}

interface ButtonLinkProps
  extends SharedButtonProps,
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className" | "children"> {
  href: string;
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  showArrow = false,
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={buttonClassName({ variant, size, className })}
      {...props}
    >
      {children}
      {showArrow ? <ArrowIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" /> : null}
    </Link>
  );
}
