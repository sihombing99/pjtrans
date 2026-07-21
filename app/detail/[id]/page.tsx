// File: app/detail/[id]/page.tsx

import { PrismaClient } from '@prisma/client'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, Car, FileText, Globe, Wrench, Phone } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


const prisma = new PrismaClient()

// Generate dynamic metadata per vehicle (title, description, openGraph, canonical)
export async function generateMetadata({ params }: { params: { id: string } }) {
  const id = Number(params.id)
  if (isNaN(id)) {
    return {
      title: 'Detail Mobil - PJTrans',
      description: 'Detail kendaraan di PJTrans.'
    }
  }

  const car = await prisma.car.findUnique({ where: { id } })
  if (!car) {
    return {
      title: 'Mobil Tidak Ditemukan | PJTrans',
      description: 'Mobil yang Anda cari tidak ditemukan.'
    }
  }

  const title = `${car.name} — Sewa Mobil | PJTrans`
  const description = (car.content && String(car.content).slice(0, 150)) || `Detail harga dan spesifikasi ${car.name} dari PJTrans.`

  return {
    title,
    description,
    alternates: { canonical: `https://https://pjtransindonesia.com/detail/${id}` },
    openGraph: {
      title,
      description,
      url: `https://https://pjtransindonesia.com/detail/${id}`,
      images: [car.image || '/image/logo.webp']
    },
    twitter: { card: 'summary_large_image', creator: '@pjtrans' }
  }
}

// Fungsi ini berjalan di server untuk mengambil data
async function getCarDetails(id: number) {
  try {
    const car = await prisma.car.findUnique({
      where: { id },
      include: {
        services: true, // Ambil juga semua layanan yang terhubung
      },
    })
    return car
  } catch (error) {
    console.error("Gagal mengambil detail mobil:", error);
    return null;
  }
}

