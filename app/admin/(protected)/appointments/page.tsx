import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Mail, Phone, Trash } from "lucide-react"
import { getAppointments } from "@/lib/db/queries"

export default async function AdminAppointmentsPage() {
  const appointments = await getAppointments()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-light mb-2">Randevular</h1>
        <p className="text-muted-foreground">Gelen randevu taleplerini yönetin</p>
      </div>

      <div className="space-y-4">
        {appointments.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-muted-foreground">Henüz randevu talebi yok.</p>
            </CardContent>
          </Card>
        ) : (
          appointments.map((appointment: any) => (
            <Card key={appointment.id}>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <h3 className="text-xl font-semibold">{appointment.name}</h3>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            appointment.status === "confirmed"
                              ? "default"
                              : appointment.status === "pending"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {appointment.status === "pending"
                            ? "Beklemede"
                            : appointment.status === "confirmed"
                              ? "Onaylandı"
                              : "Reddedildi"}
                        </Badge>
                        <span className="text-sm text-muted-foreground px-2 py-1 bg-accent/10 text-accent rounded uppercase">
                          {appointment.practice_area.replace("-", " ")}
                        </span>
                      </div>
                    </div>
                    {appointment.status === "pending" ? (
                      <div className="flex gap-2 items-center">
                        <form action={`/api/admin/appointments/${appointment.id}/status`} method="POST">
                          <input type="hidden" name="status" value="confirmed" />
                          <Button type="submit" variant="outline" size="sm">
                            Onayla
                          </Button>
                        </form>
                        <form action={`/api/admin/appointments/${appointment.id}/status`} method="POST">
                          <input type="hidden" name="status" value="declined" />
                          <Button type="submit" variant="outline" size="sm">
                            Reddet
                          </Button>
                        </form>
                        <form action={`/api/admin/appointments/${appointment.id}/delete`} method="POST">
                          <Button type="submit" variant="ghost" size="icon" title="Sil" aria-label="Sil">
                            <Trash size={16} />
                          </Button>
                        </form>
                      </div>
                    ) : appointment.status === "confirmed" ? (
                      <div className="flex items-center gap-2">
                        <div className="px-3 py-1 rounded bg-green-100 text-green-800 text-sm font-medium border border-green-200">
                          Onaylandı
                        </div>
                        <form action={`/api/admin/appointments/${appointment.id}/delete`} method="POST">
                          <Button type="submit" variant="ghost" size="icon" title="Sil" aria-label="Sil">
                            <Trash size={16} />
                          </Button>
                        </form>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <div className="px-3 py-1 rounded bg-red-100 text-red-800 text-sm font-medium border border-red-200">
                          Reddedildi
                        </div>
                        <form action={`/api/admin/appointments/${appointment.id}/delete`} method="POST">
                          <Button type="submit" variant="ghost" size="icon" title="Sil" aria-label="Sil">
                            <Trash size={16} />
                          </Button>
                        </form>
                      </div>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Mail size={16} />
                      <a href={`mailto:${appointment.email}`} className="hover:text-accent">
                        {appointment.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone size={16} />
                      <a href={`tel:${appointment.phone}`} className="hover:text-accent">
                        {appointment.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar size={16} />
                      <span>{new Date(appointment.preferred_datetime).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock size={16} />
                      <span>
                        {new Date(appointment.preferred_datetime).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <p className="text-sm font-semibold mb-2">Mesaj:</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{appointment.message}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}


