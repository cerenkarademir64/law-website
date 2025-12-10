import { NextResponse } from "next/server"
import { deleteArticle } from "@/lib/db/queries"

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id: idParam } = await params
    const id = Number(idParam)
    if (!Number.isFinite(id)) {
      return NextResponse.json({ error: "invalid id" }, { status: 400 })
    }
    await deleteArticle(id)
    const referer = request.headers.get("referer")
    if (referer) {
      return NextResponse.redirect(referer)
    }
    return NextResponse.json({ success: true })
  } catch (e) {
    console.error("Delete article error:", e)
    return NextResponse.json({ error: "Silme işlemi başarısız" }, { status: 500 })
  }
}


