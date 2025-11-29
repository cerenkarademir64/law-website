import { NextResponse } from "next/server"
import { createArticle } from "@/lib/db/queries"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const article = await createArticle({
      title: body.title,
      slug: body.slug,
      excerpt: body.excerpt,
      content: body.content,
      author: body.author,
      image_url: body.image_url,
      category: body.category,
    })

    return NextResponse.json(
      {
        success: true,
        article,
        message: "Makale başarıyla oluşturuldu",
      },
      { status: 201 },
    )
  } catch (error: any) {
    console.error("[v0] Error creating article:", error)
    const message =
      typeof error?.message === "string" && error.message.toLowerCase().includes("duplicate")
        ? "Slug benzersiz olmalıdır"
        : "Makale oluşturulurken bir hata oluştu"
    return NextResponse.json(
      {
        error: message,
      },
      { status: message.includes("Slug") ? 409 : 500 },
    )
  }
}
