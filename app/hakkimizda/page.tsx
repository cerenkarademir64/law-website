import { Header } from "@/components/header"
import { Footer } from "@/frontend/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Award, Target, Users, Scale } from "lucide-react"
import Image from "next/image"

export default function HakkimizdaPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
<section className="relative mt-20 min-h-[60vh] pb-16 lg:pb-24 overflow-hidden">

{/* Arka plan görseli */}
<Image
  src="/about-hero-image.jpg"
  alt="Taş Hukuk & Danışmanlık - Hakkımızda"
  fill
  priority
  className="object-cover object-center"
/>

{/* ⭐ Yazıyı görünür yapan koyu overlay */}
<div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]" />

<div className="container mx-auto px-4 lg:px-8 relative">
  <div className="max-w-4xl mx-auto text-center space-y-6 flex flex-col items-center justify-center h-[calc(60vh-4rem)] md:h-[calc(60vh-6rem)] lg:h-[calc(60vh-7rem)]">
    <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-semibold text-white leading-[1.05] drop-shadow-xl">
      Hakkımızda
    </h1>
    <p className="text-lg md:text-xl lg:text-2xl text-white/90 leading-relaxed drop-shadow">
      Adalet ve müvekkil memnuniyeti odaklı hizmet anlayışımızla yanınızdayız.
    </p>
  </div>
