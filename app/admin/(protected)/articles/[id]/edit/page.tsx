import { Card, CardContent } from "@/components/ui/card"
import { notFound } from "next/navigation"
import { getArticleById } from "@/lib/db/queries"
import { EditArticleForm } from "@/components/article-editor-edit"

export default async function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id: idParam } = await params
  const id = Number(idParam)
  if (!Number.isFinite(id)) notFound()
  const article = await getArticleById(id)
  if (!article) notFound()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-light mb-2">Makaleyi Düzenle</h1>
        <p className="text-muted-foreground">İçeriği güncelleyin ve kaydedin</p>
      </div>

      <Card>
        <CardContent className="p-8">
          <EditArticleForm article={article as any} />
        </CardContent>
      </Card>
    </div>
  )
}


