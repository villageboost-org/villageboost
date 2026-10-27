"use server";
import {
  normaliseUrl,
  validatePortfolioLink,
} from "@/lib/validation/portfolioLinks";
import { normalisePhone, validatePhone } from "@/lib/validation/phone";
import { validateNewPassword } from "@/lib/validation/password";

// Server Actions run only on the server — your Supabase calls are
// never exposed to the browser. They're called directly from forms
// via React's useActionState hook (no manual fetch() needed).

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { redirect } from "next/navigation";

// Types

// The object shape returned by each action.
export type AuthActionData = {
  errors?: {
    fullName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    phone?: string;
  };
  message?: string;
  success?: boolean;
  // Set by signIn when the account exists but the email hasn't been confirmed yet
  unconfirmed?: boolean;
};

// useActionState requires the initial state to be undefined, so the
// full type is the object OR undefined. We keep AuthActionData separate
// so TypeScript can safely index into its properties (e.g. AuthActionData['errors']).
export type AuthActionState = AuthActionData | undefined;

// Helpers

// Shown when Supabase rejects the Cloudflare Turnstile token (missing, expired or reused).
const CAPTCHA_FAILED_MESSAGE =
  "Security check failed. Please wait a moment and try again.";

function validateEmail(email: string): string | undefined {
  if (!email) return "Email is required.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return "Enter a valid email address.";
}

// Sign Up

export async function signUp(
  _prevState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const fullName = (formData.get("fullName") as string)?.trim();
  const email = (formData.get("email") as string)?.trim();
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;
  // Profile fields (optional)
  const rawPhone = (formData.get("phone") as string) ?? "";
  const phone = normalisePhone(rawPhone);
  const gender = (formData.get("gender") as string)?.trim() || null;
  const bio = (formData.get("bio") as string)?.trim() || null;
  // Crafts: JSON array of category strings e.g. ["film", "music"]
  const craftsRaw = formData.get("crafts") as string;
  const crafts: string[] = craftsRaw ? JSON.parse(craftsRaw) : [];
  // Links: JSON array of { platform, url } objects
  const linksRaw = formData.get("links") as string;
  const links: { platform: string; url: string }[] = linksRaw
    ? JSON.parse(linksRaw)
    : [];
  const captchaToken =
    (formData.get("cf-turnstile-response") as string) || undefined;

  // Validate fields before hitting Supabase
  const errors: AuthActionData["errors"] = {};
  if (!fullName || fullName.length < 2)
    errors.fullName = "Full name must be at least 2 characters.";
  const emailError = validateEmail(email);
  if (emailError) errors.email = emailError;
  const passwordError = validateNewPassword(password) ?? undefined;
  if (passwordError) errors.password = passwordError;
  if (!passwordError && password !== confirmPassword)
    errors.confirmPassword = "Passwords do not match.";

  // Portfolio links: re-check on the server, since the form's checks can be bypassed
  const validLinks = links.filter((l) => l.platform && l.url);
  if (validLinks.length === 0)
    return { message: "Please add at least one portfolio link." };
  for (const link of validLinks) {
    const linkError = validatePortfolioLink(link.platform, link.url);
    if (linkError) return { message: `Portfolio link: ${linkError}` };
  }

  const phoneError = validatePhone(rawPhone);
  if (phoneError) errors.phone = phoneError;

  if (Object.keys(errors).length > 0) return { errors };

  const supabase = await createClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      // This is how Supabase passes extra data to the handle_new_user trigger.
      // The trigger reads new.raw_user_meta_data->>'full_name' to populate public.users.
      data: { full_name: fullName },
      // After email confirmation, redirect the user to /dashboard.
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/auth/callback`,
      captchaToken,
    },
  });

  if (error) {
    // Map Supabase error codes to friendly messages
    if (error.code === "captcha_failed") {
      return { message: CAPTCHA_FAILED_MESSAGE };
    }
    if (
      error.code === "user_already_exists" ||
      error.message?.includes("already registered")
    ) {
      return {
        errors: { email: "An account with this email already exists." },
      };
    }
    console.error(
      "[signUp] Supabase auth error:",
      error.code,
      error.status,
      error.message,
    );
    if (error.code === "over_email_send_rate_limit") {
      return {
        message: "Too many sign-up emails were sent. Please try again later.",
      };
    }
    return { message: "Something went wrong. Please try again." };
  }

  const userId = data.user?.id;
  if (!userId) {
    return { message: "Something went wrong. Please try again." };
  }

  // Write additional profile data using the admin client.
  // The handle_new_user trigger already created the public.users row with id + full_name,
  // but we need to add phone, gender, bio, crafts and portfolio links.
  // We use the admin (service role) client because the user has no session yet
  // when email confirmation is enabled.
  const admin = createAdminClient();

  // Each write below stops at the first failure and records it here.
  let saveError: { step: string; error: unknown } | null = null;

  // Update the profile row the trigger created
  if (phone || gender || bio) {
    const { error } = await admin
      .from("users")
      .update({ phone, gender, bio })
      .eq("id", userId);
    if (error) saveError = { step: "profile", error };
  }

  // Insert craft categories
  if (!saveError && crafts.length > 0) {
    const { error } = await admin
      .from("user_categories")
      .insert(crafts.map((category) => ({ user_id: userId, category })));
    if (error) saveError = { step: "crafts", error };
  }

  // Insert portfolio links (skip any rows where both fields aren't filled)
  if (!saveError && validLinks.length > 0) {
    const { error } = await admin.from("user_portfolio_links").insert(
      validLinks.map((l, i) => ({
        user_id: userId,
        platform: l.platform,
        url: normaliseUrl(l.url),
        sort_order: i,
      })),
    );
    if (error) saveError = { step: "links", error };
  }

  // Roll back a half-saved sign-up so the user can simply try again.
  // Deleting the auth user cascades to public.users, user_categories and
  // user_portfolio_links (see migrations 01, 03 and 04).
  if (saveError) {
    console.error(
      `[signUp] ${saveError.step} save failed, rolling back:`,
      saveError.error,
    );
    const { error: deleteError } = await admin.auth.admin.deleteUser(userId);
    if (deleteError)
      console.error(
        "[signUp] Rollback failed, user needs manual cleanup:",
        userId,
        deleteError,
      );
    return {
      message: "We couldn't finish creating your account. Please try again.",
    };
  }

  // If email confirmation is ON in Supabase, the user isn't logged in yet —
  // we show a "check your inbox" message instead of redirecting.
  return {
    success: true,
    message:
      "Account created! Please check your email to confirm your account.",
  };
}

// Resend the sign-up confirmation email
export async function resendConfirmation(
  email: string,
  captchaToken?: string,
): Promise<AuthActionData> {
  const emailError = validateEmail(email);
  if (emailError) return { message: emailError };

  const supabase = await createClient();
  const { error } = await supabase.auth.resend({
    type: "signup",
    email,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/auth/callback`,
      captchaToken,
    },
  });

  if (error) {
    console.error(
      "[resendConfirmation]",
      error.code,
      error.status,
      error.message,
    );
    if (error.code === "captcha_failed")
      return { message: CAPTCHA_FAILED_MESSAGE };
    if (error.code === "over_email_send_rate_limit")
      return {
        message: "Please wait a minute before requesting another email.",
      };
    return { message: "Couldn't resend the email. Please try again." };
  }

  return {
    success: true,
    message: "Confirmation email sent again. Check your inbox.",
  };
}

