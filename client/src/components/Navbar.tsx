import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Menu, X, ArrowRight } from 'lucide-react';
import Logo from './Logo';
import { navLinks } from '../data/nav';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setOpenDropdown(null);
  }, [location.pathname]);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'border-b border-slate-200/70 bg-white/90 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between lg:h-20">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <div
              key={link.href}
              className="relative"
              onMouseEnter={() =>
                'children' in link && link.children ? setOpenDropdown(link.href) : undefined
              }
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <NavLink
                to={link.href}
                end={link.href === '/'}
                className={({ isActive }) =>
                  `relative flex items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                    isActive ? 'text-brand-orange' : 'text-slate-700 hover:text-brand-orange'
                  }`
                }
              >
                {link.label}
                {'children' in link && link.children ? (
                  <ChevronDown className="h-3.5 w-3.5" />
                ) : null}
              </NavLink>

              {('children' in link && link.children && openDropdown === link.href) && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="absolute left-1/2 top-full w-60 -translate-x-1/2 pt-3"
                >
                  <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-xl shadow-slate-900/5">
                    {link.children.map((c) => (
                      <Link
                        key={c.href}
                        to={c.href}
                        className="block rounded-xl px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-brand-orange/10 hover:text-brand-orange"
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link to="/contact" className="btn-primary">
            Partner With Us <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 lg:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-slate-200 bg-white lg:hidden"
          >
            <div className="container-page flex flex-col gap-1 py-4">
              {navLinks.map((link) => (
                <div key={link.href}>
                  <NavLink
                    to={link.href}
                    end={link.href === '/'}
                    className={({ isActive }) =>
                      `flex items-center justify-between rounded-xl px-3 py-3 text-base font-semibold ${
                        isActive ? 'bg-brand-orange/10 text-brand-orange' : 'text-slate-800'
                      }`
                    }
                  >
                    {link.label}
                    {'children' in link && link.children ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : null}
                  </NavLink>
                  {('children' in link && link.children) && (
                    <div className="ml-3 flex flex-col border-l border-slate-200 pl-3">
                      {link.children.map((c) => (
                        <NavLink
                          key={c.href}
                          to={c.href}
                          className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:text-brand-orange"
                        >
                          {c.label}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Link to="/contact" className="btn-primary mt-3 w-full">
                Partner With Us <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
