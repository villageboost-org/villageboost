"use client";

import { useState } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Link from "next/link";
import type { WizardData } from "./SignUpWizard";
import { EyeIcon } from "@/app/components/EyeIcon";

const GENDERS = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];

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
  phone?: string;
  gender?: string;
};

// ─── Validation function ──────────────────────────────────────────────────────
const validate = (data: WizardData): Errors => {
  const errors: Errors = {};
  if (
    !data.fullName ||
    data.fullName.trim().split(/\s+/).filter(Boolean).length < 2
  )
    errors.fullName = "Full name must include at least a first and last name";
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.email = "Enter a valid email address";
  if (!data.password || data.password.length < 8)
    errors.password = "Password must be at least 8 characters";
  if (!data.confirmPassword || data.confirmPassword !== data.password)
    errors.confirmPassword = "Passwords do not match";
  if (!data.phone.trim()) errors.phone = "Phone number is required";
  if (!data.gender) errors.gender = "Please select a gender";
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

  const eyeButton = (show: boolean, toggle: () => void, ariaLabel: string) => {
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

        <TextField
          id="phone"
          label="Phone Number"
          type="tel"
          variant="outlined"
          fullWidth
          autoComplete="tel"
          value={data.phone}
          onChange={(e) => onUpdate({ phone: e.target.value })}
          error={!!errors.phone}
          helperText={errors.phone}
        />

        <TextField
          id="gender"
          label="Gender"
          variant="outlined"
          select
          fullWidth
          value={data.gender}
          onChange={(e) => onUpdate({ gender: e.target.value })}
          error={!!errors.gender}
          helperText={errors.gender}>
          {GENDERS.map((g) => (
            <MenuItem key={g.value} value={g.value}>
              {g.label}
            </MenuItem>
          ))}
        </TextField>
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
