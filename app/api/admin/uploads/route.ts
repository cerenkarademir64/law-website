import { NextResponse } from "next/server"
import { getAdminClient } from "@/lib/supabase"

const BUCKET = "articles"

export async function POST(request: Request) {
  try {
    const form = await request.formData()
    const file = form.get("file") as File | null
    if (!file) {
      return NextResponse.json({ error: "file is required" }, { status: 400 })
    }

    const supabase = getAdminClient()

    // Dosya yolu: articles/{timestamp}-{random}.{ext}
    const ext = (file.name.split(".").pop() || "bin").toLowerCase()
    const path = `articles/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

    // Yüklemeyi dene; bucket yoksa oluştur ve tekrar dene
    let { error: uploadErr } = await supabase.storage.from(BUCKET).upload(path, file, {
      contentType: file.type || "application/octet-stream",
      upsert: false,
    })

    if (uploadErr) {
      // Bucket yoksa oluşturmaya çalış
      try {
        await supabase.storage.createBucket(BUCKET, {
          public: true,
          fileSizeLimit: 10 * 1024 * 1024, // 10MB
        })
        // Tekrar yükle
        const retry = await supabase.storage.from(BUCKET).upload(path, file, {
          contentType: file.type || "application/octet-stream",
          upsert: false,
        })
        uploadErr = retry.error || null
      } catch (e) {
        // ignore
      }
    }

    if (uploadErr) {
      console.error("Upload error:", uploadErr)
      return NextResponse.json({ error: "Yükleme başarısız" }, { status: 500 })
    }

    const { data: pub } = supabase.storage.from(BUCKET).getPublicUrl(path)
    const url = pub?.publicUrl
    if (!url) {
      return NextResponse.json({ error: "URL oluşturulamadı" }, { status: 500 })
    }

    return NextResponse.json({ success: true, url, path })
  } catch (error) {
    console.error("Upload route error:", error)
    return NextResponse.json({ error: "Beklenmeyen bir hata oluştu" }, { status: 500 })
  }
}


