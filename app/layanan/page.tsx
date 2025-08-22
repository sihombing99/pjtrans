export const metadata = { title: "Layanan | PJTrans", description: "Informasi Layanan PJTrans – PT Portama Jaya Transportasi. Layanan sewa mobil profesional di Jabodetabek dan seluruh Indonesia." }

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, Car, Users, Plane, MapPin, Building, Star, Globe } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function LayananPage() {
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
  ]

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">Pelayanan Kami</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Berbagai layanan transportasi profesional untuk memenuhi kebutuhan perjalanan Anda
          </p>
        </div>

        {/* Available Services */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Layanan yang Tersedia</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <Card key={index} className="h-full">
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
                {/* Toyota Alphard */}                                 
                <Card className="overflow-hidden">
                  <div className="relative h-64 bg-gradient-to-br from-blue-500 to-blue-700">
                    <Image
                      src="/image/alphard.jpg?height=1200&width=400&text=Toyota+Alphard"
                      alt="Toyota Alphard"
                      fill
                      className="object-cover"
                      style={{ objectPosition: 'center' }}
                    />
                    <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full">
                      <span className="text-sm font-semibold text-blue-600">Premium</span>
                    </div>
                  </div>
                  <CardContent className="p-4 text-center">
                    <h3 className="text-lg font-bold text-gray-800">Toyota Alphard</h3>
                    <p className="text-sm text-gray-600">Luxury MPV</p>
                  </CardContent>
                </Card>

                {/* Toyota Fortuner */}
                <Card className="overflow-hidden">
                  <div className="relative h-64 bg-gradient-to-br from-green-500 to-green-700">
                    <Image
                      src="/image/fortuner.png?height=1000&width=400&text=Toyota+Fortuner"
                      alt="Toyota Fortuner"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full">
                      <span className="text-sm font-semibold text-green-600">SUV</span>
                    </div>
                  </div>
                  <CardContent className="p-4 text-center">
                    <h3 className="text-lg font-bold text-gray-800">Toyota Fortuner</h3>
                    <p className="text-sm text-gray-600">Premium SUV</p>
                  </CardContent>
                </Card>

                {/* Toyota Camry */}
                <Card className="overflow-hidden">
                  <div className="relative h-64 bg-gradient-to-br from-purple-500 to-purple-700">
                    <Image
                      src="/image/carmy.png?height=1000&width=400&text=Toyota+Camry"
                      alt="Toyota Camry"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full">
                      <span className="text-sm font-semibold text-purple-600">Sedan</span>
                    </div>
                  </div>
                  <CardContent className="p-4 text-center">
                    <h3 className="text-lg font-bold text-gray-800">Toyota Camry</h3>
                    <p className="text-sm text-gray-600">Executive Sedan</p>
                  </CardContent>
                </Card>

                {/* Mercedes-Benz */}
                <Card className="overflow-hidden">
                  <div className="relative h-64 bg-gradient-to-br from-gray-600 to-gray-800">
                    <Image
                      src="/image/C300.png?height=1000&width=400&text=Mercedes+C300"
                      alt="Mercedes C300"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full">
                      <span className="text-sm font-semibold text-gray-800">Luxury</span>
                    </div>
                  </div>
                  <CardContent className="p-4 text-center">
                    <h3 className="text-lg font-bold text-gray-800">Mercedes C300</h3>
                    <p className="text-sm text-gray-600">Luxury Sedan</p>
                  </CardContent>
                </Card>

                {/* BMW 5 Series */}
                <Card className="overflow-hidden">
                  <div className="relative h-64 bg-gradient-to-br from-indigo-500 to-indigo-700">
                    <Image
                      src="/image/bmw5.png?height=1000&width=400&text=BMW+5+Series"
                      alt="BMW 5 Series"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full">
                      <span className="text-sm font-semibold text-indigo-600">Luxury</span>
                    </div>
                  </div>
                  <CardContent className="p-4 text-center">
                    <h3 className="text-lg font-bold text-gray-800">BMW 5 Series</h3>
                    <p className="text-sm text-gray-600">Executive Sedan</p>
                  </CardContent>
                </Card>

                {/* Toyota Vellfire */}
                <Card className="overflow-hidden">
                  <div className="relative h-64 bg-gradient-to-br from-red-500 to-red-700">
                    <Image
                      src="/image/Vellfire.png?height=1000&width=400&text=Toyota+Vellfire"
                      alt="Toyota Vellfire"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full">
                      <span className="text-sm font-semibold text-red-600">Premium</span>
                    </div>
                  </div>
                  <CardContent className="p-4 text-center">
                    <h3 className="text-lg font-bold text-gray-800">Toyota Vellfire</h3>
                    <p className="text-sm text-gray-600">Luxury MPV</p>
                  </CardContent>
                </Card>
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
                {serviceCities.map((city, index) => (
                  <div key={index} className="text-center p-3 bg-blue-50 rounded-lg">
                    <span className="text-sm font-medium text-blue-800">{city}</span>
                  </div>
                ))}
                <div className="text-center p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-white">
                  <span className="text-sm font-medium">+50 kota lainnya</span>
                </div>
              </div>
              <div className="mt-6 text-center">
                <p className="text-gray-600 mb-4">
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
