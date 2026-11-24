import { CATEGORIES } from "@/lib/categories";
import { slugify } from "@/lib/slugify";

export const TITLE_MIN = 5;
export const TITLE_MAX = 80;
export const COVER_MAX_BYTES = 5 * 1024 * 1024; // 5 MB
export const COVER_TYPES = ["image/png", "image/jpeg", "image/webp"];

export type BasicsErrors = {
  title?: string;
  category?: string;
  coverImage?: string;
};

export function validateTitle(title: string): string | undefined {
  const trimmed = title.trim();
  if (!trimmed) return "Give your campaign a title";
  if (trimmed.length < TITLE_MIN)
    return `Title must be at least ${TITLE_MIN} characters`;
  if (trimmed.length > TITLE_MAX)
    return `Title must be ${TITLE_MAX} characters or fewer`;
  // The title becomes the campaign's link, so it needs some letters or numbers
  if (!slugify(trimmed)) return "Title must include letters or numbers";
}

export function validateCategory(category: string): string | undefined {
  if (!category) return "Choose a category";
  if (!CATEGORIES.some((c) => c.value === category))
    return "Choose a category from the list";
}

export function validateCoverImage(file: File | null): string | undefined {
  if (!file) return "Upload a cover image";
  if (!COVER_TYPES.includes(file.type))
    return "Cover image must be a PNG, JPG or WebP";
  if (file.size > COVER_MAX_BYTES) return "Cover image must be 5 MB or smaller";
}

// Runs every Basics check. An empty object means the step is valid.
export function validateBasics(data: {
  title: string;
  category: string;
  coverImage: File | null;
}): BasicsErrors {
  const errors: BasicsErrors = {};
  const title = validateTitle(data.title);
  const category = validateCategory(data.category);
  const coverImage = validateCoverImage(data.coverImage);
  if (title) errors.title = title;
  if (category) errors.category = category;
  if (coverImage) errors.coverImage = coverImage;
  return errors;
}
