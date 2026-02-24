"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone, Mail, Clock, MessageCircle, Send } from "lucide-react"

// Konfigurasi kontak
const WHATSAPP_NUMBER = "6281315393681"
const EMAIL = "portamajaya.transportasi@gmail.com"
const PHONE = "081315393681"

const OFFICE_ADDRESS = {
  building: "Ruko Apartemen Sakura Garden City No. 117",
  street: "Jl. Bina Marga No. 88, Cipayung",
  city: "Jakarta Timur",
}

// URL Google Maps dengan enkoding alamat
const MAPS_URL = `https://maps.google.com/?q=${encodeURIComponent(
  `${OFFICE_ADDRESS.building} ${OFFICE_ADDRESS.street} ${OFFICE_ADDRESS.city}`
)}`

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

// Jam operasional
const OPERATING_HOURS = [
  { day: "Senin - Jumat", hours: "08:00 - 22:00 WIB" },
  { day: "Sabtu - Minggu", hours: "08:00 - 20:00 WIB" },
  { day: "Emergency", hours: "24/7 via WhatsApp" },
]

// Generate URL untuk compose email di Gmail
function generateGmailComposeUrl(email: string, name: string, userEmail: string, message: string): string {
  const subject = encodeURIComponent("Pesan dari Website PJTrans")
  const body = encodeURIComponent(`Nama: ${name}\nEmail: ${userEmail}\n\nPesan:\n${message}`)
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`
}

// Type untuk form data
interface FormData {
  name: string
  email: string
  message: string
}

// Komponen card kontak
function ContactCard({ 
  icon, 
  title, 
  children 
}: { 
  icon: React.ReactNode
  title: string
  children: React.ReactNode
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">{icon} {title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  )
}

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

// Section peta lokasi kantor
function MapSection() {
  return (
    <section className="mt-16">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Lokasi Kantor</h2>
      <Card className="max-w-4xl mx-auto">
        <CardContent className="p-0">
          <div className="w-full h-96 rounded-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4705.112082482534!2d106.7679271!3d-6.1910574!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f7a7a2ea0b41%3A0xdaf5c712bea2af3a!2sPJTrans%20(PT.%20Portama%20Jaya%20Transportasi)%20-%20Head%20Office!5e1!3m2!1sid!2sid!4v1755009963335!5m2!1sid!2sid"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </CardContent>
      </Card>
    </section>
  )
}

// Halaman kontak utama
export default function KontakPage() {
  const [formData, setFormData] = useState<FormData>({ name: "", email: "", message: "" })

  // Handle perubahan input form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  // Handle submit form - redirect ke Gmail compose
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const gmailUrl = generateGmailComposeUrl(EMAIL, formData.name, formData.email, formData.message)
    window.open(gmailUrl, "_blank")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50/50 to-white">
      {/* Hero section */}
      <div className="relative w-full bg-gradient-to-r from-[#001E3C] via-[#003B5C] to-[#005289] text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight">Hubungi Kami</h1>
            <p className="text-base md:text-lg text-blue-100 leading-relaxed">
              Hubungi tim profesional kami untuk konsultasi dan pemesanan layanan transportasi
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24">
        {/* Grid kontak dan form */}
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto mb-16">
          {/* Kolom kontak info */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800">Lokasi & Kontak</h2>

            <ContactCard icon={<Phone className="h-5 w-5 text-green-500" />} title="WhatsApp / Telepon">
              <p className="text-lg font-semibold text-green-600">{PHONE}</p>
              <p className="text-sm text-gray-600 mt-1">Layanan 24/7 untuk pemesanan darurat</p>
              <Button asChild className="mt-3 bg-green-500 hover:bg-green-600 w-full">
                <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Chat WhatsApp
                </a>
              </Button>
            </ContactCard>

            <ContactCard icon={<Mail className="h-5 w-5 text-blue-500" />} title="Email">
              <p className="text-lg font-semibold text-blue-600">{EMAIL}</p>
              <p className="text-sm text-gray-600 mt-1">Untuk pertanyaan detail dan penawaran khusus</p>
            </ContactCard>

            <ContactCard icon={<MapPin className="h-5 w-5 text-red-500" />} title="Alamat Kantor">
              <p className="text-gray-700 leading-relaxed">
                {OFFICE_ADDRESS.building}<br />{OFFICE_ADDRESS.street}<br />{OFFICE_ADDRESS.city}
              </p>
              <Button asChild variant="outline" className="mt-3 w-full">
                <a href={MAPS_URL} target="_blank" rel="noopener noreferrer">
                  <MapPin className="h-4 w-4 mr-2" />
                  Buka di Google Maps
                </a>
              </Button>
            </ContactCard>

            <ContactCard icon={<Clock className="h-5 w-5 text-purple-500" />} title="Jam Operasional">
              <div className="space-y-2 text-gray-700 text-sm">
                {OPERATING_HOURS.map(({ day, hours }) => (
                  <p key={day}><strong>{day}:</strong> {hours}</p>
                ))}
              </div>
            </ContactCard>
          </div>

          {/* Kolom form kontak */}
          <div>
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Kirim Pesan ke Kami</h2>
            <Card>
              <CardHeader>
                <CardTitle>Form Kontak</CardTitle>
                <CardDescription>Kami akan menghubungi Anda dalam 24 jam</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-sm">Nama Lengkap</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Masukkan nama Anda"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-sm">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="nama@email.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="message" className="text-sm">Pesan</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Ceritakan kebutuhan Anda..."
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" size="lg">
                    <Send className="h-4 w-4 mr-2" />
                    Kirim Pesan
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

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
                  <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=Halo, saya ingin menanyakan ketersediaan layanan...`} target="_blank" rel="noopener noreferrer">
                    Tanyakan Ketersediaan Layanan
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        <MapSection />
      </div>
    </div>
  )
}

