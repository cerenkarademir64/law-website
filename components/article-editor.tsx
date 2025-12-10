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
import { useRef } from "react"
import { UploadCloud } from "lucide-react"

export function ArticleEditor() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [category, setCategory] = useState("")
  const [published, setPublished] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const { toast } = useToast()
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      title: formData.get("title"),
      excerpt: formData.get("excerpt"),
      content: formData.get("content"),
      category,
      author: formData.get("author"),
      read_time: Number(formData.get("read_time")),
      image_url: formData.get("image_url"),
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
      {/* Kapak görseli URL'yi backend'e göndermek için hidden input */}
      <input type="hidden" name="image_url" value={imageUrl || ""} />

      <div className="space-y-2">
        <Label htmlFor="title">Başlık *</Label>
        <Input id="title" name="title" required placeholder="Makale başlığı" />
      </div>

      {/* Slug otomatik üretilecek */}

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="category">Kategori *</Label>
          <Select value={category} onValueChange={setCategory} required>
            <SelectTrigger>
              <SelectValue placeholder="Kategori seçiniz" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Genel">Genel</SelectItem>
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
        <Label>Kapak Görseli</Label>
        <div className="flex justify-start">
          <div
            className="relative border-2 border-dashed border-border rounded-lg bg-secondary/20 hover:bg-secondary/30 transition-colors cursor-pointer overflow-hidden flex items-center justify-center p-3 text-center aspect-square w-56 md:w-64"
            onDragOver={(e) => e.preventDefault()}
            onDrop={async (e) => {
              e.preventDefault()
              const file = e.dataTransfer.files?.[0]
              if (file) {
                await uploadFile(file)
              }
            }}
            onClick={() => fileInputRef.current?.click()}
          >
            {imageUrl ? (
              <>
              <img
                  src={imageUrl}
                  alt="Kapak görseli"
                className="absolute inset-0 w-full h-full object-contain bg-secondary/20"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/40 text-white text-xs py-1">
                  Yeni görsel yüklemek için tıklayın veya sürükleyin
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <UploadCloud size={28} className="opacity-80" />
                {uploading ? (
                  <div className="text-xs">Yükleniyor...</div>
                ) : (
                  <>
                    <div className="text-sm">Görseli sürükleyip bırakın</div>
                    <div className="text-xs">veya seçmek için tıklayın</div>
                  </>
                )}
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={async (e) => {
              const input = e.currentTarget
              const file = input.files?.[0]
              if (file) {
                input.value = ""
                await uploadFile(file)
              }
              }}
            />
          </div>
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
          placeholder="Kısa özet..."
          rows={3}
          className="resize-y break-words whitespace-pre-wrap"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">İçerik *</Label>
        <Textarea
          id="content"
          name="content"
          placeholder="Makale içeriği (HTML desteklenir)..."
          rows={15}
          className="resize-y font-mono text-sm break-words whitespace-pre-wrap"
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
          <Button type="submit" disabled={isSubmitting || uploading}>
            {isSubmitting ? "Kaydediliyor..." : published ? "Makaleyi Yayınla" : "Taslağı Kaydet"}
          </Button>
        </div>
      </div>
    </form>
  )

  async function uploadFile(file: File) {
    try {
      if (!file.type.startsWith("image/")) {
        toast({ title: "Geçersiz dosya", description: "Lütfen bir resim dosyası yükleyin.", variant: "destructive" })
        return
      }
      if (file.size > 10 * 1024 * 1024) {
        toast({ title: "Dosya çok büyük", description: "Maksimum 10MB yükleyebilirsiniz.", variant: "destructive" })
        return
      }
      setUploading(true)
      const form = new FormData()
      form.append("file", file)
      const res = await fetch("/api/admin/uploads", {
        method: "POST",
        body: form,
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data?.error || "Yükleme başarısız")
      }
      const data = (await res.json()) as { url: string }
      setImageUrl(data.url)
      toast({ title: "Görsel yüklendi", description: "Kapak görseli eklendi." })
    } catch (err: any) {
      toast({
        title: "Hata",
        description: err?.message || "Görsel yüklenemedi. Lütfen tekrar deneyin.",
        variant: "destructive",
      })
    } finally {
      setUploading(false)
    }
  }
}