</div>
</section>


      {/* Misyon & Vizyon - Hero sınırını yarı taşan konum */}
      <div className="container mx-auto px-4 lg:px-8 relative z-10 -mt-16 md:-mt-24 lg:-mt-28">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
          <Card className="border-2 border-border">
            <CardContent className="p-8 lg:p-10 space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center">
                <Target className="text-accent" size={32} />
              </div>
              <h2 className="text-2xl md:text-3xl font-serif font-semibold">Misyonumuz</h2>
              <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
              Müvekkillerimizin haklarını uluslararası standartlarda ve etik değerlere bağlı kalarak koruyoruz. 
              Her dosyada stratejik, güvenilir ve ölçülebilir çözümler üretmeyi hedefliyor; yalnızca uyuşmazlık anında değil, risk oluşmadan önce de proaktif hukuki danışmanlık sağlıyoruz. 
              Teknoloji ve güncel içtihatları yakından takip ederek süreçleri şeffaf ilerletiyor, hızlı iletişim ve düzenli bilgilendirme ile her aşamada müvekkillerimizin yanında yer alıyoruz. 
              Her dava ve danışmanlık sürecinde isabetli analiz yaparak en doğru hukuki yolu belirliyor, müvekkillerimiz için güvenilir bir çözüm ortağı olmayı temel ilke ediniyoruz. 
              Adaletin sağlanması ve hukukun üstünlüğünün korunması ise çalışmalarımızın odağında yer almaktadır.
              </p>
            </CardContent>
          </Card>
          <Card className="border-2 border-border">
            <CardContent className="p-8 lg:p-10 space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center">
                <Award className="text-accent" size={32} />
              </div>
              <h2 className="text-2xl md:text-3xl font-serif font-semibold">Vizyonumuz</h2>
              <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
              Hukukun değişen dinamiklerine uyum sağlayan, yenilikçi, güvenilir ve dijital çağı yakalayan bir hukuk markası olmak için çalışıyoruz. 
              Her müvekkilin ihtiyacına özel stratejiler geliştirerek; ticaret, şirketler, gayrimenkul, kira, ceza, iş, aile, idare ve sözleşmeler hukuku gibi uzmanlık alanlarımızda bölgesel ve ulusal ölçekte referans gösterilen bir hukuk bürosu olmayı hedefliyoruz.
              Teknoloji ile desteklenen şeffaf iletişim ve hızlı çözüm anlayışımızla, yalnızca bugünü değil geleceği de güvence altına alan sürdürülebilir bir hukuk altyapısı oluşturuyoruz. 
              Etik değerlere bağlı, sonuç odaklı ve sürekli gelişen yaklaşımımızla müvekkillerimize uzun vadeli güven sağlayan bir çözüm ortağı olmayı vizyon ediniyoruz.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Değerlerimiz */}
      <section className="py-20 lg:py-32 bg-secondary/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-serif font-light text-balance">Değerlerimiz</h2>
            <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
              Çalışma prensipleri ve değerlerimiz
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="border-2 border-border hover:shadow-lg transition-shadow">
              <CardContent className="p-8 space-y-4 text-center">
                <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto">
                  <Scale className="text-accent" size={32} />
                </div>
                <h3 className="text-2xl font-serif font-semibold">Adalet</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Hukukun üstünlüğü ve hakkaniyet ilkesi tüm süreçlerimizin temelini oluşturur. Tarafsız, özenli ve
                  nesnel değerlendirmelerle en doğru sonuca ulaşmayı hedefleriz.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-border hover:shadow-lg transition-shadow">
              <CardContent className="p-8 space-y-4 text-center">
                <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto">
                  <Users className="text-accent" size={32} />
                </div>
                <h3 className="text-2xl font-serif font-semibold">Güven</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Gizlilik ve şeffaflık esastır. Dosyalarınızı düzenli bilgilendirme, açık iletişim ve yazılı onay
                  süreçleriyle yürütür; her adımı birlikte planlarız.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-border hover:shadow-lg transition-shadow">
              <CardContent className="p-8 space-y-4 text-center">
                <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto">
                  <Award className="text-accent" size={32} />
                </div>
                <h3 className="text-2xl font-serif font-semibold">Profesyonellik</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Uzmanlık, hazırlık ve zamanında dönüş ilkemizdir. Güncel mevzuatı takip eder; teknoloji ve
                  dokümantasyon standartlarıyla hatasız ve hızlı süreç yönetimi sağlarız.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Hikayemiz */}
      <section className="py-20 lg:py-32">
  <div className="container mx-auto px-4 lg:px-8">
    <div className="max-w-4xl mx-auto space-y-8">
      <h2 className="text-4xl md:text-5xl font-serif font-light text-center text-balance">Hikayemiz</h2>
      <div className="prose prose-lg max-w-none">

        <p className="text-muted-foreground leading-relaxed text-lg">
          Taş Hukuk & Danışmanlık & Arabuluculuk; hukuku bir meslekten öte, adaletin savunusu ve toplumsal bir sorumluluk olarak gören yaklaşım üzerine kurulmuştur. 
          Kurucumuz Av. Kadir Taş’ın “her dosya bir hayatı etkiler” prensibi, bugün de çalışma kültürümüzün temelini oluşturmaktadır.
        </p>

        <p className="text-muted-foreground leading-relaxed text-lg">
          Büromuz; ceza, aile, ticaret, iş, sözleşmeler ve idare hukuku gibi pek çok alanda derinleşmiş uzmanlığa sahip bir ekiple hizmet sunar. 
          Her müvekkilin durumu benzersiz olduğu için süreçleri dikkatle analiz eder, kişiye özel stratejiler geliştirir ve hakların en etkin şekilde korunmasını hedefleriz.
        </p>

        <p className="text-muted-foreground leading-relaxed text-lg">
          Güvene dayalı ilişki, şeffaf iletişim ve doğru bilgilendirme bizim için vazgeçilmezdir. 
          Hukuki süreç boyunca müvekkillerimize eşlik eder, her aşamada güçlü ve net bir yönlendirme sunarız.
        </p>

        <p className="text-muted-foreground leading-relaxed text-lg">
          Teknolojiyi etkin kullanarak hızlı, erişilebilir ve çözüm odaklı hizmet üretir; her vakayı titizlikle ele alırız. 
          Amacımız sadece mevcut uyuşmazlıkları çözmek değil, gelecekte doğabilecek riskleri de öngörerek müvekkillerimize güvenli bir hukuki yol haritası oluşturmaktır.
        </p>

        <p className="text-muted-foreground leading-relaxed text-lg">
          Bugün Taş Hukuk & Danışmanlık & Arabuluculuk, büyüyen tecrübesi ve ilkelerinden ödün vermeyen duruşuyla güven veren bir hukuk markasıdır. 
          Yolculuğumuzun merkezinde her zaman adalet, etik ve müvekkil memnuniyeti olmaya devam edecektir.
        </p>

      </div>
    </div>
  </div>
</section>


      <Footer />
    </div>
  )
}