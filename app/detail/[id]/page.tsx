// File: app/detail/[id]/page.tsx

import { PrismaClient } from '@prisma/client'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, Car, FileText, Globe, Wrench, Phone } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


const prisma = new PrismaClient()

// Fungsi ini berjalan di server untuk mengambil data
async function getCarDetails(id: number) {
  try {
    const car = await prisma.car.findUnique({
      where: { id },
      include: {
        services: true, // Ambil juga semua layanan yang terhubung
      },
    })
    return car
  } catch (error) {
    console.error("Gagal mengambil detail mobil:", error);
    return null;
  }
}

// Komponen Halaman Detail (Server Component)
export default async function DetailPage({ params }: { params: { id: string } }) {
  const carId = parseInt(params.id, 10);
  
  if (isNaN(carId)) {
      return (
        <div className="container mx-auto p-8 text-center">
            <h1 className="text-2xl font-bold">ID Mobil Tidak Valid.</h1>
        </div>
      )
  }

  const car = await getCarDetails(carId);

  // Jika mobil tidak ditemukan
  if (!car) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h1 className="text-2xl font-bold">Mobil tidak ditemukan.</h1>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      
      {/* --- BAGIAN UTAMA DENGAN LATAR BELAKANG BIRU FULL-WIDTH --- */}
      <div className="bg-gradient-to-br from-[#005289] to-[#0077B6] text-white">
        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center">
            {/* Kolom Gambar */}
            <div className="lg:col-span-3">
              <div className="relative h-96 w-full rounded-xl overflow-hidden shadow-2xl group">
                <Image
                    src={car.image || "/placeholder.svg"}
                    alt={car.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            </div>

            {/* Kolom Detail & Deskripsi */}
            <div className="lg:col-span-2 flex flex-col justify-center">
              <span className="font-semibold mb-2 text-blue-200">{car.category}</span>
              <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
                {car.name}
              </h1>
              <p className="text-2xl text-gray-200 mb-6">
                Mulai dari <span className="font-bold text-white">{car.price}</span>
              </p>
              {car.content && (
                   <div className="text-blue-100 leading-relaxed bg-white/10 p-4 rounded-lg">
                      <p>{car.content}</p>
                   </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* --- SISA KONTEN HALAMAN --- */}
      <div className="container mx-auto px-4 py-12 md:py-20">
        {/* Tabel Harga Layanan Dinamis */}
        <div className="max-w-5xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Rincian Harga Sewa</h2>
            <div className="overflow-x-auto bg-white p-6 rounded-xl shadow-lg">
                <table className="min-w-full">
                    <thead>
                        <tr className="border-b-2 border-gray-200">
                            <th className="py-3 px-4 text-left font-semibold text-gray-600 uppercase tracking-wider">Tipe Layanan</th>
                            <th className="py-3 px-4 text-left font-semibold text-gray-600 uppercase tracking-wider">Harga</th>
                            <th className="py-3 px-4 text-left font-semibold text-gray-600 uppercase tracking-wider">Keterangan</th>
                        </tr>
                    </thead>
                    <tbody>
                        {car.services && car.services.length > 0 ? (
                            car.services.map((service) => (
                                <tr key={service.id} className="border-b border-gray-100 last:border-b-0 hover:bg-blue-50 transition-colors">
                                    <td className="py-4 px-4 font-medium text-gray-800">{service.type}</td>
                                    <td className="py-4 px-4 font-bold text-blue-600 text-lg">{service.price}</td>
                                    <td className="py-4 px-4 text-gray-600">{service.description}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={3} className="py-8 px-4 text-center text-gray-500">
                                    Rincian harga untuk mobil ini belum tersedia.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
        
        {/* --- BAGIAN STATIS --- */}
        <div className="max-w-5xl mx-auto mb-16">
           <Card className="shadow-lg border-none bg-white">
             <CardHeader>
               <CardTitle className="flex items-center gap-3 text-2xl font-bold text-gray-800">
                 <AlertTriangle className="h-6 w-6 text-yellow-500" />
                 Syarat & Ketentuan Penting
               </CardTitle>
             </CardHeader>
             <CardContent className="text-gray-700 list-decimal pl-10 space-y-3">
                <li>Pemesanan armada wajib dilakukan maksimal H-1 (satu hari sebelum keberangkatan).</li>
                <li>Durasi sewa harian dihitung per tanggal (00:00 - 23:59), bukan 24 jam dari waktu mulai.</li>
                <li>Biaya overtime (kelebihan waktu sewa) adalah 10% dari harga sewa per jam.</li>
                <li>Pembatalan pada hari-H akan dikenakan denda sebesar 50% dari total biaya sewa.</li>
                <li>Harga sewa dengan supir belum termasuk biaya BBM, tol, parkir, dan akomodasi supir (jika keluar kota).</li>
             </CardContent>
           </Card>
        </div>

        <div className="max-w-5xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Pertanyaan Umum (FAQ)</h2>
            <Accordion type="single" collapsible className="w-full bg-white p-6 rounded-xl shadow-lg space-y-2">
              <AccordionItem value="item-1">
                <AccordionTrigger className="font-semibold text-lg hover:no-underline">Dokumen apa saja yang diperlukan untuk sewa lepas kunci?</AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  Untuk sewa lepas kunci, kami memerlukan KTP, SIM A yang masih berlaku, dan bukti domisili (seperti tagihan listrik/air). Dokumen tambahan mungkin diperlukan untuk verifikasi lebih lanjut.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="font-semibold text-lg hover:no-underline">Apakah bisa sewa untuk perjalanan luar kota?</AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  Tentu saja. Kami melayani perjalanan untuk dalam dan luar kota. Mohon informasikan destinasi Anda saat melakukan pemesanan agar kami dapat memberikan penawaran terbaik, termasuk estimasi akomodasi untuk supir.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="font-semibold text-lg hover:no-underline">Bagaimana jika terjadi kerusakan pada mobil saat disewa?</AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  Harap segera hubungi tim kami jika terjadi kendala atau kerusakan. Kami akan memberikan panduan dan bantuan secepatnya. Untuk kerusakan ringan akibat kelalaian penyewa, biaya perbaikan akan dibebankan kepada penyewa.
                </AccordionContent>
              </AccordionItem>
               <AccordionItem value="item-4">
                <AccordionTrigger className="font-semibold text-lg hover:no-underline">Apakah tersedia layanan antar-jemput mobil di bandara?</AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  Ya, kami menyediakan layanan antar-jemput kendaraan di Bandara Soekarno-Hatta, Halim Perdanakusuma, dan lokasi lain di Jabodetabek sesuai kesepakatan.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
        </div>
        
        <div className="text-center bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12 px-8 rounded-xl shadow-2xl">
            <h3 className="text-3xl font-extrabold mb-4">Siap untuk Perjalanan Anda?</h3>
            <p className="mb-6 max-w-2xl mx-auto text-blue-100">
              Booking <span className="font-bold">{car.name}</span> sekarang juga. Tim kami siap membantu Anda 24 jam untuk memastikan perjalanan Anda aman, nyaman, dan berkesan.
            </p>
            <Button asChild size="lg" className="bg-green-500 hover:bg-green-600 text-white font-bold text-lg py-3 px-8 rounded-full transition-transform hover:scale-105">
              <a href="https://wa.me/6281315393681" target="_blank" rel="noopener noreferrer">
                <Phone className="h-5 w-5 mr-3" /> Hubungi via WhatsApp
              </a>
            </Button>
        </div>
      </div>
    </div>
  )
}

