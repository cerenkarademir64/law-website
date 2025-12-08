import { getAdminClient } from "@/lib/supabase"

type Article = {
  id: number
  title: string
  slug: string
  excerpt: string | null
  content: string
  author: string
  image_url?: string | null
  category?: string | null
  published?: boolean
  published_at?: string | null
  created_at: string
  updated_at: string
}

type PracticeArea = {
  id: number
  title: string
  slug: string
  description?: string | null
  icon?: string | null
  display_order?: number
  created_at: string
  updated_at: string
}

type Appointment = {
  id: number
  name: string
  email: string
  phone: string
  practice_area: string
  subject?: string | null
  message: string
  preferred_datetime?: string | null
  status: string
  created_at: string
  updated_at: string
}

type ContactMessage = {
  id: number
  name: string
  email: string
  phone?: string | null
  subject?: string | null
  message: string
  status: string
  created_at: string
  updated_at: string
}

export async function getArticles(): Promise<Article[]> {
  const supabase = getAdminClient()
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .order("published_at", { ascending: false, nullsFirst: false })
    .order("created_at", { ascending: false, nullsFirst: false })
  if (error) {
    console.error("Supabase getArticles error:", error)
    return []
  }
  return (data as any) || []
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const supabase = getAdminClient()
  const { data, error } = await supabase.from("articles").select("*").eq("slug", slug).limit(1).maybeSingle()
  if (error) {
    console.error("Supabase getArticleBySlug error:", error)
    return null
  }
  return (data as any) || null
}

export async function getArticleById(id: number): Promise<Article | null> {
  const supabase = getAdminClient()
  const { data, error } = await supabase.from("articles").select("*").eq("id", id).limit(1).maybeSingle()
  if (error) {
    console.error("Supabase getArticleById error:", error)
    return null
  }
  return (data as any) || null
}

export async function createArticle(data: {
  title: string
  slug: string
  excerpt: string
  content: string
  author: string
  image_url?: string
  category?: string
  published?: boolean
}): Promise<Article> {
  const supabase = getAdminClient()
  const now = new Date().toISOString()
  const payload = {
    title: data.title,
    slug: data.slug,
    excerpt: data.excerpt,
    content: data.content,
    author: data.author,
    image_url: data.image_url || null,
    category: data.category || null,
    published: data.published ?? true,
    published_at: (data.published ?? true) ? now : null,
  }
  const { data: rows, error } = await supabase.from("articles").insert(payload).select("*").limit(1)
  if (error) {
    console.error("Supabase createArticle error:", error)
    throw error
  }
  return rows?.[0] as any
}

export async function updateArticle(
  id: number,
  data: {
    title?: string
    slug?: string
    excerpt?: string
    content?: string
    author?: string
    image_url?: string | null
    category?: string | null
    published?: boolean
    published_at?: string | null
  },
): Promise<Article> {
  const supabase = getAdminClient()
  const payload = {
    ...(data.title !== undefined ? { title: data.title } : {}),
    ...(data.slug !== undefined ? { slug: data.slug } : {}),
    ...(data.excerpt !== undefined ? { excerpt: data.excerpt } : {}),
    ...(data.content !== undefined ? { content: data.content } : {}),
    ...(data.author !== undefined ? { author: data.author } : {}),
    ...(data.image_url !== undefined ? { image_url: data.image_url } : {}),
    ...(data.category !== undefined ? { category: data.category } : {}),
    ...(data.published !== undefined ? { published: data.published } : {}),
    ...(data.published_at !== undefined ? { published_at: data.published_at } : {}),
  }
  const { data: rows, error } = await supabase.from("articles").update(payload).eq("id", id).select("*").limit(1)
  if (error) {
    console.error("Supabase updateArticle error:", error)
    throw error
  }
  return rows?.[0] as any
}

