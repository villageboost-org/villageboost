"use client";

import { useState } from "react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "The Process", href: "/#process" },
  { label: "FAQs", href: "/#faq" },
  { label: "Campaigns", href: "/campaigns" },
  { label: "Contacts", href: "/#contacts" },
];

function MenuIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      className="h-8 w-8">
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      className="h-8 w-8">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b border-grey/20 bg-white py-2 xl:px-16 md:px-8 px-4">
      <span className="text-2xl font-bold tracking-wide text-rust-red">
        VILLAGEBOOST
      </span>

      <nav className="hidden items-center xl:gap-12 gap-8 text-base font-medium text-rust-red md:flex">
        {navLinks.map((link) => (
          <a key={link.label} href={link.href} className="hover:text-maroon">
            {link.label}
          </a>
        ))}
      </nav>

      <div className="hidden items-center gap-6 md:flex">
        <a href="/sign-up" className="btn-primary">
          Sign Up
        </a>
        <a href="/login" className="btn-secondary">
          Login
        </a>
      </div>

      <button
        type="button"
        aria-label="Toggle menu"
        aria-expanded={isMenuOpen}
        className="text-rust-red md:hidden"
        onClick={() => setIsMenuOpen((open) => !open)}>
        {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
      </button>

      <div
        className={`fixed inset-0 z-40 bg-black/60 transition-opacity md:hidden ${
          isMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      <nav
        className={`fixed inset-y-0 right-0 z-50 flex w-72 flex-col gap-6 bg-white px-4 py-8 shadow-lg transition-transform duration-300 md:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}>
        <div className="flex flex-row gap-6 border-b border-grey/20 pb-6">
          <a
            href="/sign-up"
            className="btn-primary text-center"
            onClick={() => setIsMenuOpen(false)}>
            Sign Up
          </a>
          <a
            href="/login"
            className="btn-secondary text-center"
            onClick={() => setIsMenuOpen(false)}>
            Login
          </a>
        </div>

        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="text-lg font-medium text-rust-red hover:text-maroon"
            onClick={() => setIsMenuOpen(false)}>
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
