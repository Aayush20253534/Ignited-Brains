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
      { label: "STEM Lab", href: "/solutions#stem-lab" },
      { label: "AI & Robotics Lab", href: "/solutions#ai-robotics-lab" },
      { label: "Science Park", href: "/solutions#science-park" },
    ],
  },
  { label: "Projects", href: "/projects" },
  { label: "Media", href: "/media" },
  { label: "Shop", href: "/shop" },
  { label: "Contact", href: "/contact" },
];

export const footerQuickLinks: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Solutions", href: "/solutions" },
  { label: "Projects", href: "/projects" },
  { label: "Media", href: "/media" },
  { label: "Shop", href: "/shop" },
  { label: "Contact", href: "/contact" },
];

export const footerSolutions: NavItem[] = [
  { label: "Space Lab", href: "/solutions/space-lab" },
  { label: "STEM Lab", href: "/solutions#stem-lab" },
  { label: "AI & Robotics Lab", href: "/solutions#ai-robotics-lab" },
  { label: "Science Park", href: "/solutions#science-park" },
];
