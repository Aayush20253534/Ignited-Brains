import type { ReactNode } from "react";

const paths = {
  person: (
    <>
      <circle cx="12" cy="7" r="3" />
      <path d="M5 21v-3a7 7 0 0 1 14 0v3" />
    </>
  ),
  email: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 6 9 7 9-7" />
    </>
  ),
  phone: (
    <path d="m7 3 3 5-2 2a15 15 0 0 0 6 6l2-2 5 3-1 3c-.3 1-1.5 1.5-2.5 1.3A21 21 0 0 1 2.7 6.5C2.5 5.5 3 4.3 4 4Z" />
  ),
  location: (
    <>
      <path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 0 1 14 0Z" />
      <circle cx="12" cy="10" r="2" />
    </>
  ),
  institution: (
    <>
      <path d="M8 21V3h9v18M3 21V9h5m9 4h4v8M2 21h20M11 7h3m-3 4h3m-3 4h3m-3 6v-3h3v3" />
    </>
  ),
  graduation: (
    <>
      <path d="m2 8 10-5 10 5-10 5ZM6 10v7c4 3 8 3 12 0v-7M22 8v7" />
    </>
  ),
  idea: (
    <>
      <path d="M9 18h6m-5 3h4M8 14a6 6 0 1 1 8 0c-1 1-1 2-1 4H9c0-2 0-3-1-4ZM12 1v1M3 5l1 1M1 11h2m18 0h2M20 6l1-1" />
    </>
  ),
  people: (
    <>
      <circle cx="9" cy="7" r="3" />
      <path d="M2 21v-3a7 7 0 0 1 14 0v3M17 4a3 3 0 0 1 0 6m1 4a5 5 0 0 1 4 5v2" />
    </>
  ),
  book: (
    <>
      <path d="M12 5v16M3 3c4 0 7 1 9 2 2-1 5-2 9-2v15c-4 0-7 1-9 3-2-2-5-3-9-3Z" />
    </>
  ),
  settings: (
    <>
      <path d="m9 3-1 3-3 1-2 3 2 2v3l3 2 1 4h6l1-4 3-2v-3l2-2-2-3-3-1-1-3Z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  shield: (
    <>
      <path d="M12 2 3 6v6c0 6 9 10 9 10s9-4 9-10V6Z" />
      <path d="m8 12 3 3 5-6" />
    </>
  ),
  lock: (
    <>
      <rect x="4" y="10" width="16" height="12" rx="2" />
      <path d="M8 10V6a4 4 0 0 1 8 0v4m-4 5v3" />
    </>
  ),
  eye: (
    <>
      <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  eyeOff: (
    <>
      <path d="M3 3 21 21M10 5c7-1 12 7 12 7a22 22 0 0 1-3 4M6 6c-3 2-4 6-4 6s4 7 10 7c2 0 3-.5 5-2m-7-7a3 3 0 0 0 4 4" />
    </>
  ),
  arrow: <path d="M4 12h16m-6-6 6 6-6 6" />,
  back: <path d="M20 12H4m6-6-6 6 6 6" />,
  check: <path d="m5 12 4 4L19 6" />,
  support: (
    <>
      <path d="M3 14v-3a9 9 0 0 1 18 0v3M4 11H2v7h4v-7ZM20 11h2v7h-4v-7Zm0 7v2c0 1-1 2-2 2h-4" />
      <path d="M11 21h3" />
    </>
  ),
  document: (
    <>
      <path d="M14 2H5v20h14V7ZM14 2v5h5M8 11h8m-8 4h8m-8 4h4" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M7 2v6m10-6v6M3 11h18m-14 4h2m3 0h2" />
    </>
  ),
  budget: (
    <>
      <rect x="2" y="6" width="20" height="14" rx="2" />
      <path d="M2 10h20m-6 5h3M5 6V3h12" />
    </>
  ),
  logout: (
    <>
      <path d="M15 7V3H4v18h11v-4m-5-5h12m-5-5 5 5-5 5" />
    </>
  ),
  home: (
    <>
      <path d="m2 11 10-9 10 9M5 9v13h14V9m-10 13v-8h6v8" />
    </>
  ),
} satisfies Record<string, ReactNode>;

export type PortalIconName = keyof typeof paths;

export function PortalIcon({
  name,
  className,
}: {
  name: PortalIconName;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.65"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {paths[name]}
    </svg>
  );
}
