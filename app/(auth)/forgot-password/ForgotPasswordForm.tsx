"use client";

import {
  useActionState,
  useEffect,
  useRef,
  useState,
  startTransition,
} from "react";
import { requestPasswordReset, type AuthActionState } from "@/app/actions/auth";
import Link from "next/link";
import { toast } from "sonner";
import { FieldError, Input, Label, TextField } from "@heroui/react";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";

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
  const turnstileRef = useRef<TurnstileInstance | undefined>(undefined);

  const emailError = clientErrors.email ?? state?.errors?.email;

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault(); // we send the form ourselves below
    const formData = new FormData(e.currentTarget);
    const errors = validate(String(formData.get("email") ?? "").trim());
    if (Object.keys(errors).length > 0) {
      setClientErrors(errors);
      return;
    }
    setClientErrors({});
    startTransition(() => formAction(formData));
  };

  useEffect(() => {
    if (!state?.message) return;
    if (state.success) {
      toast.success(state.message);
    } else {
      toast.error(state.message);
    }
  }, [state]);

  // A Turnstile token can only be used once, so get a fresh one after each attempt
  useEffect(() => {
    if (state) turnstileRef.current?.reset();
  }, [state]);

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      {/* Email field */}
      <TextField
        fullWidth
        name="email"
        type="email"
        autoComplete="email"
        isInvalid={!!emailError}
        onChange={() =>
          clientErrors.email &&
          setClientErrors((p) => ({ ...p, email: undefined }))
        }>
        <Label>Email Address</Label>
        <Input />
        <FieldError>{emailError}</FieldError>
      </TextField>

      {/* Bot check: adds a hidden cf-turnstile-response field to the form */}
      <Turnstile
        ref={turnstileRef}
        siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
        options={{
          size: "flexible",
          theme: "light",
          appearance: "interaction-only",
        }}
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
