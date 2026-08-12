"use client";

import { useActionState, useState, useEffect } from "react";
import { signIn, type AuthActionState } from "@/app/actions/auth";
import Link from "next/link";
import { toast } from "sonner";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { EyeIcon } from "@/app/components/EyeIcon";

export default function LoginForm() {
  const [state, formAction, pending] = useActionState<
    AuthActionState,
    FormData
  >(signIn, undefined);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (!state?.message) return;
    if (state.success) {
      toast.success(state.message);
    } else {
      toast.error(state.message);
    }
  }, [state]);

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
        helperText={state?.errors?.email}
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
        helperText={state?.errors?.password}
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
