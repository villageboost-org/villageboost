const navLinks = [
  { label: "Home", href: "/" },
  { label: "The Process", href: "/#process" },
  { label: "FAQs", href: "/#faq" },
  { label: "Campaigns", href: "/campaigns" },
  { label: "Contacts", href: "/#contacts" },
];

export default function Header() {
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
