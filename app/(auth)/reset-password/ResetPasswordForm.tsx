"use client";

import { useActionState, useEffect, useState, startTransition } from "react";
import { updatePassword, type AuthActionState } from "@/app/actions/auth";
import { toast } from "sonner";
import { FieldError, InputGroup, Label, TextField } from "@heroui/react";
import { EyeIcon } from "@/app/components/EyeIcon";
import { validateNewPassword } from "@/lib/validation/password";

type FieldErrors = { password?: string; confirmPassword?: string };

const validate = (password: string, confirmPassword: string): FieldErrors => {
  const errors: FieldErrors = {};
  const passwordError = validateNewPassword(password);
  if (passwordError) errors.password = passwordError;
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
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const errors = validate(
      String(formData.get("password") ?? ""),
      String(formData.get("confirmPassword") ?? ""),
    );
    if (Object.keys(errors).length > 0) {
      setClientErrors(errors);
      return;
    }
    setClientErrors({});
    startTransition(() => formAction(formData));
  };

  useEffect(() => {
    if (!state?.message) return;
    toast.error(state.message);
  }, [state]);

  const eyeButton = (show: boolean, toggle: () => void, ariaLabel: string) => (
    <button
      type="button"
      onClick={toggle}
      aria-label={ariaLabel}
      className="flex items-center text-grey/60 hover:text-grey">
      <EyeIcon />
    </button>
  );

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      {/* New password */}
      <TextField
        fullWidth
        name="password"
        type={showPassword ? "text" : "password"}
        autoComplete="new-password"
        isInvalid={!!passwordError}
        onChange={() =>
          clientErrors.password &&
          setClientErrors((p) => ({ ...p, password: undefined }))
        }>
        <Label>New Password</Label>
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
        <FieldError>{passwordError}</FieldError>
      </TextField>

      {/* Confirm password */}
      <TextField
        fullWidth
        name="confirmPassword"
        type={showConfirm ? "text" : "password"}
        autoComplete="new-password"
        isInvalid={!!confirmError}
        onChange={() =>
          clientErrors.confirmPassword &&
          setClientErrors((p) => ({ ...p, confirmPassword: undefined }))
        }>
        <Label>Confirm New Password</Label>
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
        <FieldError>{confirmError}</FieldError>
      </TextField>

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
