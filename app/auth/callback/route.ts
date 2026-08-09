import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This route is called when a user clicks a Supabase email link
// (e.g. email confirmation, password reset).
// Supabase appends ?code=... to the URL. We exchange that code
// for a real session, then redirect the user to the right page.
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)

  const code = searchParams.get('code')
  // `next` lets us redirect the user to a specific page after auth.
  // Default to /dashboard if not provided.
  const next = searchParams.get('next') ?? '/dashboard'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  // If the code is missing or exchange failed, send to an error page.
  return NextResponse.redirect(`${origin}/login?error=invalid_link`)
}
