"use client";

import { useState } from "react";
import { HomeIcon } from "@/components/home/home-icon";
import { SiteImage } from "@/components/media";
import { ButtonLink } from "@/components/ui";
import { solutionShowcase } from "@/data/solutions";

export function SolutionSelector() {
  const [selected, setSelected] = useState(0);
  const solution = solutionShowcase[selected];
  return <div className="mt-8 grid gap-5 lg:grid-cols-[.8fr_1.2fr]">
    <div role="group" aria-label="Choose a solution" className="grid grid-cols-2 gap-3">
      {solutionShowcase.map((item, index) => <button type="button" key={item.slug} onClick={() => setSelected(index)} aria-pressed={selected === index}
        className={`focus-ring flex min-h-32 flex-col items-center justify-center gap-3 rounded-2xl border p-4 text-center font-bold transition ${selected === index ? "border-brand-blue bg-brand-blue text-white" : "border-brand-line bg-white text-brand-blue hover:bg-brand-sky"}`}>
        <HomeIcon name={item.icon} className="h-8 w-8" />{item.kicker}
      </button>)}
    </div>
    <article aria-live="polite" className="overflow-hidden rounded-2xl border border-brand-line bg-white shadow-card">
      <SiteImage src={solution.image} alt={solution.imageAlt} aspectRatio="16/7" sizes="(max-width: 1024px) 100vw, 55vw" />
      <div className="p-6">
        <h3 className="text-2xl font-bold text-brand-blue">{solution.kicker}</h3>
        <p className="mt-3 text-sm leading-6 text-brand-muted">{solution.description}</p>
        <ul className="mt-4 grid gap-2 text-sm text-brand-blue sm:grid-cols-2">{solution.bullets.map((item) => <li key={item}>✓ {item}</li>)}</ul>
        <ButtonLink href={solution.href} showArrow className="mt-5">{solution.action}</ButtonLink>
      </div>
    </article>
  </div>;
}
