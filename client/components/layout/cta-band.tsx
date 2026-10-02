import type { ReactNode } from "react";
import { AnimatedEarth } from "@/components/layout/animated-earth";
import { ButtonLink, Container, Eyebrow } from "@/components/ui";
import { cn } from "@/lib/cn";

interface CtaBandProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  buttonLabel?: string;
  buttonHref?: string;
  className?: string;
}

export function CtaBand({
  eyebrow,
  title,
  description,
  buttonLabel = "Partner With Us",
  buttonHref = "/contact",
  className,
}: CtaBandProps) {
  return (
    <section className={cn("dark-space-surface border-y border-white/10", className)}>
      <Container wide className="relative grid items-center gap-6 py-8 sm:gap-8 sm:py-10 lg:grid-cols-[190px_minmax(0,1fr)_auto] lg:gap-10 lg:py-8 xl:grid-cols-[210px_minmax(0,1fr)_auto]">
        <div
          className="pointer-events-none mx-auto w-36 sm:w-44 lg:w-[190px] xl:w-[210px]"
          aria-hidden="true"
        >
          <AnimatedEarth className="h-auto w-full drop-shadow-[0_18px_38px_rgba(0,91,255,.34)]" />
        </div>

        <div className="relative text-center sm:text-left">
          {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
          <h2 className="mt-4 max-w-4xl text-balance text-3xl font-extrabold leading-[1.05] tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl">
            {title}
          </h2>
          {description ? (
            <div className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-white/70 sm:mx-0 sm:text-base sm:leading-7">
              {description}
            </div>
          ) : null}
        </div>
        <ButtonLink href={buttonHref} size="lg" showArrow className="relative justify-self-center sm:justify-self-start lg:justify-self-end">
          {buttonLabel}
        </ButtonLink>
      </Container>
    </section>
  );
}
