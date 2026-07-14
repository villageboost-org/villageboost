import Image from "next/image";

function MailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className="h-6 w-6">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className="h-6 w-6">
      <path d="M6 4h3l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 4 6a2 2 0 0 1 2-2Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      className="h-6.5 w-6.5">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  );
}

function TiktokIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      className="h-9 w-9 mr-1">
      <path d="M16 4v9.5a3.5 3.5 0 1 1-3.5-3.5" />
      <path d="M16 4c.3 2 1.8 3.5 4 3.8" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer
      className="rounded-t-[2.5rem] bg-neutral-800 py-16 text-white xl:px-16 md:px-8 px-4 xl:mx-16 md:mx-8 mx-4"
      id="contacts">
      <div className="flex flex-wrap items-baseline gap-x-16 gap-y-1">
        <Image
          src="/white-villageboost-logo.svg"
          alt="Village Boost logo"
          width={150}
          height={50}
          className="h-auto w-auto"
        />
        <p className="text-white text-lg!">It takes a village</p>
      </div>

      <div className="mt-8 border-t border-white/10" />

      <div className="mt-10 grid gap-10 md:grid-cols-3 grid-cols-1">
        <div>
          <h5 className="font-bold! text-white/60">Contacts</h5>
          <ul className="mt-3 space-y-3 text-white">
            <li className="flex items-center gap-2 text-base">
              <MailIcon /> villageboost254@gmail.com
            </li>
            <li className="flex items-center gap-2 text-base">
              <PhoneIcon /> +254712345678
            </li>
          </ul>
        </div>

        <div>
          <h5 className="font-bold! text-white/60">Follow Us</h5>
          <div className="mt-3 flex gap-4">
            <a
              href="https://instagram.com"
              aria-label="Instagram"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-white">
              <InstagramIcon />
            </a>
            <a
              href="https://tiktok.com"
              aria-label="TikTok"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-white">
              <TiktokIcon />
            </a>
          </div>
        </div>

        <div>
          <h5 className="font-bold! text-white/60">Legal</h5>
          <ul className="mt-3 space-y-2 text-base text-white">
            <li>
              <a href="/privacy-policy">Privacy & Policy</a>
            </li>
            <li>
              <a href="/terms">Terms & Conditions</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-16 flex items-center gap-2 text-sm text-white/60">
        <span aria-hidden className="text-base">
          ©
        </span>
        {new Date().getFullYear()} Village Boost
      </div>
    </footer>
  );
}
