import { Header } from "@/components/header"
import { Footer } from "@/frontend/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Briefcase, Scale, Users, Shield, FileText, Award, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function CalismaAlanlariPage() {
  const practiceAreas = [
    {
      icon: Briefcase,
      title: "İş Hukuku",
      slug: "is-hukuku",
      description:
        "İşçi ve işveren haklarının korunması, iş sözleşmeleri, kıdem ve ihbar tazminatları, iş kazaları, mobbing ve işe iade davaları konularında uzman hukuki destek sunuyoruz.",
      services: [
        "İş Sözleşmeleri Hazırlama ve İnceleme",
        "Kıdem ve İhbar Tazminatı Davaları",
        "İşe İade Davaları",
        "İş Kazası ve Meslek Hastalığı Davaları",
        "Mobbing Davaları",
        "Fazla Mesai ve Ücret Alacağı Davaları",
      ],
    },
    {
      icon: Scale,
      title: "Ceza Hukuku",
      slug: "ceza-hukuku",
      description:
        "Ceza davalarında savunma, suç duyuruları, şikayetler ve ceza hukuku kapsamındaki tüm hukuki süreçlerde profesyonel temsil ve danışmanlık hizmeti veriyoruz.",
      services: [
        "Ceza Davalarında Müdafilik",
        "Suç Duyurusu ve Şikayet Hazırlama",
        "Tutuklama ve Gözaltı İşlemleri",
        "Uzlaşma ve Arabuluculuk",
        "Hükmün Açıklanmasının Geri Bırakılması",
        "Temyiz ve İstinaf Başvuruları",
      ],
    },
    {
      icon: Users,
      title: "Aile Hukuku",
      slug: "aile-hukuku",
      description:
        "Boşanma, velayet, nafaka, mal paylaşımı ve aile içi hukuki sorunların çözümünde deneyimli avukatlık hizmeti sunarak ailelerin haklarını koruyoruz.",
      services: [
        "Boşanma Davaları (Anlaşmalı/Çekişmeli)",
        "Velayet ve Kişisel İlişki Düzenleme",
        "Nafaka Davaları (Tedbir, İştirak, Yoksulluk)",
        "Mal Paylaşımı ve Tazminat Davaları",
        "Nişanın Bozulması Davaları",
        "Soybağının Reddi ve Tanıma Davaları",
      ],
    },
    {
      icon: Shield,
      title: "Gayrimenkul Hukuku",
      slug: "gayrimenkul-hukuku",
      description:
        "Tapu işlemleri, kira sözleşmeleri, tahliye davaları ve gayrimenkul alım-satım süreçlerinde hukuki danışmanlık ve dava takibi hizmeti sunuyoruz.",
      services: [
        "Tapu İptal ve Tescil Davaları",
        "Kira Sözleşmeleri ve Tahliye Davaları",
        "Gayrimenkul Alım-Satım İşlemleri",
        "İmar ve Kamulaştırma Davaları",
        "Kat Mülkiyeti ve Kat İrtifakı",
        "Ortaklığın Giderilmesi Davaları",
      ],
    },
    {
      icon: FileText,
      title: "Miras Hukuku",
      slug: "miras-hukuku",
      description:
        "Miras paylaşımı, vasiyetname düzenleme, terekenin tespiti ve miras hukukundan kaynaklanan uyuşmazlıkların çözümünde profesyonel hukuki destek sağlıyoruz.",
      services: [
        "Miras Paylaşımı ve Taksim Davaları",
        "Vasiyetname Düzenleme ve İptali",
        "Mirasçılık Belgesi İşlemleri",
        "Mirastan Mal Kaçırma Davaları",
        "Tenkis Davaları",
        "Muris Muvazaası Davaları",
      ],
    },
    {
      icon: Award,
      title: "Ticaret Hukuku",
      slug: "ticaret-hukuku",
      description:
        "Şirket kuruluşu, ticari sözleşmeler, ortaklık anlaşmazlıkları ve ticari alacak davalarında hukuki destek ve danışmanlık hizmeti veriyoruz.",
      services: [
        "Şirket Kuruluşu ve Tür Değişikliği",
        "Ticari Sözleşmeler Hazırlama",
        "Ortaklık Anlaşmazlıkları",
        "Ticari Alacak ve İcra Takibi",
        "Konkordato ve İflas Davaları",
        "Franchise ve Distribütörlük Sözleşmeleri",
      ],
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* HERO — Hakkımızda ile birebir uyumlu */}
      <section
        className="relative h-[75vh] flex items-center justify-center text-center text-white"
        style={{
          backgroundImage: "url('/calisma-alanlari-hero.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
        <div className="absolute inset-0 bg-black/45"></div>

        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <span className="px-4 py-2 bg-white/20 text-white font-medium text-sm rounded-full border border-white/30">
            Uzmanlık Alanlarımız
          </span>

          <h1 className="text-6xl font-serif font-light drop-shadow-lg">Çalışma Alanlarımız</h1>

          <p className="text-xl text-white/95 drop-shadow-md">
            Müvekkillerimizin haklarını korumak için geniş yelpazede hukuki danışmanlık hizmeti sunuyoruz.
          </p>
        </div>
      </section>


      {/* KARTLAR — Resme gömülü düzgün geçiş */}
      <section className="relative -mt-32 pb-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="space-y-16">
            {practiceAreas.map((area, index) => (
              <Card
                key={area.slug}
                className="border-2 border-border bg-white shadow-xl hover:shadow-2xl transition-all"
                style={{ animationDelay: `${index * 120}ms` }}
              >
                <CardContent className="p-10">
                  <div className="grid lg:grid-cols-3 gap-10">
                    
                    <div className="space-y-6">
                      <div className="w-16 h-16 rounded-xl bg-accent/10 flex items-center justify-center border border-accent/20">
                        <area.icon className="text-accent" size={32} />
                      </div>
                      <h2 className="text-3xl font-serif font-semibold">{area.title}</h2>
                      <p className="text-muted-foreground leading-relaxed">{area.description}</p>
                    </div>

                    <div className="lg:col-span-2">
                      <h3 className="text-xl font-semibold mb-6">Sunduğumuz Hizmetler</h3>
                      <div className="grid sm:grid-cols-2 gap-4">
                        {area.services.map((service, i) => (
                          <div key={i} className="flex items-start gap-3 p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition">
                            <span className="w-2 h-2 rounded-full bg-accent mt-2"></span>
                            <span className="text-sm font-medium">{service}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>


      <section className="py-20 bg-primary text-primary-foreground text-center">
        <h2 className="text-4xl font-serif font-light">Hukuki Danışmanlığa İhtiyacınız mı Var?</h2>
        <p className="text-lg max-w-xl mx-auto mt-4 text-primary-foreground/90">
          Uzman avukatlarımızla hemen iletişime geçin. Size özel çözümler üretelim.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" variant="secondary">
            <Link href="/online-randevu">
              Online Randevu Al <ArrowRight size={18} className="ml-2"/>
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-2">
            <Link href="/iletisim">Bize Ulaşın</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
