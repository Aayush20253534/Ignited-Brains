"use client";

import Link from "next/link";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { Artwork } from "@/components/home/artwork";
import { Youtube, Instagram, Linkedin, Twitter } from "@/components/home/social-icons";

const quickLinks = ["Home", "About Us", "Solutions", "How It Works", "Projects", "Media", "Contact"];
const solutions = ["Space Lab", "STEM Lab", "AI & Robotics Lab", "Science Park"];

export function AboutFooter() {
  return (
    <footer id="contact" className="about-footer">
      <div className="container about-footer-inner">
        <div className="footer-brand-col">
          <Link href="/" aria-label="Ignited Brains home" className="footer-brand">
            <Artwork region={[37, 6, 89, 41]} alt="Ignited Brains" priority />
          </Link>
          <p className="footer-tagline">
            Empowering young innovators to create, innovate and make a lasting impact through technology.
          </p>
          <div className="footer-socials" aria-label="Social media">
            <a href="#" aria-label="YouTube"><Youtube /></a>
            <a href="#" aria-label="Instagram"><Instagram /></a>
            <a href="#" aria-label="LinkedIn"><Linkedin /></a>
            <a href="#" aria-label="Twitter/X"><Twitter /></a>
          </div>
        </div>
        <div className="footer-col">
          <h4 className="footer-heading">Quick Links</h4>
          <ul className="footer-list">
            {quickLinks.map((link) => (
              <li key={link}><Link href={link === "Home" ? "/" : `/${link.toLowerCase().replace(/\s+/g, "")}`}>{link}</Link></li>
            ))}
          </ul>
        </div>
        <div className="footer-col">
          <h4 className="footer-heading">Our Solutions</h4>
          <ul className="footer-list">
            {solutions.map((link) => (
              <li key={link}><Link href="/solutions">{link}</Link></li>
            ))}
          </ul>
        </div>
        <div className="footer-col">
          <h4 className="footer-heading">Contact Us</h4>
          <ul className="footer-contact-list">
            <li><a href="tel:+919454488061"><Phone /><span>+91 94544 88061</span></a></li>
            <li><a href="mailto:info@ignitedbrains.com"><Mail /><span>info@ignitedbrains.com</span></a></li>
            <li><MapPin /><span>Prayagraj, Uttar Pradesh, India</span></li>
          </ul>
        </div>
        <div className="footer-col footer-newsletter">
          <h4 className="footer-heading">Newsletter</h4>
          <p className="footer-note">Stay updated with our latest programs and innovations.</p>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <label className="sr-only" htmlFor="newsletter-email">Email address</label>
            <input id="newsletter-email" type="email" required placeholder="Enter your email" />
            <button type="submit" aria-label="Subscribe to the newsletter"><ArrowRight /></button>
          </form>
        </div>
      </div>
      <div className="footer-bottom container">
        <p>© 2026 Ignited Brains. All Rights Reserved.</p>
        <div className="footer-bottom-links">
          <button type="button" className="footer-link">Privacy Policy</button>
          <button type="button" className="footer-link">Terms & Conditions</button>
        </div>
      </div>
      <span className="footer-signature">Transforming Education Through Innovation.</span>
    </footer>
  );
}
