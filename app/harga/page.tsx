// File: app/harga/page.tsx

export const metadata = {
  title: "Harga Rental Mobil Murah Terbaik - Sewa Mobil Jakarta | PJTrans",
  description: "Lihat harga dan daftar armada rental mobil terbaik. Rental mobil murah, terpercaya, dengan berbagai pilihan. Booking mudah, harga kompetitif, sewa mobil terjangkau di PJTrans.",
  alternates: { canonical: 'https://https://pjtransindonesia.com/harga' },
  openGraph: {
    title: 'Harga Rental Mobil Murah Terbaik - Sewa Mobil Jakarta',
    description: 'Daftar lengkap armada rental mobil dengan harga terbaru. Sewa mobil berkualitas, terpercaya, dengan harga terjangkau dari PJTrans.',
    url: 'https://https://pjtransindonesia.com/harga',
    images: ['/image/logo.webp']
  },
  twitter: { card: 'summary_large_image', creator: '@pjtrans' }
}
export const dynamic = "force-dynamic"

import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Car as CarIcon, Truck, Bus, Phone } from "lucide-react"
import Image from "next/image"
import prisma from "@/lib/prisma"
import { VehicleCategoryCard } from "@/components/vehicle-card"

// Konfigurasi WhatsApp
const WHATSAPP_NUMBER = "6281315393681"

// Kategori kendaraan yang tersedia
const VEHICLE_CATEGORIES = [
  { icon: CarIcon, label: "City Car", color: "text-blue-500" },
  { icon: CarIcon, label: "MPV", color: "text-green-500" },
  { icon: CarIcon, label: "SUV & Premium", color: "text-purple-500" },
  { icon: Truck, label: "Komersial", color: "text-orange-500" },
  { icon: Bus, label: "Wisata", color: "text-red-500" },
] as const

// Type untuk data kendaraan
type Car = {
  id: number
  name: string
  price: string
  category: string
  image: string | null
  year: number | null // Change this line to allow null
  seats: number | null // Allow null for seats
  transmission?: string | null
  services?: Array<{ type: string; price: string; description: string }>
}

// Cek apakah harga adalah "Hubungi" untuk styling khusus
const getPriceColor = (price: string): string =>
  price.toLowerCase().includes("hubungi") ? "text-orange-600" : "text-blue-600"

// Generate pesan WhatsApp dengan URL encoding
const buildWhatsAppMessage = (carName: string): string =>
  `Halo%2C%20saya%20ingin%20cek%20ketersediaan%20mobil%20${encodeURIComponent(carName)}`

// Fetch semua data kendaraan dari database
async function fetchCars(): Promise<Car[]> {
  try {
    const cars = await prisma.car.findMany({
      orderBy: { id: "desc" },
      select: {
        id: true,
        name: true,
        price: true,
        category: true,
        image: true,
        year: true,
        seats: true,
        transmission: true,
        services: true
      },
    })
    return cars.map(car => ({
      ...car,
      image: car.image ?? null,
      name: car.name || "Nama tidak tersedia",
      price: car.price || "Hubungi",
      category: car.category || "Umum",
      transmission: car.transmission || null,
      year: car.year || null,
      seats: car.seats || null,
      services: car.services || []
    }))
  } catch (error) {
    console.error("Database error:", error)
    return []
  }
}

