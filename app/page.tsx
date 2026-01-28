export const metadata = { 
  title: "Beranda | PJTrans", 
  description: "Informasi PJTrans – PT Portama Jaya Transportasi. Layanan sewa mobil profesional di Jabodetabek dan seluruh Indonesia." 
}
export const dynamic = "force-dynamic"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Car, Shield, Users, MapPin, Clock, CheckCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import prisma from "@/lib/prisma"

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

export default async function HomePage() {
  let cars: Car[] = []

  try {
    const results = await prisma.car.findMany({
      include: {
        services: true,
      },
      orderBy: { id: "desc" },
      take: 3, // Show only 3 cars on homepage
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
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-r from-slate-500 to-slate-300 overflow-hidden">
        <Image
          src="/image/BG_pj.png?height=720&width=1080"
          alt="Luxury cars with professional drivers"
          fill
          className="w-full h-full object-cover"
          priority
        />
        
        <div className="absolute bottom-8 left-0 z-10 text-left text-black max-w-4xl p-8 ml-16">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">PJTrans</h1>
          <p className="text-xl md:text-2xl mb-2 text-black">PT Portama Jaya Transportasi</p>
          <p className="text-2xl md:text-3xl font-semibold mb-8 text-yellow-400">"Rent, Drive, To Explore"</p>
          <p className="text-lg md:text-xl mb-8 max-w-3xl leading-relaxed">
            Kami hadir untuk memberikan solusi transportasi yang fleksibel, aman, dan profesional ke seluruh pelosok negeri. Berbagai jenis armada dari city car hingga kendaraan premium tersedia untuk Anda.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
              <Link href="/harga">Lihat Harga & Armada</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-black hover:bg-gray-200 hover:text-yellow-400 bg-transparent">
              <Link href="/kontak">Hubungi Kami</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About Company Summary */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">Tentang Perusahaan</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              PT Portama Jaya Transportasi (PJTrans) adalah perusahaan penyedia jasa transportasi yang berdiri sejak tahun 2022 dan telah melayani berbagai kebutuhan pelanggan dari skala individu hingga perusahaan besar.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed mt-4">
              Kami percaya bahwa kenyamanan, kecepatan, dan profesionalisme adalah fondasi dalam setiap perjalanan Anda.
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">Visi dan Misi Kami</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-2xl text-blue-600">Visi</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  Menjadi perusahaan transportasi terpercaya yang menyediakan layanan berkualitas, aman, dan nyaman di
                  seluruh Indonesia.
                </p>
              </CardContent>
            </Card>
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-2xl text-green-600">Misi</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    Memberikan layanan sewa kendaraan yang fleksibel sesuai kebutuhan pelanggan
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    Menyediakan armada yang terawat dan siap pakai
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    Memiliki SDM yang profesional dan ramah
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    Menjangkau seluruh wilayah Indonesia
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    Menjunjung tinggi integritas dan kepuasan pelanggan
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Advantages */}
      <section className="py-16 bg-white">
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {/* Dynamic Car Cards from Database - Simple Display */}
            {cars.length > 0 ? (
              cars.map((car) => (
                <Card key={car.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="relative h-56 w-full">
                    <Image
                      src={car.image || "/placeholder.svg"}
                      alt={car.name}
                      fill
                      unoptimized
                      className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, 400px"
                      priority={car.id <= 3}
                    />
                    <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full">
                      <span className="text-sm font-semibold text-blue-600">PJTrans</span>
                    </div>
                  </div>
                  <CardContent className="p-4 text-center">
                    <h3 className="text-lg font-bold text-gray-800">{car.name}</h3>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-600 text-lg">Armada belum tersedia. Silakan hubungi kami.</p>
              </div>
            )}
          </div>

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

      {/* Quick Links */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">Tautan Cepat</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <Button asChild variant="outline" size="lg" className="h-16 bg-transparent">
              <Link href="/tentang">Tentang Kami</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-16 bg-transparent">
              <Link href="/layanan">Layanan & Armada</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-16 bg-transparent">
              <Link href="/harga">Harga Rental</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-16 bg-transparent">
              <Link href="/kontak">Kontak Kami</Link>
            </Button>
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
                src="/image/pntng.png?height=100&width=200&text=Partner+3"
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
  )
}
