"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { BrandLogo } from "@/components/layout/brand-logo";
import { PartnerApplicationDialog } from "@/components/layout/partner-application-dialog";
import { ArrowIcon, Container } from "@/components/ui";
import { mainNavigation } from "@/data/navigation";
import { cn } from "@/lib/cn";

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true">
      <path
        d="m6 8 4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <span className="relative block h-5 w-6" aria-hidden="true">
      <span
        className={cn(
          "absolute left-0 top-1 h-0.5 w-6 rounded-full bg-current transition",
          open && "top-2.5 rotate-45",
        )}
      />
      <span
        className={cn(
          "absolute left-0 top-2.5 h-0.5 w-6 rounded-full bg-current transition",
          open && "opacity-0",
        )}
      />
      <span
        className={cn(
          "absolute left-0 top-4 h-0.5 w-6 rounded-full bg-current transition",
          open && "top-2.5 -rotate-45",
        )}
      />
    </span>
  );
}

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  if (href.includes("#")) return false;
  return pathname === href || pathname.startsWith(`${href}/`);
}

function isNavigationItemActive(
  pathname: string,
  item: (typeof mainNavigation)[number],
) {
  if (isActivePath(pathname, item.href)) return true;
  return item.children?.some((child) => pathname === child.href) ?? false;
}

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  function closeMobileMenu() {
    setMobileOpen(false);
    setMobileSolutionsOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 12);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMobileMenu();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b backdrop-blur-xl transition-[background-color,border-color,box-shadow] duration-300",
        scrolled
          ? "border-brand-line bg-white/98 shadow-[0_10px_35px_rgba(4,27,63,0.08)]"
          : "border-brand-line/70 bg-white/95",
      )}
    >
      <Container
        wide
        className={cn(
          "flex h-[72px] items-center justify-between gap-4 transition-[height] duration-300 sm:gap-6 lg:h-[76px]",
          scrolled && "lg:h-[72px]",
        )}
      >
        <div className="flex shrink-0 items-center gap-3">
          <BrandLogo />
          <span className="hidden border-l border-brand-line pl-3 text-[0.62rem] font-semibold leading-[1.35] text-brand-blue/65 xl:block">
            Transforming Education
            <br />
            Through Innovation
          </span>
        </div>

        <nav className="hidden h-full items-stretch lg:flex" aria-label="Primary navigation">
          <ul className="flex h-full items-stretch gap-0.5 xl:gap-2">
            {mainNavigation.map((item) => {
              const active = isNavigationItemActive(pathname, item);

              if (item.children) {
                return (
                  <li key={item.label} className="group relative flex items-stretch">
                    <Link
                      href={item.href}
                      className={cn(
                        "focus-ring relative flex items-center gap-1 rounded-md px-3 text-[0.82rem] font-extrabold transition-colors xl:px-4 xl:text-sm",
                        active ? "text-brand-orange" : "text-brand-blue hover:text-brand-orange",
                      )}
                      aria-current={active ? "page" : undefined}
                    >
                      {item.label}
                      <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180 group-focus-within:rotate-180" />
                      <span
                        className={cn(
                          "absolute inset-x-3 bottom-0 h-0.5 origin-center bg-brand-orange transition-transform xl:inset-x-4",
                          active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                        )}
                      />
                    </Link>

                    <div className="pointer-events-none absolute left-1/2 top-[calc(100%-2px)] w-64 -translate-x-1/2 translate-y-2 pt-3 opacity-0 transition duration-150 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100">
                      <div className="overflow-hidden rounded-2xl border border-brand-line bg-white p-2 shadow-[0_20px_60px_rgba(4,27,63,0.16)]">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={cn(
                              "focus-ring flex items-center justify-between rounded-xl px-4 py-3 text-sm font-bold transition hover:bg-brand-sky hover:text-brand-orange",
                              pathname === child.href
                                ? "bg-brand-sky text-brand-orange"
                                : "text-brand-blue",
                            )}
                          >
                            <span>{child.label}</span>
                            <ArrowIcon className="h-4 w-4" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  </li>
                );
              }

              return (
                <li key={item.label} className="flex items-stretch">
                  <Link
                    href={item.href}
                    className={cn(
                      "group focus-ring relative flex items-center rounded-md px-3 text-[0.82rem] font-extrabold transition-colors xl:px-4 xl:text-sm",
                      active ? "text-brand-orange" : "text-brand-blue hover:text-brand-orange",
                    )}
                    aria-current={active ? "page" : undefined}
                  >
                    {item.label}
                    <span
                      className={cn(
                        "absolute inset-x-3 bottom-0 h-0.5 origin-center bg-brand-orange transition-transform xl:inset-x-4",
                        active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                      )}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden lg:block">
          <PartnerApplicationDialog className="min-h-11 px-5 xl:px-6" />
        </div>

        <button
          type="button"
          className="focus-ring grid h-11 w-11 place-items-center rounded-full border border-brand-line bg-white text-brand-blue lg:hidden"
          onClick={() => setMobileOpen((value) => !value)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
          aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
        >
          <MenuIcon open={mobileOpen} />
        </button>
      </Container>

      <div
        id="mobile-navigation"
        className={cn(
          "fixed inset-x-0 top-[72px] z-40 h-[calc(100dvh-72px)] overflow-y-auto border-t border-brand-line bg-white transition duration-200 lg:hidden",
          mobileOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0",
        )}
      >
        <Container className="py-6">
          <nav aria-label="Mobile navigation">
            <ul className="divide-y divide-brand-line/80">
              {mainNavigation.map((item) => {
                const active = isNavigationItemActive(pathname, item);

                if (item.children) {
                  return (
                    <li key={item.label} className="py-1">
                      <div className="flex items-center">
                        <Link
                          href={item.href}
                          onClick={closeMobileMenu}
                          className={cn(
                            "focus-ring flex min-h-14 flex-1 items-center rounded-lg text-lg font-extrabold",
                            active ? "text-brand-orange" : "text-brand-blue",
                          )}
                        >
                          {item.label}
                        </Link>
                        <button
                          type="button"
                          className="focus-ring grid h-11 w-11 place-items-center rounded-full text-brand-blue"
                          onClick={() => setMobileSolutionsOpen((value) => !value)}
                          aria-expanded={mobileSolutionsOpen}
                          aria-label="Toggle Solutions menu"
                        >
                          <ChevronDown
                            className={cn(
                              "h-5 w-5 transition-transform",
                              mobileSolutionsOpen && "rotate-180",
                            )}
                          />
                        </button>
                      </div>

                      {mobileSolutionsOpen ? (
                        <ul className="mb-3 grid gap-1 rounded-2xl bg-brand-mist p-2">
                          {item.children.map((child) => (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                onClick={closeMobileMenu}
                                className={cn(
                                  "focus-ring flex min-h-11 items-center justify-between rounded-xl px-4 text-sm font-bold",
                                  pathname === child.href
                                    ? "bg-white text-brand-orange shadow-sm"
                                    : "text-brand-blue",
                                )}
                              >
                                {child.label}
                                <ArrowIcon className="h-4 w-4" />
                              </Link>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </li>
                  );
                }

                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      onClick={closeMobileMenu}
                      className={cn(
                        "focus-ring flex min-h-14 items-center rounded-lg text-lg font-extrabold",
                        active ? "text-brand-orange" : "text-brand-blue",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <PartnerApplicationDialog className="mt-7 w-full" />
        </Container>
      </div>
    </header>
  );
}
