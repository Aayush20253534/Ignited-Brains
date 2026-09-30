import type { SVGProps } from "react";

export type SocialNetwork =
  | "linkedin"
  | "instagram"
  | "youtube"
  | "facebook";

interface SocialIconProps extends SVGProps<SVGSVGElement> {
  network: SocialNetwork;
  href?: string;
  newTab?: boolean;
}

function NetworkGlyph({
  network,
  className = "",
  ...props
}: { network: SocialNetwork } & SVGProps<SVGSVGElement>) {
  if (network === "linkedin") {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...props}>
        <path
          fill="#0A66C2"
          d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V8.98h3.42v1.57h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.29ZM5.32 7.41a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14Zm1.78 13.04H3.54V8.98H7.1v11.47Z"
        />
      </svg>
    );
  }

  if (network === "instagram") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true" {...props}>
        <rect x="3.25" y="3.25" width="17.5" height="17.5" rx="5.25" stroke="#E1306C" strokeWidth="2" />
        <circle cx="12" cy="12" r="4.05" stroke="#E1306C" strokeWidth="2" />
        <circle cx="17.4" cy="6.65" r="1.15" fill="#E1306C" />
      </svg>
    );
  }

  if (network === "youtube") {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...props}>
        <path
          fill="#FF0000"
          d="M21.58 7.19a2.92 2.92 0 0 0-2.05-2.07C17.72 4.63 12 4.63 12 4.63s-5.72 0-7.53.49a2.92 2.92 0 0 0-2.05 2.07A30.1 30.1 0 0 0 1.93 12c0 1.62.16 3.23.49 4.81a2.92 2.92 0 0 0 2.05 2.07c1.81.49 7.53.49 7.53.49s5.72 0 7.53-.49a2.92 2.92 0 0 0 2.05-2.07c.33-1.58.49-3.19.49-4.81 0-1.62-.16-3.23-.49-4.81Z"
        />
        <path fill="#fff" d="m9.8 15.2 5.35-3.2L9.8 8.8v6.4Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="10" fill="#1877F2" />
      <path
        fill="#fff"
        d="M13.55 20v-7.1h2.38l.36-2.77h-2.74V8.36c0-.8.22-1.35 1.38-1.35h1.47V4.54c-.25-.03-1.13-.11-2.15-.11-2.13 0-3.59 1.3-3.59 3.69v2.01H8.25v2.77h2.41V20h2.89Z"
      />
    </svg>
  );
}

export function SocialIcon({
  network,
  href,
  newTab = true,
  className = "",
  ...props
}: SocialIconProps) {
  const glyph = (
    <NetworkGlyph
      network={network}
      className={`block h-5 w-5 shrink-0 ${className}`}
      {...props}
    />
  );

  if (!href) {
    return <span className="inline-flex items-center justify-center">{glyph}</span>;
  }

  return (
    <a
      href={href}
      target={newTab ? "_blank" : undefined}
      rel={newTab ? "noopener noreferrer" : undefined}
      aria-label={`Visit our ${network}`}
      className="inline-flex items-center justify-center transition duration-200 hover:scale-110"
    >
      {glyph}
    </a>
  );
}
