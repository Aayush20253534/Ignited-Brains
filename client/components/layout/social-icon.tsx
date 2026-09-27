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

export function SocialIcon({
  network,
  href,
  newTab = true,
  className = "",
  ...props
}: SocialIconProps) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    "aria-hidden": true,
    focusable: false,
    ...props,
  } as const;

  const icon = (() => {
    switch (network) {
      case "linkedin":
        return (
          <svg {...common}>
            <rect
              x="3"
              y="3"
              width="18"
              height="18"
              rx="4"
              className="social-outline"
            />
            <path
              d="M6.2 9.1V18M6.2 6.1v.1
                 M10.3 18v-5c0-2.2 1.3-3.5 3.2-3.5
                 2 0 3.3 1.3 3.3 3.5v5
                 M10.3 13.3c0-2.3 1.3-3.8 3.2-3.8"
              className="social-fill"
            />
          </svg>
        );

      case "instagram":
        return (
          <svg {...common}>
            <rect
              x="3.2"
              y="3.2"
              width="17.6"
              height="17.6"
              rx="5"
              className="social-outline"
            />
            <circle
              cx="12"
              cy="12"
              r="4"
              className="social-outline"
            />
            <circle
              cx="17.4"
              cy="6.8"
              r="1"
              className="social-dot"
            />
          </svg>
        );

      case "youtube":
        return (
          <svg {...common}>
            <path
              d="M20.1 7.1c-.2-1-1-1.8-2-2
                 C16.5 4.7 14.2 4.6 12 4.6
                 s-4.5.1-6.1.5c-1 .2-1.8 1-2 2
                 C3.5 8.4 3.4 10.2 3.4 12
                 s.1 3.6.5 4.9c.2 1 1 1.8 2 2
                 1.6.4 3.9.5 6.1.5
                 s4.5-.1 6.1-.5c1-.2 1.8-1 2-2
                 .4-1.3.5-3.1.5-4.9
                 s-.1-3.6-.5-4.9Z"
              className="social-fill"
            />
            <path
              d="m10.2 9.2 5 2.8-5 2.8V9.2Z"
              className="youtube-play"
            />
          </svg>
        );

      case "facebook":
        return (
          <svg {...common}>
            <circle
              cx="12"
              cy="12"
              r="9"
              className="social-fill"
            />
            <path
              d="M13.4 19v-6h2l.3-2.3h-2.3V9.2
                 c0-.7.2-1.2 1.2-1.2h1.2V6
                 c-.4-.1-.9-.1-1.7-.1
                 -1.7 0-2.9 1.1-2.9 3v1.8
                 H9.3V13h1.9v6"
              className="facebook-f"
            />
          </svg>
        );
    }
  })();

  const content = (
    <>
      {icon}

      <style>{`
        .social-icon {
          width: 34px;
          height: 34px;
          cursor: pointer;

          transition:
            transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
            filter 0.3s ease;
        }

        .social-icon:hover {
          transform: translateY(-4px) scale(1.12);
        }

        /* LinkedIn */
        .social-linkedin {
          color: #0A66C2;
        }

        .social-linkedin:hover {
          filter: drop-shadow(0 5px 10px rgba(10, 102, 194, 0.35));
        }

        .social-linkedin .social-outline {
          stroke: currentColor;
          stroke-width: 1.6;
          fill: none;
        }

        .social-linkedin .social-fill {
          fill: currentColor;
        }

        /* Instagram */
        .social-instagram {
          color: #E1306C;
        }

        .social-instagram:hover {
          filter: drop-shadow(0 5px 10px rgba(225, 48, 108, 0.35));
        }

        .social-instagram .social-outline {
          stroke: currentColor;
          stroke-width: 1.7;
          fill: none;
        }

        .social-instagram .social-dot {
          fill: currentColor;
        }

        /* YouTube */
        .social-youtube {
          color: #FF0000;
        }

        .social-youtube:hover {
          filter: drop-shadow(0 5px 10px rgba(255, 0, 0, 0.35));
        }

        .social-youtube .social-fill {
          fill: currentColor;
        }

        .social-youtube .youtube-play {
          fill: white;
        }

        /* Facebook */
        .social-facebook {
          color: #1877F2;
        }

        .social-facebook:hover {
          filter: drop-shadow(0 5px 10px rgba(24, 119, 242, 0.35));
        }

        .social-facebook .social-fill {
          fill: currentColor;
        }

        .social-facebook .facebook-f {
          fill: white;
        }

        @media (prefers-reduced-motion: reduce) {
          .social-icon {
            transition: none;
          }
        }
      `}</style>
    </>
  );

  if (!href) {
    return (
      <span
        className={`social-icon social-${network} inline-flex ${className}`}
      >
        {content}
      </span>
    );
  }

  return (
    <a
      href={href}
      target={newTab ? "_blank" : undefined}
      rel={newTab ? "noopener noreferrer" : undefined}
      aria-label={`Visit our ${network}`}
      className={`social-icon social-${network} inline-flex ${className}`}
    >
      {content}
    </a>
  );
}