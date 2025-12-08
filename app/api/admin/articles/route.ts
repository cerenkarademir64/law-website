import { NextResponse } from "next/server"
import { createArticle } from "@/lib/db/queries"
import { validateArticleData, generateSlug } from "@/lib/validations/article"

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}))

    // Otomatik slug üret (başlıktan), gönderildiyse temizle
    const title: string = String(body.title || "").trim()
    const slugInput: string = String(body.slug || "").trim()
    let slug = slugInput || (title ? generateSlug(title) : "")
    if (!slug) {
      slug = `makale-${Date.now()}`
    }

    const data = {
      title,
      slug,
      excerpt: String(body.excerpt || "").trim(),
      content: String(body.content || "").trim(),
      author: String(body.author || "").trim(),
      image_url: body.image_url ? String(body.image_url).trim() : undefined,
      category: body.category ? String(body.category).trim() : undefined,
      published: Boolean(body.published),
    }

    // Doğrulama
    const validation = validateArticleData(data as any)
    if (!validation.isValid) {
      return NextResponse.json({ error: "Validation failed", details: validation.errors }, { status: 400 })
    }

    const article = await createArticle(data)

    return NextResponse.json({ success: true, article }, { status: 200 })
  } catch (error) {
    console.error("Admin create article error:", error)
    return NextResponse.json({ error: "Makale oluşturulamadı" }, { status: 500 })
  }
}
