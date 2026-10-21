import { parsePhoneNumberFromString } from "libphonenumber-js/mobile";
// Numbers without a +country code are read as Kenyan.
const DEFAULT_COUNTRY = "KE";

// Returns the number in international format (+254712345678), or null if it isn't valid.
export function normalisePhone(raw: string): string | null {
  const parsed = parsePhoneNumberFromString(raw, DEFAULT_COUNTRY);
  return parsed?.isValid() ? parsed.number : null;
}

// Returns an error message, or null if the number is fine.
export function validatePhone(raw: string): string | null {
  if (!raw.trim()) return "Phone number is required";
  if (!normalisePhone(raw))
    return "Enter a valid phone number, e.g. 0712 345 678";
  return null;
}
