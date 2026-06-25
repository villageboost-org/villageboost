const navLinks = [
  { label: "Home", href: "/" },
  { label: "The Process", href: "/#process" },
  { label: "FAQs", href: "/#faq" },
  { label: "Campaigns", href: "/campaigns" },
  { label: "Contacts", href: "/#contacts" },
];

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b border-grey/20 bg-white px-6 py-2 md:px-16">
      <span className="text-2xl font-bold tracking-wide text-rust-red">
        VILLAGEBOOST
      </span>

      <nav className="hidden items-center gap-12 text-base font-medium text-rust-red md:flex">
        {navLinks.map((link) => (
          <a key={link.label} href={link.href} className="hover:text-maroon">
            {link.label}
          </a>
        ))}
      </nav>

      <div className="flex items-center gap-6">
        <a
          href="/sign-up"
          className="btn-primary"
        >
          Sign Up
        </a>
        <a
          href="/login"
          className="btn-secondary"
        >
          Login
        </a>
      </div>
    </header>
  );
}
