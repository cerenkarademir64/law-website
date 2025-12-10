"use client"

import { useEffect } from "react"

export function CenterOnHash() {
  useEffect(() => {
    const centerToCurrentHash = () => {
      const raw = typeof window !== "undefined" ? window.location.hash : ""
      const id = raw ? decodeURIComponent(raw.replace(/^#/, "")) : ""
      if (!id) return
      const el = document.getElementById(id)
      if (!el) return
      // Delay a bit to ensure layout/images are ready before measuring
      window.setTimeout(() => {
        const rect = el.getBoundingClientRect()
        const targetTop = rect.top + window.scrollY - (window.innerHeight - rect.height) / 2
        window.scrollTo({ top: Math.max(0, targetTop), behavior: "smooth" })
      }, 60)
    }

    // Run on mount (initial navigation with hash)
    centerToCurrentHash()

    // Re-run on hash changes within the page
    const onHashChange = () => centerToCurrentHash()
    window.addEventListener("hashchange", onHashChange)
    return () => {
      window.removeEventListener("hashchange", onHashChange)
    }
  }, [])

  return null
}


