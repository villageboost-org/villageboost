"use server";

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
  };
  message?: string;
  success?: boolean;
};

// useActionState requires the initial state to be undefined, so the
// full type is the object OR undefined. We keep AuthActionData separate
// so TypeScript can safely index into its properties (e.g. AuthActionData['errors']).
export type AuthActionState = AuthActionData | undefined;

// Helpers

function validateEmail(email: string): string | undefined {
  if (!email) return "Email is required.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return "Enter a valid email address.";
}

function validatePassword(password: string): string | undefined {
  if (!password) return "Password is required.";
  if (password.length < 8) return "Password must be at least 8 characters.";
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
  const phone = (formData.get("phone") as string)?.trim() || null;
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

  // Validate fields before hitting Supabase
  const errors: AuthActionData["errors"] = {};
  if (!fullName || fullName.length < 2)
    errors.fullName = "Full name must be at least 2 characters.";
  const emailError = validateEmail(email);
  if (emailError) errors.email = emailError;
  const passwordError = validatePassword(password);
  if (passwordError) errors.password = passwordError;
  if (!passwordError && password !== confirmPassword)
    errors.confirmPassword = "Passwords do not match.";

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
    },
  });

  if (error) {
    // Map Supabase error codes to friendly messages
    if (
      error.code === "user_already_exists" ||
      error.message?.includes("already registered")
    ) {
      return {
        errors: { email: "An account with this email already exists." },
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

  // Update the profile row the trigger created
  if (phone || gender || bio) {
    const { error: profileError } = await admin
      .from("users")
      .update({ phone, gender, bio })
      .eq("id", userId);
    if (profileError) console.error("[signUp] Profile update error:", profileError);
  }

  // Insert craft categories
  if (crafts.length > 0) {
    const { error: craftsError } = await admin
      .from("user_categories")
      .insert(crafts.map((category) => ({ user_id: userId, category })));
    if (craftsError) console.error("[signUp] Crafts insert error:", craftsError);
  }

  // Insert portfolio links (skip any rows where both fields aren't filled)
  const validLinks = links.filter((l) => l.platform && l.url);
  if (validLinks.length > 0) {
    const { error: linksError } = await admin
      .from("user_portfolio_links")
      .insert(
        validLinks.map((l, i) => ({
          user_id: userId,
          platform: l.platform,
          url: l.url,
          sort_order: i,
        })),
      );
    if (linksError) console.error("[signUp] Links insert error:", linksError);
  }

  // If email confirmation is ON in Supabase, the user isn't logged in yet —
  // we show a "check your inbox" message instead of redirecting.
  return {
    success: true,
    message:
      "Account created! Please check your email to confirm your account.",
  };
}

// Sign In
export async function signIn(
  _prevState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const email = (formData.get("email") as string)?.trim();
  const password = formData.get("password") as string;

  const errors: AuthActionData["errors"] = {};
  const emailError = validateEmail(email);
  if (emailError) errors.email = emailError;
  const passwordError = validatePassword(password);
  if (passwordError) errors.password = passwordError;

  if (Object.keys(errors).length > 0) return { errors };

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    if (
      error.code === "invalid_credentials" ||
      error.message?.includes("Invalid login")
    ) {
      return { message: "Incorrect email or password." };
    }
    if (error.message?.includes("Email not confirmed")) {
      return { message: "Please confirm your email before logging in." };
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

  const emailError = validateEmail(email);
  if (emailError) return { errors: { email: emailError } };

  const supabase = await createClient();

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/auth/callback?next=/reset-password`,
  });

  if (error) {
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

  if (!password || password.length < 8) {
    return { errors: { password: "Password must be at least 8 characters." } };
  }
  if (password !== confirm) {
    return { errors: { password: "Passwords do not match." } };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    return {
      message: "Failed to update password. Your reset link may have expired.",
    };
  }

  redirect("/dashboard");
}
