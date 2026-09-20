export interface NavItem {
  label: string;
  href: string;
}

export interface NavGroup extends NavItem {
  children?: NavItem[];
}

export const mainNavigation: NavGroup[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  {
    label: "Solutions",
    href: "/solutions",
    children: [
      { label: "All Solutions", href: "/solutions" },
      { label: "Space Lab", href: "/solutions/space-lab" },
      { label: "STEM Lab", href: "/solutions/stem-lab" },
      { label: "AI & Robotics Lab", href: "/solutions/ai-robotics" },
      { label: "Science Park", href: "/solutions/science-park" },
    ],
  },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Projects", href: "/projects" },
  { label: "Media", href: "/media" },
  { label: "Contact", href: "/contact" },
];

export const footerQuickLinks: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Solutions", href: "/solutions" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Projects", href: "/projects" },
  { label: "Media", href: "/media" },
  { label: "Contact", href: "/contact" },
];

export const footerSolutions: NavItem[] = [
  { label: "Space Lab", href: "/solutions/space-lab" },
  { label: "STEM Lab", href: "/solutions/stem-lab" },
  { label: "AI & Robotics Lab", href: "/solutions/ai-robotics" },
  { label: "Science Park", href: "/solutions/science-park" },
];
