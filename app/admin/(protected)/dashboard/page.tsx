import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Calendar, Mail, TrendingUp } from "lucide-react"
import { getArticles, getAppointments, getContactMessages } from "@/lib/db/queries"

async function getDashboardStats() {
  const [articles, appointments, contacts] = await Promise.all([
    getArticles(),
    getAppointments(),
    getContactMessages(),
  ])
  const totalArticles = articles.length
  const publishedArticles = articles.filter((a: any) => a.published || a.published_at).length
  const pendingAppointments = appointments.filter((a: any) => a.status === "pending").length
  const unreadContacts = contacts.filter((c: any) => c.status === "new" || c.status === "unread").length
  return { totalArticles, pendingAppointments, unreadContacts, publishedArticles }
}

export default async function AdminDashboard() {
  const stats = await getDashboardStats()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-light mb-2">Kontrol Paneli</h1>
        <p className="text-muted-foreground">Site genel durumu ve hızlı bağlantılar</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Toplam Makale</CardTitle>
            <FileText className="text-accent" size={20} />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.totalArticles}</div>
            <p className="text-xs text-muted-foreground mt-1">{stats.publishedArticles} yayınlandı</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Bekleyen Randevular</CardTitle>
            <Calendar className="text-accent" size={20} />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.pendingAppointments}</div>
            <p className="text-xs text-muted-foreground mt-1">Onay bekliyor</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Okunmamış Mesajlar</CardTitle>
            <Mail className="text-accent" size={20} />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.unreadContacts}</div>
            <p className="text-xs text-muted-foreground mt-1">İletişim bildirimleri</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Yayınlanma Oranı</CardTitle>
            <TrendingUp className="text-accent" size={20} />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {stats.totalArticles > 0 ? Math.round((stats.publishedArticles / stats.totalArticles) * 100) : 0}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">Yayınlanan makaleler</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Hızlı İşlemler</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <a
              href="/admin/articles/new"
              className="block p-4 rounded-lg border border-border hover:bg-secondary/50 transition-colors"
            >
              <div className="font-semibold">Yeni Makale Oluştur</div>
              <div className="text-sm text-muted-foreground">Yeni bir yazı yazın ve yayınlayın</div>
            </a>
            <a
              href="/admin/appointments"
              className="block p-4 rounded-lg border border-border hover:bg-secondary/50 transition-colors"
            >
              <div className="font-semibold">Randevuları İncele</div>
              <div className="text-sm text-muted-foreground">Gelen talepleri yönetin</div>
            </a>
            <a
              href="/admin/contacts"
              className="block p-4 rounded-lg border border-border hover:bg-secondary/50 transition-colors"
            >
              <div className="font-semibold">Mesajları Kontrol Et</div>
              <div className="text-sm text-muted-foreground">Gelen mesajlara yanıt verin</div>
            </a>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Son Aktiviteler</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              <p>Aktivite kaydı yakında...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


