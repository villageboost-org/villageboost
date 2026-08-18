"use client";

import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import type { WizardData } from "./SignUpWizard";

// ─── Platform options ─────────────────────────────────────────────────────────
// Values MUST match the CHECK constraint in 04_create_user_portfolio_links.sql
const PLATFORMS = [
  { value: "instagram", label: "Instagram" },
  { value: "tiktok", label: "TikTok" },
  { value: "youtube", label: "YouTube" },
  { value: "spotify", label: "Spotify" },
  { value: "behance", label: "Behance" },
  { value: "twitter", label: "Twitter / X" },
  { value: "personal_website", label: "Personal Website" },
  { value: "other", label: "Other" },
];

// ─── Props ────────────────────────────────────────────────────────────────────
type Props = {
  data: WizardData;
  onUpdate: (updates: Partial<WizardData>) => void;
  onBack: () => void;
  onSubmit: () => void;
  submitting: boolean;
};

export default function StepThree({
  data,
  onUpdate,
  onBack,
  onSubmit,
  submitting,
}: Props) {
  const updateLink = (
    index: number,
    field: "platform" | "url",
    value: string,
  ) => {
    const updated = data.links.map((link, i) =>
      i === index ? { ...link, [field]: value } : link,
    );
    onUpdate({ links: updated });
  };

  const addLink = () => {
    onUpdate({ links: [...data.links, { platform: "", url: "" }] });
  };

  const removeLink = (index: number) => {
    onUpdate({ links: data.links.filter((_, i) => i !== index) });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Heading */}
      <div>
        <h2 className="mb-2 text-grey">Showcase your work</h2>
        <p className="text-grey/70">
          Link your portfolio and social channels so supporters can explore your
          past projects.
        </p>
      </div>

      {/* Dynamic link rows */}
      <div className="flex flex-col gap-4">
        {data.links.map((link, i) => (
          <div key={i} className="flex items-start gap-3">
            {/* Platform selector */}
            <TextField
              label="Platform"
              variant="outlined"
              select
              fullWidth
              value={link.platform}
              onChange={(e) => updateLink(i, "platform", e.target.value)}
              helperText=" "
              sx={{ maxWidth: 180 }}>
              {PLATFORMS.map((p) => (
                <MenuItem key={p.value} value={p.value}>
                  {p.label}
                </MenuItem>
              ))}
            </TextField>

            {/* URL input */}
            <TextField
              label="Portfolio / Platform URL"
              variant="outlined"
              fullWidth
              type="url"
              placeholder="Enter your website or social media link"
              value={link.url}
              onChange={(e) => updateLink(i, "url", e.target.value)}
              helperText=" "
            />

            {/* Remove button — only render when there is more than one row */}
            {data.links.length > 1 && (
              <button
                type="button"
                onClick={() => removeLink(i)}
                aria-label="Remove link"
                className="mt-3 shrink-0 text-grey/40 transition hover:text-rust-red">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
        ))}

        {/* Add another link */}
        <button
          type="button"
          onClick={addLink}
          className="self-start text-sm font-semibold text-maroon underline underline-offset-2 hover:text-maroon/80">
          + Add another link
        </button>
      </div>

      {/* Navigation buttons */}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={onBack}
          disabled={submitting}
          className="flex flex-1 items-center justify-center gap-2 rounded-full border border-maroon py-3 text-base font-semibold text-maroon transition hover:bg-maroon/5 active:scale-[0.98] disabled:opacity-50">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7 16l-4-4m0 0l4-4m-4 4h18"
            />
          </svg>
          Back
        </button>
        <button
          type="button"
          onClick={onSubmit}
          disabled={submitting}
          className="flex flex-2 items-center justify-center gap-2 rounded-full bg-maroon py-3 text-base font-semibold text-white transition hover:bg-maroon/90 active:scale-[0.98] disabled:opacity-60">
          {submitting ? (
            <>
              Creating account...
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </>
          ) : (
            <>
              Complete Registration
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
