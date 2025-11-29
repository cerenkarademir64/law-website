import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

const ADMIN_COOKIE = "admin_session"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Allow admin login page and assets
  if (pathname === "/admin/login" || pathname.startsWith("/_next") || pathname.startsWith("/public")) {
    return NextResponse.next()
  }

  // Protect admin pages
  if (pathname.startsWith("/admin")) {
    const token = request.cookies.get(ADMIN_COOKIE)?.value
    if (!token) {
      const url = request.nextUrl.clone()
      url.pathname = "/admin/login"
      url.searchParams.set("next", pathname)
      return NextResponse.redirect(url)
    }
  }

  // Protect admin APIs
  if (pathname.startsWith("/api/admin") && pathname !== "/api/admin/login" && pathname !== "/api/admin/logout") {
    const token = request.cookies.get(ADMIN_COOKIE)?.value
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
}


