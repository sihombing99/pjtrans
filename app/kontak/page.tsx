export const metadata = { title: "Kontak | PJTrans", description: "Informasi Kontak PJTrans – PT Portama Jaya Transportasi. Layanan sewa mobil profesional di Jabodetabek dan seluruh Indonesia." }

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

export default function KontakPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Form submitted:", formData)
    alert("Pesan Anda telah dikirim! Kami akan segera menghubungi Anda.")
    setFormData({ name: "", email: "", message: "" })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

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

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">Kontak Kami</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hubungi tim profesional kami untuk konsultasi dan pemesanan layanan transportasi
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Lokasi & Kontak</h2>

            {/* Contact Cards */}
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="h-5 w-5 text-green-500" />
                    WhatsApp / Telepon
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-semibold text-green-600">0813-2919-5095</p>
                  <p className="text-sm text-gray-600 mt-1">Layanan 24/7 untuk pemesanan darurat</p>
                  <Button asChild className="mt-3 bg-green-500 hover:bg-green-600">
                    <a href="https://wa.me/6281315393681" target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Chat WhatsApp
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5 text-blue-500" />
                    Email
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-semibold text-blue-600">portamajaya.transportasi@gmail.com</p>
                  <p className="text-sm text-gray-600 mt-1">Untuk pertanyaan detail dan penawaran khusus</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-red-500" />
                    Alamat Kantor
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">
                    Ruko Apartemen Sakura Garden City No. 117
                    <br />
                    Jl. Bina Marga No. 88, Cipayung
                    <br />
                    Jakarta Timur
                  </p>
                  <Button asChild variant="outline" className="mt-3 bg-transparent">
                    <a
                      href="https://maps.google.com/?q=Ruko+Apartemen+Sakura+Garden+City+No.+117+Jl.+Bina+Marga+No.+88+Cipayung+Jakarta+Timur"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MapPin className="h-4 w-4 mr-2" />
                      Buka di Google Maps
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-purple-500" />
                    Jam Operasional
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-gray-700">
                    <p>
                      <strong>Senin - Jumat:</strong> 08:00 - 22:00 WIB
                    </p>
                    <p>
                      <strong>Sabtu - Minggu:</strong> 08:00 - 20:00 WIB
                    </p>
                    <p>
                      <strong>Emergency:</strong> 24/7 via WhatsApp
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Kirim Pesan ke Kami</h2>
            <Card>
              <CardHeader>
                <CardTitle>Form Kontak</CardTitle>
                <CardDescription>Isi form di bawah ini dan kami akan menghubungi Anda dalam 24 jam</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Nama Lengkap</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Masukkan nama lengkap Anda"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
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
                    <Label htmlFor="message">Pesan</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Ceritakan kebutuhan transportasi Anda..."
                      rows={5}
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

        {/* Service Areas */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Area Layanan</h2>
          <Card className="max-w-6xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle>Kami Melayani 80+ Kota Besar di Indonesia</CardTitle>
              <CardDescription>Scroll list kota atau ketik nama kota Anda untuk cek layanan kami</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 max-h-96 overflow-y-auto">
                {serviceCities.map((city, index) => (
                  <Badge key={index} variant="outline" className="justify-center p-2">
                    {city}
                  </Badge>
                ))}
              </div>
              <div className="mt-6 text-center">
                <p className="text-gray-600 mb-4">Tidak menemukan kota Anda dalam daftar? Jangan khawatir!</p>
                <Button asChild variant="outline">
                  <a
                    href="https://wa.me/6281315393681?text=Halo, saya ingin menanyakan ketersediaan layanan di kota..."
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Tanyakan Ketersediaan Layanan
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Google Maps Embed */}
        {/* <section className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Lokasi Kantor</h2>
          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-0">
              <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-600">
                  <MapPin className="h-12 w-12 mx-auto mb-4" />
                  <p className="text-lg font-semibold">Google Maps</p>
                  <p className="text-sm">Embed lokasi kantor PJTrans</p>
                  <p className="text-xs mt-2">Ruko Sakura Garden City No. 117, Cipayung, Jakarta Timur</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section> */}
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
              ></iframe>
            </div>
          </CardContent>
        </Card>
      </section>

      </div>
    </div>
  )
}
