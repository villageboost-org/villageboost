"use client";

import { useState } from "react";
import {
  FieldError,
  Input,
  InputGroup,
  Label,
  ListBox,
  Select,
  TextField,
} from "@heroui/react";
import Link from "next/link";
import type { WizardData } from "./SignUpWizard";
import { EyeIcon } from "@/app/components/EyeIcon";
import { ArrowRight } from "lucide-react";
import { validatePhone } from "@/lib/validation/phone";
import { validateNewPassword } from "@/lib/validation/password";

const GENDERS = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
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
  const passwordError = validateNewPassword(data.password);
  if (passwordError) errors.password = passwordError;
  if (!data.confirmPassword || data.confirmPassword !== data.password)
    errors.confirmPassword = "Passwords do not match";
  const phoneError = validatePhone(data.phone);
  if (phoneError) errors.phone = phoneError;
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
      <button
        type="button"
        onClick={toggle}
        aria-label={ariaLabel}
        className="flex items-center text-grey/60 hover:text-grey">
        <EyeIcon />
      </button>
    );
  };

  return (
    <div className="flex flex-col md:gap-8 gap-4">
      <div>
        <h2 className="mb-2 text-grey">Create Your Creator Account</h2>
        <p className="text-grey/70">
          Join Village Boost to turn your creative ideas into community-funded
          projects.
        </p>
      </div>

      <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
        <TextField
          fullWidth
          autoComplete="name"
          value={data.fullName}
          onChange={(value) => onUpdate({ fullName: value })}
          isInvalid={!!errors.fullName}>
          <Label>Full Name</Label>
          <Input />
          <FieldError>{errors.fullName}</FieldError>
        </TextField>

        <TextField
          fullWidth
          type="email"
          autoComplete="email"
          value={data.email}
          onChange={(value) => onUpdate({ email: value })}
          isInvalid={!!errors.email}>
          <Label>Email Address</Label>
          <Input />
          <FieldError>{errors.email}</FieldError>
        </TextField>

        <TextField
          fullWidth
          type={showPassword ? "text" : "password"}
          autoComplete="new-password"
          value={data.password}
          onChange={(value) => onUpdate({ password: value })}
          isInvalid={!!errors.password}>
          <Label>Password</Label>
          <InputGroup fullWidth>
            <InputGroup.Input placeholder="8+ characters, with a number and a symbol" />
            <InputGroup.Suffix>
              {eyeButton(
                showPassword,
                () => setShowPassword((v) => !v),
                showPassword ? "Hide password" : "Show password",
              )}
            </InputGroup.Suffix>
          </InputGroup>
          <FieldError>{errors.password}</FieldError>
        </TextField>

        <TextField
          fullWidth
          type={showConfirm ? "text" : "password"}
          autoComplete="new-password"
          value={data.confirmPassword}
          onChange={(value) => onUpdate({ confirmPassword: value })}
          isInvalid={!!errors.confirmPassword}>
          <Label>Confirm Your Password</Label>
          <InputGroup fullWidth>
            <InputGroup.Input />
            <InputGroup.Suffix>
              {eyeButton(
                showConfirm,
                () => setShowConfirm((v) => !v),
                showConfirm ? "Hide password" : "Show password",
              )}
            </InputGroup.Suffix>
          </InputGroup>
          <FieldError>{errors.confirmPassword}</FieldError>
        </TextField>

        <TextField
          fullWidth
          type="tel"
          autoComplete="tel"
          value={data.phone}
          onChange={(value) => onUpdate({ phone: value })}
          isInvalid={!!errors.phone}>
          <Label>Phone Number</Label>
          <Input placeholder="0712 345 678" />
          <FieldError>{errors.phone}</FieldError>
        </TextField>

        <Select
          fullWidth
          placeholder="Select gender"
          value={data.gender || null}
          onChange={(key) => onUpdate({ gender: key ? String(key) : "" })}
          isInvalid={!!errors.gender}>
          <Label>Gender</Label>
          <Select.Trigger>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              {GENDERS.map((g) => (
                <ListBox.Item key={g.value} id={g.value} textValue={g.label}>
                  {g.label}
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
          <FieldError>{errors.gender}</FieldError>
        </Select>
      </div>

      <button
        type="button"
        onClick={handleContinue}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-maroon py-3 text-base font-semibold text-white transition hover:bg-maroon/90 active:scale-[0.98]">
        Continue to Profile
        <ArrowRight size={16} />
      </button>

      <p className="text-center text-sm text-grey/70">
        Already have an account?
        <Link
          href="/login"
          className="font-semibold ml-1 text-maroon hover:underline">
          Log In
        </Link>
      </p>
    </div>
  );
}
