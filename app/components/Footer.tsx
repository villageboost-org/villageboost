function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-4 w-4">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-4 w-4">
      <path d="M6 4h3l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 4 6a2 2 0 0 1 2-2Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-4 w-4">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  );
}

function TiktokIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-4 w-4">
      <path d="M16 4v9.5a3.5 3.5 0 1 1-3.5-3.5" />
      <path d="M16 4c.3 2 1.8 3.5 4 3.8" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-dark-grey px-6 py-12 text-light-mustard md:px-12">
      <div className="grid gap-10 md:grid-cols-3">
        <div>
          <span className="text-lg font-bold tracking-wide text-white">
            VILLAGEBOOST
          </span>
          <p className="mt-2 text-sm text-grey">It takes a village</p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">Contacts</h3>
          <ul className="mt-3 space-y-2 text-sm text-grey">
            <li className="flex items-center gap-2">
              <MailIcon /> villageboost254@gmail.com
            </li>
            <li className="flex items-center gap-2">
              <PhoneIcon /> +254712345678
            </li>
            <li className="flex items-center gap-2">
              <PhoneIcon /> +25470000000
            </li>
          </ul>
          <div className="mt-4 flex gap-3">
            <a
              href="https://instagram.com"
              aria-label="Instagram"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-grey"
            >
              <InstagramIcon />
            </a>
            <a
              href="https://tiktok.com"
              aria-label="TikTok"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-grey"
            >
              <TiktokIcon />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">Legal</h3>
          <ul className="mt-3 space-y-2 text-sm text-grey">
            <li>
              <a href="/privacy-policy">Privacy & Policy</a>
            </li>
            <li>
              <a href="/terms">Terms & Conditions</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-10 border-t border-grey/30 pt-6 text-xs text-grey">
        © 2026 Village Boost
      </div>
    </footer>
  );
}