// Komponen card kendaraan dengan harga dan tombol aksi
function VehicleCard({ car }: { car: Car }) {
  const priceColor = getPriceColor(car.price)
  const whatsappMessage = buildWhatsAppMessage(car.name)

  // Ambil 2 service pertama jika ada
  const displayServices = car.services?.slice(0, 2) || []

  return (
    <Card id={String(car.id)} className="overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
      {/* Container gambar dengan hover effect */}
      <div className="relative h-40 w-full bg-gray-200 overflow-hidden group">
        <Image
          src={car.image || "/placeholder.svg"}
          alt={car.name}
          fill
          unoptimized
          loading={car.id <= 3 ? 'eager' : 'lazy'}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
          priority={car.id <= 3}
        />
        {/* Badge PJTrans */}
        <div className="absolute top-2 left-2 bg-white px-2 py-0.5 rounded-full shadow-md">
          <span className="text-xs font-semibold text-blue-600 uppercase">PJTrans</span>
        </div>
        {/* Badge kategori */}
        <div className="absolute top-2 right-2">
          <Badge variant="secondary" className="font-medium text-xs">{car.category}</Badge>
        </div>
      </div>

      {/* Info harga dan nama */}
      <div className="flex-1 flex flex-col">
        <div className="text-center p-2">
          <h3 className="text-sm font-bold text-gray-800 line-clamp-2">{car.name}</h3>
          <p className={`text-lg font-bold ${priceColor} mt-1`}>{car.price}</p>
        </div>

        {/* Info Detail Mobil: Tahun, Seat, Transmisi */}
        <div className="px-2 py-1 border-t border-gray-200 grid grid-cols-3 gap-1 text-center text-xs">
          <div>
            <p className="text-gray-600 text-xs">Tahun</p>
            <p className="font-semibold text-gray-800">{car.year || '-'}</p>
          </div>
          <div>
            <p className="text-gray-600 text-xs">Seat</p>
            <p className="font-semibold text-gray-800">{car.seats || '-'}</p>
          </div>
          <div>
            <p className="text-gray-600 text-xs">Transmisi</p>
            <p className="font-semibold text-gray-800">{car.transmission || '-'}</p>
          </div>
        </div>

        {/* Rincian Layanan - 2 service pertama */}
        {displayServices.length > 0 && (
          <div className="px-2 py-1 border-t border-gray-200 space-y-1">
            {displayServices.map((service, idx) => (
              <div key={idx} className="text-xs">
                <div className="flex justify-between items-start">
                  <span className="text-gray-700 font-medium">{service.type}</span>
                  <span className="text-blue-600 font-semibold">{service.price}</span>
                </div>
                {service.description && (
                  <p className="text-gray-500 text-xs mt-0.5">{service.description}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Tombol aksi */}
        <div className="p-2 mt-auto space-y-1 border-t border-gray-200">
          <Button
            asChild
            className="w-full bg-green-500 hover:bg-green-600 text-white font-medium text-xs py-1 h-auto"
            size="sm"
          >
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1"
            >
              <Phone className="h-3 w-3" />
              Chat WhatsApp
            </a>
          </Button>
          <Button
            asChild
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs py-1 h-auto"
            size="sm"
          >
            <a href={`/detail/${car.id}`} className="flex items-center justify-center gap-1">
              Detail Mobil
            </a>
          </Button>
        </div>
      </div>
    </Card>
  )
}

// Section kategori kendaraan
function CategoriesSection() {
  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Pilih Armada Sesuai Kebutuhan Anda</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
        {VEHICLE_CATEGORIES.map(({ label, color }) => (
          <VehicleCategoryCard key={label} label={label} color={color} />
        ))}
      </div>
    </section>
  )
}

// Section daftar kendaraan
function VehiclesSection({ cars }: { cars: Car[] }) {
  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Harga Terupdate 2026</h2>
      {cars.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-600 text-lg">Belum ada data kendaraan tersedia</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {cars.map(car => <VehicleCard key={car.id} car={car} />)}
        </div>
      )}
    </section>
  )
}

// Halaman utama - Harga & Armada
export default async function HargaPage() {
  const cars = await fetchCars()

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50/50 to-white">
      {/* CollectionPage schema with AggregateOffer for all vehicles */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Daftar Harga Rental Mobil Murah Terbaik - PJTrans',
            url: 'https://https://pjtransindonesia.com/harga',
            description: 'Daftar lengkap armada dan harga rental mobil murah terbaik dari PJTrans. Sewa mobil terpercaya, berkualitas, dengan harga terjangkau. Booking mudah untuk rental mobil harian, bulanan, dan bandara.',
            keywords: 'harga rental mobil, harga sewa mobil, rental mobil murah, rental mobil terjangkau, rental mobil terbaik, harga rental jakarta, daftar harga sewa mobil, rental mobil berkualitas',
            mainEntity: {
              '@type': 'AggregateOffer',
              'priceCurrency': 'IDR',
              'offerCount': cars.length,
              'offers': cars.slice(0, 10).map(car => ({
                '@type': 'Offer',
                'name': car.name,
                'price': car.price === 'Hubungi' ? '0' : car.price,
                'url': `https://https://pjtransindonesia.com/detail/${car.id}`,
                'availability': 'https://schema.org/InStock'
              }))
            }
          })
        }}
      />
      {/* Hero section dengan gradient biru tua */}
      <div className="relative w-full bg-gradient-to-r from-[#001E3C] via-[#003B5C] to-[#005289] text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

        <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight">Armada Kami</h1>
            <p className="text-base md:text-lg text-blue-100 leading-relaxed">
              Kami menyediakan berbagai pilihan armada, mulai dari city car yang ukuran ringkas dan lincah untuk area
              perkotaan, SUV yang tangguh, hingga mobil mewah untuk acara spesial Anda. Semua kendaraan dirawat dengan
              standar terbaik untuk memastikan perjalanan yang aman dan nyaman.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24">
        <CategoriesSection />
        <VehiclesSection cars={cars} />
      </div>
    </div>
  )
}
