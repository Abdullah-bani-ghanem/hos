import { NextResponse } from 'next/server'
import { verifyToken } from './lib/auth'
import cookie from 'cookie'

export function middleware(req) {
  const token = cookie.parse(req.headers.get('cookie') || '').token
  const url = req.nextUrl.pathname

  if (url.startsWith('/admin-dashboard')) {
    const user = verifyToken(token)
    if (!user || user.role !== 'admin') {
      return NextResponse.redirect(new URL('/login', req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin-dashboard/:path*']
}
