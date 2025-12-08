import { Resend } from "resend"

type SendAppointmentEmailParams = {
  to: string
  name: string
  status: "confirmed" | "pending" | "declined"
  preferredDatetime?: string | null
}

export async function sendAppointmentStatusEmail({
  to,
  name,
  status,
  preferredDatetime,
}: SendAppointmentEmailParams): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.MAIL_FROM || "noreply@example.com"

  // Env yoksa e-posta göndermeyi sessizce atla
  if (!apiKey) {
    console.warn("[email] RESEND_API_KEY missing; skipping email send")
    return
  }

  const resend = new Resend(apiKey)

  const subject =
    status === "confirmed"
      ? "Randevunuz Onaylandı"
      : status === "declined"
        ? "Randevu Talebiniz Hakkında"
        : "Randevu Talebiniz Alındı"

  const dateText = preferredDatetime
    ? new Date(preferredDatetime).toLocaleString(undefined, {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      })
    : null

  const html = `
    <div style="font-family:Arial,sans-serif;color:#1f2937">
      <h2 style="margin:0 0 12px 0">${subject}</h2>
      <p>Merhaba ${name},</p>
      ${
        status === "confirmed"
          ? `<p>Randevu talebiniz onaylanmıştır.</p>`
          : status === "declined"
            ? `<p>Randevu talebiniz şu an için onaylanamamıştır.</p>`
            : `<p>Randevu talebinizi aldık. En kısa sürede sizinle iletişime geçeceğiz.</p>`
      }
      ${dateText ? `<p><strong>Randevu Tarihi/Saati:</strong> ${dateText}</p>` : ""}
      <p style="margin-top:16px">Saygılarımızla,<br/>Taş Hukuk & Danışmanlık</p>
    </div>
  `

  try {
    await resend.emails.send({
      from,
      to,
      subject,
      html,
    })
  } catch (err) {
    console.error("[email] Failed to send email:", err)
  }
}


