// File: app/harga/page.tsx

export const metadata = {
  title: "Harga & Armada | PJTrans",
  description: "Informasi Harga & Armada PJTrans – PT Portama Jaya Transportasi. Layanan sewa mobil profesional di Jabodetabek dan seluruh Indonesia.",
}
export const dynamic = "force-dynamic"

import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Car as CarIcon, Truck, Bus, Phone } from "lucide-react"
import Image from "next/image"
import prisma from "@/lib/prisma"

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
      select: { id: true, name: true, price: true, category: true, image: true },
    })
    return cars.map(car => ({ ...car, image: car.image ?? null }))
  } catch (error) {
    console.error("Database error:", error)
    return []
  }
}

// Komponen kategori kendaraan
function VehicleCategory({ 
  icon: Icon, 
  label, 
  color 
}: { 
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  label: string
  color: string
}) {
  return (
    <Card className="text-center hover:shadow-md transition-shadow duration-200">
      <CardHeader>
        <Icon className={`h-8 w-8 mx-auto ${color}`} />
        <CardTitle className="text-lg mt-2">{label}</CardTitle>
      </CardHeader>
    </Card>
  )
}

// Komponen card kendaraan dengan harga dan tombol aksi
function VehicleCard({ car }: { car: Car }) {
  const priceColor = getPriceColor(car.price)
  const whatsappMessage = buildWhatsAppMessage(car.name)

  return (
    <Card id={String(car.id)} className="overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
      {/* Container gambar dengan hover effect */}
      <div className="relative h-56 w-full bg-gray-200 overflow-hidden group">
        <Image
          src={car.image || "/placeholder.svg"}
          alt={car.name}
          fill
          unoptimized
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={car.id <= 3}
        />
        {/* Badge PJTrans */}
        <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full shadow-md">
          <span className="text-xs font-semibold text-blue-600 uppercase">PJTrans</span>
        </div>
        {/* Badge kategori */}
        <div className="absolute top-16 left-4">
          <Badge variant="secondary" className="font-medium text-xs">{car.category}</Badge>
        </div>
      </div>

      {/* Info harga dan nama */}
      <div className="flex-1 flex flex-col">
        <div className="text-center p-4">
          <h3 className="text-lg font-bold text-gray-800 line-clamp-2">{car.name}</h3>
          <p className={`text-2xl font-bold ${priceColor} mt-2`}>{car.price}</p>
        </div>

        {/* Tombol aksi */}
        <div className="p-4 pt-0 mt-auto space-y-2">
          <Button
            asChild
            className="w-full bg-green-500 hover:bg-green-600 text-white font-medium text-sm"
            size="sm"
          >
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2"
            >
              <Phone className="h-4 w-4" />
              Chat WhatsApp
            </a>
          </Button>
          <Button
            asChild
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm"
            size="sm"
          >
            <a href={`/detail/${car.id}`} className="flex items-center justify-center gap-2">
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
        {VEHICLE_CATEGORIES.map(({ icon, label, color }) => (
          <VehicleCategory key={label} icon={icon} label={label} color={color} />
        ))}
      </div>
    </section>
  )
}

// Section daftar kendaraan
function VehiclesSection({ cars }: { cars: Car[] }) {
  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Harga Sewa Rental Armada Kami</h2>
      {cars.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-600 text-lg">Belum ada data kendaraan tersedia</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
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
      {/* Hero section dengan gradient biru tua */}
      <div className="relative w-full bg-gradient-to-r from-[#001E3C] via-[#003B5C] to-[#005289] text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight">Armada Kami</h1>
            <p className="text-base md:text-lg text-blue-100 leading-relaxed">
              Berbagai pilihan kendaraan berkualitas untuk memenuhi semua kebutuhan transportasi Anda
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
