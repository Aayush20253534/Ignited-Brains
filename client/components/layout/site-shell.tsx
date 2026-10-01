"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export function SiteShell({ children, header, footer }: { children: ReactNode; header: ReactNode; footer: ReactNode }) {
  const admin = usePathname() === "/admin";
  return <div className="flex min-h-screen flex-col">
    {admin ? null : <><a href="#main-content" className="skip-link">Skip to content</a>{header}</>}
    <div id="main-content" tabIndex={-1} className="flex-1 outline-none">{children}</div>
    {admin ? null : footer}
  </div>;
}
