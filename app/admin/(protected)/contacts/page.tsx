import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Mail, Phone } from "lucide-react"
import { getContactMessages as getContacts } from "@/lib/db/queries"

export default async function AdminContactsPage() {
  const contacts = await getContacts()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-light mb-2">İletişim Mesajları</h1>
        <p className="text-muted-foreground">Gelen mesajları yönetin</p>
      </div>

      <div className="space-y-4">
        {contacts.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-muted-foreground">Henüz iletişim mesajı yok.</p>
            </CardContent>
          </Card>
        ) : (
          contacts.map((contact: any) => (
            <Card key={contact.id}>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <h3 className="text-xl font-semibold">{contact.name}</h3>
                      <p className="text-sm text-muted-foreground">{contact.subject}</p>
                      <Badge variant={contact.status === "unread" ? "default" : "secondary"}>{contact.status}</Badge>
                    </div>
                    <div className="flex gap-2">
                      <form action={`/api/admin/contacts/${contact.id}/status`} method="POST">
                        <input type="hidden" name="status" value="read" />
                        <Button type="submit" variant="outline" size="sm">
                          Okundu İşaretle
                        </Button>
                      </form>
                      <form action={`/api/admin/contacts/${contact.id}/status`} method="POST">
                        <input type="hidden" name="status" value="archived" />
                        <Button type="submit" variant="outline" size="sm">
                          Arşivle
                        </Button>
                      </form>
                    </div>
                  </div>

                  <div className="flex gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Mail size={16} />
                      <a href={`mailto:${contact.email}`} className="hover:text-accent">
                        {contact.email}
                      </a>
                    </div>
                    {contact.phone && (
                      <div className="flex items-center gap-2">
                        <Phone size={16} />
                        <a href={`tel:${contact.phone}`} className="hover:text-accent">
                          {contact.phone}
                        </a>
                      </div>
                    )}
                    <div className="text-muted-foreground/60">{new Date(contact.created_at).toLocaleDateString()}</div>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <p className="text-sm font-semibold mb-2">Mesaj:</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{contact.message}</p>
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


