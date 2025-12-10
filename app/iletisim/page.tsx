"use client"

import type React from "react"

import { Header } from "@/components/header"
import { Footer } from "@/frontend/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { Map } from "@/components/map"
import { useState } from "react"
import Image from "next/image"

export default function IletisimPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSuccessMessage(null)
    setErrorMessage(null)
    try {
      setIsSubmitting(true)
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
        }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data?.error || "Mesaj gönderilemedi")
      }
      setSuccessMessage("Mesajınız başarıyla gönderildi.")
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      })
    } catch (err: any) {
      setErrorMessage(err?.message || "Bir hata oluştu, lütfen tekrar deneyin.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section with Image (same height as Hakkımızda) */}
      <section className="relative mt-20 min-h-[60vh] pb-16 lg:pb-24 overflow-hidden">
        <Image
          src="/iletisimhero.jpeg"
          alt="İletişim - Hero"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]" />
        {/* Bottom blurred shadow effect at hero edge */}
        <div className="pointer-events-none absolute inset-x-0 -bottom-6 h-20 bg-black/60 blur-[40px] opacity-80" />
        <div className="container mx-auto px-4 lg:px-8 relative">
          <div className="max-w-4xl mx-auto text-center space-y-6 flex flex-col items-center justify-center h-[calc(60vh-4rem)] md:h-[calc(60vh-6rem)] lg:h-[calc(60vh-7rem)]">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-light text-white leading-[1.05] drop-shadow-xl">
              İletişim
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-white/90 leading-relaxed drop-shadow">
              Hukuki danışmanlık için bizimle iletişime geçin
            </p>
          </div>
        </div>
      </section>

      {/* İletişim Bilgileri ve Form */}
      <section className="relative z-10 -mt-46 md:-mt-44 lg:-mt-60 py-20 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* İletişim Bilgileri */}
            <div className="space-y-8">
              <div className="space-y-6">
                <Card className="border-2 border-border">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <MapPin className="text-accent" size={24} />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Adres</h3>
                        <p className="text-muted-foreground leading-relaxed">
                          Adalet Mah. Şehit Polis Fethi Sekin Cad. No.6 Ventus Tower
                          <br />Bayraklı, İzmir 35530
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-border">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <Phone className="text-accent" size={24} />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Telefon</h3>
                        <a href="tel:+905354000055" className="text-muted-foreground hover:text-accent transition-colors">
                          +90 535 400 00 55
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-border">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <Mail className="text-accent" size={24} />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">E-posta</h3>
                        <a href="mailto:av.kadir.tas@gmail.com" className="text-muted-foreground hover:text-accent transition-colors">
                          av.kadir.tas@gmail.com
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-border">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <Clock className="text-accent" size={24} />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Çalışma Saatleri</h3>
                        <div className="text-muted-foreground space-y-1">
                          <p>Pazartesi - Cuma: 09:00 - 18:00</p>
                          <p>Cumartesi: 10:00 - 14:00</p>
                          <p>Pazar: Kapalı</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* İletişim Formu */}
            <Card className="border-2 border-border">
              <CardContent className="p-8">
                <h2 className="text-2xl font-serif font-semibold mb-6">Bize Mesaj Gönderin</h2>
                {errorMessage ? (
                  <div className="mb-4 rounded-md border border-red-200 bg-red-50 text-red-700 p-4">{errorMessage}</div>
                ) : null}
                {successMessage ? (
                  <div className="mb-4 rounded-md border border-green-200 bg-green-50 text-green-700 p-4">
                    {successMessage}
                  </div>
                ) : null}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Ad Soyad *</Label>
                    <Input
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Adınız ve soyadınız"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">E-posta *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="ornek@email.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefon *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+90 (555) 123 45 67"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Konu *</Label>
                    <Input
                      id="subject"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Mesajınızın konusu"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Mesajınız *</Label>
                    <Textarea
                      id="message"
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Mesajınızı buraya yazın..."
                      rows={6}
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90" disabled={isSubmitting}>
                    {isSubmitting ? "Gönderiliyor..." : "Mesaj Gönder"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Harita */}
      <section className="pb-20 lg:pb-32">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-light">Konumumuz</h2>
            <Map
              query="Adalet Mah. Şehit Polis Fethi Sekin Cad. No.6 Ventus Tower, Bayraklı, İzmir 35530"
              className="w-full rounded-xl overflow-hidden border border-border"
              height={480}
              title="Taş Hukuk - Konum Haritası"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}