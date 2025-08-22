export const metadata = { title: "Harga & Armada | PJTrans", description: "Informasi Harga & Armada PJTrans – PT Portama Jaya Transportasi. Layanan sewa mobil profesional di Jabodetabek dan seluruh Indonesia." }

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Car, Truck, Bus, AlertTriangle, Phone } from "lucide-react"
import Image from "next/image"

interface VehicleData {
  id: string
  name: string
  startingPrice: string
  image: string
  category: string
  services: {
    name: string
    price: string
    description: string
    //src : string
  }[]
  contactForPrice?: boolean
}

export default function HargaPage() {
  const vehicles: VehicleData[] = [
    {
      id: "alphard",
      name: "Toyota Alphard",
      startingPrice: "Rp. 3.800.000",
      image: "/image/alphard.jpg?height=1000&width=400",
      category: "Premium",
      services: [
        {
          name: "Sewa 12 Jam Dengan Supir",
          price: "Rp 2.800.000",
          description: "Biaya Tol, Parkir, Exclude BBM, Makan Supir",
          
        },
        {
          name: "Sewa Full day Dengan Supir",
          price: "Rp 3.200.000",
          description: "Biaya Tol, Parkir, Exclude BBM, Makan Supir",
        
        },
        {
          name: "Sewa Harian Lepas Kunci",
          price: "Rp 2.500.000",
          description: "Minimal sewa 3 hari",
        },
        {
          name: "Sewa Bulanan Lepas Kunci",
          price: "Rp 42.000.000",
          description: "Minimal sewa 1 Bulan",
        },
      ],
    },
    {
      id: "innova",
      name: "Toyota Innova Zenix",
      startingPrice: "Rp. 800.000",
      image: "/image/inova.png?height=1000&width=400",
      category: "MPV",
      services: [
        {
          name: "Sewa 12 Jam Dengan Supir",
          price: "Rp 1.100.000",
          description: "Biaya Tol, Parkir, Exclude BBM, Makan Supir",
        },
        {
          name: "Sewa Full day Dengan Supir",
          price: "Rp 1.500.000",
          description: "Biaya Tol, Parkir, Exclude BBM, Makan Supir",
        },
        {
          name: "Sewa Harian Lepas Kunci",
          price: "Rp 650.000",
          description: "Minimal sewa 3 hari",
        },
        {
          name: "Sewa Bulanan Lepas Kunci",
          price: "Rp 14.000.000",
          description: "Minimal sewa 1 Bulan",
        },
      ],
    },
    {
      id: "avanza",
      name: "Toyota All New Avanza",
      startingPrice: "Rp. 500.000",
      image: "/image/avanza.png?height=1000&width=400",
      category: "City Car",
      services: [
        {
          name: "Sewa 12 Jam Dengan Supir",
          price: "Rp 700.000",
          description: "Biaya Tol, Parkir, Exclude BBM, Makan Supir",
        },
        {
          name: "Sewa Full day Dengan Supir",
          price: "Rp 1.000.000",
          description: "Biaya Tol, Parkir, Exclude BBM, Makan Supir",
        },
        {
          name: "Sewa Harian Lepas Kunci",
          price: "Rp 500.000",
          description: "Minimal sewa 3 hari",
        },
        {
          name: "Sewa Bulanan Lepas Kunci",
          price: "Rp 7.000.000",
          description: "Minimal sewa 1 Bulan",
        },
      ],
    },
    {
      id: "pajero",
      name: "Mitsubishi Pajero",
      startingPrice: "Rp. 1.300.000",
      image: "/image/pajero.jpg?height=1000&width=400",
      category: "SUV",
      services: [
        {
          name: "Sewa 12 Jam Dengan Supir",
          price: "Rp 1.300.000",
          description: "Biaya Tol, Parkir, Exclude BBM, Makan Supir",
        },
        {
          name: "Sewa Full day Dengan Supir",
          price: "Rp 1.500.000",
          description: "Biaya Tol, Parkir, Exclude BBM, Makan Supir",
        },
        {
          name: "Sewa Harian Lepas Kunci",
          price: "Rp 1.300.000",
          description: "Minimal sewa 3 hari",
        },
        {
          name: "Sewa Bulanan Lepas Kunci",
          price: "Rp 20.500.000",
          description: "Minimal sewa 1 Bulan",
        },
      ],
    },
    {
      id: "fortuner",
      name: "Toyota Fortuner",
      startingPrice: "Rp. 1.300.000",
      image: "/image/fortuner.png?height=1000&width=400",
      category: "SUV",
      services: [
        {
          name: "Sewa 12 Jam Dengan Supir",
          price: "Rp 1.300.000",
          description: "Biaya Tol, Parkir, Exclude BBM, Makan Supir",
        },
        {
          name: "Sewa Full day Dengan Supir",
          price: "Rp 1.500.000",
          description: "Biaya Tol, Parkir, Exclude BBM, Makan Supir",
        },
        {
          name: "Sewa Harian Lepas Kunci",
          price: "Rp 1.300.000",
          description: "Minimal sewa 3 hari",
        },
        {
          name: "Sewa Bulanan Lepas Kunci",
          price: "Rp 20.500.000",
          description: "Minimal sewa 1 Bulan",
        },
      ],
    },
    {
      id: "ertiga",
      name: "Suzuki All New Ertiga",
      startingPrice: "Rp. 550.000",
      image: "/image/ertiga.png?height=1000&width=400",
      category: "MPV",
      services: [
        {
          name: "Sewa 12 Jam Dengan Supir",
          price: "Rp 550.000",
          description: "Biaya Tol, Parkir, Exclude BBM, Makan Supir",
        },
        {
          name: "Sewa Full day Dengan Supir",
          price: "Rp 700.000",
          description: "Biaya Tol, Parkir, Exclude BBM, Makan Supir",
        },
        {
          name: "Sewa Harian Lepas Kunci",
          price: "Rp 500.000",
          description: "Minimal sewa 3 hari",
        },
        {
          name: "Sewa Bulanan Lepas Kunci",
          price: "Rp 7.500.000",
          description: "Minimal sewa 1 Bulan",
        },
      ],
    },
    {
      id: "landcruiser",
      name: "Toyota Land Cruiser",
      startingPrice: "Hubungi untuk harga",
      image: "/image/landcrusiser.png?height=1000&width=400",
      category: "Premium SUV",
      contactForPrice: true,
      services: [
        {
          name: "Sewa 12 Jam Dengan Supir",
          price: "Hubungi untuk harga",
          description: "Biaya Tol, Parkir, Exclude BBM, Makan Supir",
        },
        {
          name: "Sewa Full day Dengan Supir",
          price: "Hubungi untuk harga",
          description: "Biaya Tol, Parkir, Exclude BBM, Makan Supir",
        },
        {
          name: "Sewa Harian Lepas Kunci",
          price: "Hubungi untuk harga",
          description: "Minimal sewa 3 hari",
        },
        {
          name: "Sewa Bulanan Lepas Kunci",
          price: "Hubungi untuk harga",
          description: "Minimal sewa 1 Bulan",
        },
      ],
    },
    {
      id: "hilux",
      name: "Toyota Hilux Double Cabin",
      startingPrice: "Hubungi untuk harga",
      image: "/image/hiluxcabin.png?height=1000&width=400",
      category: "Pick Up",
      contactForPrice: true,
      services: [
        {
          name: "Sewa 12 Jam Dengan Supir",
          price: "Hubungi untuk harga",
          description: "Biaya Tol, Parkir, Exclude BBM, Makan Supir",
        },
        {
          name: "Sewa Full day Dengan Supir",
          price: "Hubungi untuk harga",
          description: "Biaya Tol, Parkir, Exclude BBM, Makan Supir",
        },
        {
          name: "Sewa Harian Lepas Kunci",
          price: "Hubungi untuk harga",
          description: "Minimal sewa 3 hari",
        },
        {
          name: "Sewa Bulanan Lepas Kunci",
          price: "Hubungi untuk harga",
          description: "Minimal sewa 1 Bulan",
        },
      ],
    },
    {
      id: "calya",
      name: "Toyota Calya",
      startingPrice: "Hubungi untuk harga",
      image: "/image/calya.png?height=1000&width=400",
      category: "City Car",
      contactForPrice: true,
      services: [
        {
          name: "Sewa 12 Jam Dengan Supir",
          price: "Hubungi untuk harga",
          description: "Biaya Tol, Parkir, Exclude BBM, Makan Supir",
        },
        {
          name: "Sewa Full day Dengan Supir",
          price: "Hubungi untuk harga",
          description: "Biaya Tol, Parkir, Exclude BBM, Makan Supir",
        },
        {
          name: "Sewa Harian Lepas Kunci",
          price: "Hubungi untuk harga",
          description: "Minimal sewa 3 hari",
        },
        {
          name: "Sewa Bulanan Lepas Kunci",
          price: "Hubungi untuk harga",
          description: "Minimal sewa 1 Bulan",
        },
      ],
    },
    {
      id: "xenia",
      name: "Daihatsu All New Xenia",
      startingPrice: "Hubungi untuk harga",
      image: "/image/ertiga.png?height=1000&width=400",
      category: "MPV",
      contactForPrice: true,
      services: [
        {
          name: "Sewa 12 Jam Dengan Supir",
          price: "Hubungi untuk harga",
          description: "Biaya Tol, Parkir, Exclude BBM, Makan Supir",
        },
        {
          name: "Sewa Full day Dengan Supir",
          price: "Hubungi untuk harga",
          description: "Biaya Tol, Parkir, Exclude BBM, Makan Supir",
        },
        {
          name: "Sewa Harian Lepas Kunci",
          price: "Hubungi untuk harga",
          description: "Minimal sewa 3 hari",
        },
        {
          name: "Sewa Bulanan Lepas Kunci",
          price: "Hubungi untuk harga",
          description: "Minimal sewa 1 Bulan",
        },
      ],
    },
    {
      id: "vios",
      name: "Toyota Vios",
      startingPrice: "Hubungi untuk harga",
      image: "/image/vios.png?height=1000&width=400",
      category: "Sedan",
      contactForPrice: true,
      services: [
        {
          name: "Sewa 12 Jam Dengan Supir",
          price: "Hubungi untuk harga",
          description: "Biaya Tol, Parkir, Exclude BBM, Makan Supir",
        },
        {
          name: "Sewa Full day Dengan Supir",
          price: "Hubungi untuk harga",
          description: "Biaya Tol, Parkir, Exclude BBM, Makan Supir",
        },
        {
          name: "Sewa Harian Lepas Kunci",
          price: "Hubungi untuk harga",
          description: "Minimal sewa 3 hari",
        },
        {
          name: "Sewa Bulanan Lepas Kunci",
          price: "Hubungi untuk harga",
          description: "Minimal sewa 1 Bulan",
        },
      ],
    },
    {
      id: "bmw5",
      name: "BMW 5 Series",
      startingPrice: "Hubungi untuk harga",
      image: "/image/bmw5.png?height=1000&width=400",
      category: "Luxury",
      contactForPrice: true,
      services: [
        {
          name: "Sewa 12 Jam Dengan Supir",
          price: "Hubungi untuk harga",
          description: "Biaya Tol, Parkir, Exclude BBM, Makan Supir",
        },
        {
          name: "Sewa Full day Dengan Supir",
          price: "Hubungi untuk harga",
          description: "Biaya Tol, Parkir, Exclude BBM, Makan Supir",
        },
        {
          name: "Sewa Harian Lepas Kunci",
          price: "Hubungi untuk harga",
          description: "Minimal sewa 3 hari",
        },
        {
          name: "Sewa Bulanan Lepas Kunci",
          price: "Hubungi untuk harga",
          description: "Minimal sewa 1 Bulan",
        },
      ],
    },
    {
      id: "camry",
      name: "Toyota Camry",
      startingPrice: "Hubungi untuk harga",
      image: "/image/carmy.png?height=1000&width=400",
      category: "Premium Sedan",
      contactForPrice: true,
      services: [
        {
          name: "Sewa 12 Jam Dengan Supir",
          price: "Hubungi untuk harga",
          description: "Biaya Tol, Parkir, Exclude BBM, Makan Supir",
        },
        {
          name: "Sewa Full day Dengan Supir",
          price: "Hubungi untuk harga",
          description: "Biaya Tol, Parkir, Exclude BBM, Makan Supir",
        },
        {
          name: "Sewa Harian Lepas Kunci",
          price: "Hubungi untuk harga",
          description: "Minimal sewa 3 hari",
        },
        {
          name: "Sewa Bulanan Lepas Kunci",
          price: "Hubungi untuk harga",
          description: "Minimal sewa 1 Bulan",
        },
      ],
    },
    {
      id: "mercedes",
      name: "Mercedes C300",
      startingPrice: "Hubungi untuk harga",
      image: "/image/C300.png?height=1000&width=400",
      category: "Luxury",
      contactForPrice: true,
      services: [
        {
          name: "Sewa 12 Jam Dengan Supir",
          price: "Hubungi untuk harga",
          description: "Biaya Tol, Parkir, Exclude BBM, Makan Supir",
        },
        {
          name: "Sewa Full day Dengan Supir",
          price: "Hubungi untuk harga",
          description: "Biaya Tol, Parkir, Exclude BBM, Makan Supir",
        },
        {
          name: "Sewa Harian Lepas Kunci",
          price: "Hubungi untuk harga",
          description: "Minimal sewa 3 hari",
        },
        {
          name: "Sewa Bulanan Lepas Kunci",
          price: "Hubungi untuk harga",
          description: "Minimal sewa 1 Bulan",
        },
      ],
    },
    {
      id: "vellfire",
      name: "Toyota Vellfire",
      startingPrice: "Hubungi untuk harga",
      image: "/image/Vellfire.png?height=1000&width=400",
      category: "Premium MPV",
      contactForPrice: true,
      services: [
        {
          name: "Sewa 12 Jam Dengan Supir",
          price: "Hubungi untuk harga",
          description: "Biaya Tol, Parkir, Exclude BBM, Makan Supir",
        },
        {
          name: "Sewa Full day Dengan Supir",
          price: "Hubungi untuk harga",
          description: "Biaya Tol, Parkir, Exclude BBM, Makan Supir",
        },
        {
          name: "Sewa Harian Lepas Kunci",
          price: "Hubungi untuk harga",
          description: "Minimal sewa 3 hari",
        },
        {
          name: "Sewa Bulanan Lepas Kunci",
          price: "Hubungi untuk harga",
          description: "Minimal sewa 1 Bulan",
        },
      ],
    },
    {
      id: "elf",
      name: "Isuzu ELF",
      startingPrice: "Hubungi untuk harga",
      image: "/image/elf.png?height=1000&width=400",
      category: "Bus",
      contactForPrice: true,
      services: [
        {
          name: "Sewa 12 Jam Dengan Supir",
          price: "Hubungi untuk harga",
          description: "Biaya Tol, Parkir, Exclude BBM, Makan Supir",
        },
        {
          name: "Sewa Full day Dengan Supir",
          price: "Hubungi untuk harga",
          description: "Biaya Tol, Parkir, Exclude BBM, Makan Supir",
        },
        {
          name: "Sewa Harian Lepas Kunci",
          price: "Hubungi untuk harga",
          description: "Minimal sewa 3 hari",
        },
        {
          name: "Sewa Bulanan Lepas Kunci",
          price: "Hubungi untuk harga",
          description: "Minimal sewa 1 Bulan",
        },
      ],
    },
    {
      id: "hiace",
      name: "Toyota Hiace Commuter",
      startingPrice: "Hubungi untuk harga",
      image: "/image/Hiacecomuter.jpg?height=1000&width=400",
      category: "Bus",
      contactForPrice: true,
      services: [
        {
          name: "Sewa 12 Jam Dengan Supir",
          price: "Hubungi untuk harga",
          description: "Biaya Tol, Parkir, Exclude BBM, Makan Supir",
        },
        {
          name: "Sewa Full day Dengan Supir",
          price: "Hubungi untuk harga",
          description: "Biaya Tol, Parkir, Exclude BBM, Makan Supir",
        },
        {
          name: "Sewa Harian Lepas Kunci",
          price: "Hubungi untuk harga",
          description: "Minimal sewa 3 hari",
        },
        {
          name: "Sewa Bulanan Lepas Kunci",
          price: "Hubungi untuk harga",
          description: "Minimal sewa 1 Bulan",
        },
      ],
    },
    {
      id: "granmax",
      name: "Daihatsu Gran Max Mini Bus",
      startingPrice: "Hubungi untuk harga",
      image: "/image/granmax.png?height=1000&width=400",
      category: "Mini Bus",
      contactForPrice: true,
      services: [
        {
          name: "Sewa 12 Jam Dengan Supir",
          price: "Hubungi untuk harga",
          description: "Biaya Tol, Parkir, Exclude BBM, Makan Supir",
        },
        {
          name: "Sewa Full day Dengan Supir",
          price: "Hubungi untuk harga",
          description: "Biaya Tol, Parkir, Exclude BBM, Makan Supir",
        },
        {
          name: "Sewa Harian Lepas Kunci",
          price: "Hubungi untuk harga",
          description: "Minimal sewa 3 hari",
        },
        {
          name: "Sewa Bulanan Lepas Kunci",
          price: "Hubungi untuk harga",
          description: "Minimal sewa 1 Bulan",
        },
      ],
    },
  ]

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">Armada Kami</h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Kami menyediakan berbagai pilihan armada, mulai dari city car yang ukuran ringkas dan lincah untuk area
            perkotaan, SUV yang tangguh, hingga mobil mewah untuk acara spesial Anda. Semua kendaraan dirawat dengan
            standar terbaik untuk memastikan perjalanan yang aman dan nyaman.
          </p>
        </div>

        {/* Vehicle Categories */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Pilih Armada Sesuai Kebutuhan Anda</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
            <Card className="text-center">
              <CardHeader>
                <Car className="h-8 w-8 mx-auto text-blue-500" />
                <CardTitle className="text-lg">City Car</CardTitle>
              </CardHeader>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <Car className="h-8 w-8 mx-auto text-green-500" />
                <CardTitle className="text-lg">MPV</CardTitle>
              </CardHeader>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <Car className="h-8 w-8 mx-auto text-purple-500" />
                <CardTitle className="text-lg">SUV & Premium</CardTitle>
              </CardHeader>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <Truck className="h-8 w-8 mx-auto text-orange-500" />
                <CardTitle className="text-lg">Komersial</CardTitle>
              </CardHeader>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <Bus className="h-8 w-8 mx-auto text-red-500" />
                <CardTitle className="text-lg">Wisata</CardTitle>
              </CardHeader>
            </Card>
          </div>
        </section> 

        {/* Detailed Vehicle Cards */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Harga Sewa Rental Armada Kami</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {vehicles.map((vehicle) => (
              <Card key={vehicle.id} id={vehicle.id} className="overflow-hidden">
                <div className="relative h-48">
                  <Image src={vehicle.image || "/placeholder.svg"} alt={vehicle.name}  width={400}height={250} className="object-cover" />
                  
                  <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full">
                    <span className="text-sm font-semibold text-blue-600">PJTrans</span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary">{vehicle.category}</Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-bold text-gray-800">{vehicle.name}</h3>
                    <p
                      className={`text-2xl font-bold ${vehicle.contactForPrice ? "text-orange-600" : "text-blue-600"}`}
                    >
                      {vehicle.startingPrice}
                    </p>
                  </div>

                  {/* Always show detailed pricing table */}
                  <div className="border-t pt-4 mb-4">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-xs">Jenis Layanan</TableHead>
                          <TableHead className="text-xs">Harga Sewa</TableHead>
                          <TableHead className="text-xs">Keterangan</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {vehicle.services.map((service, index) => (
                          <TableRow key={index}>
                            <TableCell className="text-xs font-medium">{service.name}</TableCell>
                            <TableCell
                              className={`text-xs font-bold ${vehicle.contactForPrice ? "text-orange-600" : "text-green-600"}`}
                            >
                              {service.price}
                            </TableCell>
                            <TableCell className="text-xs text-gray-600">{service.description}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  <div className="space-y-2">                    
                    <div className="space-y-2">
                      <Button asChild className="w-full bg-green-500 hover:bg-green-600" size="sm">
                        <a 
                          href="https://wa.me/6281315393681?text=Halo%2C%20saya%20ingin%20cek%20ketersediaan%20mobil%20Innova" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2"
                        >
                          <Phone className="h-4 w-4" />
                          Chat via WhatsApp
                        </a>
                      </Button>
                    </div>

                    {/* <Button asChild className="w-full bg-green-500 hover:bg-green-600" size="sm">
                      {/* <a href="https://wa.me/6281315393681" target="_blank" rel="noopener noreferrer"> */}
                        {/* <a href="https://wa.me/6281315393681?text=Halo%2C%20saya%20ingin%20cek%20ketersediaan%20mobil%20Innova" 
                          target="_blank" rel="noopener noreferrer">
                              Lanjut ke Chat 
                        <Phone className="h-4 w-4 mr-2" />
                        Chat via WhatsApp
                      </a>
                    </Button> */}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Terms & Conditions */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">📄 Syarat & Ketentuan</h2>
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                Ketentuan Sewa
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Alert>
                    <AlertDescription>
                      <strong>Pemesanan:</strong> Maksimal H-1
                    </AlertDescription>
                  </Alert>
                  <Alert>
                    <AlertDescription>
                      <strong>Waktu Sewa:</strong> Berlaku 00.00 – 23.59 (bukan rolling 24 jam)
                    </AlertDescription>
                  </Alert>
                  <Alert>
                    <AlertDescription>
                      <strong>Overtime:</strong> Dikenakan 10% per jam
                    </AlertDescription>
                  </Alert>
                  <Alert>
                    <AlertDescription>
                      <strong>Pembatalan H-0:</strong> Dikenakan penalti 50%
                    </AlertDescription>
                  </Alert>
                </div>
                <div className="space-y-4">
                  <Alert>
                    <AlertDescription>
                      <strong>Exclude:</strong> Harga sewa exclude BBM, tol, parkir
                    </AlertDescription>
                  </Alert>
                  <Alert>
                    <AlertDescription>
                      <strong>Minimal Sewa:</strong> Lepas kunci minimal 3 hari
                    </AlertDescription>
                  </Alert>
                  <Alert>
                    <AlertDescription>
                      <strong>Weekend & Libur:</strong> Ada biaya tambahan
                    </AlertDescription>
                  </Alert>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* CTA */}
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4 text-gray-800">Siap Booking Kendaraan Anda?</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Hubungi tim kami sekarang untuk reservasi dan dapatkan penawaran terbaik!
          </p>
          <Button asChild size="lg" className="bg-green-500 hover:bg-green-600 text-white font-semibold">
            <a href="https://wa.me/6281315393681" target="_blank" rel="noopener noreferrer">
              📱 Hubungi Kami untuk Booking Sekarang
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
}
