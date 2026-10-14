import Link from "next/link";

const platformLinks = [
  { label: "Browse campaigns", href: "/campaigns" },
  { label: "Start a campaign", href: "/start-campaign" },
  { label: "Our fees", href: "/#faq" },
];

const governanceLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms & Conditions", href: "#" },
];

const supportLinks = [
  { label: "jambo@villageboost.com", href: "mailto:info@villageboost.com" },
  { label: "+254 700 000 000", href: "tel:+254700000000" },
];

export default function Footer() {
  return (
    <footer className="py-16 xl:px-16 md:px-8 px-6 bg-[#f9f2e9]" id="contacts">
      {/* Top row */}
      <div className=" grid grid-cols-[2fr_1fr_1fr_1fr] gap-6 items-start">
        <div className="relative">
          <span className="absolute rotate-4 top-2 left-0 rounded-full bg-[#FFDAD3] px-3 py-1 text-xs font-bold text-[#3E0500] tracking-wide">
            COMMUNITY COLLECTIVE
          </span>
          <h3 className="mt-12 max-w-md leading-tight">
            It takes a village to spark a creative revolution.
          </h3>
          <p className="mt-3 text-sm max-w-md text-body-gray">
            East Africa&apos;s crowdfunding platform for independent creators.
            Community funded, community powered.
          </p>
        </div>

        {/* Navigation columns */}
        <div>
          <h5 className="text-xs font-bold uppercase tracking-[.15em] mb-4">
            Platform
          </h5>
          <ul className="space-y-2.5">
            {platformLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="text-sm transition-colors ">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h5 className="text-xs font-bold uppercase tracking-[.15em] mb-4">
            Governance
          </h5>
          <ul className="space-y-2.5">
            {governanceLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="text-sm transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h5 className="text-xs font-bold uppercase tracking-[.15em] mb-4">
            CONTACT US
          </h5>
          <ul className="space-y-2.5">
            {supportLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-sm transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          {/* Social links */}
          <div className="mt-3 flex flex-col gap-3">
            <a
              href="https://instagram.com"
              aria-label="Instagram"
              className="text-sm font-bold transition-colors">
              INSTAGRAM
            </a>
            <a
              href="https://tiktok.com"
              aria-label="TikTok"
              className="text-sm font-bold transition-colors">
              TIKTOK
            </a>
          </div>
        </div>
      </div>

      <div
        className="mt-10 border-t"
        style={{ borderColor: "rgba(255,255,255,0.08)" }}
      />

      {/* Bottom bar */}
      <div
        className="mt-12 pt-6 border-t border-body-gray/20 text-xs">
        <span>
          © {new Date().getFullYear()} Village Boost. Made by Africans, for
          Africans.
        </span>
      </div>
    </footer>
  );
}
