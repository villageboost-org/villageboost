"use client";

import {
  FieldError,
  Input,
  Label,
  ListBox,
  Select,
  TextField,
} from "@heroui/react";
import type { WizardData } from "./SignUpWizard";
import { useState, useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

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
  const [touched, setTouched] = useState<{ platform: boolean; url: boolean }[]>(
    data.links.map(() => ({ platform: false, url: false })),
  );

  const urlRefs = useRef<(HTMLInputElement | null)[]>([]);

  const updateLink = (
    index: number,
    field: "platform" | "url",
    value: string,
  ) => {
    const updated = data.links.map((link, i) =>
      i === index ? { ...link, [field]: value } : link,
    );
    onUpdate({ links: updated });
    if (field === "platform")
      setTimeout(() => {
        setTouched((prev) =>
          prev.map((t, i) => (i === index ? { ...t, url: false } : t)),
        );
        urlRefs.current[index]?.focus();
      }, 0);
  };

  const addLink = () => {
    onUpdate({ links: [...data.links, { platform: "", url: "" }] });
    setTouched((prev) => [...prev, { platform: false, url: false }]);
  };

  const removeLink = (index: number) => {
    onUpdate({ links: data.links.filter((_, i) => i !== index) });
    setTouched((prev) => prev.filter((_, i) => i !== index));
  };

  const handleBlur = (index: number, field: "platform" | "url") => {
    setTouched((prev) =>
      prev.map((t, i) => (i === index ? { ...t, [field]: true } : t)),
    );
  };

  const linkErrors = data.links.map((link, i) => ({
    platform:
      touched[i]?.platform && !link.platform ? "Please select a platform" : "",
    url:
      touched[i]?.url && !link.url
        ? "Please enter a URL"
        : touched[i]?.url && !/^https?:\/\/.+/.test(link.url)
          ? "URL must start with http:// or https://"
          : "",
  }));

  const lastLink = data.links[data.links.length - 1];
  const canAddLink =
    !!lastLink?.platform &&
    !!lastLink?.url &&
    /^https?:\/\/.+/.test(lastLink.url);

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
          <div key={i} className="flex md:flex-nowrap flex-wrap items-start md:gap-10 gap-5">
            {/* Platform selector */}
            <Select
              fullWidth
              isRequired
              className="max-w-45"
              placeholder="Select platform"
              value={link.platform || null}
              onChange={(key) =>
                updateLink(i, "platform", key ? String(key) : "")
              }
              onBlur={() => handleBlur(i, "platform")}
              isInvalid={!!linkErrors[i]?.platform}>
              <Label>Platform</Label>
              <Select.Trigger>
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover>
                <ListBox>
                  {PLATFORMS.map((p) => (
                    <ListBox.Item key={p.value} id={p.value} textValue={p.label}>
                      {p.label}
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Select.Popover>
              <FieldError>{linkErrors[i]?.platform}</FieldError>
            </Select>

            {/* URL input */}
            <TextField
              fullWidth
              isRequired
              type="url"
              value={link.url}
              onChange={(value) => updateLink(i, "url", value)}
              onBlur={() => handleBlur(i, "url")}
              isInvalid={!!linkErrors[i]?.url}>
              <Label>Portfolio / Platform URL</Label>
              <Input
                placeholder="Enter your website or social media link"
                ref={(el) => {
                  urlRefs.current[i] = el;
                }}
              />
              <FieldError>{linkErrors[i]?.url}</FieldError>
            </TextField>

            {/* Remove button — only render when there is more than one row */}
            {data.links.length > 1 && (
              <button
                type="button"
                onClick={() => removeLink(i)}
                aria-label="Remove link"
                className="mt-8 shrink-0 text-grey/40 transition hover:text-rust-red">
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
          disabled={!canAddLink}
          className="self-start text-sm font-semibold text-maroon underline underline-offset-2 hover:text-maroon/80 disabled:cursor-not-allowed disabled:opacity-40">
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
          <ArrowLeft size={16} />
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
              <ArrowRight size={16} />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
