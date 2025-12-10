import { NextResponse } from "next/server"
import { createAppointment } from "@/lib/db/queries"
// Minimal validation: only ensure no empty fields (single char acceptable)

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Combine date and time (if provided) into ISO string for consistent storage
    let preferred_date: string | undefined = body.preferred_date
    if (body.preferred_date && body.preferred_time) {
      const combined = new Date(`${body.preferred_date}T${body.preferred_time}`)
      if (!isNaN(combined.getTime())) {
        preferred_date = combined.toISOString()
      }
    }

    // Minimal validation: ensure all fields are present and non-empty (single char acceptable)
    const isNonEmptyString = (v: any) => typeof v === "string" && v.trim().length > 0
    const missing =
      !isNonEmptyString(body.name) ||
      !isNonEmptyString(body.email) ||
      !isNonEmptyString(body.phone) ||
      !isNonEmptyString(body.practice_area) ||
      !isNonEmptyString(body.subject) ||
      !isNonEmptyString(body.message) ||
      !isNonEmptyString(body.preferred_time) ||
      !(typeof body.preferred_date === "string" && body.preferred_date.length > 0)

    if (missing) {
      return NextResponse.json(
        { error: "Lütfen tüm alanları doldurunuz." },
        { status: 400 },
      )
    }

    await createAppointment({
      name: body.name,
      email: body.email,
      phone: body.phone,
      practice_area: body.practice_area,
      subject: body.subject,
      message: body.message,
      preferred_date,
    })

    return NextResponse.json(
      {
        success: true,
        message: "Randevu talebiniz başarıyla alındı. En kısa sürede size dönüş yapılacaktır.",
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("[v0] Error scheduling appointment:", error)
    return NextResponse.json(
      {
        error: "Randevu oluşturulurken bir hata oluştu",
      },
      { status: 500 },
    )
  }
}
