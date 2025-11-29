"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

export function ArticleEditor() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [category, setCategory] = useState("")
  const [published, setPublished] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      title: formData.get("title"),
      slug: formData.get("slug"),
      excerpt: formData.get("excerpt"),
      content: formData.get("content"),
      category,
      author: formData.get("author"),
      read_time: Number(formData.get("read_time")),
      published,
    }

    try {
      const response = await fetch("/api/admin/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        let description = "Failed to create article. Please check the fields."
        try {
          const err = await response.json()
          if (Array.isArray(err?.details) && err.details.length > 0) {
            description = err.details.join(" • ")
          } else if (typeof err?.error === "string") {
            description = err.error
          }
        } catch {}
        throw new Error(description)
      }

      toast({
        title: "Makale oluşturuldu!",
        description: published ? "Makaleniz yayımlandı." : "Makaleniz taslak olarak kaydedildi.",
      })

      if (typeof window !== "undefined") {
        alert("Makale eklendi")
      }

      router.push("/admin/articles")
    } catch (error) {
      toast({
        title: "Hata",
        description: error instanceof Error ? error.message : "Makale oluşturulamadı. Lütfen tekrar deneyin.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Başlık *</Label>
        <Input id="title" name="title" required placeholder="Makale başlığı" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="slug">URL Kısaltması (Slug) *</Label>
        <Input id="slug" name="slug" required placeholder="ornek-makale-url" />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="category">Kategori *</Label>
          <Select value={category} onValueChange={setCategory} required>
            <SelectTrigger>
              <SelectValue placeholder="Kategori seçiniz" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Şirketler Hukuku">Şirketler Hukuku</SelectItem>
              <SelectItem value="Dava Takibi">Dava Takibi</SelectItem>
              <SelectItem value="İş Hukuku">İş Hukuku</SelectItem>
              <SelectItem value="Gayrimenkul">Gayrimenkul</SelectItem>
              <SelectItem value="Fikri Mülkiyet">Fikri Mülkiyet</SelectItem>
              <SelectItem value="Miras">Miras</SelectItem>
              <SelectItem value="Hukuk Haberleri">Hukuk Haberleri</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="read_time">Okuma Süresi (dakika) *</Label>
          <Input id="read_time" name="read_time" type="number" required placeholder="5" min="1" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="author">Yazar *</Label>
        <Input id="author" name="author" placeholder="Yazar adı" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="excerpt">Özet *</Label>
        <Textarea
          id="excerpt"
          name="excerpt"
          required
          placeholder="Kısa özet..."
          rows={3}
          className="resize-none"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">İçerik *</Label>
        <Textarea
          id="content"
          name="content"
          required
          placeholder="Makale içeriği (HTML desteklenir)..."
          rows={15}
          className="resize-y font-mono text-sm"
        />
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center gap-3">
          <Switch id="published" checked={published} onCheckedChange={setPublished} />
          <Label htmlFor="published" className="cursor-pointer">
            Hemen yayımla
          </Label>
        </div>

        <div className="flex gap-3">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            İptal
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Kaydediliyor..." : published ? "Makaleyi Yayınla" : "Taslağı Kaydet"}
          </Button>
        </div>
      </div>
    </form>
  )
}
