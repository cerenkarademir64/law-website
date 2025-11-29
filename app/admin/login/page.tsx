"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function AdminLoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data?.error || "Giriş başarısız")
      }
      router.push("/admin/dashboard")
      router.refresh()
    } catch (err: any) {
      setError(err?.message || "Giriş başarısız")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-[60vh] flex items-center">
      <div className="container mx-auto px-4 lg:px-8 max-w-md">
        <div className="mb-8">
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
            ← Siteye dön
          </Link>
        </div>
        <h1 className="text-3xl font-serif font-light mb-6">Avukat Girişi</h1>
        <form onSubmit={handleSubmit} className="space-y-5 bg-background border border-border rounded-lg p-6 shadow-sm">
          <div className="space-y-2">
            <Label htmlFor="username">Kullanıcı adı</Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="kullanici_adi"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Şifre</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              required
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div className="flex justify-end">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Giriş yapılıyor..." : "Giriş yap"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}


