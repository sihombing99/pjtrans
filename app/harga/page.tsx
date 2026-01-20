// File: app/harga/page.tsx

export const metadata = {
  title: "Harga & Armada | PJTrans",
  description: "Informasi Harga & Armada PJTrans – PT Portama Jaya Transportasi. Layanan sewa mobil profesional di Jabodetabek dan seluruh Indonesia.",
}
export const dynamic = "force-dynamic"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Car as CarIcon, Truck, Bus, Phone } from "lucide-react"
import Image from "next/image"
import prisma from "@/lib/prisma"

// Constants
const WHATSAPP_NUMBER = "6281315393681"
const VEHICLE_CATEGORIES = [
  { icon: CarIcon, label: "City Car", color: "text-blue-500" },
  { icon: CarIcon, label: "MPV", color: "text-green-500" },
  { icon: CarIcon, label: "SUV & Premium", color: "text-purple-500" },
  { icon: Truck, label: "Komersial", color: "text-orange-500" },
  { icon: Bus, label: "Wisata", color: "text-red-500" },
]

// Types
type Car = {
  id: number
  name: string
  price: string
  category: string
  image: string | null
}

// Utility Functions
function isContactForPrice(price: string): boolean {
  return price.toLowerCase().includes("hubungi")
}

function getPriceColor(price: string): string {
  return isContactForPrice(price) ? "text-orange-600" : "text-blue-600"
}

function buildWhatsAppMessage(carName: string): string {
  return `Halo%2C%20saya%20ingin%20cek%20ketersediaan%20mobil%20${encodeURIComponent(carName)}`
}

async function fetchCars(): Promise<Car[]> {
  try {
    const results = await prisma.car.findMany({
      orderBy: { id: "desc" },
    })

    return results.map((car) => ({
      id: car.id,
      name: car.name,
      price: car.price,
      category: car.category,
      image: car.image ?? null,
    }))
  } catch (error) {
    console.error("Error fetching cars:", error)
    return []
  }
}

// Components
function VehicleCategory({ icon: Icon, label, color }: { icon: any; label: string; color: string }) {
  return (
    <Card className="text-center">
      <CardHeader>
        <Icon className={`h-8 w-8 mx-auto ${color}`} />
        <CardTitle className="text-lg">{label}</CardTitle>
      </CardHeader>
    </Card>
  )
}

function VehicleCard({ car }: { car: Car }) {
  const contactForPrice = isContactForPrice(car.price)
  const priceColor = getPriceColor(car.price)
  const whatsappMessage = buildWhatsAppMessage(car.name)

  return (
    <Card id={String(car.id)} className="overflow-hidden">
      <div className="relative h-56 w-full">
        <Image
          src={car.image || "/placeholder.svg"}
          alt={car.name}
          fill
          unoptimized
          className="object-cover w-full h-full"
          sizes="(max-width: 768px) 100vw, 400px"
          priority={car.id <= 3}
        />
        <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full">
          <span className="text-sm font-semibold text-blue-600">PJTrans</span>
        </div>
        <div className="absolute top-16 left-4">
          <Badge variant="secondary">{car.category}</Badge>
        </div>
      </div>

      <div className="text-center mt-2 mb-1">
        <h3 className="text-xl font-bold text-gray-800">{car.name}</h3>
        <p className={`text-2xl font-bold ${priceColor} mb-2`}>{car.price}</p>
      </div>

      <CardContent className="p-8 pt-2">
        <div className="space-y-2 mt-2">
          <Button
            asChild
            className="w-full bg-green-500 hover:bg-green-600"
            size="sm"
          >
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2"
            >
              <Phone className="h-4 w-4" />
              Chat via WhatsApp
            </a>
          </Button>
          <Button
            asChild
            className="w-full bg-[#005289] hover:bg-blue-700"
            size="sm"
          >
            <a href={`/detail/${car.id}`} className="flex items-center justify-center gap-2">
              Detail Mobil
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function CategoriesSection() {
  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Pilih Armada Sesuai Kebutuhan Anda
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
        {VEHICLE_CATEGORIES.map(({ icon, label, color }) => (
          <VehicleCategory key={label} icon={icon} label={label} color={color} />
        ))}
      </div>
    </section>
  )
}

function VehiclesSection({ cars }: { cars: Car[] }) {
  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Harga Sewa Rental Armada Kami
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {cars.map((car) => (
          <VehicleCard key={car.id} car={car} />
        ))}
      </div>
    </section>
  )
}

// Main Component
export default async function HargaPage() {
  const cars = await fetchCars()

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">Armada Kami</h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Kami menyediakan berbagai pilihan armada, mulai dari city car yang ukuran ringkas dan
            lincah untuk area perkotaan, SUV yang tangguh, hingga mobil mewah untuk acara spesial
            Anda. Semua kendaraan dirawat dengan standar terbaik untuk memastikan perjalanan yang
            aman dan nyaman.
          </p>
        </div>

        <CategoriesSection />
        <VehiclesSection cars={cars} />
      </div>
    </div>
  )
}
