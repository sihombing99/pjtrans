import type { MetadataRoute } from 'next'
import prisma from '@/lib/prisma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = 'https://www.pjtrans.co.id'
  const staticRoutes = ['', '/layanan', '/harga', '/tentang', '/kontak', '/detail']
  const now = new Date().toISOString()

  // build static route entries (url + lastModified)
  const staticEntries = staticRoutes.map((r) => ({
    url: base + r,
    lastModified: now,
  }))

  // fetch vehicle pages (dynamic)
  try {
   const cars = await prisma.car.findMany({ select: { id: true } })
    const carEntries = cars.map((c) => ({
      url: `${base}/detail/${c.id}`,
      lastModified: now,
    }))

    return [...staticEntries, ...carEntries]
  } catch (error) {
    console.error('Error building sitemap:', error)
    return staticEntries
  }
}
