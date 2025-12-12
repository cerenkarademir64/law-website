import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  const now = new Date()
  const urls = [
    "",
    "/hakkimizda",
    "/calisma-alanlari",
    "/makaleler",
    "/iletisim",
    "/online-randevu",
  ]
  return urls.map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.6,
  }))
}


