export const metadata = { 
  title: "Beranda | PJTrans", 
  description: "Informasi PJTrans – PT Portama Jaya Transportasi. Layanan sewa mobil profesional di Jabodetabek dan seluruh Indonesia." 
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

const services = [
  {
    icon: <Car className="h-12 w-12 text-blue-500" />,
    title: "Rental Mobil",
    description: "Sewa mobil dengan harga terjangkau",
    features: ["Berbagai pilihan kendaraan", "Harga kompetitif", "Proses cepat"]
  },
  {
    icon: <Users className="h-12 w-12 text-green-500" />,
    title: "Layanan Sopir",
    description: "Sopir profesional berpengalaman",
    features: ["Sopir terlatih", "Berseragam rapi", "Ramah dan sopan"]
  },
  {
    icon: <MapPin className="h-12 w-12 text-orange-500" />,
    title: "Layanan Nasional",
    description: "Melayani seluruh Indonesia",
    features: ["Jangkauan luas", "Layanan 24/7", "Responsif"]
  },
  {
    icon: <Clock className="h-12 w-12 text-teal-500" />,
    title: "Sewa Harian",
    description: "6–24 jam, cocok untuk kegiatan singkat",
    features: ["Fleksibel waktu", "Cocok untuk acara", "Harga kompetitif"]
  },
  {
    icon: <Building className="h-12 w-12 text-purple-500" />,
    title: "Sewa Bulanan",
    description: "Untuk operasional kantor atau perusahaan",
    features: ["Hemat biaya", "Kontrak jangka panjang", "Maintenance included"]
  },
  {
    icon: <Plane className="h-12 w-12 text-red-500" />,
    title: "Antar Jemput Bandara",
    description: "Layanan antar jemput bandara domestik & internasional",
    features: ["24/7 service", "Flight tracking", "Meet & greet"]
  }
]

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
      

      {/* Our Advantages */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        <section className="py-8 bg-white"> 
        <div className="container mx-auto px-4">
          {/* Available Services */}
          <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">Layanan yang Tersedia</h2>
            <div className="grid md:grid-cols-4 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {services.slice(0, 4).map((s, i) => (
                <ServiceCard key={i} icon={s.icon} title={s.title} description={s.description} features={s.features} />
              ))}
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-6xl mx-auto mt-6">
              {services.slice(4, 6).map((s, i) => (
                <ServiceCard key={i} icon={s.icon} title={s.title} description={s.description} features={s.features} />
              ))}
            </div>
          </section>
        </div>
      </section>
      
         <section className="py-8 bg-white"> 
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">Keunggulan Kami</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              <Card className="text-center">
                <CardHeader>
                  <Car className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                  <CardTitle>Armada Lengkap</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Dari mobil ekonomis hingga mobil premium tersedia untuk disewa.</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardHeader>
                  <Shield className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <CardTitle>Kondisi Terawat</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Semua kendaraan dirawat berkala dan siap digunakan kapan saja.</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardHeader>
                  <Users className="h-12 w-12 text-purple-500 mx-auto mb-4" />
                  <CardTitle>Sopir Profesional</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Pengemudi kami terlatih, berpengalaman, dan bersikap sopan.</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardHeader>
                  <CheckCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                  <CardTitle>Legalitas Resmi</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Perusahaan terdaftar secara hukum dan terpercaya.</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardHeader>
                  <MapPin className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                  <CardTitle>Layanan Nasional</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Melayani hampir seluruh kota besar di Indonesia.</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardHeader>
                  <Clock className="h-12 w-12 text-teal-500 mx-auto mb-4" />
                  <CardTitle>🕒 Layanan Cepat</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Respon cepat, booking mudah, dan layanan 24/7.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

      {/* Our Fleet Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">Armada Kami</h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Kami menyediakan berbagai pilihan armada, mulai dari city car yang ukuran ringkas dan lincah untuk area
              perkotaan, SUV yang tangguh, hingga mobil mewah untuk acara spesial Anda. Semua kendaraan dirawat dengan
              standar terbaik untuk memastikan perjalanan yang aman dan nyaman.
            </p>
          </div>

          {/* Vehicles grid using VehicleCard component */}
          <VehiclesSection cars={cars} />

          <div className="text-center mt-8">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Link href="/harga">Lihat Semua Armada & Harga Lengkap</Link>
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
      </div>
    </div>
  )
}
