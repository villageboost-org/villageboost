"use client";

import { useActionState, useEffect, useState } from "react";
import { requestPasswordReset, type AuthActionState } from "@/app/actions/auth";
import Link from "next/link";
import { toast } from "sonner";
import TextField from "@mui/material/TextField";

type FieldErrors = { email?: string };

const validate = (email: string): FieldErrors => {
  const errors: FieldErrors = {};
  if (!email.trim()) errors.email = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.email = "Enter a valid email address";
  return errors;
};

export default function ForgotPasswordForm() {
  const [state, formAction, pending] = useActionState<
    AuthActionState,
    FormData
  >(requestPasswordReset, undefined);

  const [clientErrors, setClientErrors] = useState<FieldErrors>({});

  const emailError = clientErrors.email ?? state?.errors?.email;

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    const errors = validate(String(formData.get("email") ?? "").trim());
    if (Object.keys(errors).length > 0) {
      e.preventDefault(); // stops the server action from running
      setClientErrors(errors);
      return;
    }
    setClientErrors({});
  };

  useEffect(() => {
    if (!state?.message) return;
    if (state.success) {
      toast.success(state.message);
    } else {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <form
      action={formAction}
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-5">
      {/* Email field */}
      <TextField
        id="email"
        name="email"
        type="email"
        label="Email Address"
        variant="outlined"
        autoComplete="email"
        fullWidth
        error={!!emailError}
        helperText={emailError}
        onChange={() =>
          clientErrors.email &&
          setClientErrors((p) => ({ ...p, email: undefined }))
        }
      />

      {/* Submit */}
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-maroon py-3 text-base font-semibold text-white transition hover:bg-maroon/90 active:scale-[0.98]">
        {pending ? "Sending..." : "Send Email"}
      </button>

      {/* Back to login */}
      <p className="text-center text-sm text-grey/70">
        Remember password?
        <Link
          href="/login"
          className="font-semibold ml-1 text-maroon hover:underline">
          Login
        </Link>
      </p>
    </form>
  );
}
