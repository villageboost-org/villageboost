"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "The Process", href: "/#process" },
  { label: "FAQs", href: "/#faq" },
  { label: "Campaigns", href: "/campaigns" },
  { label: "Contacts", href: "#contacts" },
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
  const pathname = usePathname();
  const isSingleCampaignPage = /^\/campaigns\/[^/]+$/.test(pathname);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const sectionIds = [
      "home",
      ...navLinks
        .filter((link) => link.href.includes("#"))
        .map((link) => link.href.split("#")[1]),
    ];

    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id === "home" ? "" : entry.target.id);
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/" && activeSection === "";
    if (href.startsWith("/#")) {
      return pathname === "/" && activeSection === href.split("#")[1];
    }
    if (href.startsWith("#")) {
      return activeSection === href.split("#")[1];
    }
    return pathname.startsWith(href) && activeSection !== "contacts";
  };

  return (
    <>
      <header
        className={`inset-x-0 top-0 z-50 flex items-center justify-between border-b border-grey/20 bg-white py-2 xl:px-16 md:px-8 px-4 ${isSingleCampaignPage ? "" : "fixed"}`}>
        <Link href="/">
          <Image
            src="/villageboost-logo.svg"
            alt="Village Boost logo"
            width={150}
            height={50}
            className="h-auto w-auto"
          />
        </Link>

        <nav className="hidden items-center xl:gap-12 gap-8 text-base font-medium text-grey lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`hover:text-maroon ${
                isActive(link.href) ? "text-rust-red" : ""
              }`}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-6 lg:flex">
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
          className="text-rust-red lg:hidden"
          onClick={() => setIsMenuOpen((open) => !open)}>
          {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>

        <div
          className={`fixed inset-0 z-40 bg-black/60 transition-opacity lg:hidden ${
            isMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
          onClick={() => setIsMenuOpen(false)}
        />

        <nav
          className={`fixed inset-y-0 right-0 z-50 flex w-72 flex-col gap-6 bg-white px-4 py-8 shadow-lg transition-transform duration-300 lg:hidden ${
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
              className={`text-base font-medium hover:text-maroon ${
                isActive(link.href) ? "text-rust-red" : "text-grey"
              }`}
              onClick={() => setIsMenuOpen(false)}>
              {link.label}
            </a>
          ))}
        </nav>
      </header>
      {!isSingleCampaignPage && <div className="h-10" />}
    </>
  );
}
