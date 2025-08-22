import Link from "next/link"
import Image from "next/image"
import { Car, Phone, Mail, MapPin, Clock } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              {/*<Car className="h-8 w-8 text-yellow-500" />*/}
              <Image src="/image/pjtrans.png" alt="PJTrans Logo" className="h-8 w-18"  width={128} height={40} />
              <div>
                <h3 className="text-xl font-bold">PJTrans</h3>
                <p className="text-sm text-gray-400">PT Portama Jaya Transportasi</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Solusi transportasi terpercaya sejak 2022. Melayani seluruh Indonesia dengan armada lengkap dan sopir
              profesional.
            </p>
            <p className="text-yellow-400 font-semibold">"Rent, Drive, To Explore"</p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Tautan Cepat</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/harga" className="text-gray-400 hover:text-white transition-colors">
                  Harga & Armada
                </Link>
              </li>
              <li>
                <Link href="/tentang" className="text-gray-400 hover:text-white transition-colors">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link href="/layanan" className="text-gray-400 hover:text-white transition-colors">
                  Layanan
                </Link>
              </li>
              <li>
                <Link href="/kontak" className="text-gray-400 hover:text-white transition-colors">
                  Kontak
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Layanan Kami</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>Sewa Harian & Bulanan</li>
              <li>Lepas Kunci & Dengan Sopir</li>
              <li>Antar Jemput Bandara</li>
              <li>Paket Wisata</li>
              <li>Korporat & Event</li>
              <li>Mobil Premium & Mewah</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Hubungi Kami</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">0813-2919-5095</p>
                  <p className="text-xs text-gray-400">WhatsApp & Telepon</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">portamajaya.transportasi@gmail.com</p>
                  <p className="text-xs text-gray-400">Email Resmi</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-red-500 mt-0.5" />
                <div>
                  <p className="text-sm">Ruko Sakura Garden City No. 117</p>
                  <p className="text-sm">Jl. Bina Marga No. 88, Cipayung</p>
                  <p className="text-sm">Jakarta Timur</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-purple-500 mt-0.5" />
                <div>
                  <p className="text-sm">Senin-Jumat: 08:00-22:00</p>
                  <p className="text-sm">Weekend: 08:00-20:00</p>
                  <p className="text-xs text-gray-400">Emergency 24/7</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} PT Portama Jaya Transportasi. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Syarat & Ketentuan
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Kebijakan Privasi
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
