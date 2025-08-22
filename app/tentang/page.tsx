export const metadata = { title: "Tentang Kami | PJTrans", description: "Informasi Tentang Kami PJTrans – PT Portama Jaya Transportasi. Layanan sewa mobil profesional di Jabodetabek dan seluruh Indonesia." }

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CheckCircle, Building, Users, Award, FileText } from "lucide-react"

export default function TentangPage() {
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
    },
    {
      title: "Kualitas",
      description: "Komitmen pada armada dan pelayanan terbaik",
      icon: <Award className="h-8 w-8 text-green-500" />,
    },
    {
      title: "Pelayanan Pelanggan",
      description: "Fokus pada kepuasan pelanggan",
      icon: <Users className="h-8 w-8 text-purple-500" />,
    },
    {
      title: "Kepemimpinan & Kolaborasi",
      description: "Bekerja sama secara tim dan bertanggung jawab",
      icon: <Building className="h-8 w-8 text-orange-500" />,
    },
  ]

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">Tentang Kami</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Mengenal lebih dekat PT Portama Jaya Transportasi dan komitmen kami dalam memberikan layanan terbaik
          </p>
        </div>

        {/* Company History */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Sejarah Perusahaan</h2>
          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-8">
              <p className="text-lg text-gray-600 leading-relaxed text-center">
                PJTrans berdiri pada tahun <strong className="text-blue-600">2022</strong> dengan misi untuk menjadi
                mitra transportasi terpercaya bagi bisnis, wisata, dan kebutuhan harian. Kami memulai dengan beberapa
                unit armada, dan kini telah berkembang melayani puluhan kota besar di Indonesia.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Vision & Mission (Detailed) */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Visi dan Misi (Versi Lengkap)</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-2xl text-blue-600 flex items-center gap-2">
                  <Building className="h-6 w-6" />
                  Visi
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed text-lg">
                  Menjadi perusahaan jasa transportasi yang terpercaya dan selalu menyandang reputasi yang baik melalui
                  pertumbuhan perusahaan yang berkelanjutan.
                </p>
              </CardContent>
            </Card>
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-2xl text-green-600 flex items-center gap-2">
                  <CheckCircle className="h-6 w-6" />
                  Misi
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    Meningkatkan kualitas SDM dan layanan
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    Memberdayakan seluruh sumber daya untuk efisiensi maksimal
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    Mengadopsi teknologi transportasi terbaru
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    Menyediakan solusi transportasi fleksibel & profesional
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Company Values */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Nilai-Nilai Perusahaan</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {companyValues.map((value, index) => (
              <Card key={index} className="text-center h-full">
                <CardHeader>
                  <div className="mx-auto mb-4">{value.icon}</div>
                  <CardTitle className="text-lg">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Organizational Structure */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Struktur Organisasi</h2>
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle>Tim Manajemen PJTrans</CardTitle>
              <CardDescription>Dipimpin oleh profesional berpengalaman di bidang transportasi</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nama Lengkap</TableHead>
                    <TableHead>Jabatan</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {organizationStructure.map((person, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{person.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{person.position}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </section>

        {/* Legality & Permits */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Legalitas & Perizinan</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-500" />
                  Akta Pendirian
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  <strong>No. 01</strong> oleh Notaris Bonifacius Hugo A.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5 text-green-500" />
                  Perizinan Resmi
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">NIB, NPWP, AHU: Terdaftar di Kemenkumham RI & DPMPTSP DKI Jakarta</p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  )
}
