import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "PJTrans - PT Portama Jaya Transportasi | Rent, Drive, To Explore",
  description:
    "Solusi transportasi terpercaya sejak 2022. Sewa mobil harian, bulanan, lepas kunci, dengan sopir. Melayani 80+ kota di Indonesia. Armada lengkap dari city car hingga mobil premium.",
  openGraph: {
    title: 'PJTrans - PT Portama Jaya Transportasi',
    description: 'Sewa mobil harian, mingguan, bulanan dengan sopir atau lepas kunci di seluruh Indonesia.',
    url: 'https://www.pjtrans.co.id',
    siteName: 'PJTrans',
    locale: 'id_ID',
    type: 'website',
  },
  twitter: { card: 'summary_large_image', creator: '@pjtrans' },
  keywords: "sewa mobil, rental mobil, transportasi, Jakarta, Indonesia, sopir, lepas kunci, bandara, wisata, premium",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" className={inter.className}>
      <head>
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "PT Portama Jaya Transportasi",
              "url": "https://www.pjtrans.co.id",
              "logo": "/image/logo.webp",
              "sameAs": [
                "https://www.instagram.com/pjtrans",
                "https://wa.me/6281315393681"
              ],
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "ID"
              },
              "contactPoint": [
                {
                  "@type": "ContactPoint",
                  "telephone": "+62-813-1539-3681",
                  "contactType": "customer service",
                  "areaServed": "ID"
                }
              ]
            })
          }}
        />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
