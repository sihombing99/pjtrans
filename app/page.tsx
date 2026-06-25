export const metadata = {
  title: "Rental Mobil Murah Terbaik Jakarta - PJTrans | Sewa Mobil Terpercaya",
  description: "Rental mobil murah terbaik dengan sopir profesional atau lepas kunci. PJTrans: sewa mobil terpercaya, armada berkualitas, harga terjangkau, melayani 80+ kota Indonesia.",
  alternates: { canonical: 'https://pjtrans.co.id/' },
  openGraph: {
    title: 'Rental Mobil Murah Terbaik Jakarta - PJTrans',
    description: 'Sewa mobil harian, bulanan, rental mobil bandara dari PJTrans. Rental mobil terpercaya dengan sopir profesional dan harga kompetitif.',
    url: 'https://pjtrans.co.id/',
    images: ['/image/logo.webp']
  },
  twitter: { card: 'summary_large_image', creator: '@pjtrans' }
}
export const dynamic = "force-dynamic"

import React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Car, Shield, Users, MapPin, Clock, Star, Building, Plane, CheckCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import prisma from "@/lib/prisma"
import { VehiclesSection, CategoriesSection } from "@/components/vehicle-card"
import { Slideshow } from "@/components/slideshow"
import { VehicleCategoryCard } from "@/components/vehicle-card"
import { Car as CarIcon, Truck, Bus, Phone } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import ServiceCard from "@/components/service-card"

// Type definition for Car with Services
type Car = {
  id: number;
  name: string;
  price: string;
  category: string;
  year: number|null;
  seats: number| null;
  transmission: string;
  image: string | null;
  services: Array<{
    id: number;
    type: string;
    price: string;
    description: string;
  }>;
};


// Kategori kendaraan yang tersedia
const VEHICLE_CATEGORIES = [
  { icon: CarIcon, label: "City Car", color: "text-blue-500" },
  { icon: CarIcon, label: "MPV", color: "text-green-500" },
  { icon: CarIcon, label: "SUV & Premium", color: "text-purple-500" },
  { icon: Truck, label: "Komersial", color: "text-orange-500" },
  { icon: Bus, label: "Wisata", color: "text-red-500" },
] as const

// Daftar kota layanan
const SERVICE_CITIES = [
  "Jakarta", "Bandung", "Yogyakarta", "Surabaya", "Denpasar",
  "Medan", "Makassar", "Palembang", "Pekanbaru", "Semarang",
  "Malang", "Solo", "Balikpapan", "Banjarmasin", "Pontianak",
  "Manado", "Padang", "Jambi", "Lampung", "Batam",
  "Bekasi", "Tangerang", "Depok", "Bogor", "Cirebon",
  "Tasikmalaya", "Purwokerto", "Tegal", "Kudus", "Salatiga",
  "Magelang", "Klaten", "Wonogiri", "Pacitan", "Blitar",
  "Kediri", "Jember", "Banyuwangi", "Probolinggo", "Pasuruan",
  "Sidoarjo", "Gresik", "Lamongan", "Tuban", "Bojonegoro",
  "Ngawi", "Madiun", "Ponorogo", "Trenggalek", "Tulungagung",
]

// Grid badge kota-kota layanan
function ServiceCitiesBadges() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 max-h-96 overflow-y-auto">
      {SERVICE_CITIES.map(city => (
        <Badge key={city} variant="outline" className="justify-center p-2 text-xs">
          {city}
        </Badge>
      ))}
    </div>
  )
}

