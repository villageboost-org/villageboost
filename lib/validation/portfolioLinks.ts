// Shared rules for portfolio links, used by the sign-up form and the server action.

// Platforms not listed here (personal_website, other) accept any valid URL.
const PLATFORM_DOMAINS: Record<string, string[]> = {
  instagram: ["instagram.com"],
  tiktok: ["tiktok.com"],
  youtube: ["youtube.com", "youtu.be"],
  spotify: ["spotify.com"],
  behance: ["behance.net"],
  twitter: ["x.com"],
};

const PLATFORM_LABELS: Record<string, string> = {
  instagram: "Instagram",
  tiktok: "Tiktok",
  youtube: "Youtube",
  spotify: "Spotify",
  behance: "Behance",
  twitter: "Twitter/X",
};

// A real domain: dot-separated labels (letters, digits, hyphens; no leading or
// trailing hyphen) ending in a letters-only TLD of 2+ characters, e.g. ".com", ".co.ke".
const HOSTNAME =
  /^(?=.{1,253}$)(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+(?:[a-z]{2,63}|xn--[a-z0-9-]{1,59})$/i;

// Adds https:// when the user leaves it off, e.g. "instagram.com/me".
export function normaliseUrl(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed) return "";
  return /^[a-z][a-z\d+.-]*:\/\//i.test(trimmed)
    ? trimmed
    : `https://${trimmed}`;
}

// Returns an error message, or null if the link is fine.
export function validatePortfolioLink(
  platform: string,
  rawUrl: string,
): string | null {
  const url = normaliseUrl(rawUrl);
  if (!url) return "Please enter a URL";
  if (url.length > 2048) return "That URL is too long";

  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return "Enter a valid link, e.g. https://example.com";
  }

  if (parsed.protocol !== "http:" && parsed.protocol !== "https:")
    return "Link must start with http:// or https://";
  if (parsed.username || parsed.password)
    return "Enter a valid link, e.g. https://example.com";
  if (!HOSTNAME.test(parsed.hostname))
    return "Enter a valid link, e.g. https://example.com";

  const domains = PLATFORM_DOMAINS[platform];
  if (domains) {
    const host = parsed.hostname.toLowerCase();
    const matches = domains.some((d) => host === d || host.endsWith(`.${d}`));
    if (!matches)
      return `That doesn't look like a ${PLATFORM_LABELS[platform]} link`;
  }

  return null;
}
