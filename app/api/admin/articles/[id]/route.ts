import { NextResponse } from "next/server"
import { getArticleById, updateArticle } from "@/lib/db/queries"
import { validateArticleData, generateSlug } from "@/lib/validations/article"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id: idParam } = await params
  const id = Number(idParam)
  if (!Number.isFinite(id)) return NextResponse.json({ error: "invalid id" }, { status: 400 })

  const article = await getArticleById(id)
  if (!article) return NextResponse.json({ error: "not found" }, { status: 404 })
  return NextResponse.json({ article })
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id: idParam } = await params
    const id = Number(idParam)
    if (!Number.isFinite(id)) return NextResponse.json({ error: "invalid id" }, { status: 400 })

    const existing = await getArticleById(id)
    if (!existing) return NextResponse.json({ error: "not found" }, { status: 404 })

    const body = await request.json().catch(() => ({}))

    const title: string = String(body.title ?? existing.title ?? "").trim()
    const slug: string =
      typeof body.slug === "string" && body.slug.trim().length > 0
        ? String(body.slug).trim()
        : existing.slug || (title ? generateSlug(title) : "")

    const payload = {
      title,
      slug,
      excerpt: String(body.excerpt ?? existing.excerpt ?? "").trim(),
      content: String(body.content ?? existing.content ?? "").trim(),
      author: String(body.author ?? existing.author ?? "").trim(),
      image_url:
        body.image_url === null
          ? null
          : typeof body.image_url === "string"
            ? body.image_url.trim()
            : existing.image_url ?? null,
      category:
        body.category === null
          ? null
          : typeof body.category === "string"
            ? body.category.trim()
            : existing.category ?? null,
      published: typeof body.published === "boolean" ? body.published : existing.published,
    }

    // published_at mantığı
    const nextPublishedAt =
      payload.published && !existing.published ? new Date().toISOString() : !payload.published ? null : existing.published_at || null

    const validation = validateArticleData(payload as any)
    if (!validation.isValid) {
      return NextResponse.json({ error: "Validation failed", details: validation.errors }, { status: 400 })
    }

    const updated = await updateArticle(id, { ...payload, published_at: nextPublishedAt })
    return NextResponse.json({ success: true, article: updated })
  } catch (error) {
    console.error("Admin update article error:", error)
    return NextResponse.json({ error: "Makale güncellenemedi" }, { status: 500 })
  }
}