export default async function HomePage() {
  let cars: Car[] = []

  try {
    const results = await prisma.car.findMany({
      include: {
        services: true,
      },
      orderBy: { id: "desc" },
      take: 12, // Show up to 12 cars on homepage
    })

    cars = results.map((car) => ({
      id: car.id,
      name: car.name,
      price: car.price,
      category: car.category,
      year: car.year,
      seats: car.seats,
      transmission: car.transmission,
      image: car.image ?? null,
      services: car.services,
    }))
  } catch (error) {
    console.error("Error fetching cars:", error)
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-150 w-full flex items-center justify-center bg-gradient-to-r from-slate-300 to-slate-00 overflow-hidden">
        <Slideshow />
      </section>

      {/* Slideshow Section */}
      

      
      {/* Our Fleet Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Pilih Kendaraan Sesuai Kebutuhan Anda</h2>
           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
            {VEHICLE_CATEGORIES.map(({ label, color }) => (
            <VehicleCategoryCard key={label} label={label} color={color} />
          ))}
        </div>
          </div>
      </section>

<section className="py-16 bg-white">
        <div className="container mx-auto px-4">        
          {/* Vehicles grid using VehicleCard component */}
          <VehiclesSection cars={cars} />

          <div className="text-center mt-8">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Link href="/harga">Lihat Semua kendaraan & Harga Lengkap</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">Galeri Foto</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <div className="relative h-64 rounded-lg overflow-hidden">
              <Image
                src="/image/Mobilbersih.png?height=600&width=600"
                alt="Mobil dalam kondisi bersih dan siap jalan"
                fill
                loading="lazy"
                className="object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-4">
                <p className="font-semibold">Mobil dalam kondisi bersih dan siap jalan</p>
              </div>
            </div>
            <div className="relative h-64 rounded-lg overflow-hidden">
              <Image
                src="/image/supir.png?height=400&width=600"
                alt="Tim sopir profesional berseragam"
                fill
                loading="lazy"
                className="object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-4">
                <p className="font-semibold">Tim sopir profesional berseragam</p>
              </div>
            </div>
            <div className="relative h-64 rounded-lg overflow-hidden">
              <Image
                src="/image/bandara.png?height=400&width=600"
                alt="Layanan antar-jemput bandara"
                fill
                loading="lazy"
                className="object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-4">
                <p className="font-semibold">Layanan antar-jemput bandara</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      

      {/* Our Partners */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">Mitra Kami</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-8 max-w-6xl mx-auto items-center">
            <div className="flex justify-center">
              <Image
                src="/image/purbajayaproperti.png?height=100&width=200&text=Partner+1"
                alt="Partner 1"
                width={200}
                height={100}
                //className="object-contain grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
            <div className="flex justify-center">
              <Image
                src="/image/purbajayaenergi.png?height=100&width=200&text=Partner+2"
                alt="Partner 2"
                width={200}
                height={100}
                //className="object-contain grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
            <div className="flex justify-center">
              <Image
                src="/image/gardatama logo.png?height=100&width=200&text=Partner+3"
                alt="Partner 3"
                width={200}
                height={100}
               //className="object-contain grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
             <div className="flex justify-center">
              <Image
                src="/image/mitra2.png?height=100&width=200&text=Partner+3"
                alt="Partner 3"
                width={200}
                height={100}
               //className="object-contain grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>

            <div className="flex justify-center">
              <Image
                src="/image/mitra1.jpg?height=100&width=200&text=Partner+4"
                alt="Partner 4"
                width={200}
                height={100}
                //className="object-contain grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
            <div className="flex justify-center">
              <Image
                src="/image/LOGO-PN-DEPOK.png?height=100&width=200&text=Partner+5"
                alt="Partner 5"
                width={200}
                height={100}
                //className="object-contain grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
          </div>
          <p className="text-center text-gray-600 mt-8 max-w-3xl mx-auto">
            Kami bangga bekerja sama dengan berbagai perusahaan terpercaya untuk memberikan layanan transportasi terbaik
            bagi Anda.
          </p>
        </div>
      </section>
      {/* Section area layanan */}
              <section className="mb-16">
                <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Area Layanan</h2>
                <Card className="max-w-6xl mx-auto">
                  <CardHeader className="text-center">
                    <CardTitle>Kami Melayani 80+ Kota Besar di Indonesia</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ServiceCitiesBadges />
                    <div className="mt-6 text-center space-y-3">
                      <p className="text-gray-600">Tidak menemukan kota Anda?</p>
                      <Button asChild variant="outline" className="w-full">
                        <a href={`https://wa.me/6281315393681?text=Halo, saya ingin menanyakan ketersediaan layanan...`} target="_blank" rel="noopener noreferrer">
                          Tanyakan Ketersediaan Layanan
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </section>
      </div>
    
  )
}
