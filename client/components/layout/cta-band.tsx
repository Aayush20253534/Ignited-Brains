import type { ReactNode } from "react";

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
      <Container wide className="relative grid items-center gap-8 py-10 sm:py-12 lg:grid-cols-[1fr_auto] lg:gap-14 lg:py-14">
        <div>
          {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
          <h2 className="mt-4 max-w-4xl text-balance text-3xl font-extrabold leading-[1.05] tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl">
            {title}
          </h2>
          {description ? (
            <div className="mt-4 max-w-2xl text-sm leading-6 text-white/70 sm:text-base sm:leading-7">
              {description}
            </div>
          ) : null}
        </div>
        <ButtonLink href={buttonHref} size="lg" showArrow className="justify-self-start lg:justify-self-end">
          {buttonLabel}
        </ButtonLink>
      </Container>
    </section>
  );
}
