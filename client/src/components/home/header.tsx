"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { Artwork } from "./artwork";

const links = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Solutions", href: "/solutions" },
  { label: "How It Works", href: "/#learning-system" },
  { label: "Projects", href: "/#projects" },
  { label: "Media", href: "/#our-story" },
  { label: "Contact", href: "/#contact" },
];

function isActive(pathname: string, href: string) {
  if (href.includes("#")) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" aria-label="Ignited Brains home" className="brand">
          <Artwork region={[37, 6, 89, 41]} alt="Ignited Brains" priority />
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map(({ label, href }) => (
            <Link key={label} href={href} aria-current={isActive(pathname, href) ? "page" : undefined}>
              {label}
              {label === "Solutions" && <ChevronDown />}
            </Link>
          ))}
        </nav>
        <a className="button button-primary header-cta" href="#contact">
          Partner With Us <ArrowRight />
        </a>
        <button
          className="menu-toggle"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav
          id="mobile-navigation"
          className="mobile-nav"
          aria-label="Mobile navigation"
          onKeyDown={(e) => {
            if (e.key === "Escape") setOpen(false);
          }}
        >
          {links.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              aria-current={isActive(pathname, href) ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
          <a href="#contact" onClick={() => setOpen(false)}>
            Partner With Us <ArrowRight />
          </a>
        </nav>
      )}
    </header>
  );
}
