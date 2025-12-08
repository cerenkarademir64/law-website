"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

export function AppointmentForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [practiceArea, setPracticeArea] = useState("")
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [flashState, setFlashState] = useState<"none" | "sent">("none")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const { toast } = useToast()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)
    setSuccessMessage(null)
    setErrorMessage(null)

    const formData = new FormData(e.currentTarget)
    const data = {
      name: String(formData.get("name") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      phone: String(formData.get("phone") || "").trim(),
      practice_area: practiceArea,
      subject: String(formData.get("subject") || "").trim(),
      preferred_date: String(formData.get("preferred_date") || "").trim(),
      preferred_time: String(formData.get("preferred_time") || "").trim(),
      message: String(formData.get("message") || "").trim(),
    }

    // Basit istemci doğrulaması (zorunlu alanlar)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const invalid =
      data.name.length < 2 ||
      !emailRegex.test(data.email) ||
      data.phone.length < 10 ||
      !data.practice_area ||
      data.subject.length < 5 ||
      !data.preferred_date ||
      !data.preferred_time ||
    data.message.length === 0
    if (invalid) {
      setErrorMessage("Önce zorunlu alanları doldurunuz.")
      setIsSubmitting(false)
      return
    }

    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!response.ok) throw new Error("Failed to submit")

      toast({
        title: "Randevu talebiniz alındı",
        description: "En kısa sürede sizinle iletişime geçeceğiz.",
      })
      setSuccessMessage("Randevu talebiniz başarıyla gönderildi.")
      setFlashState("sent")
      setTimeout(() => setFlashState("none"), 1200)

      e.currentTarget.reset()
      setPracticeArea("")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to schedule appointment. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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
      <div className="space-y-2">
        <Label htmlFor="name">Full Name *</Label>
        <Input id="name" name="name" required placeholder="John Doe" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email *</Label>
        <Input id="email" name="email" type="email" required placeholder="john@example.com" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number *</Label>
        <Input id="phone" name="phone" type="tel" required placeholder="(555) 123-4567" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="practice_area">Practice Area *</Label>
        <Select value={practiceArea} onValueChange={setPracticeArea} required>
          <SelectTrigger>
            <SelectValue placeholder="Select a practice area" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="corporate">Corporate Law</SelectItem>
            <SelectItem value="litigation">Litigation</SelectItem>
            <SelectItem value="employment">Employment Law</SelectItem>
            <SelectItem value="real-estate">Real Estate</SelectItem>
            <SelectItem value="intellectual-property">Intellectual Property</SelectItem>
            <SelectItem value="estate-planning">Estate Planning</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="subject">Subject *</Label>
        <Input id="subject" name="subject" required placeholder="Brief subject (min 5 characters)" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="preferred_date">Preferred Date *</Label>
          <Input id="preferred_date" name="preferred_date" type="date" required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="preferred_time">Preferred Time *</Label>
          <Input id="preferred_time" name="preferred_time" type="time" required />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Brief Description *</Label>
        <Textarea
          id="message"
          name="message"
          required
          placeholder="Please briefly describe your legal matter..."
          rows={4}
          className="resize-none"
        />
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full" size="lg">
        {isSubmitting ? "Gönderiliyor..." : flashState === "sent" ? "Randevu talebi gönderildi" : "Request Consultation"}
      </Button>
    </form>
  )
}
