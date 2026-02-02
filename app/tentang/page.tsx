export const metadata = { 
  title: "Tentang Kami | PJTrans", 
  description: "Informasi Tentang Kami PJTrans – PT Portama Jaya Transportasi. Layanan sewa mobil profesional di Jabodetabek dan seluruh Indonesia." 
}

export const dynamic = 'force-dynamic'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CheckCircle, Building, Users, Award, FileText, ArrowRight } from "lucide-react"
import prisma from "@/lib/prisma"
import { FilterableVehicles } from "@/components/vehicle-card"
 
export default async function TentangPage() {
  // Fetch all cars from DB (include services) to display on this page
  const rawCars = await prisma.car.findMany({
    orderBy: { id: "desc" },
    include: { services: true },
  })
 
  const cars = rawCars.map((c) => ({
    id: c.id,
    name: c.name || "Nama tidak tersedia",
    price: c.price || "Hubungi",
    category: c.category || "Umum",
    image: c.image ?? null,
    year: c.year ?? null,
    seats: c.seats ?? null,
    transmission: c.transmission ?? null,
    services: c.services ?? [],
  }))
 
   const organizationStructure = [
     { name: "Gilbert Armando", position: "Direktur Utama" },
     { name: "Sjahrial Rusli", position: "Direktur Keuangan" },
     { name: "Octavianus", position: "Manager Operasional" },
     { name: "Bayu Prasetio", position: "Manager Pemasaran" },
     { name: "Rudi Setiawan", position: "Komisaris" },
   ]
 
   const companyValues = [
     {
       title: "Integritas",
       description: "Jujur dan adil dalam setiap layanan",
       icon: <CheckCircle className="h-8 w-8 text-blue-500" />,
       color: "from-blue-50 to-blue-100/50"
     },
     {
       title: "Kualitas",
       description: "Komitmen pada armada dan pelayanan terbaik",
       icon: <Award className="h-8 w-8 text-green-500" />,
       color: "from-green-50 to-green-100/50"
     },
     {
       title: "Pelayanan Pelanggan",
       description: "Fokus pada kepuasan pelanggan",
       icon: <Users className="h-8 w-8 text-purple-500" />,
       color: "from-purple-50 to-purple-100/50"
     },
     {
       title: "Kepemimpinan & Kolaborasi",
       description: "Bekerja sama secara tim dan bertanggung jawab",
       icon: <Building className="h-8 w-8 text-orange-500" />,
       color: "from-orange-50 to-orange-100/50"
     },
   ]
 
   return (
     <div className="min-h-screen bg-gradient-to-b from-white via-gray-50/50 to-white">
       {/* Hero Section */}
       <div className="relative w-full bg-gradient-to-r from-[#001E3C] via-[#003B5C] to-[#005289] text-white overflow-hidden">
         <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
         <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
         
         <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
           <div className="max-w-3xl mx-auto text-center space-y-4">
             <h1 className="text-4xl md:text-5xl font-black tracking-tight">Tentang PJTrans</h1>
             <p className="text-base md:text-lg text-blue-100 leading-relaxed">
               Mengenal lebih dekat PT Portama Jaya Transportasi dan komitmen kami dalam memberikan solusi transportasi terpercaya
             </p>
           </div>
         </div>
       </div>

{/* About Company Summary */}
       <section className="py-16 bg-white">
         <div className="container mx-auto px-4">
           <div className="max-w-4xl mx-auto text-center">

             <p className="text-lg text-gray-600 leading-relaxed text-justify">
              PT Portama Jaya Transportasi (PJTrans) adalah perusahaan penyedia jasa transportasi yang berdiri sejak tahun 2022 dan berkomitmen untuk memberikan layanan transportasi yang aman, nyaman, dan terpercaya. Sejak awal berdiri, PJTrans telah melayani berbagai kebutuhan pelanggan, mulai dari perjalanan individu, keluarga, hingga kebutuhan operasional perusahaan berskala kecil maupun besar. Kami menyediakan beragam layanan transportasi yang dirancang untuk menjawab kebutuhan mobilitas yang beragam, baik untuk keperluan wisata, perjalanan dinas, antar-jemput, maupun penggunaan jangka pendek dan jangka panjang. Didukung oleh armada kendaraan yang terawat dengan baik serta pengemudi yang berpengalaman dan profesional, kami memastikan setiap perjalanan berlangsung dengan lancar dan tepat waktu. Bagi kami, kenyamanan, kecepatan, dan profesionalisme bukan sekadar slogan, melainkan fondasi utama dalam setiap layanan yang kami berikan. Kami senantiasa menjaga kualitas layanan melalui perawatan armada secara berkala, peningkatan kompetensi sumber daya manusia, serta pelayanan yang responsif dan ramah kepada setiap pelanggan. Dengan mengedepankan kepercayaan dan kepuasan pelanggan, PT Portama Jaya Transportasi (PJTrans) terus berupaya menjadi mitra transportasi yang dapat diandalkan, memberikan solusi mobilitas yang efisien, dan mendukung kelancaran aktivitas Anda di setiap perjalanan.
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

       <div className="container mx-auto px-4 py-16 md:py-24">
         {/* Company History */}
         <section className="mb-24">
           <div className="max-w-4xl mx-auto">
             <div className="space-y-2 mb-12">
               <h2 className="text-4xl font-bold text-gray-900">Sejarah Perusahaan</h2>
               <div className="h-1 w-16 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"></div>
             </div>
             
             <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white">
               <CardContent className="p-8 md:p-12">
                 <div className="space-y-6">
                   <p className="text-lg text-gray-700 leading-relaxed">
                     PJTrans berdiri pada tahun <span className="font-bold text-blue-600">2022</span> dengan visi menjadi mitra transportasi terpercaya bagi bisnis, wisata, dan kebutuhan harian masyarakat Indonesia.
                   </p>
                   <p className="text-lg text-gray-700 leading-relaxed">
                     Dimulai dengan beberapa unit armada berkualitas tinggi, kami terus berkembang dan berinovasi. Saat ini, PJTrans telah memperluas jangkauan layanan hingga <span className="font-bold text-green-600">80+ kota</span> di seluruh Nusantara.
                   </p>
                   <p className="text-lg text-gray-700 leading-relaxed">
                     Kepercayaan pelanggan adalah aset terbesar kami. Setiap armada dirawat dengan standar internasional, dan setiap sopir terlatih profesional untuk memberikan pengalaman terbaik.
                   </p>
                 </div>
               </CardContent>
             </Card>
           </div>
         </section>

         {/* Vision & Mission */}
         <section className="mb-24">
           <div className="max-w-6xl mx-auto">
             <div className="space-y-2 mb-12">
               <h2 className="text-4xl font-bold text-gray-900">Visi & Misi</h2>
               <div className="h-1 w-16 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"></div>
             </div>

             <div className="grid md:grid-cols-2 gap-8">
               {/* Vision Card */}
               <Card className="border-0 shadow-lg hover:shadow-xl transition-all group hover:scale-105 duration-300 bg-gradient-to-br from-blue-50 to-blue-100/50">
                 <CardHeader className="space-y-4">
                   <div className="flex items-center gap-3">
                     <div className="p-3 bg-blue-600 rounded-lg">
                       <Building className="h-6 w-6 text-white" />
                     </div>
                     <CardTitle className="text-2xl text-gray-900">Visi</CardTitle>
                   </div>
                 </CardHeader>
                 <CardContent>
                   <p className="text-gray-700 leading-relaxed text-lg font-medium">
                     Menjadi perusahaan jasa transportasi yang terpercaya, inovatif, dan selalu menyandang reputasi terbaik melalui pertumbuhan berkelanjutan serta komitmen pada keunggulan layanan.
                   </p>
                 </CardContent>
               </Card>

               {/* Mission Card */}
               <Card className="border-0 shadow-lg hover:shadow-xl transition-all group hover:scale-105 duration-300 bg-gradient-to-br from-green-50 to-green-100/50">
                 <CardHeader className="space-y-4">
                   <div className="flex items-center gap-3">
                     <div className="p-3 bg-green-600 rounded-lg">
                       <CheckCircle className="h-6 w-6 text-white" />
                     </div>
                     <CardTitle className="text-2xl text-gray-900">Misi</CardTitle>
                   </div>
                 </CardHeader>
                 <CardContent>
                   <ul className="space-y-3">
                     {[
                       "Meningkatkan kualitas SDM dan layanan secara berkelanjutan",
                       "Memberdayakan sumber daya untuk efisiensi maksimal",
                       "Mengadopsi teknologi transportasi terkini",
                       "Menyediakan solusi transportasi fleksibel & profesional"
                     ].map((item, i) => (
                       <li key={i} className="flex items-start gap-3">
                         <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                         <span className="text-gray-700 font-medium">{item}</span>
                       </li>
                     ))}
                   </ul>
                 </CardContent>
               </Card>
             </div>
           </div>
         </section>

         {/* Company Values */}
         <section className="mb-24">
           <div className="max-w-6xl mx-auto">
             <div className="space-y-2 mb-12">
               <h2 className="text-4xl font-bold text-gray-900">Nilai-Nilai Perusahaan</h2>
               <div className="h-1 w-16 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"></div>
             </div>

             <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
               {companyValues.map((value, index) => (
                 <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-all group hover:scale-105 duration-300 bg-gradient-to-br ${value.color}">
                   <CardHeader className="text-center space-y-4">
                     <div className="mx-auto p-4 bg-white rounded-lg group-hover:scale-110 transition-transform duration-300">
                       {value.icon}
                     </div>
                     <CardTitle className="text-xl text-gray-900">{value.title}</CardTitle>
                   </CardHeader>
                   <CardContent>
                     <p className="text-gray-700 text-center font-medium">{value.description}</p>
                   </CardContent>
                 </Card>
               ))}
             </div>
           </div>
         </section>

         {/* Organizational Structure */}
         <section className="mb-24">
           <div className="max-w-5xl mx-auto">
             <div className="space-y-2 mb-12">
               <h2 className="text-4xl font-bold text-gray-900">Struktur Organisasi</h2>
               <div className="h-1 w-16 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"></div>
             </div>

             <Card className="border-0 shadow-lg">
               <CardHeader>
                 <CardTitle className="text-2xl text-gray-900">Tim Manajemen PJTrans</CardTitle>
                 <CardDescription className="text-base">Dipimpin oleh profesional berpengalaman di bidang transportasi dan bisnis</CardDescription>
               </CardHeader>
               <CardContent>
                 <div className="overflow-x-auto">
                   <Table>
                     <TableHeader>
                       <TableRow className="bg-gradient-to-r from-blue-50 to-blue-100/50">
                         <TableHead className="font-bold text-gray-900">Nama Lengkap</TableHead>
                         <TableHead className="font-bold text-gray-900">Jabatan</TableHead>
                       </TableRow>
                     </TableHeader>
                     <TableBody>
                       {organizationStructure.map((person, index) => (
                         <TableRow key={index} className="hover:bg-gray-50 transition-colors border-b border-gray-200">
                           <TableCell className="font-semibold text-gray-800 py-4">{person.name}</TableCell>
                           <TableCell className="py-4">
                             <Badge className="bg-blue-600 hover:bg-blue-700 text-white font-semibold">
                               {person.position}
                             </Badge>
                           </TableCell>
                         </TableRow>
                       ))}
                     </TableBody>
                   </Table>
                 </div>
               </CardContent>
             </Card>
           </div>
         </section>

         {/* Armada & Harga - menampilkan semua mobil dari database (filterable by category) */}
         <div className="container mx-auto px-4 py-8">
           <FilterableVehicles cars={cars} />
         </div>

         {/* Organizational Structure */}
         <section className="mb-24">
           <div className="max-w-5xl mx-auto">
             <div className="space-y-2 mb-12">
               <h2 className="text-4xl font-bold text-gray-900">Struktur Organisasi</h2>
               <div className="h-1 w-16 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"></div>
             </div>

             <Card className="border-0 shadow-lg">
               <CardHeader>
                 <CardTitle className="text-2xl text-gray-900">Tim Manajemen PJTrans</CardTitle>
                 <CardDescription className="text-base">Dipimpin oleh profesional berpengalaman di bidang transportasi dan bisnis</CardDescription>
               </CardHeader>
               <CardContent>
                 <div className="overflow-x-auto">
                   <Table>
                     <TableHeader>
                       <TableRow className="bg-gradient-to-r from-blue-50 to-blue-100/50">
                         <TableHead className="font-bold text-gray-900">Nama Lengkap</TableHead>
                         <TableHead className="font-bold text-gray-900">Jabatan</TableHead>
                       </TableRow>
                     </TableHeader>
                     <TableBody>
                       {organizationStructure.map((person, index) => (
                         <TableRow key={index} className="hover:bg-gray-50 transition-colors border-b border-gray-200">
                           <TableCell className="font-semibold text-gray-800 py-4">{person.name}</TableCell>
                           <TableCell className="py-4">
                             <Badge className="bg-blue-600 hover:bg-blue-700 text-white font-semibold">
                               {person.position}
                             </Badge>
                           </TableCell>
                         </TableRow>
                       ))}
                     </TableBody>
                   </Table>
                 </div>
               </CardContent>
             </Card>
           </div>
         </section>

         {/* Legality & Permits */}
      
       </div>
     </div>
   )
 }
