import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { ADMIN_COOKIE_NAME, DEFAULT_SESSION_MAX_AGE, verifyAdminSessionToken } from "@/lib/auth"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Allow admin login page and assets
  if (pathname === "/admin/login" || pathname.startsWith("/_next") || pathname.startsWith("/public")) {
    return NextResponse.next()
  }

  const needsAuth =
    pathname.startsWith("/admin") ||
    (pathname.startsWith("/api/admin") && pathname !== "/api/admin/login" && pathname !== "/api/admin/logout")

  if (needsAuth) {
    const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value || ""
    const secret = process.env.ADMIN_SESSION_SECRET || ""
    const isValid = secret ? await verifyAdminSessionToken(secret, token, DEFAULT_SESSION_MAX_AGE) : false

    if (!isValid) {
      if (pathname.startsWith("/api/admin")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
      }
      const url = request.nextUrl.clone()
      url.pathname = "/admin/login"
      url.searchParams.set("next", pathname)
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
}


