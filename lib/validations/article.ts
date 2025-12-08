export function validateArticleData(data: any) {
  // İsteğiniz doğrultusunda sunucu tarafı uzunluk kısıtları kaldırıldı.
  // Yalnızca genel geçer doğrulama istemiyorsanız her zaman geçerli döndürürüz.
  return { isValid: true, errors: [] as string[] }
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}
