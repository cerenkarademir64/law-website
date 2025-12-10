import { Header } from "@/components/header"
import { Footer } from "@/frontend/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Calendar, User, ArrowRight, BookOpen, Search } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { getArticles } from "@/lib/db/queries"

export default async function MakalelerPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; cat?: string }>
}) {
  const data = (await getArticles()).filter((a: any) => a.published !== false)
  const sp = await searchParams
  const q = (sp?.q || "").toString().trim()
  const selectedCat = (sp?.cat || "genel").toString().trim().toLowerCase()
  const hasQuery = q.length > 0

  // Admin panelinde kullanılan tüm kategori seçenekleri
  const adminCategories = [
    "Genel",
    "Şirketler Hukuku",
    "Dava Takibi",
    "İş Hukuku",
    "Gayrimenkul",
    "Fikri Mülkiyet",
    "Miras",
    "Hukuk Haberleri",
  ]

  // Veritabanında bulunanları da ekleyip tekilleştir
  const seen = new Set<string>()
  const dynamicCats = data
    .map((a: any) => (a.category || "Genel").toString())
    .filter(Boolean)

  const categories: string[] = [...adminCategories, ...dynamicCats].filter((c) => {
    const key = c.trim()
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })

  let articles = data
  if (hasQuery) {
    const qLower = q.toLowerCase()
    articles = articles.filter((a: any) => {
      const title = (a.title || "").toString().toLowerCase()
      const excerpt = (a.excerpt || "").toString().toLowerCase()
      const content = (a.content || "").toString().toLowerCase()
      return title.includes(qLower) || excerpt.includes(qLower) || content.includes(qLower)
    })
  } else if (selectedCat && selectedCat !== "genel") {
    articles = articles.filter(
      (a: any) => (a.category || "Genel").toString().toLowerCase() === selectedCat,
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Compact header (no large hero) */}
      <section className="pt-28 pb-4">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex justify-end">
            <div className="w-full max-w-sm">
              <form className="relative" method="get" action="/makaleler">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                {!hasQuery && selectedCat ? <input type="hidden" name="cat" value={selectedCat} /> : null}
                <Input name="q" defaultValue={q} placeholder="Makalelerde ara..." className="pl-9" />
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16 -mt-4 md:-mt-6">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Categories row */}
          <div className="flex items-center gap-2 flex-wrap mb-8">
            {categories.map((cat) => {
              const isActive = cat.toLowerCase() === selectedCat
              const href = `/makaleler?cat=${encodeURIComponent(cat.toLowerCase())}`
              return (
                <Link
                  key={cat}
                  href={href}
                  className={
                    "px-3 py-1.5 rounded-full border text-sm transition-colors " +
                    (isActive
                      ? "bg-accent text-accent-foreground border-accent"
                      : "bg-background text-foreground border-border hover:bg-secondary/50")
                  }
                  aria-current={isActive ? "true" : undefined}
                >
                  {cat}
                </Link>
              )
            })}
          </div>

          {articles.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">Henüz yayınlanmış makale bulunmuyor.</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article: any) => {
                const image = article.image_url || "/placeholder.svg"
                const category = article.category || "Genel"
                const author = article.author || "Taş Hukuk"
                const dateSrc = article.published_at || article.created_at
                const dateText = dateSrc ? new Date(dateSrc).toLocaleDateString("tr-TR") : ""
                return (
                  <Card
                    key={article.id}
                    className="border-2 border-border hover:border-accent/50 hover:shadow-xl transition-all duration-300 group flex flex-col overflow-hidden"
                  >
                    <div className="relative aspect-video w-full overflow-hidden bg-secondary/20">
    <Image
      src={image}
      alt={article.title}
      fill
      className="object-cover transition-transform duration-300"

    />
</div>


                    <CardContent className="p-8 flex flex-col flex-1">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="px-3 py-1 bg-accent/10 rounded-full border border-accent/20">
                          <span className="text-xs font-medium text-accent">{category}</span>
                        </div>
                      </div>

                      <h3 className="text-2xl font-serif font-semibold mb-4 group-hover:text-accent transition-colors break-words line-clamp-2">
                        {article.title}
                      </h3>

                      <p className="text-muted-foreground leading-relaxed mb-6 flex-1 break-words text-pretty line-clamp-3">
                        {article.excerpt}
                      </p>

                      <div className="space-y-4">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <User size={16} />
                            <span>{author}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar size={16} />
                            <span>{dateText}</span>
                          </div>
                        </div>

                        <Link
                          href={`/makaleler/${article.slug}`}
                          className="inline-flex items-center text-accent hover:text-accent/80 font-medium group-hover:gap-3 gap-2 transition-all"
                        >
                          Devamını Oku
                          <ArrowRight size={16} />
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}

          <div className="mt-16 text-center">
            <p className="text-muted-foreground mb-6">Daha fazla makale yakında eklenecektir.</p>
            <Button asChild variant="outline" size="lg" className="border-2 bg-transparent">
              <Link href="/iletisim">
                Soru Sormak İster misiniz?
                <ArrowRight className="ml-2" size={20} />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-secondary/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="w-20 h-20 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto border-2 border-accent/20">
              <BookOpen className="text-accent" size={36} />
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-light text-balance">Hukuki Bilgi Bankası</h2>
            <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
              Makalelerimiz, hukuki konularda bilgilenmeniz ve haklarınızı öğrenmeniz için hazırlanmıştır. Kişisel
              durumunuz için mutlaka uzman bir avukata danışmanızı öneririz.
            </p>
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/online-randevu">
                Hukuki Danışmanlık Alın
                <ArrowRight className="ml-2" size={20} />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}