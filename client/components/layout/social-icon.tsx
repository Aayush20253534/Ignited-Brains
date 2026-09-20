import type { SVGProps } from "react";

export type SocialNetwork = "linkedin" | "instagram" | "youtube" | "facebook";

interface SocialIconProps extends SVGProps<SVGSVGElement> {
  network: SocialNetwork;
}

export function SocialIcon({ network, ...props }: SocialIconProps) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    "aria-hidden": true,
    focusable: false,
    ...props,
  } as const;

  if (network === "linkedin") {
    return (
      <svg {...common}>
        <path d="M6.2 9.1V18M6.2 6.1v.1M10.3 18v-5c0-2.2 1.3-3.5 3.2-3.5 2 0 3.3 1.3 3.3 3.5v5M10.3 13.3c0-2.3 1.3-3.8 3.2-3.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    );
  }

  if (network === "instagram") {
    return (
      <svg {...common}>
        <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5" stroke="currentColor" strokeWidth="1.7" />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.7" />
        <circle cx="17.4" cy="6.8" r="1" fill="currentColor" />
      </svg>
    );
  }

  if (network === "youtube") {
    return (
      <svg {...common}>
        <path d="M20.1 7.1c-.2-1-1-1.8-2-2C16.5 4.7 14.2 4.6 12 4.6s-4.5.1-6.1.5c-1 .2-1.8 1-2 2C3.5 8.4 3.4 10.2 3.4 12s.1 3.6.5 4.9c.2 1 1 1.8 2 2 1.6.4 3.9.5 6.1.5s4.5-.1 6.1-.5c1-.2 1.8-1 2-2 .4-1.3.5-3.1.5-4.9s-.1-3.6-.5-4.9Z" stroke="currentColor" strokeWidth="1.6" />
        <path d="m10.2 9.2 5 2.8-5 2.8V9.2Z" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <path d="M13.4 19v-6h2l.3-2.3h-2.3V9.2c0-.7.2-1.2 1.2-1.2h1.2V6c-.4-.1-.9-.1-1.7-.1-1.7 0-2.9 1.1-2.9 3v1.8H9.3V13h1.9v6" fill="currentColor" />
    </svg>
  );
}
