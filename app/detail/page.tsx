import Image from "next/image"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function DetailAlphardPage() {
  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage: "url('/image/background_landscape.png')",
        backgroundSize: "100% 100%", // ubah dari "cover" ke "100% 100%"
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Header */}
      <div className=" py-2 px-4 text-white text-sm flex justify-between items-center">
        <span>PT PORTAMA JAYA TRANSPORTASI</span>
        <span>Rental Mobil Jakarta | Sewa Alphard Jakarta</span>
      </div>
      <header className="text-white py-8 px-4 flex flex-col md:flex-row items-center justify-between">
        <div className="max-w-xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Sewa Alphard Jakarta</h1>
          <p className="mb-4">
            Nikmati kemewahan dan kenyamanan perjalanan Anda di Jakarta dengan Toyota Alphard. Cocok untuk kebutuhan bisnis, pernikahan, atau perjalanan keluarga. Armada terbaru, driver profesional, dan layanan premium siap menemani Anda.
          </p>
        </div>
        <div className="flex-shrink-0 mt-6 md:mt-0">
          <Image src="/image/Alphard.png" alt="Toyota Alphard" width={400} height={220} className="rounded-lg bg-white" />
        </div>
      </header>

      {/* Formulir Rental */}
      <div className="py-3 text-center text-white font-bold text-lg">
        Formulir Rental Mobil Alphard
      </div>

      {/* Harga Sewa Table */}
      <section className="bg-[#f5f5f5] py-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-bold mb-4 text-center">Harga Sewa Alphard di Jakarta</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm bg-white rounded shadow">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-2">Tipe Layanan</th>
                  <th className="py-2 px-2">Harga</th>
                  <th className="py-2 px-2">Keterangan</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2 px-2">12 Jam + Driver</td>
                  <td className="py-2 px-2 font-bold text-blue-600">Rp 2.800.000</td>
                  <td className="py-2 px-2">Exclude BBM, Tol, Parkir, Makan Driver</td>
                </tr>
                <tr>
                  <td className="py-2 px-2">Full Day + Driver</td>
                  <td className="py-2 px-2 font-bold text-blue-600">Rp 3.200.000</td>
                  <td className="py-2 px-2">Exclude BBM, Tol, Parkir, Makan Driver</td>
                </tr>
                <tr>
                  <td className="py-2 px-2">Lepas Kunci (Harian)</td>
                  <td className="py-2 px-2 font-bold text-blue-600">Rp 2.500.000</td>
                  <td className="py-2 px-2">Minimal 3 Hari</td>
                </tr>
                <tr>
                  <td className="py-2 px-2">Lepas Kunci (Bulanan)</td>
                  <td className="py-2 px-2 font-bold text-blue-600">Rp 42.000.000</td>
                  <td className="py-2 px-2">Minimal 1 Bulan</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Kalkulator Sewa Dummy */}
        <div className="max-w-md mx-auto mt-8 bg-white rounded shadow p-6">
          <h3 className="font-bold mb-2">Kalkulator Sewa Alphard Jakarta</h3>
          <form className="space-y-2">
            <input className="w-full border px-3 py-2 rounded" placeholder="Tanggal Sewa" disabled />
            <input className="w-full border px-3 py-2 rounded" placeholder="Durasi (hari)" disabled />
            <input className="w-full border px-3 py-2 rounded" placeholder="Tipe Layanan" disabled />
            <div className="text-green-600 font-bold mt-2">Total: Rp2.800.000</div>
          </form>
        </div>
      </section>

      {/* Galeri Armada */}
      <section className="bg-[#005289] py-8">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-white text-lg font-bold mb-4">Galeri Armada Rental Mobil Alphard</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Image src="/image/Alphard.png" alt="Alphard 1" width={400} height={220} className="rounded" />
            <Image src="/image/Alphard.png" alt="Alphard 2" width={400} height={220} className="rounded" />
            <Image src="/image/Alphard.png" alt="Alphard 3" width={400} height={220} className="rounded" />
          </div>
        </div>
      </section>

      {/* Penjelasan & Keunggulan */}
      <section className="bg-white py-8">
        <div className="max-w-3xl mx-auto space-y-8">
          <div>
            <h3 className="font-bold text-lg mb-2">Sewa Alphard Jakarta: Solusi Transportasi Mewah & Premium untuk Segala Kebutuhan</h3>
            <Image src="/image/Alphard.png" alt="Alphard Premium" width={600} height={320} className="rounded mb-2" />
            <p>
              Toyota Alphard adalah pilihan utama untuk Anda yang mengutamakan kenyamanan, kemewahan, dan keamanan. Cocok untuk perjalanan bisnis, wedding, antar jemput VIP, dan kebutuhan eksklusif lainnya.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-1">Keunggulan Toyota Alphard Hybrid yang Kami Sediakan</h4>
            <ul className="list-disc ml-6">
              <li>Armada terbaru & terawat</li>
              <li>Driver profesional & berpengalaman</li>
              <li>Interior mewah & fitur premium</li>
              <li>Proses booking mudah & cepat</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-1">Mengapa Sewa Mobil Limousine Sewa Alphard Jakarta Kami?</h4>
            <Image src="/image/Alphard.png" alt="Alphard Limousine" width={600} height={320} className="rounded mb-2" />
            <p>
              Kami berkomitmen memberikan pengalaman terbaik dengan pelayanan ramah, harga transparan, dan armada siap pakai setiap saat.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-1">Dapatkan Pengalaman Berkendara Premium Sekarang Juga</h4>
            <Image src="/image/Alphard.png" alt="Alphard Hitam" width={600} height={320} className="rounded mb-2" />
            <p>
              Hubungi kami untuk konsultasi dan pemesanan. Tim kami siap membantu kebutuhan transportasi Anda 24 jam.
            </p>
          </div>
        </div>
      </section>

      {/* Syarat & Ketentuan */}
      <section className="bg-[#005289] py-8">
        <div className="max-w-3xl mx-auto bg-white rounded shadow p-6">
          <h3 className="font-bold text-lg mb-4 text-[#005289]">Syarat & Ketentuan</h3>
          <ol className="list-decimal ml-6 text-sm space-y-2">
            <li>Pelanggan dapat melakukan order armada kendaraan maksimal H-1 hari (satu hari sebelumnya)</li>
            <li>PT Portama Jaya Transportasi akan menjalankan orderan selama 12 jam, apabila terhitung lebih akan dihitung overtime dan biaya overtime dihitung sebesar 10% per jam.</li>
            <li>Apabila ada pembatalan orderan armada pada Hari-H akan dikenakan pinalti sebesar 50% dari harga yang telah disepakati. Apabila jasa order keluar dari wilayah yang telah disepakati, maka harga disesuaikan oleh PT Portama Jaya Transportasi.</li>
            <li>Satu hari sewa dihitung dari jam 00:00 sampai dengan jam 23:59 di hari yang sama (bukan dihitung 24 jam dari order)</li>
            <li>Pemakaian 1 hari di weekend ada tambahan baiaya Rp. [*]</li>
            <li>Libur nasional minimal sewa tentatif</li>
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#005289] py-8">
        <div className="max-w-3xl mx-auto text-white">
          <h3 className="font-bold text-lg mb-4">FAQ Seputar Sewa Alphard Jakarta</h3>
          <div className="space-y-2">
            <details className="bg-[#222] rounded p-3">
              <summary className="cursor-pointer font-semibold">Berapa harga sewa Alphard per hari?</summary>
              <div className="mt-2">Harga mulai dari Rp 2.800.000 (12 jam) di Jakarta, tergantung durasi dan tipe layanan.</div>
            </details>
            <details className="bg-[#222] rounded p-3">
              <summary className="cursor-pointer font-semibold">Apakah bisa lepas kunci?</summary>
              <div className="mt-2">Bisa, minimal sewa 3 hari untuk lepas kunci.</div>
            </details>
            <details className="bg-[#222] rounded p-3">
              <summary className="cursor-pointer font-semibold">Apakah harga sudah termasuk BBM?</summary>
              <div className="mt-2">Belum, harga exclude BBM, tol, parkir, makan driver.</div>
            </details>
            <details className="bg-[#222] rounded p-3">
              <summary className="cursor-pointer font-semibold">Bagaimana cara booking?</summary>
              <div className="mt-2">Hubungi kami via WhatsApp untuk reservasi dan konsultasi.</div>
            </details>
          </div>
        </div>
      </section>

      {/* Rekomendasi Mobil Lain */}
      <section className="bg-white py-8">
        <div className="max-w-5xl mx-auto">
          <h3 className="font-bold text-lg mb-6 text-center">Armada Sewa Lainnya</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card Mobil 1 */}
            <div className="flex flex-col rounded-xl overflow-hidden shadow-md border">
              <div className="relative h-48 bg-gradient-to-tr from-[#007e89] via-[#005289] to-[#003f5c] flex items-center justify-center">
                <Image 
                  src="/image/avanza.png" 
                  alt="Toyota Avanza" 
                  width={280} 
                  height={160} 
                  className="object-contain drop-shadow-lg"
                />
              </div>
              <div className="bg-[#005289] text-white text-center py-4 px-2">
                <h4 className="font-bold text-lg">Toyota Avanza</h4>
                <a 
                  href="/harga/avanza" 
                  className="mt-2 inline-block bg-white text-[#007e89] font-semibold px-6 py-2 rounded-lg hover:bg-gray-100 transition"
                >
                  Detail
                </a>
              </div>
            </div>
            {/* Card Mobil 2 */}
            <div className="flex flex-col rounded-xl overflow-hidden shadow-md border">
              <div className="relative h-48 bg-gradient-to-tr from-[#007e89] via-[#005289] to-[#003f5c] flex items-center justify-center">
                <Image 
                  src="/image/ertiga.png" 
                  alt="Suzuki Ertiga" 
                  width={280} 
                  height={160} 
                  className="object-contain drop-shadow-lg"
                />
              </div>
              <div className="bg-[#005289] text-white text-center py-4 px-2">
                <h4 className="font-bold text-lg">Suzuki Ertiga</h4>
                <a 
                  href="/harga/ertiga" 
                  className="mt-2 inline-block bg-white text-[#007e89] font-semibold px-6 py-2 rounded-lg hover:bg-gray-100 transition"
                >
                  Detail
                </a>
              </div>
            </div>
            {/* Card Mobil 3 */}
            <div className="flex flex-col rounded-xl overflow-hidden shadow-md border">
              <div className="relative h-48 bg-gradient-to-tr from-[#007e89] via-[#005289] to-[#003f5c] flex items-center justify-center">
                <Image 
                  src="/image/Pajero Sport.png" 
                  alt="Mitsubishi Pajero" 
                  width={280} 
                  height={160} 
                  className="object-contain drop-shadow-lg"
                />
              </div>
              <div className="bg-[#005289] text-white text-center py-4 px-2">
                <h4 className="font-bold text-lg">Mitsubishi Pajero</h4>
                <a 
                  href="/harga/pajero" 
                  className="mt-2 inline-block bg-white text-[#007e89] font-semibold px-6 py-2 rounded-lg hover:bg-gray-100 transition"
                >
                  Detail
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Booking */}
      <section className="bg-[#005289] py-8 text-center">
        <h3 className="text-2xl font-bold mb-2 text-white">Tunggu Apa Lagi?</h3>
        <p className="text-white mb-4">Hubungi WhatsApp kami untuk booking Alphard atau armada lain di Jakarta. Layanan 24 jam, harga transparan, armada terawat!</p>
        <Button asChild size="lg" className="bg-[#005289] text-white font-bold">
          <a href="https://wa.me/6281315393681" target="_blank" rel="noopener noreferrer">
            Pesan Sekarang
          </a>
        </Button>
      </section>

     {/*Footer
       <footer className="bg-black text-white py-6 text-xs text-center">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          <div>
            <strong>ABOUT US</strong><br />
            PT PORTAMA JAYA TRANSPORTASI<br />
            Sewa Mobil Jakarta | Sewa Alphard Jakarta
          </div>
          <div>
            <strong>AREA LAYANAN</strong><br />
            Jakarta, Bekasi, Depok, Tangerang, Bogor, Karawang, Bandung, Jawa Barat, Jawa Tengah, Jawa Timur, Bali, Sumatera, Kalimantan, Sulawesi
          </div>
          <div>
            <strong>CONTACT US</strong><br />
            WhatsApp: 0813-1539-3681<br />
            Email: info@pjtrans.co.id
          </div>
        </div>
        <div className="mt-4">Sewa mobil Jakarta | All rights reserved</div>
      </footer> */}
    </div>
  )
}

