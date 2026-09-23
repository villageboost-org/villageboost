"use client";

import { useActionState, useEffect, useState } from "react";
import { updatePassword, type AuthActionState } from "@/app/actions/auth";
import { toast } from "sonner";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { EyeIcon } from "@/app/components/EyeIcon";

type FieldErrors = { password?: string; confirmPassword?: string };

const validate = (password: string, confirmPassword: string): FieldErrors => {
  const errors: FieldErrors = {};
  if (!password) errors.password = "Password is required";
  else if (password.length < 8)
    errors.password = "Password must be at least 8 characters";
  if (!confirmPassword) errors.confirmPassword = "Please confirm your password";
  else if (confirmPassword !== password)
    errors.confirmPassword = "Passwords do not match";
  return errors;
};

export default function ResetPasswordForm() {
  const [state, formAction, pending] = useActionState<
    AuthActionState,
    FormData
  >(updatePassword, undefined);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [clientErrors, setClientErrors] = useState<FieldErrors>({});

  const passwordError = clientErrors.password ?? state?.errors?.password;
  const confirmError =
    clientErrors.confirmPassword ?? state?.errors?.confirmPassword;

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    const errors = validate(
      String(formData.get("password") ?? ""),
      String(formData.get("confirmPassword") ?? ""),
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
    toast.error(state.message);
  }, [state]);

  const eyeButton = (show: boolean, toggle: () => void, ariaLabel: string) => (
    <InputAdornment position="end">
      <IconButton type="button" onClick={toggle} aria-label={ariaLabel} edge="end">
        <EyeIcon />
      </IconButton>
    </InputAdornment>
  );

  return (
    <form
      action={formAction}
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-5">
      {/* New password */}
      <TextField
        id="password"
        name="password"
        type={showPassword ? "text" : "password"}
        label="New Password"
        variant="outlined"
        autoComplete="new-password"
        placeholder="At least 8 characters"
        fullWidth
        error={!!passwordError}
        helperText={passwordError}
        onChange={() =>
          clientErrors.password &&
          setClientErrors((p) => ({ ...p, password: undefined }))
        }
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

      {/* Confirm password */}
      <TextField
        id="confirmPassword"
        name="confirmPassword"
        type={showConfirm ? "text" : "password"}
        label="Confirm New Password"
        variant="outlined"
        autoComplete="new-password"
        fullWidth
        error={!!confirmError}
        helperText={confirmError}
        onChange={() =>
          clientErrors.confirmPassword &&
          setClientErrors((p) => ({ ...p, confirmPassword: undefined }))
        }
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

      {/* Submit */}
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-maroon py-3 text-base font-semibold text-white transition hover:bg-maroon/90 active:scale-[0.98]">
        {pending ? "Resetting..." : "Reset Password"}
      </button>
    </form>
  );
}