// Sign In
export async function signIn(
  _prevState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const email = (formData.get("email") as string)?.trim();
  const password = formData.get("password") as string;
  const captchaToken =
    (formData.get("cf-turnstile-response") as string) || undefined;
  const errors: AuthActionData["errors"] = {};
  const emailError = validateEmail(email);
  if (emailError) errors.email = emailError;

  if (!password) errors.password = "Password is required.";

  if (Object.keys(errors).length > 0) return { errors };

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
    options: { captchaToken },
  });

  if (error) {
    if (error.code === "captcha_failed") {
      return { message: CAPTCHA_FAILED_MESSAGE };
    }
    if (
      error.code === "invalid_credentials" ||
      error.message?.includes("Invalid login")
    ) {
      return { message: "Incorrect email or password." };
    }
    if (
      error.code === "email_not_confirmed" ||
      error.message?.includes("Email not confirmed")
    ) {
      return {
        message: "Please confirm your email before logging in.",
        unconfirmed: true,
      };
    }
    return { message: "Something went wrong. Please try again." };
  }

  // redirect() throws a special error internally — it must be called outside
  // of try/catch blocks. Next.js handles it as a navigation, not an error.
  redirect("/dashboard");
}

// ─── Sign Out ─────────────────────────────────────────────────────────────────

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}

// ─── Request Password Reset ───────────────────────────────────────────────────

export async function requestPasswordReset(
  _prevState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const email = (formData.get("email") as string)?.trim();
  const captchaToken =
    (formData.get("cf-turnstile-response") as string) || undefined;

  const emailError = validateEmail(email);
  if (emailError) return { errors: { email: emailError } };

  const supabase = await createClient();

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/auth/callback?next=/reset-password`,
    captchaToken,
  });

  if (error) {
    if (error.code === "captcha_failed")
      return { message: CAPTCHA_FAILED_MESSAGE };
    return { message: "Something went wrong. Please try again." };
  }

  // We always return success here — never reveal whether an email exists.
  return {
    success: true,
    message: "If an account exists for that email, a reset link has been sent.",
  };
}

// ─── Update Password (after reset link) ───────────────────────────────────────

export async function updatePassword(
  _prevState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const password = formData.get("password") as string;
  const confirm = formData.get("confirmPassword") as string;

  const passwordError = validateNewPassword(password);
  if (passwordError) return { errors: { password: passwordError } };

  if (password !== confirm) {
    return { errors: { confirmPassword: "Passwords do not match." } };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    console.error(
      "[updatePassword] Supabase auth error:",
      error.code,
      error.status,
      error.message,
    );
    if (error.code === "same_password") {
      return {
        errors: {
          password: "Your new password must be different from your old one.",
        },
      };
    }
    if (error.code === "weak_password") {
      return {
        errors: {
          password:
            "That password doesn't meet the security requirements. Please choose a stronger one.",
        },
      };
    }
    return {
      message: "Failed to update password. Your reset link may have expired.",
    };
  }

  // Sign out the recovery session so the user logs back in with the new password.
  await supabase.auth.signOut();

  redirect("/login?passwordReset=success");
}