// Komponen Halaman Detail (Server Component)
export default async function DetailPage({ params }: { params: { id: string } }) {
  const carId = parseInt(params.id, 10);

  if (isNaN(carId)) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h1 className="text-2xl font-bold">ID Mobil Tidak Valid.</h1>
      </div>
    )
  }

  const car = await getCarDetails(carId);

  // Jika mobil tidak ditemukan
  if (!car) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h1 className="text-2xl font-bold">Mobil tidak ditemukan.</h1>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* BreadcrumbList structured data */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            'itemListElement': [
              {
                '@type': 'ListItem',
                'position': 1,
                'name': 'Beranda',
                'item': 'https://https://pjtransindonesia.com'
              },
              {
                '@type': 'ListItem',
                'position': 2,
                'name': 'Armada',
                'item': 'https://https://pjtransindonesia.com/harga'
              },
              {
                '@type': 'ListItem',
                'position': 3,
                'name': car.name,
                'item': `https://https://pjtransindonesia.com/detail/${car.id}`
              }
            ]
          })
        }}
      />
      {/* Product structured data for this vehicle */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: car.name,
            image: [car.image || '/image/logo.webp'],
            description: car.content || `Sewa ${car.name} dari PJTrans. Hubungi untuk booking.`,
            sku: String(car.id),
            brand: { '@type': 'Brand', name: 'PJTrans' },
            category: car.category,
            offers: {
              '@type': 'Offer',
              url: `https://https://pjtransindonesia.com/detail/${car.id}`,
              price: car.price || 'Hubungi',
              priceCurrency: 'IDR',
              availability: 'https://schema.org/InStock'
            }
          })
        }}
      />

      {/* --- HERO SECTION MODERN FULL-WIDTH --- */}
      <div className="relative w-full bg-gradient-to-r from-[#001E3C] via-[#003B5C] to-[#005289] text-white overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

        <div className="w-full px-4 py-6 md:py-8 relative z-10">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-8 items-center">

              {/* Kolom Gambar - Modern Landscape */}
              <div className="lg:col-span-3">
                <div className="relative w-full h-[350px] lg:h-[400px] rounded-2xl overflow-hidden shadow-2xl group backdrop-blur-xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent z-10"></div>
                  <Image
                    src={car.image || "/placeholder.svg"}
                    alt={car.name}
                    fill
                    unoptimized
                    loading="lazy"
                    className="object-cover object-left transition-transform duration-700 group-hover:scale-110 drop-shadow-2xl"
                  />
                </div>
              </div>

              {/* Kolom Detail - Modern Typography */}
              <div className="lg:col-span-2 flex flex-col justify-center space-y-3">
                <div className="space-y-1">
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-xs font-semibold text-white/90 uppercase tracking-widest">
                    {car.category}
                  </span>
                </div>

                <div className="space-y-2">
                  <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-none drop-shadow-xl">
                    {car.name}
                  </h1>
                  <div className="h-1 w-20 bg-gradient-to-r from-green-400 to-green-300 rounded-full"></div>
                </div>

                <div className="space-y-1">
                  <p className="text-white/70 text-sm font-medium uppercase tracking-wider">Mulai Dari</p>
                  <p className="text-3xl md:text-4xl font-bold drop-shadow-lg">
                    {car.price}
                  </p>
                </div>

                {car.content && (
                  <div className="space-y-2 pt-2">
                    <p className="text-white/80 leading-relaxed text-xs md:text-sm font-medium">
                      {car.content}
                    </p>
                  </div>
                )}

                {/* Modern CTA Button */}
                <div className="pt-3">
                  <Button asChild className="group/btn relative bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-gray-900 font-bold rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 w-full md:w-auto px-6 py-2 text-sm">
                    <a href={`https://wa.me/6281315393681?text=Halo%2C%20saya%20ingin%20booking%20${encodeURIComponent(car.name)}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                      <Phone className="h-4 w-4 group-hover/btn:scale-110 transition-transform" />
                      <span>Chat Sekarang</span>
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- SISA KONTEN HALAMAN MODERN --- */}
      <div className="bg-gray-50/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-16 md:py-24">
          {/* Rincian Harga Section */}
          <div className="max-w-5xl mx-auto mb-20">
            <div className="space-y-2 mb-12">
              <h2 className="text-4xl font-bold text-gray-900">Rincian Harga Sewa</h2>
              <div className="h-1 w-16 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"></div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-300">
                      <th className="py-4 px-4 text-left font-bold text-gray-800 uppercase tracking-wider text-sm">Tipe Layanan</th>
                      <th className="py-4 px-4 text-left font-bold text-gray-800 uppercase tracking-wider text-sm">Harga</th>
                      <th className="py-4 px-4 text-left font-bold text-gray-800 uppercase tracking-wider text-sm">Keterangan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {car.services && car.services.length > 0 ? (
                      car.services.map((service) => (
                        <tr key={service.id} className="border-b border-gray-200 last:border-b-0 hover:bg-blue-50/50 transition-colors">
                          <td className="py-4 px-4 font-semibold text-gray-800">{service.type}</td>
                          <td className="py-4 px-4 font-bold text-blue-600 text-lg">{service.price}</td>
                          <td className="py-4 px-4 text-gray-600">{service.description}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={3} className="py-8 px-4 text-center text-gray-500">
                          Rincian harga untuk mobil ini belum tersedia.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Syarat & Ketentuan Section */}
          <div className="max-w-5xl mx-auto mb-20">
            <div className="space-y-2 mb-12">
              <h2 className="text-4xl font-bold text-gray-900">Syarat & Ketentuan</h2>
              <div className="h-1 w-16 bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full"></div>
            </div>

            <Card className="shadow-lg border-none bg-white hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <ul className="space-y-4">
                  <li className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-100">
                        <span className="text-sm font-bold text-yellow-600">1</span>
                      </div>
                    </div>
                    <p className="text-gray-700 font-medium">Pemesanan armada wajib dilakukan maksimal H-1 (satu hari sebelum keberangkatan).</p>
                  </li>
                  <li className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-100">
                        <span className="text-sm font-bold text-yellow-600">2</span>
                      </div>
                    </div>
                    <p className="text-gray-700 font-medium">Durasi sewa harian dihitung per tanggal (00:00 - 23:59), bukan 24 jam dari waktu mulai.</p>
                  </li>
                  <li className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-100">
                        <span className="text-sm font-bold text-yellow-600">3</span>
                      </div>
                    </div>
                    <p className="text-gray-700 font-medium">Biaya overtime (kelebihan waktu sewa) adalah 10% dari harga sewa per jam.</p>
                  </li>
                  <li className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-100">
                        <span className="text-sm font-bold text-yellow-600">4</span>
                      </div>
                    </div>
                    <p className="text-gray-700 font-medium">Pembatalan pada hari-H akan dikenakan denda sebesar 50% dari total biaya sewa.</p>
                  </li>
                  <li className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-100">
                        <span className="text-sm font-bold text-yellow-600">5</span>
                      </div>
                    </div>
                    <p className="text-gray-700 font-medium">Harga sewa dengan supir belum termasuk biaya BBM, tol, parkir, dan akomodasi supir (jika keluar kota).</p>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* FAQ Section */}
          <div className="max-w-5xl mx-auto mb-20">
            {/* FAQPage schema */}
            <script
              type="application/ld+json"
              suppressHydrationWarning
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  '@context': 'https://schema.org',
                  '@type': 'FAQPage',
                  'mainEntity': [
                    {
                      '@type': 'Question',
                      'name': 'Dokumen apa saja yang diperlukan untuk sewa lepas kunci?',
                      'acceptedAnswer': {
                        '@type': 'Answer',
                        'text': 'Untuk sewa lepas kunci, kami memerlukan KTP, SIM A yang masih berlaku, dan bukti domisili (seperti tagihan listrik/air). Dokumen tambahan mungkin diperlukan untuk verifikasi lebih lanjut.'
                      }
                    },
                    {
                      '@type': 'Question',
                      'name': 'Apakah bisa sewa untuk perjalanan luar kota?',
                      'acceptedAnswer': {
                        '@type': 'Answer',
                        'text': 'Tentu saja. Kami melayani perjalanan untuk dalam dan luar kota. Mohon informasikan destinasi Anda saat melakukan pemesanan agar kami dapat memberikan penawaran terbaik, termasuk estimasi akomodasi untuk supir.'
                      }
                    },
                    {
                      '@type': 'Question',
                      'name': 'Bagaimana jika terjadi kerusakan pada mobil saat disewa?',
                      'acceptedAnswer': {
                        '@type': 'Answer',
                        'text': 'Harap segera hubungi tim kami jika terjadi kendala atau kerusakan. Kami akan memberikan panduan dan bantuan secepatnya. Untuk kerusakan ringan akibat kelalaian penyewa, biaya perbaikan akan dibebankan kepada penyewa.'
                      }
                    },
                    {
                      '@type': 'Question',
                      'name': 'Apakah tersedia layanan antar-jemput mobil di bandara?',
                      'acceptedAnswer': {
                        '@type': 'Answer',
                        'text': 'Ya, kami menyediakan layanan antar-jemput kendaraan di Bandara Soekarno-Hatta, Halim Perdanakusuma, dan lokasi lain di Jabodetabek sesuai kesepakatan.'
                      }
                    }
                  ]
                })
              }}
            />
            <div className="space-y-2 mb-12">
              <h2 className="text-4xl font-bold text-gray-900">Pertanyaan Umum</h2>
              <div className="h-1 w-16 bg-gradient-to-r from-purple-600 to-purple-400 rounded-full"></div>
            </div>

            <Accordion type="single" collapsible className="w-full space-y-3">
              <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
                <AccordionItem value="item-1" className="border-0">
                  <AccordionTrigger className="font-semibold text-lg text-gray-900 hover:no-underline px-6 py-4">Dokumen apa saja yang diperlukan untuk sewa lepas kunci?</AccordionTrigger>
                  <AccordionContent className="text-gray-600 px-6 pb-4 pt-2">
                    Untuk sewa lepas kunci, kami memerlukan KTP, SIM A yang masih berlaku, dan bukti domisili (seperti tagihan listrik/air). Dokumen tambahan mungkin diperlukan untuk verifikasi lebih lanjut.
                  </AccordionContent>
                </AccordionItem>
              </Card>

              <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
                <AccordionItem value="item-2" className="border-0">
                  <AccordionTrigger className="font-semibold text-lg text-gray-900 hover:no-underline px-6 py-4">Apakah bisa sewa untuk perjalanan luar kota?</AccordionTrigger>
                  <AccordionContent className="text-gray-600 px-6 pb-4 pt-2">
                    Tentu saja. Kami melayani perjalanan untuk dalam dan luar kota. Mohon informasikan destinasi Anda saat melakukan pemesanan agar kami dapat memberikan penawaran terbaik, termasuk estimasi akomodasi untuk supir.
                  </AccordionContent>
                </AccordionItem>
              </Card>

              <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
                <AccordionItem value="item-3" className="border-0">
                  <AccordionTrigger className="font-semibold text-lg text-gray-900 hover:no-underline px-6 py-4">Bagaimana jika terjadi kerusakan pada mobil saat disewa?</AccordionTrigger>
                  <AccordionContent className="text-gray-600 px-6 pb-4 pt-2">
                    Harap segera hubungi tim kami jika terjadi kendala atau kerusakan. Kami akan memberikan panduan dan bantuan secepatnya. Untuk kerusakan ringan akibat kelalaian penyewa, biaya perbaikan akan dibebankan kepada penyewa.
                  </AccordionContent>
                </AccordionItem>
              </Card>

              <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
                <AccordionItem value="item-4" className="border-0">
                  <AccordionTrigger className="font-semibold text-lg text-gray-900 hover:no-underline px-6 py-4">Apakah tersedia layanan antar-jemput mobil di bandara?</AccordionTrigger>
                  <AccordionContent className="text-gray-600 px-6 pb-4 pt-2">
                    Ya, kami menyediakan layanan antar-jemput kendaraan di Bandara Soekarno-Hatta, Halim Perdanakusuma, dan lokasi lain di Jabodetabek sesuai kesepakatan.
                  </AccordionContent>
                </AccordionItem>
              </Card>
            </Accordion>
          </div>

          {/* CTA Final Section */}
          <div className="max-w-4xl mx-auto">
            <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-16 px-8 rounded-3xl shadow-2xl overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

              <div className="relative z-10 text-center space-y-6">
                <h3 className="text-4xl md:text-5xl font-black">Siap untuk Perjalanan Anda?</h3>
                <p className="text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed">
                  Booking <span className="font-bold text-white">{car.name}</span> sekarang juga. Tim kami siap membantu Anda 24 jam untuk memastikan perjalanan Anda aman, nyaman, dan berkesan.
                </p>
                <Button asChild size="lg" className="bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-gray-900 font-bold text-lg rounded-full shadow-lg hover:shadow-2xl transition-all px-8 py-3">
                  <a href="https://wa.me/6281315393681" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                    <Phone className="h-5 w-5" /> Hubungi via WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
