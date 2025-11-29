import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const ADMIN_COOKIE = "admin_session"
const SESSION_MAX_AGE = 60 * 60 * 8 // 8 hours

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}))
    const { username, password } = body || {}

    if (!username || !password) {
      return NextResponse.json({ error: "Kullanıcı adı ve şifre gereklidir" }, { status: 400 })
    }

    // 1) ENV fallback
    const envUser = process.env.ADMIN_USERNAME
    const envPass = process.env.ADMIN_PASSWORD
    if (envUser && envPass && username === envUser && password === envPass) {
      const res = NextResponse.json({ success: true })
      res.cookies.set(ADMIN_COOKIE, "1", {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: SESSION_MAX_AGE,
      })
      return res
    }

    // 2) DB lookup (optional)
    try {
      const dbUrl = process.env.DATABASE_URL
      if (dbUrl) {
        const sql = neon(dbUrl)
        const users = await sql`
          SELECT id, username, password_hash 
          FROM admin_users 
          WHERE username = ${username}
          LIMIT 1
        `
        const user = users[0] as any
        if (user?.password_hash) {
          // try bcrypt compare if available
          let isValid = false
          try {
            const bcrypt = await import("bcryptjs")
            isValid = await bcrypt.compare(password, user.password_hash)
          } catch {
            // bcrypt not available; treat as invalid
            isValid = false
          }
          if (isValid) {
            const res = NextResponse.json({ success: true })
            res.cookies.set(ADMIN_COOKIE, "1", {
              httpOnly: true,
              sameSite: "lax",
              secure: process.env.NODE_ENV === "production",
              path: "/",
              maxAge: SESSION_MAX_AGE,
            })
            return res
          }
        }
      }
    } catch {
      // ignore db errors and fall through to invalid
    }

    return NextResponse.json({ error: "Geçersiz kullanıcı adı veya şifre" }, { status: 401 })
  } catch (error) {
    console.error("Admin login error:", error)
    return NextResponse.json({ error: "Beklenmeyen bir hata oluştu" }, { status: 500 })
  }
}


