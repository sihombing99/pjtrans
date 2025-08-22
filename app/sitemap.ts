import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://www.pjtrans.co.id'
  const routes = ['', '/layanan', '/harga', '/tentang', '/kontak']
  const now = new Date().toISOString()
  return routes.map((r) => ({
    url: base + r,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: r === '' ? 1 : 0.8
  }))
}
