import Image from "next/image";
import type { RefObject } from "react";

import { ArrowIcon } from "@/components/ui";
import { cn } from "@/lib/cn";

import styles from "./partner-application-dialog.module.css";

export type ApplicantType = "STUDENT" | "ORGANIZATION";

type IconName =
  | "student"
  | "organisation"
  | "idea"
  | "book"
  | "people"
  | "settings"
  | "shield"
  | "document"
  | "impact";

const iconPaths: Record<IconName, string> = {
  student: "M3 9l9-4 9 4-9 4-9-4Zm4 2v5c3 2 7 2 10 0v-5M21 9v7",
  organisation:
    "M5 21V7l7-4 7 4v14M3 21h18M9 21v-5h6v5M8 9h2m4 0h2m-8 3h2m4 0h2M12 6v3m-1.5-1.5h3",
  idea: "M9 18h6m-5 3h4M8.5 15.5a6 6 0 1 1 7 0L15 18H9l-.5-2.5ZM12 1V0M3.5 4 2 2.5M1 11H0m23 0h1m-3.5-7L22 2.5",
  book: "M12 5C9 3 5 3 2 5v15c3-2 7-2 10 0 3-2 7-2 10 0V5c-3-2-7-2-10 0Zm0 0v15M5 8h4m-4 4h4m6-4h4m-4 4h4",
  people:
    "M16 21v-3a4 4 0 0 0-8 0v3h8ZM12 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM4 11a2.5 2.5 0 1 0 0-5m0 8a4 4 0 0 0-3 4v2h4m15-9a2.5 2.5 0 1 0 0-5m0 8a4 4 0 0 1 3 4v2h-4",
  settings:
    "m9 3 .5-1h5l.5 1 .5 2 2 .9 2-.5 2 3.5-1.5 1.5v2.2L22 14l-2 3.5-2-.5-2 .9-.5 2-.5 1h-5L9 20l-.5-2-2-.9-2 .5L2 14l1.5-1.4v-2.2L2 9l2-3.5 2 .5 2-.9L9 3ZM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
  shield: "M12 3 3 7v5c0 5 5 8 9 10 4-2 9-5 9-10V7l-9-4Zm-4 9 3 3 5-6",
  document: "M14 2H5v20h14V7l-5-5Zm0 0v5h5M8 11h8m-8 4h8m-8 4h5",
  impact: "m13 2-9 12h7l-1 8 10-13h-7l1-7Z",
};

export function ApplicationIcon({
  name,
  className,
}: {
  name: IconName;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d={iconPaths[name]}
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const choices: {
  type: ApplicantType;
  icon: IconName;
  label: string;
  title: string;
  description: string;
  benefits: { icon: IconName; text: string }[];
}[] = [
  {
    type: "STUDENT",
    icon: "student",
    label: "Student",
    title: "Apply as a student",
    description:
      "For students with a project idea, learning interest or proposal for their institution.",
    benefits: [
      { icon: "idea", text: "Submit your project idea" },
      { icon: "book", text: "Get access to our programs" },
      { icon: "people", text: "Opportunities for competitions and workshops" },
    ],
  },
  {
    type: "ORGANIZATION",
    icon: "organisation",
    label: "Organisation",
    title: "Apply for an organisation",
    description:
      "For schools, colleges, companies, NGOs and institutions looking for learning solutions.",
    benefits: [
      { icon: "organisation", text: "Set up labs and science parks" },
      { icon: "settings", text: "Customised learning solutions" },
      { icon: "people", text: "Partnership and collaboration opportunities" },
    ],
  },
];

const processItems: { icon: IconName; title: string; description: string }[] = [
  {
    icon: "shield",
    title: "Simple Process",
    description: "Quick and easy application",
  },
  {
    icon: "document",
    title: "Guided Support",
    description: "We’ll help you at every step",
  },
  {
    icon: "impact",
    title: "Create Impact",
    description: "Be part of future-ready education",
  },
];

export function ApplicationChoices({
  titleId,
  descriptionId,
  headingRef,
  scrollRef,
  onSelect,
}: {
  titleId: string;
  descriptionId: string;
  headingRef: RefObject<HTMLHeadingElement | null>;
  scrollRef: RefObject<HTMLDivElement | null>;
  onSelect: (type: ApplicantType) => void;
}) {
  return (
    <div ref={scrollRef} className={styles.chooser}>
      <header className={styles.intro}>
        <p className={styles.eyebrow}>Partner With Us</p>
        <h2
          id={titleId}
          ref={headingRef}
          tabIndex={-1}
          className={styles.title}
        >
          Start an <span>application</span>
        </h2>
        <p id={descriptionId} className={styles.description}>
          Choose the application type that best matches you.
        </p>
      </header>

      <div className={styles.choices}>
        {choices.map((choice) => (
          <button
            key={choice.type}
            type="button"
            className={cn(
              styles.card,
              choice.type === "ORGANIZATION" && styles.organisation,
            )}
            onClick={() => onSelect(choice.type)}
            aria-label={choice.title}
          >
            <span className={styles.cardTop}>
              <span className={styles.cardIcon}>
                <ApplicationIcon name={choice.icon} />
              </span>
              <span className={styles.cardArrow}>
                <ArrowIcon />
              </span>
            </span>
            <span className={styles.cardLabel}>{choice.label}</span>
            <span className={styles.cardTitle}>{choice.title}</span>
            <span className={styles.cardDescription}>{choice.description}</span>
            <span className={styles.benefits}>
              {choice.benefits.map((benefit) => (
                <span key={benefit.text} className={styles.benefit}>
                  <ApplicationIcon name={benefit.icon} />
                  <span>{benefit.text}</span>
                </span>
              ))}
            </span>
          </button>
        ))}
      </div>

      <div className={styles.photograph}>
        <Image
          src="/learning-spaces/space-exhibits-isro.webp"
          alt="Students wearing astronaut suits with ISRO patches among space-science exhibits in the Ignited Brains lab"
          fill
          sizes="(max-width: 639px) calc(100vw - 52px), (max-width: 1199px) 60vw, 680px"
          quality={85}
          loading="eager"
          className={styles.labImage}
        />
        <p className={styles.note} aria-hidden="true">
          Ideas
          <br />
          today.
          <br />
          Brighter
          <br />
          tomorrows.
        </p>
      </div>

      <aside className={styles.process} aria-label="Application support">
        {processItems.map((item) => (
          <div key={item.title} className={styles.processItem}>
            <span className={styles.processIcon}>
              <ApplicationIcon name={item.icon} />
            </span>
            <div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </aside>
    </div>
  );
}
