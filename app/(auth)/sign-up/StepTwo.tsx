"use client";

import { useState } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import type { WizardData } from "./SignUpWizard";

// ─── Craft options ─────────────────────────────────────────────────────────────
// Values MUST match the CHECK constraint in 03_create_user_categories.sql
const CRAFTS = [
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
];

const GENDERS = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];

// ─── Props ────────────────────────────────────────────────────────────────────
type Props = {
  data: WizardData;
  onUpdate: (updates: Partial<WizardData>) => void;
  onNext: () => void;
  onBack: () => void;
};

export default function StepTwo({ data, onUpdate, onNext, onBack }: Props) {
  const [errors, setErrors] = useState<{ crafts?: string }>({});

  const toggleCraft = (value: string) => {
    const updated = data.crafts.includes(value)
      ? data.crafts.filter((c) => c !== value)
      : [...data.crafts, value];
    onUpdate({ crafts: updated });
  };

  const handleContinue = () => {
    if (data.crafts.length === 0) {
      setErrors({ crafts: "Please select at least one craft" });
      return;
    }
    setErrors({});
    onNext();
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Heading */}
      <div>
        <h2 className="mb-2 text-grey">Tell us about your creative work</h2>
        <p className="text-grey/70">
          Help supporters and your village get to know who you are.
        </p>
      </div>

      <div className="grid md:grid-cols-2 grid-cols-1 md:gap-10 gap-5">
        {/* Phone + Gender row */}
        <div className="flex gap-4">
          <TextField
            id="phone"
            label="Phone Number"
            type="tel"
            variant="outlined"
            fullWidth
            autoComplete="tel"
            value={data.phone}
            onChange={(e) => onUpdate({ phone: e.target.value })}
            helperText=" "
          />
          <TextField
            id="gender"
            label="Gender"
            variant="outlined"
            select
            fullWidth
            value={data.gender}
            onChange={(e) => onUpdate({ gender: e.target.value })}
            helperText=" ">
            {GENDERS.map((g) => (
              <MenuItem key={g.value} value={g.value}>
                {g.label}
              </MenuItem>
            ))}
          </TextField>
        </div>

        {/* Short Bio */}
        <TextField
          id="bio"
          label="Short Bio"
          variant="outlined"
          fullWidth
          multiline
          minRows={4}
          placeholder="Tell your story in a few sentences. What inspires your work?"
          value={data.bio}
          onChange={(e) => onUpdate({ bio: e.target.value })}
          helperText=" "
        />

        {/* Craft checkboxes */}
        <div>
          <p className="mb-3 text-sm font-semibold text-grey">
            Select Your Craft
          </p>
          <div className="grid grid-cols-3 gap-x-2 gap-y-1 sm:grid-cols-4">
            {CRAFTS.map((craft) => (
              <FormControlLabel
                key={craft.value}
                label={craft.label}
                control={
                  <Checkbox
                    checked={data.crafts.includes(craft.value)}
                    onChange={() => toggleCraft(craft.value)}
                    size="small"
                  />
                }
                sx={{
                  "& .MuiFormControlLabel-label": { fontSize: "0.875rem" },
                }}
              />
            ))}
          </div>

          {errors.crafts && (
            <p className="mt-1 text-sm text-rust-red">{errors.crafts}</p>
          )}
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={onBack}
          className="flex flex-1 items-center justify-center gap-2 rounded-full border border-maroon py-3 text-base font-semibold text-maroon transition hover:bg-maroon/5 active:scale-[0.98]">
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
          onClick={handleContinue}
          className="flex flex-2 items-center justify-center gap-2 rounded-full bg-maroon py-3 text-base font-semibold text-white transition hover:bg-maroon/90 active:scale-[0.98]">
          Continue to Links
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
        </button>
      </div>
    </div>
  );
}
