"use client"

import type React from "react"

import { Header } from "@/components/header"
import { Footer } from "@/frontend/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { useState } from "react"
import { tr } from "date-fns/locale"
import { useToast } from "@/hooks/use-toast"

export default function OnlineRandevuPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    practiceArea: "",
    subject: "",
    preferredTime: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [flashState, setFlashState] = useState<"none" | "sent">("none")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage(null)
    setSuccessMessage(null)
    if (!date) {
      setErrorMessage("Önce zorunlu alanları doldurunuz.")
      return
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (
      !formData.name.trim() ||
      !emailRegex.test(formData.email.trim()) ||
      !formData.phone.trim() ||
      !formData.practiceArea.trim() ||
      !formData.subject.trim() ||
      !formData.preferredTime.trim() ||
      !formData.message.trim()
    ) {
      setErrorMessage("Önce zorunlu alanları doldurunuz.")
      return
    }
    setIsSubmitting(true)
    try {
      const yyyy = date.getFullYear()
      const mm = String(date.getMonth() + 1).padStart(2, "0")
      const dd = String(date.getDate()).padStart(2, "0")
      const preferred_date = `${yyyy}-${mm}-${dd}`

      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          practice_area: formData.practiceArea,
          subject: formData.subject,
          message: formData.message,
          preferred_date,
          preferred_time: formData.preferredTime,
        }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data?.error || "Randevu oluşturulamadı")
      }
      toast({
        title: "Randevu talebiniz alındı",
        description: "En kısa sürede sizinle iletişime geçeceğiz.",
      })
      setSuccessMessage("Randevu talebiniz başarıyla gönderildi.")
      setFlashState("sent")
      setTimeout(() => setFlashState("none"), 1200)
      setFormData({
        name: "",
        email: "",
        phone: "",
        practiceArea: "",
        subject: "",
        preferredTime: "",
        message: "",
      })
      setDate(new Date())
    } catch (err: any) {
      toast({
        title: "Hata",
        description: err?.message || "Bir sorun oluştu, lütfen tekrar deneyin.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 bg-gradient-to-b from-secondary/30 to-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-light text-balance">Online Randevu</h1>
            <p className="text-xl md:text-2xl text-muted-foreground text-pretty leading-relaxed">
              Hukuki danışmanlık için kolayca randevu alın
            </p>
          </div>
        </div>
      </section>

      {/* Randevu Formu */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Card className="border-2 border-border">
              <CardContent className="p-8 lg:p-12">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {errorMessage && (
                    <div className="rounded-md border border-red-200 bg-red-50 text-red-700 p-4">
                      {errorMessage}
                    </div>
                  )}
                  {successMessage && (
                    <div className="rounded-md border border-green-200 bg-green-50 text-green-700 p-4">
                      {successMessage}
                    </div>
                  )}
                  <div className="grid md:grid-cols-2 gap-6">
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
                    <Label htmlFor="practiceArea">Danışmak İstediğiniz Alan *</Label>
                    <Select
                      value={formData.practiceArea}
                      onValueChange={(value) => setFormData({ ...formData, practiceArea: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Lütfen seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="is-hukuku">İş Hukuku</SelectItem>
                        <SelectItem value="ceza-hukuku">Ceza Hukuku</SelectItem>
                        <SelectItem value="aile-hukuku">Aile Hukuku</SelectItem>
                        <SelectItem value="gayrimenkul-hukuku">Gayrimenkul Hukuku</SelectItem>
                        <SelectItem value="miras-hukuku">Miras Hukuku</SelectItem>
                        <SelectItem value="ticaret-hukuku">Ticaret Hukuku</SelectItem>
                        <SelectItem value="diger">Diğer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Konu *</Label>
                    <Input
                      id="subject"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Kısa konu başlığı"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Randevu Tarihi *</Label>
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        locale={tr}
                        className="rounded-md border"
                        disabled={(date) => date < new Date()}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="preferredTime">Tercih Edilen Saat *</Label>
                      <Select
                        value={formData.preferredTime}
                        onValueChange={(value) => setFormData({ ...formData, preferredTime: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Saat seçin" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="09:00">09:00</SelectItem>
                          <SelectItem value="10:00">10:00</SelectItem>
                          <SelectItem value="11:00">11:00</SelectItem>
                          <SelectItem value="12:00">12:00</SelectItem>
                          <SelectItem value="13:00">13:00</SelectItem>
                          <SelectItem value="14:00">14:00</SelectItem>
                          <SelectItem value="15:00">15:00</SelectItem>
                          <SelectItem value="16:00">16:00</SelectItem>
                          <SelectItem value="17:00">17:00</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Mesajınız *</Label>
                    <Textarea
                      id="message"
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Danışmak istediğiniz konu hakkında kısa bilgi verebilirsiniz..."
                      rows={6}
                    />
                  </div>

                  <div className="bg-secondary/50 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      * Randevu talebiniz alındıktan sonra, en kısa sürede sizinle iletişime geçilecektir. Randevu onayı
                      için tarafınıza e-posta veya telefon ile dönüş yapılacaktır.
                    </p>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Gönderiliyor..." : flashState === "sent" ? "Randevu talebi gönderildi" : "Randevu Talebi Gönder"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
