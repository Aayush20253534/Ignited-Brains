import { PartnerApplicationDialog } from "@/components/layout/partner-application-dialog";
import type { ReactNode } from "react";
import Image from "next/image";

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
      <Container wide className="relative grid items-center gap-6 py-10 sm:gap-8 sm:py-12 lg:grid-cols-[1fr_auto] lg:gap-12 lg:py-14">
        <div
          className="pointer-events-none relative mx-auto h-40 w-40 sm:h-48 sm:w-48 lg:absolute lg:-bottom-20 lg:-left-5 lg:h-72 lg:w-72 xl:left-2 xl:h-80 xl:w-80"
          aria-hidden="true"
        >
          <div className="absolute inset-[8%] rounded-full bg-blue-500/20 blur-2xl" />
          <Image
            src="/decorative/cta-earth.svg"
            alt=""
            fill
            sizes="(max-width: 640px) 160px, (max-width: 1024px) 192px, 320px"
            className="object-contain drop-shadow-[0_18px_38px_rgba(0,91,255,.3)]"
          />
        </div>

        <div className="relative text-center sm:text-left lg:pl-[23%] xl:pl-[24%]">
          {eyebrow ? <Eyebrow className="!text-orange-300">{eyebrow}</Eyebrow> : null}
          <h2 className="mt-4 max-w-4xl text-balance text-3xl font-extrabold leading-[1.05] tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl">
            {title}
          </h2>
          {description ? (
            <div className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-white/70 sm:mx-0 sm:text-base sm:leading-7">
              {description}
            </div>
          ) : null}
        </div>
        {buttonLabel === "Partner With Us" ? <PartnerApplicationDialog className="relative justify-self-center sm:justify-self-start lg:justify-self-end" /> : <ButtonLink href={buttonHref} size="lg" showArrow className="relative justify-self-center sm:justify-self-start lg:justify-self-end">{buttonLabel}</ButtonLink>}
      </Container>
    </section>
  );
}
