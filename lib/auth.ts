// Lightweight HMAC-signed admin session token utilities compatible with middleware (Edge) and API routes.
// Uses Web Crypto API (crypto.subtle) available in modern runtimes.

type AdminSessionPayload = {
  iat: number
  rnd: string
}

function base64UrlEncode(input: ArrayBuffer | Uint8Array | string): string {
  let bytes: Uint8Array
  if (typeof input === "string") {
    bytes = new TextEncoder().encode(input)
  } else if (input instanceof Uint8Array) {
    bytes = input
  } else {
    bytes = new Uint8Array(input)
  }
  let str = ""
  for (let i = 0; i < bytes.length; i++) str += String.fromCharCode(bytes[i])
  return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "")
}

async function importHmacKey(secret: string): Promise<CryptoKey> {
  const enc = new TextEncoder().encode(secret)
  return crypto.subtle.importKey("raw", enc, { name: "HMAC", hash: "SHA-256" }, false, ["sign", "verify"])
}

async function hmacSign(secret: string, message: string): Promise<string> {
  const key = await importHmacKey(secret)
  const data = new TextEncoder().encode(message)
  const sig = await crypto.subtle.sign("HMAC", key, data)
  return base64UrlEncode(sig)
}

export async function createAdminSessionToken(secret: string): Promise<string> {
  const payload: AdminSessionPayload = {
    iat: Math.floor(Date.now() / 1000),
    rnd: Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2),
  }
  const payloadStr = JSON.stringify(payload)
  const payloadB64 = base64UrlEncode(payloadStr)
  const sig = await hmacSign(secret, payloadB64)
  return `${payloadB64}.${sig}`
}

export async function verifyAdminSessionToken(secret: string, token: string, maxAgeSeconds: number): Promise<boolean> {
  if (!token || typeof token !== "string") return false
  const [payloadB64, sig] = token.split(".")
  if (!payloadB64 || !sig) return false
  try {
    // Verify signature
    const expectedSig = await hmacSign(secret, payloadB64)
    if (expectedSig !== sig) return false
    // Parse payload and check expiry
    const json = atob(payloadB64.replace(/-/g, "+").replace(/_/g, "/"))
    const payload = JSON.parse(json) as AdminSessionPayload
    if (!payload?.iat || typeof payload.iat !== "number") return false
    const now = Math.floor(Date.now() / 1000)
    if (now - payload.iat > maxAgeSeconds) return false
    return true
  } catch {
    return false
  }
}

export const ADMIN_COOKIE_NAME = "admin_session"
export const DEFAULT_SESSION_MAX_AGE = 60 * 60 * 8 // 8 hours


