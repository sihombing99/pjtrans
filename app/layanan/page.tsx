"use client";

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, Car, Users, Plane, MapPin, Building, Star, Globe } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function LayananPage() {

  const [premiumCars, setPremiumCars] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPremiumCars = async () => {
      try {
        const response = await fetch('/api/cars?category=premium')
        const data = await response.json()
        setPremiumCars(data.slice(0, 6))
      } catch (error) {
        console.error('Error fetching premium cars:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchPremiumCars()
  }, [])

  const services = [
    {
      title: "Sewa Harian",
      description: "6–24 jam, cocok untuk kegiatan singkat",
      icon: <Clock className="h-8 w-8 text-blue-500" />,
      features: ["Fleksibel waktu", "Cocok untuk acara", "Harga kompetitif"],
    },
    {
      title: "Sewa Bulanan",
      description: "Untuk operasional kantor atau perusahaan",
      icon: <Building className="h-8 w-8 text-green-500" />,
      features: ["Hemat biaya", "Kontrak jangka panjang", "Maintenance included"],
    },
    {
      title: "Lepas Kunci",
      description: "Untuk pengguna yang ingin menyetir sendiri",
      icon: <Car className="h-8 w-8 text-purple-500" />,
      features: ["Kebebasan berkendara", "Tanpa sopir", "Minimal 3 hari"],
    },
    {
      title: "Dengan Sopir",
      description: "Dapatkan sopir profesional & ramah",
      icon: <Users className="h-8 w-8 text-orange-500" />,
      features: ["Sopir berpengalaman", "Sopan & ramah", "Tahu rute terbaik"],
    },
    {
      title: "Bandara",
      description: "Antar jemput bandara domestik & internasional",
      icon: <Plane className="h-8 w-8 text-red-500" />,
      features: ["24/7 service", "Flight tracking", "Meet & greet"],
    },
    {
      title: "Wisata",
      description: "Cocok untuk keluarga & perjalanan luar kota",
      icon: <MapPin className="h-8 w-8 text-teal-500" />,
      features: ["Paket wisata", "Guide lokal", "Rute terbaik"],
    },
  ]

  const [showAll, setShowAll] = useState(false)
  const serviceCities = [
    "Jakarta",
    "Bandung",
    "Yogyakarta",
    "Surabaya",
    "Denpasar",
    "Medan",
    "Makassar",
    "Palembang",
    "Pekanbaru",
    "Semarang",
    "Malang",
    "Solo",
    "Balikpapan",
    "Banjarmasin",
    "Pontianak",
    "Manado",
    "Padang",
    "Jambi",
    "Lampung",
    "Batam",
    "Bekasi",
    "Tangerang",
    "Depok",
    "Bogor",
    "Cirebon",
    "Tasikmalaya",
    "Purwokerto",
    "Tegal",
    "Kudus",
    "Salatiga",
    "Magelang",
    "Klaten",
    "Wonogiri",
    "Pacitan",
    "Blitar",
    "Kediri",
    "Jember",
    "Banyuwangi",
    "Probolinggo",
    "Pasuruan",
    "Sidoarjo",
    "Gresik",
    "Lamongan",
    "Tuban",
    "Bojonegoro",
    "Ngawi",
    "Madiun",
    "Ponorogo",
    "Trenggalek",
    "Tulungagung",
  ]
  const visibleCities = showAll ? serviceCities : serviceCities.slice(0, 12)

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50/50 to-white">
      {/* Hero Section */}
      <div className="relative w-full bg-gradient-to-r from-[#001E3C] via-[#003B5C] to-[#005289] text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight">Pelayanan Kami</h1>
            <p className="text-base md:text-lg text-blue-100 leading-relaxed">
              Berbagai layanan transportasi profesional untuk memenuhi kebutuhan perjalanan Anda
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24">
        {/* Available Services */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Layanan yang Tersedia</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <Card key={index} className="h-full hover:shadow-lg transition-all duration-300">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4">{service.icon}</div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                        <Star className="h-4 w-4 text-yellow-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Premium Fleet Collection */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Premium Fleet Collection</h2>
          <Card className="max-w-6xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2">
                <Star className="h-6 w-6 text-yellow-500" />
                Koleksi Kendaraan Premium Kami
              </CardTitle>
              <CardDescription>Armada mewah untuk kebutuhan khusus dan acara istimewa Anda</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading ? (
                  <div className="col-span-full text-center py-8 text-gray-500">
                    Loading kendaraan premium...
                  </div>
                ) : premiumCars.length > 0 ? (
                  premiumCars.map((car) => (
                    <Card key={car.id} className="overflow-hidden">
                      <div className="relative h-64 bg-gradient-to-br from-blue-500 to-blue-700">
                        <Image
                          src={car.image || "/placeholder.svg"}
                          alt={car.name}
                          fill
                          unoptimized
                          className="object-cover"
                        />
                        <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full">
                          <span className="text-sm font-semibold text-blue-600">Premium</span>
                        </div>
                      </div>
                      <CardContent className="p-4 text-center">
                        <h3 className="text-lg font-bold text-gray-800">{car.name}</h3>
                        <p className="text-sm text-gray-600">{car.category}</p>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="col-span-full text-center py-8 text-gray-500">
                    Belum ada data kendaraan premium
                  </div>
                )}
              </div>
              <div className="mt-8 text-center">
                <p className="text-gray-600 mb-4">
                  Semua kendaraan premium dilengkapi dengan fasilitas mewah dan sopir profesional berpengalaman.
                </p>
                <Button asChild variant="outline" className="mr-4 bg-transparent">
                  <Link href="/harga">Lihat Semua Harga</Link>
                </Button>
                <Button asChild className="bg-green-500 hover:bg-green-600">
                  <a href="https://wa.me/6281315393681" target="_blank" rel="noopener noreferrer">
                    Konsultasi Premium Fleet
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Service Areas */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Area Layanan</h2>
          <Card className="max-w-6xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2">
                <Globe className="h-6 w-6 text-blue-500" />
                Melayani 80+ Kota di Indonesia
              </CardTitle>
              <CardDescription>Kami hadir di kota Anda!</CardDescription>
            </CardHeader>
          <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {visibleCities.map((city, index) => (
                  <div key={index} className="text-center p-3 bg-blue-50 rounded-lg">
                    <span className="text-sm font-medium text-blue-800">{city}</span>
                  </div>
                ))}
                {!showAll && (
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <span className="text-sm font-medium">+{serviceCities.length - 12} kota lainnya</span>
                  </div>
                )}
              </div>
              <div className="mt-6 text-center flex flex-col items-center gap-4">
                <Button variant="outline" onClick={() => setShowAll(!showAll)}>
                  {showAll ? "Perkecil Informasi Kota" : "Lihat Semua Kota"}
                </Button>
                <p className="text-gray-600">
                  Tidak menemukan kota Anda? Hubungi kami untuk informasi ketersediaan layanan.
                </p>
                <Button asChild variant="outline">
                  <Link href="/kontak">Cek Ketersediaan Layanan</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Corporate Support */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Dukungan Korporat</h2>
          <Card className="max-w-4xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2">
                <Building className="h-6 w-6 text-green-500" />Kerjasama Jangka Panjang
              </CardTitle>
              <CardDescription>Solusi transportasi untuk kebutuhan bisnis Anda</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-lg mb-3 text-gray-800">Klien Korporat</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-blue-500" />
                      Perusahaan Swasta
                    </li>
                    <li className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-green-500" />
                      BUMN & BUMD
                    </li>
                    <li className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-purple-500" />
                      Event Organizer
                    </li>
                    <li className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-orange-500" />
                      Lembaga Pemerintahan
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-3 text-gray-800">Keuntungan Korporat</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-yellow-500" />
                      Harga khusus volume
                    </li>
                    <li className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-blue-500" />
                      Layanan 24/7
                    </li>
                    <li className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-green-500" />
                      Account manager
                    </li>
                    <li className="flex items-center gap-2">
                      <Car className="h-4 w-4 text-purple-500" />
                      Fleet management
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* CTA */}
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4 text-gray-800">Siap Memulai Perjalanan Anda?</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Hubungi tim kami sekarang untuk konsultasi gratis dan penawaran terbaik sesuai kebutuhan Anda.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-green-500 hover:bg-green-600">
              <a href="https://wa.me/6281315393681" target="_blank" rel="noopener noreferrer">
                 WhatsApp Sekarang
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/kontak"> Kirim Email</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
