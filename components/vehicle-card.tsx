"use client"
import React, { useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Phone, Car, Users, MapPin, Clock, Shield, Truck, Bus } from "lucide-react"

type Service = { id: number; type: string; price: string; description?: string }
export type CarType = {
  id: number
  name: string
  price: string
  category: string
  year: number | null
  seats: number | null
  transmission: string
  image: string | null
  services?: Service[]
}

const WHATSAPP_NUMBER = "6281315393681"

function buildWhatsAppMessage(name: string) {
  return encodeURIComponent(`Halo, saya tertarik menyewa ${name}. Apakah masih tersedia dan berapa harga sewa?`)
}

// Versi statis untuk grid kategori di harga/page dan app/page
// Hanya terima data plain (string, bukan component)
export function VehicleCategoryCard({ 
  label, 
  color 
}: { 
  label: string
  color: string
}) {
  // Icon mapping berdasarkan label
  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    "City Car": Car,
    "SUV": Users,
    "Shuttle": MapPin,
    "Hourly": Clock,
    "Corporate": Shield,
  }
  
  const IconComponent = iconMap[label] || Car
  
  return (
    <Card className="text-center hover:shadow-md transition-shadow duration-200">
      <CardHeader>
        <IconComponent className={`h-8 w-8 mx-auto ${color}`} />
        <CardTitle className="text-lg mt-2">{label}</CardTitle>
      </CardHeader>
    </Card>
  )
}

// Versi interaktif untuk filter di FilterableVehicles
export function VehicleCategory({
  icon,
  label,
  active = false,
  onClick,
}: {
  icon: React.ReactNode
  label: string
  active?: boolean
  onClick?: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`flex flex-col items-center gap-2 p-3 rounded-lg border transition transform ${
        active ? "ring-2 ring-blue-500 scale-105" : "hover:shadow-sm"
      } bg-white`}
    >
      <div className={`p-2 bg-white rounded-md shadow-sm ${active ? "scale-110" : ""}`}>{icon}</div>
      <div className={`text-xs font-medium text-gray-800 ${active ? "font-semibold" : ""}`}>{label}</div>
    </button>
  )
}

export default function VehicleCard({ car }: { car: CarType }) {
  const whatsappMessage = buildWhatsAppMessage(car.name)
  const displayServices = car.services?.slice(0, 2) ?? []

  return (
    <Card id={String(car.id)} className="overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
      <div className="relative h-40 w-full bg-gray-200 overflow-hidden group">
        <Image
          src={car.image || "/placeholder.svg"}
          alt={car.name}
          fill
          unoptimized
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <div className="absolute top-2 left-2 bg-white px-2 py-0.5 rounded-full shadow-md">
          <span className="text-xs font-semibold text-blue-600 uppercase">PJTrans</span>
        </div>
        <div className="absolute top-2 right-2">
          <Badge variant="secondary" className="font-medium text-xs">{car.category}</Badge>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="text-center p-2">
          <h3 className="text-sm font-bold text-gray-800 line-clamp-2">{car.name}</h3>
          <p className="text-lg font-bold text-blue-600 mt-1">{car.price}</p>
        </div>

        <div className="px-2 py-1 border-t border-gray-200 grid grid-cols-3 gap-1 text-center text-xs">
          <div>
            <p className="text-gray-600 text-xs">Tahun</p>
            <p className="font-semibold text-gray-800">{car.year ?? "-"}</p>
          </div>
          <div>
            <p className="text-gray-600 text-xs">Seat</p>
            <p className="font-semibold text-gray-800">{car.seats ?? "-"}</p>
          </div>
          <div>
            <p className="text-gray-600 text-xs">Transmisi</p>
            <p className="font-semibold text-gray-800">{car.transmission ?? "-"}</p>
          </div>
        </div>

        {displayServices.length > 0 && (
          <div className="px-2 py-1 border-t border-gray-200 space-y-1">
            {displayServices.map((service) => (
              <div key={service.id} className="text-xs">
                <div className="flex justify-between items-start">
                  <span className="text-gray-700 font-medium">{service.type}</span>
                  <span className="text-blue-600 font-semibold">{service.price}</span>
                </div>
                {service.description && <p className="text-gray-500 text-xs mt-0.5">{service.description}</p>}
              </div>
            ))}
          </div>
        )}

        <div className="p-2 mt-auto space-y-1 border-t border-gray-200">
          <Button asChild className="w-full bg-green-500 hover:bg-green-600 text-white font-medium text-xs py-1 h-auto" size="sm">
            <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${buildWhatsAppMessage(car.name)}`} target="_blank" rel="noopener noreferrer">
              Chat WhatsApp
            </a>
          </Button>
          <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs py-1 h-auto" size="sm">
            <Link href={`/detail/${car.id}`}>Detail Mobil</Link>
          </Button>
        </div>
      </div>
    </Card>
  )
}

const VEHICLE_CATEGORIES = [
  { icon: Car, label: "City Car", color: "bg-blue-50" },
  { icon: Users, label: "SUV", color: "bg-green-50" },
  { icon: MapPin, label: "Shuttle", color: "bg-orange-50" },
  { icon: Clock, label: "Hourly", color: "bg-teal-50" },
  { icon: Shield, label: "Corporate", color: "bg-purple-50" },
]

export function FilterableVehicles({ cars }: { cars: CarType[] }) {
  const [selected, setSelected] = useState<string>("All")

  const availableCategories = useMemo(() => {
    const base = VEHICLE_CATEGORIES.map((c) => c.label)
    const fromCars = Array.from(new Set(cars.map((c) => c.category).filter(Boolean)))
    return ["All", ...base, ...fromCars.filter((c) => !base.includes(c))]
  }, [cars])

  const filteredCars = useMemo(() => {
    if (selected === "All") return cars
    return cars.filter((c) => (c.category || "").toLowerCase() === selected.toLowerCase())
  }, [cars, selected])

  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Harga Terupdate 2026</h2>

      <div className="flex gap-3 flex-wrap justify-center mb-6">
        {availableCategories.map((cat) => {
          const meta = VEHICLE_CATEGORIES.find((v) => v.label === cat)
          const IconComponent = meta?.icon || Car
          return (
            <VehicleCategory
              key={cat}
              icon={<IconComponent className="h-4 w-4" />}
              label={cat}
              active={selected === cat}
              onClick={() => setSelected(cat)}
            />
          )
        })}
      </div>

      {filteredCars.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-600 text-lg">Belum ada data kendaraan tersedia untuk kategori ini</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {filteredCars.map((car) => (
            <VehicleCard key={car.id} car={car} />
          ))}
        </div>
      )}
    </section>
  )
}

export function CategoriesSection() {
  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Pilih Armada Sesuai Kebutuhan Anda</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
        {VEHICLE_CATEGORIES.map((c) => {
          const IconComponent = c.icon
          return (
            <div key={c.label} className="flex flex-col items-center gap-2 p-3 rounded-lg bg-white border hover:shadow-md transition-shadow duration-200">
              <div className="p-2 bg-white rounded-md shadow-sm">
                <IconComponent className="h-4 w-4" />
              </div>
              <div className="text-xs font-medium text-gray-800">{c.label}</div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export function VehiclesSection({ cars }: { cars: CarType[] }) {
  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Harga Terupdate 2026</h2>
      {cars.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-600 text-lg">Belum ada data kendaraan tersedia</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {cars.map((car) => (
            <VehicleCard key={car.id} car={car} />
          ))}
        </div>
      )}
    </section>
  )
}