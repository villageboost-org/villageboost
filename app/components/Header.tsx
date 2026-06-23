const navLinks = [
  { label: "Home", href: "/" },
  { label: "The Process", href: "/#process" },
  { label: "FAQs", href: "/#faq" },
  { label: "Campaigns", href: "/campaigns" },
  { label: "Contacts", href: "/#contacts" },
];

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 md:px-12">
      <span className="text-lg font-bold tracking-wide text-rust-red">
        VILLAGEBOOST
      </span>

      <nav className="hidden items-center gap-8 text-sm font-medium text-dark-grey md:flex">
        {navLinks.map((link) => (
          <a key={link.label} href={link.href} className="hover:text-rust-red">
            {link.label}
          </a>
        ))}
      </nav>

      <div className="flex items-center gap-3">
        <a
          href="/sign-up"
          className="rounded-full bg-maroon px-5 py-2 text-sm font-medium text-white"
        >
          Sign Up
        </a>
        <a
          href="/login"
          className="rounded-full border border-dark-grey/20 px-5 py-2 text-sm font-medium text-dark-grey"
        >
          Login
        </a>
      </div>
    </header>
  );
}
