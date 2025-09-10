// File: app/harga/page.tsx

// Metadata dan import dari file Anda dipertahankan
export const metadata = { title: "Harga & Armada | PJTrans", description: "Informasi Harga & Armada PJTrans – PT Portama Jaya Transportasi. Layanan sewa mobil profesional di Jabodetabek dan seluruh Indonesia." }

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Car as CarIcon, Truck, Bus, AlertTriangle, Phone } from "lucide-react" // Mengganti nama import Car agar tidak bentrok
import Image from "next/image"

// 1. Definisikan tipe data Car agar sesuai dengan database Anda
type Car = {
  id: number;
  name: string;
  price: string;
  category: string;
  image: string;
};

// 2. Buat fungsi untuk mengambil data mobil dari API Anda.
// Fungsi ini akan berjalan di server.
async function getCars(): Promise<Car[]> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    
    const response = await fetch(`${apiUrl}/api/mobil`, {
      cache: 'no-store', 
    });

    if (!response.ok) {
      throw new Error("Gagal mengambil data mobil dari server");
    }

    return response.json();
  } catch (error) {
    console.error(error);
    return []; 
  }
}

// 3. Ubah komponen halaman menjadi 'async' dan panggil getCars
export default async function HargaPage() {
  const cars = await getCars();

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        {/* Header (statis, tidak berubah) */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">Armada Kami</h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Kami menyediakan berbagai pilihan armada, mulai dari city car yang ukuran ringkas dan lincah untuk area
            perkotaan, SUV yang tangguh, hingga mobil mewah untuk acara spesial Anda. Semua kendaraan dirawat dengan
            standar terbaik untuk memastikan perjalanan yang aman dan nyaman.
          </p>
        </div>

        {/* Vehicle Categories (statis, tidak berubah) */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Pilih Armada Sesuai Kebutuhan Anda</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
            <Card className="text-center"><CardHeader><CarIcon className="h-8 w-8 mx-auto text-blue-500" /><CardTitle className="text-lg">City Car</CardTitle></CardHeader></Card>
            <Card className="text-center"><CardHeader><CarIcon className="h-8 w-8 mx-auto text-green-500" /><CardTitle className="text-lg">MPV</CardTitle></CardHeader></Card>
            <Card className="text-center"><CardHeader><CarIcon className="h-8 w-8 mx-auto text-purple-500" /><CardTitle className="text-lg">SUV & Premium</CardTitle></CardHeader></Card>
            <Card className="text-center"><CardHeader><Truck className="h-8 w-8 mx-auto text-orange-500" /><CardTitle className="text-lg">Komersial</CardTitle></CardHeader></Card>
            <Card className="text-center"><CardHeader><Bus className="h-8 w-8 mx-auto text-red-500" /><CardTitle className="text-lg">Wisata</CardTitle></CardHeader></Card>
          </div>
        </section> 

        {/* Detailed Vehicle Cards (BAGIAN INI MENJADI DINAMIS) */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Harga Sewa Rental Armada Kami</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {/* 4. Gunakan data 'cars' dari database untuk me-render kartu mobil */}
            {cars.map((car) => {
              // Logika untuk menentukan apakah harga perlu dihubungi
              const contactForPrice = car.price.toLowerCase().includes('hubungi');
              
              return (
                <Card key={car.id} id={String(car.id)} className="overflow-hidden">
                  <div className="relative h-56 w-full">
                    <Image
                      src={car.image || "/placeholder.svg"}
                      alt={car.name}
                      fill
                      className="object-cover w-full h-full"
                      sizes="(max-width: 768px) 100vw, 400px"
                      priority={car.id <= 3} // Prioritaskan gambar awal untuk LCP
                    />
                    <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full">
                      <span className="text-sm font-semibold text-blue-600">PJTrans</span>
                    </div>
                    <div className="absolute top-16 left-4">
                      <Badge variant="secondary">{car.category}</Badge>
                    </div>
                  </div>
                  <div className="text-center mt-2 mb-1">
                    <h3 className="text-xl font-bold text-black-800">{car.name}</h3>
                    <p className={`text-2xl font-bold ${contactForPrice ? "text-orange-600" : "text-blue-600"} mb-2`}>
                      {car.price}
                    </p>
                  </div>
                  <CardContent className="p-8 pt-2">
                    <div className="space-y-2 mt-2">
                      <Button asChild className="w-full bg-green-500 hover:bg-green-600" size="sm">
                        <a 
                          href={`https://wa.me/6281315393681?text=Halo%2C%20saya%20ingin%20cek%20ketersediaan%20mobil%20${encodeURIComponent(car.name)}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2"
                        >
                          <Phone className="h-4 w-4" />
                          Chat via WhatsApp
                        </a>
                      </Button>
                      <Button asChild className="w-full bg-[#005289] hover:bg-blue-700" size="sm">
                        <a 
                          href={`/detail/${car.id}`}
                          className="flex items-center justify-center gap-2"
                        >
                          Detail Mobil
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Terms & Conditions (statis, tidak berubah) */}
        <section className="mb-16">
          {/* ... (seluruh bagian Syarat & Ketentuan Anda tetap di sini) ... */}
        </section>

        {/* CTA (statis, tidak berubah) */}
        <div className="text-center">
          {/* ... (seluruh bagian CTA Anda tetap di sini) ... */}
        </div>
      </div>
    </div>
  )
}

