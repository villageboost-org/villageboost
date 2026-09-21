"use client";

import { useActionState, useState, useEffect } from "react";
import { signIn, type AuthActionState } from "@/app/actions/auth";
import Link from "next/link";
import { toast } from "sonner";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { EyeIcon } from "@/app/components/EyeIcon";

type FieldErrors = { email?: string; password?: string };

const validate = (email: string, password: string): FieldErrors => {
  const errors: FieldErrors = {};
  if (!email.trim()) errors.email = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.email = "Enter a valid email address";
  if (!password) errors.password = "Password is required";
  else if (password.length < 8)
    errors.password = "Password must be at least 8 characters long";
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

  // Client errors win; fallback to server errors after a submission
  const emailError = clientErrors.email ?? state?.errors?.email;
  const passwordError = clientErrors.password ?? state?.errors?.password;

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
        value={email}
        error={!!emailError}
        helperText={emailError}
        onChange={(e) => {
          setEmail(e.target.value);
          if (clientErrors.email)
            setClientErrors((p) => ({ ...p, email: undefined }));
        }}
      />

      {/* Password field */}
      <TextField
        id="password"
        name="password"
        type={showPassword ? "text" : "password"}
        label="Password"
        variant="outlined"
        autoComplete="current-password"
        fullWidth
        error={!!passwordError}
        helperText={passwordError}
        onChange={() =>
          clientErrors.password &&
          setClientErrors((p) => ({ ...p, password: undefined }))
        }
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  edge="end">
                  <EyeIcon />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />

      {/* Forgot password */}
      <div className="text-right -mt-4">
        <Link
          href="/forgot-password"
          className="text-sm font-medium text-maroon hover:underline">
          Forgot Password?
        </Link>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-maroon py-3 text-base font-semibold text-white transition hover:bg-maroon/90 active:scale-[0.98]">
        {pending ? "Logging in..." : "Log In"}
      </button>

      {/* Sign up link */}
      <p className="text-center text-sm text-grey/70">
        Don&apos;t have an account?{" "}
        <Link
          href="/sign-up"
          className="font-semibold text-maroon hover:underline">
          Register Now
        </Link>
      </p>
    </form>
  );
}
