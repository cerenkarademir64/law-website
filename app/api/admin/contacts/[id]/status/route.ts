import { NextResponse } from "next/server"
import { updateContactStatus } from "@/lib/db/queries"

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    // Support both JSON and form submissions
    let status: string | null = null
    const contentType = request.headers.get("content-type") || ""
    if (contentType.includes("application/json")) {
      const body = await request.json().catch(() => ({}))
      status = body?.status ?? null
    } else {
      const form = await request.formData().catch(() => null)
      status = (form?.get("status") as string) || null
    }
    if (!status) {
      return NextResponse.json({ error: "status is required" }, { status: 400 })
    }

    const id = Number(params.id)
    if (!Number.isFinite(id)) {
      return NextResponse.json({ error: "invalid id" }, { status: 400 })
    }

    await updateContactStatus(id, status)

    const referer = request.headers.get("referer")
    if (!contentType.includes("application/json") && referer) {
      return NextResponse.redirect(referer)
    }
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Update contact status error:", error)
    return NextResponse.json({ error: "Beklenmeyen bir hata oluştu" }, { status: 500 })
  }
}