export async function getPracticeAreas(): Promise<PracticeArea[]> {
  const supabase = getAdminClient()
  const { data, error } = await supabase
    .from("practice_areas")
    .select("*")
    .order("display_order", { ascending: true, nullsFirst: true })
  if (error) {
    console.error("Supabase getPracticeAreas error:", error)
    return []
  }
  return (data as any) || []
}

export async function getPracticeAreaBySlug(slug: string): Promise<PracticeArea | null> {
  const supabase = getAdminClient()
  const { data, error } = await supabase.from("practice_areas").select("*").eq("slug", slug).limit(1).maybeSingle()
  if (error) {
    console.error("Supabase getPracticeAreaBySlug error:", error)
    return null
  }
  return (data as any) || null
}

export async function createAppointment(data: {
  name: string
  email: string
  phone: string
  practice_area: string
  subject?: string
  message: string
  preferred_date?: string
}): Promise<Appointment> {
  const supabase = getAdminClient()
  const payload = {
    name: data.name,
    email: data.email,
    phone: data.phone,
    practice_area: data.practice_area,
    subject: data.subject || null,
    message: data.message,
    preferred_datetime: data.preferred_date || null,
    status: "pending",
  }
  const { data: rows, error } = await supabase.from("appointments").insert(payload).select("*").limit(1)
  if (error) {
    console.error("Supabase createAppointment error:", error)
    throw error
  }
  return rows?.[0] as any
}

export async function getAppointments(): Promise<Appointment[]> {
  const supabase = getAdminClient()
  const { data, error } = await supabase.from("appointments").select("*").order("created_at", { ascending: false })
  if (error) {
    console.error("Supabase getAppointments error:", error)
    return []
  }
  return (data as any) || []
}

export async function getAppointmentById(id: number): Promise<Appointment | null> {
  const supabase = getAdminClient()
  const { data, error } = await supabase.from("appointments").select("*").eq("id", id).limit(1).maybeSingle()
  if (error) {
    console.error("Supabase getAppointmentById error:", error)
    return null
  }
  return (data as any) || null
}

export async function getContactMessages(): Promise<ContactMessage[]> {
  const supabase = getAdminClient()
  const { data, error } = await supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false })
  if (error) {
    console.error("Supabase getContactMessages error:", error)
    return []
  }
  return (data as any) || []
}

export async function createContactMessage(data: {
  name: string
  email: string
  phone?: string
  subject?: string
  message: string
}): Promise<ContactMessage> {
  const supabase = getAdminClient()
  const payload = {
    name: data.name,
    email: data.email,
    phone: data.phone || null,
    subject: data.subject || null,
    message: data.message,
    status: "new",
  }
  const { data: rows, error } = await supabase.from("contact_messages").insert(payload).select("*").limit(1)
  if (error) {
    console.error("Supabase createContactMessage error:", error)
    throw error
  }
  return rows?.[0] as any
}

// Admin helpers
export async function updateAppointmentStatus(id: number, status: string): Promise<void> {
  const supabase = getAdminClient()
  const { error } = await supabase.from("appointments").update({ status }).eq("id", id)
  if (error) {
    console.error("Supabase updateAppointmentStatus error:", error)
    throw error
  }
}

export async function updateContactStatus(id: number, status: string): Promise<void> {
  const supabase = getAdminClient()
  const { error } = await supabase.from("contact_messages").update({ status }).eq("id", id)
  if (error) {
    console.error("Supabase updateContactStatus error:", error)
    throw error
  }
}

// Delete helpers
export async function deleteAppointment(id: number): Promise<void> {
  const supabase = getAdminClient()
  const { error } = await supabase.from("appointments").delete().eq("id", id)
  if (error) {
    console.error("Supabase deleteAppointment error:", error)
    throw error
  }
}

export async function deleteContactMessage(id: number): Promise<void> {
  const supabase = getAdminClient()
  const { error } = await supabase.from("contact_messages").delete().eq("id", id)
  if (error) {
    console.error("Supabase deleteContactMessage error:", error)
    throw error
  }
}
