"use client";

import { useState } from "react";
import {
  Checkbox,
  FieldError,
  Label,
  TextArea,
  TextField,
} from "@heroui/react";
import type { WizardData } from "./SignUpWizard";
import { ArrowLeft } from "lucide-react";

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

// ─── Props ────────────────────────────────────────────────────────────────────
type Props = {
  data: WizardData;
  onUpdate: (updates: Partial<WizardData>) => void;
  onNext: () => void;
  onBack: () => void;
};

export default function StepTwo({ data, onUpdate, onNext, onBack }: Props) {
  const [errors, setErrors] = useState<{
    bio?: string;
    crafts?: string;
  }>({});

  const toggleCraft = (value: string) => {
    const updated = data.crafts.includes(value)
      ? data.crafts.filter((c) => c !== value)
      : [...data.crafts, value];
    onUpdate({ crafts: updated });
  };

  const handleContinue = () => {
    const newErrors: typeof errors = {};
    if (!data.bio.trim()) newErrors.bio = "Short bio is required";
    if (data.crafts.length === 0)
      newErrors.crafts = "Please select at least one craft";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
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

      {/* Short Bio */}
      <TextField
        fullWidth
        value={data.bio}
        onChange={(value) => onUpdate({ bio: value })}
        isInvalid={!!errors.bio}>
        <Label>Short Bio</Label>
        <TextArea
          rows={4}
          placeholder="Tell your story in a few sentences. What inspires your work?"
        />
        <FieldError>{errors.bio}</FieldError>
      </TextField>

      {/* Craft checkboxes */}
      <div>
        <p className="mb-3 text-sm font-semibold text-grey">
          Select Your Craft
        </p>
        <div className="grid grid-cols-3 gap-x-4 gap-y-3 sm:grid-cols-4">
          {CRAFTS.map((craft) => (
            <Checkbox
              key={craft.value}
              isSelected={data.crafts.includes(craft.value)}
              onChange={() => toggleCraft(craft.value)}
              isInvalid={!!errors.crafts}>
              <Checkbox.Content>
                <Checkbox.Control>
                  <Checkbox.Indicator />
                </Checkbox.Control>
                <Label>{craft.label}</Label>
              </Checkbox.Content>
            </Checkbox>
          ))}
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={onBack}
          className="flex flex-1 items-center justify-center gap-2 rounded-full border border-maroon py-3 text-base font-semibold text-maroon transition hover:bg-maroon/5 active:scale-[0.98]">
          <ArrowLeft size={16} />
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
