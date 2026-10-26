"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Menu,
  User,
  X,
} from "lucide-react";
import { Avatar, Dropdown, Separator } from "@heroui/react";
import { signOut } from "@/app/actions/auth";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "The Process", href: "/#process" },
  { label: "Campaigns", href: "/campaigns" },
  { label: "Why Village Boost", href: "/#why" },
  { label: "Contacts", href: "/#contacts" },
];

type HeaderUser = { id: string; fullName: string; email: string } | null;

function getInitials(fullName: string) {
  return fullName
    .trim()
    .split(/\s+/)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

// Dark theme colours that keep white initials readable.
const AVATAR_COLOURS = [
  "bg-ink",
  "bg-navy",
  "bg-body-gray",
  "bg-action",
  "bg-signal",
];

// Turns the user's id into a number, then picks a colour from it.
// The same id always gives the same colour.
function getAvatarColour(userId: string) {
  let hash = 0;
  for (const char of userId) {
    hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  }
  return AVATAR_COLOURS[hash % AVATAR_COLOURS.length];
}

export default function Header({ user }: { user: HeaderUser }) {
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

  const initials = user ? getInitials(user.fullName) : "";

  const avatarColor = user ? getAvatarColour(user.id) : "";

  return (
    <>
      <header
        className={`xl:inset-x-40 inset-x-2 rounded-full shadow-md/5 top-4 z-50 flex items-center justify-between border-b border-ink/8 bg-white py-3 xl:px-16 md:px-8 px-4 ${isSingleCampaignPage ? "" : "fixed"}`}>
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

        <div className="flex items-center gap-3 lg:gap-5">
          {user ? (
            <>
              <a
                href="/start-campaign"
                className="btn-primary hidden lg:inline-block">
                Start a campaign
              </a>
              <Dropdown>
                <Dropdown.Trigger
                  aria-label={`Account menu for ${user.fullName}`}
                  className="flex items-center gap-1 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ink/40">
                  <Avatar size="sm">
                    <Avatar.Fallback
                      className={`${avatarColor} font-semibold text-white`}>
                      {initials}
                    </Avatar.Fallback>
                  </Avatar>
                  <ChevronDown className="h-4 w-4 text-body-gray" />
                </Dropdown.Trigger>

                <Dropdown.Popover
                  placement="bottom end"
                  className="w-60 rounded-sm">
                  {/* Who's logged in? Long names and emails are cut off with "..." */}
                  <div className="min-w-0 border-b border-ink/10 px-3 py-2.5">
                    <span className="block truncate text-sm font-semibold text-ink">
                      {user.fullName}
                    </span>
                    <span
                      className="block truncate text-xs text-body-gray"
                      title={user.email}>
                      {user.email}
                    </span>
                  </div>

                  <Dropdown.Menu
                    aria-label="Account"
                    onAction={(key) => {
                      if (key === "logout") signOut();
                    }}>
                    <Dropdown.Item
                      id="dashboard"
                      href="/dashboard"
                      textValue="Dashboard">
                      <LayoutDashboard className="h-4 w-4" />
                      Dashboard
                    </Dropdown.Item>
                    <Dropdown.Item
                      id="profile"
                      href="/profile"
                      textValue="Profile">
                      <User className="h-4 w-4" />
                      Profile
                    </Dropdown.Item>
                    <Separator />
                    <Dropdown.Item id="logout" textValue="Log out">
                      <LogOut className="h-4 w-4" />
                      Log out
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown.Popover>
              </Dropdown>
            </>
          ) : (
            <>
              <a
                href="/login"
                className="hidden text-sm font-medium text-body-gray hover:text-ink transition-colors lg:inline">
                Login
              </a>
              <a
                href="/start-campaign"
                className="btn-primary hidden lg:inline-block">
                Start a campaign
              </a>
            </>
          )}

          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            className="text-ink lg:hidden"
            onClick={() => setIsMenuOpen((open) => !open)}>
            {isMenuOpen ? (
              <X className="h-8 w-8" />
            ) : (
              <Menu className="h-8 w-8" />
            )}
          </button>
        </div>

        <div
          className={`fixed inset-0 z-40 bg-black/60 transition-opacity lg:hidden ${
            isMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
          onClick={() => setIsMenuOpen(false)}
        />

        <nav
          className={`fixed inset-y-0 right-0 z-50 flex w-76 flex-col gap-6 bg-white px-4 py-4 shadow-lg transition-transform duration-300 lg:hidden ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setIsMenuOpen(false)}
            className="rounded-full p-1 text-body-gray hover:text-ink transition-colors">
            <X className="h-6 w-6" />
          </button>
          <div className="border-b border-ink/10 pb-6">
            {user ? (
              <a
                href="/start-campaign"
                className="btn-primary text-center text-sm"
                onClick={() => setIsMenuOpen(false)}>
                Start a campaign
              </a>
            ) : (
              <div className="flex flex-row gap-3">
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
            )}
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
    </>
  );
}
