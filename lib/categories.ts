// The 10 fixed Village Boost categories.
// Values MUST match the CHECK constraints in 03_create_user_categories.sql
// and 05_create_campaigns.sql.
export const CATEGORIES = [
  { value: "film", label: "Film" },
  { value: "music", label: "Music" },
  { value: "illustration", label: "Illustration" },
  { value: "design", label: "Design" },
  { value: "photography", label: "Photography" },
  { value: "writing", label: "Writing" },
  { value: "theatre", label: "Theatre" },
  { value: "dance", label: "Dance" },
  { value: "fashion", label: "Fashion" },
  { value: "crafts", label: "Crafts" },
] as const;
