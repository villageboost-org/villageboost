import { proxy } from './proxy'
import type { NextRequest } from 'next/server'

// Next.js calls this function automatically on every request that
// matches the `config.matcher` pattern below.
// We just delegate all the logic to proxy.ts so it stays in one place.
export function middleware(request: NextRequest) {
  return proxy(request)
}

// Tell Next.js which paths to run the middleware on.
// This regex means: every path EXCEPT static files and images.
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
