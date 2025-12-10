"use client"

import { Button } from "@/components/ui/button"
import { Share2 } from "lucide-react"
import { useCallback } from "react"

type ShareButtonProps = {
  title: string
  text?: string | null
  className?: string
  size?: "default" | "sm" | "lg" | "icon"
  variant?: "default" | "secondary" | "destructive" | "outline" | "ghost" | "link"
}

export function ShareButton({
  title,
  text,
  className,
  size = "sm",
  variant = "outline",
}: ShareButtonProps) {
  const handleShare = useCallback(async () => {
    const url =
      typeof window !== "undefined" ? window.location.href : typeof location !== "undefined" ? location.href : ""
    const shareData: ShareData = {
      title: title || document.title,
      text: text || undefined,
      url,
    }
    try {
      if (typeof navigator !== "undefined" && (navigator as any).share) {
        await (navigator as any).share(shareData)
        return
      }
    } catch {
      // fall through to clipboard
    }
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard && url) {
        await navigator.clipboard.writeText(url)
        alert("Bağlantı kopyalandı.")
        return
      }
    } catch {
      // ignore
    }
    // Final fallback: open a simple sharer (WhatsApp as generic)
    if (url) {
      const encoded = encodeURIComponent(`${title}\n${url}`)
      window.open(`https://wa.me/?text=${encoded}`, "_blank", "noopener,noreferrer")
    }
  }, [title, text])

  return (
    <Button variant={variant} size={size} className={className} onClick={handleShare}>
      <Share2 size={16} />
      Paylaş
    </Button>
  )
}


