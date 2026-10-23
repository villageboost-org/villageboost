"use client";

import { useActionState, useState, useEffect, useRef } from "react";
import {
  resendConfirmation,
  signIn,
  type AuthActionState,
} from "@/app/actions/auth";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { FieldError, Input, InputGroup, Label, TextField } from "@heroui/react";
import { EyeIcon } from "@/app/components/EyeIcon";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";

type FieldErrors = { email?: string; password?: string };

const validate = (email: string, password: string): FieldErrors => {
  const errors: FieldErrors = {};
  if (!email.trim()) errors.email = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.email = "Enter a valid email address";
  if (!password) errors.password = "Password is required";
  return errors;
};

export default function LoginForm() {
  const [state, formAction, pending] = useActionState<
    AuthActionState,
    FormData
  >(signIn, undefined);

  const [showPassword, setShowPassword] = useState(false);

  const [clientErrors, setClientErrors] = useState<FieldErrors>({});

  const [email, setEmail] = useState("");

  const turnstileRef = useRef<TurnstileInstance | undefined>(undefined);

  // Resending the confirmation email for an unconfirmed account
  const [resending, setResending] = useState(false);
  const [resentTo, setResentTo] = useState(""); // the address we last resent to

  const router = useRouter();
  const searchParams = useSearchParams();

  // Client errors win; fallback to server errors after a submission
  const emailError = clientErrors.email ?? state?.errors?.email;
  const passwordError = clientErrors.password ?? state?.errors?.password;

  // Show a toast for redirect flags, then strip the query param
  // so a page refresh doesn't re-trigger it.
  useEffect(() => {
    if (searchParams.get("passwordReset") === "success") {
      toast.success("Password changed successfully. Please log in.");
    } else if (searchParams.get("error") === "invalid_link") {
      toast.error(
        "That link is invalid or has expired. Please request a new one.",
      );
    } else {
      return;
    }
    router.replace("/login");
  }, [searchParams, router]);

  // A Turnstile token can only be used once, so get a fresh one after each attempt
  useEffect(() => {
    if (state) turnstileRef.current?.reset();
  }, [state]);

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    const errors = validate(
      String(formData.get("email") ?? "").trim(),
      String(formData.get("password") ?? ""),
    );
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

  async function handleResend() {
    setResending(true);
    const result = await resendConfirmation(
      email.trim(),
      turnstileRef.current?.getResponse(),
    );
    setResending(false);
    turnstileRef.current?.reset(); // each token works once

    if (result.success) {
      toast.success(result.message);
      setResentTo(email.trim());
    } else {
      toast.error(
        result.message ?? "Couldn't resend the email. Please try again.",
      );
    }
  }

  return (
    <form
      action={formAction}
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-5">
      {/* Email field */}
      <TextField
        fullWidth
        name="email"
        type="email"
        autoComplete="email"
        value={email}
        isInvalid={!!emailError}
        onChange={(value) => {
          setEmail(value);
          if (clientErrors.email)
            setClientErrors((p) => ({ ...p, email: undefined }));
        }}>
        <Label>Email Address</Label>
        <Input />
        <FieldError>{emailError}</FieldError>
      </TextField>

      {/* Password field */}
      <TextField
        fullWidth
        name="password"
        type={showPassword ? "text" : "password"}
        autoComplete="current-password"
        isInvalid={!!passwordError}
        onChange={() =>
          clientErrors.password &&
          setClientErrors((p) => ({ ...p, password: undefined }))
        }>
        <Label>Password</Label>
        <InputGroup fullWidth>
          <InputGroup.Input />
          <InputGroup.Suffix>
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="flex items-center text-grey/60 hover:text-grey">
              <EyeIcon />
            </button>
          </InputGroup.Suffix>
        </InputGroup>
        <FieldError>{passwordError}</FieldError>
      </TextField>

      {/* Forgot password */}
      <div className="text-right -mt-4">
        <Link
          href="/forgot-password"
          className="text-sm font-medium text-maroon hover:underline">
          Forgot Password?
        </Link>
      </div>

      <Turnstile
        ref={turnstileRef}
        siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
        options={{ size: "flexible", theme: "light", appearance: "interaction-only" }}
      />
      {/* Submit */}
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-maroon py-3 text-base font-semibold text-white transition hover:bg-maroon/90 active:scale-[0.98]">
        {pending ? "Logging in..." : "Log In"}
      </button>

      {/* Unconfirmed account: offer a fresh confirmation email */}
      {state?.unconfirmed && (
        <p className="rounded-lg bg-maroon/5 px-4 py-3 text-center text-sm text-grey/80">
          {resentTo === email.trim() ? (
            <>
              We&apos;ve sent a new confirmation link to{" "}
              <span className="font-semibold text-grey">{resentTo}</span>.
              Check your inbox and spam folder.
            </>
          ) : (
            <>
              Didn&apos;t get the confirmation email?{" "}
              <button
                type="button"
                onClick={handleResend}
                disabled={resending}
                className="font-semibold text-maroon underline underline-offset-2 disabled:opacity-50">
                {resending ? "Sending..." : "Resend it"}
              </button>
            </>
          )}
        </p>
      )}

      {/* Sign up link */}
      <p className="text-center text-sm text-grey/70">
        Don&apos;t have an account?
        <Link
          href="/sign-up"
          className="font-semibold ml-1 text-maroon hover:underline">
          Register Now
        </Link>
      </p>
    </form>
  );
}
