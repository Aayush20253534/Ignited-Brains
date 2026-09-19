import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Ignited Brains", template: "%s | Ignited Brains" },
  description: "Hands-on learning spaces that ignite curiosity, creativity, and innovation.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <html lang="en" data-scroll-behavior="smooth"><body><a href="#main-content" className="skip-link">Skip to content</a>{children}</body></html>;
}
