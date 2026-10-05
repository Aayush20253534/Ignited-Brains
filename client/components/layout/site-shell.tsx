"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export function SiteShell({
  children,
  header,
  footer,
}: {
  children: ReactNode;
  header: ReactNode;
  footer: ReactNode;
}) {
  const pathname = usePathname();
  const admin = pathname === "/admin" || pathname.startsWith("/admin/");
  return (
    <div className="flex min-h-screen flex-col">
      {admin ? null : header}
      <div id="main-content" tabIndex={-1} className="flex-1 outline-none">
        {children}
      </div>
      {admin ? null : footer}
    </div>
  );
}
