import { Card, CardContent } from "@/components/ui/card"
import { ArticleEditor } from "@/components/article-editor"

export default function NewArticlePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-light mb-2">Yeni Makale Oluştur</h1>
        <p className="text-muted-foreground">Yeni bir blog yazısı yazın ve yayınlayın</p>
      </div>

      <Card>
        <CardContent className="p-8">
          <ArticleEditor />
        </CardContent>
      </Card>
    </div>
  )
}


