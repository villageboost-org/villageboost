"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "The Process", href: "/#process" },
  { label: "Campaigns", href: "/campaigns" },
  { label: "Why Village Boost", href: "/#why" },
  { label: "Contacts", href: "/#contacts" }
];

import { Menu, X } from "lucide-react";

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
        className={`xl:inset-x-40 inset-x-5 rounded-full shadow-md/5 top-4 z-50 flex items-center justify-between border-b border-ink/8 bg-white py-3 xl:px-16 md:px-8 px-4 ${isSingleCampaignPage ? "" : "fixed"}`}>
        <Link className="flex items-center gap-2" href="/">
          <Image
            src="/main-logo.svg"
            alt="Village Boost logo"
            width={35}
            height={35}
          />
          <h4 className="font-bold text-ink">VillageBoost</h4>
        </Link>

        <nav className="hidden items-center xl:gap-10 gap-6 text-sm font-medium text-body-gray lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`transition-colors hover:text-ink ${
                isActive(link.href) ? "text-ink font-bold" : ""
              }`}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <a
            href="/login"
            className="text-sm font-medium text-body-gray hover:text-ink transition-colors">
            Login
          </a>
          <a href="/start-campaign" className="btn-primary">
            Start a campaign
          </a>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
          className="text-ink lg:hidden"
          onClick={() => setIsMenuOpen((open) => !open)}>
          {isMenuOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
        </button>

        <div
          className={`fixed inset-0 z-40 bg-black/60 transition-opacity lg:hidden ${
            isMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
          onClick={() => setIsMenuOpen(false)}
        />

        <nav
          className={`fixed inset-y-0 right-0 z-50 flex w-76 flex-col gap-6 bg-white px-4 py-8 shadow-lg transition-transform duration-300 lg:hidden ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}>
          <div className="flex flex-row gap-3 border-b border-ink/10 pb-6">
            <a
              href="/login"
              className="text-sm btn-secondary text-center self-start"
              onClick={() => setIsMenuOpen(false)}>
              Login
            </a>
            <a
              href="/start-campaign"
              className="text-sm btn-primary text-center self-start"
              onClick={() => setIsMenuOpen(false)}>
              Start a campaign
            </a>
          </div>

          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-ink ${
                isActive(link.href) ? "text-ink font-bold" : "text-body-gray"
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
