import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    return supabaseResponse
  }

  try {
    const supabase = createServerClient(
      supabaseUrl,
      supabaseAnonKey,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value)
            )
            supabaseResponse = NextResponse.next({ request })
            cookiesToSet.forEach(({ name, value, options }) =>
              supabaseResponse.cookies.set(name, value, options)
            )
          },
        },
      }
    )

    // Refreshes the session if expired — required for Server Components.
    const {
      data: { user },
    } = await supabase.auth.getUser()

    const protectedRoutes = ['/dashboard']
    const isProtectedRoute = protectedRoutes.some((route) =>
      request.nextUrl.pathname.startsWith(route)
    )

    if (isProtectedRoute && !user) {
      const url = request.nextUrl.clone()
      url.pathname = '/login'
      return NextResponse.redirect(url)
    }

    // Logged-in users have no reason to see the login or sign-up pages.
    // Don't add /reset-password here: the reset link logs the user in
    // temporarily, and they need that page to set their new password.
    const guestOnlyRoutes = ['/login', '/sign-up']
    const isGuestOnlyRoute = guestOnlyRoutes.some((route) =>
      request.nextUrl.pathname.startsWith(route)
    )

    if (isGuestOnlyRoute && user) {
      const url = request.nextUrl.clone()
      // TODO: change to '/dashboard' once that page exists
      url.pathname = '/'
      url.search = ''
      return NextResponse.redirect(url)
    }
  } catch (error) {
    console.error('Error in proxy authentication handler:', error)
  }

  return supabaseResponse
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}