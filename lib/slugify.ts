// Turns a campaign title into a URL-friendly slug.
// "Hatukufi Bado: The Film!" → "hatukufi-bado-the-film"
export function slugify(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "") // strip accents
    .replace(/[^a-z0-9]+/g, "-") // anything else becomes a dash
    .replace(/^-+|-+$/g, ""); // no leading/trailing dashes
}
