"use client"

import type React from "react"
import { useRef, useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { UploadCloud } from "lucide-react"
import { useRouter } from "next/navigation"

type EditArticleFormProps = {
  article: any
}

export function EditArticleForm({ article }: EditArticleFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const [title, setTitle] = useState<string>(article.title || "")
  const [category, setCategory] = useState<string>(article.category || "")
  const [readTime, setReadTime] = useState<number>(Number((article as any).read_time) || 5)
  const [author, setAuthor] = useState<string>(article.author || "")
  const [excerpt, setExcerpt] = useState<string>(article.excerpt || "")
  const [content, setContent] = useState<string>(article.content || "")
  const [published, setPublished] = useState<boolean>(!!article.published)
  const [imageUrl, setImageUrl] = useState<string | null>(article.image_url || null)
  const [uploading, setUploading] = useState<boolean>(false)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const res = await fetch(`/api/admin/articles/${article.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          category,
          author,
          excerpt,
          content,
          image_url: imageUrl,
          published,
          read_time: readTime,
        }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data?.error || "Güncelleme başarısız")
      }
      toast({ title: "Güncellendi", description: "Makale başarıyla güncellendi." })
      router.push("/admin/articles")
    } catch (err: any) {
      toast({ title: "Hata", description: err?.message || "Makale güncellenemedi", variant: "destructive" })
    } finally {
      setIsSubmitting(false)
    }
  }

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
      const res = await fetch("/api/admin/uploads", { method: "POST", body: form })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data?.error || "Yükleme başarısız")
      }
      const data = (await res.json()) as { url: string }
      setImageUrl(data.url)
      toast({ title: "Görsel yüklendi", description: "Kapak görseli güncellendi." })
    } catch (err: any) {
      toast({ title: "Hata", description: err?.message || "Görsel yüklenemedi.", variant: "destructive" })
    } finally {
      setUploading(false)
    }
  }

  return (
    <form onSubmit={submit} className="space-y-6">
      <input type="hidden" name="image_url" value={imageUrl || ""} />

      <div className="space-y-2">
        <Label htmlFor="title">Başlık *</Label>
        <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required placeholder="Makale başlığı" />
      </div>

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
          <Input
            id="read_time"
            type="number"
            value={readTime}
            onChange={(e) => setReadTime(Number(e.target.value))}
            required
            min={1}
          />
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
              <img src={imageUrl} alt="Kapak görseli" className="absolute inset-0 w-full h-full object-contain bg-secondary/20" />
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
        <Input id="author" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Yazar adı" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="excerpt">Özet *</Label>
        <Textarea
          id="excerpt"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          rows={3}
          className="resize-y break-words whitespace-pre-wrap"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">İçerik *</Label>
        <Textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={15}
          className="resize-y font-mono text-sm break-words whitespace-pre-wrap"
        />
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center gap-3">
          <Switch id="published" checked={published} onCheckedChange={setPublished} />
          <Label htmlFor="published" className="cursor-pointer">
            Yayında
          </Label>
        </div>
        <div className="flex gap-3">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            İptal
          </Button>
          <Button type="submit" disabled={isSubmitting || uploading}>
            {isSubmitting ? "Kaydediliyor..." : "Güncelle"}
          </Button>
        </div>
      </div>
    </form>
  )
}

