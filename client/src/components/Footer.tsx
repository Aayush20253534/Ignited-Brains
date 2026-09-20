import { Link } from 'react-router-dom';
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  ArrowRight,
  Send,
} from 'lucide-react';
import { useState } from 'react';
import Logo from './Logo';
import { navLinks } from '../data/nav';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const solutions = navLinks.find((l) => l.href === '/solutions');

  return (
    <footer className="relative overflow-hidden bg-brand-navy text-slate-300">
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <div className="absolute -top-32 -left-32 h-80 w-80 rounded-full bg-brand-orange/30 blur-3xl" />
        <div className="absolute -bottom-40 -right-20 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />
      </div>

      <div className="container-page relative grid gap-12 py-16 lg:grid-cols-[1.2fr_1fr_1fr_1fr_1fr">
        <div>
          <div className="[&_div_div:last-child_div:first-child]:text-white [&_div_div:last-child_div:first-child_div:last-child:text-slate-400">
            <Logo />
          </div>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-slate-400">
            Empowering young innovators to create, innovate and make a lasting impact through technology.
          </p>
          <div className="mt-6 flex items-center gap-3">
            {[
              { Icon: Facebook, href: '#' },
              { Icon: Instagram, href: '#' },
              { Icon: Linkedin, href: '#' },
              { Icon: Twitter, href: '#' },
            ].map(({ Icon, href }, i) => (
              <a
                key={i}
                href={href}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition-all hover:border-brand-orange hover:bg-brand-orange hover:text-white"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white">
            Quick Links
          </h4>
          <ul className="mt-5 space-y-3 text-sm">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link
                to={l.href} className="text-slate-400 transition-colors hover:text-brand-orange">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white">
            Our Solutions
          </h4>
          <ul className="mt-5 space-y-3 text-sm">
            {solutions && 'children' in solutions && solutions.children?.map((c) => (
              <li key={c.href}>
                <Link
                  to={c.href} className="text-slate-400 transition-colors hover:text-brand-orange">
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white">
            Contact Us
          </h4>
          <ul className="mt-5 space-y-4 text-sm">
            <li className="flex items-start gap-3">
            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/5 text-brand-orange">
              <Phone className="h-4 w-4" />
            </span>
              <a href="tel:+919454488061" className="text-slate-400 hover:text-white">+91 9454488061</a>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/5 text-brand-orange">
                <Mail className="h-4 w-4" />
              </span>
              <a href="mailto:info@ignitedbrains.com" className="text-slate-400 hover:text-white break-all">
                info@ignitedbrains.com
              </a>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/5 text-brand-orange">
                <MapPin className="h-4 w-4" />
              </span>
              <span className="text-slate-400">Prayagraj, Uttar Pradesh, India</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white">
            Newsletter
          </h4>
          <p className="mt-5 text-sm text-slate-400">
            Stay updated with our latest programs and innovations.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (email) setSubmitted(true);
            }}
            className="mt-4 flex items-stretch overflow-hidden rounded-full border border-white/10 bg-white/5 focus-within:border-brand-orange/60"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 bg-transparent px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none"
            />
            <button
              type="submit"
              className="flex aspect-square items-center justify-center bg-brand-orange text-white transition-colors hover:bg-brand-orangeLight flex"
              aria-label="Subscribe"
            >
              {submitted ? <ArrowRight className="h-4 w-4" /> : <Send className="h-4 w-4" />}
            </button>
          </form>
          {submitted && (
            <p className="mt-2 text-xs text-brand-orange">Thank you for subscribing!</p>
          )}
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-4 py-6 text-xs text-slate-500 md:flex-row">
          <p>© 2026 Ignited Brains. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="hover:text-brand-orange">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-brand-orange">
              Terms &amp; Conditions
            </Link>
            <p className="hidden font-display italic text-slate-400 md:block" style={{ fontFamily: 'cursive' }}>
              Transforming Education Through Innovation.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
