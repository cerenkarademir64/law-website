import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, FileText, Calendar, Mail, LogOut } from "lucide-react"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-secondary/30">
      {/* Admin Header */}
      <header className="bg-background border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/admin/dashboard" className="text-xl font-serif font-semibold">
              Yönetim Paneli
            </Link>
            <div className="flex items-center gap-4">
              <Button asChild variant="ghost" size="sm">
                <Link href="/">Siteyi Görüntüle</Link>
              </Button>
              <form action="/api/admin/logout" method="POST">
                <Button type="submit" variant="outline" size="sm">
                  <LogOut size={16} className="mr-2" />
                  Çıkış
                </Button>
              </form>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <nav className="space-y-2 lg:sticky lg:top-24">
              <Link
                href="/admin/dashboard"
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-background transition-colors"
              >
                <LayoutDashboard size={20} />
                <span className="font-medium">Kontrol Paneli</span>
              </Link>
              <Link
                href="/admin/articles"
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-background transition-colors"
              >
                <FileText size={20} />
                <span className="font-medium">Makaleler</span>
              </Link>
              <Link
                href="/admin/appointments"
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-background transition-colors"
              >
                <Calendar size={20} />
                <span className="font-medium">Randevular</span>
              </Link>
              <Link
                href="/admin/contacts"
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-background transition-colors"
              >
                <Mail size={20} />
                <span className="font-medium">İletişim Mesajları</span>
              </Link>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </div>
  )
}


