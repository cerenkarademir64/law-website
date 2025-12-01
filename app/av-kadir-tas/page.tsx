import { Header } from "@/components/header"
import { Footer } from "@/frontend/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Briefcase } from "lucide-react"
import Image from "next/image"

export default function AvKadirTasPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* --- PROFESYONEL DENEYİM (KALDI) --- */}
      <section className="py-20 lg:py-32 bg-secondary/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl md:text-5xl font-serif font-light">Profesyonel Deneyim</h2>
            </div>
            <div className="space-y-6">
              <Card className="border-2 border-border">
                <CardContent className="p-8 space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Briefcase className="text-accent" size={24} />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-serif font-semibold">Kurucu Avukat</h3>
                      <p className="text-muted-foreground">Av. Kadir Taş Hukuk Bürosu</p>
                      <p className="text-sm text-muted-foreground">2015 - Günümüz</p>
                      <p className="text-muted-foreground leading-relaxed mt-4">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-border">
                <CardContent className="p-8 space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Briefcase className="text-accent" size={24} />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-serif font-semibold">Kıdemli Avukat</h3>
                      <p className="text-muted-foreground">Lorem Hukuk Bürosu</p>
                      <p className="text-sm text-muted-foreground">2010 - 2015</p>
                      <p className="text-muted-foreground leading-relaxed mt-4">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* ÇALIŞMA ALANLARI (GÜNCELLENMİŞ) */}
<section className="py-20 lg:py-32">
  <div className="container mx-auto px-4 lg:px-8">
    <div className="max-w-4xl mx-auto space-y-12">
      
      {/* BAŞLIK DEĞİŞTİ */}
      <div className="text-center space-y-4">
        <h2 className="text-4xl md:text-5xl font-serif font-light">Çalışma Alanları</h2>
      </div>

      {/* 6 ALAN OLACAK ŞEKİLDE GRID GENİŞLETİLDİ */}
      <div className="grid md:grid-cols-2 gap-6">

        <Card className="border-2 border-border hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-2">İş Hukuku</h3>
            <p className="text-muted-foreground text-sm">İşçi ve işveren hakları, sözleşmeler ve tazminat davaları</p>
          </CardContent>
        </Card>

        <Card className="border-2 border-border hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-2">Ceza Hukuku</h3>
            <p className="text-muted-foreground text-sm">Ceza davaları, savunma, suç duyurusu ve yargılama süreçleri</p>
          </CardContent>
        </Card>

        <Card className="border-2 border-border hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-2">Aile Hukuku</h3>
            <p className="text-muted-foreground text-sm">Boşanma, velayet, nafaka, mal paylaşımı ve aile içi uyuşmazlıklar</p>
          </CardContent>
        </Card>

        <Card className="border-2 border-border hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-2">Gayrimenkul Hukuku</h3>
            <p className="text-muted-foreground text-sm">Tapu işlemleri, kira sözleşmeleri ve tahliye davaları</p>
          </CardContent>
        </Card>

        <Card className="border-2 border-border hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-2">Miras Hukuku</h3>
            <p className="text-muted-foreground text-sm">Veraset, miras paylaşımı, tenkis ve miras ihtilafları</p>
          </CardContent>
        </Card>

        <Card className="border-2 border-border hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-2">Ticaret Hukuku</h3>
            <p className="text-muted-foreground text-sm">Şirket kuruluşları, ticari sözleşmeler ve uyuşmazlık çözümleri</p>
          </CardContent>
        </Card>

      </div>
    </div>
  </div>
</section>


      <Footer />
    </div>
  )
}