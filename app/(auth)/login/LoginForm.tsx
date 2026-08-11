"use client";

import { useActionState, useState } from "react";
import { signIn, type AuthActionState } from "@/app/actions/auth";
import Link from "next/link";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

export default function LoginForm() {
  const [state, formAction, pending] = useActionState<AuthActionState, FormData>(
    signIn,
    undefined,
  );
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form action={formAction} className="flex flex-col gap-5">
      {/* Email field */}
      <TextField
        id="email"
        name="email"
        type="email"
        label="Email Address"
        variant="outlined"
        autoComplete="email"
        required
        fullWidth
        error={!!state?.errors?.email}
        helperText={state?.errors?.email ?? " "}
      />

      {/* Password field */}
      <TextField
        id="password"
        name="password"
        type={showPassword ? "text" : "password"}
        label="Password"
        variant="outlined"
        autoComplete="current-password"
        required
        fullWidth
        error={!!state?.errors?.password}
        helperText={state?.errors?.password ?? " "}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  edge="end">
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
                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.964-7.178z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />

      {/* Forgot password */}
      <div className="text-right">
        <Link
          href="/forgot-password"
          className="text-sm font-medium text-maroon hover:underline">
          Forgot Password?
        </Link>
      </div>

      {/* Global error */}
      {state?.message && !state.success && (
        <p className="mb-4 rounded-md bg-red-50 px-4 py-2 text-center text-sm text-rust-red">
          {state.message}
        </p>
      )}

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
