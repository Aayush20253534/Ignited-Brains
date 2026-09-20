import type { SVGProps } from "react";

export type HomeIconName =
  | "curiosity"
  | "creativity"
  | "innovation"
  | "observe"
  | "think"
  | "design"
  | "build"
  | "test"
  | "improve"
  | "share"
  | "space"
  | "stem"
  | "robotics"
  | "park"
  | "school"
  | "lab"
  | "students"
  | "projects";

type HomeIconProps = SVGProps<SVGSVGElement> & {
  name: HomeIconName;
};

function Paths({ name }: { name: HomeIconName }) {
  switch (name) {
    case "curiosity":
      return <><circle cx="12" cy="12" r="7"/><path d="M9.8 9.2a2.5 2.5 0 1 1 3.4 2.3c-.9.4-1.2.9-1.2 1.8M12 16.3h.01"/></>;
    case "creativity":
      return <><path d="M9 18h6M9.6 15.2h4.8M8.2 12.9a6 6 0 1 1 7.6 0c-1.1.8-1.5 1.5-1.5 2.3H9.7c0-.8-.4-1.5-1.5-2.3Z"/><path d="M12 2v1.6M4.9 5l1.2 1.1M19.1 5l-1.2 1.1"/></>;
    case "innovation":
      return <><path d="m14.7 4.2 5.1-.9-.9 5.1-6.6 6.6-4.2-4.2 6.6-6.6Z"/><circle cx="15.9" cy="7.2" r="1.2"/><path d="m8.5 11.2-3.2.7-2.1 2.2 4.5.2M11.9 14.5l-.7 3.2-2.2 2.1-.2-4.5"/></>;
    case "observe":
      return <><path d="M2.8 12s3.3-5 9.2-5 9.2 5 9.2 5-3.3 5-9.2 5-9.2-5-9.2-5Z"/><circle cx="12" cy="12" r="2.4"/></>;
    case "think":
      return <><path d="M12 3a6.5 6.5 0 0 0-3.7 11.8V18h7.4v-3.2A6.5 6.5 0 0 0 12 3Z"/><path d="M9.5 21h5M9 15h6"/></>;
    case "design":
      return <><path d="m5 17 2-6 9-7 4 4-7 9-6 2-2-2Z"/><path d="m13.5 6.5 4 4M7 11l6 6"/></>;
    case "build":
      return <><path d="M4 8.5 12 4l8 4.5v9L12 22l-8-4.5v-9Z"/><path d="m4.5 8.8 7.5 4 7.5-4M12 13v9"/></>;
    case "test":
      return <><path d="M9 3h6M10 3v5l-5 9a2.5 2.5 0 0 0 2.2 3.7h9.6A2.5 2.5 0 0 0 19 17l-5-9V3"/><path d="M7.8 15h8.4"/></>;
    case "improve":
      return <><path d="M4 19V10M10 19V6M16 19V3M3 19h18"/><path d="m4 8 5-3 5 1 5-4"/></>;
    case "share":
      return <><circle cx="12" cy="5" r="2"/><circle cx="5" cy="17" r="2"/><circle cx="19" cy="17" r="2"/><path d="m10.4 6.3-4 8.6M13.6 6.3l4 8.6M7 17h10"/></>;
    case "space":
      return <><path d="m14.8 4.2 5-.9-.9 5-6.7 6.7-4.2-4.2 6.8-6.6Z"/><path d="m8.3 11.2-3.2.7-2 2.2 4.4.1M11.8 14.7l-.7 3.2-2.2 2-.1-4.4"/><circle cx="16" cy="7" r="1.1"/></>;
    case "stem":
      return <><path d="M9 3h6M10 3v5l-5 9a2.5 2.5 0 0 0 2.2 3.7h9.6A2.5 2.5 0 0 0 19 17l-5-9V3"/><path d="M8 14.8h8"/></>;
    case "robotics":
      return <><rect x="5" y="7" width="14" height="11" rx="3"/><path d="M9 7V4h6v3M8.5 12h.01M15.5 12h.01M9 16h6M3 11v4M21 11v4"/></>;
    case "park":
      return <><circle cx="12" cy="7" r="3"/><path d="M12 10v11M7 21h10M6 16c2-3 10-3 12 0M4 12c3-4 13-4 16 0"/></>;
    case "school":
      return <><path d="m3 9 9-5 9 5-9 5-9-5Z"/><path d="M6 12v6M10 14v4M14 14v4M18 12v6M4 20h16"/></>;
    case "lab":
      return <><path d="M9 3h6M10 3v5l-5 9a2.5 2.5 0 0 0 2.2 3.7h9.6A2.5 2.5 0 0 0 19 17l-5-9V3"/><circle cx="10" cy="16" r="1"/><circle cx="14" cy="13" r=".8"/></>;
    case "students":
      return <><circle cx="8" cy="8" r="2.4"/><circle cx="16.5" cy="9" r="2"/><path d="M3.5 19c.5-4 2-6 4.5-6s4 2 4.5 6M12 18c.5-3 2-4.5 4.5-4.5S20.5 15 21 18"/></>;
    case "projects":
      return <><path d="M5 4h14v16H5zM8 8h8M8 12h5M8 16h7"/><path d="m15.5 13.5 1.2 1.2 2.3-2.5"/></>;
  }
}

export function HomeIcon({ name, className, ...props }: HomeIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.65"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <Paths name={name} />
    </svg>
  );
}
