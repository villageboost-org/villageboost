"use client";

import { useState } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Link from "next/link";
import type { WizardData } from "./SignUpWizard";
import { EyeIcon } from "@/app/components/EyeIcon";


// ─── Props ────────────────────────────────────────────────────────────────────
type Props = {
  data: WizardData;
  onUpdate: (updates: Partial<WizardData>) => void;
  onNext: () => void;
};

// ─── Validation errors type ───────────────────────────────────────────────────
type Errors = {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

// ─── Validation function ──────────────────────────────────────────────────────
const validate = (data: WizardData): Errors => {
  const errors: Errors = {};
  if (!data.fullName || data.fullName.length < 2)
    errors.fullName = "Full name must be at least 2 characters";
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.email = "Enter a valid email address";
  if (!data.password || data.password.length < 8)
    errors.password = "Password must be at least 8 characters";
  if (!data.confirmPassword || data.confirmPassword !== data.password)
    errors.confirmPassword = "Passwords do not match";
  return errors;
};

export default function StepOne({ data, onUpdate, onNext }: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  const handleContinue = () => {
    const result = validate(data);
    setErrors(result);
    if (Object.keys(result).length === 0) onNext();
  };

  const eyeButton = (show: Boolean, toggle: () => void, ariaLabel: string) => {
    return (
      <InputAdornment position="end">
        <IconButton
          type="button"
          onClick={toggle}
          aria-label={ariaLabel}
          edge="end">
          <EyeIcon />
        </IconButton>
      </InputAdornment>
    );
  };

  return (
    <div className="flex flex-col md:gap-10 gap-5">
      <div>
        <h2 className="mb-2 text-grey">Create Your Creator Account</h2>
        <p className="text-grey/70">
          Join Village Boost to turn your creative ideas into community-funded
          projects.
        </p>
      </div>

      <div className="grid md:grid-cols-2 grid-cols-1 md:gap-10 gap-5">
        <TextField
          id="fullName"
          label="Full Name"
          variant="outlined"
          value={data.fullName}
          onChange={(e) => onUpdate({ fullName: e.target.value })}
          error={!!errors.fullName}
          helperText={errors.fullName}
        />

        <TextField
          id="email"
          label="Email Address"
          type="email"
          variant="outlined"
          fullWidth
          autoComplete="email"
          value={data.email}
          onChange={(e) => onUpdate({ email: e.target.value })}
          error={!!errors.email}
          helperText={errors.email}
        />

        <TextField
          id="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          variant="outlined"
          fullWidth
          autoComplete="new-password"
          placeholder="At least 8 characters"
          value={data.password}
          onChange={(e) => onUpdate({ password: e.target.value })}
          error={!!errors.password}
          helperText={errors.password}
          slotProps={{
            input: {
              endAdornment: eyeButton(
                showPassword,
                () => setShowPassword((v) => !v),
                showPassword ? "Hide password" : "Show password",
              ),
            },
          }}
        />

        <TextField
          id="confirmPassword"
          label="Confirm Your Password"
          type={showConfirm ? "text" : "password"}
          variant="outlined"
          fullWidth
          autoComplete="new-password"
          value={data.confirmPassword}
          onChange={(e) => onUpdate({ confirmPassword: e.target.value })}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword}
          slotProps={{
            input: {
              endAdornment: eyeButton(
                showConfirm,
                () => setShowConfirm((v) => !v),
                showConfirm ? "Hide password" : "Show password",
              ),
            },
          }}
        />
      </div>

      <button
        type="button"
        onClick={handleContinue}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-maroon py-3 text-base font-semibold text-white transition hover:bg-maroon/90 active:scale-[0.98]">
        Continue to Profile
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

      <p className="text-center text-sm text-grey/70">
        Already have an account?
        <Link
          href="/login"
          className="font-semibold text-maroon hover:underline">
          Log In
        </Link>
      </p>
    </div>
  );
}
