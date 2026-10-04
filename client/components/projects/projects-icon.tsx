export type ProjectsIconName = "school" | "lab" | "students" | "rocket" | "question" | "imagine" | "design" | "build" | "test" | "improve" | "code" | "signal" | "community";

export function ProjectsIcon({ name }: { name: ProjectsIconName }) {
  const paths: Record<ProjectsIconName, React.ReactNode> = {
    school: <><path d="M4 29V12l12-8 12 8v17M2 29h28M13 29v-9h6v9M8 16h2m12 0h2M8 22h2m12 0h2M16 4V1h6l-2 3h-4" /></>,
    lab: <><path d="M11 3h10M13 3v10L5 25a3 3 0 0 0 3 4h16a3 3 0 0 0 3-4l-8-12V3M9 21h14" /><circle cx="15" cy="17" r="1" /></>,
    students: <><circle cx="16" cy="7" r="4" /><path d="M9 29V18a7 7 0 0 1 14 0v11M3 29V18a4 4 0 0 1 4-4m22 15V18a4 4 0 0 0-4-4M12 21v8m8-8v8" /><path d="M6 5a3 3 0 1 0 0 6m20-6a3 3 0 1 1 0 6" /></>,
    rocket: <><path d="M12 22 9 19C13 9 20 3 29 3c0 9-6 16-16 20ZM9 17l-5 2-2 6 7-3m6 1-3 7 6-2 2-5M7 26l-4 4" /><circle cx="22" cy="10" r="3" /></>,
    question: <><path d="M10 11a6 6 0 1 1 9 5c-3 2-3 2-3 5M16 26h.01" /><path d="M6 4 3 7M26 4l3 3" /></>,
    imagine: <><path d="M11 23h10M12 27h8M14 30h4M11 22v-3a9 9 0 1 1 10 0v3M16 1v3M2 10l3 1m25-1-3 1M5 3l2 3m20-3-2 3" /></>,
    design: <><path d="m6 23 2-7L22 2l8 8-14 14-7 2-3-3Zm2-7 8 8M19 5l8 8M3 29h24" /></>,
    build: <><path d="m4 10 12-7 12 7v13l-12 7-12-7V10Zm0 0 12 7 12-7M16 17v13M10 6l12 7v6" /></>,
    test: <><path d="M11 3h10m-8 0v10L5 25a3 3 0 0 0 3 4h16a3 3 0 0 0 3-4l-8-12V3M10 21l4 4 8-8" /></>,
    improve: <><path d="M25 9a12 12 0 1 0 2 12M25 2v8h-8M10 20l4-5 4 2 5-6" /></>,
    code: <><path d="m10 9-7 7 7 7m12-14 7 7-7 7M19 4l-6 24" /></>,
    signal: <><circle cx="16" cy="23" r="3" /><path d="M10 16a9 9 0 0 1 12 0M5 11a16 16 0 0 1 22 0M1 6a22 22 0 0 1 30 0" /></>,
    community: <><circle cx="16" cy="6" r="4" /><circle cx="6" cy="25" r="4" /><circle cx="26" cy="25" r="4" /><path d="m14 10-6 11m10-11 6 11M10 25h12" /></>,
  };
  return <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}
