import { createClient } from "@supabase/supabase-js";

// This client uses the service role key — it bypasses Row Level Security.
// ONLY import this file from server-side code (Server Actions, Route Handlers, Server Components).
// NEVER expose SUPABASE_SERVICE_ROLE_KEY to the browser (no NEXT_PUBLIC_ prefix).
export function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is not set.",
    );
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      // Disable auto-refresh and session persistence — this client is server-only.
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
