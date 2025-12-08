import { NextResponse } from "next/server"
import { deleteContactMessage } from "@/lib/db/queries"

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
    await deleteContactMessage(id)
    const referer = request.headers.get("referer")
    if (referer) {
      return NextResponse.redirect(referer)
    }
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Delete contact message error:", error)
    return NextResponse.json({ error: "Beklenmeyen bir hata oluştu" }, { status: 500 })
  }
}


